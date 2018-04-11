import React from 'react';
import {clearFunc,checkIsUnSub} from '../tools'
import MarbleBall from './marbleball'


export default class Marble extends React.PureComponent{

    /**
     * 此处不unsubscribe会内存泄露
     */
    componentWillUnmount(){
        const {unSubMarble}=this.props
        clearFunc(unSubMarble)
    }
    //componentDidUpdate(){
    //    this.unSubStatusObj=checkIsUnSub(this.props.unSubMarble)
    //}
    //
    //componentDidMount(){
    //    this.unSubStatusObj=checkIsUnSub(this.props.unSubMarble)
    //}
    componentWillReceiveProps(){

    }
    render(){
        const {line,marbleText,marbleArr,unSubMarble}=this.props
        const arr=new Array(line).fill(1)
        return  (
            <div id="marbleWrap">
                <div style={{fontSize:"1.2rem",color:"#000"}}>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall completeMarbleBall">com</div>：代表完成(complete)</span>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall errorMarbleBall">err</div>：代表错误(error)</span>
                    <br />
                    Marble当前状态：
                    {Object.keys(unSubMarble).map((e,i)=>
                        <p key={i}>{e}:{unSubMarble[e].isStopped!==true
                            ?
                            <b style={{color:'#369a36'}}>subscribe</b>
                            :
                            <b style={{color:'#bf0000'}}>unsubscribe</b>}</p>
                    )}
                   </div>
                <div id="marble">
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            {i===line-1?<span>{marbleText}</span>:null}
                            <div  className="hr" ></div>
                        </React.Fragment>
                    )}
                    {marbleArr.map((e,i)=> {
                        return <MarbleBall  marbleBallObj={e} key={i} />

                    })}
                </div>
            </div>
        )
    }
}