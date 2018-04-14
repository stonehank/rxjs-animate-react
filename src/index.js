import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import CreateNav from './Nav/create-nav'
import {BrowserRouter as Router}  from 'react-router-dom'
import {sortMethod,_fetchNav} from './tools'
//import PropTypes from 'prop-types';
import Routes from './Routes/routes'
import Rx from 'rxjs/Rx'

export const {Provider,Consumer}=React.createContext()

class App extends React.Component{
    constructor(){
        super()
        this.sortDeepList={};
        this.sortNavDeepList={};
        this.state={
            isFetchingNav:true
        }
    }
    componentWillUnmount(){
        this.fetch$.unsubscribe()
    }
    componentDidMount(){
        this.fetch$=Rx.Observable.fromPromise(_fetchNav()).subscribe(({deepList,shallowList})=>{
            shallowList.forEach(e=>{
                let srotedList=sortMethod(e.sort,deepList)
                this.sortDeepList[e.pathname]=srotedList
                this.sortNavDeepList[e.pathname]=srotedList.slice(0,10)
            })
            this.shallowList=shallowList;
            this.setState({
                isFetchingNav:false
            })
        })

    }
    render(){
        console.log('app')
        const {isFetchingNav}=this.state
        const {sortDeepList,shallowList,sortNavDeepList}=this
        const contextProps={sortDeepList,shallowList}
        return(
            isFetchingNav
                ?
                <p>loading..</p>
                :
                <React.Fragment>
                    <CreateNav type="webNav"
                               orient="horizontal"
                               showChild={true}
                               sortDeepList={sortNavDeepList}
                               shallowList={shallowList}/>
                    <Provider value={contextProps}>
                        <Routes shallowList={shallowList}/>
                    </Provider>
                </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Router >
        <App />
    </Router>,
    document.getElementById('root')
)