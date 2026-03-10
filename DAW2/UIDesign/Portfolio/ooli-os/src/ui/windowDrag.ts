export function attachWindowDragBehavior(
  windowElement: HTMLDivElement,
  titleBar: HTMLDivElement,
  bringToFront: (windowEl: HTMLDivElement) => void,
) {
  let isDragging = false;
  let activePointerId: number | null = null;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.addEventListener('pointerdown', (event: PointerEvent) => {
    if ((event.target as HTMLElement).closest('.os-window-close')) {
      return;
    }

    isDragging = true;
    activePointerId = event.pointerId;
    offsetX = event.clientX - windowElement.offsetLeft;
    offsetY = event.clientY - windowElement.offsetTop;

    bringToFront(windowElement);
    titleBar.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  titleBar.addEventListener('pointermove', (event: PointerEvent) => {
    if (!isDragging || activePointerId !== event.pointerId) {
      return;
    }

    windowElement.style.left = `${event.clientX - offsetX}px`;
    windowElement.style.top = `${event.clientY - offsetY}px`;
  });

  const endDrag = (event: PointerEvent) => {
    if (activePointerId !== null && event.pointerId !== activePointerId) {
      return;
    }

    if (activePointerId !== null && titleBar.hasPointerCapture(activePointerId)) {
      titleBar.releasePointerCapture(activePointerId);
    }

    isDragging = false;
    activePointerId = null;
  };

  titleBar.addEventListener('pointerup', endDrag);
  titleBar.addEventListener('pointercancel', endDrag);
  titleBar.addEventListener('lostpointercapture', () => {
    isDragging = false;
    activePointerId = null;
  });

  windowElement.addEventListener('pointerdown', () => {
    bringToFront(windowElement);
  });
}
