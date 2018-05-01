import React from 'react'
import {NavLink} from 'react-router-dom'
import {deepEqual} from '../tools';

export default class ReuseNavLink extends React.Component{

    /**
     * props涉及的层次比较浅，结构简单，
     * 使用stringify比经过immutable转换后对比更快一点
     */
    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
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