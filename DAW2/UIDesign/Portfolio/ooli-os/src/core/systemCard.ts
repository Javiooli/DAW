import { pwd } from './virtualFs';

const LOGO_ASCII_LINES = [
  '    ##########  ##########    ',
  ' ############################ ',
  ' #####      ######       #### ',
  ' #####      ######      ##### ',
  ' #####      ######       #### ',
  ' ############################ ',
  ' ############################ ',
  '    ##########  ###########   ',
  '  #####          ###########  ',
  '  #####          ##########   ',
  '  #####             #####     ',
  '  #####             #####     ',
  '  #####             #####     ',
  '  #####             #####     ',
  '  ##########################  ',
  '  #########################   ',
  '                              ',
  '                              '
];

export type SystemCardRow = {
  logo: string;
  info: string;
};

function detectOS(userAgent: string, platform: string): string {
  const ua = userAgent.toLowerCase();
  const pf = platform.toLowerCase();

  if (ua.includes('windows') || pf.includes('win')) {
    return 'Windows';
  }

  if (ua.includes('android')) {
    return 'Android';
  }

  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    return 'iOS';
  }

  if (ua.includes('mac os') || pf.includes('mac')) {
    return 'macOS';
  }

  if (ua.includes('linux') || pf.includes('linux')) {
    return 'Linux';
  }

  return 'Unknown';
}

function pickMatch(input: string, regex: RegExp): string | null {
  const match = input.match(regex);
  return match?.[1] ?? null;
}

function detectBrowser(userAgent: string): string {
  const edge = pickMatch(userAgent, /Edg\/([\d.]+)/);
  if (edge) {
    return `Edge ${edge}`;
  }

  const chrome = pickMatch(userAgent, /Chrome\/([\d.]+)/);
  if (chrome && !userAgent.includes('OPR/')) {
    return `Chrome ${chrome}`;
  }

  const firefox = pickMatch(userAgent, /Firefox\/([\d.]+)/);
  if (firefox) {
    return `Firefox ${firefox}`;
  }

  const safari = pickMatch(userAgent, /Version\/([\d.]+).*Safari\//);
  if (safari && !userAgent.includes('Chrome/')) {
    return `Safari ${safari}`;
  }

  const opera = pickMatch(userAgent, /OPR\/([\d.]+)/);
  if (opera) {
    return `Opera ${opera}`;
  }

  return 'Unknown';
}

function getEngine(userAgent: string): string {
  if (userAgent.includes('Gecko/') && userAgent.includes('Firefox/')) {
    return 'Gecko';
  }

  if (userAgent.includes('AppleWebKit/') && userAgent.includes('Safari/')) {
    return 'WebKit/Blink';
  }

  return 'Unknown';
}

function supportsTouch(): string {
  const maxTouchPoints = navigator.maxTouchPoints ?? 0;
  return maxTouchPoints > 0 ? `Yes (${maxTouchPoints})` : 'No';
}

function getColorScheme(): string {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getClientInfoLines(): string[] {
  const ua = navigator.userAgent;
  const os = detectOS(ua, navigator.platform);
  const browser = detectBrowser(ua);
  const engine = getEngine(ua);
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const cores = navigator.hardwareConcurrency ? String(navigator.hardwareConcurrency) : 'n/a';
  const dpr = window.devicePixelRatio.toFixed(2);

  return [
    `Host OS: ${os}`,
    `Browser: ${browser}`,
    `Engine: ${engine}`,
    `Locale: ${language}`,
    `Timezone: ${timezone}`,
    `Screen: ${screenSize} @${dpr}x`,
    `CPU Cores: ${cores}`,
    `Touch: ${supportsTouch()}`,
    `Color Scheme: ${getColorScheme()}`,
    'IP: intentionally hidden',
  ];
}

export function getSystemCard() {
  const now = new Date();
  const date = now.toLocaleString();
  const clientInfoLines = getClientInfoLines();

  const infoLines = [
    'ooliOS // enhanced profile',
    '--------------------------',
    'User: visitor',
    `Path: ${pwd()}`,
    'Stack: TypeScript, Vue, Node.js',
    'UI: CLI + windowed mini-apps',
    `Date: ${date}`,
    '',
    'Client telemetry (local only)',
    '-----------------------------',
    ...clientInfoLines,
    '',
    'Tip: run `help` to explore commands.',
  ];
  const logoWidth = Math.max(...LOGO_ASCII_LINES.map((line) => line.length));

  const rowCount = Math.max(LOGO_ASCII_LINES.length, infoLines.length);
  const rows: SystemCardRow[] = [];

  for (let i = 0; i < rowCount; i += 1) {
    rows.push({
      logo: LOGO_ASCII_LINES[i] ?? '',
      info: infoLines[i] ?? '',
    });
  }

  return {
    rows,
    logoBlock: LOGO_ASCII_LINES.join('\n'),
    infoBlock: infoLines.join('\n'),
    logoWidth,
  };
}
