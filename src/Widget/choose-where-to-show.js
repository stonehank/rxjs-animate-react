import React from 'react';



export default class ChooseWhereToShow extends React.Component{
    constructor(){
        super()
        this.setShowInMarble=this.setShowInMarble.bind(this)
        this.setShowInResult=this.setShowInResult.bind(this)
        this.setMarbleLine=this.setMarbleLine.bind(this)
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
    render(){
        //console.log('ChooseWhereToShow')
        const {showInWhereArr}=this.props
        //console.log(showInWhereArr)
        return(
            <table className="choose-where-to-show">
                <thead>
                    <tr>
                        <th>显示位置选择</th>
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
                                <input type="checkbox" checked={e.showInMar} onChange={this.setShowInMarble.bind(this,i)} />
                                <span>line:</span>
                                <select value={e.line==='last'?showInWhereArr.length:+e.line} onChange={this.setMarbleLine.bind(this,i)}>
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
                                <input type="checkbox" defaultChecked={e.showInRes} onChange={this.setShowInResult.bind(this,i)}/>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        )
    }
}
