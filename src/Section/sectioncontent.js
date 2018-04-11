import React from 'react';
import {Plus,Minus,Code} from '../Widget'


export default class SectionContent extends React.PureComponent{
    constructor(){
        super()
        this.toggleCode=this.toggleCode.bind(this)
        this.prevCodeArr=[]
        this.state={
            showCode:true,
        }
    }
    toggleCode(){
        this.setState(prevState=>({
            showCode:!prevState.showCode
        }))
    }
    render(){
        const {title,caption,plus,minus,code}=this.props
        return (
            <div className="content">
                <p>{title}</p>
                <p dangerouslySetInnerHTML={{__html: caption}}
                   style={{margin:'0.5rem 0',fontStyle:'italic',color:'#367f8d'}} />
                <div>
                    <Plus plus={plus}/>
                    <Minus minus={minus}/>
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