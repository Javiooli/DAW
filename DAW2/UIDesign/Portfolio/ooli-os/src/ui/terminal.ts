import { addLine, getState, clearTerminal } from "../core/state";
import { runCommand, commandDescriptions } from "../core/commandRegistry";
import { getPastCommand } from "../core/commandHistory";
import { searchCommand } from "../core/tabFunction";

export function initTerminal() {
    const input = document.getElementById("terminal-input") as HTMLInputElement;
    const output = document.getElementById("terminal-output") as HTMLDivElement;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Tab") { // Future Autocomplete :)
            e.preventDefault();
            inputFoundCommand(input);
            render(output);
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            console.log("Arrow up pressed");
            inputPastCommand(input, true);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            console.log("Arrow down pressed");
            inputPastCommand(input, false);
            return;
        }

        if (e.key === "Enter") {
            const value = input.value;

            addLine({ type: "input", content: value });

            const result = runCommand(value);

            if (result === "__CLEAR__") {
                clearTerminal();
            } else if (result === "_HELP_") {
                askHelp(value.substring(value.toLowerCase().indexOf("help") + 4).trim());
            } else {
                addLine({ type: "output", content: result });
            }

            render(output);
            input.value = "";
        }
    });

    input.addEventListener("focusout", () => {
        input.focus();
    });
}

export function render(container: HTMLDivElement) {
    container.innerHTML = "";

    const state = getState();

    state.history.forEach(line => {
        const div = document.createElement("div");
        div.textContent = line.content;
        container.appendChild(div);
    })
}

function inputPastCommand(container: HTMLInputElement, up: boolean) {
    let pastCommand: string = getPastCommand(up);
    if (pastCommand == container.value) {
        container.style.backgroundColor = "white";
    }
    container.value = pastCommand;

    container.style.backgroundColor = "transparent";
}

function inputFoundCommand(container: HTMLInputElement) {
    let foundCommand: string = searchCommand(container);
    container.value = foundCommand;
}

function askHelp(command: string) {
    addLine({ type: "output", content: commandDescriptions[command] });
}
