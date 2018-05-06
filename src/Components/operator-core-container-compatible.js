import React from 'react';
import {deepEqual,shallowEqual,deepSet,clearFunc,calcColorBallNewPosition,checkDidAllunSub,_fetchData,getSubPositionFromCode,delSubscribe,addSubscribe,changeLine} from '../tools'
import SectionWrapCompatible from '../Section/section-wrap-compatible'
import {PopText} from '../Widget'
import MarbleCompatible from '../Marble'
import Result from '../Result'
import Rx from 'rxjs/Rx'

export default class OperatorsCoreContainerCompatible extends React.Component{
    constructor(props){
        super(props)
        this.setOrUpdateData=this.setOrUpdateData.bind(this)
        this.fetchDataSetState=this.fetchDataSetState.bind(this)
        this.testStart=this.testStart.bind(this)
        this.clearStart=this.clearStart.bind(this)
        this.testStop=this.testStop.bind(this)
        this.allUnsubscribe=this.allUnsubscribe.bind(this)
        this.marbleCheckChange=this.marbleCheckChange.bind(this)
        this.resultCheckChange=this.resultCheckChange.bind(this)
        this.showRxjsInResult=this.showRxjsInResult.bind(this)
        this.showRxjsInMarble=this.showRxjsInMarble.bind(this)
        this.refreshResultMarble=this.refreshResultMarble.bind(this)
        this.refreshStartStopButton=this.refreshStartStopButton.bind(this)
        this.setShowInWhereArr=this.setShowInWhereArr.bind(this)
        this.setMarbleLine=this.setMarbleLine.bind(this)
        this.editingCodeToSave=this.editingCodeToSave.bind(this)
        this.NEC=this.NEC.bind(this)

        /*
        此处 this.unSubMarble ; this.unSubResult
        内部是Subscriber对象
        immutable对Subscriber不会用，总是不能在shouldComponentUpdate正确判断是否更新
        所以这里使用了this 而没有放在state里面
        */
        this.unSubMarble={}
        this.unSubResult={}
        this.newMarbleArr=[]
        this.state={
            codeRunError:false,
            codErrorInfo:'',
            showMarble:!props.smallScreen,
            showResult:true,
            marbleText:'', line:0,
            isFetching:true,
            resultValue:false,
            marbleArr:false,
            showStartButton:true,
            curOperatorName:'',
            fetchDataSetState:this.fetchDataSetState,
            smallScreenRO:props.smallScreen
        }
    }

    componentWillUnmount(){
        this.fetch$.unsubscribe()
        clearTimeout(this.codeErrorTimer)
    }

    /**
     * 使用fromJS消耗很高，暂时用深比较
     * 如果用redux可以用redux-immutable
     */
    shouldComponentUpdate(nextProps,nextState){
        // console.log(nextProps,nextState)
        // console.time(1)
        // nextProps.smallScreen?
        //     !shallowEqual(this.props,nextProps) || !shallowEqual(this.state,nextState):
        //     !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
        // console.timeEnd(1)
        // console.log(nextProps.smallScreen)

        return nextProps.smallScreen ?
         !shallowEqual(this.props,nextProps) || !shallowEqual(this.state,nextState) :
         !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
        //return !is(fromJS(this.props),fromJS(nextProps))
        //     || !is(fromJS(this.state),fromJS(nextState))

    }

