import React, { Component } from 'react';
import SimplemdeEditor from '../lib/react-simplemde';
import { Tool, StaticView } from '../components';
import api from '../api';

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

    componentWillMount() {
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
            <div className='create-container'>
                <div className='view-container'>
                    <p className='title'>创建文章</p>
                    <div className='header'>
                        <div className='input-tab'>
                            <span className='label'>类型：</span>
                            <div className='tags'>{
                                tags.map((item, index) => (
                                    <span key={`tags-${index}`} className='tag'
                                        onClick={e => this.setState({ select: index })}
                                        >
                                        <i className={`fa ${select !== index ? 'fa-square-o' : 'fa-check-square'}`} />
                                        <span>{item.name}</span>
                                    </span>
                                ))
                            }</div>
                        </div>
                        <div className='input-title'>
                            <span className='label'>标题：</span>
                            <input type="text" placeholder='标题' onChange={e => this.title = e.target.value} />
                        </div>
                    </div>
                    <StaticView className='editor-container'>
                        <SimplemdeEditor
                            placeholder='支持 Markdown 格式和快捷键。'
                            className='editor'
                            onChange={text => this.text = text}
                            simplemde={s => this.simplemde = s}
                            />
                    </StaticView>
                    <div style={{ float: 'left', padding: 15 }}>
                        <button onClick={this.onSubmit}>发表</button>
                        <span className='msg'>{
                            msg !== '' && <i className="fa fa-info-circle" />
                        }{msg}</span>
                    </div>
                </div>

                <StaticView>
                    <Tool history={history} edit={!!0} back={!!1} />
                </StaticView>
            </div>
        );
    }
}
