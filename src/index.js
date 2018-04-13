import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import CreateNav from './Nav/createnav'
import {BrowserRouter as Router,Route,NavLink,Switch}  from 'react-router-dom'
import {fetchData,clearFunc,calcColorBallNewPosition,calcCodeStrArrPlusMinus,fetchNav,checkDidAllunSub} from './tools'
import SectionWrap from './Section/sectionwrap'
import {Marble,Result,Search} from './Widget'
import Overview from './Section/overview'
//import PropTypes from 'prop-types';


class OperatorSectionContainer extends React.Component{
    constructor(){
        super()
        this.fetchDataSetState=this.fetchDataSetState.bind(this)
        this.testStart=this.testStart.bind(this)
        this.clearStart=this.clearStart.bind(this)
        this.testStop=this.testStop.bind(this)
        this.marbleCheckChange=this.marbleCheckChange.bind(this)
        this.resultCheckChange=this.resultCheckChange.bind(this)
        this.showRxjsInResult=this.showRxjsInResult.bind(this)
        this.showRxjsInMarble=this.showRxjsInMarble.bind(this)
        this.refreshResultMarble=this.refreshResultMarble.bind(this)
        this.refreshStartStopButton=this.refreshStartStopButton.bind(this)
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
            marbleArr:[],
            showStartButton:true
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

            /*用clearStart会多render1次*/
            //this.clearStart()

            /*全部unsubscribe 并且清空状态，此处不会触发更新*/
            clearFunc(this.unSubMarble);
            clearFunc(this.unSubResult);
            this.unSubMarble={}
            this.unSubResult={}

            /*清空数据界面(非状态界面) 获取新值*/
            this.newMarbleArr=[];
            this.setState({
                marbleArr:this.newMarbleArr,
                resultValue:'',
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
     * 清空result界面 &  清空marble界面
     */
    refreshResultMarble(){
        this.newMarbleArr=[];
        this.setState({
            marbleArr:this.newMarbleArr,
            resultValue:''
        })
        //强制刷新result
        this.resultRefreshTimeStamp=new Date().getTime()
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
        this.newMarbleArr=[];
        this.state.func.call(this,this.showRxjsInResult,this.showRxjsInMarble)
        this.setState({
            showStartButton:checkDidAllunSub(this.unSubMarble,this.unSubResult),
            marbleArr:this.newMarbleArr,
            resultValue:''
        })
        //强制刷新result
        this.resultRefreshTimeStamp=new Date().getTime()
        //this.refreshResultMarble()
    }

    refreshStartStopButton(){
        this.setState({
            showStartButton:checkDidAllunSub(this.unSubMarble,this.unSubResult)
        })
    }

    testStop(e){
        if(e)e.stopPropagation();
        clearFunc(this.unSubMarble);
        clearFunc(this.unSubResult);
        this.refreshStartStopButton()
        //强制刷新marble,result
        this.marbleRefreshTimeStamp=new Date().getTime()
        this.resultRefreshTimeStamp=new Date().getTime()
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
        this.refreshResultMarble()
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
        console.log('OperatorSectionContainer')
        const {isFetching,title,caption,code,minus,plus,line,
            resultValue,showMarble,showResult,marbleArr,marbleText,showStartButton}=this.state
        return(
            <React.Fragment>
                    <SectionWrap
                        isFetching={isFetching}
                        title={title} caption={caption} code={code} minus={minus} plus={plus}
                        resultCheckChange={this.resultCheckChange}
                        marbleCheckChange={this.marbleCheckChange}
                        showMarble={showMarble}
                        showResult={showResult}
                        showStartButton={showStartButton}
                        testStop={this.testStop}
                        clearStart={this.clearStart}
                        testStart={this.testStart} />
                <div>
                    {this.state.showMarble?
                        <Marble
                            timeStamp={this.marbleRefreshTimeStamp}
                            refreshStartStopButton={this.refreshStartStopButton}
                            unSubMarble={this.unSubMarble}
                            marbleArr={marbleArr}
                            line={line}
                            marbleText={marbleText} />
                        :null}
                    {this.state.showResult?
                        <Result
                            resultRefreshTimeStamp={this.resultRefreshTimeStamp}
                            refreshStartStopButton={this.refreshStartStopButton}
                            unSubResult={this.unSubResult}
                            value={resultValue}/>:null}
                </div>
            </React.Fragment>
        )
    }
}



const {Provider,Consumer}=React.createContext()


class App extends React.Component{
    constructor(){
        super()
        this.state={
            isFetchingNav:true,
            deepList:[],
            shallowList:[]
        }
    }
    componentDidMount(){
        fetchNav().then(({deepList,shallowList})=>{
            this.setState({
                deepList:deepList,
                shallowList:shallowList,
                isFetchingNav:false
            })
        })
    }

    render(){
        console.log('app')
        const {isFetchingNav,deepList,shallowList}=this.state
        const contextProps={deepList,shallowList}
        return(
            isFetchingNav
                ?
                <p>LoadingNav...</p>
                :
                <React.Fragment>
                    <div className="navMain">
                        <CreateNav type="webNav" orient="horizontal" showChild={true} deepList={deepList} shallowList={shallowList}/>
                        <Search deepList={deepList}/>
                    </div>
                    <Provider value={contextProps}>
                        <Switch>
                            <Route exact={true} path="/" component={Overview} />
                            <Route exact={true} path='/operators' component={CheckAll}/>
                            {shallowList.map((e,i)=>(
                                <Route key={i} path={`/${e.pathname}`} component={SortPage}/>
                            ))}
                            <Route path='/operators/:section+' component={OperatorSectionContainer}/>
                            <Route component={Page404} />
                        </Switch>
                    </Provider>
             </React.Fragment>
        )
    }
}

class SortPage extends React.Component{

    render(){
        return(
            <Consumer>
                {({deepList})=>{
                    const sortType=this.props.match.url
                    return <p>SortPage...{this.props.match.url}</p>
                }}
            </Consumer>

        )
    }
}

const Page404=()=>{
    return(
        <h1>404</h1>
    )
}

class CheckAll extends React.Component{
    render(){
        return(
            <p>checkall...</p>
        )
    }
}

ReactDOM.render(
    <Router >
        <App />
    </Router>,
    document.getElementById('root')
)