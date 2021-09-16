const modules = import.meta.globEager('../assets/skin/**/*.*')
export const getImageUrl = (dir:string):string => {
    const path = `../assets/${dir}`
    return modules[path].default
}