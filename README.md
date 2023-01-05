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


## 几何体顶点
了解 UV ，法向属性
点，线，面，构成几何体。
两个点可以构成一个线，三个点就可以构成一个面了。
每个物体，比如我们前面的cubeGeometry，都有attributes属性，里面有normal，position，uv属性等。
normal就是法向属性，position里面有顶点信息。
一个立方体6个面，一个面4个点，一个点是需要xyz三个坐标来表示，所以一个立方体的position会有24个点，array的值是72


### BufferGeometry
面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。
