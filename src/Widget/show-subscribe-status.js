import React from 'react';

export default class ShowSubscribeStatus extends React.Component{
    //constructor(props){
    //    super(props)
    //    this.unSubStatus=[]
    //    //this.unSubMarble=(fromJS(props.unSubMarble))
    //}
    //componentDidUpdate(){
    //    const {unSubMarble}=this.props
    //    //this.unSubStatus=(unSubMarble).
    //    //console.log(this.unSubStatus,unSubMarble)
    //    //Object.values(unSubMarble).forEach(e=>{
    //    //    this.unSubStatus.push(e.isStopped)
    //    //})
    //}

    //shouldComponentUpdate(nextProps){
    //    console.log(nextProps.unSubObj,this.props.unSubObj)
    //    //return !is((this.unSubStatus),fromJS(nextProps.unSubMarble)
    //    //Object.values(unSubObj).forEach(e=>{
    //    //
    //    //})
    //    return true
    //}

    render(){
        //console.log('ShowSubscribeStatus')
        const {unSubObj,name}=this.props
        return(
            <React.Fragment>
            <p>{name}当前状态：</p>
                    {Object.keys(unSubObj).length>0
                        ?
                        Object.keys(unSubObj).map((e,i)=>{
                            const curStatus=unSubObj[e].status?unSubObj[e].status:'error'
                           return (
                               <p className="unSubStatus" key={i}>{e}:{unSubObj[e].isStopped!==true
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