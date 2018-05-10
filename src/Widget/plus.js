import React from 'react';

export default class Plus extends React.PureComponent{
 
    render(){
        //console.log('Plus')
        const {plus}=this.props
        return(
            plus ?
                plus.length===0 ?
                    <p className="plus">{' 无变动 '}</p> :
                plus.map((e,i)=>(
                    e ? <p key={i} className="plus">{e}</p> : null
                )) :
                <p>plus不存在，检查代码</p>
        )
    }
}
