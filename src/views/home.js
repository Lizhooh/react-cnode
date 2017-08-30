import React, { Component } from 'react';
import Header from '../components/home/header';
import Tags from '../components/home/tags';
import List from '../components/home/list';
import FixedButtons from '../components/fixed-buttons';
import { homeActions } from '../redux/actions';
import { connect } from 'react-redux';
import { scrollInfo as s } from '../functions';


class Home extends Component {

    constructor(props) {
        super(props);

        this.loading = false;
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        // 加载更多
        if (s.t() + s.h() >= 0.8 * s.H() && this.loading === false) {
            this.onMore();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    async componentDidMount() {
        this.loading = true;
        await this.props.init();
        // 回到过去
        document.documentElement.scrollTop =
        document.body.scrollTop = this.props.state.scrollIndex;
        this.loading = false;
    }

    onSelectTag = async (item, index) => {
        if (s.t() > 260) {
            document.documentElement.scrollTop =
            document.body.scrollTop = 260;
        }
        await this.props.init(item.tag, index);
    }

    onMore = async () => {
        this.loading = true;
        await this.props.more();
        this.loading = false;
    }

    onClick = item => {
        // 记录滚动条位置
        this.props.saveScrollIndex(s.h());
        this.props.history.push(`/article/${item.id}`);
    }

    render() {
        const { list = [], active } = this.props.state;

        return (
            <div className='home-container'>
                <Header title='Nodejs 专业中文社区' />
                <div className='body'>
                    <Tags className='tags' onSelectTag={this.onSelectTag} initActive={active} />
                    <List data={list} onClick={this.onClick} />

                    <div className='next-view'>
                        <button>上一页</button>
                        <button>下一页</button>
                    </div>
                </div>
                <FixedButtons />
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.home }),
    homeActions,
)(Home);
