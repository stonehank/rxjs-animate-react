import React from 'react'


export default class PopText extends React.PureComponent{
    render(){
        const {data,position}=this.props
        const {top,left}=position
        return(
            <div id="popData" style={{left,top}}>
                <p>{`${data}`}</p>
                <p>{`stringify:${JSON.stringify(data)}`}</p>
            </div>
        )
    }
}