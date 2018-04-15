import React from 'react';
import PopText from './../Widget/poptext'
export default class MarbleBall extends React.Component{
    constructor(){
        super()
        this.showPop=this.showPop.bind(this)
        this.closePop=this.closePop.bind(this)
        this.state={
            curStyle:{},
            curContent:{},
            showPopText:false
        }
        this.left=0
    }
    closePop(){
        this.setState({
            showPopText:false
        })
    }
    showPop(e){

        const {offsetY,offsetX}=e.nativeEvent
        const {left,top}=this.state.curStyle
        this.setState({
            position:{top:offsetY+top,left:offsetX+left},
            showPopText:true
        })
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    componentDidMount(){
        const {marbleBallObj}=this.props
        const {data,text,...style}=marbleBallObj
        this.timer=setTimeout(()=>{
            this.setState({
                curStyle:style,
                curContent:{text,data}
            })
        },20)
    }
    render(){
        //console.log('MarbleBall')
        const {text,data}=this.state.curContent
        return(
            <React.Fragment>
                <div className="colorBall"
                     onMouseOut={this.closePop}
                     onMouseOver={this.showPop}
                     style={this.state.curStyle}>{text}</div>
                {this.state.showPopText?
                <PopText data={data} position={this.state.position}/>:
                    null
                }
            </React.Fragment>
        )
    }
}