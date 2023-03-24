// 请求全屏动画
export const fullscreen = (el: any, isFullscreen: boolean = false) => {
  if (isFullscreen) {
    // 进入全屏
    el.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};
