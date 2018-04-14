import navCss from './cssdata';
import React from 'react'
import '../Css/nav.css'
import NavCore from './nav-core'
import {Search} from '../Widget'
import WebNav from './web-nav'
import WapNav from './wap-nav'

export default class CreateNav extends React.Component {
    componentWillMount(){
        const {sortDeepList}=this.props
        this.searchList=sortDeepList.operators
    }
    render() {
        console.log('CreateNav')
        const {type,orient,showChild,sortDeepList,shallowList}=this.props
        const _cssData = navCss[orient][type]
        return (
            <div className="navMain">
                {type === 'webNav' ?
                    <WebNav showChild={showChild}
                            shallowList={shallowList}
                            sortDeepList={sortDeepList}
                            css={_cssData}/>
                    :
                    <WapNav showChild={showChild}
                            shallowList={shallowList}
                            sortDeepList={sortDeepList}
                            css={_cssData}/>
                }
                <Search deepList={this.searchList}/>
            </div>
        )
    }
}