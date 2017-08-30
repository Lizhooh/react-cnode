import React, { Component } from 'react';
import SimplemdeEditor from '../lib/react-simplemde';

// Markdown 文本编辑器
export default class Editor extends Component {

    onChange = text => {
        console.log(text);
    }

    render() {
        return (
            <div className='editor-container'>
                <SimplemdeEditor
                    className='editor'
                    onChange={this.onChange}
                    />
            </div>
        );
    }
}
