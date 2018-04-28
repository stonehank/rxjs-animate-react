import React from 'react';

export default class SquareCheckBox extends React.PureComponent{
    constructor(){
        super()
        this.cancelBubble=this.cancelBubble.bind(this)
    }
    cancelBubble(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
    }

    render(){
        //console.log('SquareCheckBox')
        const {id,isChecked,setShowInMarble,eventParas,readOnly,size}=this.props
        let sizeVU,sizeValue,sizeUnit,slideW,slideH;
        if(size){
            sizeVU=size.match(/'?"?`?(\d+\.?\d*)(px|rem|em|vh|vw|[a-z]*)/)||[]
            sizeValue=sizeVU[1];
            sizeUnit=sizeVU[2]||"";
            slideW=sizeValue+sizeUnit;
            slideH=slideW;
        }
        return (
            <React.Fragment>
                <input className="inputCheckBox"
                       id={id}
                       type="checkbox"
                       checked={isChecked}
                       readOnly={readOnly}
                       onClick={this.cancelBubble}
                       onChange={setShowInMarble?setShowInMarble.bind(this,eventParas):null} />
                <label htmlFor={id}
                       className="square-checkbox"
                       style={sizeValue?{width:slideW,height:slideH}:null}
                       onClick={this.cancelBubble}/>
            </React.Fragment>
        )
    }
}