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
    10
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  const parmars = {
    count: 1000,
    size: 0.1,
    radius: 5,
    branch: 3,
    color: "#ffffff",
  };

  const generateGalaxy = () => {
    // 生成顶点
    const geometry = new THREE.BufferGeometry();
    // 随机生成位置
    const position = new Float32Array(parmars.count * 3);
    // 设置顶点颜色
    const color = new Float32Array(parmars.count * 3);
    // 循环生成点
    for (let i = 0; i < parmars.count; i++) {
      // 当前点应该在那一条分支角度
      const branchAgel =
        (i % parmars.branch) * ((2 * Math.PI) / parmars.branch);
      console.log(branchAgel);
      // 当前点距离圆心位置
      const distance = Math.random() * parmars.radius;

      const current = i * 3;
      position[current] = Math.cos(branchAgel) * distance;
      position[current + 1] = 0;
      position[current + 2] = Math.sin(branchAgel) * distance;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));

    //   加入纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/particles/3.png");
    // 设置材质
    const materail = new THREE.PointsMaterial({
      color: new THREE.Color(parmars.color),
      size: parmars.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: texture,
      alphaMap: texture,
      transparent: true,
      // vertexColors: true,
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
