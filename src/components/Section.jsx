import React from 'react';

const Section = (props) => {
    return (<div className='section'>
        {props.children}
    </div>);
};
export const SectionTitle = (props) => {
    return (<div className='section_title'>
        {props.children}
    </div>);
};
export const SectionBody = (props) => {
    return (<div className='section_body'>
        {props.children}
    </div>);
};

export default Section;
