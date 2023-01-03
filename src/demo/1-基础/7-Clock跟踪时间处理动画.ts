/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-03 18:44:16
 * clock 跟踪时间处理动画
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

// 创建立方几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 基础网格材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#bfa" });

// 创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建轨道控制器  相机围绕着轨道看这个3d的物体
const controls = new OrbitControls(camera, renderer.domElement);

// TODO clock 设置时钟
const clock = new THREE.Clock(true); // 默认是true 第一次update的时候开启时钟
// clock.autoStart
// clock.startTime  存储时钟最后一次调用start方法的时间
// clock.oldTime 存储时钟最后一次调用 start getElapsedTime getDelta 方法的时间
// 渲染函数
const render = (time: DOMHighResTimeStamp) => {
  const deltaTime = clock.getDelta(); // 获取自上次调用此方法以来传递的秒数。
  time = clock.getElapsedTime(); // 获取时钟运行的总时长
  // console.log("时钟运行的总时长：", time);
  console.log("两次获取时间的间隔时间：", deltaTime);
  const t = time % 5;
  cube.position.x = t * 1;
  if (cube.position.x >= 5) cube.position.x = 0;
  // 每一帧都渲染一次
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render(performance.now());
export default renderer;
