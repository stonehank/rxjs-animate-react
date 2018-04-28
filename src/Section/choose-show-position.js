import React from 'react';
import {fromJS,is} from 'immutable';
import  ChooseShowPositionAdjacent from './choose-show-position-adjacent'
import  ChooseShowPositionStacked from './choose-show-position-stacked'

export default class ChooseShowPosition extends React.Component{
    constructor(){
        super()
        this.setShowInMarble=this.setShowInMarble.bind(this)
        this.setShowInResult=this.setShowInResult.bind(this)
        this.setMarbleLine=this.setMarbleLine.bind(this)
        this.cancelBubble=this.cancelBubble.bind(this)
        this.chooseTableWidth=0;
    }

    shouldComponentUpdate(nextProps){

        return !is(fromJS(this.props),fromJS(nextProps))
    }

    setShowInMarble(i){
        this.props.setShowInWhereArr(i,'showInMar')
    }
    setShowInResult(i){
        this.props.setShowInWhereArr(i,'showInRes')
    }
    setMarbleLine(i,value){
        this.props.setMarbleLine(i,value)
    }
    cancelBubble(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }
    //要等到最新的render之后才能获取到width
    componentDidUpdate(){
        const {getTableWidth}=this.props
        //每次render将最新的width传出去
        getTableWidth(this.chooseTableWidth?this.chooseTableWidth:null)
    }
    render(){
        //console.log('ChooseShowPosition')
        const {showInWhereArr,tableAdjToStacked}=this.props
        return(
            <table className="choose-show-position" ref={e=>this.chooseTableWidth=e?e.offsetWidth:0}>
                {tableAdjToStacked ?
                    <ChooseShowPositionStacked showInWhereArr={showInWhereArr}
                                               setShowInMarble={this.setShowInMarble}
                                               setShowInResult={this.setShowInResult}
                                               setMarbleLine={this.setMarbleLine}
                                               cancelBubble={this.cancelBubble}/> :
                    <ChooseShowPositionAdjacent showInWhereArr={showInWhereArr}
                                                setShowInMarble={this.setShowInMarble}
                                                setShowInResult={this.setShowInResult}
                                                setMarbleLine={this.setMarbleLine}
                                                cancelBubble={this.cancelBubble}/> }
            </table>
        )
    }
}
