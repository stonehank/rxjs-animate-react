let state;

 state={
    pageStatus:{
        showMarble:false,
        showCode:false,
        startMarble:false,
        startResult:false,
    },
    marble:{
        marbleSetting:{
            line:2,
            minGapTime:100,
            //adjustTime:0,
            curOperator:''
        },
        line1:{
            1:{id:1,dataType:'num',value:'5',left:0,top:0,data:'5'},
            2:{id:2,dataType:'num',value:'8',left:0,top:0,data:'8'}
        },
        line2:{
            1:{id:1,dataType:'ev',value:'ev',left:0,top:0,data:'{x:1}'}
        }
    },
    result:'',
    content:{
        concat:{
            name:'concat',
            title:'2、concatAll:将高阶observable(类似obs$.map(obs2$))转换成一阶observable',
            caption:'',
            code:`   let obs$,obs2$,count,unSub;
            obs$ = Rx.Observable.fromEvent(document,'click').take(3);
            obs2$ = Rx.Observable.interval(1000).take(3);
            count = obs$.concat(obs2$);
            unSub=count.subscribe(v=>log(v,i))`
        }
    }

}