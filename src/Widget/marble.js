import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'
import MarbleBall from './marbleball'
import ShowSubscribeStatus from './show-subscribe-status';

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
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{this.marbleEle.scrollLeft=9999999999},20)
        const {unSubMarble,refreshStartStopButton}=this.props
        if(Object.keys(unSubMarble).length>0 && checkDidAllunSub(unSubMarble)){
            refreshStartStopButton()
        }
    }
    render(){
        //console.log('Marble')
        const {line,marbleText,marbleArr,unSubMarble}=this.props
        const _marbleArr=marbleArr?marbleArr:[]
        const arr=new Array(line).fill(1)
        return  (
            <div id="marbleWrap" >
                <div style={{fontSize:"1.2rem",color:"#000"}}>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall completeMarbleBall">com</div>：代表完成(complete)</span>
                    <span style={{fontSize:"0.8rem"}}><div className="colorBall errorMarbleBall">err</div>：代表错误(error)</span>
                    <ShowSubscribeStatus unSubObj={unSubMarble} name="Marble"/>
               </div>
                <div id="marble" ref={e=>this.marbleEle=e}>
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            {i===line-1?<span>{marbleText}</span>:null}
                            <div  className="hr" style={_marbleArr[_marbleArr.length-1]?{width:_marbleArr[_marbleArr.length-1].left+'px'}:{}}></div>
                        </React.Fragment>
                    )}
                    {_marbleArr.map((e,i)=>
                         <MarbleBall  marbleBallObj={e} key={i} />
                    )}
                </div>
            </div>
        )
    }
}