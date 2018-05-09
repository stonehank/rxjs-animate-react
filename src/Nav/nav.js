import navCss from './cssdata';
import React from 'react'
import '../Css/nav.css'
import WebNav from './web-nav'
import WapNav from './wap-nav'
import Search from '../Search'
import {Consumer} from '../index'

export default class Nav extends React.PureComponent {

    render() {
        //console.log('CreateNav')
        const {type,orient,showChild,showWapHorNav,changeWapHorNav}=this.props
        const _cssData = navCss[orient][type]
        return (
            <Consumer>
                {({sortDeepList,sortNavDeepList,shallowList,curPathname})=>(
                    <div className="navMain">
                        {type === 'webNav' ?
                            <WebNav showChild={showChild}
                                    sortNavDeepList={sortNavDeepList}
                                    curPathname={curPathname}
                                    shallowList={shallowList}
                                    css={_cssData}/> :
                            <WapNav showChild={showChild}
                                    changeWapHorNav={changeWapHorNav}
                                    showWapHorNav={showWapHorNav}
                                    sortNavDeepList={sortNavDeepList}
                                    curPathname={curPathname}
                                    shallowList={shallowList}
                                    css={_cssData}/>
                        }
                        <Search deepList={sortDeepList.operators}/> 
                    </div>
               )}
        </Consumer>
        )
    }
}