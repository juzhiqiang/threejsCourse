varying vec2 vUv;
uniform vec3 uColor;    
uniform float uTime;

// 使用旋转矩阵
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){
    // -0.5 为了围绕圆心
    vec2 newvUv = rotate2d(uTime * 6.28) * (vUv - 0.5); 
    newvUv += 0.5;
    float alpha = 1.0 -step(0.5,distance(newvUv,vec2(0.5)));
    float angle = atan(newvUv.x - 0.5,newvUv.y - 0.5);
    float strength = (angle + 3.14) / 6.28  ;
    gl_FragColor = vec4(uColor,alpha*strength);
}