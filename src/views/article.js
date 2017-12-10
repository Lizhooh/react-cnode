import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import { k, startTimeOf } from '../functions';
import RepliesList from '../components/article/replies-list';
import StaticView from 'react-static-view';
import { Tool, Footer } from '../components';
import { SimplemdeEditor, Highlight } from '../lib';
import styled from 'styled-components';
import Color from 'color';

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
        <RepliesPanel className="view-container" id='comment'>
            <div>
                <p className='title'>评论</p>
                <RepliesList list={replies} />
            </div>
        </RepliesPanel>
    )

    render() {
        let { data, id, star, replies } = this.props.state;
        const { showComment } = this.state;
        const { history } = this.props;

        if (id !== this.props.match.params.id) data = {};

        return (
            <Container>
                {/* 文章 */}
                <div className='view-container' id='article' style={{ flex: 1 }}>
                    <ArticleHeader>
                        <Star title='收藏' onClick={this.onStar}>
                            <Icon type={star ? 'heart' : 'heart-o'} />
                        </Star>
                        <Title>{data.title}</Title>
                        <InfoPanel>
                            <Avatar src={data.author && data.author.avatar_url} />
                            <span>{data.author && data.author.loginname}</span>
                            <span>更新于：{startTimeOf(data.last_reply_at)}</span>
                            <span>浏览：{k(data.visit_count)}</span>
                        </InfoPanel>
                    </ArticleHeader>
                    <StaticView render={2}>
                        <Content>{data.content || ''}</Content>
                    </StaticView>
                </div>

                {/* 评论 */}
                {showComment &&
                    <div>
                        {replies.length > 0 && this.renderReplies(replies)}
                        {window._login && this.renderEditor()}
                    </div>
                }

                <StaticView>
                    <Tool
                        history={history}
                        back={true}
                        edit={window._login}
                        onEdit={e => {
                            let d = document.querySelector('#comment-editor');
                            if (d !== null) {
                                document.documentElement.scrollTop =
                                    document.body.scrollTop = d.getBoundingClientRect().bottom;
                            }
                        } }
                        />
                    <Footer />
                </StaticView>
            </Container>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions,
)(Article);

const Container = styled.div`
    padding: 50px 0 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    opacity: 0;
    ${p => p.theme.media('padding: 0;', 720)}

    animation: article_start .32s ease .1s;
    animation-fill-mode: forwards;

    @keyframes article_start {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

const ArticleHeader = styled.div`
    padding: 25px;
    background-color: ${p => Color(p.theme.color).darken(0.05).toString()};
    min-height: 120px;
    position: relative;
`;

const Star = styled.div`
    background-color: transparent;
    position: absolute;
    right: 12px;
    top: 8px;
    z-index: 5;
    cursor: pointer;
    font-size: 24px;
    &:hover > i { color: #ddd }
`;

const Icon = styled.i.attrs({
    className: p => `fa fa-${p.type}`,
}) `color: #fff;`;

const Title = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    font-weight: normal;
    margin-top: 10px;
    color: #fff;
    background-color: transparent;
    text-align: left;
    margin: 4px 0 12px;
    padding-top: 0;
    font-size: 20px;
`;

const InfoPanel = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    span { margin: 0 10px }
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    margin: 8px 0;
    border-radius: 100%;
    box-shadow: 0 2px 3px #ccc;
    background-color: #fff;
`;

const Content = styled(Highlight).attrs({
    innerHTML: true,
    className: 'markdown',
}) `
    padding: 30px;
    line-height: 1.75;
    min-height: 200px;
    transition: all .3s ease;

    ${p => p.theme.media`padding: 15px;`}

    pre {
        margin: 24px -30px;
        background-color: #555;
        box-sizing: content-box;
        color: #f9f9f9;
        padding: 12px 30px;
        font-size: 14px;
        overflow-x: auto;
        box-shadow: 0 0 5px #222 inset;
        line-height: 1.5;

        ${p => p.theme.media`
            font-size: 13px;
            line-height: 1.4;
            margin: 24px -15px;
            padding: 12px 15px;
        `}

        code {
            border-radius: 0;
            font-size: inherit;
            margin: 0;
            padding: 0;
            font-family: $font-code;
        }
    }
`;

const RepliesPanel = styled.div`
    .title {
        text-align: center;
        background-color: ${p => p.theme.color};
        padding: 10px 0;
        margin: 0;
        color: #fff;
        font-size: 16px;
    }
`;
