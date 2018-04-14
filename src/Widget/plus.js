import React from 'react';

export default class Plus extends React.PureComponent{
    render(){
        //console.log('Plus')
        const {plus}=this.props
        return(
            plus
                ?
                plus.map((e,i)=>(
                    <p key={i} className="plus">{e?e:'无'}</p>
                ))
                :
                <p>plus不存在，检查代码</p>
        )
    }
}
