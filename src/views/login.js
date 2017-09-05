import React, { Component } from 'react';
import api from '../api';
import { saveUser } from '../storage';
import { Tool, Footer, StaticView } from '../components';

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
            <div className='user-container'>
                <div className='view-container user'>
                    <header className='header'>
                        <div className='info' style={{ height: 140 }}>
                            <div className='avatar'>
                                <span>未登录</span>
                            </div>
                        </div>

                        <div style={{ margin: '100px auto 0', textAlign: 'center' }}>
                            <div className='msg'>
                                <span>{msg + '.'} </span>
                            </div>

                            <input type="text" id='login-token' placeholder='填写你的 token'
                                style={{ width: 240 }}
                                onChange={e => this.text = e.target.value}
                                />
                            <button onClick={this.onClick}>登录</button>
                        </div>
                    </header>
                </div>
                <StaticView>
                    <Tool history={history} back={true} edit={!!0} user={!!0} />
                    <Footer />
                </StaticView>
            </div>
        );
    }
}
