import React from 'react';
import {SlideCheckBox,ReuseButton} from '../Widget'
import SectionContentCompatible from './section-content-compatible'
import {deepEqual,shallowEqual} from '../tools'



export default class SectionWrapCompatible extends React.Component{

    shouldComponentUpdate(nextProps){
        return nextProps.smallScreen ?
            !shallowEqual(this.props,nextProps) :
            !deepEqual(this.props,nextProps)
    }
    render(){
        // console.log('SectionWrap')
        const {smallScreen,isFetching,basicData,code,showStartButton,testStop,showInWhereArr,setShowInWhereArr,setMarbleLine,editingCodeToSave,
            operatorDoNotNeedAuto,showResult,showMarble,testStart,clearStart,marbleCheckChange,resultCheckChange}=this.props
        return(
            <section className={smallScreen ? "section-sm clearfix" : "section clearfix"}>
                {!smallScreen ?
                    <React.Fragment>
                        <SlideCheckBox
                            text={"Marble界面"}
                            checkBoxChange={marbleCheckChange}
                            checkBoxStatus={showMarble}
                            id={"slide-checkbox1"} />
                        <SlideCheckBox
                            text={"Result界面"}
                            checkBoxChange={resultCheckChange}
                            checkBoxStatus={showResult}
                            id={"slide-checkbox2"} />
                    </React.Fragment> :
                    null
                }
                {isFetching
                    ?
                    <p>Loading...</p>
                    :
                    <SectionContentCompatible
                        smallScreen={smallScreen}
                        setShowInWhereArr={setShowInWhereArr}
                        showInWhereArr={showInWhereArr}
                        setMarbleLine={setMarbleLine}
                        operatorDoNotNeedAuto={operatorDoNotNeedAuto}
                        editingCodeToSave={editingCodeToSave}
                        code={code}
                        basicData={basicData}/>
                }
                <React.Fragment>
                    {showStartButton
                        ?
                        <ReuseButton className={"testStartRxjs"} handleClick={testStart} text={smallScreen ? "开始(subscribe)/展开" : "开始(subscribe)"} />
                        :
                        <ReuseButton className={"testStopRxjs"} handleClick={testStop} text={"停止(unsubscribe)"} />
                    }
                    <ReuseButton className={"clearRxjs"} handleClick={clearStart} text={smallScreen ? "清除/收起(unsubscribe&clear)" : "清除(unsubscribe&clear)"} />
                </React.Fragment>
            </section>
        )
    }
}
