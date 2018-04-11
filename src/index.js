import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import CreateNav from './Nav/createnav'
import {BrowserRouter as Router,Route}  from 'react-router-dom'
import {fetchData,clearFunc,checkIsUnSub,calcColorBallNewPosition,calcCodeStrArrPlusMinus} from './tools'
import SectionWrap from './Section/sectionwrap'
import {Marble,Result} from './Widget'
import Overview from './Section/overview'

class OperatorSectionContainer extends React.Component{
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
            marbleText:'', func:null, line:0,
            isFetching:true,
            resultValue:'',
            marbleArr:[]
        }
    }

    fetchDataSetState(operatorName){
        fetchData(operatorName).then(data=>{
            const {title,name,caption,code,line,marbleText,func}=data;
            const codeObj=calcCodeStrArrPlusMinus(code,this.prevCodeArr),
                codeStr=codeObj.str,
                minus=codeObj.minus,
                plus=codeObj.plus;
            this.prevCodeArr=codeObj.arr;
            this.clearStart()
            this.setState({
                isFetching:false,
                code:codeStr,
                title, name, caption, minus, plus,
                line, marbleText, func
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
    /**
     * 清空result界面
     */
    refreshResult(){
        this.setState({
            resultValue:''
        })
    }
    /**
     * 清空marble界面
     */
    refreshMarble(){
        this.newMarbleArr=[];
        this.setState({marbleArr:this.newMarbleArr})
    }
    /**
     * result checkbox事件
     */
    resultCheckChange(){
        this.setState(prevState=>({
            showResult:!prevState.showResult
        }))
    }
    /**
     * marble checkbox事件
     */
    marbleCheckChange(){
        this.setState(prevState=>({
            showMarble:!prevState.showMarble
        }))
        //this.refreshMarble()
    }
    /**
     * 开始按钮方法
     * 清楚unsubscribe-》执行函数-》清空页面（放在最后可以刷新状态）
     * @param e
     */
    testStart(e){
        if(e)e.stopPropagation();
        clearFunc(this.unSubMarble);
        clearFunc(this.unSubResult);
        this.timeStamp=new Date().getTime()
        this.state.func.call(this,this.showRxjsInResult,this.showRxjsInMarble)
        this.refreshMarble()
        this.refreshResult()
    }
    /**
     * 清楚按钮
     * unsubscribe-》清空界面
     * @param e
     */
    clearStart(e){
        if(e)e.stopPropagation();
        clearFunc(this.unSubMarble);
        clearFunc(this.unSubResult);
        this.refreshMarble()
        this.refreshResult()
    }
    /**
     * subscribe in marble方法
     * @param v
     * @param whichLine
     */
    showRxjsInMarble(v,whichLine){
        const {line}=this.state;
        let curTimeStamp=new Date().getTime();
        let timeGap=curTimeStamp-this.timeStamp
        let marbleBallObj=calcColorBallNewPosition(line,whichLine,v,timeGap);
        this.newMarbleArr=this.newMarbleArr.concat(marbleBallObj);
        this.setState({marbleArr:this.newMarbleArr})
    }
    /**
     * subscribe in result方法
     * @param v
     */
    showRxjsInResult(v){
        this.setState(prevState=>({
            resultValue:prevState.resultValue+v+"<br>"
        }))
    }
    render(){
        const {isFetching,title,caption,code,minus,plus,
            resultValue,showMarble,showResult,marbleArr,marbleText}=this.state
        return(
            <React.Fragment>
            {this.state.showMarble?
                <Marble
                    unSubMarble={this.unSubMarble}
                    marbleArr={marbleArr}
                    line={this.state.line}
                    marbleText={marbleText} />
                :null}
                <SectionWrap
                    isFetching={isFetching}
                    title={title} caption={caption} code={code} minus={minus} plus={plus}
                    resultCheckChange={this.resultCheckChange}
                    marbleCheckChange={this.marbleCheckChange}
                    showMarble={showMarble}
                    showResult={showResult}
                    clearStart={this.clearStart}
                    testStart={this.testStart} />
                {this.state.showResult?
                    <Result
                        unSubResult={this.unSubResult}
                        value={resultValue}/>:null}
            </React.Fragment>


        )
    }
}


class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CreateNav type="webNav" orient="horizontal" showChild={true} />
                <Route exact={true} path="/" component={Overview} />
                <Route path='/:section+' component={OperatorSectionContainer}/>
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