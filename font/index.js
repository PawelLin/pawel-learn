const path = require('path')
const fs = require('fs')
const filePath = '../src'

const font = {}
const notGetDir = ['..\\src\\views\\timi\\history\\history.ts', '..\\src\\views\\home\\kpl.ts']

function getFont (filePath) {
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(filename => {
                const dir = path.join(filePath, filename)
                fs.stat(dir, (err, stats) => {
                    if (err) {
                        console.warn(err)
                    } else {
                        const isFile = stats.isFile()
                        const isDir = stats.isDirectory()
                        if (isFile) {
                            if (!/\.(png|jpe?g|gif|svg|ttf|mp3|mp4)(\?.*)?$/.test(dir)) {
                                if (!notGetDir.includes(dir)) {
                                    fs.readFileSync(dir, 'utf-8').split('\n').forEach(content => {
                                        if (!content.match(/(^\s*?(\/\/|<!--))|\/\*/) && content.match(/[\u4e00-\u9fa5]/)) {
                                            content.replace(/[^\u4e00-\u9fa5]/g, '').split('').forEach(key => {
                                                font[key] = ''
                                            })
                                        }
                                    })
                                    // const content = fs.readFileSync(dir, 'utf-8')
                                    // content.split('')
                                    console.log(Object.keys(font).join(''))
                                }
                            }
                        } else if (isDir) {
                            getFont(dir)
                        }
                    }
                })
            })
        }
    })
}

getFont(filePath)
