import React, { Component } from 'react';

export default class Tool extends Component {

    static defaultProps = {
        back: false,
        edit: true,
        user: true,
        history: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {},
        }
    }

    async componentWillMount() {
        if (window._login) {
            this.setState({ user: window._user });
        }
    }

    renderBack = (history) => (
        <button className='back' onClick={e => {
            if (history.length <= 2) {
                return history.replace('/');
            }
            history.goBack();
        } }>
            <i className="fa fa-chevron-left"></i>
        </button>
    )

    renderUser = (history, user) => (
        <button onClick={e => history.push(`/user/${this.state.user.loginname}`)}>{
            user.id ?
                <img src={user.avatar_url} alt="" className='user-avatar' /> :
                <i className="fa fa-circle-o-notch"></i>
        }
            { /** <span className='dot' /> */}
        </button>
    )

    renderEdit = (onEdit) => (
        <button onClick={onEdit}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
    )

    onTop = e => {
        document.documentElement.scrollTop =
            document.body.scrollTop = 0
    }

    render() {
        const { back, edit, user, history, onEdit } = this.props;
        const { user: _user } = this.state;

        return (
            <div className='fixed-buttons-container'>
                {back && this.renderBack(history)}

                <div className='fixed-right'>
                    {user && this.renderUser(history, _user)}
                    {edit && this.renderEdit(onEdit)}

                    <button onClick={this.onTop} onTouchEnd={this.onTop}>
                        <i className="fa fa-chevron-up top"></i>
                    </button>
                </div>
            </div>
        );
    }
}

