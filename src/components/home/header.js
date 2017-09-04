import React from 'react';
// import bg from '../../resource/background.jpg';

// let logourl = 'http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg'

export default ({ title = '' }) => (
    <header className='header-container'>

        <div className='top'>
            <span className='about'>关于
                <div className='box'>
                    <p>
                        Api 由 <a href='https://cnodejs.org/api'> cnode </a> 官网提供，
                        客户端由 <a href='http://me.lizhooh.com'>@Lizhooh</a> 提供.
                    </p>
                </div>
            </span>
        </div>

        <div className='content'>
            <div>
                <span className='title'>CNode 中文社区</span>
                <span className='subtitle'>CNode 中文社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</span>
            </div>

            <div className='search-view'>
                <input type="text" className='search' placeholder='搜索' />
                <i className="fa fa-search" />
            </div>
        </div>
    </header>
)
