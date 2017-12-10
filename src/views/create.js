import React, { Component } from 'react';
import { Tool } from '../components';
import StaticView from 'react-static-view';
import api from '../api';
import { SimplemdeEditor } from '../lib';
import styled from 'styled-components';

export default class Cteate extends Component {

    constructor(props) {
        super(props);

        this.text = '';
        this.title = '';
        this.state = {
            tags: [
                { name: '问答', tag: 'ask' },
                { name: '分享', tag: 'share' },
                { name: '招聘', tag: 'job' },
                { name: '客户端测试', tag: 'dev' },
            ],
            msg: '',
            select: 3, // dev
        }
    }

    componentDidMount() {
        if (!window._login && !(window._user && window._user.accesstoken)) {
            this.props.history.replace('/login');
        }
    }

    onSubmit = async e => {
        const { tags, select } = this.state;

        const res = await api.createTopic(
            this.title,
            tags[select].tag,
            this.text,
            window._user.accesstoken
        );

        try {
            if (res && res.success) {
                this.props.history.push(`/article/${res.topic_id}`);
            }
            else {
                this.setState({ msg: res.error_msg });
            }
        }
        catch (err) {
            this.setState({ msg: '服务器抽风了，等我修一下先。' });
        }
    }

    render() {
        const { tags, select, msg } = this.state;
        const { history } = this.props;

        return (
            <Container>
                <div className='view-container'>
                    <p className='title'>创建文章</p>
                    <div style={{ padding: '10px 0' }}>
                        <div style={{ margin: '15px 0' }}>
                            <Label>类型：</Label>
                            <TagsPanel>{tags.map((item, index) => (
                                <span
                                    key={`tags-${index}`}
                                    className='tag'
                                    onClick={e => this.setState({ select: index })}
                                    >
                                    <Icon type={select !== index ? 'square-o' : 'check-square'} />
                                    <span>{item.name}</span>
                                </span>
                            ))}
                            </TagsPanel>
                        </div>
                        <InputTitlePanel>
                            <Label>标题：</Label>
                            <input
                                type="text"
                                placeholder='标题'
                                onChange={e => this.title = e.target.value}
                                />
                        </InputTitlePanel>
                    </div>
                    <StaticView className='editor-container'>
                        <SimplemdeEditor
                            placeholder='支持 Markdown 格式和快捷键。'
                            className='editor'
                            onChange={text => this.text = text}
                            simplemde={s => this.simplemde = s}
                            />
                    </StaticView>
                    <SubmitPanel>
                        <Message>{msg !== '' && <Icon type="info-circle" />}{msg}</Message>
                        <button onClick={this.onSubmit}>发表</button>
                    </SubmitPanel>
                </div>
                <StaticView>
                    <Tool history={history} edit={!!0} back={!!1} />
                </StaticView>
            </Container>
        );
    }
}

const Container = styled.div`
    padding: 50px 0 0;
    ${p => p.theme.media`padding: 0;`}

    .CodeMirror { min-height: 270px !important }
    .CodeMirror-scroll { min-height: 270px !important }
`;

const Message = styled.span`
    margin: 0 15px;
    font-size: 14px;
    color: #555;

    i {
        position: relative;
        top: 2px;
        margin-right: 5px;
        color: #f55;
    }
`;

const Icon = styled.i.attrs({
    className: p => `fa fa-${p.type}`
}) `
    color: ${p => p.theme.color};
    position: relative;
    top: 2px;
    right: 5px;
    font-size: 18px;
`;

const Label = styled.span`
    border-left: 4px solid ${p => p.theme.color};
    padding: 4px 0 4px 10px;
    box-sizing: content-box;
    color: #666;
    font-size: 16px;
`;

const TagsPanel = styled.div`
    display: inline;

    .tag {
        margin: 0 9px;
        cursor: pointer;
    }
`;

const InputTitlePanel = styled.div`
    margin: 15px 0;
    input[type='text'] {
        padding: 4px 8px;
        width: calc(100% - 100px);
        color: #333;
        border: none;
        border-bottom: 1px solid ${p => p.theme.color};
        margin-left: 0;
    }
`;

const SubmitPanel = styled.div`
    float: right;
    padding: 15px;
`;
