import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import { k, startTimeOf } from '../functions';
import Highlight from '../lib/react-highlight';
import RepliesList from '../components/article/replies-list';
import {
    Editor,
    StaticView,
    Tool
} from '../components';

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
        const { history } = this.props;

        if (id !== this.props.match.params.id) data = {};

        return (
            <div className='article-container'>
                {/* 文章 */}
                <StaticView render={2}>
                    <div className='view-container article' id='article'>
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
                </StaticView>

                {/* 评论 */}
                {showComment &&
                    <div>
                        <div className='view-container comment-container' id='comment'>
                            {data.replies.length !== 0 && <div>
                                <p className='title'>评论</p>
                                <RepliesList list={data.replies} />
                            </div>}
                        </div>

                        <div className='view-container '>
                            <p className='title'>回复</p>
                            <Editor />
                        </div>
                    </div>
                }

                <StaticView>
                    <Tool history={history} showBack={true} />
                </StaticView>
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions,
)(Article);
