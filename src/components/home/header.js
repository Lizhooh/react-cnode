import React from 'react';
import styled from 'styled-components';
import Color from 'color';

let text = '';
function openSearch(text) {
    window.open("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&wd=site%3Acnodejs.org%20" + text);
}

export default ({ title = '' }) => (
    <Container>
        <div className='top'>
            <About>关于
                <div className="box">
                    <p>
                        Api 由 <a href='https://cnodejs.org/api'> cnode </a> 官网提供，
                        客户端由 <a href='http://me.lizhooh.com'>@Lizhooh</a> 提供，
                        开源在 <a href='https://github.com/Lizhooh/react-cnode'>github</a>上。
                    </p>
                </div>
            </About>
        </div>

        <ContentPanel>
            <div>
                <Title>CNode 中文社区</Title>
                <SubTitle>CNode 中文社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</SubTitle>
            </div>
            <SearchPanel>
                <SearchInput type="text" placeholder='搜索'
                    onKeyDown={e => e.keyCode === 13 && openSearch(e.target.value)}
                    onChange={e => text = e.target.value}
                    />
                <Icon type="search" onClick={e => openSearch(text)} />
            </SearchPanel>
        </ContentPanel>
    </Container>
)

const Container = styled.header`
    height: 300px;
    display: flex;
    background-color: ${p => Color(p.theme.color).darken(0.05).toString()};
    flex-direction: column;
    color: #fff;
    .top { height: 45px }
`;

const About = styled.div`
    text-align: center;
    background-color: rgba(1, 1, 1, 0.04);
    float: right;
    color: #fff;
    padding: 10px 16px 10px 17px;
    cursor: pointer;
    border-bottom-left-radius: 3px;
    position: relative;
    z-index: 1;
    cursor: default;

    &:hover {
        background-color: rgba(1, 1, 1, 0.6);
        transition: all .3s ease;

        & > .box {
            overflow: auto;
            min-height: 100px;
            width: 200px;
        }
    }

    a {
        color: #fff;
        font-weight: bold;
        border-bottom: 1px dotted #fff;
    }

    & > .box {
        width: 0;
        height: 0;
        display: flex;
        overflow: hidden;
        cursor: default;

        p { margin-top: 20px }
    }
`;

const ContentPanel = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 20px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 70px;
`;

const Title = styled.span`
    color: #fff;
    font-size: 36px;
    display: block;
    margin: 0 0 5px;
    text-shadow: 1px 2px 3px rgba(1, 1, 1, 0.18);
    ${p => p.theme.media`font-size: 28px;`}
`;

const SubTitle = styled.span`
    color: #fff;
    font-size: 15px;
    color: #f1f1f1;
    display: block;
    margin: 0 0 5px;

    ${p => p.theme.media`font-size: 13px`}
`;

const SearchPanel = styled.div`
    position: relative;
    max-width: 100%;
`;

const SearchInput = styled.input`
    background-color: rgba(255, 255, 255, 0.9);
    max-width: 90%;
    width: 420px;
    padding: 6px 12px;
    color: #444;
    margin: 0;
    box-sizing: border-box;
`;

const Icon = styled.i.attrs({
    className: p => `fa fa-${p.type}`
}) `
    color: rgba(1, 1, 1, 0.35);
    position: absolute;
    right: 30px;
    top: 5px;
    font-weight: normal;
`;
