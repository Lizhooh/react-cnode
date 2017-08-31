import React, { Component } from 'react';

/**
 * 静态组件，控制渲染，性能优化
 *
 * # 只渲染一次
 * <StaticView render={1} />
 *
 * # 只渲染两次
 * <StaticView render={2} />
 *
 * # 只在第 1, 2, 5, 9 次时渲染
 * <StaticView render={[1, 2, 5, 9]} />
 *
 * # 一次都不渲染
 * <StaticView render={false} />
 *
 * # 永久都渲染
 * <StaticView render={true} />
 *
 * @param{Number|Boolean|Array} render: 渲染次数，可为数字，数组，布尔，默认渲染一次
 */
export default class StaticView extends Component {

    static defaultProps = {
        render: 1,
    }

    constructor(props) {
        super(props);
        this._render = this.props.render || 1;
        this.renderCount = 0;   // 计数器
    }

    componentWillReceiveProps(nextProps) {
        this._render = nextProps.render;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.renderCount++;

        if (typeof this._render === 'boolean') {
            return this._render;
        }

        else if (Array.isArray(this._render)) {

            if (this._render.indexOf(this.renderCount) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }

        else if (typeof this._render === 'number') {
            if (this.renderCount >= this._render) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    render() {
        const { className = '', children = null, render, ...props } = this.props;
        return (
            <div className={className} {...props}>
                {children}
            </div>
        );
    }
}
