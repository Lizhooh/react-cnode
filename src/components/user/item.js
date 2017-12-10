import React from 'react';
import { startTimeOf } from '../../functions';
import styled from 'styled-components';

export default ({ item, onClick = () => { } }) => (
    <Container onClick={onClick}>
        <Avatar src={item.author.avatar_url} />
        <Author>
            <Name>
                {item.author.loginname}
                <Time>{startTimeOf(item.last_reply_at)}</Time>
            </Name>
            <Title>{item.title}</Title>
        </Author>
    </Container>
);

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;

    &:hover {
        background-color: rgba(1, 1, 1, 0.08);
    }
`;

const Avatar = styled.img`
    align-self: flex-start;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    margin: 10px;
    box-sizing: content-box;
    box-shadow: 0 2px 3px #ccc;
`;

const Author = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    padding-right: 10px;
`;

const Time = styled.span`
    float: right;
    font-weight: normal;
    font-size: 12px;
    color: #888;
`;

const Title = styled.span`
    font-size: 14px;
    background-color: transparent;
    color: #333;
    padding: 0 10px 0 0;
    margin-top: 3px;
    text-align: left;
    color: #777;
`;
