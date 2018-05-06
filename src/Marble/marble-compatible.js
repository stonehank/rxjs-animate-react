import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'
import MarbleBallContainer from './marble-ball-container'
import ShowSubscribeStatus from './../Widget/show-subscribe-status';
import ShowExampleMarbleBall from './show-example-marbleball';
import MarbleCaption from './marble-caption'
import HrLine from './hr-line'
import {ReuseButton} from '../Widget'

export default class MarbleCompatible extends React.PureComponent{
    constructor(){
        super()
        this.state={
            isDragged:false,
            restorePositionKey:0
        };
        this.setIsDragged=this.setIsDragged.bind(this)
        this.restorePosition=this.restorePosition.bind(this)
    }

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
        const {marbleArr,unSubMarble,refreshStartStopButton}=this.props
        const _marbleArr=marbleArr?marbleArr:[]

        if(Object.keys(unSubMarble).length>0 ){
            refreshStartStopButton()
        }
        if(this.marbleArrLen===_marbleArr.length){return}
        this.timer=setTimeout(()=>{this.marbleEle.scrollLeft=9999999999},20)
        this.marbleArrLen=_marbleArr.length
    }
    setIsDragged(bool){
        this.setState({
            isDragged:bool
        })
    }
    restorePosition(){
        this.setState(prevState=>({
            restorePositionKey:prevState.restorePositionKey+1,
            isDragged:false
        }))
    }

    render(){
        //console.log('Marble')
        const {line,marbleText,marbleArr,unSubMarble}=this.props
        const {isDragged,restorePositionKey}=this.state
        const _marbleArr=marbleArr?marbleArr:[]
        const _marbleArrLastObj=_marbleArr[_marbleArr.length-1]
        const lastObjLeft=_marbleArrLastObj ? _marbleArrLastObj.left : 0;
        const hrMinWidth=this.marbleEle ? this.marbleEle.offsetWidth : 0;
        const decideHrWidths=Math.max(lastObjLeft,hrMinWidth)

        let arr=new Array(line)
        if(Array.prototype.fill){
            arr.fill(1)
        }else{
            for(var i=0;i<arr.length;i++){
                arr[i]=1
            }
        }
        return  (
            <div id="marbleWrap" >
                <div style={{fontSize:"1.2rem",color:"#000"}}>
                    <ShowExampleMarbleBall />
                    <ReuseButton className={"restore-pos"} handleClick={this.restorePosition} text={"拖拽还原"} disabled={!isDragged}/>
                    <ShowSubscribeStatus unSubObj={unSubMarble} name="Marble"/>
                </div>
                <div id="marble" ref={e=>this.marbleEle=e}>
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            <MarbleCaption i={i} line={line} marbleText={marbleText}/>
                            <HrLine decideHrWidths={decideHrWidths}/>
                        </React.Fragment>
                    )}
                    <div id="dragMarble"></div>
                    {_marbleArr.map((e,i)=>
                        <MarbleBallContainer marbleBallObj={e} key={i}
                                    setIsDragged={this.setIsDragged}
                                    restorePositionKey={restorePositionKey}
                                    dragMaxLeft={decideHrWidths} />
                    )}
                </div>
            </div>
        )
    }
}