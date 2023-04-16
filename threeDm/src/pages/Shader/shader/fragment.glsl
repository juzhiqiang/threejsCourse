precision lowp float;
varying vec2 vUv;
varying float vElevation;
// 导出材质
uniform sampler2D uTexture;

void main(){
    // 根据uv进行采样，取出图片中对应的颜色
    float deep= vElevation+0.05*10.0;
    vec4 textureColor = texture2D(uTexture,vUv);
    textureColor.rgb *= deep;
    gl_FragColor = textureColor;

    // float deep= vElevation+0.05*10.0;
    // gl_FragColor = vec4(1.0*deep,0.0,1.0 ,1.0);
}