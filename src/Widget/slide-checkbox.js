import React from 'react';



export default class SlideCheckBox extends React.PureComponent{
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
        const {text,id,checkBoxStatus,size}=this.props
        let sizeVU,sizeValue,sizeUnit,slideW,slideH;
        if(size){
            sizeVU=size.match(/'?"?`?(\d+\.?\d*)(px|rem|em|vh|vw|[a-z]*)/)||[]
            sizeValue=sizeVU[1];
            sizeUnit=sizeVU[2]||"";
            slideW=sizeValue+sizeUnit;
            slideH=sizeValue*0.4+sizeUnit
        }
        return (
            <div>
                <span className="slide-checkbox-caption" style={{lineHeight:sizeValue?slideH:null}}>
                    {checkBoxStatus?`${text}已经开启`:`${text}已经关闭`}:
                </span>
                    <input className='inputCheckBox' id={id}  type="checkbox" checked={checkBoxStatus?true:false}
                           onClick={this.cancelBubble} onChange={this.checkBoxChange}/>
                    <label className="slide-checkbox"
                           style={sizeValue?{width:slideW,height:slideH}:null}
                           htmlFor={id}  onClick={this.cancelBubble}/>
            </div>
        )
    }
}

