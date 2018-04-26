import React from 'react'
import ReuseNavLink from '../Widget/reuse-navlink'
import {setSearchList} from '../tools'

export default class SearchInput extends React.PureComponent{
    constructor(props) {
        super(props)
        this.blur=this.blur.bind(this)
        this.valueChange=this.valueChange.bind(this)
        this.goToDetail=this.goToDetail.bind(this)
        this.cancelBubble=this.cancelBubble.bind(this)

        this.state={
            value:'',
            searchList:false
        }
    }
    valueChange(e){
        const {deepList}=this.props;
        const v=e.target.value;
        if(v.trim()===""){
            return this.setState({
                searchList:false
            })}
        this.setState({
            searchList:setSearchList(v,deepList)
        })
    }
    blur(e){
        const v=e.target.value;
        if(v.trim()==="")this.props.blur()
    }

    cancelBubble(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
    }
    goToDetail(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            searchList:false
        });
        this.props.blur()
    }
    render(){
        const {searchList}=this.state
        return(
            <div className="searchInputWrap">
                <input type="text" autoFocus={true} placeholder="请输入搜索" onChange={this.valueChange} onClick={this.cancelBubble} onBlur={this.blur} />
                <ul className="searchInputUl">
                    {searchList
                        ?
                        searchList[0]
                            ?
                            searchList.map((e,i)=>(
                                <li  key={i} className="searchInputLi" onClick={this.goToDetail}>
                                    <ReuseNavLink  name={e}
                                                   toPath={`/operators/${e}`}
                                                   activeStyle={{borderLeft:'4px solid #fff',paddingLeft:'0.5rem',background:'#B9BDB5',color:'#272926'}}
                                               />
                                </li>))
                            :
                            <p onClick={this.cancelBubble}>无数据</p>
                        :
                        null}
                </ul>
            </div>
        )
    }
}
