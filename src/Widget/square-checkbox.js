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
        const {id,isChecked,setShowInMarble,eventParas,readOnly}=this.props
        return (
            <React.Fragment>
                <input className="inputCheckBox"
                       id={id}
                       type="checkbox"
                       checked={isChecked}
                       readOnly={readOnly}
                       onClick={this.cancelBubble}
                       onChange={setShowInMarble?setShowInMarble.bind(this,eventParas):null} />
                <label htmlFor={id} className="square-checkbox" onClick={this.cancelBubble}/>
            </React.Fragment>
        )
    }
}