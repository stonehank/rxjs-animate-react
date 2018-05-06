import React from 'react';
import ReuseButton from "../Widget/reuse-button";


export default class SectionTitle extends React.PureComponent{
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
        const {title,caption}=this.props;
        const {showCaption} = this.state;
        return(
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
