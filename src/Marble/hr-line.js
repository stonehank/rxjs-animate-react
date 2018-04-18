import React from 'react';

export default class HrLine extends React.PureComponent{
    render(){
        const {decideHrWidths}=this.props
        return(
            <div  className="hr" style={{width:decideHrWidths}}></div>
        )
    }
}