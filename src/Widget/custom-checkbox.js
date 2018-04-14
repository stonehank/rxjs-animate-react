import React from 'react';



export default class CustomCheckBox extends React.PureComponent{
    constructor(){
        super()
        this.checkBoxChange=this.checkBoxChange.bind(this)
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
                <input type="checkbox"  className='inputCheckBox' id={id} checked={checkBoxStatus?true:false}  onChange={this.checkBoxChange}/>
                <label className="slide-checkbox" htmlFor={id}  />
            </div>
        )
    }
}