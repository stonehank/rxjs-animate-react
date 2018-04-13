import React from 'react';
import {CustomCheckBox} from '../Widget'
import SectionContent from './sectioncontent'
import {checkDidAllunSub} from '../tools'

export default class SectionWrap extends React.PureComponent{
    render(){
        console.log('SectionWrap')
        const {isFetching,title,caption,code,minus,plus,showStartButton,testStop,
            showResult,showMarble,testStart,clearStart,marbleCheckChange,resultCheckChange}=this.props
        return(
            <section className="section clearfix">
                <CustomCheckBox
                    text={"Marble界面"}
                    checkBoxChange={marbleCheckChange}
                    checkBoxStatus={showMarble}
                    id={"slide-checkbox1"} />
                <CustomCheckBox
                    text={"Result界面"}
                    checkBoxChange={resultCheckChange}
                    checkBoxStatus={showResult}
                    id={"slide-checkbox2"} />
                {isFetching
                    ?
                    <p>Loading...</p>
                    :
                    <SectionContent
                        title={title} caption={caption} code={code} minus={minus} plus={plus}/>
                }
                <div className="clearfix">
                    {showStartButton
                        ?
                        <button className="testStartRxjs" onClick={testStart} >开始(subscribe)</button>
                        :
                        <button className="testStopRxjs" onClick={testStop} >停止(unsubscribe)</button>
                    }
                    <button className="clearRxjs" onClick={clearStart}>清除(unsubscribe&clear)</button>
                </div>
            </section>
        )
    }
}
