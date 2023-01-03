/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-03 23:32:03
 * 轨道控制器阻尼 页面大小变化画面自适应
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
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
// TODO 设置阻尼 让控制器更有真实的效果 有惯性效果的展示
controls.enableDamping = true;

// 渲染函数
// 设置动画
gsap.to(cube.position, {
  x: 5,
  duration: 5,
  onComplete() {
    // 完成该动画以后的回调函数
    console.log("position 动画完成");
  },
  onStart() {
    console.log("动画开始 ... position");
  },
  yoyo: true, // 设置往返运动
  repeat: Infinity, // 重复次数
  // 延迟运动 时间
  delay: 2,
});
const animate = gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: "power1.inOut",
  repeat: Infinity, // 重复次数
});
const render = (time: DOMHighResTimeStamp) => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // TODO 设置update方法 才能实现阻尼效果
  controls.update();
};
render(performance.now());

window.addEventListener("dblclick", () => {
  // TODO 双击的时候 暂停旋转动画
  console.log(animate.isActive());
  animate.isActive() ? animate.pause() : animate.resume(); // 恢复动画
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
