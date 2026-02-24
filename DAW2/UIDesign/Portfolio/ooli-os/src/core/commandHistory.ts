export type Command = {
    content: string;
    index: number;
}

type CommandHistory = {
    history: Command[],
    pointer: number;
}

let history: CommandHistory = {
    history: [],
    pointer: 0
}

export function getHistory() {
    return history;
}

export function addLine(line: string) {
    if (history.history.length > 0 && line == history.history[history.pointer - 1].content) {
        history.pointer = history.history.length;
        return
    }
    let index: number = history.history.length === 0 ? 0 : history.history[history.history.length - 1].index + 1
    let command: Command = {
        content: line,
        index: index
    }
    console.log(`Added ${command.content} to history with index ${command.index}.`)
    history.history.push(command);
    history.pointer = history.history.length;
}

export function getPastCommand(up: boolean) {
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
    
    console.log(`History pointer = ${history.pointer}`)
    return history.history[history.pointer].content;
}