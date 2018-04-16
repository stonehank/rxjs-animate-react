import React from 'react';
import {clearFunc,checkDidAllunSub} from '../tools'
import MarbleBall from './marble-ball'
import ShowSubscribeStatus from './../Widget/show-subscribe-status';
import ShowExampleMarbleBall from './show-example-marbleball';
import MarbleCaption from './marble-caption'


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
                <div id="marble" ref={e=>this.marbleEle=e}>
                    {arr.map((e,i)=>
                        <React.Fragment key={i}>
                            <MarbleCaption i={i} line={line} marbleText={marbleText}/>
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