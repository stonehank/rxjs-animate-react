import React from 'react'
import ShallowListTitle from './shallowlist-title'
//此处不用reuse，否则activestyle 不更新

import {NavLink} from 'react-router-dom'

export default class NavCore extends React.PureComponent {
    constructor(){
        super()
        this.shallowListActiveStyle={borderBottom:'3px solid #dadada'}
    }

    render() {
        let {css,showChild,curPathname,shallowList,sortNavDeepList,listTitleClick}=this.props
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        //console.log('NavCore')
        return (
 
                <nav className={nav}>
                    <ul className={firstUl} >
                        {shallowList.map((e, i)=>(
                            <li key={i} className={firstLi}>
                                {showChild && !e.notShowChild
                                    ?
                                    <ShallowListTitle name={e.shallowTitle}
                                                      pathname={e.pathname}
                                                      sortDeepList={sortNavDeepList[e.pathname]}
                                                      secondLi={secondLi}
                                                      secondUl={secondUl}
                                                      curPathname={curPathname}
                                                      activeStyle={this.shallowListActiveStyle}
                                                      i={i}/>
                                    :
                                    <NavLink to={`/${e.pathname}`}
                                             onClick={listTitleClick}
                                                  activeStyle={this.shallowListActiveStyle}
                                             >{e.shallowTitle}</NavLink>
                                }
                            </li>
                        ))}
                    </ul>
                </nav>

        )
    }
}