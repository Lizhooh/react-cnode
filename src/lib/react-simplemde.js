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
        };

        const allOptions = Object.assign({}, initialOptions, this.props.options);
        this.simplemde = new simplemde(allOptions);
        this.props.simplemde(this.simplemde);
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
