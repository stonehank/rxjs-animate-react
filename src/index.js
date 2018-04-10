import React from 'react';
import ReactDOM from 'react-dom';
import state from './mockData'
import './index.css'
import CreateNav from './Nav/createnav'
import {BrowserRouter as Router,Route,withRouter}  from 'react-router-dom'
import {fetchData,code2Arr,unique,getArgument,clearFunc,checkIsUnSub} from './tools'
import Rx from 'rxjs/Rx';

//import {createStore,applyMiddleware,compose } from 'redux'
//import {connect,Provider} from 'react-redux'
//import thunk from 'react-thunk'

class MarbleBall extends React.Component{
    constructor(){
        super()
        this.showData=this.showData.bind(this)
        this.state={
            curStyle:{},
            curContent:{}
        }
        //this.timeStamp=new Date().getTime()
        this.left=0
    }
    showData(){
        const {text,data}=this.state.curContent
        const stringify=JSON.stringify(data)
        console.log(text,'stringify:'+stringify)
    }

    componentWillUnmount(){
     clearTimeout(this.timer)
    }

    componentDidMount(){

        const {whichLine,line,v,timeStamp}=this.props.marbleBallObj

        let calcedMarbleBallObj;
        if(whichLine) {
            if (whichLine ===line) {
                calcedMarbleBallObj = Object.assign(getArgument(v,timeStamp), {top: (line - 1) * 50 + 122})
            } else {
                calcedMarbleBallObj = Object.assign(getArgument(v,timeStamp), {top: whichLine * 50})
            }
        }else{
            calcedMarbleBallObj=getArgument(v,timeStamp)
        }
        //this.timeStamp=calcedMarbleBallObj.timeStamp
        //this.left=calcedMarbleBallObj.left

        this.timer=setTimeout(()=>{
            const {top,left,background,color,data,text}=calcedMarbleBallObj
          this.setState({
               curStyle:{top:top,left:left,background:background,color:color,opacity:1},
               curContent:{text,data}
           })
       },20)
    }
    render(){
        const {text,data}=this.state.curContent
        return(
            <div className="colorBall" onMouseOver={this.showData} style={this.state.curStyle}>{text}</div>
        )
    }
}

class Marble extends React.PureComponent{
    constructor(){
        super()
        //this.timeStamp=new Date().getTime();
        //this.marbleFullScreen=this.marbleFullScreen.bind(this)
        //this.state={
        //    fullScreen:false
        //}
    }

    /**
     * 此处不unsubscribe会内存泄露
     */
    componentWillUnmount(){
        const {unSubMarble}=this.props
        clearFunc(unSubMarble)
    }

    //marbleFullScreen(){
    //    this.setState(prevState=>({
    //        fullScreen:!prevState.fullScreen
    //    }))
    //}
    render(){
        const {line,marbleText,marbleArr,unSubStatus}=this.props
    const arr=Array(line).fill(1)
      return  (
          <div id="marbleWrap">
              <p style={{fontSize:"1.2rem",color:"#000",position:"absolute",zIndex:1}}>
                  当前状态：
                  {unSubStatus===false
                  ?
                  <b style={{color:'#369a36'}}>subscribe</b>
                  :
                  <b style={{color:'#bf0000'}}>unsubscribe</b>}
                  ，最后一行为结果输出行</p>
              {/*<span className="marbleFullScreenButton" onClick={this.marbleFullScreen}>全屏宽度</span>*/}
              <div id="marble">
              {arr.map((e,i)=>
              <React.Fragment key={i}>
                  {i===line-1?<span>{marbleText}</span>:null}
                  <div  className="hr" ></div>
              </React.Fragment>
              )}
                  {marbleArr.map((e,i)=> {
                      //let timeStamp=Math.max(this.timeStamp,marbleArr[0].timeStamp)
                          return <MarbleBall  marbleBallObj={e} key={i} />

                  })}
                  </div>
          </div>
          )
    }
}

class Result extends React.PureComponent{

/**
 * 此处不unsubscribe会内存泄露
 */
    componentWillUnmount(){
        const {unSubResult}=this.props
        clearFunc(unSubResult)
    }


