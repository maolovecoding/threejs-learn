/**
 * @Author: 毛毛
 * @Date: 2023-01-02 14:48:46
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-02 15:30:31
 * TODO 设置物体的缩放 scale 物体旋转 rotation
 */
import { useEffect, useRef } from "react";
import * as ThreeJs from "three";
import "./App.css";
// 使用控制器 查看3d物体
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
  // TODO  物体缩放
  // cube.scale.set(3, 2, 1);
  // cube.scale.x = 3
  // TODO 物体旋转 X轴旋转45° 最后一个参数是旋转顺序 先X后Z再Y
  cube.rotation.set(Math.PI / 4, 0, 0, "XZY");
  // 将几何体添加到场景
  scene.add(cube);
  // 初始化渲染器
  const renderer = new ThreeJs.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将webgl渲染的canvas添加到页面上
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvasRef.current?.appendChild(renderer.domElement);
  });
  // 使用渲染器 通过相机将场景渲染出来
  renderer.render(scene, camera);
  // 创建轨道控制器  相机围绕着轨道看这个3d的物体
  const controls = new OrbitControls(camera, renderer.domElement);
  // TODO 添加坐标轴辅助器
  const axesHelper = new ThreeJs.AxesHelper(5);
  scene.add(axesHelper);
  let flag = false;
  // 渲染函数
  const render = () => {
    if (flag) {
      cube.position.x -= 0.01;
    } else {
      // 每一帧都修改物体的位置
      cube.position.x += 0.01;
    }
    if (cube.position.x >= 5) flag = true;
    if (cube.position.x <= 0) flag = false;
    // 每一帧都渲染一次
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
  return <div ref={canvasRef}></div>;
}

export default App;
