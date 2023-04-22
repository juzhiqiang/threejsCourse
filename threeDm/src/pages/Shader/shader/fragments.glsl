precision lowp float;
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
// 声明随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

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
    // float strength = abs(vUv.x - 0.5);
    // strength = min(abs(vUv.y - 0.5), strength);

    // 利用取整实现条纹渐变
    // 向下取整
    // float strength = floor(vUv.x * 10.0)/10.0;

    // 条纹相乘渐变格子
    // float strength = floor(vUv.x * 10.0)/10.0 * floor(vUv.y * 10.0)/10.0;

    // 随机效果
    // float strength = random(vUv);

    // 随机加格子效果
    // float strength = ceil(vUv.x*10.0)/10.0 * ceil(vUv.y*10.0)/10.0;
    // strength = random(vec2(strength,strength));

    // 沿着半径变化颜色
    // float strength = length(vUv);

    // 根据distance计算两个向量间距离
    // float strength = 1.0 - distance(vUv,vec2(.5,.5));
    // gl_FragColor = vec4(strength,strength,strength,1);

    // 使用distance相除实现星星效果
    // float strength = 0.15 / distance(vUv,vec2(.5,.5)) - 1.0;

    // 设置vuv水平/或者竖直变量
    float strength = 0.15 / distance(vec2(vUv.x,vUv.y * 5.0),vec2(.5, .5)) - 1.0;
    gl_FragColor = vec4(strength,strength,strength,strength);


}