    render(){
        console.log(2)
        const {unSubStatus}=this.props
        return(
            <div className="result">
                <p style={{fontSize:"1.2rem"}}>当前状态：{unSubStatus===false
                    ?
                    <b style={{color:'lightgreen'}}>subscribe</b>
                    :
                    <b style={{color:'#ffa3a3'}}>unsubscribe</b>}
                </p>
                <div dangerouslySetInnerHTML={{__html: this.props.value}}></div>
            </div>
        )
    }
}

class Code extends React.Component{
    render(){
        return(
            <div>
                <pre>{this.props.code}</pre>
            </div>
        )
    }
}
const Overview=()=>{
    return(
        <p>请选择一个operator</p>
    )
}

class Plus extends React.Component{
    render(){
        const {plus}=this.props
        return(
            plus
                ?
                plus.map((e,i)=>(
                    <p key={i} className="plus">{e}</p>
                ))
                :
                <p>plus不存在，检查代码</p>
        )
    }
}
class Minus extends React.Component{
    render(){
        const {minus}=this.props
        return(
            minus
                ?
                minus.map((e,i)=>(
                    <p key={i} className="minus">{e}</p>
                ))
                :
                <p>minus不存在，检查代码</p>
        )
    }
}

class SectionContent extends React.PureComponent{


    constructor(){
        super()
        this.toggleCode=this.toggleCode.bind(this)
        this.prevCodeArr=[]
        this.state={
            showCode:true,
        }
    }
    toggleCode(){
        this.setState(prevState=>({
            showCode:!prevState.showCode
        }))
    }
    render(){
        const {title,caption,plus,minus,code}=this.props
        return (
            <div className="content">
                <p>{title}</p>
                <div>{caption}</div>
                <div>
                    <Plus plus={plus}/>
                    <Minus minus={minus}/>
                </div>
                {this.state.showCode
                    ?
                    <React.Fragment>
                        <button onClick={this.toggleCode}>隐藏源码</button>
                        <Code code={code}/>
                    </React.Fragment>
                    :
                    <button onClick={this.toggleCode}>显示源码</button>

                }
            </div>
        )
    }
}

class CustomCheckBox extends React.PureComponent{
    constructor(){
        super()
        this.checkBoxChange=this.checkBoxChange.bind(this)
    }
    checkBoxChange(){
        const {checkBoxChange}=this.props
        checkBoxChange()
    }
    render(){
        const {text,id,checkBoxStatus,unSub}=this.props
        return (
        <div>
            <p>{checkBoxStatus?`${text}已经开启`:`${text}已经关闭，并且unsubscribe`}:</p>
            <input type="checkbox"  className='inputCheckBox' id={id} checked={checkBoxStatus?true:false}  onChange={this.checkBoxChange}/>
            <label className="slide-checkbox" htmlFor={id}  />
        </div>
        )
    }
}

class OperatorSection extends React.Component{
    constructor(){
        super()
        this.fetchDataSetState=this.fetchDataSetState.bind(this)
        this.testStart=this.testStart.bind(this)
        this.clearStart=this.clearStart.bind(this)
        this.marbleCheckChange=this.marbleCheckChange.bind(this)
        this.resultCheckChange=this.resultCheckChange.bind(this)
        this.showRxjsInResult=this.showRxjsInResult.bind(this)
        this.showRxjsInMarble=this.showRxjsInMarble.bind(this)
        this.refreshMarble=this.refreshMarble.bind(this)
        this.refreshResult=this.refreshResult.bind(this)
        this.prevCodeArr=[]
        this.unSubMarble={}
        this.unSubResult={}
        this.newMarbleArr=[]
        this.state={
            showMarble:true,
            showResult:true,
            marbleText:'',
            marbleLine:0,
            isFetching:true,
            resultValue:'',
            marbleArr:[]
        }
    }
    fetchDataSetState(operatorName){
        fetchData(operatorName).then(data=>{
            const {title,name,caption,code,line,marbleText,func}=data;
            const codeObj=code2Arr(code),
                codeStr=codeObj.str,
                curLen=codeObj.arr.length,
                preLen=this.prevCodeArr.length,
                    minus=unique(codeObj.arr.concat(this.prevCodeArr)).slice(curLen),
                    plus=unique(this.prevCodeArr.concat(codeObj.arr)).slice(preLen);
            this.prevCodeArr=codeObj.arr
            this.setState({
                isFetching:false,
                title,
                name,
                caption,
                code:codeStr,
                minus,
                plus,
                line,
                marbleText,
                func
            })
        })
    }

