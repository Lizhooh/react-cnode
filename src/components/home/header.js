import React from 'react';
// site:cnodejs.org

let text = '';
function openSearch(text) {
    // window.open
    window.open("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&wd=site%3Acnodejs.org%20" + text);
}

export default ({ title = '' }) => (
    <header className='header-container'>

        <div className='top'>
            <span className='about'>关于
                <div className='box'>
                    <p>
                        Api 由 <a href='https://cnodejs.org/api'> cnode </a> 官网提供，
                        客户端由 <a href='http://me.lizhooh.com'>@Lizhooh</a> 提供，
                        开源在 <a href='https://github.com/Lizhooh/react-cnode'>github</a>上。
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
                <input type="text" className='search' placeholder='搜索'
                    onKeyDown={e => {
                        e.keyCode === 13 && openSearch(e.target.value);
                    }}
                    onChange={e => {
                        text = e.target.value;
                    }}
                    />
                <i className="fa fa-search" onClick={e => openSearch(text)} />
            </div>
        </div>
    </header>
)
