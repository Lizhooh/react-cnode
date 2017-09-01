import React, { Component } from 'react';
import { readUser } from '../storage';

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
        let user = readUser()
        if (user && user.accesstoken) {
            // let res = await api.checkToken(user.accesstoken);
            window._login = true;
            this.setState({ user: user });
        }
        else {
            window._login = false;
        }
    }

    renderBack = (history) => (
        <button className='back' onClick={e => history.goBack()}>
            <i className="material-icons">&#xE5CB;</i>
        </button>
    )

    renderUser = (history, user) => (
        <button onClick={e => history.push(`/user/${this.state.user.loginname}`)}>{
            user.id ?
                <img src={user.avatar_url} alt="" className='user-avatar' /> :
                <i className="material-icons" style={{ color: '#fff' }}>&#xE87C;</i>
        }
        </button>
    )

    renderEdit = (onEdit) => (
        <button onClick={onEdit}>
            <i className="material-icons">&#xE254;</i>
        </button>
    )

    render() {
        const { back, edit, user, history, onEdit } = this.props;
        const { user: _user } = this.state;

        return (
            <div className='fixed-buttons-container'>
                {user && this.renderUser(history, _user)}
                {back && this.renderBack(history)}
                {edit && this.renderEdit(onEdit)}

                <button
                    onClick={e => document.body.scrollTop = 0}
                    onTouchEnd={e => document.body.scrollTop = 0}
                    >
                    <i className="material-icons top">&#xE5CE;</i>
                </button>
            </div>
        );
    }
}

