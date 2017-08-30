import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import { k, startTimeOf } from '../functions';
import Highlight from '../lib/react-highlight';
import FixedButtons from '../components/fixed-buttons';
import Editor from '../components/editor';

// 文章页
class Article extends Component {

    constructor(props) {
        super(props);

        this.state = { showComment: false };
    }

    async componentDidMount() {
        await this.props.init(this.props.match.params.id);
        await new Promise(rs => setTimeout(rs, 50));
        this.setState({ showComment: true });
    }

    render() {
        let { data, id } = this.props.state;
        const { showComment } = this.state;

        if (id !== this.props.match.params.id) data = {};

        return (
            <div className='article-container'>
                {/* 文章 */}
                <div className='article' id='article'>
                    <div className='header'>
                        <h2 className='title'>{data.title}</h2>
                        <div className='info'>
                            <span>
                                <img src={data.author && data.author.avatar_url} alt='' className='avatar' />
                            </span>
                            <span>更新于：{startTimeOf(data.last_reply_at)}</span>
                            <span>浏览：{k(data.visit_count)}</span>
                        </div>
                    </div>
                    <Highlight innerHTML={true} className='content'>
                        {data.content || ''}
                    </Highlight>
                </div>

                {/* 评论 */}
                {showComment &&
                    <div>
                        <div className='comment-container' id='comment'>
                            <p className='title'>评论</p>
                            <div className='replies-list'>{
                                data.replies && (data.replies.length === 0 ?
                                    <div style={{ textAlign: 'center' }}>
                                        <p>空</p>
                                    </div>
                                    :
                                    data.replies.map((item, index) => (
                                        <div key={`replies-${index}`} className='replies-item'>
                                            <img src={item.author.avatar_url} alt='' className='avatar' />

                                            <div className='content-view'>
                                                <span className='name'>
                                                    {item.author.loginname}
                                                    <span className='time'>{startTimeOf(item.create_at)}</span>
                                                </span>
                                                <Highlight innerHTML={true} className='content'>
                                                    {item.content || ''}
                                                </Highlight>
                                            </div>
                                        </div>
                                    )))
                            }</div>
                        </div>

                        <div className='comment-editor-container'>
                            <p className='title'>回复</p>
                            <Editor />
                        </div>
                    </div>
                }

                <FixedButtons />

                <button className='back' onClick={e => this.props.history.goBack()}>
                    <i className="material-icons">&#xE5CB;</i>
                </button>
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions,
)(Article);
