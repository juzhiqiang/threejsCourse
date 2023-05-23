precision lowp float;
uniform vec3 uColor;

void main(){
    // 着色器做圆球
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = distanceToCenter * 2.0;
    strength = 1.0 - strength;
    strength = pow(strength, 1.5);
    gl_FragColor = vec4(uColor, strength);
}