import React from 'react';

export default class ReuseButton extends React.PureComponent{
    constructor(){
        super()
        this.clickEvent=this.clickEvent.bind(this)
    }
    clickEvent(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        this.props.handleClick()
    }

    render(){
        //console.log('ReuseButton')
        const {text,className,disabled}=this.props
        return(
            <button className={className} onClick={this.clickEvent} disabled={disabled}>{text}</button>
        )
    }
}
