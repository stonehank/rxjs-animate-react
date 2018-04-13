import React from 'react'
import {NavLink} from 'react-router-dom'
import {setSearchList} from '../tools'

export default class Search extends React.Component{
    constructor(){
        super()
        this.state={
            searchInput:false
        };
        this.startSearch=this.startSearch.bind(this)
        this.blur=this.blur.bind(this)
    }
    blur(){
        this.setState({
            searchInput:false
        })
    }
    startSearch(){
        this.setState({
            searchInput:true
        })
    }
    render(){
        const {deepList}=this.props
        return (
            this.state.searchInput
            ?
            <SearchInput  blur={this.blur} deepList={deepList}/>
            :
            <h2 className="search" onClick={this.startSearch}>search</h2>
        )
    }
}

class SearchInput extends React.Component{
    constructor(props) {
        super(props)
        this.blur=this.blur.bind(this)
        this.valueChange=this.valueChange.bind(this)
        this.goToDetail=this.goToDetail.bind(this)
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
        //todo set searchList

        this.setState({
            searchList:setSearchList(v,deepList)
        })
    }

    blur(e){
        const v=e.target.value;
        if(v.trim()==="")this.props.blur()
    }

    goToDetail(e){
        e.stopPropagation();
        this.setState({
            searchList:false
        });
        this.props.blur()
    }
    render(){
        const {searchList}=this.state
        return(
            <div className="searchInputWrap">
                <input type="text" autoFocus={true} placeholder="请输入搜索" onChange={this.valueChange} onBlur={this.blur} />
                <ul className="searchInputUl">
                    {searchList
                        ?
                        searchList[0]
                            ?
                            searchList.map((e,i)=>(
                                <li  key={i} className="searchInputLi">
                                    <NavLink  onClick={this.goToDetail}
                                              activeStyle={{borderLeft:'4px solid #fff',paddingLeft:'0.5rem',background:'#B9BDB5',color:'#272926'}}
                                              to={`/operators/${e}`}>{e}</NavLink>
                                </li>))
                            :
                            <p>无数据</p>
                        :
                        null}
                </ul>
            </div>
        )
    }
}
