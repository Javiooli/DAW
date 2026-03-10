type FileNode = {
  type: 'file';
  content: string;
};

type DirNode = {
  type: 'dir';
  children: Record<string, FsNode>;
};

type FsNode = FileNode | DirNode;

export type ExecutableDocument = {
  title: string;
  content: string;
  format: 'text' | 'markdown';
};

const HOME_SEGMENTS = ['home', 'visitor'];

const fsRoot: DirNode = {
  type: 'dir',
  children: {
    home: {
      type: 'dir',
      children: {
        visitor: {
          type: 'dir',
          children: {
            'about.txt': {
              type: 'file',
              content: [
                'Javier Pedragosa',
                'Frontend developer focused on useful and playful interfaces.',
                'Stack: TypeScript, Vue.js, Node.js, CSS.',
              ].join('\n'),
            },
            'skills.txt': {
              type: 'file',
              content: [
                '- JavaScript / TypeScript',
                '- Vue + Vite',
                '- Node.js',
                '- UI implementation and design systems',
              ].join('\n'),
            },
            'quick-notes.md': {
              type: 'file',
              content: [
                '# Quick Notes',
                '',
                'Welcome to my CLI portfolio.',
                '',
                '## Commands to try',
                '- `help`',
                '- `sysinfo`',
                '- `video`',
                '- `notepad ideas`',
                '',
                '## Contact',
                '- GitHub: https://github.com/javiooli',
                '- LinkedIn: https://www.linkedin.com/in/javier-pedragosa-lozano/',
              ].join('\n'),
            },
            projects: {
              type: 'dir',
              children: {
                'portfolio-cli.txt': {
                  type: 'file',
                  content: [
                    'Portfolio CLI (this project)',
                    'Interactive shell-like portfolio built with TypeScript + Vite. Inspired in',
                    'my love for Linux and made as a personal challenge.'
                  ].join('\n'),
                },
                'nessun-dorma.txt': {
                  type: 'file',
                  content: [
                    'Nessun Dorma',
                    'Inversions journal for investors to keep track of their transactions with',
                    'fiat currencies, precious metals and cryptocoins, with real-time data from',
                    'a professional, public API.'
                  ].join('\n'),
                },
                'collectify.txt': {
                  type: 'file',
                  content: [
                    'Collectify',
                    'Collectify is a web application designed to help users efficiently manage',
                    'and organize their personal collections, allowing the creation of any type',
                    'of collection and creating categories on the go.'
                  ].join('\n'),
                },
              },
            },
            contact: {
              type: 'dir',
              children: {
                'email.txt': {
                  type: 'file',
                  content: 'javipedragosa@gmail.com',
                },
                'github.txt': {
                  type: 'file',
                  content: 'https://github.com/javiooli',
                },
                'linkedin.txt': {
                    type: 'file',
                    content: 'https://www.linkedin.com/in/javier-pedragosa-lozano/'
                }
              },
            },
          },
        },
      },
    },
    'hey!.txt': {
        type: 'file',
        content: "I think you shouldn't be here... 🥴"
    }
  },
};

let cwd = [...HOME_SEGMENTS];

function normalizePath(pathArg: string): string[] {
  const raw = pathArg.trim();
  if (raw === '~') {
    return [...HOME_SEGMENTS];
  }

  if (raw.startsWith('~/')) {
    return normalizePath(`/${HOME_SEGMENTS.join('/')}/${raw.slice(2)}`);
  }

  const isAbsolute = raw.startsWith('/');
  const base = isAbsolute ? [] : [...cwd];
  const parts = raw.split('/').filter((part) => part.length > 0);

  for (const part of parts) {
    if (part === '.') {
      continue;
    }

    if (part === '..') {
      if (base.length > 0) {
        base.pop();
      }
      continue;
    }

    base.push(part);
  }

  return base;
}

function getNodeBySegments(segments: string[]): FsNode | null {
  let current: FsNode = fsRoot;

  for (const segment of segments) {
    if (current.type !== 'dir') {
      return null;
    }

    const next: FsNode | undefined = current.children[segment];
    if (!next) {
      return null;
    }

    current = next;
  }

  return current;
}

