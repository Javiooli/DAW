import { addLine, getState, clearTerminal } from "../core/state";
import { consumePendingNotepadTitle, consumePendingTextApp, getPrompt, runCommand } from "../core/commandRegistry";
import { getPastCommand } from "../core/commandHistory";
import { resetAutocompleteState, searchCommand } from "../core/tabFunction";
import { openPresentationWindow } from "./videoWindow";
import { getSystemCard } from "../core/systemCard";
import { openEditableNotepadWindow, openNotepadWindow } from "./notepadWindow";
import { openMarkdownWindow } from "./markdownWindow";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_EXACT_REGEX = /^https?:\/\/[^\s]+$/;
const SYSCARD_SEPARATOR = '\u001F';

let systemCardLogoWidth = 0;

export function initTerminal() {
    const input = document.getElementById("terminal-input") as HTMLInputElement;
    const output = document.getElementById("terminal-output") as HTMLDivElement;
    const prompt = document.getElementById("terminal-prompt") as HTMLSpanElement;

    prompt.textContent = getPrompt();
    showSystemCard();
    render(output);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Tab") { // Future Autocomplete :)
            e.preventDefault();
            inputFoundCommand(input);
            render(output);
            return;
        }

        resetAutocompleteState();

        if (e.key === "ArrowUp") {
            e.preventDefault();
            inputPastCommand(input, true);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            inputPastCommand(input, false);
            return;
        }

        if (e.key === "Enter") {
            const value = input.value;

            addLine({ type: "input", content: value, prompt: getPrompt() });

            const result = runCommand(value);

            if (result === "__CLEAR__") {
                clearTerminal();
            } else if (result === "__OPEN_VIDEO__") {
                openPresentationWindow();
                addLine({ type: "output", content: "Opened presentation window." });
            } else if (result === "__OPEN_TEXT_APP__") {
                const textApp = consumePendingTextApp();
                if (textApp) {
                    if (textApp.format === 'markdown') {
                        openMarkdownWindow(textApp.title, textApp.content);
                    } else {
                        openNotepadWindow(textApp.title, textApp.content);
                    }
                    addLine({ type: "output", content: `Opened ${textApp.title}.` });
                }
            } else if (result === "__OPEN_NOTEPAD__") {
                const title = consumePendingNotepadTitle();
                openEditableNotepadWindow(title ?? undefined);
                addLine({ type: "output", content: "Opened notepad." });
            } else if (result === "__SHOW_SYSINFO__") {
                showSystemCard();
            } else if (result.length > 0) {
                addLine({ type: "output", content: result });
            }

            render(output);
            prompt.textContent = getPrompt();
            input.value = "";
        }
    });

    input.addEventListener("focusout", (event) => {
        const nextTarget = event.relatedTarget as HTMLElement | null;
        const activeElement = document.activeElement as HTMLElement | null;
        const destination = nextTarget ?? activeElement;

        if (destination?.closest('.os-window')) {
            return;
        }

        input.focus();
    });
}

export function render(container: HTMLDivElement) {
    container.innerHTML = "";

    const state = getState();

    state.history.forEach(line => {
        const div = document.createElement("div");
        if (line.variant === "logo") {
            div.classList.add("terminal-logo");
        }
        if (line.type === "input") {
            div.textContent = `${line.prompt ?? getPrompt()} ${line.content}`;
        } else if (line.variant === "syscard") {
            appendSystemCardRow(div, line.content);
        } else {
            appendOutputContent(div, line.content);
        }
        container.appendChild(div);
    })

    // Keep viewport pinned to the latest output, like a terminal.
    window.requestAnimationFrame(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
    });
}

function showSystemCard() {
    const card = getSystemCard();
    systemCardLogoWidth = card.logoWidth;

    if (window.matchMedia('(max-width: 640px)').matches) {
        addLine({
            type: "output",
            content: card.logoBlock,
            variant: "logo",
        });
        addLine({
            type: "output",
            content: card.infoBlock,
        });
        return;
    }

    card.rows.forEach((row) => {
        addLine({
            type: "output",
            content: `${row.logo}${SYSCARD_SEPARATOR}${row.info}`,
            variant: "syscard",
        });
    });
}

function appendSystemCardRow(container: HTMLDivElement, content: string) {
    const [logo = '', info = ''] = content.split(SYSCARD_SEPARATOR);
    container.classList.add('terminal-syscard-row');

    const logoSpan = document.createElement('span');
    logoSpan.className = 'terminal-logo terminal-syscard-logo';
    logoSpan.textContent = logo.trimEnd();
    if (systemCardLogoWidth > 0) {
        logoSpan.style.width = `${systemCardLogoWidth}ch`;
    }

    const infoSpan = document.createElement('span');
    infoSpan.className = 'terminal-syscard-info';
    infoSpan.textContent = info;

    container.appendChild(logoSpan);
    container.appendChild(infoSpan);
}

function appendOutputContent(container: HTMLDivElement, content: string) {
    const parts = content.split(URL_REGEX);

    for (const part of parts) {
        if (part.length === 0) {
            continue;
        }

        if (URL_EXACT_REGEX.test(part)) {
            const link = document.createElement('a');
            link.href = part;
            link.textContent = part;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            container.appendChild(link);
            continue;
        }

        container.appendChild(document.createTextNode(part));
    }
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
