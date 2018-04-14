import React from 'react'
import NavCore from './nav-core'

export default class WapNav extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showNav:false
        }
        this.clickButton=this.clickButton.bind(this)
    }
    clickButton(e){
        e.stopPropagation()
        this.setState((prevState)=>({
            showNav:!prevState.showNav
        }))
    }
    render() {
        console.log('WapNav')
        const {showChild,css,deepList,shallowList}=this.props
        return (
            <React.Fragment>
                <div className={css.navButton} onClick={this.clickButton}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {this.state.showNav ?
                    <NavCore listTitleClick={this.clickButton}
                             deepList={deepList}
                             shallowList={shallowList}
                             showChild={showChild}
                             css={css}/> : null}
            </React.Fragment>
        )
    }
}