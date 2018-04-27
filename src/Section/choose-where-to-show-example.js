import React from 'react'
import {SquareCheckBox} from '../Widget'

export default class ChooseWhereToShowExample extends React.Component{

    shouldComponentUpdate(){
        return false;
    }

    render(){
        //console.log(ChooseWhereToShowExample)
        return(
            <p className="choose-where-to-show-example">
                <span>样式说明：</span>
                <SquareCheckBox id={'example-show'} isChecked={true} readOnly={true}/>
                <span>已选择显示</span>
                <SquareCheckBox id={'example-hide'} isChecked={false} readOnly={true}/>
                <span>未选择不显示</span>
                <select readOnly="true" value="2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <span>选择发射源在第2行出现</span>
            </p>
        )
    }
}