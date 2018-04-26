import React from 'react';
import {calcCodeStrArrPlusMinus} from '../tools'
import {ReuseButton} from '../Widget'
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript'
import {EDITRULES} from '../mock-data'

export default class Code extends React.PureComponent{
    constructor(props){
        super(props)
        this.toEditing=this.toEditing.bind(this)
        this.toSaved=this.toSaved.bind(this)
        this.toCancel=this.toCancel.bind(this)
        this.inputtingCode=this.inputtingCode.bind(this)
        this.state={
            code:props.code,
            editing:false
        }
    }

    toEditing(){
        this.setState({
            code:this.props.code,
            editing:true
        })
    }
    toSaved(){
        this.props.editingCodeToSave(this.state.code)
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
    render(){
        //console.log('Code')
        const {editing,code}=this.state
        const {codeStr,}=this.props
        const options = {
            lineNumbers: true,
            mode:'javascript',
            lineWrapping:true
        };
        const optEditRules={
            mode:'javascript',
            readOnly:true,
            lineWrapping:true,
            gutters:['edit-gutter']
        }
        console.log(CodeMirror.setSize)
        return(
            editing
                ?
                <div className="code-wrap">
                    <p>
                        <ReuseButton className={"code-change-button code-save"} handleClick={this.toSaved} text={"SAVE"} />
                        <ReuseButton className={"code-change-button"} handleClick={this.toCancel} text={"CANCEL"} />
                    </p>
                    <CodeMirror value={EDITRULES}  options={optEditRules} className="edit-caption"/>
                    <CodeMirror value={code}   onChange={this.inputtingCode} options={options}/>
                </div>
                :
                <div className="code-wrap">
                    <p><ReuseButton className={"code-change-button code-edit"} handleClick={this.toEditing} text={"EDIT"} /></p>
                    <pre>{codeStr}</pre>
                </div>
        )
    }
}
