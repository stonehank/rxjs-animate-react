import React from 'react';
import {getPath,deepEqual} from '../tools'
import {Consumer} from '../index'
import {ReuseNavLink} from '../Widget'


export default class SortedNavPage extends React.Component{
    constructor(){
        super()
        this.lastCapitalAlpha=''
    }
    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
    }
    render(){
        // console.log('SortedNavPage')
        const {sortType,sortDeepList}=this.props
        const curSortDeepList=sortDeepList[sortType]
                    return (
                        <div>
                            {curSortDeepList.map(e=>{
                                let showCapital=false,
                                    firstCapital=e.firstCapital;
                                if(sortType==='operators'){
                                    if(this.lastCapitalAlpha!==firstCapital){
                                        showCapital=true;
                                        this.lastCapitalAlpha=firstCapital
                                    }
                                }
                                return (
                                    <li className="sortedLi"style={{marginLeft:'1rem'}} key={e.id}>
                                        {showCapital?<p>{firstCapital}</p>:null}
                                        <ReuseNavLink   toPath={`operators/${e.name}`}
                                                        name={sortType!=='operators'?`${e.name}(${sortType}:${e[sortType]})`:`${e.name}`} />
                                    </li>
                                )
                            })}
                        </div>
                    )
    }
}