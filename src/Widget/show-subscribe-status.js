import React from 'react';
import {subscriberToSimpleObj} from '../tools'

export default class ShowSubscribeStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name,
            unSubSimpleObj:subscriberToSimpleObj(props.unSubObj)
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){

        //console.time(1)
        const nextUnSub=nextProps.unSubObj
        const curUnSub=prevState.unSubSimpleObj
        let isSameUnSub=Object.keys(nextUnSub).every((e,i)=>{
            return         nextUnSub[e] && curUnSub[e] &&
                    //nextUnSub[e].status===curUnSub[e].status &&
                nextUnSub[e].isStopped===curUnSub[e].isStopped
        })
        //console.timeEnd(1)
        if( !isSameUnSub || prevState.name!==nextProps.name){
            return {
                name:nextProps.name,
                unSubSimpleObj:subscriberToSimpleObj(nextProps.unSubObj)
            }
        }else{
            return null
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        //console.time(2)
        const nextUnSub=nextState.unSubSimpleObj
        const curUnSub=this.state.unSubSimpleObj

        let isSameUnSub=Object.keys(nextUnSub).every((e,i)=>{
            return         nextUnSub[e] && curUnSub[e] &&
                //nextUnSub[e].status===curUnSub[e].status &&
                nextUnSub[e].isStopped===curUnSub[e].isStopped
        })
        //console.timeEnd(2)
        return !isSameUnSub || this.props.name!==nextProps.name
    }

    render(){
        //console.log('ShowSubscribeStatus')
        const {unSubSimpleObj,name}=this.state
        return(
            <React.Fragment>
            <p>{name}当前状态：</p>
                    {Object.keys(unSubSimpleObj).length>0
                        ?
                        Object.keys(unSubSimpleObj).map((e,i)=>{
                            const curStatus=unSubSimpleObj[e].status?unSubSimpleObj[e].status:'error'
                           return (
                               <p className="unSubStatus" key={i}>{e}:{unSubSimpleObj[e].isStopped!==true
                                    ?
                                    <b style={{color:'#00147f'}}>subscribe</b>
                                    :
                                    <b className={curStatus}>{curStatus}</b>}
                               </p>
                           )})
                        :
                        <p>请点击开始</p>}
            </React.Fragment>
        )
    }
}