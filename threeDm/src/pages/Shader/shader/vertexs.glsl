precision lowp float;
// 设置属性

varying vec2 vUv;
varying float vElevation;

// 获取时间
uniform float uTime;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}