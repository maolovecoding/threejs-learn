/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 19:47:21
 * @description 27-经纬度映射贴图与HDR
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import nxImg from "../assets/environmentMaps/0/nx.jpg"
import nyImg from "../assets/environmentMaps/0/ny.jpg"
import nzImg from "../assets/environmentMaps/0/nz.jpg"

import pxImg from "../assets/environmentMaps/0/px.jpg"
import pyImg from "../assets/environmentMaps/0/py.jpg"
import pzImg from "../assets/environmentMaps/0/pz.jpg"
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

// 设置cube 纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader()
// cube环境纹理设置
const envMapTexture = cubeTextureLoader.load([
  pxImg,nxImg,
  pyImg,nyImg,
  pzImg,nzImg
])
// 球几何体
const sphereGeometry = new THREE.SphereGeometry(1,20,20)
// 材质 标准
const material = new THREE.MeshStandardMaterial({
  // 设置金属材质
  metalness: 0.7,
  roughness: 0,
  // envMap: envMapTexture, // 环境贴图
})
// 球 物体
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

// TODO 场景添加背景
scene.background = envMapTexture
// 不设置环境贴图，也可以搞场景的环境 给所有的物体添加一个默认的环境贴图
scene.environment = envMapTexture

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)



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