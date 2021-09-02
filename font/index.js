const path = require('path')
const fs = require('fs')
const filePath = '../src'

const font = {}

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
                                const content = fs.readFileSync(dir, 'utf-8').replace(/[^\u4e00-\u9fa5]/g, '')
                                content.split('').forEach(key => {
                                    font[key] = ''
                                })
                                console.log(Object.keys(font).join(''))
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
