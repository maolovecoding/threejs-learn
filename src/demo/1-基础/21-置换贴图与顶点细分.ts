/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-04 23:50:33
 * @description 置换贴图
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
import doorImg from "../assets/color.jpg";
import alphaImg from "../assets/alpha.jpg";
import aoImg from "../assets/ambientOcclusion.jpg";
import heightImg from "../assets/height.jpg";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 40, 40, 40);
// 设置纹理加载器
const textureLoader = new THREE.TextureLoader();
// 拿到纹理
const doorTexture = textureLoader.load(doorImg);
const doorAlphaTexture = textureLoader.load(alphaImg);
// 导入置换贴图
const doorHeightTexture = textureLoader.load(heightImg)

// 设置环境光遮挡
cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2));


// 设置AO环境光纹理
const doorAoTexture = textureLoader.load(aoImg);

// 创建标准网格材质 
const basicMaterial = new THREE.MeshStandardMaterial({
  color: "#bfa",
  map: doorTexture, // 设置纹理
  transparent: true, // 透明属性
  aoMap: doorAoTexture,
  aoMapIntensity: 0.6, // 设置环境光照遮挡的强度 1是全遮挡
  // 设置置换贴图
  displacementMap: doorHeightTexture,
  // 设置置换贴图突出的大小
  displacementScale: 0.1
});
basicMaterial.alphaMap = doorAlphaTexture;
// 设置渲染材质的那一面 可以渲染前后两面 正常是看不到背面的
basicMaterial.side = THREE.DoubleSide;

const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 创建环境光 注意环境光没有方向
// 环境光可以照亮场景中的所有物体
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)


// 添加平面  后面的两个参数设置突出的大小
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);

const plane = new THREE.Mesh(planeGeometry, basicMaterial);
plane.position.set(1.3, 0, 0);
// 给平面设置第二组uv
planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));
scene.add(plane);


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

// type Get<T extends string, Res extends unknown[] = []> = T extends `${infer F}.${infer Rest}` ? Get<Rest, [...Res, F]>: [...Res, T]


// type aaa =  Get<"a.b.c">

// type Get2<T extends string, V extends Record<string, unknown>> = ""
// // type GGG<T extends >
// type bbb = Get2<"a.b.c", {a:{b:{c:string}}}>