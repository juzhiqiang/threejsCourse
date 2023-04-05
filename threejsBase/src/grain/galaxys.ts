// 粒子效果
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const galaxyGrain = () => {
  // 1. 创建场景
  const scene = new THREE.Scene();
  // 创建相机--透视相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    // 镜头设置近一点 不会看到上返雪花
    20
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  const parmars = {
    count: 10000,
    size: 0.3,
    radius: 5,
    branch: 5,
    color: "#ff6030",
    endColor: "#1b3984",
  };

  const generateGalaxy = () => {
    // 生成顶点
    const geometry = new THREE.BufferGeometry();
    // 随机生成位置
    const position = new Float32Array(parmars.count * 3);
    // 设置顶点颜色
    const colors = new Float32Array(parmars.count * 3);
    const centerColor = new THREE.Color(parmars.color);
    const endColor = new THREE.Color(parmars.endColor);
    // 循环生成点
    for (let i = 0; i < parmars.count; i++) {
      // 当前点应该在那一条分支角度
      const branchAgel =
        (i % parmars.branch) * ((2 * Math.PI) / parmars.branch);
      // 当前点距离圆心位置
      const distance =
        Math.random() * parmars.radius * Math.pow(Math.random(), 3);

      // 设置空间立体感
      const randomX =
        (Math.pow(Math.random() * 2 - 1, 3) * (parmars.radius - distance)) / 5;
      const randomY =
        (Math.pow(Math.random() * 2 - 1, 3) * (parmars.radius - distance)) / 5;
      const randomZ =
        (Math.pow(Math.random() * 2 - 1, 3) * (parmars.radius - distance)) / 5;

      const current = i * 3;
      position[current] = Math.cos(branchAgel + distance) * distance + randomX;
      position[current + 1] = randomY;
      position[current + 2] =
        Math.sin(branchAgel + distance) * distance + randomZ;

      // 设置顶点颜色，混合颜色形成渐变
      const minColor = centerColor.clone();
      minColor.lerp(endColor, distance / parmars.radius);
      colors[current] = minColor.r;
      colors[current + 1] = minColor.g;
      colors[current + 2] = minColor.b;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    //   加入纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/particles/4.png");
    // 设置材质
    const materail = new THREE.PointsMaterial({
      // color: new THREE.Color(parmars.color),
      size: parmars.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: texture,
      alphaMap: texture,
      transparent: true,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, materail);
    scene.add(points);
    return {
      geometry,
      materail,
    };
  };

  const ge = generateGalaxy();

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

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
