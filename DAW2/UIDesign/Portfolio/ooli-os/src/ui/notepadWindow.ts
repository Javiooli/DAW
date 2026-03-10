import { attachWindowDragBehavior } from './windowDrag';

let topZIndex = 500;
let windowCount = 0;

function bringToFront(windowElement: HTMLDivElement) {
  topZIndex += 1;
  windowElement.style.zIndex = String(topZIndex);
}

export function openNotepadWindow(titleText: string, contentText: string) {
  windowCount += 1;

  const windowElement = document.createElement('div');
  windowElement.className = 'os-window os-window-notepad';
  windowElement.style.left = `${100 + (windowCount - 1) * 16}px`;
  windowElement.style.top = `${100 + (windowCount - 1) * 16}px`;
  bringToFront(windowElement);

  const titleBar = document.createElement('div');
  titleBar.className = 'os-window-titlebar';

  const title = document.createElement('span');
  title.textContent = `Notepad - ${titleText}`;

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

  const textArea = document.createElement('textarea');
  textArea.className = 'os-window-notepad-text';
  textArea.readOnly = true;
  textArea.value = contentText;

  content.appendChild(textArea);
  windowElement.appendChild(titleBar);
  windowElement.appendChild(content);
  document.body.appendChild(windowElement);

  attachWindowDragBehavior(windowElement, titleBar, bringToFront);
}

export function openEditableNotepadWindow(titleText?: string) {
  windowCount += 1;

  const windowElement = document.createElement('div');
  windowElement.className = 'os-window os-window-notepad';
  windowElement.style.left = `${100 + (windowCount - 1) * 16}px`;
  windowElement.style.top = `${100 + (windowCount - 1) * 16}px`;
  bringToFront(windowElement);

  const titleBar = document.createElement('div');
  titleBar.className = 'os-window-titlebar';

  const title = document.createElement('span');
  title.textContent = `Notepad - ${titleText && titleText.trim().length > 0 ? titleText : 'untitled'}`;

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

  const textArea = document.createElement('textarea');
  textArea.className = 'os-window-notepad-text';
  textArea.readOnly = false;
  textArea.value = '';

  content.appendChild(textArea);
  windowElement.appendChild(titleBar);
  windowElement.appendChild(content);
  document.body.appendChild(windowElement);

  attachWindowDragBehavior(windowElement, titleBar, bringToFront);

  textArea.focus();
}
