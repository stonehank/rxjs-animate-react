import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'
import MarbleBall from './marbleball'


export default class Marble extends React.PureComponent{

    /**
     * 此处不unsubscribe会内存泄露
     */
    componentWillUnmount(){
        clearTimeout(this.timer)
        const {unSubMarble,refreshStartStopButton}=this.props
        clearFunc(unSubMarble)
        refreshStartStopButton()
    }
    componentDidUpdate(){
        //const {marbleArr}=this.props
        //let ballL=marbleArr[marbleArr.length-1]?marbleArr[marbleArr.length-1].left:this.marbleEle.offsetWidth
        //let scrollDistance=ballL-this.marbleEle.offsetWidth;
        //clearTimeout(this.timer)
        //this.timer=setTimeout(()=>{ this.marbleEle.scrollLeft=scrollDistance+20},20)
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{this.marbleEle.scrollLeft=9999999999},20)
        const {unSubMarble,refreshStartStopButton}=this.props
        if(Object.keys(unSubMarble).length>0 && checkDidAllunSub(unSubMarble)){
            refreshStartStopButton()
        }
    }
    render(){
        console.log('Marble')
        const {line,marbleText,marbleArr,unSubMarble}=this.props
        const arr=new Array(line).fill(1)
        return  (
            <div id="marbleWrap" >
                <div style={{fontSize:"1.2rem",color:"#000"}}>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall completeMarbleBall">com</div>：代表完成(complete)</span>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall errorMarbleBall">err</div>：代表错误(error)</span>
                    <br />
                    Marble当前状态：
                    {Object.keys(unSubMarble).length>0
                        ?
                        Object.keys(unSubMarble).map((e,i)=>
                        <p key={i}>{e}:{unSubMarble[e].isStopped!==true
                            ?
                            <b style={{color:'#369a36'}}>subscribe</b>
                            :
                            <b style={{color:'#bf0000'}}>unsubscribe</b>}</p>)
                        :
                        <p>请点击开始</p>}
                   </div>
                <div id="marble" ref={e=>this.marbleEle=e}>
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            {i===line-1?<span>{marbleText}</span>:null}
                            <div  className="hr" style={marbleArr[marbleArr.length-1]?{width:marbleArr[marbleArr.length-1].left+'px'}:{}}></div>
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