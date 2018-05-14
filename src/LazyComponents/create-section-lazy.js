import React from 'react'
import Bundle from "./bundle";

export default function createSectionLazy(lazyImportFunc,name,props){
    // console.log('createSectionLazy');
    return (
        <Bundle component={lazyImportFunc} name={name} otherProps={props}>
            {(Mod)=>{
                if(typeof Mod==='function'){
                    return <Mod {...props}/>
                }else if(Mod){
                    let errMessage=Mod[1]
                    return <p>error..{errMessage}</p>
                }else{
                    return <p>loading...............</p>
                }
            }}
        </Bundle>
    )
}