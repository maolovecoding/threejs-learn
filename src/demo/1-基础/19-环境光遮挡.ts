/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-04 23:50:33
 * @description 环境光遮挡
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
import doorImg from "../assets/color.jpg";
import alphaImg from "../assets/alpha.jpg";
import aoImg from "../assets/ambientOcclusion.jpg";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 设置纹理加载器
const textureLoader = new THREE.TextureLoader();
// 拿到纹理
const doorTexture = textureLoader.load(doorImg);
const doorAlphaTexture = textureLoader.load(alphaImg)

// 设置环境光遮挡
cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))


// 设置AO环境光纹理
const doorAoTexture = textureLoader.load(aoImg)
// TODO  第一组uv是颜色贴图，第二组uv是光照效果

// 创建材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#bfa",
  map: doorTexture, // 设置纹理
  transparent: true, // 透明属性
  aoMap: doorAoTexture,
  aoMapIntensity: 0.6, // 设置环境光照遮挡的强度 1是全遮挡
});
basicMaterial.alphaMap = doorAlphaTexture
// 设置渲染材质的那一面 可以渲染前后两面 正常是看不到背面的
basicMaterial.side = THREE.DoubleSide

const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1,1)

const plane = new THREE.Mesh(planeGeometry, basicMaterial)
plane.position.set(2,0,0)
// 给平面设置第二组uv
planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))
scene.add(plane)


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
