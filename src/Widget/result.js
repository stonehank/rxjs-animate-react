import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'


/**
 * 让subscribe随时刷新 取消Pure
 */
export default class Result extends React.PureComponent{


    /**
     * 此处不unsubscribe会内存泄露
     */
    componentWillUnmount(){
        const {unSubResult,refreshStartStopButton}=this.props
        clearFunc(unSubResult)
        refreshStartStopButton()
    }
    componentDidUpdate(){
        this.resultEle.scrollTop=this.resultEle.offsetHeight;
        const {unSubResult,refreshStartStopButton}=this.props
        if(Object.keys(unSubResult).length>0 && checkDidAllunSub(unSubResult)){
            refreshStartStopButton()
        }
    }

    render(){
        console.log('result')
        const {unSubResult,value}=this.props
        return(
            <div className="result" ref={e=>this.resultEle=e}>
                <div style={{fontSize:"1.2rem",color:"#000"}}>
                    Result当前状态：
                    {Object.keys(unSubResult).length>0
                        ?
                        Object.keys(unSubResult).map((e,i)=>
                        <p key={i}>{e}:{unSubResult[e].isStopped!==true
                            ?
                            <b style={{color:'lightgreen'}}>subscribe</b>
                            :
                            <b style={{color:'#bf0000'}}>unsubscribe</b>}</p>)
                        :
                        <p>请点击开始</p>}
                </div>
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            </div>
        )
    }
}

