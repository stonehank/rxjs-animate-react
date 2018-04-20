import React from 'react';
import ReactDOM from 'react-dom';
import PopText from './../Widget/poptext'
export default class MarbleBall extends React.PureComponent{
    constructor(){
        super()
        this.showPop=this.showPop.bind(this)
        this.closePop=this.closePop.bind(this)
        this.dragStart=this.dragStart.bind(this)
        this.dragging=this.dragging.bind(this)
        this.dragOver=this.dragOver.bind(this)
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
    showPop(e){

        const {offsetY,offsetX}=e.nativeEvent
        const {top}=this.state.curStyle
        const left=this.state.left;
        this.setState({
            position:{top:offsetY+top,left:offsetX+left},
            showPopText:true
        })
    }

    cancelBubble(e){
        e.nativeEvent.stopImmediatePropagation()
    }

    dragStart(e){
        e.nativeEvent.stopImmediatePropagation()

        const {curStyle}=this.state
        const curStyleWithOpa=Object.assign({},curStyle,{opacity:0.5})

        this.initX=e.clientX
        document.getElementById('root').style.cursor='-webkit-grabbing';
        document.addEventListener('mousemove',this.dragging)
        document.addEventListener('mouseup',this.dragOver)

        this.setState({
            curStyle:curStyleWithOpa
        })
    }
    dragOver(e){
        e.stopPropagation()
        e.stopImmediatePropagation()
        const {curStyle}=this.state
        const curStyleWithOpa=Object.assign({},curStyle,{opacity:1})

        document.removeEventListener('mousemove',this.dragging)
        document.removeEventListener('mouseup',this.dragOver)
        document.getElementById('root').style.cursor='inherit';
        this.draggingBall=null;
        ReactDOM.render(this.draggingBall,document.getElementById('dragMarble'))

        if(isNaN(this.finalX)){return}
        this.props.changeDragStatus(true)
        this.setState(prevState=>({
            left:prevState.left+this.finalX,
            curStyle:curStyleWithOpa
        }))
        this.finalX=0;
    }
    dragging(e){
        e.preventDefault()
        //console.time(1)
        const {marbleBallObj,dragMaxLeft}=this.props
        const {text,...style}=marbleBallObj
        const {left}=this.state;
        this.finalX=e.clientX-this.initX;
        if(this.finalX<-left){this.finalX=-left}
        if(this.finalX>dragMaxLeft-left){this.finalX=dragMaxLeft-left}


        this.draggingBall=React.createElement('div',{className:'colorBall',style:Object.assign({},style,{left:left+this.finalX})},text)

        ReactDOM.render(this.draggingBall,document.getElementById('dragMarble'))
        //console.timeEnd(1)
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

        //todo 使用新api
    //componentWillUpdate(nextProps){
    //    //console.log('MarbleBall will update')
    //    const {marbleBallObj,restorePositionKey}=nextProps
    //    //只有restorePositionKey变了 并且 left也变了 才会执行还原
    //    if(restorePositionKey!==this.state.restorePositionKey && this.state.left!==marbleBallObj.left){
    //        console.log('real render')
    //        this.setState({
    //            restorePositionKey:restorePositionKey,
    //            left:marbleBallObj.left
    //        })
    //    }
    //}


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
        const {left,curStyle,curContent}=this.state;
        const {text,data}=curContent
        const _curStyle=Object.assign({},curStyle,{left})
        return(
            <React.Fragment>
                <div className="colorBall"
                     onClick={this.cancelBubble}
                     onMouseDown={this.dragStart}
                     onMouseOut={this.closePop}
                     onMouseOver={this.showPop}
                     style={_curStyle}>{text}</div>
                {this.state.showPopText?
                <PopText data={data} position={this.state.position}/>:
                    null
                }
            </React.Fragment>
        )
    }
}