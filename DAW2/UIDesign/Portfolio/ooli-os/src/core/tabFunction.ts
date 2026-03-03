import { commands } from './commandRegistry'; 
import { addLine, getState } from "./state";

let allCommands: string = "";

function loadAllCommandsText() {
    allCommands += "==== Commands ====\n";
    Object.keys(commands).forEach(command => {
        allCommands += `  - ${command}\n`;
    })
    allCommands += "==================\n";
}

export function searchCommand(container: HTMLInputElement) {
    let partial: string = container.value;
    let found: string = "";
    console.log(partial);
    for (const command of Object.keys(commands)) {
        if (partial === "") {
            found = Object.keys(commands).toString();
            addLine({ type: "output", content: allCommands});
            return "";
        }
        if (command.toLowerCase() === partial.toLowerCase()) {
            found = Object.keys(commands)[Object.keys(commands).indexOf(command) + 1];
        }
        if (command.toLowerCase().startsWith(partial.toLowerCase())) {
            console.log("Command found: ", command);
            found = command;
            return found;
        }
        if (getState()["history"].length > 0 && getState()["history"][getState()["history"].length - 1].content === allCommands)
            return "";
    }
    return found;
}

loadAllCommandsText();