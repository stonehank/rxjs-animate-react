import React from 'react';
import {Link}  from 'react-router-dom'
import {getPath} from '../tools'
import {Consumer} from '../index'



export default class AllSortPages extends React.Component{

    render(){
        return(
            <Consumer>
                {({sortDeepList})=>{
                    const {match}=this.props,
                        curUrl=match.url,
                        sortType=getPath(curUrl,0)
                    const curSortDeepList=sortDeepList[sortType]
                    return (
                        curSortDeepList.map(e=>(
                            <Link className="firstLiHorWeb" key={e.id} to={`operators/${e.name}`}>
                                {sortType!=='operators'?`${e.name}(${sortType}:${e[sortType]})`:`${e.name}`}
                            </Link>
                        ))
                    )
                }}
            </Consumer>
        )
    }
}