import React from 'react';
import {SlideCheckBox,ReuseButton} from '../Widget'
import SectionContent from './section-content'
import {deepEqual} from '../tools'



export default class SectionWrap extends React.Component{

    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
    }
    render(){
        //console.log('SectionWrap')
        const {isFetching,basicData,code,showStartButton,testStop,showInWhereArr,setShowInWhereArr,setMarbleLine,editingCodeToSave,
            showResult,showMarble,testStart,clearStart,marbleCheckChange,resultCheckChange}=this.props
        return(
            <section className="section clearfix">
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
                {isFetching
                    ?
                    <p>Loading...</p>
                    :
                    <SectionContent
                        setShowInWhereArr={setShowInWhereArr}
                        showInWhereArr={showInWhereArr}
                        setMarbleLine={setMarbleLine}
                        editingCodeToSave={editingCodeToSave}
                        code={code}
                        basicData={basicData}/>
                }
                <React.Fragment>
                    {showStartButton
                        ?
                        <ReuseButton className={"testStartRxjs"} handleClick={testStart} text={"开始(subscribe)"} />
                        :
                        <ReuseButton className={"testStopRxjs"} handleClick={testStop} text={"停止(unsubscribe)"} />
                    }
                    <ReuseButton className={"clearRxjs"} handleClick={clearStart} text={"清除(unsubscribe&clear)"} />
                </React.Fragment>
            </section>
        )
    }
}
