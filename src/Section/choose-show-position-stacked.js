import React from 'react';
import {SquareCheckBox} from '../Widget'


export default class ChooseShowPositionStacked extends React.Component{
    constructor(){
        super()
        this.chooseObservable=this.chooseObservable.bind(this)
        this._setMarbleLine=this._setMarbleLine.bind(this)
        this.state={
            choosenIndex:'0'
        }
    }

    _setMarbleLine(e){
        this.props.setMarbleLine(this.state.choosenIndex,e.target.value)
    }
    chooseObservable(e){
        this.setState({
            choosenIndex:e.target.value
        })
    }

    render(){
        console.log('ChooseShowPositionStacked')
        const {showInWhereArr,setShowInMarble,cancelBubble,setShowInResult}=this.props
        const curID=this.state.choosenIndex;
        const curData=showInWhereArr[curID];
        return(
            <React.Fragment>
                <thead>
                <tr>
                    <th>位置选择(堆叠模式)</th>
                        <th>
                            <select style={{width:'100%',height:'2rem'}}
                                    value={curID}
                                    onClick={cancelBubble}
                                    onChange={this.chooseObservable}>
                                {showInWhereArr.map((s,i)=>(
                                    <option key={i} value={i} >{s.name}</option>
                                ))}
                            </select>
                        </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>InMarble</td>
                    <td>
                        <span>是否显示：</span>
                        <SquareCheckBox id={'marCheckBox'+curID}
                                        eventParas={curID}
                                        isChecked={curData.showInMar}
                                        setShowInMarble={setShowInMarble} />
                        &nbsp;
                        <span>显示在哪一行：</span>
                        <select onClick={cancelBubble}
                                onChange={this._setMarbleLine}
                                value={curData.line==='last' ? showInWhereArr.length : +curData.line} >
                            {showInWhereArr.map((_e,_i)=>(
                                <option key={_i} value={_i+1}>{_i+1}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>InResult</td>
                    <td>
                        <span>是否显示：</span>
                        <SquareCheckBox id={'resCheckBox'+curID}
                                        isChecked={curData.showInRes}
                                        eventParas={curID}
                                        setShowInMarble={setShowInResult} />
                    </td>
                </tr>
                </tbody>
            </React.Fragment>
        )
    }
}
