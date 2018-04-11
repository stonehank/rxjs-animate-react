import React from 'react';



export default class Minus extends React.Component{
    render(){
        const {minus}=this.props
        return(
            minus
                ?
                minus.map((e,i)=>(
                    <p key={i} className="minus">{e?e:"无"}</p>
                ))
                :
                <p>minus不存在，检查代码</p>
        )
    }
}

