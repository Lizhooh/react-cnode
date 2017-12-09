import React from 'react';
import styled from 'styled-components';

// 页尾
export default () => (
    <Container>
        <Text>
            CNode 中文社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。
        </Text>
        <Panel>
            Api 由 <A href='https://cnodejs.org/api'> cnode </A> 官网提供，
            客户端由 <A href='http://me.lizhooh.com'>@Lizhooh</A> 提供，
            开源在 <A href='https://github.com/Lizhooh/react-cnode'>github</A>上。
        </Panel>
    </Container>
);

const Container = styled.div`
    margin-top: 50px;
    background-color: ${p => p.theme.color};
    box-sizing: content-box;
    text-align: center;
    display: flex;
    flex-direction: column;

    ${p => p.theme.media(`
        margin-top: 0;
    `, 720)}
`;

const Text = styled.p`
    justify-content: center;
    color: #fff;
    flex: 1;
    padding: 25px 10px;
`;

const Panel = styled.div`
    margin: 0;
    background-color: rgba(1, 1, 1, 0.04);
    color: #fff;
    padding: 8px 0;
`;

const A = styled.a`
    color: #fff;
    font-weight: bold;
    border-bottom: 1px dotted #fff;
`;

