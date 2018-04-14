import React from 'react';



export default class CustomCheckBox extends React.PureComponent{
    constructor(){
        super()
        this.cancelBubble=this.cancelBubble.bind(this)
        this.checkBoxChange=this.checkBoxChange.bind(this)
    }
    cancelBubble(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
    }
    checkBoxChange(){
        const {checkBoxChange}=this.props
        checkBoxChange()
    }
    render(){
        //console.log('CustomCheckBox')
        const {text,id,checkBoxStatus}=this.props
        return (
            <div>
                <p>{checkBoxStatus?`${text}已经开启`:`${text}已经关闭，并且unsubscribe`}:</p>
                    <input className='inputCheckBox' id={id}  type="checkbox" checked={checkBoxStatus?true:false}
                           onClick={this.cancelBubble} onChange={this.checkBoxChange}/>
                    <label className="slide-checkbox" htmlFor={id}  onClick={this.cancelBubble}/>
            </div>
        )
    }
}