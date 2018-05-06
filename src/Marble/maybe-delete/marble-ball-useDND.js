import React from 'react';
import PopText from './../Widget/poptext'
import MarbleBallComponent from './marble-ball-component';

export default class MarbleBallUseDND extends React.PureComponent{
    constructor(props){
        super(props)
        this.showPop=this.showPop.bind(this)
        this.closePop=this.closePop.bind(this)
        this.setDropLeft=this.setDropLeft.bind(this)
        const {marbleBallObj,restorePositionKey}=this.props
        const {data,text,left,background,color,top}=marbleBallObj

        this.state={
            restorePositionKey,
            left,data,text,background,color,top:top-30,
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


    /**
     * 扁平数据传递给drag-source，可省去不必要的渲染
     */
    componentDidMount(){
        const {marbleBallObj}=this.props
        const {top}=marbleBallObj
        this.timer=setTimeout(()=>{
            this.setState({
                top
            })
        },20)
    }

    render(){
        //console.log('MarbleBall render')
        const {setIsDragged}=this.props
        const {left,data,text,top,background,color,showPopText}=this.state;
        return(
            <React.Fragment>
                <MarbleBallComponent text={text}
                                     left={left} top={top} background={background} color={color}
                                     closePop={this.closePop}
                                     showPop={this.showPop}
                                     cancelBubble={this.cancelBubble}
                                     setIsDragged={setIsDragged}
                                     setDropLeft={this.setDropLeft}/>
                {showPopText?
                <PopText data={data} className="marbleBallPopData" cssStyle={{left,top}} needStringify={true}/>:
                    null
                }
            </React.Fragment>
        )
    }
}

