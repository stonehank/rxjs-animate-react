import React from 'react'
import SearchInput from './search-input'

export default class Search extends React.PureComponent{
    constructor(){
        super()
        this.state={searchInput:false};
        this.startSearch=this.startSearch.bind(this)
        this.blur=this.blur.bind(this)
    }
    blur(){
        this.setState({searchInput:false})
    }
    startSearch(){
        this.setState({searchInput:true})
    }
    render(){
        //console.log('search')
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


