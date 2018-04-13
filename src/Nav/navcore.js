import React from 'react'
import {NavLink} from 'react-router-dom'
import {fetchNav} from '../tools'
import ShallowListTitle from './shallowlist-title'


export default class NavCore extends React.Component {

    render() {
        console.log('NavCore')
        let {css,showChild,deepList,shallowList}=this.props
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        return (
                    <nav className={nav}>
                        <ul className={firstUl}>
                            <li  className={firstLi}>
                                <NavLink activeStyle={{borderBottom:'3px solid #dadada'}} to="/operators">查看全部(按字母)</NavLink>
                            </li>
                            {shallowList.map((e, i)=>(
                                <li key={i} className={firstLi}>
                                    {showChild ?
                                        <ShallowListTitle name={e.shallowTitle}
                                                          pathname={e.pathname}
                                                          sort={e.sort}
                                                          deepList={deepList}
                                                          secondLi={secondLi}
                                                          secondUl={secondUl}
                                                          i={i}/>
                                        :
                                        <NavLink to={`/operators/${e.shallowTitle}`}
                                                 activeStyle={{borderBottom:'3px solid #dadada'}} >{e.shallowTitle}</NavLink>
                                    }
                                </li>
                            ))}
                        </ul>
                    </nav>

        )
    }
}
