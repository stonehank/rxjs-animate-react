import React from 'react';
import { DragSource } from 'react-dnd';


class MarbleBallComponentUseDNDNewAdd extends React.PureComponent{

    render(){
        //console.log('marbleBallComponent')
        const {left,text,top,background,color,connectDragSource,closePop,showPop,cancelBubble,isDragging}=this.props
        const curStyle=isDragging ? {left,top,background,color,opacity:0.7} :{left,top,background,color}
        return connectDragSource(
            <div className={text==="com"?"complete-ball":text==="err"?"error-ball":"colorBall"}
                 onMouseOut={closePop}
                 onMouseOver={showPop}
                 onMouseDown={closePop}
                 onClick={cancelBubble}
                 style={curStyle}>{text==='com' ? '' : text==="err" ? "×" : text}</div>
        )
    }
}

const type='marbleBall'
const spec={
    beginDrag:()=>{
        return {}
    },
    endDrag:(props,monitor)=>{
        const result=monitor.getDropResult()
        const movedX=result?result.x:0;
        props.setDropLeft(movedX)
        props.setIsDragged(true)
    }
}

const collect=(connect,monitor)=>{
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
export default DragSource(type, spec, collect)(MarbleBallComponentUseDNDNewAdd);