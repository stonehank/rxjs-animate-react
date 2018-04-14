import React from 'react'
import DeepListTitle from './deeplist-title'
import ReuseNavLink from './reuse-navlink'


export default class ShallowListTitle extends React.PureComponent {
    constructor(){
        super()
        this.handleMouseEnter=this.handleMouseEnter.bind(this)
        this.handleMouseLeave=this.handleMouseLeave.bind(this)
        this.deepListClick=this.deepListClick.bind(this)
        this.state={showDeepListNav:false}
    }
    deepListClick(){
        this.setState({showDeepListNav:false})
    }
    handleMouseEnter(){
        this.setState({showDeepListNav:true})
    }
    handleMouseLeave(){
        this.setState({showDeepListNav:false})
    }
    render() {
        //console.log('ShallowListTitle')
        let {name,secondLi,secondUl,pathname,sortDeepList}=this.props
        const {showDeepListNav}=this.state
        return (
            <div onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <ReuseNavLink toPath={`/${pathname}`}
                              activeStyle={{borderBottom:'3px solid #dadada'}}
                              name={name} />
                {showDeepListNav
                    ?
                    <DeepListTitle
                        deepListClick={this.deepListClick}
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
