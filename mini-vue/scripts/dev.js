import { execa } from 'execa'

async function build(target) {
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
}

build('reactivity') // 单独打包并监听
