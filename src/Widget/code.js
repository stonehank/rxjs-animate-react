import React from 'react';



export default class Code extends React.PureComponent{
    render(){
        //console.log('Code')

        return(
            <div>
                <pre>{this.props.code}</pre>
            </div>
        )
    }
}
