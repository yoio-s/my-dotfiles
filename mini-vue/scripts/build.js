// 进行打包 monorepo
//  1. 获取 打包 目录
// const fs = require('fs')
// // import { execa, execaSync } from 'execa' // 引入 execa 包 开启子进程
// const execa = require('execa')

import fs from 'fs'
import { execa } from 'execa'

//  读取packages文件夹下所有文件， 并且过滤 
const targets = fs.readdirSync('packages').filter(p => fs.statSync(`packages/${p}`).isDirectory())

/**
 * 对目标进行依次打包，并行打包
 * */
// 打包
async function build(target){
  console.log('target', target);
  // 运行 rollup 
  // rollup 运行时的执行的参数  
  //          -c 采用配置文件 
  //          --environment 设置环境变量 
  //          `TARGET:${target}` 环境变量 里面设置的对象。在rollup 配置文件执行时，可以获取到
  // 第三个参数 execa 执行的参数  stdio: 'inherit' 子进程打包的信息 共享给父进程
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
}

// 遍历(所有文件)返回 Promise.all
function runParallel(targets, iteratorFn){
  const res = []

  for(const item of targets){
    // 依次执行
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}
// 执行 
runParallel(targets, build).then(() => {
  console.log('打包完成')
})
