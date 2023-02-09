/**
 * @Author: 毛毛 
 * @Date: 2023-02-08 19:35:48 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-02-09 12:35:27
 * @description 认识物理引型：
 * 1. cannon-es 
 */
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNONES from 'cannon-es'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

scene.add(camera);

// 创建球 + 平面
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow= true
scene.add(sphere)


const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
)
plane.position.set(0, -5,0 )
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)


// 创建物理世界 小球会有重力
const world = new CANNONES.World({
  gravity: new CANNONES.Vec3(0, -9.8, 0), // 重力 其实就是三维的向量
})
// 创建物理小球形状
const sphereShape = new CANNONES.Sphere(1)
// 设置物体材质
const sphereWorldMaterial = new CANNONES.Material("sphere")

// 物理小球
const sphereBody = new CANNONES.Body({
  shape: sphereShape,
  position: new CANNONES.Vec3(0,0,0),
  mass: 1, // 质量
  material: sphereWorldMaterial
})
world.addBody(sphereBody)

// 物理世界创建地面 形状
const planeShape = new CANNONES.Plane()
const planeBody = new CANNONES.Body()
planeBody.mass = 0;// 质量为0 表示地面是保持不动的
planeBody.addShape(planeShape)
planeBody.position.set(0, -5, 0)
// 旋转地面 quaternion   设置沿着某个轴旋转
planeBody.quaternion.setFromAxisAngle(new CANNONES.Vec3(1,0,0), -Math.PI/2)
world.addBody(planeBody)

// 给地面设置材质
const planeMaterial = new CANNONES.Material("floor")
planeBody.material = planeMaterial; // 地板材质

// 设置两种材质碰撞的参数  ContactMaterial 关联材质
const defaultContactMaterial = new CANNONES.ContactMaterial(
  sphereWorldMaterial, 
  planeMaterial,
  {
    friction: 0.1, // 摩擦系数
    restitution: 0.7, // 弹性系数
  }
)
// 将材料的关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial)

// 创建击打声音
const hitSound = new Audio(new URL('./球的碰撞声.mp3', import.meta.url).href)

// 添加监听碰撞事件 collide
sphereBody.addEventListener('collide', (e: any) => {
  // console.log(e)
  // 获取碰撞的强度
  // console.log(e.contact)
  const impactStrength = (e.contact as CANNONES.ContactEquation).getImpactVelocityAlongNormal()
  console.log(impactStrength)
  hitSound.currentTime = 0; // 从零开始
  impactStrength > 5 && (
    hitSound.currentTime = 0, // 从零开始
    hitSound.play()
    )
})


// 光线 环境光 平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true
scene.add(directionalLight)

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled =true

renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建轨道控制器  相机围绕着轨道看这个3d的物体
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock()
const render = (time: DOMHighResTimeStamp) => {
  const deltaTime = clock.getDelta()
  // 更新物理引型世界里面的物体
  world.step(1/120, deltaTime);// 120帧 上次调用函数的时间
  // 关联物理引擎和渲染引擎 同步更新渲染引擎中对应物理引擎小球每次更新的位置
  sphere.position.copy(sphereBody.position as any) 
  renderer.render(scene, camera);
  requestAnimationFrame(render);
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