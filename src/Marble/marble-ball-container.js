import React from 'react';
import ReactDOM from 'react-dom';
import {PopText} from '../Widget'
import MarbleBallComponent from './marble-ball-component'
import {checkIsPhone} from '../tools'

/**
 * 此处用pure而不用shouldComponentUpdate
 * 一般来说，marbleBallObj每次都是不同的小球数据，使用pure能增加很多性能
 * 如果遇到特殊情况，如多次of，几次的重复渲染是可以接受的
 */
export default class MarbleBallContainer extends React.PureComponent{
    constructor(props){
        super(props)
        this.showPop=this.showPop.bind(this)
        this.closePop=this.closePop.bind(this)
        this.dragStart=this.dragStart.bind(this)
        this.dragging=this.dragging.bind(this)
        this.dragOver=this.dragOver.bind(this);
        this.currentEventName=null;
        this.phoneEvent={move:'touchmove',end:'touchend',eventX:(e)=>e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX}
        this.desktopEvent={move:'mousemove',end:'mouseup',eventX:(e)=>e.clientX}
        const {marbleBallObj,restorePositionKey}=this.props
        const {data,text,left,background,color,top}=marbleBallObj
        this.state={
            restorePositionKey,
            opacity:0,
            left,data,text,background,color,top:top,
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

    dragStart(e){
        // e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        // const {smallScreen}=this.state
        const smallScreen=checkIsPhone();
        this.currentEventName=smallScreen ? this.phoneEvent : this.desktopEvent
        this.initX=this.currentEventName.eventX(e)
        document.getElementById('root').style.cursor='-webkit-grabbing';
        document.addEventListener(this.currentEventName.move,this.dragging)
        document.addEventListener(this.currentEventName.end,this.dragOver)
        this.setState({
            opacity:0.7
        })
    }
    dragOver(e){
        // e.stopPropagation()
        e.stopImmediatePropagation()
        document.removeEventListener(this.currentEventName.move,this.dragging)
        document.removeEventListener(this.currentEventName.end,this.dragOver)
        document.getElementById('root').style.cursor='inherit';
        this.draggingBall=null;
        ReactDOM.render(this.draggingBall,document.getElementById('dragMarble'))

        if(isNaN(this.finalX)){
            this.setState({
                opacity:1
            })
            return
        }
        this.props.setIsDragged(true)
        this.setState(prevState=>({
            left:prevState.left+this.finalX,
            opacity:1
        }))
        this.finalX=0;
    }
    dragging(e){
        // e.stopPropagation()
        e.preventDefault()
        // console.time(1)
        const {marbleBallObj,dragMaxLeft}=this.props
        const {text,...style}=marbleBallObj
        const {left}=this.state;
        this.finalX=this.currentEventName.eventX(e)-this.initX;
        if(this.finalX<-left){this.finalX=-left}
        if(this.finalX>dragMaxLeft-left){this.finalX=dragMaxLeft-left}

        this.draggingBall=React.createElement('div',{className:'colorBall',style:Object.assign({},style,{left:left+this.finalX})},text)
        ReactDOM.render(this.draggingBall,document.getElementById('dragMarble'))
        // console.timeEnd(1)
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
        const {marbleBallObj}=this.props
        // const {top}=marbleBallObj
        this.timer=setTimeout(()=>{
            this.setState({
                opacity:1
            })
        },20)
    }
    render(){
        //console.log('MarbleBall render')
        const {left,data,text,top,background,color,showPopText,opacity}=this.state;
        return(
            <React.Fragment>
                <MarbleBallComponent text={text} opacity={opacity}
                                     left={left} top={top} background={background} color={color}
                                     closePop={this.closePop}
                                     showPop={this.showPop}
                                     dragStart={this.dragStart}
                                     cancelBubble={this.cancelBubble}/>
                {showPopText?
                    <PopText data={data} className="marbleBallPopData" left={left} top={top} needStringify={true}/>:
                    null
                }
            </React.Fragment>
        )
    }
}