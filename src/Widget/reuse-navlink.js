import React from 'react'
import {NavLink} from 'react-router-dom'
import {deepEqual} from '../tools';

export default class ReuseNavLink extends React.Component{

    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
    }
    render(){
        // console.log('ReuseNavLink')
        const {toPath,activeStyle,name}=this.props
        return(
            <NavLink to={toPath}
                     activeStyle={activeStyle} >{name}</NavLink>
        )
    }
}