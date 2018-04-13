import React from 'react'
import {sortMethod} from '../tools'
import DeepListTitle from './deeplist-title'
import {NavLink} from 'react-router-dom'
export default class ShallowListTitle extends React.Component {
    constructor(){
        super()
        this.handleMouseEnter=this.handleMouseEnter.bind(this)
        this.handleMouseLeave=this.handleMouseLeave.bind(this)
        this.state={
            sortDeepList:null,
            showDeepListNav:false
        }
    }
    handleMouseEnter(){
        this.setState({showDeepListNav:true})
    }
    handleMouseLeave(){
        this.setState({showDeepListNav:false})
    }

    componentDidMount(){
        let {sort,deepList}=this.props
        this.setState({
            sortDeepList:sortMethod(sort,deepList)
        })
    }
    render() {
        console.log('ShallowListTitle')
        let {name,secondLi,secondUl,pathname}=this.props
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
                        sortDeepList={this.state.sortDeepList}/>
                    :
                    null}
            </div>
        )
    }
}
