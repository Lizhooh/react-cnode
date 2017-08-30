import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js/lib/highlight';

import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';

// highlight.js 在 react 上的实现
class Highlight extends React.Component {
    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        const domNode = ReactDOM.findDOMNode(this);
        const nodes = domNode.querySelectorAll('pre code');

        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('php', php);
        hljs.registerLanguage('python', python);
        hljs.registerLanguage('sql', sql);
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('json', json);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('bash', bash);
        hljs.registerLanguage('java', java);

        let i;
        for (i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }

    render() {
        const {children, className, element, innerHTML} = this.props;
        let Element = element ? React.DOM[element] : null;

        if (innerHTML) {
            if (!Element) {
                Element = React.DOM.div
            }

            return Element({ dangerouslySetInnerHTML: { __html: children }, className: className || null }, null);
        } else {
            if (Element) {
                return Element({ className }, children);
            } else {
                return <pre><code className={className}>{children}</code></pre>;
            }
        }
    }
}

Highlight.defaultProps = {
    innerHTML: false,
    className: '',
    languages: [],
};

export default Highlight;
