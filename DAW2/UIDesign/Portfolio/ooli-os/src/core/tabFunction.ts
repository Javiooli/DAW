import { getCommandNames } from './commandRegistry';
import { completePath } from './virtualFs';
import { addLine } from './state';

const PATH_COMMANDS = new Set(['cd', 'ls', 'cat']);
const COMMAND_ARGUMENT_COMPLETION = new Set(['help', 'cd', 'ls', 'cat']);

type CycleState = {
    mode: 'command' | 'path';
    candidates: string[];
    index: number;
    expectedInput: string;
    startPrefix: string;
};

let cycleState: CycleState | null = null;

function setCycleState(state: CycleState) {
    cycleState = state;
}

export function resetAutocompleteState() {
    cycleState = null;
}

function maybeCycle(input: string, mode: 'command' | 'path'): string | null {
    if (!cycleState || cycleState.mode !== mode) {
        return null;
    }

    if (input !== cycleState.expectedInput) {
        return null;
    }

    const candidate = cycleState.candidates[cycleState.index];
    cycleState.index = (cycleState.index + 1) % cycleState.candidates.length;

    const nextValue = `${cycleState.startPrefix}${candidate}`;
    cycleState.expectedInput = nextValue;
    return nextValue;
}

function longestCommonPrefix(values: string[]): string {
    if (values.length === 0) {
        return '';
    }

    let prefix = values[0];
    for (let i = 1; i < values.length; i += 1) {
        while (!values[i].startsWith(prefix) && prefix.length > 0) {
            prefix = prefix.slice(0, -1);
        }
    }

    return prefix;
}

function showSuggestions(title: string, matches: string[]) {
    addLine({
        type: 'output',
        content: `${title}\n${matches.map((match) => `  - ${match}`).join('\n')}`,
    });
}

function completeCommand(input: string): string {
    const cycleResult = maybeCycle(input, 'command');
    if (cycleResult !== null) {
        return cycleResult;
    }

    const commands = getCommandNames();

    if (input.trim().length === 0) {
        showSuggestions('Available commands:', commands);

        setCycleState({
            mode: 'command',
            candidates: commands,
            index: 0,
            expectedInput: '',
            startPrefix: '',
        });

        return input;
    }

    const matches = commands.filter((command) => command.startsWith(input));
    if (matches.length === 0) {
        resetAutocompleteState();
        return input;
    }

    if (commands.includes(input) && COMMAND_ARGUMENT_COMPLETION.has(input)) {
        resetAutocompleteState();
        return `${input} `;
    }

    if (matches.length === 1) {
        resetAutocompleteState();
        return matches[0];
    }

    showSuggestions('Matching commands:', matches);
    const commonPrefix = longestCommonPrefix(matches);
    setCycleState({
        mode: 'command',
        candidates: matches,
        index: 0,
        expectedInput: commonPrefix,
        startPrefix: '',
    });
    return commonPrefix;
}

function completeCommandPath(input: string): string {
    const cycleResult = maybeCycle(input, 'path');
    if (cycleResult !== null) {
        return cycleResult;
    }

    const endsWithSpace = /\s$/.test(input);
    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    if (command === 'help') {
        const currentArg = endsWithSpace ? '' : (args[args.length - 1] ?? '');
        const matches = getCommandNames().filter((name) => name.startsWith(currentArg));

        if (matches.length === 0) {
            resetAutocompleteState();
            return input;
        }

        const startPrefix = endsWithSpace ? input : input.slice(0, input.length - currentArg.length);

        if (matches.length > 1) {
            showSuggestions('Matching commands:', matches);
            const commonPrefix = longestCommonPrefix(matches);
            const expanded = `${startPrefix}${commonPrefix}`;

            setCycleState({
                mode: 'path',
                candidates: matches,
                index: 0,
                expectedInput: expanded,
                startPrefix,
            });

            return expanded;
        }

        resetAutocompleteState();
        return `${startPrefix}${matches[0]}`;
    }

    if (!PATH_COMMANDS.has(command)) {
        resetAutocompleteState();
        return input;
    }

    const currentArg = endsWithSpace ? '' : (args[args.length - 1] ?? '');
    const matches = completePath(currentArg, { directoriesOnly: command === 'cd' });

    if (matches.length === 0) {
        resetAutocompleteState();
        return input;
    }

    const startPrefix = endsWithSpace ? input : input.slice(0, input.length - currentArg.length);

    if (matches.length > 1) {
        showSuggestions('Matching paths:', matches);
        const commonPrefix = longestCommonPrefix(matches);
        const expanded = `${startPrefix}${commonPrefix}`;

        setCycleState({
            mode: 'path',
            candidates: matches,
            index: 0,
            expectedInput: expanded,
            startPrefix,
        });

        return expanded;
    }

    resetAutocompleteState();
    return `${startPrefix}${matches[0]}`;
}

function completeExecutablePath(input: string): string {
    const cycleResult = maybeCycle(input, 'path');
    if (cycleResult !== null) {
        return cycleResult;
    }

    if (!input.startsWith('./')) {
        resetAutocompleteState();
        return input;
    }

    const partialPath = input.slice(2);
    const matches = completePath(partialPath);
    if (matches.length === 0) {
        resetAutocompleteState();
        return input;
    }

    const prefixedMatches = matches.map((match) => `./${match}`);

    if (prefixedMatches.length > 1) {
        showSuggestions('Matching paths:', prefixedMatches);
        const commonPrefix = longestCommonPrefix(prefixedMatches);

        setCycleState({
            mode: 'path',
            candidates: prefixedMatches,
            index: 0,
            expectedInput: commonPrefix,
            startPrefix: '',
        });

        return commonPrefix;
    }

    resetAutocompleteState();
    return prefixedMatches[0];
}

export function searchCommand(container: HTMLInputElement): string {
    const input = container.value;
    const trimmed = input.trim();

    if (input.startsWith('./') && !/\s/.test(input)) {
        return completeExecutablePath(input);
    }

    if (trimmed.length === 0 || trimmed.split(/\s+/).length === 1 && !/\s$/.test(input)) {
        return completeCommand(input);
    }

    return completeCommandPath(input);
}