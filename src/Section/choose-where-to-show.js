import React from 'react';
import {SquareCheckBox} from '../Widget'
import {fromJS,is} from 'immutable';

export default class ChooseWhereToShow extends React.Component{
    constructor(){
        super()
        this.setShowInMarble=this.setShowInMarble.bind(this)
        this.setShowInResult=this.setShowInResult.bind(this)
        this.setMarbleLine=this.setMarbleLine.bind(this)
        this.cancelBubble=this.cancelBubble.bind(this)
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
    setMarbleLine(i,e){
        this.props.setMarbleLine(i,e.target.value)
    }
    cancelBubble(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }
    render(){
        //console.log('ChooseWhereToShow')
        const {showInWhereArr}=this.props
        return(
            <table className="choose-where-to-show">
                <thead>
                    <tr>
                        <th>结果位置选择</th>
                        {showInWhereArr.map((s,i)=>(
                            <th key={i}>{s.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>showInMarble</td>
                        {showInWhereArr.map((e,i)=>(
                            <td key={i}>
                                <SquareCheckBox id={'marCheckBox'+i}
                                                eventParas={i}
                                                isChecked={e.showInMar}
                                                setShowInMarble={this.setShowInMarble} />
                                <span>line:</span>
                                <select value={e.line==='last'?showInWhereArr.length:+e.line} onClick={this.cancelBubble} onChange={this.setMarbleLine.bind(this,i)}>
                                    {showInWhereArr.map((_e,_i)=>(
                                        <option key={_i} value={_i+1}>{_i+1}</option>
                                    ))}
                                </select>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>showInResult</td>
                        {showInWhereArr.map((e,i)=>(
                            <td key={i}>
                                <SquareCheckBox id={'resCheckBox'+i}
                                                isChecked={e.showInRes}
                                                eventParas={i}
                                                setShowInMarble={this.setShowInResult} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        )
    }
}
