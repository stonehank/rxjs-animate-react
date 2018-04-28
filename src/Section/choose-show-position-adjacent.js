import React from 'react';
import {SquareCheckBox} from '../Widget'


export default class ChooseShowPositionAdjacent extends React.Component{
    constructor(){
        super()
        this._setMarbleLine=this._setMarbleLine.bind(this)
    }
    _setMarbleLine(i,e){
        this.props.setMarbleLine(i,e.target.value)
    }

    render(){
        //console.log('ChooseShowPositionAdjacent')
        const {showInWhereArr,setShowInMarble,cancelBubble,setShowInResult}=this.props
        return(
            <React.Fragment>
                <thead>
                <tr>
                    <th>位置选择</th>
                    {showInWhereArr.map((s,i)=>(
                            <th key={i}>{s.name}</th>
                        ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>InMarble</td>
                    {showInWhereArr.map((e,i)=>(
                            <td key={i}>
                                <SquareCheckBox id={'marCheckBox'+i}
                                                eventParas={i}
                                                isChecked={e.showInMar}
                                                setShowInMarble={setShowInMarble} />
                                &nbsp;
                                <select onClick={cancelBubble}
                                        onChange={this._setMarbleLine.bind(this,i)}
                                        value={e.line==='last' ? showInWhereArr.length : +e.line} >
                                    {showInWhereArr.map((_e,_i)=>(
                                        <option key={_i} value={_i+1}>{_i+1}</option>
                                    ))}
                                </select>
                            </td>
                        ))}
                </tr>
                <tr>
                    <td>InResult</td>
                    {showInWhereArr.map((e,i)=>(
                            <td key={i}>
                                <SquareCheckBox id={'resCheckBox'+i}
                                                isChecked={e.showInRes}
                                                eventParas={i}
                                                setShowInMarble={setShowInResult} />
                            </td>
                        ))}
                </tr>
                </tbody>
            </React.Fragment>
        )
    }
}
