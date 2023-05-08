precision lowp float;
precision highp float;

varying vec4 VPosition;
// 当前局部坐标
varying vec4 gPosition;
void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    VPosition = modelPosition;
    gPosition = vec4(position,1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}