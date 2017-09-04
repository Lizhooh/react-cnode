import React, { Component } from 'react';


// 页尾
export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='footer-container'>
                <p className='text'>CNode 中文社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>

                <div className='right'>
                    <p></p>
                    <p>Api 由 <a href='https://cnodejs.org/api'> cnode </a> 提供，客户端由 <a href='http://me.lizhooh.com'>@Lizhooh</a> 提供.</p>
                </div>
            </div>
        );
    }
}
