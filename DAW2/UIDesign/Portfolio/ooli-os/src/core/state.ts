import {addLine as addLineFromHistory} from "./commandHistory";


export type TerminalLine = {
    type: "input" | "output";
    content: string;
}

type State = {
    history: TerminalLine[],
}

let state: State = {
    history: [],
}

export function getState() {
    return state;
}

export function addLine(line: TerminalLine) {
    state.history.push(line);
    if (line.type == "input")
        addLineFromHistory(line.content);
}

export function clearTerminal() {
    state.history = [];
    console.log("-- Console cleared --");
    console.log("History:");
    state.history.forEach(line => {
        if (line.type == "input")
            console.log(line.content);
    });
}