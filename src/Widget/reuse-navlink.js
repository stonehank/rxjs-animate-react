import React from 'react'
import {NavLink} from 'react-router-dom'
//import {fromJS,is} from 'immutable';

export default class ReuseNavLink extends React.Component{

    /**
     * props涉及的层次比较浅，结构简单，
     * 使用stringify比经过immutable转换后对比更快一点
     */
    shouldComponentUpdate(nextProps){
        //let t0=performance.now()
        //is(fromJS(this.props),fromJS(nextProps))
        return JSON.stringify(nextProps)!==JSON.stringify(this.props)
        //console.log(performance.now()-t0)
        //return true;
    }
    render(){
        //console.log('ReuseNavLink')
        const {toPath,activeStyle,name}=this.props
        return(
            <NavLink to={toPath}
                     activeStyle={activeStyle} >{name}</NavLink>
        )
    }
}