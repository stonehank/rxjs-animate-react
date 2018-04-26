import React from 'react'
import {ReuseNavLink} from '../Widget'

export default class DeepListTitle extends React.PureComponent{
    render(){
        //console.log('DeepListTitle')
        let {sortDeepList,secondLi,secondUl,pathname}=this.props;
        let listLen = sortDeepList ? sortDeepList.length : 0;
        return (
            listLen > 0 ?
                <ul className={secondUl}>
                    {sortDeepList.map((e)=>(
                        <li key={e.id} className={secondLi} onClick={this.props.deepListClick} >
                            <ReuseNavLink toPath={`/operators/${e.name}`}
                                          activeStyle={{borderLeft:'4px solid #fff',paddingLeft:'0.5rem',background:'#B9BDB5',color:'#272926'}}
                                          name={`${e.name}(${e[pathname]})`} />
                        </li>
                    ))}
                </ul> :
                <p className={secondLi}>无数据</p>
        )
    }
}
