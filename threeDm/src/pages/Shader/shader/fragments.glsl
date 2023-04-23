precision lowp float;
varying vec2 vUv;
varying float vElevation;
uniform float uTime;

#define PI 3.141592654

// 声明随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid){
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

// 噪声函数
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
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
    // float strength = 0.15 / distance(vec2(vUv.x,vUv.y * 5.0),vec2(.5, .5)) - 1.0;

    // 旋转飞镖效果
    // vec2 rotateUv = rotate(vUv,3.14*0.25,vec2(0.5));
    // vec2 rotateUv = rotate(vUv,-uTime*5.0,vec2(0.5));
    // float strength = 0.15 / distance(vec2(rotateUv.x,(rotateUv.y - 0.5)*5.0 +0.5),vec2(.5, .5)) - 1.0;
    // float strength += 0.15 / distance(vec2(rotateUv.y,(rotateUv.x - 0.5)*5.0 +0.5),vec2(.5, .5)) - 1.0;
    // gl_FragColor = vec4(strength,strength,strength,strength);

    // 绘制圆
    // float strength = step(0.5, distance(vUv,vec2(0.5))+0.35);
    // strength *= (1.0 - step(0.5, distance(vUv,vec2(0.5))+0.25));
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 环波浪
    // vec2 waveUv = vec2(vUv.x, vUv.y+sin(vUv.x * 30.0) * 0.1);
    // float strength  = 1.0 - step(0.01,abs(distance(waveUv, vec2(0.5)) - 0.25));

    // 奶油蛋糕
    // vec2 waveUv = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y+sin(vUv.x * 30.0) * 0.1);
    // float strength  = 1.0 - step(0.01,abs(distance(waveUv, vec2(0.5)) - 0.25));

    // 根据角度实现螺线渐变，可演变成雷达扫射
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = (angle + 3.14) / 6.28;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 实现雷达扫射
    // vec2 rotateUv = rotate(vUv,-uTime*5.0,vec2(0.5));
    // float alpha =  1.0 - step(0.5,distance(vUv,vec2(0.5)));
    // float angle = atan(rotateUv.x-0.5,rotateUv.y-0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor =vec4(strength,strength,strength,alpha);

    // 实现万花筒效果
    // float angle = atan(vUv.x-0.5,vUv.y-0.5) / (2.0 * PI);
    // float strength = mod(angle * 10.0, 1.0);

    // 光射
    // float angle = atan(vUv.x-0.5,vUv.y-0.5) / (2.0 * PI);
    // float strength = sin(angle * 100.0);

    // ------------- 噪声的使用------------------------------------------------------------
    // 实现奶牛皮肤效果
    // float strength = step(0.5 , noise(vUv * 10.0));

    // 实现发光路径
    //  float strength = 1.0 - abs(cnoise(vUv * 10.0));

    //  波纹效果，带糊度
    // float strength = sin(cnoise(vUv * 10.0) * 5.0 + uTime);

    // 波纹效果，锐利 
    // float strength = step(0.9, sin(cnoise(vUv * 10.0) * 5.0 + uTime));

    // 使用混合函数颜色
    vec3 blackColor = vec3(0.0,0.0,0.0);
    vec3 yellowColor = vec3(1.0,1.0,0.0);
    vec3 uvColor = vec3(vUv,1.0);
    float strength = step(0.9,sin(cnoise(vUv * 10.0) * 20.0));
    vec3 minColor = mix(blackColor,uvColor,strength);
    gl_FragColor = vec4(minColor,1);
}