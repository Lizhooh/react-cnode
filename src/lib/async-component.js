import React from 'react';

/**
 * 高阶异步组件
 */
export default (loadComponent) => (
    class AsyncComponent extends React.Component {

        state = {
            Component: null,
        }

        // 异步加载
        componentWillMount() {
            if (this.state.Component !== null) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);
