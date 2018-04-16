import React from 'react'
import ShallowListTitle from './shallowlist-title'
import ReuseNavLink from './reuse-navlink'
import Search from '../Search'
import {Consumer} from '../index'

export default class NavCore extends React.PureComponent {

    render() {
        let {css,showChild}=this.props
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        //console.log('NavCore')
        return (
        /*context——Consumer*/
        <Consumer>
            {({sortDeepList,shallowList,curPathname})=>(
                <React.Fragment>
                <nav className={nav}>
                    <ul className={firstUl}>
                        {shallowList.map((e, i)=>(
                            <li key={i} className={firstLi}>
                                {showChild && !e.notShowChild
                                    ?
                                    <ShallowListTitle name={e.shallowTitle}
                                                      pathname={e.pathname}
                                                      sortDeepList={sortDeepList[e.pathname]}
                                                      secondLi={secondLi}
                                                      secondUl={secondUl}
                                                      curPathname={curPathname}
                                                      i={i}/>
                                    :
                                    <ReuseNavLink toPath={`/${e.pathname}`}
                                                  activeStyle={{borderBottom:'3px solid #dadada'}}
                                                  name={e.shallowTitle} />
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