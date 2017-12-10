import React, { Component } from 'react';
import api from '../api';
import { saveUser } from '../storage';
import { Tool, Footer } from '../components';
import StaticView from 'react-static-view';
import styled from 'styled-components';
import Color from 'color';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '填写你的 token，例如: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx',
        }
        this.text = '';
    }

    onClick = async e => {
        const { history } = this.props;
        if (this.text !== '') {
            // 检验
            const res = await api.checkToken(this.text);
            if (!res.success) {
                this.setState({ msg: 'token 不正确' });
            }
            else {
                saveUser({
                    id: res.id,
                    avatar_url: res.avatar_url,
                    loginname: res.loginname,
                    accesstoken: this.text,
                    timestamp: Date.now(),
                });
                window._login = true;

                if (history.length <= 2) {
                    history.push(`/`);
                }
                history.replace(`/user/${res.loginname}`);
            }
        }
    }

    render() {
        const { msg } = this.state;
        const { history } = this.props;

        return (
            <Container>
                <UserPanel className='view-container'>
                    <Header>
                        <InfoPanel>
                            <Avatar><span>未登录</span></Avatar>
                        </InfoPanel>
                        <Panel>
                            <Message>
                                <span>{msg + '.'} </span>
                            </Message>
                            <input
                                type="text"
                                id='login-token'
                                placeholder='填写你的 token'
                                style={{ width: 240 }}
                                onChange={e => this.text = e.target.value}
                                />
                            <button onClick={this.onClick}>登录</button>
                        </Panel>
                    </Header>
                </UserPanel>
                <StaticView>
                    <Tool history={history} back={true} edit={!!0} user={!!0} />
                    <Footer />
                </StaticView>
            </Container>
        );
    }
}

const Container = styled.div`
    padding: 50px 0 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    ${p => p.theme.media('padding: 0', 720)}
`;

const Panel = styled.div`
    margin: 100px auto 0;
    text-align: center;
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

const Avatar = styled.div`
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

const Message = styled.div`
    margin: 10px auto;
    width: 70%;
`;

const InfoPanel = styled.div`
    position: relative;
    top: 45%;
    height: 140px;
`;
