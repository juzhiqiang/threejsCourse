precision lowp float;
varying vec2 vUv;
varying float vElevation;
uniform float uTime;

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
    // float strength  = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength,strength,strength,1);

    // 利用uv 实现短范围渐变
    // float strength = vUv.y * 8.0;

    // 利用取模达到反复效果
    // float strength = mod(vUv.y * 10.0,1.0);

     // 利用步长实现非渐变条纹效果 step(edge, x) 如果 x < edge , 返回 0.0 ，否则返回 1.0
    // float strength = mod(vUv.y * 10.0,1.0);
    // strength = step(0.5,strength);

    // 条纹多方向组合
    // float strength = step(0.5, mod(vUv.y * 10.0,1.0));
    // strength += step(0.5, mod(vUv.x * 10.0,1.0));

    // // 条纹相乘，相交的地方白色
    // float strength = step(0.5, mod(vUv.y * 10.0,1.0));
    // strength *= step(0.5, mod(vUv.x * 10.0,1.0));

    // 条纹相减，相交的地方黑色
    // float strength = step(0.8, mod(vUv.x * 10.0,1.0));
    // strength -= step(0.8, mod(vUv.y * 10.0,1.0));

    // 条纹偏移
    // float strength = step(0.4,mod(vUv.x * 10.0,1.0));
    // strength *= step(0.8,mod(vUv.y * 10.0 ,1.0));
    // gl_FragColor = vec4(strength,strength,strength,1);

    // uv动起来
    // float barX = step(0.4, mod((vUv.x + uTime * 0.1) *  10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod((vUv.y+ uTime * 0.1) *  10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength,strength,strength,1);
    // gl_FragColor = vec4(vUv,1.0,strength);

    // 利用绝对值将负数取消
    float strength = abs(vUv.x - 0.5);
    gl_FragColor = vec4(strength,strength,strength,1);


}