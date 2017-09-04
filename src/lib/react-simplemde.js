import React, { Component } from 'react';
import simplemde from 'simplemde';

let i = 0; // 计数

export default class ReactSimplemde extends Component {

    static defaultProps = {
        simplemde: () => { }
    }

    constructor(props) {
        super(props);

        this.state = {
            keyChange: false,
        }

        // 查询器
        this.$ = (select, ctx = document) => ctx.querySelector(select);
        this.$$ = (select, ctx = document) => Array.from(ctx.querySelectorAll(select));
    }

    // 更新 props 时
    componentWillReceiveProps(nextProps) {
        if (!this.state.keyChange &&
            (nextProps.value !== this.simplemde.value())) {
            // 刷新其值
            this.simplemde.value(nextProps.value);
        }

        this.setState({ keyChange: false });
    }

    componentWillMount() {
        const id = this.props.id;
        this.id = id ? id : `editor-${Date.now()}-${i++}`;
    }

    componentDidMount() {
        this.createEditor();     // 创建
        this.addEvents();        // 监听相关事件
        this.addExtraKeys();     // 添加自定义的快捷键
    }

    componentWillUnmount() {
        this.removeEvents();
    }

    // 创建 editor
    createEditor = () => {
        const initialOptions = {
            element: this.$('#' + this.id),  // <textarea id={this.id} />
            initialValue: this.props.value,
            placeholder: this.props.placeholder,
            autoDownloadFontAwesome: false,
            // toolbar: [{
            //     name: "bold",
            //     action: simplemde.toggleBold,
            //     className: "material-icons #format_bold",
            //     title: "Bold",
            // }, {
            //     name: "italic",
            //     action: simplemde.toggleItalic,
            //     className: "material-icons #format_italic",
            //     title: "Italic",
            // },
            // {
            //     name: 'heading',
            //     action: simplemde.toggleHeadingBigger,
            //     className: 'material-icons #title',
            //     title: 'Heading',
            // },
            // {
            //     name: 'quote',
            //     action: simplemde.toggleBlockquote,
            //     className: 'material-icons #format_quote',
            //     title: 'Quote',
            // },
            // {
            //     name: 'generic list',
            //     action: simplemde.toggleUnorderedList,
            //     className: 'material-icons #format_list_bulleted',
            //     title: 'Generic List',
            // },
            // {
            //     name: 'numbered list',
            //     action: simplemde.toggleOrderedList,
            //     className: 'material-icons #format_list_numbered',
            //     title: 'Numbered List',
            // },
            // {
            //     name: 'create link',
            //     action: simplemde.drawLink,
            //     className: 'material-icons #insert_link',
            //     title: 'Create Link',
            // },
            // {
            //     name: 'insert image',
            //     action: simplemde.drawImage,
            //     className: 'material-icons #insert_photo',
            //     title: 'Insert Image',
            // },
            // {
            //     name: 'toggle preview',
            //     action: simplemde.togglePreview,
            //     className: 'material-icons #visibility',
            //     title: 'Toggle Preview',
            // },
            // // {
            // //     name: 'toggle side by side',
            // //     action: simplemde.toggleSideBySide,
            // //     className: 'material-icons #web',
            // //     title: 'Toggle Side by Side',
            // // },
            // {
            //     name: 'toggle fullscreen',
            //     action: simplemde.toggleFullScreen,
            //     className: 'material-icons #zoom_out_map',
            //     title: 'Toggle Fullscreen',
            // },
            // {
            //     name: 'markdown guide',
            //     // action:
            //     className: 'material-icons #help',
            //     title: 'Markdown Guide',
            // },
            //     // "|", // Separator
            // ]
        };

        const allOptions = Object.assign({}, initialOptions, this.props.options);
        this.simplemde = new simplemde(allOptions);
        this.props.simplemde(this.simplemde);

        // let icons = this.$$('.material-icons').filter(i => i.className.indexOf('#') !== -1);

        // icons.forEach(item => {
        //     item.innerText = item.className.match(/\#(\w+)/)[1];
        // });
    }

    // 事件回调
    eventWrapper = () => {
        this.setState({
            keyChange: true
        });
        this.props.onChange &&
            this.props.onChange(this.simplemde.value());
    }

    // 移除监听
    removeEvents = () => {
        // 监听输入事件，回调给 onChange
        this.editorEl.removeEventListener('keyup', this.eventWrapper);
        this.editorToolbarEl &&
        this.editorToolbarEl.removeEventListener('click', this.eventWrapper);
    }

    // 增加监听
    addEvents = () => {
        const wrapperEl = this.$(`#${this.id}-wrapper`);

        this.editorEl = this.$('.CodeMirror', wrapperEl);
        this.editorToolbarEl = this.$('.editor-toolbar', wrapperEl);

        // 文字输入
        this.editorEl.addEventListener('keyup', this.eventWrapper);
        // 点击工具栏
        this.editorToolbarEl &&
        this.editorToolbarEl.addEventListener('click', this.eventWrapper);
    }

    addExtraKeys() {
        // https://codemirror.net/doc/manual.html#option_extraKeys
        // 可以用于编辑指定额外的自定义快捷键绑定。应该是 null，或者是一个有效的键映射值。
        if (this.props.extraKeys) {
            this.simplemde.codemirror.setOption(
                'extraKeys',
                this.props.extraKeys
            );
        }
    }

    render() {
        const { className } = this.props;

        return (
            <div id={`${this.id}-wrapper`} className={className}>
                <textarea id={this.id} />
            </div>
        )
    }
}
