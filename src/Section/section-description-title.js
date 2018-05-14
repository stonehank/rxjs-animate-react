import React from 'react';



export default class SectionDescriptionTitle extends React.PureComponent{

    render(){
        const tClass='section-title';
        const {title}=this.props;
        return(
            <div className={tClass}>
                <span>操作符名称：</span>
                <p>
                {title}
                {this.props.children}
                </p>
            </div>
        )
    }
}
