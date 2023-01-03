/**
 * @Author: 毛毛
 * @Date: 2023-01-02 14:48:46
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-01-03 23:37:10
 * TODO 设置物体的缩放 scale 物体旋转 rotation
 */
import { useEffect, useRef } from "react";
import renderer from "./demo/1-基础/10-js控制是否全屏和退出全屏";
import "./App.css";
// 使用控制器 查看3d物体
// 导入轨道控制器
function App() {
  // 将webgl渲染的canvas添加到页面上
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvasRef.current?.appendChild(renderer.domElement);
  });
  return <div ref={canvasRef}></div>;
}

export default App;
