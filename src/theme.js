
export default {
    media: (content, width = 480, min = false) => `
        @media screen and (${min ? 'min' : 'max'}-width: ${width}px) {
            ${content}
        }
    `,
    color: 'rgba(69, 200, 62, 1)',  // 主题颜色
}
