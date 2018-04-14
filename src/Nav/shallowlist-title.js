import React from 'react'
import DeepListTitle from './deeplist-title'
import {NavLink} from 'react-router-dom'
export default class ShallowListTitle extends React.Component {
    constructor(){
        super()
        this.handleMouseEnter=this.handleMouseEnter.bind(this)
        this.handleMouseLeave=this.handleMouseLeave.bind(this)
        this.state={showDeepListNav:false}
    }
    handleMouseEnter(){
        this.setState({showDeepListNav:true})
    }
    handleMouseLeave(){
        this.setState({showDeepListNav:false})
    }
    render() {
        console.log('ShallowListTitle')
        let {name,secondLi,secondUl,pathname,sortDeepList}=this.props
        const {showDeepListNav}=this.state
        return (
            <div onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <NavLink to={`/${pathname}`}
                         activeStyle={{borderBottom:'3px solid #dadada'}} >{name}</NavLink>
                {showDeepListNav
                    ?
                    <DeepListTitle
                        secondLi={secondLi}
                        secondUl={secondUl}
                        pathname={pathname}
                        sortDeepList={sortDeepList}/>
                    :
                    null}
            </div>
        )
    }
}
