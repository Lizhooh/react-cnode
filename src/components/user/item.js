import React from 'react';
import { startTimeOf } from '../../functions';

export default ({ item, onClick }) => (
    <div className='item' onClick={onClick}>
        <img className='avatar' src={item.author.avatar_url} alt="" />
        <div className='author'>
            <span className='name'>
                {item.author.loginname}
                <span className='time'>{startTimeOf(item.last_reply_at)}</span>
            </span>
            <span className='title'>{item.title}</span>
        </div>
    </div>
)
