import React from 'react'
import NavCore from './nav-core'


export default class WapNav extends React.PureComponent {
    constructor(props){
        super(props)
        this.state={
            showNav:false
        }
        // this.closeWapNav=this.closeWapNav.bind(this)
        this.clickButton=this.clickButton.bind(this)
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //     if(nextProps.showWapHorNav!==prevState.showNav){
    //         return {
    //             showNav:nextProps.showWapHorNav
    //         }
    //     }
    //     return null;
    // }

    clickButton(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        // this.props.changeWapHorNav(!this.state.showNav)
        this.setState((prevState)=>({
            showNav:!prevState.showNav
        }))
    }
    render() {
        //console.log('WapNav')
        const {showChild,css,sortNavDeepList,shallowList,curPathname}=this.props
        return (
          
            <React.Fragment>
                <div className={css.navButton} onClick={this.clickButton}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {this.state.showNav ?
                    <NavCore listTitleClick={this.clickButton}
                             closeWapNav={this.closeWapNav}
                             sortNavDeepList={sortNavDeepList}
                             curPathname={curPathname}
                             shallowList={shallowList}
                             showChild={showChild}
                             css={css}/> : 
                     null}
            </React.Fragment>
                  
        )
    }
}