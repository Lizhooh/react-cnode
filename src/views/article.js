import React, { Component } from 'react';
import api from '../api';
import marked from 'marked';
import { k, startTimeOf } from '../functions';
import Highlight from 'react-highlight';
import FixedButtons from '../components/fixed-buttons';

export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }

        this.marked = marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
    }

    async componentDidMount() {
        const { match } = this.props;
        const res = await api.article(match.params.id);
        console.log(res);
        this.setState({ data: res.data });
    }

    render() {
        const { data } = this.state;

        return (
            <div className='article-container'>
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
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} className='content' />
                                </div>
                            )))
                    }</div>
                </div>

                <FixedButtons />
            </div>
        );
    }
}