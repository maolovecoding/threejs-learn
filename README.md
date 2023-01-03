# Threejs

## 场景scene

场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。

## 透视相机（PerspectiveCamera）

这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。

## 轨道控制器（OrbitControls）

Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
要使用这一功能，就像在/examples（示例）目录中的所有文件一样， 您必须在HTML中包含这个文件。

### 控制器阻尼

当.enableDamping设置为true的时候，阻尼惯性有多大。 `Default is 0.05.`
请注意，要使得这一值生效，你必须在你的动画循环里调用.update()。

## AxesHelper

坐标轴辅助器，用于简单模拟3个坐标轴的对象
红色X轴，绿色Y轴，蓝色Z轴

## Clock

该对象用于跟踪时间。如果performance.now可用，则clock对象通过该方法实现，否则使用欠精度的Date.now来实现
