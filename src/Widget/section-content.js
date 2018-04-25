import React from 'react';
import {Plus,Minus,Code,ChooseWhereToShow} from '../Widget'


export default class SectionContent extends React.Component{
    constructor(){
        super()
        this.toggleCode=this.toggleCode.bind(this)
        this.togglePlusMinus=this.togglePlusMinus.bind(this)
        this.prevCodeArr=[]
        this.state={
            showCode:true,
            showPlusMinus:false
        }
    }
    togglePlusMinus(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState=>({
            showPlusMinus:!prevState.showPlusMinus
        }))
    }
    toggleCode(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState=>({
            showCode:!prevState.showCode
        }))
    }
    render(){
        //console.log('SectionContent')
        const {title,caption,plus,minus,code}=this.props.basicData
        const {showInWhereArr,setShowInWhereArr,setMarbleLine}=this.props
        return (
            <div>
                <p className="section-title">{title}</p>
                <p dangerouslySetInnerHTML={{__html: caption}}
                   className="section-caption"/>
                <div>
                    {this.state.showPlusMinus
                        ?
                        <React.Fragment>
                            <button onClick={this.togglePlusMinus}>隐藏增减行</button>
                            <Plus plus={plus}/>
                            <Minus minus={minus}/>
                        </React.Fragment>
                        :
                        <button onClick={this.togglePlusMinus}>显示增减行</button>
                    }
                </div>
                <ChooseWhereToShow showInWhereArr={showInWhereArr} setShowInWhereArr={setShowInWhereArr} setMarbleLine={setMarbleLine}/>
                {this.state.showCode
                    ?
                    <React.Fragment>
                        <button onClick={this.toggleCode}>隐藏源码</button>
                        <Code code={code}/>
                    </React.Fragment>
                    :
                    <button onClick={this.toggleCode}>显示源码</button>
                }
            </div>
        )
    }
}