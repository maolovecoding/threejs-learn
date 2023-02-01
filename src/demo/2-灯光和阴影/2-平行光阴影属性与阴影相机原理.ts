/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 20:06:55
 * @description 平行光阴影属性 阴影相机原理
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
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096)

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5;// 近端
directionalLight.shadow.camera.far = 500; // 远端
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;


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