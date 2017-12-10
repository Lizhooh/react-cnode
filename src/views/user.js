import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import { Tool } from '../components';
import Item from '../components/user/item';
import { removeUser } from '../storage';
import { Footer } from '../components';
import StaticView from 'react-static-view';
import Color from 'color';
import styled from 'styled-components';

// 用户
class User extends Component {

    async componentWillMount() {
        if (!window._login) {
            this.props.history.replace('/login');
        }
    }

    async componentDidMount() {
        if (window._login) {
            this.props.init(this.props.match.params.id);
        }
    }

    onSignOut = () => {
        removeUser();
        window._login = false;
        this.props.history.replace('/login');
    }

    render() {
        const { info, stars, msgs } = this.props.state;
        const { history } = this.props;

        return (
            <Container>
                <UserPanel className="view-container">
                    <Header>
                        <Button onClick={this.onSignOut}>
                            <Icon type="sign-out" />
                        </Button>

                        <InfoPanel>
                            <Avatar src={info.avatar_url} />
                            <div className='box-view'>
                                <BoxPanel>
                                    <span>{info.score || 0}</span>
                                    <span>积分</span>
                                </BoxPanel>
                                <BoxPanel>
                                    <span>{stars.length}</span>
                                    <span>收藏</span>
                                </BoxPanel>
                                <BoxPanel>
                                    <span>{info.recent_replies.length || 0}</span>
                                    <span>评论</span>
                                </BoxPanel>
                                <BoxPanel>
                                    <span>{info.recent_topics.length || 0}</span>
                                    <span>发表</span>
                                </BoxPanel>
                            </div>
                        </InfoPanel>
                    </Header>
                    <div style={{ marginTop: 200 }}>
                        <Reveal show={info.recent_replies.length > 0}>
                            <Make>最近评论</Make>
                            <List>{info.recent_replies.map((item, index) => (
                                <Item item={item} key={`replies-${index}`}
                                    onClick={e => history.push(`/article/${item.id}`)}
                                    />
                            ))}
                            </List>
                        </Reveal>

                        <Reveal show={info.recent_topics.length > 0}>
                            <Make>最近发表</Make>
                            <List>{info.recent_topics.map((item, index) => (
                                <Item item={item} key={`topics-${index}`}
                                    onClick={e => history.push(`/article/${item.id}`)}
                                    />
                            ))}
                            </List>
                        </Reveal>

                        <Reveal show={stars.length > 0}>
                            <Make>收藏</Make>
                            <List>{stars.map((item, index) => (
                                <Item item={item} key={`topics-${index}`}
                                    onClick={e => history.push(`/article/${item.id}`)}
                                    />
                            ))}
                            </List>
                        </Reveal>

                        <Reveal show={msgs.read.length > 0}>
                            <Make>已读消息</Make>
                            <List>{msgs.read.map((item, index) => (
                                <Item
                                    item={{
                                        ...item,
                                        title: item.topic.title,
                                        last_reply_at: item.create_at,
                                    }}
                                    key={`read-${index}`}
                                    onClick={e => history.push(`/article/${item.topic.id}`)}
                                    />
                            ))}
                            </List>
                        </Reveal>

                        <Reveal show={msgs.notread.length > 0}>
                            <Make>未读消息</Make>
                            <List>{msgs.notread.map((item, index) => (
                                <Item
                                    item={{
                                        ...item,
                                        title: item.topic.title,
                                        last_reply_at: item.create_at,
                                    }}
                                    key={`notread-${index}`}
                                    onClick={e => {
                                        history.push(`/article/${item.topic.id}`);
                                        this.props.mark(item.id); // 标记为已读
                                    } }
                                    />
                            ))}
                            </List>
                        </Reveal>
                    </div>
                </UserPanel>

                <StaticView>
                    <Tool history={history} user={!!0} edit={!!0} back={!!1} />
                    <Footer />
                </StaticView>
            </Container>
        );
    }
}

export default connect(
    state => ({ state: state.user }),
    userActions,
)(User);

const Container = styled.div`
    padding: 50px 0 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    ${p => p.theme.media('padding: 0', 720)}
`;

const UserPanel = styled.div`
    flex: 1;
    background-color: #fff;
    padding-bottom: 50px;
`;

const Header = styled.div`
    height: 120px;
    background-color: ${p => Color(p.theme.color).lighten(0.05).toString()};
`;

const InfoPanel = styled.div`
    position: relative;
    top: 45%;
    height: 250px;

    .box-view {
        display: flex;
        flex-direction: row;
        width: 380px;
        margin: 20px auto 0;
        justify-content: center;
        ${p => p.theme.media`width: 100%`}
    }
`;

const Avatar = styled.img`
    background-color: #fff;
    border-radius: 100%;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    display: block;
    box-shadow: 1px 2px 6px #ccc;
    border: 2px solid #fff;
    box-sizing: content-box;
    outline: none;
    text-align: center;
    line-height: 120px;

    ${p => p.theme.media`
        width: 100px;
        line-height: 100px;
        height: 100px;
    `}
`;

const Make = styled.div`
    border-left: 5px solid ${p => p.theme.color};
    padding: 8px 12px;
    color: #555;
    font-weight: bold;
    background-color: #f6f6f6;
`

const Button = styled.button`
     position: absolute;
     border-top-left-radius: 0;
`;

const Icon = styled.i.attrs({
    className: p => `fa fa-${p.type}`
}) `color: #fff`;

const BoxPanel = styled.div`
    margin: 15px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 32px;
    }

    span:last-child {
        margin-top: 5px;
        font-size: 15px;
    }
`;

const Reveal = styled.div`
    display: ${p => p.show ? 'auto' : 'none'}
`
const List = styled.div`
    padding: 5px 15px;
    ${p => p.theme.media`padding: 0;`}
`;

