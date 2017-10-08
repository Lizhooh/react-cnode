import React, { Component } from 'react';

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
        const { className } = this.props;

        return (
            <div className={className}>{
                tags.map((item, index) => (
                    <div
                        onClick={e => this.onSelectTag(item, index)}
                        key={`tag-${index}`}
                        className={`waves-effect waves-button ${active === index && 'active'}`}
                        >
                        {item.name}
                    </div>
                ))
            }</div>
        );
    }

}
