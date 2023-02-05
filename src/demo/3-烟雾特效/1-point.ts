/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 20:06:55
 * @description point 点 点材质
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

// 球几何体
const sphereGeometry = new THREE.SphereGeometry(3, 30, 30)
// 材质
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true // 线框的形式展示
// })
// 球
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

// scene.add(sphere)
// 点材质
const pointMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.01 // 设置的是材质中组件物体每个顶点的大小
})
// TODO 生成点物体
const pointMesh = new THREE.Points(sphereGeometry, pointMaterial)
scene.add(pointMesh)


const renderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights =  true
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled =true

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
  if (document.fullscreenElement == null)
  {
    renderer.domElement.requestFullscreen();
  } else
  {
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