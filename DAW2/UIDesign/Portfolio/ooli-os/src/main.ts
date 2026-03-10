import './style.css'
import { initTerminal } from './ui/terminal'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="terminal">
    <div id="terminal-output"></div>
    <div class="input-line">
      <span id="terminal-prompt"></span>
      <input
        id="terminal-input"
        name="cli-command-input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        autofocus
      />
    </div>
  </div>
`

initTerminal();