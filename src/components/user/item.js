import React from 'react';

export default ({ item }) => (
    <div className='item'>
        <img className='avatar' src={item.author.avatar_url} alt="" />
        <div className='author'>
            <span className='name'>{item.author.loginname}</span>
            <span className='title'>{item.title}</span>
        </div>
    </div>
)
