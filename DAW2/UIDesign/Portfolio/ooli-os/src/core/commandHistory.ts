export type Command = {
    content: string;
    index: number;
}

type StoredCommandHistory = {
    history: Command[];
}

type CommandHistory = {
    history: Command[],
    pointer: number;
}

let history: CommandHistory = {
    history: [],
    pointer: 0
}

const HISTORY_STORAGE_KEY = 'ooli-os-command-history';

function loadHistory() {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
        if (!raw) {
            return;
        }

        const parsed = JSON.parse(raw) as StoredCommandHistory;
        if (!Array.isArray(parsed.history)) {
            return;
        }

        history.history = parsed.history;
        history.pointer = history.history.length;
    } catch {
        history.history = [];
        history.pointer = 0;
    }
}

function persistHistory() {
    if (typeof window === 'undefined') {
        return;
    }

    const payload: StoredCommandHistory = {
        history: history.history,
    };

    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(payload));
}

export function getHistory() {
    return history;
}

export function addLine(line: string) {
    if (line.trim().length === 0) {
        history.pointer = history.history.length;
        return;
    }

    if (history.history.length > 0 && line == history.history[history.pointer - 1].content) {
        history.pointer = history.history.length;
        return
    }
    let index: number = history.history.length === 0 ? 0 : history.history[history.history.length - 1].index + 1
    let command: Command = {
        content: line,
        index: index
    }
    history.history.push(command);
    history.pointer = history.history.length;
    persistHistory();
}

export function getPastCommand(up: boolean) {
    if (history.history.length === 0) {
        return '';
    }

    if (up) {
        if (history.pointer == 0)
            return history.history[history.pointer].content;
        history.pointer -= 1;
    } else {
        if (history.pointer >= history.history.length - 1) {
            if (history.pointer != history.history.length)
                history.pointer += 1;
            return "";
        }
        history.pointer += 1;
    }

    return history.history[history.pointer].content;
}

loadHistory();