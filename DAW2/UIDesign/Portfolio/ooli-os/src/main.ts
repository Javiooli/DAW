import './style.css'
import { initTerminal } from './ui/terminal'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <body>
  <div id="terminal">
    <div id="terminal-output"></div>
    <div class="input-line">
      <span>root@ooliOS:~$</span>
      <input id="terminal-input" autofocus />
    </div>
  </div>
</body>
`

initTerminal();