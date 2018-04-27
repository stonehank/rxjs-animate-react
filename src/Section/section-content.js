import React from 'react';
import {Plus,Minus,ReuseButton} from '../Widget'
import Code from './code'
import ChooseWhereToShow from './choose-where-to-show'
import ChooseWhereToShowExample from './choose-where-to-show-example'
import {calcCodeStrArrPlusMinus} from '../tools'
import {fromJS,is} from 'immutable';


export default class SectionContent extends React.Component{
    constructor(){
        super()
        this.toggleCode=this.toggleCode.bind(this)
        this.togglePlusMinus=this.togglePlusMinus.bind(this)
        this.toggleChooseWhereToShow=this.toggleChooseWhereToShow.bind(this)
        this.prevCodeArr=[]
        this.state={
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
    togglePlusMinus(e){
        //e.stopPropagation()
        //e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState=>({
            showPlusMinus:!prevState.showPlusMinus
        }))
    }
    toggleCode(e){
        this.setState(prevState=>({
            showCode:!prevState.showCode
        }))
    }
    toggleChooseWhereToShow(e){
        //e.stopPropagation()
        //e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState=>({
            showChooseWhereToShow:!prevState.showChooseWhereToShow
        }))
    }

    shouldComponentUpdate(nextProps,nextState){
        return !is(fromJS(this.props),fromJS(nextProps))
            || !is(fromJS(this.state),fromJS(nextState))
    }

    static getDerivedStateFromProps(nextProps,prevState){
        const {code}=nextProps
        if(code===prevState.code){return null}
        const codeObj=calcCodeStrArrPlusMinus(code,prevState.prevCodeArr),
            codeStr=codeObj.str,
            minus=codeObj.minus,
            plus=codeObj.plus;
        return {
            prevCodeArr:codeObj.arr,
            code,
            codeStr,
            minus,
            plus
        }
    }

    render(){
        //console.log('SectionContent')
        const {title,caption}=this.props.basicData
        const {showInWhereArr,setShowInWhereArr,setMarbleLine,editingCodeToSave}=this.props
        const {plus,minus,codeStr,code} =this.state
        return (
            <div>
                <p className="section-title">{title}</p>
                <p dangerouslySetInnerHTML={{__html: caption}}
                   className="section-caption"/>
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
                            <ChooseWhereToShowExample />
                            <ChooseWhereToShow showInWhereArr={showInWhereArr} setShowInWhereArr={setShowInWhereArr} setMarbleLine={setMarbleLine}/>
                        </React.Fragment>
                        :
                        <ReuseButton handleClick={this.toggleChooseWhereToShow} text={"打开位置选择面板"} />
                    }
                </div>

                {this.state.showCode
                    ?
                    <React.Fragment>
                        <ReuseButton handleClick={this.toggleCode} text={"隐藏源码"} />
                        <Code codeStr={codeStr} code={code} editingCodeToSave={editingCodeToSave} />
                    </React.Fragment>
                    :
                    <ReuseButton handleClick={this.toggleCode} text={"显示源码"} />
                }
            </div>
        )
    }
}