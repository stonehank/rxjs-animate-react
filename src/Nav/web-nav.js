import React from 'react'
import NavCore from './nav-core'

export default class WebNav extends React.PureComponent {
    render() {
        //console.log('WebNav')
        const {css,showChild,sortDeepList,shallowList}=this.props
        return (

                <NavCore sortDeepList={sortDeepList}
                         shallowList={shallowList}
                         showChild={showChild}
                         css={css}/>

        )
    }
}