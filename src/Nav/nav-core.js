import React from 'react'
import {NavLink} from 'react-router-dom'
import ShallowListTitle from './shallowlist-title'


export default class NavCore extends React.Component {
    render() {
        console.log('NavCore')
        let {css,showChild,sortDeepList,shallowList}=this.props
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        return (
            <nav className={nav}>
                <ul className={firstUl}>
                    {shallowList.map((e, i)=>(
                        <li key={i} className={firstLi}>
                            {showChild && !e.notShowChild?
                                <ShallowListTitle name={e.shallowTitle}
                                                  pathname={e.pathname}
                                                  sortDeepList={sortDeepList[e.pathname]}
                                                  secondLi={secondLi}
                                                  secondUl={secondUl}
                                                  i={i}/>
                                :
                                <NavLink to={`/${e.pathname}`}
                                         activeStyle={{borderBottom:'3px solid #dadada'}} >{e.shallowTitle}</NavLink>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}