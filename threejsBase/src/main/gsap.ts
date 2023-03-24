// 添加动画库
import gsap from "gsap";

export const gsapAnimatas = (cube: any) => {
  let gsapPosition = gsap.to(cube.position, {
    // 动画需要改变的参数
    x: 5,
    // 完成动画需要的时间
    duration: 5,
    // 动画按怎样的形式走
    ease: "power1.inOut",
    // 动画执行次数,-1无限次循环
    repeat: 2,
    // 往返运动
    yoyo: true,
    // 延迟运动,参数秒
    delay: 2,
    // 动画开始
    onStart: () => {
      console.log("动画开始");
    },
    // 动画完成后触发
    onComplete: () => {
      console.log("动画完成");
    },
  });
  gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

  window.addEventListener("dblclick", () => {
    if (gsapPosition.isActive()) {
      // 动画暂停
      gsapPosition.pause();
    } else {
      // 动画启动
      gsapPosition.resume();
    }
  });
};
