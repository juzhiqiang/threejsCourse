import * as THREE from "three";
import gsap from "gsap";
export const modifyCityMaterial = (mesh: {
  type?: string;
  material: any;
  geometry?: any;
}) => {
  mesh.material.onBeforeCompile = (shader: {
    uniforms: { uTopColor: { value: THREE.Color }; uHeight: { value: number } };
    vertexShader: string;
    fragmentShader: string;
  }) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
        #include <dithering_fragment>
        //#end#
    `
    );
  };

  mesh.material.onBeforeCompile = (shader) => {
    // console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
        #include <dithering_fragment>
        //#end#
    `
    );
    addGradColor(shader, mesh);
    addSpread(shader);
    addLightLine(shader);
    addToTopLine(shader);
  };
};

export const addGradColor = (
  shader: any,
  mesh: {
    type?: string;
    material: any;
    geometry?: any;
  }
) => {
  // 必须先执行获取盒子计算才能去获取到高度
  mesh.geometry.computeBoundingBox();
  // 获取物体高度差
  const { min, max } = mesh.geometry.boundingBox;
  let uHeight = max.y - min.y;

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
    "//#end#",
    `
      vec4 distGradColor = gl_FragColor;
      // 设置混合的百分比
      float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
      // 计算出混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor,1);
      //#end#
      `
  );
};

// 圆心扩散扫描
export const addSpread = (shader: {
  uniforms: {
    uSpreadCenter: { value: THREE.Vector2 };
    uSpreadTime: gsap.TweenTarget;
    uSpreadWidth: { value: number };
  };
  fragmentShader: string;
}) => {
  // 以平面上哪个点为中心扩散
  shader.uniforms.uSpreadCenter = { value: new THREE.Vector2(0, 0) };
  // 扩散时间
  shader.uniforms.uSpreadTime = { value: 0 };
  // 设置条带宽度
  shader.uniforms.uSpreadWidth = { value: 10 };
  //
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `#include <common>
     uniform vec2 uSpreadCenter;
     uniform float uSpreadTime;
     uniform float uSpreadWidth;
    `
  );
  // 设置颜色时候设置过颜色计算，扩散只需要再次融合即可
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
     float spreadRadius = distance(vPosition.xz,uSpreadCenter);
     //  扩散范围函数
     float spreadIndex = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth; 
     if(spreadIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
     };
     //#end#"`
  );

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 100,
    duration: 3,
    ease: "none",
    repeat: -1,
  });
};

// 水平扫描
export const addLightLine = (shader: {
  uniforms: {
    uLightLineTime: gsap.TweenTarget;
    uLightLineWidth: { value: number };
  };
  fragmentShader: string;
}) => {
  // 扩散时间
  shader.uniforms.uLightLineTime = { value: 0 };
  // 设置条带宽度
  shader.uniforms.uLightLineWidth = { value: 10 };
  //
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `#include <common>
     uniform float uLightLineTime;
     uniform float uLightLineWidth;
    `
  );
  // 设置颜色时候设置过颜色计算，扩散只需要再次融合即可
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
     float lightLineIndex = -(vPosition.x+vPosition.z  - uLightLineTime) * (vPosition.x+vPosition.z - uLightLineTime) + uLightLineWidth; 
     if(lightLineIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor,vec4(1,1,0,1),lightLineIndex/uLightLineWidth);
     };
     //#end#"`
  );

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 100,
    duration: 2,
    ease: "none",
    repeat: -1,
  });
};


// 垂直扫描
export const addToTopLine = (shader: {
  uniforms: {
    uToTopLineTime: gsap.TweenTarget;
    uToTopLineWidth: { value: number };
  };
  fragmentShader: string;
}) => {
  // 扩散时间
  shader.uniforms.uToTopLineTime = { value: 0 };
  // 设置条带宽度
  shader.uniforms.uToTopLineWidth = { value: 10 };
  //
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `#include <common>
     uniform float uToTopLineTime;
     uniform float uToTopLineWidth;
    `
  );
  // 设置颜色时候设置过颜色计算，扩散只需要再次融合即可
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
     float ToTopLineIndex = -(vPosition.y  - uToTopLineTime) * (vPosition.y - uToTopLineTime) + uToTopLineWidth; 
     if(ToTopLineIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor,vec4(1,0,0,1),ToTopLineIndex/uToTopLineWidth);
     };
     //#end#"`
  );

  gsap.to(shader.uniforms.uToTopLineTime, {
    value: 100,
    duration: 2,
    ease: "none",
    repeat: -1,
  });
};
