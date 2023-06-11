import * as THREE from "three";
export const modifyCityMaterial = (mesh: {
  type?: string;
  material: any;
  geometry?: any;
}) => {
  // 必须先执行获取盒子计算才能去获取到高度
  mesh.geometry.computeBoundingBox();
  // 获取物体高度差
  const { min, max } = mesh.geometry.boundingBox;
  let uHeight = max.y - min.y;
  console.log(mesh.material);
  mesh.material.onBeforeCompile = (shader: {
    uniforms: { uTopColor: { value: THREE.Color }; uHeight: { value: number } };
    vertexShader: string;
    fragmentShader: string;
  }) => {
    console.log(shader);
    shader.uniforms.uTopColor = {
      value: new THREE.Color("#aaaeff"),
    };
    shader.uniforms.uHeight = {
      value: uHeight,
    };

    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `
      #include <common>
      varying vec3 vPosition;
    `
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      vPosition = position;
    `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `
        #include <common>
        uniform vec3 uTopColor;
        uniform float uHeight;
        varying vec3 vPosition;

      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
        #include <dithering_fragment>
        vec4 distGradColor = gl_FragColor;

        // 设置颜色混合百分比
        float gradMin = (vPosition.y + uHeight/2.0) / uHeight;
        // 计算出混合颜色
        vec3 gradMinColor = mix(distGradColor.xyz,uTopColor,gradMin);
       gl_FragColor = vec4(gradMinColor,1);
      `
    );
  };
};
