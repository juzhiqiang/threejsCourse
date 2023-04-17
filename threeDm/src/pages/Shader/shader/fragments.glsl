precision lowp float;
varying vec2 vUv;
varying float vElevation;

void main(){
    // 通过顶点对应的uv,决定每一个像素在uv图像的位置，通过这个位置决定x,y的颜色
    // gl_FragColor = vec4(vUv,0.0,1.0);

    // 对第一种变形
    // gl_FragColor = vec4(vUv,1.0,1.0);   

    // ----------------------------- 渐变
    // 利用uv实现渐变效果,左到右    
    // float strength  = vUv.x;

    // 利用uv实现下到上渐变
    // float strength  = vUv.y;

    // 利用uv实现上到下渐变
    float strength  = 1.0 - vUv.y;
    gl_FragColor = vec4(strength,strength,strength,1);

}