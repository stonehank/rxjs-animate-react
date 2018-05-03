import React from 'react';
import {ReuseButton,SlideCheckBox} from '../Widget'
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript'
import {EDITRULES} from '../mock-data'
import '../Css/codemirrorCus.css'

export default class Code extends React.PureComponent{
    constructor(props){
        super(props)
        this.toEditing=this.toEditing.bind(this)
        this.toSaved=this.toSaved.bind(this)
        this.toCancel=this.toCancel.bind(this)
        this.inputtingCode=this.inputtingCode.bind(this)
        this.changeNeedAutoSubscribe=this.changeNeedAutoSubscribe.bind(this)
        this.state={
            code:props.code,
            editing:false,
            needAutoSubscribe:!props.operatorDoNotNeedAuto
        }
    }

    toEditing(){
        this.setState({
            code:this.props.code,
            editing:true
        })
    }
    toSaved(){
        const {editingCodeToSave}=this.props
        const {code,needAutoSubscribe}=this.state
        editingCodeToSave(code,needAutoSubscribe)
        this.setState({
            editing:false
        })
    }
    toCancel(){
        this.setState({
            editing:false
        })
    }
    inputtingCode(newValue){
        this.setState({
            code:newValue
        })
    }
    changeNeedAutoSubscribe(){
        this.setState(prevState=>({
            needAutoSubscribe:!prevState.needAutoSubscribe
        }))
    }

    render(){
        //console.log('Code')
        const {editing,code,needAutoSubscribe}=this.state
        const {codeStr,}=this.props
        const options = {
            lineNumbers: true,
            mode:'javascript',
            lineWrapping:true,
            theme:'base16-dark'
        };
        const optEditRules={
            mode:'javascript',
            readOnly:true,
            lineWrapping:true,
            gutters:['edit-gutter'],
            theme:'base16-dark'
        }
        return(
            editing
                ?
                <div className="code-wrap">
                    <p>
                        <ReuseButton className={"code-change-button code-save"} handleClick={this.toSaved} text={"SAVE"} />
                        <ReuseButton className={"code-change-button"} handleClick={this.toCancel} text={"CANCEL"} />
                    </p>
                    <SlideCheckBox text={'自动订阅功能'} id={'needAutoSubscribe'} size={'3rem'}
                                   checkBoxStatus={needAutoSubscribe} checkBoxChange={this.changeNeedAutoSubscribe}/>
                    <CodeMirror value={EDITRULES}  options={optEditRules} className="edit-caption"/>
                    <CodeMirror value={code} onChange={this.inputtingCode} options={options}/>
                </div>
                :
                <div className="code-wrap">
                    <p><ReuseButton className={"code-change-button code-edit"} handleClick={this.toEditing} text={"EDIT"} /></p>
                    <pre>{codeStr}</pre>
                </div>
        )
    }
}
