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

const cubeGeometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  wireframe: true // 线框展示
});
const redMaterial = new THREE.MeshBasicMaterial({
  color: 0xf2a000
});
const cubeArr: THREE.Mesh[] = []
for (let x = -5; x < +5; x++)
{
  for (let y = -5; y < +5; y++)
  {
    for (let z = -5; z < +5; z++)
    {
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(x, y, z);
      cubeArr.push(cube)
      scene.add(cube)
    }
  }
}
// 创建投射光线对象
const raycaster = new THREE.Raycaster()
// 鼠标的位置对象
const mouse = new THREE.Vector2()
addEventListener('mousemove', (e)=>{
  mouse.x = e.clientX / innerWidth * 2 - 1
  mouse.y = -(e.clientY / innerHeight * 2 - 1)
  raycaster.setFromCamera(mouse, camera)
  // 检测鼠标经过的物体（一个光线可以经过多少物体）
  const targetArr = raycaster.intersectObjects(cubeArr);
  for(const target of targetArr) {
    (target.object as THREE.Mesh).material = redMaterial
  }
  // (targetArr[0].object as THREE.Mesh).material = redMaterial
})

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