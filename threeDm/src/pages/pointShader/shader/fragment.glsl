precision lowp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying float vImgIndex;
varying vec3 vColor;

void main(){

    // 着色器绘制圆
    // // 设置圆,渐变圆
    float strength = distance(gl_PointCoord, vec2(0.5));
    // // 设置强度让需要透明地方更透明
    strength*=2.0;
    strength = 1.0 - strength;
    strength = pow(strength,1.5);
    // gl_FragColor = vec4(strength);

    // 通过纹理材质设置点材质效果
    // 采样纹理图片的颜色
     vec4 textureColor;
    if(vImgIndex == 0.0){
        textureColor = texture2D(uTexture, gl_PointCoord);
    }else if(vImgIndex == 1.0){
        textureColor = texture2D(uTexture1, gl_PointCoord);
    }else{
        textureColor = texture2D(uTexture2, gl_PointCoord);
    };
    vec3 mixColor = mix(vec3(0.0),vColor,strength);
    gl_FragColor = vec4(mixColor, textureColor.r);
}