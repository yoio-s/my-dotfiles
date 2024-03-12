import esbuild from 'rollup-plugin-esbuild' // esbuild 集成了rollup-plugin-typescript2
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方插件
// import polyfillNode from 'rollup-plugin-polyfill-node'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// 根据环境变量中 target 属性，获取对应模块中的 package.json
if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')}

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 获取文件路径
const packagesDir = path.resolve(__dirname, 'packages')

// 获取需要打包的文件
const packageDir = path.join(packagesDir, process.env.TARGET)

// 获取 对应打包目录 下的文件（这里用来取 package.json文件）
const resolve = (/** @type {string} */ p) => path.resolve(packageDir, p)

// 获取 package.json 文件
const pkg = require(resolve(`package.json`))

// 获取 package.json文件中我们自定义的属性 buildOptions
const packageOptions = pkg.buildOptions || {}

// 获取文件名
const name = packageOptions.filename || path.basename(packageDir)

//  对打包类型 做一个映射表 ，根据 package.json 中的 formats 来格式化 需要打包的内容
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`), // 打包后的文件 
    format: `es` // 采用的 es 格式
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife` // 立即执行函数
  }
}

// 获取 package.json中 formats
const defaultFormats = ['esm-bundler', 'cjs'] // 默认formats 配置
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',') // 环境变量中获取 formats 配置
// 首先取 build.js中环境变量 formats 否则 到package.json中取  都没有取默认配置formats
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats

// 循环调用 createConfig 处理 formats (比如： formats=['cjs', 'esm-bundler', 'global'])
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))


function createConfig(format, output) {
  // 如果是全局模式  需要配置名字
  const isGlobalBuild = /global/.test(format)
  if (isGlobalBuild) {
    output.name = packageOptions.name
  }

  // 生成sourcemap文件
  output.sourcemap = true

  // 生成 rollup 配置
  return {
    input: resolve('src/index.ts'), // 入口
    output, //出口 就是上面的output
    plugins: [ // 插件配置
      json({
        namedExports: false,
      }), // import json from '@rollup/plugin-json'
      esbuild({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        sourceMap: output.sourcemap,
        minify: false,
      }),
      nodeResolve(), //import resolvePlugin from '@rollup/plugin-node-resolve' 解析第三方插件
    ]
  }
}

// 导出配置变量
export default packageConfigs
