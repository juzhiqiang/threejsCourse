precision lowp float;
// 负一到一得值需要转成0到1
varying float vElevation;
uniform vec3 uHighColor;
uniform vec3 uLowColor;
uniform float uOpacity;

void main(){
    float acolor = (vElevation + 1.0) / 2.0;
    vec3 color = mix(uLowColor, uHighColor, acolor);
    gl_FragColor = vec4(color, uOpacity);
}