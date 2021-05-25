export const enterFullScreen = () => {
  if (isFullScreen()) return
  const element = document.documentElement;
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

export const exitFullScreen = () => {
  if (!isFullScreen()) return
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  else if (document.mozExitFullScreen) document.mozExitFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

export const isFullScreen = () => {
  return !!(
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  );
}