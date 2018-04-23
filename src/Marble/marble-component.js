import React from 'react';
import { DropTarget } from 'react-dnd';

class MarbleComponent extends React.PureComponent{
    render(){
        const {connectDropTarget}=this.props
        return connectDropTarget(
            <div id="marbleWrap" >
                {this.props.children}
            </div>
        )
    }
}

const types='marbleBall';
const spec={
    drop:(props,monitor)=>{
        return {x:monitor.getDifferenceFromInitialOffset().x}
    }
}
const collect=(connect)=>{
    return{
        connectDropTarget: connect.dropTarget()
    }
}

export default DropTarget(types, spec, collect)(MarbleComponent);