

export const calcBallAttribute=(v)=>{
    var obj={};
    if(typeof v==='object' && Object.prototype.toString.call(v).indexOf("Event")!==-1)obj.data=v,obj.text='ev',obj.background='yellow',obj.top=50,obj.color='#000';
    if(typeof v==='object' && Object.prototype.toString.call(v)==='[object Object]')obj.data=v,obj.text='obj',obj.background='red',obj.top=50,obj.color='#fff';
    if(typeof v==='object' && Object.prototype.toString.call(v)==='[object Array]')obj.data=v,obj.text='obj',obj.background='orange',obj.top=50,obj.color='#fff';
    if(typeof v==='number')obj.data=v,obj.text=v,obj.background='blue',obj.top=100,obj.color='#fff';
    if(typeof v==='string')obj.data=v,obj.text=v,obj.background='green',obj.top=100,obj.color='#000';
    return obj
}