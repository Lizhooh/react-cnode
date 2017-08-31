import React from 'react';

export default ({ history, showBack = false, showUser = true, showEdit = true }) => (
    <div className='fixed-buttons-container'>
        {showBack &&
            <button className='back' onClick={e => history.goBack()}>
                <i className="material-icons">&#xE5CB;</i>
            </button>
        }

        {showUser &&
            <button onClick={e => history.push(`/user/`)}>
                <img src="https://avatars3.githubusercontent.com/u/19299088?v=4&s=120" alt="" className='user-avatar' />
            </button>
        }

        {showEdit &&
            <button>
                <i className="material-icons">&#xE254;</i>
            </button>
        }

        <button
            onClick={e => document.body.scrollTop = 0}
            onTouchEnd={e => document.body.scrollTop = 0}
            >
            <i className="material-icons top">&#xE5CE;</i>
        </button>
    </div>
);

