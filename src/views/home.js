import React, { Component } from 'react';
import { homeActions } from '../redux/actions';
import { connect } from 'react-redux';
import { TopicType, TopicList, Header } from '../components/home';
import { Tool, Footer, Loading } from '../components';
import StaticView from 'react-static-view';
import { scrollInfo as s } from '../functions';
import styled, { keyframes } from 'styled-components';
import Color from 'color';

// 首页
class Home extends Component {

    constructor(props) {
        super(props);

        this.loading = false;
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        const animationFrame = (cb) => window.requestAnimationFrame(cb) || setTimeout(cb, 50);
        animationFrame(() => {
            // 加载更多
            if (s.t() + s.h() >= 0.75 * s.H()
                && this.loading === false
                && !this.props.state.showNext) {
                this.onMore();
            }
        })
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
            <Container>
                <StaticView>
                    <Header title='Nodejs 专业中文社区' />
                </StaticView>
                <Body>
                    <StaticView>
                        <TopicType onSelectTag={this.onSelectTag} initActive={active} />
                        <Loading ref={r => this.loadingView = r} initValue={true} />
                    </StaticView>
                    <TopicList data={list} onClick={this.onClick} />
                    {showNext &&
                        <NextPanel>
                            <Button onClick={this.onNext}>下一页</Button>
                        </NextPanel>
                    }
                </Body>
                <StaticView>
                    <Tool history={history} onEdit={e => history.push('/create')} />
                    <Footer />
                </StaticView>
            </Container>
        );
    }
}

export default connect(
    state => ({ state: state.home }),
    homeActions,
)(Home);

const Container = styled.div`
    min-height: 500px;
`;

const homestart = keyframes`
    0% { transform: translateY(-20px) }
    100% { transform: translateY(-70px) }
`;

const Body = styled.div`
    transform: translateY(-70px);
    width: 100%;
    max-width:  ${p => p.theme.body.maxWidth};
    min-width:  ${p => p.theme.body.minWidth};
    min-height: ${p => p.theme.body.minHeight};
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 0 10px 20px rgba(1, 1, 1, 0.18);
    z-index: 2;
    border-radius: 2px;
    padding: 0 0 20px;
    animation: ${homestart} .52s ease;
    animation-fill-mode: forwards;

    ${p => p.theme.media`
        box-shadow: none;
        animation: none;
    `}
`;

const NextPanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 5px 20px 0;
    ${p => p.theme.media`justify-content: center`}
`;

const Button = styled.button`
    padding: 6px 16px;
    font-size: 13px;
    line-height: 1.2;
    text-align: center;
    vertical-align: center;
    transition: all .3s ease;
    margin: 0 15px;

    &:hover {
        background-color: ${p => Color(p.theme.color).darken(0.03).toString()};
        box-shadow: 0 5px 8px ${p => Color(p.theme.color).darken(0.10).toString()};
    }
`;

