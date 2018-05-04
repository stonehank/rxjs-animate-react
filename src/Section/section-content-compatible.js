import React from 'react';
import {Plus,Minus,ReuseButton} from '../Widget'
import CodeCompatible from './code-compatible'
import ChooseShowPosition from './choose-show-position'
import ChooseShowPositionExample from './choose-show-position-example'
import SectionTitleCompatible from './section-title-compatible'
import {calcCodeStrArrPlusMinus,deepEqual} from '../tools'


export default class SectionContentCompatible extends React.Component{
    constructor(){
        super()
        this.toggleCode=this.toggleCode.bind(this)
        this.togglePlusMinus=this.togglePlusMinus.bind(this)
        this.toggleChooseWhereToShow=this.toggleChooseWhereToShow.bind(this)
        this.getSectionWidth=this.getSectionWidth.bind(this)
        this.getTableWidth=this.getTableWidth.bind(this)
        this._editingCodeToSave=this._editingCodeToSave.bind(this)
        this.prevCodeArr=[]
        this.state={
            tableAdjToStacked:false,
            showCode:true,
            showPlusMinus:false,
            showChooseWhereToShow:true,
            code:'',
            codeStr:'',
            plus:[],
            minus:[],
            prevCodeArr:[]
        }
    }
    togglePlusMinus(){
        this.setState(prevState=>({
            showPlusMinus:!prevState.showPlusMinus
        }))
    }
    toggleCode(e){
        this.setState(prevState=>({
            showCode:!prevState.showCode
        }))
    }
    toggleChooseWhereToShow(){
        this.setState(prevState=>({
            showChooseWhereToShow:!prevState.showChooseWhereToShow
        }))
    }
    getTableWidth(width){
        const {tableAdjToStacked}=this.state
        //console.log(width,this.sectionContentWidth)
        if(width && this.sectionContentWidth && !tableAdjToStacked){
            if(width>this.sectionContentWidth+10){
                this.setState({
                    tableAdjToStacked:true
                })
            }
        }
    }

    _editingCodeToSave(code,needAutoSubscribe){
        const {editingCodeToSave}=this.props
        const {tableAdjToStacked}=this.state;
        editingCodeToSave(code,needAutoSubscribe)
        if(tableAdjToStacked){
            this.setState({
                tableAdjToStacked:false
            })
        }
    }

    getSectionWidth(e){
        return this.sectionContentWidth=e?e.offsetWidth:null;
    }
    shouldComponentUpdate(nextProps,nextState){
        return !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
    }

    static getDerivedStateFromProps(nextProps,prevState){
        const {code}=nextProps
        if(code===prevState.code){return null}
        const codeObj=calcCodeStrArrPlusMinus(code,prevState.prevCodeArr),
            codeStr=codeObj.str,
            minus=codeObj.minus,
            plus=codeObj.plus;
        //console.log(code,prevState.prevCodeArr,codeObj)
        return {
            prevCodeArr:codeObj.arr,
            code,
            codeStr,
            minus,
            plus
        }
    }

    render(){
        console.log('SectionContent')
        const {title,caption}=this.props.basicData
        const {showInWhereArr,setShowInWhereArr,setMarbleLine,operatorDoNotNeedAuto,smallScreen}=this.props
        const {plus,minus,codeStr,code,tableAdjToStacked} =this.state
        return (
            smallScreen ?
                <React.Fragment>
                    <SectionTitleCompatible title={title} caption={caption} smallScreen={smallScreen}/>
                    <CodeCompatible codeStr={codeStr} code={code} smallScreen={smallScreen}/>
                </React.Fragment> :
                <div ref={this.getSectionWidth}>
                    <SectionTitleCompatible title={title} caption={caption}/>
                    <div>
                        {this.state.showPlusMinus
                            ?
                            <React.Fragment>
                                <ReuseButton handleClick={this.togglePlusMinus} text={"隐藏增减行"} />
                                <Plus plus={plus}/>
                                <Minus minus={minus}/>
                            </React.Fragment>
                            :
                            <ReuseButton handleClick={this.togglePlusMinus} text={"显示增减行"} />
                        }
                    </div>
                    <div>
                        {this.state.showChooseWhereToShow
                            ?
                            <React.Fragment>
                                <ReuseButton handleClick={this.toggleChooseWhereToShow} text={"关闭位置选择面板"} />
                                <ChooseShowPositionExample />
                                <ChooseShowPosition showInWhereArr={showInWhereArr}
                                                    tableAdjToStacked={tableAdjToStacked}
                                                    setShowInWhereArr={setShowInWhereArr}
                                                    setMarbleLine={setMarbleLine}
                                                    getTableWidth={this.getTableWidth}/>
                            </React.Fragment>
                            :
                            <ReuseButton handleClick={this.toggleChooseWhereToShow} text={"打开位置选择面板"} />
                        }
                    </div>

                    {this.state.showCode
                        ?
                        <React.Fragment>
                            <ReuseButton handleClick={this.toggleCode} text={"隐藏源码"} />
                            <CodeCompatible codeStr={codeStr} code={code}
                                  editingCodeToSave={this._editingCodeToSave}
                                  operatorDoNotNeedAuto={operatorDoNotNeedAuto} />
                        </React.Fragment>
                        :
                        <ReuseButton handleClick={this.toggleCode} text={"显示源码"} />
                    }
                </div>
        )
    }
}