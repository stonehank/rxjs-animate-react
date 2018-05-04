import React from 'react';
import ReuseButton from "../Widget/reuse-button";


export default class SectionTitleCompatible extends React.PureComponent{
    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
        this.state={
            showCaption:true
        }
    }

    handleClick(){
        this.setState(prevState=>({
            showCaption:!prevState.showCaption
        }))
    }
    render(){
        const {title,caption,smallScreen}=this.props;
        const {showCaption} = this.state;
        return(
            smallScreen ?
                <React.Fragment>
                    <p className="section-title">{title}</p>
                    <p dangerouslySetInnerHTML={{__html: caption}}
                       className="section-caption"/>
                </React.Fragment> :
                <React.Fragment>
                    <p className="section-title">
                        {title}
                        <ReuseButton text={showCaption ? "less" : "more"} className={"toggle-title-button"} handleClick={this.handleClick}/>
                    </p>
                    {
                        showCaption ?
                            <p dangerouslySetInnerHTML={{__html: caption}}
                               className="section-caption"/> :
                            null
                    }
                </React.Fragment>
        )
    }
}
