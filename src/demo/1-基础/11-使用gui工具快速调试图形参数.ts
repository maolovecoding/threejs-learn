/**
 * @Author: 毛毛
 * @Date: 2023-01-03 18:33:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-04 23:50:33
 * dat.gui  ui界面控制库 快速调试图形参数
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

// 创建立方几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 基础网格材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#bfa" });

// 创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
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

const gui = new dat.GUI();
// 设置position的x属性 最大值最小值 还可以设置范围内每次可调节的step
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("cubeX")
  // 还可以拿到改变值的时候的change事件
  .onChange((value) => {
    // console.log(value);
  })
  // 完全改变后的值
  .onFinishChange((value) => {
    console.log("值改变完毕后的值", value);
  });
// 修改物体颜色
const params = {
  color: "#f00",
  fn() {
    // 让物体运动起来
    gsap.to(cube.position, { x: 5, duration: 3, yoyo: true, repeat: -1 });
  },
};
gui.addColor(params, "color").onFinishChange((value) => {
  // 修改物体材质的颜色
  cube.material.color.set(value);
});
// 设置物体是否显示
// cube.visible
gui.add(cube, "visible").name("显示/隐藏");
// 点击触发动画
gui.add(params, "fn").name("执行动画");
// 折叠目录 用来折叠配置
const folder = gui.addFolder("设置立方体参数");
// 添加一个设置立方体显示线框的配置 即只显示线条，不现实每一面的颜色
folder.add(cube.material, "wireframe")
export default renderer;
