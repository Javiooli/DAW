import { commands } from './commandRegistry'; 

export function searchCommand(partial: string) {
    let found: string = "";
    Object.keys(commands).forEach(command => {
        if (command === partial) {
            found = Object.keys(commands).toString();
            return found;
            
        }
        if (command.toLowerCase().startsWith(partial.toLowerCase())) {
            console.log("Command found: ", command);
            found = command;
            return found;
        }
    })
    return found;
}