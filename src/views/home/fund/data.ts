export interface Fund {
    theme: string
    name: string
    code: string
    profit: number
    capital: number
    unit: string
    getClass: () => ''
}

// export const columns: Fund[] = [
//     { theme: 'xx', name: 'xxx', code: 'xxx', profit: -0.3, capital: 0.9, unit: 'w' }
// ]