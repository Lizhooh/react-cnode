import React from 'react';
import bg from '../../resource/background.jpg';

import StaticContainer from '../staticContainer';


export default ({ title = '' }) => (
    <StaticContainer>
        <div style={{ background: `url(${bg}) center top no-repeat` }}
            className='header-container'
            >
            <div className='header'>
                <div style={{ width: 360, marginTop: -40 }}>
                    <img src="http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" className='logo' alt='' />
                    <p className='title'>{title}</p>
                </div>
            </div>
        </div>
    </StaticContainer>
)