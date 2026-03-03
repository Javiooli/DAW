type CommandHandler = (args: string[]) => string

export const commands: Record<string, CommandHandler> = {
    help: (args) => commandDescriptions[args[0]],
    about: () => "Soy Javier Pedragosa, desarrollador web.",
    projects: () => "Proyecto 1...\nProyecto 2...\nProyecto 3",
    clear: () => "__CLEAR__"
}

export const commandDescriptions: Record<string, string> = {
    help: "Show useful info about any command. Usage: help <command>",
    about: "Show info about me.",
    projects: "Show a list of projects I have developed.",
    clear: "Clears the terminal"
}

export function runCommand(input: string): string {
    const [command, ...args] = input.trim().split(" ")

    const handler = commands[command]

    if (!handler) {
        return `Command not found: ${command}`
    }

    return handler(args)
}

function formatHelp() {
    const entries = Object.entries(commands)

    const maxLength = Math.max(
        ...entries.map(([name]) => name.length)
    )

    return entries
        .map(([name, desc]) => {
            const padded = name.padEnd(maxLength + 2, " ")
            return `${padded}${desc}`
        })
        .join("\n")
}