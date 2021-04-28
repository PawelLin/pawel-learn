export const getRegularList = (): { key: string, title: string, html: string }[] => ([
    { key: '1', title: '简单手机号', html: `/^1\\d{10}$/` },
    { key: '2', title: '数字+字母组成6位以上', html: `/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/` },
    { key: 'email', title: '邮箱', html: `/^[0-9a-zA-Z_-]{1,30}@([0-9a-zA-Z_-]{1,28}\\.[0-9a-zA-Z_-]+)+$/` }
])

export const getRegularFunList = (): { key: string, title: string, html: string }[] => ([
    { key: '1', title: '简单手机号', html: `/^1\\d{10}$/` }
])