import React from 'react';

export default class MarbleBall extends React.Component{
    constructor(){
        super()
        this.showData=this.showData.bind(this)
        this.state={
            curStyle:{},
            curContent:{}
        }
        this.left=0
    }
    showData(){
        const {text,data}=this.state.curContent
        const stringify=JSON.stringify(data)
        console.log(text,'stringify:'+stringify)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    componentDidMount(){
        const {marbleBallObj}=this.props
        const {data,text,...style}=marbleBallObj
        style.opacity=1;
        this.timer=setTimeout(()=>{
            this.setState({
                curStyle:style,
                curContent:{text,data}
            })
        },20)
    }
    render(){
        const {text}=this.state.curContent
        return(
            <div className="colorBall" onMouseOver={this.showData} style={this.state.curStyle}>{text}</div>
        )
    }
}