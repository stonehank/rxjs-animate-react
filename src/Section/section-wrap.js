import React from 'react';
import {SlideCheckBox,ReuseButton} from '../Widget'
import SectionContent from './section-content'
import {fromJS,is} from 'immutable';


export default class SectionWrap extends React.Component{

    shouldComponentUpdate(nextProps){
        //console.log((nextProps),(this.props))
        return !is(fromJS(nextProps),fromJS(this.props))
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
                <div className="clearfix">
                    {showStartButton
                        ?
                        <ReuseButton className={"testStartRxjs"} handleClick={testStart} text={"开始(subscribe)"} />
                        :
                        <ReuseButton className={"testStopRxjs"} handleClick={testStop} text={"停止(unsubscribe)"} />
                    }
                    <ReuseButton className={"clearRxjs"} handleClick={clearStart} text={"清除(unsubscribe&clear)"} />
                </div>
            </section>
        )
    }
}
