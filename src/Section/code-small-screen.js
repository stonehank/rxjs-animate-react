import React from 'react';


export default class CodeSmallScreen extends React.PureComponent{

    render(){
        //console.log('Code')
        const {codeStr}=this.props
        return(
                <div className="code-wrap">
                    <pre>{codeStr}</pre>
                </div>
        )
    }
}
