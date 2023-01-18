/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-04 23:50:33
 * 几何体 学习材质
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
import doorImg from "../assets/门纹理.jpg";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
// 设置纹理加载器
const textureLoader = new THREE.TextureLoader();
// 拿到纹理
const doorTexture = textureLoader.load(doorImg);
// 设置纹理的偏移
doorTexture.offset.x = 0.5;
doorTexture.offset.y = 0.5;
// 设置旋转中心点
doorTexture.center.set(1, 1); // 设置中心点
// 纹理旋转
doorTexture.rotation = Math.PI / 4; // 旋转45°
// 设置纹理的重复
doorTexture.repeat.set(3, 3); // 水平重复3，垂直重复3次
// 设置纹理重复的模式
doorTexture.wrapS = THREE.RepeatWrapping; // 纹理将简单地重复到无穷大
doorTexture.wrapT = THREE.MirroredRepeatWrapping; // 镜像重复

// 纹理显示设置
// doorTexture.minFilter = THREE.NearestFilter // 接近的纹理
// doorTexture.magFilter = THREE.NearestFilter

doorTexture.minFilter = THREE.LinearFilter
doorTexture.magFilter = THREE.LinearFilter

// 创建材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#bfa",
  map: doorTexture, // 设置纹理
});
// console.log(doorTexture)

const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
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
