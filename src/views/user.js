import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import { Tool } from '../components';
import Item from '../components/user/item';
import { removeUser } from '../storage';

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

    renderRepliesList = (list, history) => (
        <div>
            <p className='make'>最近评论</p>
            <div className='list'>{
                list.map((item, index) => (
                    <Item item={item} key={`replies-${index}`}
                        onClick={e => history.push(`/article/${item.id}`)}
                        />
                ))
            }</div>
        </div>
    )

    renderTopicsList = (list, history) => (
        <div>
            <p className='make'>最近发表</p>
            <div className='list'>{
                list.map((item, index) => (
                    <Item item={item} key={`topics-${index}`}
                        onClick={e => history.push(`/article/${item.id}`)}
                        />
                ))
            }</div>
        </div>
    )

    renderStarsList = (list, history) => (
        <div>
            <p className='make'>收藏</p>
            <div className='list'>{
                list.map((item, index) => (
                    <Item item={item} key={`topics-${index}`}
                        onClick={e => history.push(`/article/${item.id}`)}
                        />
                ))
            }</div>
        </div>
    )

    renderReadMsgsList = (list, history) => (
        <div>
            <p className='make'>已读消息</p>
            <div className='list'>{
                list.map((item, index) => (
                    <Item
                        item={{
                            ...item,
                            title: item.topic.title,
                            last_reply_at: item.create_at,
                        }}
                        key={`read-${index}`}
                        onClick={e => history.push(`/article/${item.topic.id}`)}
                        />
                ))
            }</div>
        </div>
    )

    renderNotReadMsgsList = (list, history) => (
        <div>
            <p className='make'>未读消息</p>
            <div className='list'>{
                list.map((item, index) => (
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
                ))
            }</div>
        </div>
    )

    render() {
        const { info, stars, msgs } = this.props.state;
        const { history } = this.props;

        return (
            <div className='user-container'>
                <div className='view-container user'>
                    <header className='header'>
                        <button style={{ position: 'absolute', borderTopLeftRadius: 0 }}
                            onClick={this.onSignOut}
                            >
                            <i className="fa fa-sign-out"></i>
                        </button>
                        <div className='info'>
                            <img alt="" src={info.avatar_url} className='avatar' />
                            <div className='box-view'>
                                <div className='box'>
                                    <span>{info.score || 0}</span>
                                    <span>积分</span>
                                </div>
                                <div className='box'>
                                    <span>{stars.length}</span>
                                    <span>收藏</span>
                                </div>
                                <div className='box'>
                                    <span>{info.recent_replies.length || 0}</span>
                                    <span>评论</span>
                                </div>
                                <div className='box'>
                                    <span>{info.recent_topics.length || 0}</span>
                                    <span>发表</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className='body'>
                        {info.recent_replies.length > 0 && this.renderRepliesList(info.recent_replies, history)}
                        {info.recent_topics.length > 0 && this.renderTopicsList(info.recent_topics, history)}
                        {stars.length > 0 && this.renderStarsList(stars, history)}
                        {msgs.read.length > 0 && this.renderReadMsgsList(msgs.read, history)}
                        {msgs.notread.length > 0 && this.renderNotReadMsgsList(msgs.notread, history)}
                    </div>
                </div>

                <Tool history={history} user={!!0} edit={!!0} back={!!1} />
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.user }),
    userActions,
)(User);
