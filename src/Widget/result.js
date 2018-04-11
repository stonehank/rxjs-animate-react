import React from 'react';
import {clearFunc} from '../tools'





export default class Result extends React.PureComponent{

    /**
     * 此处不unsubscribe会内存泄露
     */
    componentWillUnmount(){
        const {unSubResult}=this.props
        clearFunc(unSubResult)
    }
    render(){
        const {unSubResult,value}=this.props
        return(
            <div className="result">
                <div style={{fontSize:"1.2rem",color:"#000",zIndex:1}}>
                    Result当前状态：
                    {Object.keys(unSubResult).map((e,i)=>
                        <p key={i}>{e}:{unSubResult[e].isStopped!==true
                            ?
                            <b style={{color:'lightgreen'}}>subscribe</b>
                            :
                            <b style={{color:'#bf0000'}}>unsubscribe</b>}</p>
                    )}
                </div>
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            </div>
        )
    }
}

