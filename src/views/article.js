import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import { k, startTimeOf } from '../functions';
import Highlight from '../lib/react-highlight';
import RepliesList from '../components/article/replies-list';
import { StaticView, Tool } from '../components';
import SimplemdeEditor from '../lib/react-simplemde';

// 文章页
class Article extends Component {

    constructor(props) {
        super(props);
        this.state = { showComment: false };
        this.text = '';     // 记录输入的编辑内容
    }

    async componentDidMount() {
        await this.props.init(this.props.match.params.id);
        await new Promise(rs => setTimeout(rs, 50));
        this.setState({ showComment: true });
    }

    onStar = () => {
        this.props.star();
    }

    onCreateComment = async e => {
        await this.props.createComment(this.text);
        // clear
        this.simplemde.value('');
        this.text = '';
    }

    renderEditor = () => (
        <StaticView className='view-container' id='comment-editor'>
            <p className='title'>回复</p>
            <div className='editor-container'>
                <SimplemdeEditor
                    placeholder='支持 Markdown 格式和快捷键。'
                    className='editor'
                    onChange={text => this.text = text}
                    simplemde={s => this.simplemde = s}
                    />
            </div>
            <div style={{ float: 'left', padding: 15 }}>
                <button onClick={this.onCreateComment}>回复</button>
            </div>
        </StaticView>
    )

    renderReplies = (replies) => (
        <div className='view-container comment-container' id='comment'>
            {replies.length !== 0 && <div>
                <p className='title'>评论</p>
                <RepliesList list={replies} />
            </div>}
        </div>
    )

    render() {
        let { data, id, star, replies } = this.props.state;
        const { showComment } = this.state;
        const { history } = this.props;

        if (id !== this.props.match.params.id) data = {};

        return (
            <div className='article-container'>
                {/* 文章 */}
                <div className='view-container article' id='article'>
                    <div className='header'>
                        <div className='star' title='收藏' onClick={this.onStar}>{
                            <i className={`fa ${star ? 'fa-heart' : 'fa-heart-o'}`} />
                        }</div>
                        <h2 className='title'>{data.title}</h2>
                        <div className='info'>
                            <span>
                                <img src={data.author && data.author.avatar_url} alt='' className='avatar' />
                            </span>
                            <span>更新于：{startTimeOf(data.last_reply_at)}</span>
                            <span>浏览：{k(data.visit_count)}</span>
                        </div>
                    </div>

                    <StaticView render={2}>
                        <Highlight innerHTML={true} className='content'>
                            {data.content || ''}
                        </Highlight>
                    </StaticView>
                </div>

                {/* 评论 */}
                {showComment &&
                    <div>
                        {this.renderReplies(replies)}
                        {window._login && this.renderEditor()}
                    </div>
                }

                <StaticView>
                    <Tool history={history} back={true}
                        edit={window._login}
                        onEdit={e => {
                            let d = document.querySelector('#comment-editor');
                            if (d !== null) {
                                document.body.scrollTop = d.getBoundingClientRect().bottom;
                            }
                        } } />
                </StaticView>
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions,
)(Article);
