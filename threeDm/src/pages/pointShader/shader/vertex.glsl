
varying vec2 vUv;
attribute float imgIndex;
attribute float aScale;
varying float vImgIndex;
uniform float uTime;
varying vec3 vColor;
void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vUv = uv;
    vImgIndex = imgIndex;
    // 获取顶点角度
    float angle = atan(modelPosition.x, modelPosition.z);
    // 获取顶点到中心距离
    float distanceToCenter = length(modelPosition.xz);
    // 根据顶点到中心的距离，设置旋转偏移的度数
    float angleOffset = 1.0  / distanceToCenter * uTime;;
    // 目前旋转度数
    angle+=angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    // 根据viewposition的Z轴坐标决定是否远离相机，size必须设置否则看不到大小
    gl_PointSize = 200.0 * aScale / -viewPosition.z;

    vColor = color;
}