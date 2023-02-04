/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 20:06:55
 * @description 聚光灯的属性
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Gui from 'dat.gui'

const gui = new Gui.GUI()


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
const material = new THREE.MeshStandardMaterial()
// 球 物体
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.castShadow = true
scene.add(sphere)

// 创建平面几何体
const planeGeometry = new THREE.PlaneGeometry(30 , 30)
// 平面 
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0,-1,0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true // 接收阴影
scene.add(plane)

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff ,1)
// 设置亮度
spotLight.intensity = 5
spotLight.position.set(5,5,5)
spotLight.castShadow = true
// 设置阴影贴图模糊度
spotLight.shadow.radius = 10
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096)

// 聚光灯的目标
spotLight.target = sphere
// 聚光灯的角度 最大 Math.PI / 2 默认 Math.PI / 3
// spotLight.angle = Math.PI / 10
gui.add(spotLight, 'angle').min(Math.PI/ 10).max(Math.PI/2).step(Math.PI/100)
gui.add(spotLight, 'distance') // 光强度可以衰减 从设置的最大值开始
.min(0).max(30).step(0.1)
gui.add(spotLight, 'penumbra') // 聚光灯的半影衰减半分比 在0和1之间的值 默认0
.min(0).max(1).step(0.01)
gui.add(spotLight, 'decay') // 沿着光照距离的衰减量 TODO 需要开启渲染器的 使用物理上正确的光照模式的渲染选项
.min(1).max(5).step(0.01)

scene.add(spotLight)

gui.add(sphere.position, 'x').step(0.1)  .min(-5)
.max(5)





const renderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights = true // 使用物理上正确的光照模式
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