precision lowp float;
// 负一到一得值需要转成0到1
varying float vElevation;

void main(){
    float acolor = (vElevation + 1.0) / 2.0;

    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}