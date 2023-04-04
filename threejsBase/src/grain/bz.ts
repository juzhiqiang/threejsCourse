// 粒子效果
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const bzGrain = () => {
  // 1. 创建场景
  const scene = new THREE.Scene();
  // 创建相机--透视相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    // 镜头设置近一点 不会看到上返雪花
    10
  );
  // 设置相机位置
  camera.position.set(0, 0, 20);
  scene.add(camera);

  // 生成随机点函数
  const createPoints = (imgUrl: string, size = 0.5, color) => {
    //  随机点
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 4000;
    // 设置缓冲区
    const positions = new Float32Array(count * 3);
    // 随机设置每个顶点的颜色
    const colors = new Float32Array(count * 3);
    // 自定义设置顶点
    for (let i = 0; i < count * 3; i++) {
      positions[i] = Math.random() * 30 - 15;
      colors[i] = Math.random();
    }
    // 设置属性
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    //   创建点材质
    const pointsMaterial = new THREE.PointsMaterial();
    pointsMaterial.size = size;
    pointsMaterial.color.set(0xffffff);
    //   加入纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imgUrl);
    //   设置材质纹理
    pointsMaterial.map = texture;
    //   设置透明材质
    pointsMaterial.alphaMap = texture;
    //   允许使用透明
    pointsMaterial.transparent = true;
    pointsMaterial.depthWrite = false;
    //   叠加算法,防止后面的电叠加到前面来
    pointsMaterial.blending = THREE.AdditiveBlending;
    // 启用顶点颜色
    pointsMaterial.vertexColors = true;
    const points = new THREE.Points(particlesGeometry, pointsMaterial);
    scene.add(points);

    return points;
  };

  const points = createPoints("/particles/14.png", 0.5, 1);
  const points1 = createPoints("/particles/xh.png", 0.5, 1);

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的阻尼，模仿惯性想过
  controls.enableDamping = true;

  // 时钟
  const clock = new THREE.Clock();

  const render = () => {
    const time = clock.getElapsedTime();
    points.rotation.x = time * 0.3;
    points.rotation.y = time * 0.05;
    points1.rotation.x = time * 0.5;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
