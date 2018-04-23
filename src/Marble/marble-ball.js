import React from 'react';
import ReactDOM from 'react-dom';
import PopText from './../Widget/poptext'
import MarbleBallComponent from './marble-ball-component';

export default class MarbleBall extends React.PureComponent{
    constructor(){
        super()
        this.showPop=this.showPop.bind(this)
        this.closePop=this.closePop.bind(this)
        this.setDropLeft=this.setDropLeft.bind(this)
        this.state={
            curStyle:{},
            curContent:{},
            left:0,
            restorePositionKey:0,
            showPopText:false
        }
    }
    closePop(){
        this.setState({
            showPopText:false
        })
    }
    showPop(){
        this.setState({
            showPopText:true
        })
    }

    cancelBubble(e){
        e.nativeEvent.stopImmediatePropagation()
    }

    setDropLeft(x){
        this.setState(prevState=>({
            left:prevState.left+x
        }))
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }


    static getDerivedStateFromProps(nextProps,prevState){
        //console.log('MarbleBall will update')
        const {marbleBallObj,restorePositionKey}=nextProps
        //只有restorePositionKey变了 并且 left也变了 才会执行还原
        if(restorePositionKey!==prevState.restorePositionKey && prevState.left!==marbleBallObj.left){
            //console.log('real render')
            return {
                restorePositionKey:restorePositionKey,
                left:marbleBallObj.left
            }
        }else{
            return null
        }
    }


    componentDidMount(){
        //console.log('MarbleBall didmount')
        const {marbleBallObj,restorePositionKey}=this.props
        const {data,text,left,...style}=marbleBallObj
        this.timer=setTimeout(()=>{
            this.setState({
                restorePositionKey:restorePositionKey,
                curStyle:style,
                left:left,
                curContent:{text,data}
            })
        },20)
    }
    render(){
        //console.log('MarbleBall render')
        const {setIsDragged}=this.props
        const {left,curStyle,curContent,showPopText}=this.state;
        const {text,data}=curContent
        const _curStyle=Object.assign({},curStyle,{left})
        return(
            <React.Fragment>
                <MarbleBallComponent text={text}
                                     _curStyle={_curStyle}
                                     closePop={this.closePop}
                                     showPop={this.showPop}
                                     cancelBubble={this.cancelBubble}
                                     setIsDragged={setIsDragged}
                                     setDropLeft={this.setDropLeft}/>
                {showPopText?
                <PopText data={data} position={{left:_curStyle.left,top:_curStyle.top}}/>:
                    null
                }
            </React.Fragment>
        )
    }
}

