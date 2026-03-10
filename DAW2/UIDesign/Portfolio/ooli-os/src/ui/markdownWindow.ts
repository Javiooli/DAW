import { attachWindowDragBehavior } from './windowDrag';

let topZIndex = 550;
let windowCount = 0;

function bringToFront(windowElement: HTMLDivElement) {
  topZIndex += 1;
  windowElement.style.zIndex = String(topZIndex);
}

function createWindowShell(titleText: string) {
  windowCount += 1;

  const windowElement = document.createElement('div');
  windowElement.className = 'os-window os-window-markdown';
  windowElement.style.left = `${120 + (windowCount - 1) * 14}px`;
  windowElement.style.top = `${120 + (windowCount - 1) * 14}px`;
  bringToFront(windowElement);

  const titleBar = document.createElement('div');
  titleBar.className = 'os-window-titlebar';

  const title = document.createElement('span');
  title.textContent = `Markdown - ${titleText}`;

  const closeButton = document.createElement('button');
  closeButton.className = 'os-window-close';
  closeButton.type = 'button';
  closeButton.textContent = 'x';
  closeButton.addEventListener('click', () => {
    windowElement.remove();
  });

  titleBar.appendChild(title);
  titleBar.appendChild(closeButton);

  windowElement.appendChild(titleBar);
  document.body.appendChild(windowElement);

  attachWindowDragBehavior(windowElement, titleBar, bringToFront);

  return windowElement;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderInline(markdown: string): string {
  return markdown
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderMarkdownToHtml(markdown: string): string {
  const escaped = escapeHtml(markdown);
  const lines = escaped.split('\n');
  const html: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim().length === 0) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith('## ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith('# ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInline(line.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      html.push('</ul>');
      inList = false;
    }

    html.push(`<p>${renderInline(line)}</p>`);
  }

  if (inList) {
    html.push('</ul>');
  }

  return html.join('');
}

export function openMarkdownWindow(titleText: string, markdownContent: string) {
  const windowElement = createWindowShell(titleText);

  const content = document.createElement('div');
  content.className = 'os-window-content os-window-markdown-content';

  const article = document.createElement('article');
  article.className = 'os-window-markdown-body';
  article.innerHTML = renderMarkdownToHtml(markdownContent);

  content.appendChild(article);
  windowElement.appendChild(content);
}
