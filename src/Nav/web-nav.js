import React from 'react'
import NavCore from './nav-core'
import Search from '../Search'
import {Consumer} from '../index'

export default class WebNav extends React.PureComponent {
    render() {
        //console.log('WebNav')
        const {css,showChild,sortNavDeepList,shallowList,curPathname}=this.props
        return (
 
                <NavCore sortNavDeepList={sortNavDeepList}
                         curPathname={curPathname}
                         shallowList={shallowList}
                         showChild={showChild}
                         css={css}/>

        )
    }
}