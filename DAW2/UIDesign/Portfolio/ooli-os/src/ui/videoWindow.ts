import { attachWindowDragBehavior } from './windowDrag';

const VIDEO_URL = 'https://www.youtube.com/embed/6_UMaZJVq3U';

let topZIndex = 300;
let windowCount = 0;

function bringToFront(windowElement: HTMLDivElement) {
  topZIndex += 1;
  windowElement.style.zIndex = String(topZIndex);
}

export function openPresentationWindow() {
  windowCount += 1;

  const windowElement = document.createElement('div');
  windowElement.className = 'os-window';
  windowElement.style.left = `${80 + (windowCount - 1) * 20}px`;
  windowElement.style.top = `${80 + (windowCount - 1) * 20}px`;
  bringToFront(windowElement);

  const titleBar = document.createElement('div');
  titleBar.className = 'os-window-titlebar';

  const title = document.createElement('span');
  title.textContent = 'Presentation Video';

  const closeButton = document.createElement('button');
  closeButton.className = 'os-window-close';
  closeButton.type = 'button';
  closeButton.textContent = 'x';
  closeButton.addEventListener('click', () => {
    windowElement.remove();
  });

  titleBar.appendChild(title);
  titleBar.appendChild(closeButton);

  const content = document.createElement('div');
  content.className = 'os-window-content';

  const iframe = document.createElement('iframe');
  iframe.className = 'os-window-iframe';
  iframe.src = VIDEO_URL;
  iframe.title = 'Javier Pedragosa presentation video';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  content.appendChild(iframe);
  windowElement.appendChild(titleBar);
  windowElement.appendChild(content);
  document.body.appendChild(windowElement);

  attachWindowDragBehavior(windowElement, titleBar, bringToFront);
}