    componentDidMount(){
        const operatorName=this.props.match.params.section;
        this.fetchDataSetState(operatorName)
    }
    componentWillReceiveProps(nextProps){
        const curOperatorName=this.props.match.params.section,
            nextOperatorName=nextProps.match.params.section;
        if(curOperatorName!==nextOperatorName){
            this.setState({isFetching:true})
            this.fetchDataSetState(nextOperatorName)
        }
    }
    refreshResult(){
        this.setState({
            resultValue:''
        })
    }


    refreshMarble(){
        this.newMarbleArr=[];
        this.setState({marbleArr:this.newMarbleArr})
    }
    resultCheckChange(){

        this.setState(prevState=>({
            showResult:!prevState.showResult
        }))
        this.refreshResult()
    }
    marbleCheckChange(){

        this.setState(prevState=>({
            showMarble:!prevState.showMarble
        }))
        this.refreshMarble()
    }
    testStart(e){
        e.stopPropagation()
        clearFunc(this.unSubMarble)
        clearFunc(this.unSubResult)
        this.timeStamp=new Date().getTime()
     this.state.func.call(this,this.showRxjsInResult,this.showRxjsInMarble)
        this.refreshMarble()
        this.refreshResult()
    }


    clearStart(e){
        e.stopPropagation()
        clearFunc(this.unSubMarble)
        clearFunc(this.unSubResult)
        this.refreshMarble()
        this.refreshResult()
    }
    showRxjsInMarble(v,whichLine){
        const {line}=this.state
        let marbleBallObj={line,whichLine,v,timeStamp:this.timeStamp};
        this.newMarbleArr=this.newMarbleArr.concat(marbleBallObj)
        this.setState({marbleArr:this.newMarbleArr})
    }
    showRxjsInResult(v){
        this.setState(prevState=>({
            resultValue:prevState.resultValue+v+"<br>"
        }))
    }

    render(){
        const {title,caption,code,minus,plus,resultValue}=this.state

        return(
            <React.Fragment>
            {this.state.showMarble?
                <Marble
                    unSubMarble={this.unSubMarble}
                    unSubStatus={checkIsUnSub(this.unSubMarble)}
                    marbleArr={this.state.marbleArr}
                    line={this.state.line}
                    marbleText={this.state.marbleText} />
                :null}

        <section className="section clearfix">

                <CustomCheckBox
                    text={"Marble界面"}
                    checkBoxChange={this.marbleCheckChange}
                    checkBoxStatus={this.state.showMarble}
                    id={"slide-checkbox1"} />
                <CustomCheckBox
                    text={"Result界面"}
                    checkBoxChange={this.resultCheckChange}
                    checkBoxStatus={this.state.showResult}
                    id={"slide-checkbox2"} />

                {this.state.isFetching
                    ?
                    <p>Loading...</p>
                    :
                   <SectionContent title={title}
                                   plus={plus}
                                   minus={minus}
                                   code={code}
                                   caption={caption} />
                }
                < div className="clearfix">
                    <button className="testRxjs" onClick={this.testStart} >开始(subscribe)</button>
                    <button className="clearRxjs" onClick={this.clearStart}>清除(unsubscribe)</button>
                </div>
            </section>
                {this.state.showResult?
                    <Result
                        unSubResult={this.unSubResult}
                        unSubStatus={checkIsUnSub(this.unSubResult)}
                        value={resultValue}/>:null}
            </React.Fragment>


        )
    }
}



class App extends React.Component{
    constructor(){
        super()

    }
    render(){

        return(
            <React.Fragment>
                <CreateNav type="webNav" orient="horizontal" showChild={true} />
                <Route exact={true} path="/" component={Overview} />
                <Route path='/:section+' component={OperatorSection}/>
            </React.Fragment>
        )
    }
}



ReactDOM.render(
    <Router >
        <App />
    </Router>,
    document.getElementById('root')
)