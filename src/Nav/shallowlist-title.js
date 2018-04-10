import React from 'react'
import {sortMethod} from '../tools'
import DeepListTitle from './deeplist-title'

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
        let {name,secondLi,secondUl}=this.props
        const {showDeepListNav}=this.state
        return (
            <div onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <span>{name}</span>
                {showDeepListNav
                    ?
                    <DeepListTitle
                        secondLi={secondLi}
                        secondUl={secondUl}
                        deepListClick={this.shallowListClick}
                        sortDeepList={this.state.sortDeepList}/>
                    :
                    null}
            </div>
        )
    }
}
