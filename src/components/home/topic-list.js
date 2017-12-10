import React, { Component } from 'react';
import { k, startTimeOf } from '../../functions';
import styled from 'styled-components';

export default class List extends Component {

    static defaultProps = {
        data: [],
        onClick: () => { },
    }

    shouldComponentUpdate(nextProps, nextState) {
        const ndata = nextProps.data || [];
        const tdata = this.props.data || [];

        if (ndata.length === tdata.length) {
            for (let i in ndata) {
                if (ndata[i].id !== tdata[i].id) return true;
            }
            return false;
        }
        return true;
    }

    render() {
        const { data, onClick } = this.props;

        return (
            <Container>
                <ul>{data.map((item, index) => (
                    <ListItem key={`list-${index}`}>
                        <AuthorPanel>
                            <Avatar src={item.author.avatar_url} />
                            <Name>{item.author.loginname}}</Name>
                        </AuthorPanel>
                        <ContentPanel onClick={e => onClick(item)}>
                            <Title to={`/article/${item.id}`}>{item.title}</Title>
                            <Time>
                                {startTimeOf(item.last_reply_at)}
                                <span>, reply: {k(item.reply_count)}</span>
                                <span>, visit: {k(item.visit_count)}</span>
                            </Time>
                        </ContentPanel>
                        <NewsPanel>
                            <Reply>
                                <span>{k(item.reply_count)}</span>
                                <Text>回复</Text>
                            </Reply>
                            <Visit>
                                <span>{k(item.visit_count)}</span>
                                <Text>浏览</Text>
                            </Visit>
                        </NewsPanel>
                    </ListItem>
                ))}
                </ul>
            </Container>
        )
    }
}

const Container = styled.div`
    margin: 0 auto;

    ul {
        margin: 0;
        padding: 0;
        li { list-style: none }
    }
`;

const ListItem = styled.li`
    display: flex;
    margin: 5px 0;
    transition: all .2s ease;

    &:hover {
        cursor: pointer;
        background-color: rgba(1, 1, 1, 0.07);
    }
`;

const AuthorPanel = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 110px;
    align-self: flex-start;

    ${p => p.theme.media`width: auto;`}
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 4px;
    box-shadow: 0 2px 4px 1px rgba(1, 1, 1, 0.15);

    ${p => p.theme.media`
        width: 45px;
        height: 45px;
        margin: 10px;
    `}
`;

const Name = styled.span`
    color: #aaa;
    font-size: 12px;
    padding: 4px 0;

    ${p => p.theme.media`display: none;`}
`;

const ContentPanel = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 12px 0;
`;

const Title = styled.span`
    font-size: 15px;
    color: #232323;
    padding-right: 15px;
    transition: color .2s ease;
    word-wrap: break-word !important;

    ${p => p.theme.media`font-size: 14px;`}
    &:hover { color: #f44 }
`;

const Time = styled.span`
    color: #aaa;
    font-size: 12px;
    padding: 3px 0;
    > span { display: none }
    ${p => p.theme.media`> span { display: inline } `}
`;

const NewsPanel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${p => p.theme.media`display: none;`}
`;

const Reply = styled.div`
    margin: 5px;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    box-shadow: 0 1px 2px #ddd;
    border-radius: 45px;

    &:hover {
        background-color: #fff;
        span { color: #222 }
    }

    span { color: #999 }
`;

const Visit = Reply.extend``;

const Text = styled.span`
    color: #999;
    font-size: 13px;
`;
