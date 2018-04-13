import navCss from './cssdata';
import React from 'react'
import '../Css/nav.css'
import NavCore from './navcore'

export default class CreateNav extends React.Component {
    render() {
        console.log('CreateNav')
        const {type,orient,showChild,deepList,shallowList}=this.props
        const _cssData = navCss[orient][type]
        return (

            type === 'webNav' ?
                <WebNav showChild={showChild}
                        shallowList={shallowList}
                        deepList={deepList}
                        css={_cssData}/>
                :
                <WapNav showChild={showChild}
                        shallowList={shallowList}
                        deepList={deepList}
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


class WebNav extends React.Component {
    render() {
        console.log('WebNav')
        const {css,showChild,deepList,shallowList}=this.props
        return (
            <React.Fragment>
                <NavCore deepList={deepList}
                         shallowList={shallowList}
                         showChild={showChild}
                         css={css}/>
            </React.Fragment>

        )
    }
}



