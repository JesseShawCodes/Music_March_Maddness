export default function CheckIsIos() {
  // Check if it's an iOS device (iPhone, iPad, iPod)
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  return isIOS;
}
