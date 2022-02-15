const modules = import.meta.globEager('../assets/skin/**/*.*')
export const getImageUrl = (dir:string):string => {
    try {
        const path = `../assets/${dir}`
        return modules[path].default
    } catch (err) {
        console.warn(`[Not Found] ${dir}`)
    }
}

export const dataURItoBlob = (dataURL:string):Blob => {
    const [first, second] = dataURL.split(',')
    const data = window.atob(second)
    const mime = first.match(/:(.*?);/)[1]
    const ia = new Uint8Array(data.length)
    for (let i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i)
    }
    return new Blob([ia], { type: mime })
}