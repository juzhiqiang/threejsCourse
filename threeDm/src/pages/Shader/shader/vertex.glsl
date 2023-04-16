precision lowp float;
// 设置属性

varying vec2 vUv;
varying float vElevation;

// 获取时间
uniform float uTime;

void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    // 设置z轴弯曲
    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.05;
    modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
    vElevation = modelPosition.z;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}