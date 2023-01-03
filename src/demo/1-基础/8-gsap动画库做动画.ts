/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-03 19:09:20
 * 动画库 gsap
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
};
render(performance.now());

window.addEventListener('dblclick', () => {
  // TODO 双击的时候 暂停旋转动画
  console.log(animate.isActive())
  animate.isActive() ? animate.pause() : animate.resume() // 恢复动画
})
export default renderer;
