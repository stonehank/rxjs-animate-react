import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'
import MarbleBall from './marble-ball'
import ShowSubscribeStatus from './../Widget/show-subscribe-status';
import ShowExampleMarbleBall from './show-example-marbleball';
import MarbleCaption from './marble-caption'
import HrLine from './hr-line'

export default class Marble extends React.PureComponent{
    constructor(){
        super()
        this.state={

        };
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

        if(Object.keys(unSubMarble).length>0 && checkDidAllunSub(unSubMarble)){
            refreshStartStopButton()
        }
        if(this.marbleArrLen===_marbleArr.length){return}
        this.timer=setTimeout(()=>{this.marbleEle.scrollLeft=9999999999},20)
        this.marbleArrLen=_marbleArr.length
    }

    render(){
        //console.log('Marble')
        const {line,marbleText,marbleArr,unSubMarble}=this.props
        const _marbleArr=marbleArr?marbleArr:[]
        const _marbleArrLastObj=_marbleArr[_marbleArr.length-1]

        //const withStyle=_marbleArrLastObj?{width:_marbleArrLastObj.left}:{};
        const lastObjLeft=_marbleArrLastObj?_marbleArrLastObj.left:0;
        const hrMinWidth=this.marbleEle?this.marbleEle.offsetWidth:0;
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
                    <ShowSubscribeStatus unSubObj={unSubMarble} name="Marble"/>
               </div>
                <div id="marble"
                     ref={e=>this.marbleEle=e}>
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            <MarbleCaption i={i} line={line} marbleText={marbleText}/>
                            <HrLine decideHrWidths={decideHrWidths}/>
                        </React.Fragment>
                    )}
                    <div id="dragMarble"></div>
                    {_marbleArr.map((e,i)=>
                         <MarbleBall  marbleBallObj={e} key={i} dragMaxLeft={decideHrWidths} />
                    )}
                </div>
            </div>
        )
    }
}