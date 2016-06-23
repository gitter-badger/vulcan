import { pad } from 'lodash'
import chalk from 'chalk'

export const version = '0.1.0-alpha.1'
export const logo = `
        ${chalk.red('▐▓')}
        ${chalk.red('▓▓▓▄')}
       ${chalk.red('▐▌ ▀▌')}
       ${chalk.red('▐▌')}
  █▓▓▓ ${chalk.red('▐')}  ▐▓▓▀   ▓▓▓▀     ▓▓▀   ▓▓▓        ▄▓▓█▀▀▀▀▓▓      ▓▓▓▄     ▐█▓▓▓     ▐▓▓▓
   █▓▓    ▄▓▓    ▐▓▓      ▐▓    ▓▓▌       ▓▓▓       ▀     ▓▓ ▓▓      ▐▓█▓▓▌    ▓▌
    ▓▓▓  ▐▓▓      ▓▓      ▐▓    ▓▓▌       ▓▓▄            ▄▓  ▀▓▓     ▐▓  █▓▓▄  ▓▌
     ▓▓▌ ▓▓       ▓▓      ▐▓    ▓▓▌       ▓▓▓           ▄▓▀▀▀▀▓▓▓    ▐▓    █▓▓▄▓▌
      ▓▓▓▓        ▓▓▓▄   ▄▓▀    ▓▓▓    ▄▓  ▓▓▓▄    ▄▓  ▄▓      ▓▓▌   ▓▓      ▓▓▓▌
      ▐██          ▀█████▀     ▀▀▀▀▀▀▀▀▀     ▀▀███▀▀  ▀▀▀▀    ▀▀▀▀▀ ▀▀▀▀      ▀▀▀

  ==[ ${chalk.blue('git.io/vulcan')} ]=${pad(`=[ By ${chalk.magenta('NiftyCo')} (${chalk.blue('anifty.co')}) ]=`, 80 - (version.length + 8), '=')}=[ ${chalk.green(`v${version}`)} ]==
`
