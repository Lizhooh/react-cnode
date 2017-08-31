import React from 'react';
import { startTimeOf } from '../../functions';
import Highlight from '../../lib/react-highlight';

export default ({ list }) => (
    <div className='replies-list'>{
        list.map((item, index) => (
            <div key={`replies-${index}`} className='replies-item'>
                <img src={item.author.avatar_url} alt='' className='avatar' />

                <div className='content-view'>
                    <span className='name'>
                        {item.author.loginname}
                        <span className='time'>{startTimeOf(item.create_at)}</span>
                    </span>
                    <Highlight innerHTML={true} className='content'>
                        {item.content || ''}
                    </Highlight>
                </div>
            </div>
        ))
    }</div>
)
