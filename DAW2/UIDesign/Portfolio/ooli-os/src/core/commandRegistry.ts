import { cat, cd, getPromptLabel, ls, pwd, resolveExecutableDocument } from './virtualFs';

type PendingTextApp = {
    title: string;
    content: string;
    format: 'text' | 'markdown';
};

let pendingTextApp: PendingTextApp | null = null;
let pendingNotepadTitle: string | null = null;

type CommandHandler = (args: string[]) => string;

export const commandDescriptions: Record<string, string> = {
    help: 'Display command help.',
    sysinfo: 'Display system profile and logo.',
    notepad: 'Open an empty editable notepad window.',
    about: 'Display profile summary.',
    projects: 'List featured projects.',
    clear: 'Clear terminal output.',
    video: 'Open a draggable, resizable window with the presentation video.',
    pwd: 'Print the current virtual path.',
    ls: 'List files and directories.',
    cd: 'Change directory.',
    cat: 'Display file contents.',
};

const commandUsage: Partial<Record<keyof typeof commandDescriptions, string>> = {
    help: 'help [command]',
    sysinfo: 'sysinfo',
    notepad: 'notepad [title]',
    about: 'about',
    projects: 'projects',
    clear: 'clear',
    video: 'video',
    pwd: 'pwd',
    ls: 'ls [path]',
    cd: 'cd <path>',
    cat: 'cat <path-to-file>',
};

function formatHelp(): string {
    const entries = Object.keys(commandDescriptions).sort();
    const maxLength = Math.max(...entries.map((name) => name.length));
    const commandLines = entries
        .map((name) => `  ${name.padEnd(maxLength + 2, ' ')}${commandDescriptions[name]}`)
        .join('\n');

    return [
        'Available commands',
        '------------------',
        commandLines,
        '',
        'Executable docs: run ./<path>.txt or ./<path>.md',
        'Tip: run help <command> for detailed usage.',
    ].join('\n');
}

function help(args: string[]): string {
    if (args.length === 0 || args[0].trim().length === 0) {
        return formatHelp();
    }

    const command = args[0].toLowerCase();
    const description = commandDescriptions[command];
    if (!description) {
        return `help: unknown command '${args[0]}'.`;
    }

    const usage = commandUsage[command as keyof typeof commandDescriptions] ?? command;
    const extraLines = command === 'help'
        ? ['Examples:', '  ./about.txt', '  ./quick-notes.md']
        : [];

    return [
        `Command: ${command}`,
        `Description: ${description}`,
        `Usage: ${usage}`,
        ...extraLines,
    ].join('\n');
}

export const commands: Record<string, CommandHandler> = {
    help,
    sysinfo: () => '__SHOW_SYSINFO__',
    notepad: (args) => {
        const title = args.join(' ').trim();
        pendingNotepadTitle = title.length > 0 ? title : null;
        return '__OPEN_NOTEPAD__';
    },
    about: () => 'Soy Javier Pedragosa, desarrollador web.',
    projects: () => '- portfolio-cli\n- Nessun Dorma\n- Collectify\n\n(try: ls ~/projects and cat files)',
    clear: () => '__CLEAR__',
    video: () => '__OPEN_VIDEO__',
    pwd: () => pwd(),
    ls: (args) => ls(args[0]),
    cd: (args) => cd(args[0]),
    cat: (args) => cat(args[0]),
};

export function getCommandNames(): string[] {
    return Object.keys(commands).sort();
}

const aliases: Record<string, string> = {
    '?': 'help',
    cls: 'clear',
};

export function getPrompt(): string {
    return getPromptLabel();
}

export function consumePendingTextApp(): PendingTextApp | null {
    const pending = pendingTextApp;
    pendingTextApp = null;
    return pending;
}

export function consumePendingNotepadTitle(): string | null {
    const pending = pendingNotepadTitle;
    pendingNotepadTitle = null;
    return pending;
}

export function runCommand(input: string): string {
    const parts = input.trim().split(/\s+/).filter((value) => value.length > 0);

    if (parts.length === 0) {
        return '';
    }

    const [rawCommand, ...args] = parts;
    const command = aliases[rawCommand] ?? rawCommand;
    const handler = commands[command];

    if (!handler) {
        if (args.length === 0 && rawCommand.startsWith('./') && rawCommand.length > 2) {
            const executablePath = rawCommand.slice(2);
            const executableDocument = resolveExecutableDocument(executablePath);
            if (executableDocument) {
                pendingTextApp = executableDocument;
                return '__OPEN_TEXT_APP__';
            }
        }

        return `Command not found: ${rawCommand}`;
    }

    return handler(args);
}