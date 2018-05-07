import React from 'react'
import ShallowListTitle from './shallowlist-title'
//此处不用reuse，否则activestyle 不更新
// import {ReuseNavLink} from '../Widget'
import Search from '../Search'
import {Consumer} from '../index'
import {NavLink} from 'react-router-dom'

export default class NavCore extends React.PureComponent {
    constructor(){
        super()
        this.shallowListActiveStyle={borderBottom:'3px solid #dadada'}
    }

    render() {
        let {css,showChild}=this.props
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        //console.log('NavCore')
        return (
        /*context——Consumer*/
        <Consumer>
            {({sortDeepList,sortNavDeepList,compatibleShallowList,curPathname})=>(
                <React.Fragment>
                <nav className={nav}>
                    <ul className={firstUl}>
                        {compatibleShallowList.map((e, i)=>(
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
                                                  activeStyle={this.shallowListActiveStyle}
                                             >{e.shallowTitle}</NavLink>
                                }
                            </li>
                        ))}
                    </ul>
                </nav>
                <Search deepList={sortDeepList.operators}/>
                </React.Fragment>
            )}
        </Consumer>
        )
    }
}