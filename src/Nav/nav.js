import navCss from './cssdata';
import React from 'react'
import '../Css/nav.css'
import WebNav from './web-nav'
import WapNav from './wap-nav'

export default class Nav extends React.PureComponent {

    render() {
        //console.log('CreateNav')
        const {type,orient,showChild}=this.props
        const _cssData = navCss[orient][type]
        return (
            <div className="navMain">
                {type === 'webNav' ?
                    <WebNav showChild={showChild}
                            css={_cssData}/>
                    :
                    <WapNav showChild={showChild}
                            css={_cssData}/>
                }
            </div>
        )
    }
}