/**
 * @Author: 毛毛
 * @Date: 2023-01-02 14:48:46
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-02-09 15:07:11
 * TODO 设置物体的缩放 scale 物体旋转 rotation
 */
import { useEffect, useRef } from "react";
import renderer from "./demo/6-物理引型/6-给物体添加力"
import "./App.css";
function App() {
  // 将webgl渲染的canvas添加到页面上
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvasRef.current?.appendChild(renderer.domElement);
    return () => {
      canvasRef.current?.removeChild(renderer.domElement)
    }
  });
  return <div className="threejs-container" ref={canvasRef}></div>;
}


export default App;
