import React from 'react';

export default () => (
    <div className='fixed-buttons-container'>
        <button>
            <i className="material-icons">&#xE254;</i>
        </button>
        <button onClick={e => document.body.scrollTop = 0}>
            <i className="material-icons top">&#xE5CE;</i>
        </button>
    </div>
);

