import React from 'react'

export default class ShowExampleMarbleBall extends React.Component{

    shouldComponentUpdate(){
        return false;
    }

    render(){
        //console.log(ShowExampleMarbleBall)
        return(
            <React.Fragment>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample completeMarbleBall">com</div>complete</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample errorMarbleBall">err</div>error</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample blueMarbleBall">1</div>number</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample greenMarbleBall">a</div>string</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample yellowMarbleBall">ev</div>event</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample purpleMarbleBall">obj</div>object</span>
                <span style={{fontSize:"0.8rem"}}><div className="colorBallExample orangeMarbleBall">arr</div>array</span>
            </React.Fragment>
        )
    }
}