import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import { Tool } from '../components';
import Item from '../components/user/item';

// 用户
class User extends Component {

    async componentDidMount() {
        this.props.info('Lizhooh');
    }

    render() {
        console.log(this.props);
        const { info } = this.props.state;
        const { history } = this.props;

        return (
            <div className='user-container'>
                <div className='view-container user'>
                    <header className='header'>
                        <div className='info'>
                            <img src="https://avatars3.githubusercontent.com/u/19299088?v=4&s=120" alt="" className='avatar' />

                            <div className='box-view'>
                                <div className='box'>
                                    <span>{info.score || 0}</span>
                                    <span>积分</span>
                                </div>

                                <div className='box'>
                                    <span>{12}</span>
                                    <span>收藏</span>
                                </div>

                                <div className='box'>
                                    <span>{info.recent_replies.length || 0}</span>
                                    <span>最近评论</span>
                                </div>

                                <div className='box'>
                                    <span>{info.recent_topics.length || 0}</span>
                                    <span>最近发表</span>
                                </div>

                            </div>
                        </div>
                    </header>

                    <div className='body'>
                        <p className='make'>最近评论</p>
                        <div className='list'>{
                            info.recent_replies.map((item, index) => (
                                <Item item={item} key={`replies-${index}`} />
                            ))
                        }</div>

                        <p className='make'>最近发表</p>
                        <div className='list'>{
                            info.recent_topics.map((item, index) => (
                                <Item item={item} key={`replies-${index}`} />
                            ))
                        }</div>

                    </div>

                </div>

                <Tool history={history} showUser={false} showEdit={false} showBack={true} />
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.user }),
    userActions,
)(User);
