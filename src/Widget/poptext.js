import React from 'react'


export default class PopText extends React.Component{
    render(){
        const {data,position}=this.props
        const {top,left}=position
        console.log(top,left)
        return(
            <div id="popData" style={{left,top}}>
                <p>{`${data}`}</p>
                <p>{`stringify:${JSON.stringify(data)}`}</p>
            </div>
        )
    }
}