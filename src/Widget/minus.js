import React from 'react';



export default class Minus extends React.PureComponent{
    render(){
        //console.log('minus')
        const {minus}=this.props
        return(
            minus ?
                minus.length===0 ?
                    <p className="minus">{' 无变动 '}</p> :
                minus.map((e,i)=>(
                    e ? <p key={i} className="minus">{e}</p> : null
                )) :
                <p>minus不存在，检查代码</p>
        )
    }
}

