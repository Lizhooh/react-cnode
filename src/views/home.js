import React, { Component } from 'react';
import api from '../api';
import Header from '../components/home/header';
import Tags from '../components/home/tags';
import List from '../components/home/list';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            page: 1,
            tag: 'all',
        };

        this.loading = false;
        this.t = () => document.documentElement.scrollTop || document.body.scrollTop;
        this.H = () => document.documentElement.scrollHeight || document.body.scrollHeight;
        this.h = () => document.documentElement.clientHeight || document.body.clientHeight;

        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        // 加载更多
        if (this.t() + this.h() >= 0.8 * this.H() && this.loading === false) {
            this.loading = true;
            this.onMore();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    async componentDidMount() {
        this.loading = true;
        const res = await api.topics();
        console.log(res);
        this.setState({ list: res.data });
        this.loading = false;
    }

    onSelectTag = async (item, index) => {
        if (this.t() > 260) {
            document.body.scrollTop = 260;
        }
        const res = await api.topics(item.tag);
        this.setState({ list: res.data, tag: item.tag });
    }

    onMore = async () => {
        const { tag, page, list } = this.state;
        if (list.length >= 100) { // 大于 100 个换页
            return;
        }
        const res = await api.topics(tag, page + 1);
        this.setState({ page: page + 1, list: [...list, ...res.data] });
        this.loading = false;
    }

    render() {
        const { list } = this.state;

        return (
            <div className='home-container'>
                <Header title='Nodejs 专业中文社区' />
                <div className='body'>
                    <Tags className='tags' onSelectTag={this.onSelectTag} />
                    <List data={list} />

                    <div className='next-view'>
                        <button>上一页</button>
                        <button>下一页</button>
                    </div>
                </div>
            </div>
        );
    }
}


