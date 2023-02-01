/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 20:06:55
 * @description 环境光是全图的 没有阴影  平行光才
 * 有 聚光灯spotLight 平面光光源 RectAreaLight（不支持阴影）
 * 1. 材质要满足能够对光照有反应
 * 2. 设置渲染器开启阴影的计算 renderer.shadowMap.enabled =true
 * 3. 设置光照投射阴影 directionalLight.castShadow = true
 * 4. 设置物体投射阴影 sphere.castShadow = true
 * 5. 设置物体接收阴影  plane.receiveShadow = true
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

// 球几何体 金属球
const sphereGeometry = new THREE.SphereGeometry(1,20,20)
// 材质 标准
const material = new THREE.MeshStandardMaterial({
  // // 设置金属材质
  // metalness: 0.7,
  // roughness: 0,
})
// 球 物体
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.castShadow = true
scene.add(sphere)

// 创建平面几何体
const planeGeometry = new THREE.PlaneGeometry(10 , 10)
// 平面 
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0,-1,0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff ,0.5)
directionalLight.position.set(10, 10, 10)
directionalLight.castShadow = true
scene.add(directionalLight)



const renderer = new THREE.WebGLRenderer();
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