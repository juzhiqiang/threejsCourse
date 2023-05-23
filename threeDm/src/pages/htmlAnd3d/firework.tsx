import * as THREE from "three";
// @ts-ignore
import startPointVertex from "./shader/startPoint/vertex.glsl";
// @ts-ignore
import startPointFragment from "./shader/startPoint/fragment.glsl";
// @ts-ignore
import fireworksVertex from "./shader/fireworks/vertex.glsl";
// @ts-ignore
import fireworksFragment from "./shader/fireworks/fragment.glsl";

export default class Firework {
  startGeometry: THREE.BufferGeometry;
  startMaterial: THREE.ShaderMaterial;
  scene: THREE.Scene | undefined;
  startPoint: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  clock: THREE.Clock;
  fireworkGeometry: THREE.BufferGeometry;
  fireworksCount: number;
  fireworkMaterail: THREE.ShaderMaterial;
  fireworks: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  color: THREE.Color;
  linstener: THREE.AudioListener;
  sound: THREE.Audio<GainNode>;
  play: boolean;
  seedSound: any;
  seedPlay: boolean;
  constructor(
    color: THREE.ColorRepresentation | undefined,
    to: { x: number; y: number; z: number },
    form: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
  ) {
    this.scene = undefined;
    this.play = false;
    // 创建烟花发射效果
    this.startGeometry = new THREE.BufferGeometry();
    this.color = new THREE.Color(color);
    const startPositionArr = new Float32Array(3);
    startPositionArr[0] = form.x;
    startPositionArr[1] = form.y;
    startPositionArr[2] = form.z;
    this.startGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(startPositionArr, 3)
    );

    // 计算距离向量
    const astepArray = new Float32Array(3);
    astepArray[0] = to.x - form.x;
    astepArray[1] = to.y - form.y;
    astepArray[2] = to.z - form.z;
    this.startGeometry.setAttribute(
      "aStep",
      new THREE.BufferAttribute(astepArray, 3)
    );

    // 设置烟花材质
    this.startMaterial = new THREE.ShaderMaterial({
      vertexShader: startPointVertex,
      fragmentShader: startPointFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 20.0,
        },
        uColor: {
          value: this.color,
        },
      },
    });

    // 创建烟花点
    this.startPoint = new THREE.Points(this.startGeometry, this.startMaterial);

    // 开始计时
    this.clock = new THREE.Clock();

    // 创建烟花爆炸后效果
    this.fireworkGeometry = new THREE.BufferGeometry();
    this.fireworksCount = Math.floor(Math.random() * 120) + 60;
    const positionFireworksArray = new Float32Array(this.fireworksCount * 3);
    const scaleFireArray = new Float32Array(this.fireworksCount);
    const directionArray = new Float32Array(this.fireworksCount * 3);
    for (let i = 0; i < this.fireworksCount; i++) {
      // 烟花爆炸瞬间起始位置
      positionFireworksArray[i * 3 + 0] = to.x;
      positionFireworksArray[i * 3 + 1] = to.y;
      positionFireworksArray[i * 3 + 2] = to.z;
      //   爆炸烟花粒子初始大小
      scaleFireArray[i] = Math.random();
      //   设置爆炸发射角
      let theta = Math.random() * 2 * Math.PI;
      let beta = Math.random() * 2 * Math.PI;
      let r = Math.random();
      directionArray[i * 3 + 0] = r * Math.sin(theta) + r * Math.sin(beta);
      directionArray[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta);
      directionArray[i * 3 + 2] = r * Math.sin(theta) + r * Math.cos(beta);
    }

    this.fireworkGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionFireworksArray, 3)
    );
    this.fireworkGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleFireArray, 3)
    );
    this.fireworkGeometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(directionArray, 3)
    );
    this.fireworkMaterail = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 0.0,
        },
        uColor: {
          value: this.color,
        },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: fireworksVertex,
      fragmentShader: fireworksFragment,
    });

    this.fireworks = new THREE.Points(
      this.fireworkGeometry,
      this.fireworkMaterail
    );

    // 创建音效
    this.linstener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.linstener);
    this.seedSound = new THREE.Audio(this.linstener);
    // 音频加载器
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(
      `./audio/pow${Math.floor(Math.random() * 4) + 1}.ogg`,
      (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(false);
        this.sound.setVolume(1);
      }
    );
    audioLoader.load(`./audio/send.mp3`, (buffer) => {
      this.seedSound.setBuffer(buffer);
      this.seedSound.setLoop(false);
      this.seedSound.setVolume(Math.random() + 0.3);
    });
  }

  public addScene(scene: THREE.Scene | undefined, camera: THREE.Camera) {
    this.scene = scene;
    scene?.add(this.startPoint);
    scene?.add(this.fireworks);
  }

  //   更新
  public update() {
    const elapsedTime = this.clock.getElapsedTime();
    if (elapsedTime < 1) {
      this.startMaterial.uniforms.uTime.value = elapsedTime;
      this.startMaterial.uniforms.uSize.value = 20.0;
      if (!this.seedSound.isPlaying && !this.seedPlay && elapsedTime > 0.1) {
        this.seedSound.play();
        this.seedPlay = true;
      }
    } else {
      const time = elapsedTime - 1;
      this.startMaterial.uniforms.uSize.value = 0.0;
      //   使用结束后清除释放内存
      this.startPoint.clear();
      this.startGeometry.dispose();
      this.startMaterial.dispose();
      if (time > 5) {
        //   使用结束后清除释放内存
        this.fireworkMaterail.uniforms.uSize.value = 0;
        this.fireworks.clear();
        this.fireworkGeometry.dispose();
        this.fireworkMaterail.dispose();
        // 使用完成后移除对应内容
        this.scene?.remove(this.fireworks);
        this.scene?.remove(this.startPoint);
        return "remove";
      } else {
        //   设置烟花显示
        this.fireworkMaterail.uniforms.uSize.value = 20.0;
        this.fireworkMaterail.uniforms.uTime.value = time;
        if (!this.sound.isPlaying && !this.play) {
          this.sound.play();
          this.play = true;
        }
      }
    }
  }
}
