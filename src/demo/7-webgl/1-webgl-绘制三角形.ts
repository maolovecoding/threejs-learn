/**
 * @Author: 毛毛 
 * @Date: 2023-02-09 15:52:57 
 * @Last Modified by: 毛毛
 * @Last Modified time: 2023-02-09 16:32:17
 * -------初始化
 * 1. 创建webgl上下文
 * 2. 创建着色程序 顶点着色 片元着色
 * 3. 数据存入缓冲区
 * ------- 渲染部分
 * 4. 从缓冲区读取数据
 * 5. 运行着色程序
 */

const canvas = document.createElement('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

// 获取webgl绘制上下文
const webglContext = canvas.getContext('webgl2')!
// 第一次创建绘制上下文时  需要设置视口大小
webglContext.viewport(0, 0, innerWidth, innerHeight)
// 创建着色器

// 顶点着色器 
const vertexShader = webglContext.createShader(webglContext.VERTEX_SHADER)!
// 编写glsl代码
webglContext.shaderSource(vertexShader, `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`)
// 编译顶点着色器
webglContext.compileShader(vertexShader); // 程序变成二进制


// 片元着色器
const framentShader = webglContext.createShader(webglContext.FRAGMENT_SHADER)!
webglContext.shaderSource(framentShader, `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`)
webglContext.compileShader(framentShader)

// 创建着色器程序 链接顶点着色器和片元着色器
// 1 创建
const program = webglContext.createProgram()!
// 2. 链接 顶点和片元着色器
webglContext.attachShader(program, vertexShader)
webglContext.attachShader(program, framentShader)

// 链接程序
webglContext.linkProgram(program)

// 使用程序进行渲染
webglContext.useProgram(program)

// 创建顶点缓冲区对象
const vertexBuffer = webglContext.createBuffer()!
// 绑定顶点缓冲区对象
webglContext.bindBuffer(webglContext.ARRAY_BUFFER, vertexBuffer)
// 向顶点缓冲区对象写入数据
const vertices = new Float32Array([
  0.0, 0.5,
  -0.5, -0.5,
  0.5, -0.5
])
// webglContext.STATIC_DRAW 表示缓冲区的内容不会改变
webglContext.bufferData(webglContext.ARRAY_BUFFER, vertices, webglContext.STATIC_DRAW)
// 获取顶点着色器中的 a_Position 变量的位置
const a_Position = webglContext.getAttribLocation(program, 'a_Position')
// 将顶点缓冲区对象分配给 a_Position变量
// 告诉OpenGL 如何解析顶点数据
webglContext.vertexAttribPointer(a_Position, 2, webglContext.FLOAT, false, 0, 0)
// 启用顶点着色器中的 a_Position变量
webglContext.enableVertexAttribArray(a_Position)

// 绘制三角形
webglContext.drawArrays(webglContext.TRIANGLES, 0, 3)



export default {
  domElement: canvas
}