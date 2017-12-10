import React from 'react';
import { startTimeOf } from '../../functions';
import StaticView from 'react-static-view';
import { Highlight } from '../../lib';
import styled from 'styled-components';

export default ({ list }) => (
    <Container>{
        list.map((item, index) => (
            <RepliesItem key={`replies-${index}`}>
                <Avatar src={item.author.avatar_url} />
                <ContentPanel>
                    <Name>
                        {item.author.loginname}
                        <Time>{startTimeOf(item.create_at)}</Time>
                    </Name>
                    <Content>{item.content || ''}</Content>
                </ContentPanel>
            </RepliesItem>
        ))
    }
    </Container>
)

const Container = styled.div`
    padding: 20px 16px;
    ${p => p.theme.media`padding: 5px 8px 5px 0;`}
`;

const RepliesItem = styled(StaticView) `
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    padding: 10px 10px 10px 0;
    line-height: 1.4;
    background-color: #fff;
    ${p => p.theme.media`padding: 5px 10px 5px 0;`}

    blockquote {
        p { margin: 0; }
    }

    pre {
        overflow-x: auto;
        width: 98%;
        box-sizing: border-box;
        background-color: #555;
        color: #fff;
        padding: 12px;
        margin: 12px auto;
        box-shadow: 0 0 5px #222 inset;

        > code {
            font-family: ${p => p.theme.fontCode};
            font-size: 13px;
        }
    }

    &:hover {
        background-color: rgba(1, 1, 1, 0.07);
    }
`;

const ContentPanel = styled.div`
    flex: 1;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Content = styled(Highlight).attrs({
    innerHTML: true,
    className: 'markdown',
}) `
    font-size: 14px;
    color: #777;
    overflow: hidden;
    img { display: inline; }
    a { border-bottom: none !important; }
    p { margin: 12px 0 0; }
`;

const Name = styled.span`
    color: #444;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
`;

const Time = styled.span`
    font-size: 12px;
    color: #888;
    font-weight: normal;
    float: right;
`;

const Avatar = styled.img`
    align-self: flex-start;
    display: block;
    margin: 5px 10px;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    box-shadow: 0 2px 3px #ccc;
    background-color: #fff;
`;
