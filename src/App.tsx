import { useEffect, useRef } from "react";
import * as ThreeJs from "three";
import "./App.css";
function App() {
  // 创建场景
  const scene = new ThreeJs.Scene();
  // 创建相机 (透视相机)
  const camera = new ThreeJs.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  // 相机添加到场景
  scene.add(camera);
  // 添加物体
  // 立方缓存几何体
  const cubeGeometry = new ThreeJs.BoxGeometry(1, 1, 1);
  // 基础网格材质
  const cubeMaterial = new ThreeJs.MeshBasicMaterial({ color: 0xffff00 });
  // 根据几何体和材质创建物体
  const cube = new ThreeJs.Mesh(cubeGeometry, cubeMaterial);
  // 将几何体添加到场景
  scene.add(cube);
  // 初始化渲染器
  const renderer = new ThreeJs.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将webgl渲染的canvas添加到页面上
  // renderer.domElement
  // document.body.appendChild(renderer.domElement);
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvasRef.current?.appendChild(renderer.domElement)
  });
  // 使用渲染器 通过相机将场景渲染出来
  renderer.render(scene, camera);
  return <div ref={canvasRef}></div>;
}

export default App;
