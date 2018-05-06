import React from 'react';
import {Route,Switch}  from 'react-router-dom'
import Overview from '../Components/overview'
import SortedNavPage from '../Components/sorted-nav-page'
import Page404 from '../Components/page404'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import WithSmallScreenHoc from "../Components/operator-core-container-hoc";
import {deepEqual} from '../tools'

export default class Routes extends React.Component{

    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
    }

    render(){
        //console.log('Routes')
        const {shallowList}=this.props
        return(
            <Switch>
                <Route exact={true} path="/" component={Overview} />
                {shallowList.map((e,i)=>(
                    <Route exact={true} key={i} path={`/${e.pathname}`} component={SortedNavPage}/>
                ))}
                <Route path='/operators/:section+' component={WithSmallScreenHoc}/>
                <Route component={Page404} />
            </Switch>
        )
    }
}

export default Routes=DragDropContext(HTML5Backend)(Routes)