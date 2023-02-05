/**
 * @Author: 毛毛 
 * @Date: 2023-01-19 19:28:12 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-19 20:06:55
 * @description 旋转星系 demo
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  40, // 设置远一些 就可以看不到上升的光点了 只能看见下降的了
);
camera.position.set(0, 0, 10);

scene.add(camera);

// 载入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(new URL('../assets/particles/1.png', import.meta.url).href);

const param = {
  count: 5000,
  size: 0.1,
  radius: 5,
  branch: 3,
  color: '#ffffff'
};
let geometry: THREE.BufferGeometry | null = null,
  material: THREE.PointsMaterial | null = null,
  points: THREE.Points | null = null;
const generateGalaxy = () => {
  // 顶点
  geometry = new THREE.BufferGeometry();
  // 随机生成位置和
  const positions = new Float32Array(param.count * 3);
  // 颜色
  const colors = new Float32Array(param.count * 3);
  // 循环生成点
  for (let i = 0; i < param.count; i++)
  {
    // 当前点应该在哪个分支角度上
    const branchAngel = (i % param.branch) * ((2 * Math.PI) / param.branch);
    // 点距离圆心的位置
    const distance = Math.random() * param.radius * Math.pow(Math.random(), 3);
    const randomX = Math.pow(Math.random() * 2 - 1, 3) * distance / 2,
      randomY = Math.pow(Math.random() * 2 - 1, 3) * distance / 2,
      randomZ = Math.pow(Math.random() * 2 - 1, 3) * distance / 2
    positions[i * 3] = distance * Math.cos(branchAngel + distance * 1 / 4) + randomX;
    positions[i * 3 + 1] = 0 + randomY;
    positions[i * 3 + 2] = distance * Math.sin(branchAngel + distance * 1 / 4) + randomZ;
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  // 设置点材质
  material = new THREE.PointsMaterial({
    color: new THREE.Color(param.color),
    size: param.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: texture,
    alphaMap: texture,
    transparent: true,
    vertexColors: true
  });
  points = new THREE.Points(geometry, material);
  scene.add(points);
};
generateGalaxy();


const renderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;

renderer.render(scene, camera);



const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建轨道控制器  相机围绕着轨道看这个3d的物体
const controls = new OrbitControls(camera, renderer.domElement);
// TODO 设置阻尼 让控制器更有真实的效果 有惯性效果的展示
controls.enableDamping = true;
const clock = new THREE.Clock();
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