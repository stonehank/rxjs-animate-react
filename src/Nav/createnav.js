import navCss from './cssdata';
import React from 'react'
import '../Css/nav.css'
import NavCore from './navcore'

export default class CreateNav extends React.Component {
    render() {
        const {type,orient,showChild}=this.props
        const _cssData = navCss[orient][type]
        return (
            type === 'webNav' ?
                <WebNav showChild={showChild}
                        css={_cssData}/>
                :
                <WapNav showChild={showChild}
                        css={_cssData}/>
        )
    }
}


class WapNav extends React.Component {
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
        const {showChild,css}=this.props
        return (
            <React.Fragment>
                <div className={css.navButton} onClick={this.clickButton}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {this.state.showNav ?
                    <NavCore listTitleClick={this.clickButton}
                             showChild={showChild}
                             css={css}/> : null}
            </React.Fragment>
        )
    }
}


class WebNav extends React.Component {
    render() {
        const {css,showChild}=this.props
        return (
            <React.Fragment>
                <NavCore
                         showChild={showChild}
                         css={css}/>
            </React.Fragment>

        )
    }
}