function toDisplayPath(segments: string[]): string {
  const isHome =
    segments.length >= HOME_SEGMENTS.length &&
    HOME_SEGMENTS.every((segment, index) => segments[index] === segment);

  if (isHome) {
    const rest = segments.slice(HOME_SEGMENTS.length);
    return rest.length === 0 ? '~' : `~/${rest.join('/')}`;
  }

  return `/${segments.join('/')}`;
}

export function getPromptLabel(): string {
  return `visitor@ooliOS:${toDisplayPath(cwd)}$`;
}

export function pwd(): string {
  return `/${cwd.join('/')}`;
}

export function cd(pathArg?: string): string {
  const target = (pathArg ?? '~').trim();
  const nextSegments = target === '~' ? [...HOME_SEGMENTS] : normalizePath(target);
  const node = getNodeBySegments(nextSegments);

  if (!node) {
    return `cd: no such file or directory: ${pathArg}`;
  }

  if (node.type !== 'dir') {
    return `cd: not a directory: ${pathArg}`;
  }

  cwd = nextSegments;
  return '';
}

export function ls(pathArg?: string): string {
  const segments = pathArg ? normalizePath(pathArg) : [...cwd];
  const node = getNodeBySegments(segments);

  if (!node) {
    return `ls: cannot access '${pathArg}': No such file or directory`;
  }

  if (node.type !== 'dir') {
    const filename = segments[segments.length - 1] ?? '';
    return filename;
  }

  const entries = Object.keys(node.children).sort();
  return entries.join('  ');
}

export function cat(pathArg?: string): string {
  if (!pathArg || pathArg.trim().length === 0) {
    return 'cat: missing file operand';
  }

  const segments = normalizePath(pathArg);
  const node = getNodeBySegments(segments);

  if (!node) {
    return `cat: ${pathArg}: No such file or directory`;
  }

  if (node.type === 'dir') {
    return `cat: ${pathArg}: Is a directory`;
  }

  return node.content;
}

export function completePath(
  partialPath: string,
  options?: { directoriesOnly?: boolean },
): string[] {
  const directoriesOnly = options?.directoriesOnly ?? false;
  const raw = partialPath.trim();

  if (raw === '~') {
    return ['~/'];
  }

  const lastSlash = raw.lastIndexOf('/');
  const hasSlash = lastSlash >= 0;
  const parentRaw = hasSlash ? raw.slice(0, lastSlash + 1) : '';
  const namePrefix = hasSlash ? raw.slice(lastSlash + 1) : raw;
  const parentForLookup = parentRaw.length === 0 ? '.' : parentRaw.endsWith('/') ? `${parentRaw}.` : parentRaw;

  const parentSegments = normalizePath(parentForLookup);
  const node = getNodeBySegments(parentSegments);
  if (!node || node.type !== 'dir') {
    return [];
  }

  const matches = Object.entries(node.children)
    .filter(([name, child]) => {
      if (!name.toLowerCase().startsWith(namePrefix.toLowerCase())) {
        return false;
      }

      if (directoriesOnly && child.type !== 'dir') {
        return false;
      }

      return true;
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, child]) => `${parentRaw}${name}${child.type === 'dir' ? '/' : ''}`);

  return matches;
}

export function resolveExecutableDocument(pathArg: string): ExecutableDocument | null {
  const trimmed = pathArg.trim();
  const normalized = trimmed.toLowerCase();
  if (!normalized.endsWith('.txt') && !normalized.endsWith('.md')) {
    return null;
  }

  const segments = normalizePath(trimmed);
  const node = getNodeBySegments(segments);
  if (!node || node.type !== 'file') {
    return null;
  }

  const title = segments[segments.length - 1] ?? 'note.txt';
  const format: ExecutableDocument['format'] = normalized.endsWith('.md') ? 'markdown' : 'text';
  return {
    title,
    content: node.content,
    format,
  };
}