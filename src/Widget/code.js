import React from 'react';



export default class Code extends React.Component{
    render(){
        return(
            <div>
                <pre>{this.props.code}</pre>
            </div>
        )
    }
}