    /**
     * 新API 可以代替以下componentDidMount 和 componentWillReceiveProps
     * @param nextProps
     * @param prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps,prevState){
        const curOperatorName=prevState.curOperatorName,
            nextOperatorName=nextProps.operatorName;
            // nextOperatorName=nextProps.match.params.section;
        if(curOperatorName!==nextOperatorName){
            prevState.fetchDataSetState(nextOperatorName)
            return {
                isFetching:true,
                showStartButton:true,
                curOperatorName:nextOperatorName
            }
        }
        if(nextProps.smallScreen!==prevState.smallScreen){
            return {
                showMarble:!nextProps.smallScreen,
                smallScreen:nextProps.smallScreen
            }
        }

        return null;
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

    setOrUpdateData(data,isUpdateCode,needAutoSubscribe){
        if(isUpdateCode){
            const code=data;
            this.unSubMarble={}
            this.unSubResult={}
            const getNewDataFromCode=getSubPositionFromCode(code,needAutoSubscribe);
            const showInWhereArr=getNewDataFromCode.showInWhereArr;
            const newCode=getNewDataFromCode.newCode;
            const line=showInWhereArr.length;
            this.setState({
                showInWhereArr,
                code:newCode,
                isFetching:false,
                line
            })
        }else{
            const {title,name,caption,code,marbleText}=data;
            this.clearStart()
            this.unSubMarble={}
            this.unSubResult={}
            this.doNotNeedAuto=data.doNotNeedAuto;
            const getNewDataFromCode=getSubPositionFromCode(code);
            const showInWhereArr=getNewDataFromCode.showInWhereArr;
            const newCode=getNewDataFromCode.newCode;
            const line=showInWhereArr.length;
            this.setState({
                showInWhereArr,
                code:newCode,
                isFetching:false,
                basicData:{ title, name, caption},
                line, marbleText
            })
        }
    }

    fetchDataSetState(operatorName){
        this.fetch$=Rx.Observable.fromPromise(_fetchData(operatorName))
            .subscribe(data=>this.setOrUpdateData(data))
    }

    setShowInWhereArr(i,key){
        const {showInWhereArr,code} = this.state
        const currentShowStatus=showInWhereArr[i][key]
        //console.time(1)
        let newShowInWhereArr=deepSet(showInWhereArr,[i,key],!currentShowStatus);
        //console.timeEnd(1)
        const needChange=showInWhereArr[i]
        let newCode=currentShowStatus ?
            delSubscribe(code,needChange.name,key) :
            addSubscribe(code,needChange.name,needChange.line,key)
        this.setState({
            showInWhereArr:newShowInWhereArr,
            code:newCode
        })
    }

    setMarbleLine(i,newLine){
        const {showInWhereArr,code}=this.state
        //console.time(1)
        let newShowInWhereArr=deepSet(showInWhereArr,[i,'line'],newLine)
        const needChange=showInWhereArr[i]
        let newCode=changeLine(code,needChange.name,newLine)
        //console.timeEnd(1)
        this.setState({
            showInWhereArr:newShowInWhereArr,
            code:newCode
        })
    }

    editingCodeToSave(value,needAutoSubscribe){
        this.setState({isFetching:true})
        this.setOrUpdateData(value,true,needAutoSubscribe)
    }

    /**
     * 开始按钮方法
     * 清楚unsubscribe-》执行函数-》清空页面（放在最后可以刷新状态）
     * @param e
     */
    testStart(){
        const {smallScreen}=this.props
        const {code}=this.state

        if(code==="无数据"){alert('数据获取失败！请选择正确的操作符');return;}
        this.timeStamp=new Date().getTime()
        this.allUnsubscribe()
        this.refreshResultMarble('retain')

        if(smallScreen){
            this.setState({
                showMarble:true
            })
        }

        //为了避免执行of操作符（立刻出现数据）， result的value出现又被以下清空，放到执行上面
        this.setState(prevState=>({
            showStartButton:checkDidAllunSub(this.unSubMarble,this.unSubResult),
        }))

        /**
         * 执行code内部函数
         * 开始按钮事件错误处理
         */
        try {
            Function(['NEC','resSub','marSub','showInRes','showInMar'],code)
                .apply(this,[this.NEC,this.unSubResult,this.unSubMarble,this.showRxjsInResult,this.showRxjsInMarble])
        } catch (error) {
            clearTimeout(this.codeErrorTimer)
            this.clearStart();
            this.setState({
                codErrorInfo:error.name+' : '+error.message,
                codeRunError:true
            });
            this.codeErrorTimer=setTimeout(()=>{
                this.setState({
                    codErrorInfo:'',
                    codeRunError:false
                })
            },5000)
        }
        //TODO:需要修正 传入不同的prop强制刷新result
        this.resultRefreshTimeStamp=new Date().getTime()
    }

    /**
     * Subscription订阅参数
     * N:next:()=>{}
     * E:error:()=>{}
     * C:complete:()=>{}
     */
    NEC(showInWhere, whichLine){
        return {
            next: (v)=> {showInWhere(v, whichLine)},
            error: ()=> {showInWhere('error', whichLine)},
            complete: ()=> {showInWhere('complete', whichLine)}
        }
    }

