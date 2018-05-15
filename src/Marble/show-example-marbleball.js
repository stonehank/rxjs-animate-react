import React from 'react'

export default class ShowExampleMarbleBall extends React.Component{

    shouldComponentUpdate(){
        return false;
    }

    render(){
        //console.log(ShowExampleMarbleBall)
        return(
            <div>
                <span style={{fontSize:"0.8rem"}}><div className="special-status-ball complete-ball">|</div>complete</span>
                <span style={{fontSize:"0.8rem"}}><div className="special-status-ball error-ball">×</div>error</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample blueMarbleBall">1</div>number</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample greenMarbleBall">a</div>string</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample skyblueMarbleBall">T</div>boolean</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample deeppinkMarbleBall">fun</div>function</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample yellowMarbleBall">ev</div>event</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample purpleMarbleBall">obj</div>object</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample orangeMarbleBall">arr</div>array</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample grayMarbleBall">und</div>undefined</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample darkslategrayMarbleBall">nul</div>null</span>

            </div>
        )
    }
}