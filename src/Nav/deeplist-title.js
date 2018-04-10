
import React from 'react'
import {NavLink} from 'react-router-dom'





export default class DeepListTitle extends React.Component{

    render(){
        //console.log('render')
        let {sortDeepList,secondLi,deepListClick,secondUl}=this.props;
        let listLen = sortDeepList ? sortDeepList.length : 0;
        return (
            listLen > 0 ?
                <ul className={secondUl}>
                    {sortDeepList.map((e)=>(
                        <li key={e.id} className={secondLi}  >
                            <NavLink to={`/${e.name}`}
                                     onClick={deepListClick}
                                     activeStyle={{borderLeft:'4px solid #fff',paddingLeft:'0.5rem',background:'#B9BDB5',color:'#272926'}}>{e.name}</NavLink>
                        </li>
                    ))}
                </ul> :
                <p className={secondLi}>无数据</p>
        )
    }
}
