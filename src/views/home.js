import React, { Component } from 'react';
import { homeActions } from '../redux/actions';
import { connect } from 'react-redux';
import { TopicType, TopicList, Header } from '../components/home';
import {
    Tool,
    StaticView,
    Footer,
    Loading,
} from '../components';
import { scrollInfo as s } from '../functions';

// 首页
class Home extends Component {

    constructor(props) {
        super(props);

        this.loading = false;
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        // 加载更多
        if (s.t() + s.h() >= 0.75 * s.H()
            && this.loading === false
            && !this.props.state.showNext) {
            this.onMore();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    async componentDidMount() {
        this.loading = true;
        if (this.props.state.list.length === 0) {
            await this.props.init();
        }
        // 回到过去
        document.documentElement.scrollTop =
        document.body.scrollTop = this.props.state.scrollIndex;
        this.loading = false;
        this.loadingView.hide();
    }

    onSelectTag = async (item, index) => {
        this.loadingView.show();
        await this.props.init(item.tag, index);
        await new Promise(rs => setTimeout(rs, 500));
        this.loadingView.hide();
    }

    onMore = async () => {
        this.loading = true;
        await this.props.more()
        this.loading = false;
    }

    onClick = item => {
        // 记录滚动条位置
        this.props.saveScrollIndex(s.t());
        this.props.history.push(`/article/${item.id}`);
    }

    onNext = async e => {
        document.body.scrollTop =
        document.documentElement.scrollTop = 0;

        await new Promise(rs => setTimeout(rs, 100));
        this.loadingView.show();
        await this.props.next();
        await new Promise(rs => setTimeout(rs, 500));
        this.loadingView.hide();
    }

    render() {
        const { list = [], active, showNext } = this.props.state;
        const { history } = this.props;

        return (
            <div className='home-container'>
                <StaticView>
                    <Header title='Nodejs 专业中文社区' />
                </StaticView>

                <div className='body'>

                    <StaticView>
                        <TopicType className='tags' onSelectTag={this.onSelectTag} initActive={active} />
                        <Loading ref={r => this.loadingView = r} initValue={true} />
                    </StaticView>

                    <TopicList data={list} onClick={this.onClick} />

                    {showNext &&
                        <div className='next-view'>
                            <button onClick={this.onNext}>下一页</button>
                        </div>
                    }
                </div>

                <StaticView>
                    <Tool history={history} onEdit={e => history.push('/create')} />
                    <Footer />
                </StaticView>

            </div>
        );
    }
}

export default connect(
    state => ({ state: state.home }),
    homeActions,
)(Home);
