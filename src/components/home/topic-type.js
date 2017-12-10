import React, { Component } from 'react';
import styled from 'styled-components';

export default class TopicType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.initActive,
            tags: [
                { name: '全部', tag: 'all', icon: '' },
                { name: '精华', tag: 'good', icon: '' },
                { name: '问答', tag: 'ask', icon: '' },
                { name: '分享', tag: 'share', icon: '' },
                { name: '招聘', tag: 'job', icon: '' },
            ],
        }
    }

    onSelectTag = (item, index) => {
        this.setState({ active: index });
        this.props.onSelectTag &&
            this.props.onSelectTag(item, index);
    }

    render() {
        const { tags, active} = this.state;
        return (
            <Container>{tags.map((item, index) => (
                <Tag
                    onClick={e => this.onSelectTag(item, index)}
                    key={`tag-${index}`}
                    className={"waves-effect waves-button"}
                    active={active === index}
                    >
                    {item.name}
                </Tag>
            ))}
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    cursor: default;
    background-color: #fff;
    align-items: center;
    border-bottom: 1px solid ${p => p.theme.color};
    background-color: ${p => p.theme.color};
    color: #fff;
`;

const Tag = styled.div`
    flex: 1;
    text-align: center;
    padding: 16px 0;
    ${p => p.theme.media`padding: 12px 0;`}
    &:hover { background-color: rgba(1, 1, 1, 0.07) }

    ${p => p.active && `
        background-color: rgba(1, 1, 1, 0.07);
    `}
`;
