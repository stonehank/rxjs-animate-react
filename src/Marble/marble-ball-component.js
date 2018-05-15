import React from 'react';


export default class MarbleBallComponent extends React.PureComponent{

    render(){
        const {left,text,top,opacity,background,color,dragStart,closePop,showPop,cancelBubble}=this.props
        return (
            <div className={text==="|"?"complete-ball":text==="×"?"error-ball":"colorBall iconfont"}
                 onClick={cancelBubble}
                 onTouchStart={dragStart}
                 onMouseDown={dragStart}
                 onMouseOut={closePop}
                 onMouseOver={showPop}
                 style={{left,top,opacity,background,color}}>{text}</div>

        )
    }
}



