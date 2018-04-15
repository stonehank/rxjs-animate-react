import React from 'react';
import {Plus,Minus,Code} from '../Widget'


export default class SectionContent extends React.PureComponent{
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
        return (
            <div>
                <p>{title}</p>
                <p dangerouslySetInnerHTML={{__html: caption}}
                   style={{margin:'0.5rem 0',fontStyle:'italic',color:'#367f8d'}} />
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