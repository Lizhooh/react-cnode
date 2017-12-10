
export default {
    media: (content, width = 480, min = false) => `
        @media screen and (${min ? 'min' : 'max'}-width: ${width}px) {
            ${content}
        }
    `,
    color: 'rgba(69, 200, 62, 1)',  // 主题颜色
    fontCode: `'Consolas', 'Courier New', 'monospace', '微软雅黑'`,
    body: {
        maxWidth: '960px',
        minWidth: '360px',
        minHeight: '800px',
    },
    article: {
        maxWidth: '900px',
        minWidth: '360px',
    },
}
