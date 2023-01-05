/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-04 23:50:33
 * dat.gui  ui界面控制库 快速调试图形参数
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

for (let i = 0; i < 50; i++) {
  // 一个三角形三个顶点 一个顶点是一个三元组
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.floor(Math.random() * 6) - 3;
  }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  // 基础网格材质
  const material = new THREE.MeshBasicMaterial({
    color, // 随机颜色
    transparent: true, // 设置材质 可以有透明效果
    opacity: Math.random(),
  });

  // 创建了一个面
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建轨道控制器  相机围绕着轨道看这个3d的物体
const controls = new OrbitControls(camera, renderer.domElement);
// TODO 设置阻尼 让控制器更有真实的效果 有惯性效果的展示
controls.enableDamping = true;
const render = (time: DOMHighResTimeStamp) => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // TODO 设置update方法 才能实现阻尼效果
  controls.update();
};
render(performance.now());

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement == null) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
// 监听页面大小的变化 大小变化重新渲染
addEventListener("resize", () => {
  // 更新摄像头 宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

export default renderer;
