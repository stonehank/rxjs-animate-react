import React from 'react';
import {Route,Switch}  from 'react-router-dom'
import Overview from '../Section/overview'
import AllSortPages from '../Section/all-sort-pages'
import OperatorSectionContainer from '../Section/operator-section-container'
import Page404 from '../Section/page404'

export default class Routes extends React.Component{
    render(){
        const {shallowList}=this.props
        return(
            <Switch>
                <Route exact={true} path="/" component={Overview} />
                {shallowList.map((e,i)=>(
                    <Route exact={true} key={i} path={`/${e.pathname}`} component={AllSortPages}/>
                ))}
                <Route path='/operators/:section+' component={OperatorSectionContainer}/>
                <Route component={Page404} />
            </Switch>
        )
    }
}