import React from 'react';



export default class SectionDescriptionBody extends React.PureComponent{

    render(){
        const bClass='section-description';
        const {gfsm,czsm,cclj,tbzy}=this.props;
        const pArr=cclj.split('\<br\>');
        console.log(pArr)
        return(
                <div className={bClass}>
                    <span>官方说明：</span><p>{gfsm}</p>
                    <span>操作说明：</span><p>{czsm}</p>
                    {/*<span>此处理解：</span><p dangerouslySetInnerHTML={{__html: cclj}}/>*/}
                    <span>此处理解：</span>{pArr.map((e,i)=><p key={i} dangerouslySetInnerHTML={{__html: e}}/>)}
                    <span>特别说明：</span><p dangerouslySetInnerHTML={{__html: tbzy}}/>
                </div>
        )
    }
}
