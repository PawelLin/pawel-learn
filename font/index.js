const path = require('path')
const fs = require('fs')
const fontSpider = require('font-spider')
const resolve = dir => {
    return path.join(__dirname, dir)
}

const filePath = resolve('../src')
const notGetDir = ['..\\src\\views\\timi\\history\\history.ts', '..\\src\\views\\home\\kpl.ts']

function getFont (filePath, fontSet = new Set()) {
    const files = fs.readdirSync(filePath)
    files.forEach(fileName => {
        const dir = path.join(filePath, fileName)
        const stats = fs.statSync(dir)
        const isFile = stats.isFile()
        const isDir = stats.isDirectory()
        if (isFile && /\.(vue|js|ts)(\?.*)?$/.test(dir) && !notGetDir.includes(dir)) {
            fs.readFileSync(dir, 'utf-8').split('\n').forEach(content => {
                if (!content.match(/(^\s*?(\/\/|<!--))|\/\*/) && content.match(/[\u4e00-\u9fa5]/)) {
                    content.replace(/[^\u4e00-\u9fa5]/g, '').split('').forEach(key => {
                        fontSet.add(key)
                    })
                }
            })
        } else if (isDir) {
            getFont(dir, fontSet)
        }
    })
    return Array.from(fontSet).join('') + '1234567890[]abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%'
    // fs.readdir(filePath, (err, files) => {
    //     if (err) {
    //         console.warn(err)
    //     } else {
    //         files.forEach(filename => {
    //             const dir = path.join(filePath, filename)
    //             fs.stat(dir, (err, stats) => {
    //                 if (err) {
    //                     console.warn(err)
    //                 } else {
    //                     const isFile = stats.isFile()
    //                     const isDir = stats.isDirectory()
    //                     if (isFile) {
    //                         if (!/\.(png|jpe?g|gif|svg|ttf|otf|mp3|mp4)(\?.*)?$/.test(dir)) {
    //                             if (!notGetDir.includes(dir)) {
    //                                 fs.readFileSync(dir, 'utf-8').split('\n').forEach(content => {
    //                                     if (!content.match(/(^\s*?(\/\/|<!--))|\/\*/) && content.match(/[\u4e00-\u9fa5]/)) {
    //                                         content.replace(/[^\u4e00-\u9fa5]/g, '').split('').forEach(key => {
    //                                             font[key] = ''
    //                                         })
    //                                     }
    //                                 })
    //                                 // const content = fs.readFileSync(dir, 'utf-8')
    //                                 // content.split('')
    //                                 console.log(Object.keys(font).join(''))
    //                             }
    //                         }
    //                     } else if (isDir) {
    //                         getFont(dir)
    //                     }
    //                 }
    //             })
    //         })
    //     }
    // })
}

const targetDir = resolve('./index.html')
const targetContent = fs.readFileSync(targetDir, 'utf-8')
fs.writeFileSync(targetDir, targetContent.replace(/(<body>).*(<\/body>)/, `$1${getFont(filePath)}$2`))
fontSpider(targetDir).then(res => {
    console.log(res)
    fs.copyFileSync(resolve('./Deng.ttf'), resolve('../src/assets/font/Deng.ttf'))
})

