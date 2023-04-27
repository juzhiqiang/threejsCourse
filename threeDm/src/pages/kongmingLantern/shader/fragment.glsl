precision lowp float;
varying vec4 VPosition;
varying vec4 gPosition;

void main(){
    vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 yellowColor = vec4(1.0, 1.0, 0.0, 1.0);
    vec4 mixColor = mix(yellowColor, redColor, gPosition.y / 3.0);

    // 内部
    if(gl_FrontFacing){
        gl_FragColor = vec4(mixColor.xyz - VPosition.y / 100.0 - 0.15,1.0);
    }else{
        gl_FragColor = vec4(mixColor.xyz, 1.0);
    }
   
}