    testStop(){
        this.allUnsubscribe()
        this.refreshStartStopButton()
        //TODO:需要修正 强制刷新marble,result
        this.marbleRefreshTimeStamp=new Date().getTime()
        this.resultRefreshTimeStamp=new Date().getTime()
    }

    /**
     * 清除按钮
     * unsubscribe-》清空界面
     */
    clearStart(){
        this.allUnsubscribe()
        this.refreshResultMarble('clear')
        if(this.props.smallScreen){
            this.setState({
                showMarble:false
            })
        }
    }

    /**
     * 清空result界面 &  清空marble界面
     * 清空小球小球arr
     */
    refreshResultMarble(status){
        this.newMarbleArr=[];
        let _marbleArr,_resultValue
        switch(status){
            case 'clear':
                _marbleArr=false;
                _resultValue=false;
                break;
            case 'retain':
                _marbleArr=this.newMarbleArr;
                _resultValue='';
                break;
            default:
                throw new Error('参数status错误 应该为clear或者retain')
        }

        this.setState({
            marbleArr:_marbleArr,
            resultValue:_resultValue
        })
    }

    /**
     * 根据当前subscription状态调整'开始按钮'状态
     */
    refreshStartStopButton(){
        this.setState({
            showStartButton:checkDidAllunSub(this.unSubMarble,this.unSubResult)
        })
    }

    /**
     * 全部unsubscribe，但不更新页面
     */
    allUnsubscribe(){
        clearFunc(this.unSubMarble);
        clearFunc(this.unSubResult);
    }

    /**
     * subscribe in marble方法
     * @param v
     * @param whichLine
     */
    showRxjsInMarble(v,whichLine){
        const {line}=this.state;
        const {smallScreen}=this.props
        let curTimeStamp=new Date().getTime();
        let timeGap=curTimeStamp-this.timeStamp
        let marbleBallObj=calcColorBallNewPosition(line,whichLine,v,timeGap,smallScreen);
        this.newMarbleArr=this.newMarbleArr.concat(marbleBallObj);
        this.setState({marbleArr:this.newMarbleArr})
    }
    /**
     * subscribe in result方法
     * @param v
     */
    showRxjsInResult(v){
        this.setState(prevState=>({
            resultValue:`${prevState.resultValue || ''}value:${v}&nbsp;&nbsp;stringify:${JSON.stringify(v)}<br>`
        }))
    }
    render(){
        //console.log('OperatorsCoreContainer')
        const {smallScreen,isPhone}=this.props
        const {isFetching,basicData,showMarble,showResult,showStartButton,showInWhereArr,code,
            marbleArr,line,marbleText,resultValue,codeRunError,codErrorInfo}=this.state
        return(

                        <React.Fragment>
                            {codeRunError ?
                                    <PopText data={'Something error in code!<br>'+codErrorInfo} className="code-run-error" /> : null}
                            <SectionWrapCompatible
                                isFetching={isFetching}
                                smallScreen={smallScreen}
                                basicData={basicData}
                                code={code}
                                showInWhereArr={showInWhereArr}
                                setShowInWhereArr={this.setShowInWhereArr}
                                setMarbleLine={this.setMarbleLine}
                                operatorDoNotNeedAuto={this.doNotNeedAuto}
                                editingCodeToSave={this.editingCodeToSave}
                                resultCheckChange={this.resultCheckChange}
                                marbleCheckChange={this.marbleCheckChange}
                                showMarble={showMarble}
                                showResult={showResult}
                                showStartButton={showStartButton}
                                testStop={this.testStop}
                                clearStart={this.clearStart}
                                testStart={this.testStart} />
                            <div className={smallScreen ? "show-wrap-wap" : "show-wrap"}>
                                {showMarble ?
                                    <MarbleCompatible timeStamp={this.marbleRefreshTimeStamp}
                                                      refreshStartStopButton={this.refreshStartStopButton}
                                                      unSubMarble={this.unSubMarble}
                                                      marbleArr={marbleArr}
                                                      line={line}
                                                      marbleText={marbleText} /> :
                                    null}
                                {showResult && !smallScreen ?
                                    <Result resultRefreshTimeStamp={this.resultRefreshTimeStamp}
                                            refreshStartStopButton={this.refreshStartStopButton}
                                            unSubResult={this.unSubResult}
                                            value={resultValue}/> :
                                    null}
                            </div>
                        </React.Fragment>

        )
    }
}

