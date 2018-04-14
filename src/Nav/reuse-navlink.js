import React from 'react'
import {NavLink} from 'react-router-dom'

export default class ReuseNavLink extends React.PureComponent{
    render(){
        //console.log('ReuseNavLink')
        const {toPath,activeStyle,name}=this.props
        return(
            <NavLink to={toPath}
                     activeStyle={activeStyle} >{name}</NavLink>
        )
    }
}