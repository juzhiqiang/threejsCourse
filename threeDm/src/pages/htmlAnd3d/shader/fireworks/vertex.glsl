precision lowp float;
precision highp float;
attribute float aScale;
attribute vec3 aRandom;
uniform float uTime;
uniform float uSize;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    // 设置沿着向量移动
    modelPosition.xyz += (aRandom * uTime * 10.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    gl_PointSize = uSize * aScale - (uTime * 10.0);
}