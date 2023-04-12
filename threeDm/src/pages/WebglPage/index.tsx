import styles from "./index.less";
import { useEffect, useRef } from "react";

const WebglPage = () => {
  const canvasRef = useRef<any>();
  // const dataRef = useRef<any>();

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    // 获取webgl上下文
    const gl = canvasRef.current.getContext("webgl");
    // 设置渲染画布大小,gl上下文
    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
    // 创建顶点着色器, varying 变量定义为传给片元着色器的值
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      vertexShader,
      `
      attribute vec4 a_Position;
      uniform mat4 u_Mat;
      varying vec4 v_Color;
      void main() {
        gl_Position = u_Mat * a_Position;
        v_Color = gl_Position;
      }
    `
    );
    // 编译顶点着色器
    gl.compileShader(vertexShader);

    // 创建片元着色器
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // 创建片元着色器源码，编译glsl， 使用precision 声明可能要进行计算的浮点数变量
    gl.shaderSource(
      fragmentShader,
      `
      precision mediump float;
      varying vec4 v_Color;
      void main() {
        gl_FragColor = v_Color;
      }
    `
    );
    gl.compileShader(fragmentShader);

    // 创建程序连接顶点着色器跟片元着色器
    const program = gl.createProgram();
    // 链接顶点着色器和片元着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 链接程序
    gl.linkProgram(program);
    // 使用程序进行渲染
    gl.useProgram(program);
    // 创建顶点缓冲区对象
    const vertexBuffer = gl.createBuffer();
    // 绑定顶点缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向顶点缓冲区对象写入数据
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, 0.5]);
    // GL.STATIC_DTAW 表示数据不会改变，gl.DYNAMIC_DRWA标识数据会改变
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 获取顶点着色器中的a_Position变量的位置
    const a_Position = gl.getAttribLocation(program, "a_Position");
    // 将顶点缓冲区对象分配给a_Position变量,告诉openGl如何解析数据
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 启用顶点着色器中的a_Position变量
    gl.enableVertexAttribArray(a_Position);

    // 每次绘制前都清除canvas
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const scale = {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    };

    const animate = () => {
      scale.x -= 0.01;
      // 设置缩放矩阵
      const mat = new Float32Array([
        scale.x,
        0.0,
        0.0,
        0.0,
        0.0,
        scale.y,
        0.0,
        0.0,
        0.0,
        0.0,
        scale.z,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);

      const u_Mat = gl.getUniformLocation(program, "u_Mat");
      gl.uniformMatrix4fv(u_Mat, false, mat);

      // 绘制三角形
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WebglPage;
