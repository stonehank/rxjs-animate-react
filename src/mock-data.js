import { Subscriber} from 'rxjs/Subscriber';
import {changeStatus} from './tools'
let count = 0
let _deepList = []

// export const initSmallScreen=checkIsPhone() || checkScreen();
export const EACHLINEGAP=30
export const distanceEachSec=50

/**
 * 此处为 Rx.Subscriber 底下的三个命令进行添加，为了能精确显示当前状态
 * @param addFunc
 * @param status
 * @returns {Function}
 */

Function.prototype.addBefore=function(addFunc,status){
    let _thisFunc=this;
    return function(force){
        addFunc.call(this,status,force)
        _thisFunc.call(this,status)
    }
}

function addCEUStatus(){
    Subscriber.prototype.complete=Subscriber.prototype.complete.addBefore(changeStatus,'complete')
    Subscriber.prototype.error=Subscriber.prototype.error.addBefore(changeStatus,'error')
    Subscriber.prototype.unsubscribe=Subscriber.prototype.unsubscribe.addBefore(changeStatus,'unsubscribe')
}
addCEUStatus()

export const shallowList = [
    {shallowTitle: '全部(按字母顺序)', sort: 'name', pathname: 'operators', notShowChild: true},
    {shallowTitle: '按点击量排序', sort: 'hits', pathname: 'hits'},
    {shallowTitle: '按常用程度排序', sort: 'useful', pathname: 'useful'}
];

export const EDITRULES=`
/*1、所有需要显示的发射源命名必须以'Rx'开头，例如：let RxInterval，如果写成let interval$，则不会在选择面板中显示*/
/*2、建议第一行为命名所有变量，例如：let RxOf,RxTimer,RxFrom...*/
/*3、每一行语句结束处必须添加分号";"*/
/*4、代码修改尽量在'//editArea'内部，再去选择面板上操作*/
/*5、自动订阅功能：选择开启,则会按照代码中定义发射源变量(let RxXX,RxXX...)的顺序，自动subscribe所有Marble上的发射源和Result上的最后一个发射源，选择关闭，则不对代码进行操作；默认开启*/
`
/*
 * subscriber编写规则：
 * 一、Subscription命名：
 * 选择发射源要显示的对应位置，例如：
 * let RxClick;
 * 显示在Marble中：marSub.RxClick=...
 * 显示在Result中：resSub.RxClick=...
 *
 *
 * 二、subscriber()回调：
 * 使用NEC方法创建回调：
 * NEC方法包含了3种状态的回调(next,error,complete)
 * 参数1 表示要显示位置的方法
 * 参数2 表示要显示的行数
 * 例如：
 * RxClick 需要订阅并且在Marble中第1行订阅：...RxClick.subscriber(NEC(showInMar,1));
 * RxClick 需要订阅并且在Marble中最后1行订阅：...RxClick.subscriber(NEC(showInMar,'last'));
 * RxClick 需要订阅并且在Result中订阅：...RxClick.subscriber(NEC(showInRes));
 *
 * 三、代码结尾以分号(;)结尾
 */


/*


 * */




export const Data = [
  {
    name: '测试性能',
    title: '测试性能',
    gfsm: '三行同时刷出小球 timer(0,30)',
    czsm:'点击开始即可。',
    cclj:'',
    tbzy:'',
    hits: 0,
    useful: 0,
    doNotNeedAuto:true,
    //line: 3,
    marbleText: '测试性能',
    code: `

    //editArea

    let RxTimer1,RxTimer2,RxTimer3;
    RxTimer1 = Rx.Observable.timer(0,30).take(100);
    RxTimer2 = Rx.Observable.timer(0,30).take(100);
    RxTimer3 = Rx.Observable.timer(0,30).take(100);
    //editArea
    let initTime=new Date().getTime();
    marSub.RxTimer1 = RxTimer1.subscribe(NEC(showInMar, 1));
    marSub.RxTimer2 = RxTimer2.subscribe(NEC(showInMar, 2));
    marSub.RxTimer3 = RxTimer3.subscribe((v)=> {showInMar(v, 3)},()=> {},()=> {showInMar('complete', 3);alert('耗时(毫秒):'+(new Date().getTime()-initTime))});

         `},
    {
        name: 'throw',
        title: 'throw(error: any, scheduler: Scheduler): Observable',

        gfsm:`
        创建一个不发送数据给观察者并且立马发出错误通知的 Observable。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        当interval$的数字为5时，抛出错误。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Creation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'throw()',
        code: `

    //editArea

    let RxMergeMapThrow, interval$ ,throw$;
    interval$ = Rx.Observable.interval(1000);
    throw$=Rx.Observable.throw();
    RxMergeMapThrow = interval$.mergeMap(n=>n===5 ? throw$: Rx.Observable.of(n));
   
    //editArea

    marSub.RxMergeMapThrow=RxMergeMapThrow.subscribe(NEC(showInMar,'last'));
    resSub.RxMergeMapThrow=RxMergeMapThrow.subscribe(NEC(showInRes));

         `},
   
    {
        name: 'withLatestFrom',
        title: 'withLatestFrom(other: ObservableInput, project: Function): Observable',

        gfsm:`
        结合源 Observable 和另外的 Observables 以创建新的 Observable， 该 Observable 的值由每 个 Observable 最新的值计算得出，当且仅当源发出的时候。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        外发射源 每1秒发射值，内发射源1 每1.5秒发射值，内发射源2 每3秒发射值，结合所有发射源最新值，并且将发射的值传递给project(最后的参数)，进行计算。
        `,
        tbzy:`
        首先会等所有源都已经发射值，再开始结合。如果不传参数，结果以数组合并每个发射源的值。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'withLatestFrom()',
        code: `


    //editArea

    let RxInterval1,RxInterval2, RxInterval3,RxWithLatestF;
    RxInterval1 = Rx.Observable.interval(1000).take(7);
    RxInterval2 = Rx.Observable.interval(1500).take(5);
    RxInterval3 = Rx.Observable.interval(3000).take(2);
    RxWithLatestF= RxInterval1.withLatestFrom(RxInterval2,RxInterval3,(x,y,z)=>x+y+z);
   
    //editArea

    marSub.RxInterval1=RxInterval1.subscribe(NEC(showInMar,1));
    marSub.RxInterval2=RxInterval2.subscribe(NEC(showInMar,2));
    marSub.RxInterval3=RxInterval3.subscribe(NEC(showInMar,3));
    marSub.RxWithLatestF=RxWithLatestF.subscribe(NEC(showInMar,'last'));
    resSub.RxWithLatestF=RxWithLatestF.subscribe(NEC(showInRes));

         `},
    {
        name: 'windowWhen',
        title: 'windowWhen(closingSelector: function(): Observable): Observable<Observable<T>>',
        
        gfsm:`
        将将源 Observable 的值分支成嵌套的 Observable ，通过使用关闭 Observable 的工厂函数来决定何时开启新的窗口。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        closingSelector(参数1)是一个通知关闭嵌套窗口的function，返回一个Observable。<br>
        这里每次click就会关闭之前的嵌套窗口并且立刻开启新窗口，每隔新窗口最多接受2个值(take(2))。<br>
        第1行是RxInterval发射源。<br>   
        第2行是click事件发射源。<br>
        第3行是每次click关闭之前的窗口，并且开启新窗口。<br>
        第4行是mergeAll打平，每个新窗口最多发射2个值。
        `,
        tbzy:`
        第3行是直接通过window输出的是高阶Observable。可以对比bufferWhen查看。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'windowWhen()',
        code: `


    //editArea

    let RxInterval,RxClick,RxWindowWhen,RxMergeAll;
    RxInterval = Rx.Observable.interval(1000).take(10);
    RxClick = Rx.Observable.fromEvent(document,'click').take(12);
    RxWindowWhen= RxInterval.windowWhen(()=>RxClick);
    RxMergeAll=RxWindowWhen.mergeMap(obs=>obs.take(2));
    
    //editArea

    marSub.RxInterval=RxInterval.subscribe(NEC(showInMar,1));
    marSub.RxClick=RxClick.subscribe(NEC(showInMar,2));
    marSub.RxWindowWhen=RxWindowWhen.subscribe(NEC(showInMar,3));
    marSub.RxMergeAll=RxMergeAll.subscribe(NEC(showInMar,'last'));
    resSub.RxWindowWhen=RxWindowWhen.subscribe(NEC(showInRes));

         `},
    {
        name: 'windowToggle',
        title: 'windowToggle(openings: Observable<O>, closingSelector: function(value: O): Observable): Observable<Observable<T>>',

        gfsm:`
        将源 Observable 的值分支成嵌套的 Observable，分支策略是以 openings 发出项为起始，以 closingSelector 发出为结束。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        openings(参数1)是通知打开新嵌套窗口的Observable，这里每隔2秒打开一个新嵌套窗口<br>
        closingSelector(参数2)接受openings的返回值，是一个通知关闭嵌套窗口的Observable。<br>
        这里如果RxInterval得值是奇数，1秒后关闭新窗口；如果RxInterval的值是偶数，发出empty(立刻关闭新窗口)。<br>
        第1行是click事件发射源。<br>
        第2行是RxInterval发射源。<br>
        第3行是每隔2秒开启一个新的嵌套窗口，并且奇数时隔1秒关闭窗口。<br>
        第4行是mergeAll打平，当显示奇数时，下一秒的click事件会被发射。
        `,
        tbzy:`
        第3行是直接通过window输出的是高阶Observable。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'windowToggle()',
        code: `


    //editArea

    let RxClick,RxInterval,RxWindowCount,RxMergeAll,interval$,empty$;
    interval$=Rx.Observable.interval(1000);
    empty$= Rx.Observable.empty();
    RxClick=Rx.Observable.fromEvent(document, 'click').take(12);
    RxInterval=Rx.Observable.interval(2000).take(4);
    RxWindowCount=RxClick.windowToggle(RxInterval,i=>i % 2 ? interval$ : empty$);
    RxMergeAll=RxWindowCount.mergeAll();
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));  
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 2));  
    marSub.RxWindowCount = RxWindowCount.subscribe(NEC(showInMar, 3));
    marSub.RxMergeAll = RxMergeAll.subscribe(NEC(showInMar, 'last'));
    resSub.RxWindowCount = RxWindowCount.subscribe(NEC(showInRes));

         `},
    {
        name: 'windowCount',
        title: 'windowCount(windowSize: number, startWindowEvery: number): Observable<Observable<T>>',

        gfsm:`
        将源 Observable 的值分支成多个嵌套的 Observable ，每个嵌套的 Observable 最多发出 windowSize 个值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        第2行是在起始处立即开启新窗口，并且外部发射源每输出5个值，开启新窗口，这个窗口能嵌套最多2个值。<br>
        第3行是mergeAll打平，每点击5次，只显示最早的2次。
        `,
        tbzy:`
        第2行是直接通过window输出的是高阶Observable。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'windowCount()',
        code: `

    //editArea

    let RxClick,RxWindowCount,RxMergeAll;
    RxClick=Rx.Observable.fromEvent(document, 'click');
    RxWindowCount=RxClick.windowCount(2, 5);
    RxMergeAll=RxWindowCount.mergeAll();
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));  
    marSub.RxWindowCount = RxWindowCount.subscribe(NEC(showInMar, 2));
    marSub.RxMergeAll = RxMergeAll.subscribe(NEC(showInMar, 'last'));
    resSub.RxWindowCount = RxWindowCount.subscribe(NEC(showInRes));

         `},
    {
        name: 'window',
        title: 'window(windowBoundaries: Observable<any>): Observable<Observable<T>>',

        gfsm:`
        每当 windowBoundaries 发出项时，将源 Observable 的值分支成嵌套的 Observable 。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        每当内部源发射值时，将RxClick变成高阶Observable(第2行)，然后这里通过mergeMap打平(第3行)，并且每2秒最多发射2次click事件。
        `,
        tbzy:`
        第2行是直接通过window输出的是高阶Observable。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'window()',
        code: `

    //editArea

    let interval$,RxClick,RxWindow,RxMergeMap;
    interval$=Rx.Observable.interval(2000);
    RxClick=Rx.Observable.fromEvent(document, 'click');
    RxWindow=RxClick.window(interval$);
    RxMergeMap=RxWindow.mergeMap(obs=>obs.take(2));
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));  
    marSub.RxWindow = RxWindow.subscribe(NEC(showInMar, 2));
    marSub.RxMergeMap = RxMergeMap.subscribe(NEC(showInMar, 'last'));
    resSub.RxWindow = RxWindow.subscribe(NEC(showInRes));

         `},
    {
        name: 'timeInterval',
        title: 'timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>',

        gfsm:`
        无。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        计时操作符，每次返回发射的值和时间间隔。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Utility Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'timeInterval()',
        code: `

    //editArea

    let RxInterval,RxTimeInterval;
    RxInterval=Rx.Observable.interval(500).take(4);
    RxTimeInterval=RxInterval.timeInterval();
    
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTimeInterval = RxTimeInterval.subscribe(NEC(showInMar, 'last'));
    resSub.RxTimeInterval = RxTimeInterval.subscribe(NEC(showInRes));

         `},
     {
        name: 'takeLast',
        title: 'takeLast(count: number): Observable<T>',

        gfsm:`
        只发出源 Observable 最后发出的的N个值 (N = count)
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        发射源完成时，一次性发出最后2个值(2,3)。
        `,
        tbzy:`
        必须等待发射源完成的时候一次性同步发出，如果参数count大于发射源值的数量，则全部发出。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'takeLast()',
        code: `

    //editArea

    let RxInterval,RxTake;
    RxInterval=Rx.Observable.interval(1000).take(4);
    RxTake=RxInterval.takeLast(2);
    
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTake = RxTake.subscribe(NEC(showInMar, 'last'));
    resSub.RxTake = RxTake.subscribe(NEC(showInRes));

         `},
    {
        name: 'take',
        title: 'take(count: number): Observable<T>',

        gfsm:`
        只发出源 Observable 最初发出的的N个值 (N = count)。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        只发出前2个发射值。
        `,
        tbzy:`
        如果参数count大于发射源值的数量，则全部发出。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'take()',
        code: `

    //editArea

    let RxInterval,RxTake;
    RxInterval=Rx.Observable.interval(1000).take(4);
    RxTake=RxInterval.take(2);
    
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTake = RxTake.subscribe(NEC(showInMar, 'last'));
    resSub.RxTake = RxTake.subscribe(NEC(showInRes));

         `},
    {
        name: 'switchMapTo',
        title: 'switchMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable',

        gfsm:`
        将每个源值投射成同一个 Observable ，该 Observable 会使用 switch 多次被打平 到输出 Observable 中。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        每次click，会触发一个新的interval$，如果触发之前已经存在interval$，则会先取消订阅原来的interval$，再订阅新的interval$。
        `,
        tbzy:`
        与switchMap相比，内部源是同一个，不会因外部源数值变化而变化(不是function)。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'switchMapTo()',
        code: `

    //editArea

    let RxClick,interval$,RxSwitchMapTo;
    RxClick=Rx.Observable.fromEvent(document,'click').take(5);
    interval$=Rx.Observable.interval(1000).take(4);
    RxSwitchMapTo=RxClick.switchMapTo(interval$);
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxSwitchMapTo = RxSwitchMapTo.subscribe(NEC(showInMar, 'last'));
    resSub.RxSwitchMapTo = RxSwitchMapTo.subscribe(NEC(showInRes));

         `},
    {
        name: 'switchMap',
        title: 'switchMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable',

        gfsm:`
        将每个源值投射成 Observable，该 Observable 会合并到输出 Observable 中， 并且只发出最新投射的 Observable 中的值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        每次click，会触发一个新的interval$，如果触发之前已经存在interval$，则会先取消订阅原来的interval$，再订阅新的interval$。
        `,
        tbzy:`
        其实就是先map，再switch（和switch查看比较）。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'switchMap()',
        code: `

    //editArea

    let RxClick,interval$,RxSwitchMap;
    RxClick=Rx.Observable.fromEvent(document,'click').take(5);
    interval$=Rx.Observable.interval(1000).take(4);
    RxSwitchMap=RxClick.switchMap(n=>interval$);
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxSwitchMap = RxSwitchMap.subscribe(NEC(showInMar, 'last'));
    resSub.RxSwitchMap = RxSwitchMap.subscribe(NEC(showInRes));

         `},
     {
        name: 'switch',
        title: 'switch(): Observable<T>',

        gfsm:`
        通过只订阅最新发出的内部 Observable ，将高阶 Observable 转换成一阶 Observable 。
        `,
         czsm:`
        点击开始后，使用click触发。
        `,
         cclj:`
        每次click，会触发一个新的interval$，如果触发之前已经存在interval$，则会先取消订阅原来的interval$，再订阅新的interval$。
        `,
        tbzy:`
        switch会将高阶发射源打平。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'switch()',
        code: `

    //editArea

    let RxClick,interval$,RxSwitch;
    RxClick=Rx.Observable.fromEvent(document,'click').take(5);
    interval$=Rx.Observable.interval(1000).take(4);
    RxSwitch=RxClick.map(n=>interval$).switch();
    
    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxSwitch = RxSwitch.subscribe(NEC(showInMar, 'last'));
    resSub.RxSwitch = RxSwitch.subscribe(NEC(showInRes));

         `},
    {
        name: 'subscribeOn',
        title: 'subscribeOn(scheduler: Scheduler): Observable<T>',

        gfsm:`
        使用指定的 IScheduler 异步地订阅此 Observable 的观察者。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        第一行的from$未使用scheduler，同步执行，结果是13。<br>
        第二行的fromSubOn$使用了asap的scheduler，异步执行，结果是12和13。
        `,
        tbzy:`
        更多scheduler属性看<a href='https://cn.rx.js.org/typedef/index.html#static-typedef-Rx.Scheduler'>这里</a>。
        `,
        hits: 152,
        useful: 562,
        categories:'Utility Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'subscribeOn()',
        code: `

    //editArea

    let from$,of$,fromSubOn$,RxComLat,RxComLatSub;
    from$=Rx.Observable.from([10,11]);
    of$=Rx.Observable.of(2);
    fromSubOn$=from$.subscribeOn(Rx.Scheduler.asap);
    RxComLat=Rx.Observable.combineLatest(from$,of$,(a,b)=>a+b)
    RxComLatSub=Rx.Observable.combineLatest(fromSubOn$,of$,(a,b)=>a+b)
    
    //editArea

    marSub.RxComLat = RxComLat.subscribe(NEC(showInMar, 1));
    marSub.RxComLatSub = RxComLatSub.subscribe(NEC(showInMar, 'last'));
    resSub.RxComLat = RxComLat.subscribe(NEC(showInRes));
    resSub.RxComLatSub = RxComLatSub.subscribe(NEC(showInRes));

         `},
       {
        name: 'startWith',
        title: 'startWith(values: ...T, scheduler: Scheduler): Observable',

        gfsm:`
        返回的 Observable 会先发出作为参数指定的项，然后再发出由源 Observable 所发出的项。
        `,
           czsm:`
        点击开始即可。
        `,
           cclj:`
        先发出指定项，此处先发出'a'。
        `,
        tbzy:`
        predicate必须写，否则会发出error。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'startWith()',
        code: `

    //editArea

    let interval$,RxStartWith;
    interval$=Rx.Observable.interval(1000).take(4);
    RxStartWith=interval$.startWith('a');
    //editArea

    marSub.RxStartWith = RxStartWith.subscribe(NEC(showInMar, 'last'));
    resSub.RxStartWith = RxStartWith.subscribe(NEC(showInRes));

         `},
    {
        name: 'skipWhile',
        title: 'skipWhile(predicate: Function): Observable<T>',

        gfsm:`
        返回一个 Observable， 该 Observable 会跳过由源 Observable 发出的所有满足指定条件的数据项， 但是一旦出现了不满足条件的项，则发出在此之后的所有项。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        忽略符合predicate条件的所有发射值，此处忽略小于3的发射值。
        `,
        tbzy:`
        predicate必须写，否则会发出error。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'skipWhile()',
        code: `

    //editArea

    let RxInterval,RxSkipWhile;
    RxInterval=Rx.Observable.interval(1000).take(5);
    RxSkipWhile=RxInterval.skipWhile(n=>n<3);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxSkipWhile = RxSkipWhile.subscribe(NEC(showInMar, 'last'));
    resSub.RxSkipWhile = RxSkipWhile.subscribe(NEC(showInRes));

         `},
    {
        name: 'skipUntil',
        title: 'skipUntil(notifier: Observable): Observable<T>',

        gfsm:`
        返回一个 Observable，该 Observable 会跳过源 Observable 发出的值直到第二个 Observable 开始发送。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        忽略初始发射源，直到内部发射源发出值。
        `,
        tbzy:`
        无`,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'skipUntil()',
        code: `

    //editArea

    let RxInterval,RxOf,RxSkipUntil;
    RxInterval=Rx.Observable.interval(1000).take(5);
    RxOf=Rx.Observable.of('跳').delay(3500);
    RxSkipUntil=RxInterval.skipUntil(RxOf);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 2));
    marSub.RxSkipUntil = RxSkipUntil.subscribe(NEC(showInMar, 'last'));
    resSub.RxSkipUntil = RxSkipUntil.subscribe(NEC(showInRes));

         `},
    {
        name: 'skipLast',
        title: 'skipLast(count: number): Observable<T>',

        gfsm:`
        跳过源 Observable 最后发出的的N个值 (N = count)。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        跳过最后2个值。
        `,
        tbzy:`
        会延迟最后N个值的时间，才(从头)开始发出。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'skipLast()',
        code: `

    //editArea

    let RxInterval,RxSkipLast;
    RxInterval=Rx.Observable.interval(500).take(5);
    RxSkipLast=RxInterval.skipLast(2);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxSkipLast = RxSkipLast.subscribe(NEC(showInMar, 'last'));
    resSub.RxSkipLast = RxSkipLast.subscribe(NEC(showInRes));

         `},
      {
        name: 'skip',
        title: 'skip(count: Number): Observable',

        gfsm:`
        返回一个 Observable， 该 Observable 跳过源 Observable 发出的前N个值(N = count)。
        `,
          czsm:`
        点击开始即可。
        `,
          cclj:`
        跳过前2个值。
        `,
        tbzy:`
        无`,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'skip()',
        code: `

    //editArea

    let RxInterval,RxSkip;
    RxInterval=Rx.Observable.interval(500).take(5);
    RxSkip=RxInterval.skip(2);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxSkip = RxSkip.subscribe(NEC(showInMar, 'last'));
    resSub.RxSkip = RxSkip.subscribe(NEC(showInRes));

         `},
    {
        name: 'single',
        title: 'single(predicate: Function): Observable<T>',

        gfsm:`
        该 Observable 发出源 Observable 所发出的值中匹配指定 predicate 函数的单个项。 如果源 Observable 发出多于1个数据项或者没有发出数据项, 分别以 IllegalArgumentException 和 NoSuchElementException 进行通知。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        如果无参数predicate，则如果发射源发出多于1项或者少于1项，会发出错误。如果有参数predicate，则会发出匹配的单项。
        `,
        tbzy:`
        无`,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'single()',
        code: `

    //editArea

    let RxInterval,RxSingle;
    RxInterval=Rx.Observable.interval(500).take(3);
    RxSingle=RxInterval.single(n=>n===1);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxSingle = RxSingle.subscribe(NEC(showInMar, 'last'));
    resSub.RxSingle = RxSingle.subscribe(NEC(showInRes));

         `},
         {
        name: 'shareReplay',
        title: 'shareReplay(bufferSize: *, windowTime: *, scheduler: *): *',

        gfsm:`
        无。
        `,
             czsm:`
        点击开始即可，需要拖拽查看。
        `,
             cclj:`
        共享数据，不过会先返回上一个发射源的前N(参数1，此处是2)个值。<br>
        此处前3行发射源是"shaReplay$"，后2行发射源是"shaReplay2$"。<br>
        第1行为立即订阅；<br>
        第2行隔2.5秒后订阅，订阅时第1行还在继续订阅，返回前2个数据(0,1)，数据共享；<br>
        第3行隔5秒订阅，此时之前发射源状态是complete，返回前2个数据(2,3)(并不受complete影响)，complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7.5秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8.5秒订阅，此时之前发射源状态是unsubscribe，返回前2个数据(0,1)(并不受unsubscribe影响)，共享数据；<br>
        <strong>结论:(和publishReplay.connect一致)</strong><br>
        <strong>共享数据，不过会先返回上一个发射源的前N个值；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong>
        `,
        tbzy:`
        需要拖拽查看，不管上一个源是什么状态(包括error)，都会先发出上一个源的最后N个值（如果数据共享，则发出共享的最后N个值）。
        `,
        hits: 152,
        useful: 562,
        categories:'',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'shareReplay()',
        code: `

    //editArea

    let RxShaRep1, RxShaRep2, RxShaRep3, RxShaRep4, RxShaRep5, interval$, shaReplay$, shaReplay2$;
    interval$ = Rx.Observable.interval(1000).take(4);
    shaReplay$=interval$.shareReplay(2);
    shaReplay2$=interval$.shareReplay(2);
    
    //editArea

    marSub.RxShaRep1 = shaReplay$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxShaRep2 = shaReplay$.subscribe(NEC(showInMar, 2))},2500);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxShaRep3 = shaReplay$.subscribe(NEC(showInMar, 3))},5000);
    marSub.RxTimeout3 = setTimeout(()=>{marSub.RxShaRep4 = shaReplay2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxShaRep4.unsubscribe()},7500);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxShaRep5 = shaReplay2$.subscribe(NEC(showInMar, 5))},8500);

         `},
    {
        name: 'sequenceEqual',
        title: 'sequenceEqual(compareTo: Observable, comparor: function): Observable',

        gfsm:`
        使用可选的比较函数，按顺序比较两个 Observables 的所有值，然后返回单个布尔值的 Observable， 以表示两个序列是否相等。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        此处比较用的是'==='，因此'{}'跟'{}'是不等的，第二个参数可以自己配置比较函数，这里先对比，不符合再对x项对比。
        `,
        tbzy:`
        如果其中一个 observable 永远不会完成或者在另一个完成后还发出数据， 返回的 observable 永远不会结束。
        `,
        hits: 152,
        useful: 562,
        categories:'',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'sequenceEqual()',
        code: `

    //editArea

    let RxFrom,RxOf,RxSeqEqual;
    RxFrom=Rx.Observable.from([1,2,3,{x:1}]);
    RxOf=Rx.Observable.of(1,2,3,{x:1});
    RxSeqEqual=RxFrom.sequenceEqual(RxOf,(a,b)=>a===b||a.x===b.x);
    //editArea

    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 2));
    marSub.RxSeqEqual = RxSeqEqual.subscribe(NEC(showInMar, 'last'));
    resSub.RxSeqEqual = RxSeqEqual.subscribe(NEC(showInRes));

         `},
    {
        name: 'sampleTime',
        title: 'sampleTime(period: number, scheduler: Scheduler): Observable<T>',

        gfsm:`
        在周期时间间隔内发出源 Observable 发出的最新值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        每隔N秒，发出发射源的最新值，只取一次数据<br>
        这里第1行是发射源，第2行间隔为1000ms，第3行间隔为30ms(实际就是发射源间隔600ms)。
        `,
        tbzy:`
        最小间隔就是发射源的发射间隔，必须要在另一个源正在发送时，才能获取到最新值，未开始发送或者complete后都无法获取。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'sampleTime()',
        code: `

    //editArea

    let RxInterval,RxSampleTime1,RxSampleTime2;
    RxInterval=Rx.Observable.interval(600).take(7);
    RxSampleTime1=RxInterval.sampleTime(1000);
    RxSampleTime2=RxInterval.sampleTime(30);
    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxSampleTime1 = RxSampleTime1.subscribe(NEC(showInMar, 2));
    marSub.RxSampleTime2 = RxSampleTime2.subscribe(NEC(showInMar, 'last'));
    resSub.RxSampleTime1 = RxSampleTime1.subscribe(NEC(showInRes));

         `},
     {
        name: 'sample',
        title: 'sample(notifier: Observable<any>): Observable<T>',

        gfsm:`
        发出源 Observable 最新发出的值当另一个 notifier Observable发送时。
        `,
         czsm:`
        点击开始后，使用click触发。
        `,
         cclj:`
        每次click，获取RxInterval的最新值。
        `,
        tbzy:`
        必须要在另一个源正在发送时，才能获取到最新值，未开始发送或者complete后都无法获取。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'sample()',
        code: `

    //editArea

    let RxInterval,RxClick,RxSample;
    RxInterval=Rx.Observable.interval(1000).take(6);
    RxClick=Rx.Observable.fromEvent(document, 'click').take(5);
    RxSample=RxInterval.sample(RxClick);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 2));
    marSub.RxSample = RxSample.subscribe(NEC(showInMar, 'last'));
    resSub.RxSample = RxSample.subscribe(NEC(showInRes));

         `},
     {
        name: 'retry',
        title: 'retry(count: number): Observable',

        gfsm:`
        返回一个 Observable， 该 Observable 是源 Observable 不包含错误异常的镜像。 如果源 Observable 发生错误, 这个方法不会传播错误而是会不 断的重新订阅源 Observable 直到达到最大重试次数 (由数字参数指定)。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        发出0的概率为100%，发出1的概率为80%，发出2的概率为40%，总共可以重试3次，完成则complete，失败则error。
        `,
        tbzy:`
        因为是Math.random，Marble和Result里的数据不一致。
        `,
        hits: 152,
        useful: 562,
        categories:'Error Handling Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'retry()',
        code: `

    //editArea

    let interval$,RxThrowORCom,RxRetry;
    interval$=Rx.Observable.interval(1000).take(3);
    RxThrowORCom=interval$.mergeMap(n=>(n*Math.random())>0.8?Rx.Observable.throw():Rx.Observable.of(n));
    RxRetry=RxThrowORCom.retry(3);

    //editArea
    marSub.RxRetry = RxRetry.subscribe(NEC(showInMar, 'last'));
    resSub.RxRetry = RxRetry.subscribe(NEC(showInRes));

         `},
    {
        name: 'repeat',
        title: 'repeat(count: number): Observable',

        gfsm:`
        返回的 Observable 重复由源 Observable 所发出的项的流，最多可以重复 count 次。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        重复3（参数）次。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Creation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'repeat()',
        code: `

    //editArea

    let RxInterval,RxRepeat;
    RxInterval=Rx.Observable.interval(500).take(3);
    RxRepeat=RxInterval.repeat(3);

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxRepeat = RxRepeat.subscribe(NEC(showInMar, 'last'));
    resSub.RxRepeat = RxRepeat.subscribe(NEC(showInRes));


         `},
    {
        name: 'race',
        title: 'race(): Observable',

        gfsm:`
        返回 Observable，该 Observable 是源 Observable 和提供的 Observables 的组合中 第一个发出项的 Observable 的镜像。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        第三行为race返回值，返回发出最快的发射源。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'race()',
        code: `

    //editArea

    let RxOfQ,RxOfS,RxRace;
    RxOfQ=Rx.Observable.of('快').delay(500);
    RxOfS=Rx.Observable.of('慢').delay(1000);
    RxRace=Rx.Observable.race(RxOfQ,RxOfS);

    //editArea
    marSub.RxOfQ = RxOfQ.subscribe(NEC(showInMar, 1));
    marSub.RxOfS = RxOfS.subscribe(NEC(showInMar, 2));
    marSub.RxRace = RxRace.subscribe(NEC(showInMar, 'last'));
    resSub.RxRace = RxRace.subscribe(NEC(showInRes));


         `},
    {
        name: 'publishLast',
        title: 'publishLast(): ConnectableObservable<T>',

        gfsm:`
        无。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        共享数据，只返回最后的值和complete，此处用的是connect()。<br>
        此处前2行发射源是"pubLast$"，后2行发射源是"pubLast2$"。<br>
        第1行为立即订阅,3秒后返回最后值和complete；<br>
        第2行隔4秒订阅，此时之前发射源状态是complete，返回最后值和complete；<br>
        第3行隔5秒重新订阅（新的发射源），并且在第6.5秒的时候unsubscribe，让它状态进入unsubscribe，没有返回值；<br>
        第4行隔7.5秒订阅，此时之前发射源状态是unsubscribe，返回最后值和complete。<br>
        <strong>结论：使用connect()</strong><br>
        <strong>共享数据，只返回最后的值和complete；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong><br>
        <strong>结论：使用refCount()</strong><br>
        <strong>共享数据，只返回最后的值和complete；前面数据complete，complete；前面数据unsubscribe，从头开始；前面数据error，error。</strong>
        `,
        tbzy:`
        不管上一个源是complete还是unsubscribe，直接返回最后值和complete，如果error则只返回error。
        `,
        hits: 152,
        useful: 562,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'publishLast()',
        code: `

    //editArea

    let RxPubLast1, RxPubLast2, RxPubLast3, RxPubLast4, interval$, pubLast$, pubLast2$;
    interval$ = Rx.Observable.interval(1000).take(3);
    pubLast$=interval$.publishLast();
    pubLast2$=interval$.publishLast();
    
    //editArea

    pubLast$.connect();
    marSub.RxPubLast1 = pubLast$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxPubLast2 = pubLast$.subscribe(NEC(showInMar, 2))},4000);
    marSub.RxTimeout3 = setTimeout(()=>{pubLast2$.connect();marSub.RxPubLast3 = pubLast2$.subscribe(NEC(showInMar, 3))},5000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxPubLast3.unsubscribe()},6500);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxPubLast4 = pubLast2$.subscribe(NEC(showInMar, 'last'))},7500);

         `},
      {
        name: 'publishReplay',
        title: 'publishReplay(bufferSize: *, windowTime: *, scheduler: *): ConnectableObservable<T>',

        gfsm:`
        无。
        `,
          czsm:`
        点击开始即可。
        `,
          cclj:`
        共享数据，不过会先返回上一个发射源的前N(参数1，此处是2)个值，此处用的是connect()。<br>
        此处前3行发射源是"pubReplay$"，后2行发射源是"pubReplay2$"。<br>
        第1行为立即订阅；<br>
        第2行隔2.5秒后订阅，订阅时第1行还在继续订阅，返回前2个数据(0,1)，数据共享；<br>
        第3行隔5秒订阅，此时之前发射源状态是complete，返回前2个数据(2,3)(并不受complete影响)，complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7.5秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8.5秒订阅，此时之前发射源状态是unsubscribe，返回前2个数据(0,1)(并不受unsubscribe影响)，共享数据；<br>
        <strong>结论：使用connect()</strong><br>
        <strong>共享数据，会先返回上一个发射源的前N个值；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong><br>
        <strong>结论：使用refCount()</strong><br>
        <strong>共享数据，会先返回上一个发射源的前N个值；前面数据complete，complete；前面数据unsubscribe，从头开始；前面数据error，error。</strong>
        `,
        tbzy:`
        需要拖拽查看，不管上一个源是什么状态(包括error)，都会先发出上一个源的最后N个值（如果数据共享，则发出共享的最后N个值）。
        `,
        hits: 152,
        useful: 562,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'publishReplay()',
        code: `

    //editArea

    let RxPubRep1, RxPubRep2, RxPubRep3, RxPubRep4, RxPubRep5, interval$, pubReplay$, pubReplay2$;
    interval$ = Rx.Observable.interval(1000).take(4);
    pubReplay$=interval$.publishReplay(2);
    pubReplay2$=interval$.publishReplay(2);
    
    //editArea

    pubReplay$.connect();
    marSub.RxPubRep1 = pubReplay$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxPubRep2 = pubReplay$.subscribe(NEC(showInMar, 2))},2500);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxPubRep3 = pubReplay$.subscribe(NEC(showInMar, 3))},5000);
    marSub.RxTimeout3 = setTimeout(()=>{pubReplay2$.connect();marSub.RxPubRep4 = pubReplay2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxPubRep4.unsubscribe()},7500);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxPubRep5 = pubReplay2$.subscribe(NEC(showInMar, 5))},8500);

         `},
    {
        name: 'publishBehavior',
        title: 'publishBehavior(value: *): ConnectableObservable<T>',

        gfsm:`
        无。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        共享数据，不过会先返回上一个发射源的最新值，此处用的是connect()。<br>
        此处前3行发射源是"pubBehavior$"，后2行发射源是"pubBehavior2$"。<br>
        第1行为立即订阅；<br>
        第2行隔2.5秒后订阅，订阅时第1行还在继续订阅，返回上一个最新值1，数据共享；<br>
        第3行隔5秒订阅，此时之前发射源状态是complete，不返回上一个最新值，直接进入complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7.5秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8.5秒订阅，此时之前发射源状态是unsubscribe，返回上一个最新值1(并不受unsubscribe影响)，共享数据；<br>
        <strong>结论：使用connect()</strong><br>
        <strong>共享数据，先返回上一个发射源的最新值；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong><br>
        <strong>结论：使用refCount()</strong><br>
        <strong>共享数据，先返回上一个发射源的最新值；前面数据complete，complete；前面数据unsubscribe，从头开始；前面数据error，error。</strong>
        `,
        tbzy:`
        上一个源是complete，直接进入complete；上一个源是unsubscribe，也会先发出上一个源的最新值(如果数据共享，则发出共享的最新值)，上一个源是error，返回error(不返回最新值)。
        `,
        hits: 152,
        useful: 562,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'publishBehavior()',
        code: `

    //editArea

    let RxPubBehav1, RxPubBehav2, RxPubBehav3, RxPubBehav4, RxPubBehav5, interval$, pubBehavior$, pubBehavior2$;
    interval$ = Rx.Observable.interval(1000).take(4);
    pubBehavior$=interval$.publishBehavior('一');
    pubBehavior2$=interval$.publishBehavior('二');
    
    //editArea

    pubBehavior$.connect();
    marSub.RxPubBehav1 = pubBehavior$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxPubBehav2 = pubBehavior$.subscribe(NEC(showInMar, 2))},2500);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxPubBehav3 = pubBehavior$.subscribe(NEC(showInMar, 3))},5000);
    marSub.RxTimeout3 = setTimeout(()=>{pubBehavior2$.connect();marSub.RxPubBehav4 = pubBehavior2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxPubBehav4.unsubscribe()},7500);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxPubBehav5 = pubBehavior2$.subscribe(NEC(showInMar, 5))},8500);

         `},

    {
        name: 'min',
        title: 'min(comparer: Function): Observable<R>',

        gfsm:`
        min 操作符操作的 Observable 发出数字(或可以使用提供函数进行比较的项)并且当源 Observable 完成时它发出单一项：
        最小值的项。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        无比较函数则返回最小值，有比较函数则根据比较函数来返回(大于返回1，小于返回-1)。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Mathematical and Aggregate Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'min()',
        code: `

    //editArea

    let RxOf, RxMin;
    RxOf=Rx.Observable.of({age: 7, name: 'Foo'},
                        {age: 5, name: 'Bar'},
                        {age: 9, name: 'Beer'});
    RxMin=RxOf.min((a,b)=>a.age>b.age ? 1 : -1);

    //editArea
    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 1));
    marSub.RxMin = RxMin.subscribe(NEC(showInMar, 'last'));
    resSub.RxMin = RxMin.subscribe(NEC(showInRes));


         `},
    {
        name: 'max',
        title: 'max(comparer: Function): Observable',

        gfsm:`
        max 操作符操作的 Observable 发出数字(或可以与提供的函数进行比较的项)并且当源 Observable 完成时它发出单一项：
        最大值的项。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        无比较函数则返回最大值，有比较函数则根据比较函数来返回(大于返回1，小于返回-1)。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Mathematical and Aggregate Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'max()',
        code: `

    //editArea

    let RxOf, RxMax;
    RxOf=Rx.Observable.of({age: 7, name: 'Foo'},
                        {age: 5, name: 'Bar'},
                        {age: 9, name: 'Beer'});
    RxMax=RxOf.max((a,b)=>a.age>b.age ? 1 : -1);

    //editArea
    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 1));
    marSub.RxMax = RxMax.subscribe(NEC(showInMar, 'last'));
    resSub.RxMax = RxMax.subscribe(NEC(showInRes));


         `},
    {
        name: 'dematerialize',
        title: 'dematerialize(): Observable',

        gfsm:`
        将 Notification 对象的 Observable 转换成它们所代表的发送。
        `,
        czsm:`
        点击开始即可，需要拖拽查看。
        `,
        cclj:`
        将 Notification 对象拆开成实际的 next、 error 和 complete 发送。
        kind：'N'代表next，'C'代表complete，'E'代表error。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Utility Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'dematerialize()',
        code: `


    //editArea

    let notifA$, notifB$,notifE$,RxOf,RxDematerialize;
    notifA$ = new Rx.Notification('N', 'A');
    notifB$ = new Rx.Notification('N', 'B');
    notifE$ = new Rx.Notification('E', 0, new TypeError('error'));
    RxOf=Rx.Observable.of(notifA$, notifB$,notifE$);
    RxDematerialize=RxOf.dematerialize();

    //editArea
    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 1));
    marSub.RxDematerialize = RxDematerialize.subscribe(NEC(showInMar, 'last'));
    resSub.RxDematerialize = RxDematerialize.subscribe(NEC(showInRes));


         `},
    {
        name: 'materialize',
        title: 'materialize(): Observable<Notification<T>>',

        gfsm:`
        表示源 Observable 中的所有通知，每个通知都会在 Notification 对象中标记为 它们原始的通知类型，并会作为输出 Observable 的 next 通知。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        返回 Notification对象：{kind: "N", value: "0", error: undefined, hasValue: true}<br>
                  kind：'N'代表next，'C'代表complete，'E'代表error。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Utility Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'materialize()',
        code: `

    //editArea

    let RxInterval, RxMapTo;
    RxInterval=Rx.Observable.interval(1000).take(3);
    RxMapTo=RxInterval.materialize();

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxMapTo = RxMapTo.subscribe(NEC(showInMar, 'last'));
    resSub.RxMapTo = RxMapTo.subscribe(NEC(showInRes));


         `},
    {
        name: 'mapTo',
        title: 'mapTo(value: any): Observable',

        gfsm:`
        每次源 Observble 发出值时，都在输出 Observable 上发出给定的常量值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        收到任何发射源值，都转换成'a'。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'mapTo()',
        code: `

    //editArea

    let RxInterval, RxMapTo;
    RxInterval=Rx.Observable.interval(1000).take(5);
    RxMapTo=RxInterval.mapTo('a');

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxMapTo = RxMapTo.subscribe(NEC(showInMar, 'last'));
    resSub.RxMapTo = RxMapTo.subscribe(NEC(showInRes));


         `},
     {
        name: 'map',
        title: 'map(project: function(value: T, index: number): R, thisArg: any): Observable<R>',

        gfsm:`
        将给定的 project 函数应用于源 Observable 发出的每个值，并将结果值作为 Observable 发出。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        将发射源每个值乘以2，再返回。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'map()',
        code: `

    //editArea

    let RxInterval, RxMap;
    RxInterval=Rx.Observable.interval(1000).take(5);
    RxMap=RxInterval.map(x=>x*2);

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxMap = RxMap.subscribe(NEC(showInMar, 'last'));
    resSub.RxMap = RxMap.subscribe(NEC(showInRes));


         `},
    {
        name: 'last',
        title: 'last(predicate: function): Observable',

        gfsm:`
        返回的 Observable 只发出由源 Observable 发出的最后一个值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        满足参数predicate的最后一个发射值,发射最后一个奇数。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'last()',
        code: `

    //editArea

    let RxInterval, RxLast;
    RxInterval=Rx.Observable.interval(1000).take(5);
    RxLast=RxInterval.last(x=>x % 2===1);

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxLast = RxLast.subscribe(NEC(showInMar, 'last'));
    resSub.RxLast = RxLast.subscribe(NEC(showInRes));


         `},
    {
        name: 'ignoreElements',
        title: 'ignoreElements(): Observable',

        gfsm:`
        忽略源 Observable 所发送的所有项，只传递 complete 或 error 的调用。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        无。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'ignoreElements()',
        code: `

    //editArea


    let RxInterval, RxIgnoreElements;
    RxInterval=Rx.Observable.interval(1000).take(4);
    RxIgnoreElements=RxInterval.ignoreElements();

    //editArea
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxIgnoreElements = RxIgnoreElements.subscribe(NEC(showInMar, 'last'));
    resSub.RxIgnoreElements = RxIgnoreElements.subscribe(NEC(showInRes));


         `},
     {
        name: 'isEmpty',
        title: 'isEmpty(): Observable',

        gfsm:`
        如果源 Observable 是空的话，它返回一个发出 true 的 Observable，否则发出 false 。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        of$返回false，empty$返回true。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Conditional and Boolean Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'isEmpty()',
        code: `

    //editArea


    let of$, empty$, RxOfIsEmpty, RxEmptyIsEmpty;
    of$ = Rx.Observable.of(1); 
    empty$=Rx.Observable.empty();
    RxOfIsEmpty=of$.isEmpty();
    RxEmptyIsEmpty=empty$.isEmpty();

    //editArea
    marSub.RxOfIsEmpty = RxOfIsEmpty.subscribe(NEC(showInMar, 1));
    marSub.RxEmptyIsEmpty = RxEmptyIsEmpty.subscribe(NEC(showInMar, 'last'));
    resSub.RxOfIsEmpty = RxOfIsEmpty.subscribe(NEC(showInRes));
    resSub.RxEmptyIsEmpty = RxEmptyIsEmpty.subscribe(NEC(showInRes));


         `},
    {
        name: 'interval',
        title: 'interval(period: number, scheduler: Scheduler): Observable',

        gfsm:`
        创建一个 Observable ，该 Observable 使用指定的 IScheduler ，并以指定时间间隔发出连续的数字。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        每秒发出一个递增数字，最多5次。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Creation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'interval()',
        code: `

    //editArea


    let RxInterval;
    RxInterval = Rx.Observable.interval(1000).take(5); 

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    resSub.RxInterval = RxInterval.subscribe(NEC(showInRes));


         `},
    {
        name: 'empty',
        title: 'empty(scheduler: Scheduler): Observable',

        gfsm:`
        创建一个什么数据都不发出并且立马完成的 Observable。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        仅仅发出 complete 通知，其他什么也不做。当遇到奇数是发射'奇'。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Creation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'empty()',
        code: `

    //editArea


    let RxInterval,empty$,RxOdd;
    RxInterval = Rx.Observable.interval(1000).take(5); 
    empty$=Rx.Observable.empty();
    RxOdd=RxInterval.mergeMap(x=>x%2===1?Rx.Observable.of('奇'):empty$);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxOdd = RxOdd.subscribe(NEC(showInMar, 'last'));
    resSub.RxOdd = RxOdd.subscribe(NEC(showInRes));


         `},
     {
        name: 'defer',
        title: 'defer(observableFactory: function(): SubscribableOrPromise): Observable',

        gfsm:`
        创建一个 Observable，当被订阅的时候，调用 Observable 工厂为每个观察者创建新的 Observable。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        当且仅当它被订阅的时候才创建。点击开始后计算随机数，随机数>0.5则订阅click事件，否则订阅interval。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Creation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'defer()',
        code: `

    //editArea

    let fromEvent$,interval$,RxDefer;
    interval$ = Rx.Observable.interval(1000).take(5); 
    fromEvent$ = Rx.Observable.fromEvent(document, 'click').take(3);
    RxDefer=Rx.Observable.defer(()=>Math.random()>0.5?fromEvent$:interval$);

    //editArea

    marSub.RxDefer = RxDefer.subscribe(NEC(showInMar, 'last'));
    resSub.RxDefer = RxDefer.subscribe(NEC(showInRes));


         `},
     {
        name: 'groupBy',
        title: 'groupBy(keySelector: function(value: T): K, elementSelector: function(value: T): R, durationSelector: function(grouped: GroupedObservable<K, R>): Observable<any>): Observable<GroupedObservable<K, R>>',

        gfsm:`
        根据指定条件将源 Observable 发出的值进行分组，并将这些分组作为 GroupedObservables 发出，每一个分组都是一个 GroupedObservable 。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        此处第一个函数返id的值(以此分割group)，第二个函数返回name的值；在reduce函数内，group$.key则为id的值，cur为name的值；<br>
        group1第一次reduce：acc为['1']，cur为'aze1'，返回['1','aze1']<br>
        group2第一次reduce：acc为['2']，cur为'sf2'，返回['2','sf2']<br>
        group2第二次reduce：acc为['2','sf2']，cur为'dg2'，返回['2','sf2','dg2']<br>
        group1第二次reduce：acc为['1','aze1']，cur为'erg1'，返回['1','aze1','erg1']<br>
        ...直到最后，此时<br>
        group1为['1','aze1','erg1','df1']<br>
        group2为['2','sf2','dg2','sfqfb2','qsgqsfg2']<br>
        group3为['3','qfs3']<br>
        再进行map，即可得出结果。
        `,
        tbzy:`
        第一个函数返回的是分割group的依据，使用group.key调用；第二个函数返回是需要的返回值，如果不写则返回整个对象。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'groupBy()',
        code: `

    //editArea
  
    let RxOf,RxGroupBy;
    RxOf = Rx.Observable.of({id: 1, name: 'aze1'},
                   {id: 2, name: 'sf2'},
                   {id: 2, name: 'dg2'},
                   {id: 1, name: 'erg1'},
                   {id: 1, name: 'df1'},
                   {id: 2, name: 'sfqfb2'},
                   {id: 3, name: 'qfs3'},
                   {id: 2, name: 'qsgqsfg2'});
    
    RxGroupBy = RxOf.groupBy(p => p.id,p=>p.name)
    .mergeMap((group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
    .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}));

    //editArea

    marSub.RxOf = RxOf.subscribe(NEC(showInMar, 1));
    marSub.RxGroupBy = RxGroupBy.subscribe(NEC(showInMar,2));
    resSub.RxGroupBy = RxGroupBy.subscribe(NEC(showInRes));


         `},
     {
        name: 'first',
        title: 'first(predicate: function(value: T, index: number, source: Observable<T>): boolean, resultSelector: function(value: T, index: number): R, defaultValue: R): Observable<T | R>',

        gfsm:`
        只发出由源 Observable 所发出的值中第一个(或第一个满足条件的值)。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        无参数则返回第一个发射的值，有参数则返回第一个符合条件的值(参考find)。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'first()',
        code: `

    //editArea
  
    let RxInterval,RxFirst;
    RxInterval = Rx.Observable.interval(1000).take(3); 
    RxFirst = RxInterval.first();

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxFirst = RxFirst.subscribe(NEC(showInMar, 'last'));
    resSub.RxFirst = RxFirst.subscribe(NEC(showInRes));


         `},
    {
        name: 'findIndex',
        title: 'findIndex(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable<T>',

        gfsm:`
        只发出源 Observable 所发出的值中第一个满足条件的值的索引。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        过滤出predicate返回值为true的值，只发出符合条件的第一个值的索引。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Conditional and Boolean Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'findIndex(n=>n%2===0)',
        code: `

    //editArea
  
    let RxInterval,RxFindIndex;
    RxInterval = Rx.Observable.interval(1000).take(7); 
    RxFindIndex = RxInterval.findIndex(n=>n%2===0);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxFindIndex = RxFindIndex.subscribe(NEC(showInMar, 'last'));
    resSub.RxFindIndex = RxFindIndex.subscribe(NEC(showInRes));


         `},
    {
        name: 'find',
        title: 'find(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable<T>',

        gfsm:`
        只发出源 Observable 所发出的值中第一个满足条件的值
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        过滤出predicate返回值为true的值，只发出符合条件的第一个值。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Conditional and Boolean Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'find(n=>n%2===0)',
        code: `

    //editArea
  
    let RxInterval,RxFind;
    RxInterval = Rx.Observable.interval(1000).take(7); 
    RxFind = RxInterval.find(n=>n%2===0);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxFind = RxFind.subscribe(NEC(showInMar, 'last'));
    resSub.RxFind = RxFind.subscribe(NEC(showInRes));


         `},
    {
        name: 'filter',
        title: 'filter(predicate: function(value: T, index: number): boolean, thisArg: any): Observable',

        gfsm:`
        通过只发送源 Observable 的中满足指定 predicate 函数的项来进行过滤。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        过滤出predicate返回值为true的值，组成新的发射源，此处过滤偶数。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Filtering Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'filter(n=>n%2===0)',
        code: `

    //editArea
  
    let RxInterval,RxFilter;
    RxInterval = Rx.Observable.interval(1000).take(7); 
    RxFilter = RxInterval.filter(n=>n%2===0);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxFilter = RxFilter.subscribe(NEC(showInMar, 'last'));
    resSub.RxFilter = RxFilter.subscribe(NEC(showInRes));


         `},
    {
        name: 'expand',
        title: 'expand(project: function(value: T, index: number), concurrent: number): Observable',

        gfsm:`
        递归地将每个源值投射成 Observable，这个 Observable 会被合并到输出 Observable 中。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        mapTo将click转换成数字1，传给project，project返回值是2*1，再将返回值递归传递给project，一直如此下去，此处最多递归10次。
        `,
        tbzy:`
        如果不设定次数限制，递归是无限的。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'expand()',
        code: `

    //editArea
  
    let of$,RxClick,RxExpand;
    RxClick = Rx.Observable.fromEvent(document,'click').mapTo(1).take(1); 
    of$= Rx.Observable.of(2).delay(1000);
    RxExpand = RxClick.expand(n=>of$.map(x=>x*n)).take(10);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxExpand = RxExpand.subscribe(NEC(showInMar, 'last'));
    resSub.RxExpand = RxExpand.subscribe(NEC(showInRes));


         `},
    
    {
        name: 'pluck',
        title: 'pluck(properties: ...string): Observable',

        gfsm:`
        将每个源值(对象)映射成它指定的嵌套属性。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        每次click将会获取目标('event.target.tagName')，返回新的Observable然后显示。
        `,
        tbzy:`
        如果嵌套属性无法找到，返回undefined。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'pluck()',
        code: `

    //editArea
  
    let RxClick, RxPluck;
    RxClick = Rx.Observable.fromEvent(document,'click').take(5);
    RxPluck = RxClick.pluck('target','tagName');

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxPluck = RxPluck.subscribe(NEC(showInMar, 'last'));
    resSub.RxPluck = RxPluck.subscribe(NEC(showInRes));


         `},
    {
        name: 'partition',
        title: 'partition(predicate: function(value: T, index: number): boolean, thisArg: any): [Observable<T>, Observable<T>]',

        gfsm:`
        将源 Observable 一分为二，一个是所有满足 predicate 函数的值，另一个是所有 不满足 predicate 的值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        这里partition$将发射源分为偶数和奇数，返回值是数组，数组内分别为偶数Observable和奇数Observable。
        `,
        tbzy:`
        返回值是一个数组[]，不是Observable。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'partition()',
        code: `

    //editArea
  
    let RxInterval, partition$,RxEven,RxOdd;
    RxInterval = Rx.Observable.interval(1000).take(6);
    partition$ = RxInterval.partition(n=>n % 2===0);
    RxEven = partition$[0];
    RxOdd = partition$[1];

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxEven = RxEven.subscribe(NEC(showInMar, 2));
    marSub.RxOdd = RxOdd.subscribe(NEC(showInMar, 'last'));
    resSub.RxEven = RxEven.subscribe(NEC(showInRes));


         `},
    {
        name: 'pairwise',
        title: 'pairwise(): Observable<Array<T>>',

        gfsm:`
        将一系列连续的发送成对的组合在一起，并将这些分组作为两个值的数组发出。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        当发射源发射值到达2个时，每次发射值，都将最新值和前一次的值作为数组传递，然后将两个值相加。
        `,
        tbzy:`
        只有在有2个值时，才会开始出发pairwise。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'pairwise()',
        code: `

    //editArea
  
    let RxInterval, RxPairwise;
    RxInterval = Rx.Observable.interval(1000).take(5);
    RxPairwise = RxInterval.pairwise().map(arr=>arr[0]+arr[1]);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxPairwise = RxPairwise.subscribe(NEC(showInMar, 'last'));
    resSub.RxPairwise = RxPairwise.subscribe(NEC(showInRes));


         `},
    {
        name: 'onErrorResumeNext',
        title: 'onErrorResumeNext(observables: ...ObservableInput): Observable',

        gfsm:`
        当任何提供的 Observable 发出完成或错误通知时，它会立即地订阅已传入下一个 Observable 。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        第一行是会发出错误的Observable，当第一行发出错误被onErrorResumeNext接收到，onErrorResumeNext不会发出错误，而是继续执行它内部的Observable。
        `,
        tbzy:`
        类似concat，但即便发生错误也继续进行，使用onErrorResumeNext后，无法获得错误通知。
        `,
        hits: 152,
        useful: 562,
        categories:'',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'onErrorResumeNext()',
        code: `

    //editArea
  
    let RxIntervalError, RxInterval, RxOnErrorResumeNext;
    RxIntervalError = Rx.Observable.interval(1000).map(n=>{if(n===3){throw new Error()};return n}); 
    RxInterval = Rx.Observable.interval(1000).take(3);
    RxOnErrorResumeNext = RxIntervalError.onErrorResumeNext(RxInterval);

    //editArea

    marSub.RxIntervalError = RxIntervalError.subscribe(NEC(showInMar, 1));
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 2));
    marSub.RxOnErrorResumeNext = RxOnErrorResumeNext.subscribe(NEC(showInMar, 'last'));
    resSub.RxOnErrorResumeNext = RxOnErrorResumeNext.subscribe(NEC(showInRes));


         `},
     {
        name: 'multicast',
        title: 'multicast(subjectOrSubjectFactory: Function | Subject, selector: Function): Observable',

        gfsm:`
        返回的 Observable 发出对 ConnectableObservable 发出的项调用一个指定的 selector 函数的结果， ConnectableObservable 可以在潜在的多个流之间共享单个 subscription 。
        `,
         czsm:`
        点击开始即可。
        `,
         cclj:`
        共享数据；<br>
        第1行为立即订阅；<br>
        第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>
        第3行隔4秒订阅，此时之前发射源状态是complete，直接进入complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8秒订阅，此时之前发射源状态是unsubscribe，共享数据；<br>
        <strong>结论：</strong><br>
        <strong>共享数据；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong>
        `,
        tbzy:`无。
        `,
        hits: 152,
        useful: 562,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'multicast()',
        code: `

     //editArea

    let RxMulticast1,RxMulticast2,RxMulticast3,RxMulticast4,RxMulticast5,multicast$,multicast2$;
    multicast$ = Rx.Observable.timer(0,1000).take(4).multicast(new Rx.Subject());
    multicast2$ = Rx.Observable.timer(0,1000).take(4).multicast(new Rx.Subject());
    
    //editArea
    
    multicast$.connect();
    marSub.RxMulticast1 = multicast$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxMulticast2 = multicast$.subscribe(NEC(showInMar, 2))},2000);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxMulticast3 = multicast$.subscribe(NEC(showInMar, 3))},4000);
    marSub.RxTimeout3 = setTimeout(()=>{multicast2$.connect();marSub.RxMulticast4 = multicast2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxMulticast4.unsubscribe()},7000);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxMulticast5 = multicast2$.subscribe(NEC(showInMar, 5))},8000);


         `},
     {
        name: 'mergeScan',
        title: 'mergeScan(accumulator: function(acc: R, value: T): Observable<R>, seed: *, concurrent: number): Observable<R>',

        gfsm:`
        在源 Observable 上应用 accumulator 函数，其中 accumulator 函数本身返回 Observable ，然后每个返回的中间 Observable 会被合并到输出 Observable 中。
        它很像 scan，但 accumulator 函数返回的 Observables 会被合并到外部 Observalbe 中。
        `,
         czsm:`
        点击开始后，使用click触发。
        `,
         cclj:`
        累计click的次数。与scan类似，每次计算都有返回值，返回值是内部源(of$)的最新值。
        `,
        tbzy:`
        每当外部源触发时，内部源(of$)的最新值是会返回给外部源，作为新的acc参与到新的内部源；因此如果内部源使用interval等长时间源值不断变化的操作符，结果就会根据点击位置而改变。因为内部源的最新值一直在变。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'mergeScan()',
        code: `

    //editArea
  
    let RxClick, RxMergeScan;
    RxClick = Rx.Observable.fromEvent(document,'click').take(5); 
    RxMergeScan = RxClick.mergeScan((acc, v) => Rx.Observable.of(acc + 1), 0);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxMergeScan = RxMergeScan.subscribe(NEC(showInMar, 'last'));
    resSub.RxMergeScan = RxMergeScan.subscribe(NEC(showInRes));


         `},
    {
        name: 'mergeMapTo',
        title: 'mergeMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable',

        gfsm:`
        将每个源值投射成同一个 Observable ，该 Observable 会多次合并到输出 Observable 中。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        这里的内部源(interval$)是定值(不是function)，每次click时，都触发相同的内部发射源。
        `,
        tbzy:`跟mergeMap很像，但永远将每个值映射到同一个内部 Observable 。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'mergeMapTo()',
        code: `

    //editArea
  
    let interval$,RxClick,RxMergeMapTo;
    RxClick = Rx.Observable.fromEvent(document,'click').take(3); 
    interval$= Rx.Observable.interval(1000).take(3);
    RxMergeMapTo = RxClick.mergeMapTo(interval$.map(x=>x*2));

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxMergeMapTo = RxMergeMapTo.subscribe(NEC(showInMar, 'last'));
    resSub.RxMergeMapTo = RxMergeMapTo.subscribe(NEC(showInRes));


         `},
    {
        name: 'mergeMap',
        title: 'mergeMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable',

        gfsm:`
        将每个源值投射成 Observable ，该 Observable 会合并到输出 Observable 中。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        先理解mergeAll，这里就是先map，再mergeAll，将高阶Observable打平合并。<br>
        这里每次click后，内部源从加上click次数开始递增。
        `,
        tbzy:`无。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'mergeMap()',
        code: `

    //editArea
  
    let interval$,RxClick,RxMergeMap;
    RxClick = Rx.Observable.fromEvent(document,'click').take(3); 
    interval$= Rx.Observable.interval(1000).take(3);
    RxMergeMap = RxClick.mergeMap((e,i)=>interval$.map(x=>x+i));

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxMergeMap = RxMergeMap.subscribe(NEC(showInMar, 'last'));
    resSub.RxMergeMap = RxMergeMap.subscribe(NEC(showInRes));


         `},
    {
        name: 'mergeAll',
        title: 'mergeAll(concurrent: number): Observable',

        gfsm:`
        将高阶 Observable 转换成一阶 Observable ，一阶 Observable 会同时发出在内部 Observables 上发出的所有值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        将高阶Observable打平，再合并，合并规则与merge一样，参数为最多同时订阅的数量，此处最多同时订阅2个输入源。<br>
        这里每次click后，内部源从加上click次数开始递增。
        `,
        tbzy:`
        任何由内部 Observable 发出的错误都会立即在输出 Observalbe 上发出。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'mergeAll()',
        code: `

    //editArea
  
    let interval$,RxClick,RxMergeAll;
    RxClick = Rx.Observable.fromEvent(document,'click').take(5); 
    interval$= Rx.Observable.interval(1000).take(3);
    RxMergeAll = RxClick.map((e,i)=>interval$.map(x=>x+i)).mergeAll(2);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxMergeAll = RxMergeAll.subscribe(NEC(showInMar, 'last'));
    resSub.RxMergeAll = RxMergeAll.subscribe(NEC(showInRes));


         `},
    {
        name: 'combineLatest',
        title: 'combineLatest(observable1: ObservableInput, observable2: ObservableInput, project: function, scheduler: Scheduler): Observable',

        gfsm:`
        组合多个 Observables 来创建一个 Observable ，该 Observable 的值根据每个输入 Observable 的最新值计算得出的。为了保证输出数组的长度相同，combineLatest 实际上会等待所有的输入 Observable 至少发出一次， 在返回 Observable 发出之前。这意味着如果某个输入 Observable 在其余的输入 Observable 之前发出，它所发出 的值只保留最新的。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        第三个参数project：function可选，接受上一次的最新值作为参数，这里是(x,y)=>x+y；<br>
        1秒后interval1发出0，此时interval2还未发出值，因此等待；<br>
        1.5秒后，interval2发出0，此时interval1最新值为0，intervale2最新值为0，发出x+y即0；<br>
        2秒后，interval1发出1，最新值为1，interval2最新值还是0，发出x+y即1；<br>3秒后，interval2最新值为1，发出x+y即2。
        `,
        tbzy:`
        当任何一个发射源出现错误，combineLatest也发出错误。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'combineLatest()',
        code: `

    //editArea
  
    let RxInterval1,RxInterval2,RxCombineLatest;
    RxInterval1 = Rx.Observable.interval(1000).take(2); 
    RxInterval2 = Rx.Observable.interval(1500).take(2);
    RxCombineLatest = Rx.Observable.combineLatest(RxInterval1,RxInterval2,(x,y)=>x+y);

    //editArea

    marSub.RxInterval1 = RxInterval1.subscribe(NEC(showInMar, 1));
    marSub.RxInterval2 = RxInterval2.subscribe(NEC(showInMar, 2));
    marSub.RxCombineLatest = RxCombineLatest.subscribe(NEC(showInMar, 'last'));
    resSub.RxCombineLatest = RxCombineLatest.subscribe(NEC(showInRes));


         `},
      {
        name: 'combineAll',
        title: 'combineAll(project: function): Observable',

        gfsm:`
        通过等待外部 Observable 完成然后应用 combineLatest ，将高阶 Observable 转化为一阶 Observable。
        `,
          czsm:`
        点击2次后，触发combineAll。
        `,
          cclj:`
        RxClick是外部源，点击2次即结束，RxClick.map(e=>interval$)是一个高阶Observable，如果没有combineAll，那么结果就是每次点击后，触发interval$，类似：<br>
        click1->interval1$(0,1,2)<br>
        click2->interval2$(0,1,2)<br>
        但现在用了combineAll，即将他们任何变更后最新的值组合一起<br>
        当click1触发的interval1$的最新值为0时，click2触发的interval2$最新值最多为0，因为interval1$比interval2$提前触发，因此第一个组合[0,0]；<br>
        当interval1$最新值变成1时，interval2$还是0，组合[1,0]；<br>
        然后interval2$再变成1，组合[1,1]；<br>
        当interval1$最新值变成2时，interval2$还是1，因此组合[2,1]；<br>
        然后interval2$再变成2，组合[2,2]。
        `,
        tbzy:`
        最好先要理解combineLatest（任何源任何变动都发出所有最新值）。
        `,
        hits: 152,
        useful: 562,
        categories:'Combination Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'combineAll()',
        code: `

    //editArea
  
    let interval$,RxClick,RxCombineAll;
    RxClick = Rx.Observable.fromEvent(document,'click').take(2); 
    interval$= Rx.Observable.interval(1000).take(3);
    RxCombineAll = RxClick.map(e=>interval$).combineAll();

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxCombineAll = RxCombineAll.subscribe(NEC(showInMar, 'last'));
    resSub.RxCombineAll = RxCombineAll.subscribe(NEC(showInRes));


         `},
     {
        name: 'bufferWhen',
        title: 'bufferWhen(closingSelector: function(): Observable): Observable<T[]>',

        gfsm:`
        缓冲源 Observable 的值, 使用关闭 Observable 的工厂函数来决定何时关闭、发出和重置缓冲区。
        `,
         czsm:`
        点击开始后，使用click触发。
        `,
         cclj:`
        第一行为发射源的值，每秒递增1，源值一发射立刻开启缓冲区，当鼠标click，结束当前缓冲区，发出缓冲值，然后立刻开启新的缓冲区，一直重复。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'bufferWhen()',
        code: `

    //editArea
  
    let RxInterval,RxClick,RxBufferWhen;
    RxInterval = Rx.Observable.timer(0,1000).take(10);
    RxClick = Rx.Observable.fromEvent(document,'click');    
    RxBufferWhen = RxInterval.bufferWhen(()=>RxClick);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 2));
    marSub.RxBufferWhen = RxBufferWhen.subscribe(NEC(showInMar, 'last'));
    resSub.RxBufferWhen = RxBufferWhen.subscribe(NEC(showInRes));


         `},
    {
        name: 'bufferToggle',
        title: 'bufferToggle(openings: SubscribableOrPromise<O>, closingSelector: function(value: O): SubscribableOrPromise): Observable<T[]>',

        gfsm:`
        缓冲源 Observable 的值，openings 发送的时候开始缓冲，closingSelector 发送的时候结束缓冲。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        第1行是发射源的值，每秒递增1，这里opening是第一次click，closingSelector是click之后3秒，结果为之间的值(Array)。
        `,
        tbzy:`
        无。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'bufferToggle()',
        code: `

    //editArea
  
    let RxInterval,RxClick,RxBufferToggle,of$;
    RxInterval = Rx.Observable.timer(0,1000).take(10);
    RxClick = Rx.Observable.fromEvent(document,'click').take(1);      
    of$ = Rx.Observable.of(1).delay(3000);
    RxBufferToggle = RxInterval.bufferToggle(RxClick,()=>of$);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 2));
    marSub.RxBufferToggle = RxBufferToggle.subscribe(NEC(showInMar, 'last'));
    resSub.RxBufferToggle = RxBufferToggle.subscribe(NEC(showInRes));


         `},
    {
        name: 'bufferTime',
        title: 'bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler): Observable<T[]>',

        gfsm:`
        在特定时间周期内缓冲源 Observable 的值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:` 
        bufferTimeSpan是每隔多久发出之前的所有缓冲值，这里是2200ms；<br>
        bufferCreationInterval是隔多久开始新的缓冲区，这里是3300ms，即创建新缓冲区的间隔都是3300ms；<br>
        因此第一个缓冲区创建在0的位置，第二个创建在3.3的位置，第三个创建在6.6的位置，但因为bufferTimeSpan是2200ms; <br>
        因此第一个缓冲区到了2.2的位置，就会发出之前的所有缓冲值，而2.2-3.3这一段内的值(即3)会被忽略，<br>
        第二个缓冲区从3.3开始，bufferTimeSpan是2200ms,因此第二个到5.5的位置，就会发出之前所有缓冲值，而5.5-6.6这一段值(即6)会被忽略，<br>
        第三个缓冲区从6.6开始，bufferTimeSpan是2200ms,因此第三个个到8.8的位置发射之前所有缓冲值，然后9的时候complete。 
        `,
        tbzy:`
        此处一定要弄清楚第二个参数是创建新缓冲区，而不是清空旧的缓冲区，因此缓冲区可以有很多个。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'bufferTime(2200,3300)',
        code: `

    //editArea
  
    let RxTimer,RxBufferTime;
    RxTimer = Rx.Observable.timer(0,1000).take(10);
    RxBufferTime = RxTimer.bufferTime(2200,3300);

    //editArea

    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 1));
    marSub.RxBufferTime = RxBufferTime.subscribe(NEC(showInMar, 2));
    resSub.RxBufferTime = RxBufferTime.subscribe(NEC(showInRes));


         `},
    {
        name: 'bufferCount',
        title: 'bufferCount(bufferSize: number, startBufferEvery: number): Observable<T[]>',

        gfsm:`
        缓冲源 Observable 的值直到缓冲数量到达设定的 bufferSize。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        bufferSize是每次发出缓冲值数量，这里是3；<br>
        startBufferEvery是何时开始新的缓冲区，这里是4，即每个新缓冲区的间隔都是4；<br>
        因此第一个缓冲区创建在0的位置，第二个创建在4的位置，第三个创建在8的位置；<br>
        但因为bufferSize是3，因此只会发出新缓存区的前3个值（最后1个值不发），而当到了9，发生complete，<br>
        而从8开始创建的缓冲区（第三个缓冲区）到9只有2个值，因此最后一次发出2个值。
        `,
        tbzy:`
        此处一定要弄清楚第二个参数是创建新缓冲区，而不是清空旧的缓冲区，因此缓冲区可以有很多个。
        `,
        hits: 152,
        useful: 562,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'bufferCount(3,4)',
        code: `

    //editArea
  
    let RxTimer,RxBufferCount;
    RxTimer = Rx.Observable.timer(0,1000).take(10);
    RxBufferCount = RxTimer.bufferCount(3,4);
    //editArea
    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 1));
    marSub.RxBufferCount = RxBufferCount.subscribe(NEC(showInMar, 2));
    resSub.RxBufferCount = RxBufferCount.subscribe(NEC(showInRes));


         `},
    {
        name: 'buffer',
        title: 'buffer(closingNotifier: Observable<any>): Observable<T[]>',

        gfsm:`
        缓冲源 Observable 的值直到 closingNotifier 发出。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        每当收到closingNotifier，这里是click事件，变会将之前缓冲的值一次性以数组形式发出。
        `,
        tbzy:`
        buffer的缓冲区只有1个，每次发出缓冲值后即清空缓冲区再等待接受新的缓冲值，与bufferCount和bufferTime不同。
        `,
        hits: 0,
        useful: 0,
        categories:'Transformation Operators',
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'buffer',
        code: `

    //editArea
  
    let RxClick,RxTimer,RxBuffer;
    RxClick = Rx.Observable.fromEvent(document, 'click').take(15);
    RxTimer = Rx.Observable.timer(0,1000).take(10);
    RxBuffer = RxTimer.buffer(RxClick);
    //editArea
    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 2));
    marSub.RxBuffer = RxBuffer.subscribe(NEC(showInMar, 3));
    resSub.RxBuffer = RxBuffer.subscribe(NEC(showInRes));


         `},
    {
        name: 'publish-refCount',
        title: 'publish(selector: Function): *',

        gfsm:`
        返回 ConnectableObservable，它是 Observable 的变种，它会一直等待，直到 connnect 方法被调用才会开始把值发送给那些订阅它的观察者。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        不需要connect，共享数据，此处前3行发射源是"publish$"，后2行发射源是"publish2$"；<br>
        第1行为立即订阅；<br>
        第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>
        第3行隔4秒订阅，此时之前发射源状态是complete，直接进入complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8秒订阅，此时之前发射源状态是unsubscribe，直接进入complete；<br>
        <strong>结论：</strong><br>
        <strong>共享数据；前面数据complete，complete；前面数据unsubscribe，complete；前面数据error，error。</strong>
        `,
        tbzy:`无。
        `,
        hits: 452,
        useful: 842,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'publish-refCount',
        code: `

    //editArea

    let RxPublish1,RxPublish2,RxPublish3,RxPublish4,RxPublish5,publish$,publish2$;
    publish$ = Rx.Observable.timer(0,1000).take(4).publish().refCount();
    publish2$ = Rx.Observable.timer(0,1000).take(4).publish().refCount();
    
    //editArea
    
    marSub.RxPublish1 = publish$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxPublish2 = publish$.subscribe(NEC(showInMar, 2))},2000);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxPublish3 = publish$.subscribe(NEC(showInMar, 3))},4000);
    marSub.RxTimeout3 = setTimeout(()=>{marSub.RxPublish4 = publish2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxPublish4.unsubscribe()},7000);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxPublish5 = publish2$.subscribe(NEC(showInMar, 5))},8000);

         `},
    {
        name: 'publish-connect',
        title: 'publish(selector: Function): *',

        gfsm:`
        返回 ConnectableObservable，它是 Observable 的变种，它会一直等待，直到 connnect 方法被调用才会开始把值发送给那些订阅它的观察者。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        共享数据，直到connect方法被调用才会开始把值发送给那些订阅它的观察者<br>
        此处前3行发射源是"publish$"，后2行发射源是"publish2$"；<br>
        第1行为立即订阅；<br>
        第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>
        第3行隔4秒订阅，此时之前发射源状态是complete，直接进入complete；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8秒订阅，此时之前发射源状态是unsubscribe，共享数据；<br>
        <strong>结论：</strong><br>
        <strong>共享数据，需要手动调用connect方法；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error。</strong>
        `,
        tbzy:`无。
        `,

        hits: 452,
        useful: 842,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'publish-connect',
        code: `

    //editArea

    let RxPublish1,RxPublish2,RxPublish3,RxPublish4,RxPublish5,publish$,publish2$;
    publish$ = Rx.Observable.timer(0,1000).take(4).publish();
    publish2$ = Rx.Observable.timer(0,1000).take(4).publish();
    
    //editArea
    
    publish$.connect();
    marSub.RxPublish1 = publish$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxPublish2 = publish$.subscribe(NEC(showInMar, 2))},2000);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxPublish3 = publish$.subscribe(NEC(showInMar, 3))},4000);
    marSub.RxTimeout3 = setTimeout(()=>{publish2$.connect();marSub.RxPublish4 = publish2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxPublish4.unsubscribe()},7000);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxPublish5 = publish2$.subscribe(NEC(showInMar, 5))},8000);

         `},
    {
        name: 'share',
        title: 'share(): Observable<T>',

        gfsm:`
        返回一个新的 Observable，该 Observable 多播(共享)源 Observable。 至少要有一个订阅者，该 Observable 才会被订阅并发出数据。 当所有的订阅者都取消订阅了，它会取消对源 Observable 的订阅。 因为 Observable 是多路传播的它使得流是 hot。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        共享数据，此处前3行发射源是"share$"，后2行发射源是"share2$"；<br>
        第1行为立即订阅；<br>
        第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>
        第3行隔4秒订阅，此时之前发射源状态是complete，从头开始；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8秒订阅，此时之前发射源状态是unsubscribe，从头开始；<br>
        <strong>结论：</strong><br>
        <strong>共享数据；前面数据complete，从头开始；前面数据unsubscribe，从头开始；前面数据error，error。</strong>
        `,
        tbzy:`无。
        `,
        hits: 452,
        useful: 842,
        categories:'Multicasting Operators',
        doNotNeedAuto:true,
        //line: 3,
        marbleText: 'share',
        code: `

    //editArea

    let RxShare1,RxShare2,RxShare3,RxShare4,RxShare5,share$,share2$;
    share$ = Rx.Observable.timer(0,1000).take(4).share();
    share2$ = Rx.Observable.timer(0,1000).take(4).share();
    
    //editArea
    
    marSub.RxShare1 = share$.subscribe(NEC(showInMar, 1));
    marSub.RxTimeout1 = setTimeout(()=>{marSub.RxShare2 = share$.subscribe(NEC(showInMar, 2))},2000);
    marSub.RxTimeout2 = setTimeout(()=>{marSub.RxShare3 = share$.subscribe(NEC(showInMar, 3))},4000);
    marSub.RxTimeout3 = setTimeout(()=>{marSub.RxShare4 = share2$.subscribe(NEC(showInMar, 4))},6000);
    marSub.RxTimeout4 = setTimeout(()=>{marSub.RxShare4.unsubscribe()},7000);
    marSub.RxTimeout5 = setTimeout(()=>{marSub.RxShare5 = share2$.subscribe(NEC(showInMar, 5))},8000);

         `},
    {
        name: 'scan',
        title: 'scan(accumulator: function(acc: R, value: T, index: number): R, seed: T | R): Observable<R>',

        gfsm:`
        对源 Observable 使用累加器函数， 返回生成的中间值， 可选的初始值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        与reduce不同处在于返回结果的次数；accumulator(参数1)是一个function(累积器)，seed(参数2)是初始值；<br>
        参数1function有3个参数，(acc,value,index)，其中acc第一次为初始值(seed)，后续则为上一次计算得出的值，value则一直是当前值，index为索引值，函数内容为自定义计算方式；<br>
        直到外部发射源complete，每次计算都会返回结果。
        `,
        tbzy:`
        返回多次结果，如果没有指定 seed 值，那么源中的第一项会作为 seed 来使用。
        `,
        hits: 715,
        useful: 412,
        categories:'Transformation Operators',
        //line: 3,
        marbleText: 'scan',
        code: `

    //editArea

    let RxInterval_Take,RxReduce;
    RxInterval_Take = Rx.Observable.interval(1000).take(4);
    RxReduce = RxInterval_Take.scan((acc, cur) => acc + cur);

    //editArea

    marSub.RxInterval_Take = RxInterval_Take.subscribe(NEC(showInMar, 1));
    marSub.RxReduce = RxReduce.subscribe(NEC(showInMar, 2));
    resSub.RxReduce = RxReduce.subscribe(NEC(showInRes));
         `},
    {
        name: 'reduce',
        title: 'reduce(accumulator: function(acc: R, value: T, index: number): R, seed: R): Observable<R>',

        gfsm:`
        在源 Observalbe 上应用 accumulator (累加器) 函数，然后当源 Observable 完成时，返回 累加的结果，可以提供一个可选的 seed 值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        与scan不同处在于返回结果的次数；accumulator(参数1)是一个function(累积器)，seed(参数2)是初始值；<br>
        accumulator有3个参数，(acc,value,index)，其中acc第一次为初始值(seed)，后续则为上一次计算得出的值，value则一直是当前值，index为索引值，函数内容为自定义计算方式；<br>
        直到外部发射源complete，只返回 1 次结果。
        `,
        tbzy:`
        返回一次结果，如果没有指定 seed 值，那么源中的第一项会作为 seed 来使用。
        `,
        hits: 715,
        useful: 412,
        categories:'Transformation Operators',
        //line: 3,
        marbleText: 'reduce',
        code: `

    //editArea

    let RxInterval_Take,RxReduce;
    RxInterval_Take = Rx.Observable.interval(1000).take(5);
    RxReduce = RxInterval_Take.reduce((acc, cur) => acc + cur);

    //editArea

    marSub.RxInterval_Take = RxInterval_Take.subscribe(NEC(showInMar, 1));
    marSub.RxReduce = RxReduce.subscribe(NEC(showInMar, 2));
    resSub.RxReduce = RxReduce.subscribe(NEC(showInRes));
         `},
    {
        name: 'takeUntil',
        title: 'takeUntil(notifier: Observable): Observable<T>',

        gfsm:`
        发出源 Observable 发出的值，直到 notifier Observable 发出值。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        notifier(参数)为内部发射源，当发射值时，发出complete通知。此处参数延迟3.5秒发出1，然后立刻complete。
        `,
        tbzy:`无。
        `,
        hits: 715,
        useful: 412,
        categories:'Filtering Operators',
        //line: 3,
        marbleText: 'takeUntil',
        code: `

    //editArea

    let RxInterval,RxOfDelay, RxTakeUntil;
    RxInterval = Rx.Observable.interval(1000).take(5);
    RxOfDelay = Rx.Observable.of(1).delay(3500);
    RxTakeUntil = RxInterval.takeUntil(RxOfDelay);

    //editArea


    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxOfDelay = RxOfDelay.subscribe(NEC(showInMar, 2));
    marSub.RxTakeUntil = RxTakeUntil.subscribe(NEC(showInMar, 'last'));
    resSub.RxTakeUntil = RxTakeUntil.subscribe(NEC(showInRes));
         `},
    {
        name: 'takeWhile',
        title: 'takeWhile(predicate: function(value: T, index: number): boolean): Observable<T>',

        gfsm:`
        发出在源 Observable 中满足 predicate 函数的每个值，并且一旦出现不满足 predicate 的值就立即完成。
        `,
        czsm:`        点击开始即可。
        `,
        cclj:`        predicate(参数)接收源发射值，返回false时，发出complete通知。此处predicate条件是n<4，因此n为4时，发出complete。
        `,
        tbzy:`
        predicate第二个参数为index。
        `,
        hits: 715,
        useful: 412,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'takeWhile(n=>n<4)',
        code: `

    //editArea

    let RxInterval, RxTakeWhile;
    RxInterval = Rx.Observable.interval(1000).take(7);
    RxTakeWhile = RxInterval.takeWhile(n=>n<4);

    //editArea

    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTakeWhile = RxTakeWhile.subscribe(NEC(showInMar, 'last'));
    resSub.RxTakeWhile = RxTakeWhile.subscribe(NEC(showInRes));

     `,},
    {
        name: 'retryWhen',
        title: 'retryWhen(notifier: function(errors: Observable): Observable): Observable',

        gfsm:`
        返回一个 Observable， 该 Observable 是源 Observable 不包含错误异常的镜像。 如果源头 Observable 触发 error， 这个方法会发出引起错误的 Throwable 给 notifier 返回的 Observable。 如果该 Observable 触发 complete 或者 error 则该方法会使子订阅触发 complete 和 error。 否则该方法会重新订阅源 Observable。
        `,
        czsm:`        点击开始即可。
        `,
        cclj:`
        重复外部发射源(外部发射源的error不会被重复)，直到内部发射源(参数1)发出complete或者error；<br>
        此处第一行为外部发射源(每100ms发射一个小球)，发射3个值就error，error并不影响retryWhen；<br>
        第二行为内部发射源，发出5个值后complete，每次内部源发射值都会触发retry，重复一次外部发射源的镜像。
        `,
        tbzy:`
        如果外部发射源出现complete，重复停止，如果内部发射源出现error或者complete，重复停止。
         `,
        hits: 715,
        useful: 412,
        categories:'Error Handling Operators',
        //line: 3,
        marbleText: 'retryWhen',
        code: `

    //editArea

    let RxInterval, RxTimer_Throw, RxRetryWhen;
    RxTimer_Throw=Rx.Observable.timer(0,100).map(n=>{if(n===3){throw 'err'};return n});
    RxInterval = Rx.Observable.interval(1000).take(5);
    RxRetryWhen =RxTimer_Throw.retryWhen(()=>RxInterval);

    //editArea


    marSub.RxTimer_Throw = RxTimer_Throw.subscribe(NEC(showInMar, 1));
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 2));
    marSub.RxRetryWhen = RxRetryWhen.subscribe(NEC(showInMar, 'last'));
    resSub.RxRetryWhen = RxRetryWhen.subscribe(NEC(showInRes));

     `},
    {
        name: 'repeatWhen',
        title: 'repeatWhen(notifier: function(notifications: Observable): Observable): Observable',

        gfsm:`
        返回的 Observalbe 是源 Observable 的镜像，除了 complete 。如果源 Observable 调用了 complete，这个方法会发出给 notifier 返回的 Observable 。如果这个 Observale 调用了 complete 或 error，那么这个方法会在子 subscription 上调用 complete 或 error 。否则，此方法将重新订阅源 Observable。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        重复外部发射源(外部发射源的complete不会被重复)，直到内部发射源(参数1)发出complete或者error；<br>
        此处第一行为外部发射源(每100ms发射一个小球)，complete并不影响repeatWhen；<br>
        第二行为内部发射源，发出5个值后complete，每次内部源发射值都会触发repeat，重复一次外部发射源的镜像。
        `,
        tbzy:`
        如果外部发射源出现error，重复停止，如果内部发射源出现error或者complete，重复也会停止。
        `,
        hits: 915,
        useful: 612,
        categories:'Creation Operators',
        //line: 3,
        marbleText: 'repeatWhen',
        code: `

    //editArea

    let RxInterval, RxTimer, RxRepeatWhen;
    RxTimer=Rx.Observable.timer(0,100).take(3);
    RxInterval = Rx.Observable.interval(1000).take(5);
    RxRepeatWhen =RxTimer.repeatWhen(()=>RxInterval);

    //editArea


    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 1));
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 2));
    marSub.RxRepeatWhen = RxRepeatWhen.subscribe(NEC(showInMar, 'last'));
     resSub.RxRepeatWhen = RxRepeatWhen.subscribe(NEC(showInRes));
     `,},
    {
        name: 'merge',
        title: 'merge(other: ObservableInput, concurrent: number, scheduler: Scheduler): Observable',

        gfsm:`
        创建一个输出 Observable ，它可以同时发出每个给定的输入 Observable 中的所有值。<br>
        `,
        czsm:`
        点击开始即可。<br>
        `,
        cclj:`
        不管发射源顺序，直接合并,concurrent(参数2)表示可以同时订阅的输入 Observables 的最大数量，默认infinite。
        `,
        tbzy:`
        一旦其中一个error，整体都error。
        `,
        hits: 985,
        useful: 612,
        categories:'Combination Operators',
        //line: 3,
        marbleText: 'merge()',
        code: `

    //editArea

    let RxInterval, RxTimer, RxMerge;
    RxInterval = Rx.Observable.interval(1500).take(3);
    RxTimer = Rx.Observable.timer(500, 2000).take(2);
    RxMerge = Rx.Observable.merge(RxInterval, RxTimer);

    //editArea


    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 2));
    marSub.RxMerge = RxMerge.subscribe(NEC(showInMar, 'last'));
     resSub.RxMerge = RxMerge.subscribe(NEC(showInRes));
     `,},
    {
        name: 'forkJoin',
        title: 'forkJoin(sources: ...SubscribableOrPromise, project: function): Observable',

        gfsm:`
        无。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        sources(参数1)可以接收任意个Observable或者Observable数组，project(参数2)接收前面sources的最终值，可自定义传出值，如果未设置，则默认以数组合并。<br>
        此处第一个发射源执行显示1到6(几乎同时),第二个发射源每隔1s显示增加1,最终为2，project将前2个发射源的最终值加起来。
        `,
        tbzy:`
        project如果未设置，则默认以数组合并。
        `,
        hits: 1524,
        useful: 912,
        categories:'Combination Operators',
        //line: 3,
        marbleText: 'forkJoin(s1,s2,(x,y)=>x+y)',
        code: `

    //editArea

    let RxRange, RxTimer, RxForkJoin;
    RxRange = Rx.Observable.range(1, 6);
    RxTimer = Rx.Observable.timer(0, 1000).take(3);
    RxForkJoin = Rx.Observable.forkJoin(RxRange, RxTimer,(x,y)=>x+y);

    //editArea


    marSub.RxRange = RxRange.subscribe(NEC(showInMar, 1));
    marSub.RxTimer = RxTimer.subscribe(NEC(showInMar, 2));
    marSub.RxForkJoin = RxForkJoin.subscribe(NEC(showInMar, 'last'));
    resSub.RxForkJoin = RxForkJoin.subscribe(NEC(showInRes));

     `,},
    {
        name: 'distinctUntilKeyChange',
        title: 'distinctUntilKeyChanged(key: string, compare: function): Observable',

        gfsm:`
        返回 Observable，它发出源 Observable 发出的所有与前一项不相同的项，使用通过提供的 key 访问到的属性来检查两个项是否不同。
        `,
        czsm:` 
        点击开始即可，需要拖拽查看。
        `,
        cclj:`
        只对比前一项，通过key(参数1)值去比较与前一项比较去重，compare(参数2)可自己设定比较函数，此处根据key值 x去重，可以看到原来4组obj，对比前一项去重后剩下第1,3,4组
        `,
        tbzy:`
        如果compare参数不传，则使用'==='比较。
        `,
        hits: 25,
        useful: 89,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'distinctUntilKeyChange()',
        code: `

    //editArea

    let RxFrom,RxDisUntKeyChanged;
    RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
    RxDisUntKeyChanged = RxFrom.distinctUntilKeyChanged('x',(p,n)=>p===n);

    //editArea


    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxDisUntKeyChanged = RxDisUntKeyChanged.subscribe(NEC(showInMar, 'last'));
    resSub.RxDisUntKeyChanged = RxDisUntKeyChanged.subscribe(NEC(showInRes));
     `,},
    {
        name: 'distinctUntilChange',
        title: 'distinctUntilChanged(compare: function): Observable',

        gfsm:`
        返回 Observable，它发出源 Observable 发出的所有与前一项不相同的项。
        `,
        czsm:`
        点击开始即可，需要拖拽查看。
        `,
        cclj:`
        只对比前一项，compare(参数)可以设定根据那一项进行去重，此处根据当前项 x 和上一项 y 对比去重，可以看到原来4组obj，
        对比前一项去重后剩下第1,2,4组。
        `,
        tbzy:`
        如果compare参数不传，则使用"==="比较。
        `,
        hits: 273,
        useful: 425,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'distinctUntilChange()',
        code: `

    //editArea

    let RxFrom,RxDisUntChanged;
    RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:2},{x:2,y:4},{x:1,y:6}]);
    RxDisUntChanged = RxFrom.distinctUntilChanged((prevO,nextO)=>prevO.y===nextO.x);

    //editArea


    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxDisUntChanged = RxDisUntChanged.subscribe(NEC(showInMar, 'last'));
    resSub.RxDisUntChanged = RxDisUntChanged.subscribe(NEC(showInRes));
     `,},
    {
        name: 'distinct',
        title: 'distinct(keySelector: function, flushes: Observable): Observable',

        gfsm:`
        返回 Observable，它发出由源 Observable 所发出的所有与之前的项都不相同的项。
        `,
        czsm:`
        点击开始即可，需要拖拽查看。
        `,
        cclj:`
        全部对比并且去重复，keySelector(参数1)可以设定根据那一项进行去重，此处根据x值去重，可以看到原来4组obj，去重后剩下2组
        `,
        tbzy:`
        即使是在新浏览器中，长时间运行的 distinct 操作也可能会导致内存泄露，flushes(参数2)可以清空操作符内部的 HashSet。
        `,
        hits: 213,
        useful: 745,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'distinct(obj=>obj.x)',
        code: `

    //editArea

    let RxFrom,RxDistinct;
    RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
    RxDistinct = RxFrom.distinct(obj=>obj.x);

    //editArea


    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxDistinct = RxDistinct.subscribe(NEC(showInMar, 'last'));
    resSub.RxDistinct = RxDistinct.subscribe(NEC(showInRes));
     `,},
    {
        name: 'delayWhen',
        title: 'delayWhen(delayDurationSelector: function(value: T): Observable, subscriptionDelay: Observable): Observable',

        gfsm:`
        在给定的时间范围内，延迟源 Observable 所有数据项的发送，该时间段由另一个 Observable 的发送决定。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        源RxOf根据RxClick触发后才触发，此处点击屏幕后才会显示start。
        `,
        tbzy:`
        就像是delay, 但是延时的时间间隔由第二个Observable决定。
        `,
        hits: 78,
        useful: 527,
        categories:'Utility Operators',
        //line: 2,
        marbleText: 'delayWhen',
        code: `

    //editArea

    let RxOf,RxClick,RxDelayWhen;
    RxOf = Rx.Observable.of('start');
    RxClick = Rx.Observable.fromEvent(document,'click');
    RxDelayWhen = RxOf.delayWhen(e=>RxClick);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDelayWhen = RxDelayWhen.subscribe(NEC(showInMar, 'last'));
    resSub.RxDelayWhen = RxDelayWhen.subscribe(NEC(showInRes));
     `,},
    {
        name: 'delay',
        title: 'delay(delay: number | Date, scheduler: Scheduler): Observable',

        gfsm:`
        通过给定的超时或者直到一个给定的时间来延迟源 Observable 的发送。
        `,
        czsm:`        点击开始后，使用click触发。
        `,
        cclj:`        每次点击后延迟1秒，发出。
        `,
        tbzy:`
        无。
        `,
        hits: 42,
        useful: 128,
        categories:'Utility Operators',
        //line: 2,
        marbleText: 'delay',
        code: `

    //editArea

    let RxClick,RxDelay;
    RxClick = Rx.Observable.fromEvent(document,'click').take(12);
    RxDelay = RxClick.delay(1000);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDelay = RxDelay.subscribe(NEC(showInMar, 'last'));
    resSub.RxDelay = RxDelay.subscribe(NEC(showInRes));
     `,},
    {
        name: 'audit',
        title: 'audit(durationSelector: function(value: T): SubscribableOrPromise): Observable<T>',

        gfsm:`
        在另一个 Observable 决定的时间段里忽略源数据，然后发出源 Observable 中最新发出的值， 然后重复此过程。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        点击后不会立刻输出第一个值，等待内部源interval$发出值(这里是间隔2秒)。
        `,
        tbzy:`
        参考<a href="./auditTime">auditTime</a>理解audit。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 3,
        marbleText: 'audit',
        code: `

    //editArea

    let RxClick, RxAudit, interval$;
    interval$ = Rx.Observable.interval(2000);
    RxClick = Rx.Observable.fromEvent(document, 'click');
    RxAudit = RxClick.audit(()=>interval$);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxAudit = RxAudit.subscribe(NEC(showInMar, 'last'));
    resSub.RxAudit = RxAudit.subscribe(NEC(showInRes));
     `,},
    {
        name: 'debounce',
        title: 'debounce(durationSelector: function(value: T): SubscribableOrPromise): Observable',

        gfsm:`
        只有在另一个 Observable 决定的一段特定时间经过后并且没有发出另一个源值之后，才从源 Observable 中发出一个值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        点击后不会立刻输出第一个值，等待内部源interval$发出值(这里是间隔2秒)，这之间如果没有点击事件，发出最新值。
        `,
        tbzy:`
        参考<a href="./debounceTime">debounceTime</a>理解debounce。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 3,
        marbleText: 'debounce',
        code: `

    //editArea

    let RxClick, RxDebounce, interval$;
    interval$ = Rx.Observable.interval(2000);
    RxClick = Rx.Observable.fromEvent(document, 'click');
    RxDebounce = RxClick.debounce(()=>interval$);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDebounce = RxDebounce.subscribe(NEC(showInMar, 'last'));
    resSub.RxDebounce = RxDebounce.subscribe(NEC(showInRes));
     `,},
    {
        name: 'throttle',
        title: 'throttle(durationSelector: function(value: T): SubscribableOrPromise, config: Object): Observable<T>',

        gfsm:`
        从源 Observable 中发出一个值，然后在由另一个 Observable 决定的期间内忽略 随后发出的源值，然后重复此过程。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        点击后立刻输出第一个值，等待内部源interval$发出值(这里是间隔2秒)，过了这个间隔之后，才能继续发出值。
        `,
        tbzy:`
        参考<a href="./throttleTime">throttleTime</a>，理解throttle。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 3,
        marbleText: 'throttle',
        code: `

   //editArea

    let RxClick, RxThrottle, interval$;
    interval$ = Rx.Observable.interval(2000);
    RxClick = Rx.Observable.fromEvent(document, 'click');
    RxThrottle = RxClick.throttle(()=>interval$);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxThrottle = RxThrottle.subscribe(NEC(showInMar, 'last'));
    resSub.RxThrottle = RxThrottle.subscribe(NEC(showInRes));
     `,},
    {
        name: 'auditTime',
        title: 'auditTime(duration: number, scheduler: Scheduler): Observable<T>',

        gfsm:`
        duration 毫秒内忽略源值，然后发出源 Observable 的最新值， 并且重复此过程。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        收到第一个源不会立刻发送最新值，而是等待间隔时间后发送最新值，此处最后一行不论点击多少次会等2秒才会发送最新值。
        `,
        tbzy:`
        就像每一次输入需要2秒钟的审核才允许发出，最后发出最新的值。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'auditTime',
        code: `

    //editArea

        let RxClick, RxAuditTime;
        RxClick = Rx.Observable.fromEvent(document, 'click');
        RxAuditTime = RxClick.auditTime(2000);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxAuditTime = RxAuditTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxAuditTime = RxAuditTime.subscribe(NEC(showInRes));
     `,},
    {
        name: 'throttleTime',
        title: 'throttleTime(duration: number, scheduler: Scheduler): Observable<T>',

        gfsm:`
        从源 Observable 中发出一个值，然后在 duration 毫秒内忽略随后发出的源值， 然后重复此过程。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        收到第一个click立刻发送，这里间隔时间2秒，这2秒内忽略其他任何点击。
        `,
        tbzy:`
        就像游戏里的技能CD，需要冷却，冷却时按键无反应，最后发射的不一定是最新值。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'throttleTime',
        code: `

    //editArea

    let RxClick, RxThrottleTime;
        RxClick = Rx.Observable.fromEvent(document, 'click');
        RxThrottleTime = RxClick.throttleTime(2000);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxThrottleTime = RxThrottleTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxThrottleTime = RxThrottleTime.subscribe(NEC(showInRes));


     `,},
    {
        name: 'debounceTime',
        title: 'debounceTime(dueTime: number, scheduler: Scheduler): Observable',

        gfsm:`
        只有在特定的一段时间经过后并且没有发出另一个源值，才从源 Observable 中发出一个值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        有click就取消上一次的，间隔时间可超过2秒，最后发送最新值。
        `,
        tbzy:`
        就像相机不能被抖动，一旦有抖动，丢弃之前的对焦结果重新对焦，最后发出的最新值。
        `,
        hits: 762,
        useful: 875,
        categories:'Filtering Operators',
        //line: 2,
        marbleText: 'debounceTime',
        code: `

    //editArea

    let RxClick,RxDebounceTime;
    RxClick =Rx.Observable.fromEvent(document,'click');
    RxDebounceTime = RxClick.debounceTime(2000);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDebounceTime = RxDebounceTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxDebounceTime = RxDebounceTime.subscribe(NEC(showInRes));

     `,},
    {
        name: 'concatMap',
        title: ' concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable',

        gfsm:`
        将源值投射为一个合并到输出 Observable 的 Observable,以串行的方式等待前一个完成再合并下一个 Observable。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        先转换成高阶observable（map），再转换成一阶observable，此处累计click的次数，然后按顺序依次执行。
        `,
        tbzy:`
        其实内部就是先map，再concatAll。
        `,
        hits: 762,
        useful: 875,
        categories:'Transformation Operators',
        //line: 2,
        marbleText: 'concatMap',
        code: `

    //editArea

    let RxClick,interval$,RxConcatMap;
    RxClick = Rx.Observable.fromEvent(document,'click').take(3);
    interval$ = Rx.Observable.interval(1000).take(3);
    RxConcatMap = RxClick.concatMap(ev=>interval$);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxConcatMap = RxConcatMap.subscribe(NEC(showInMar, 'last'));
    resSub.RxConcatMap = RxConcatMap.subscribe(NEC(showInRes));


     `,},
    {
        name: 'concatAll',
        title: 'concatAll(): Observable',

        gfsm:`
        通过顺序地连接内部 Observable，将高阶 Observable 转化为一阶 Observable 。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        将高阶observable(类似obs1$.map(obs2$))转换成一阶observable，此处所展示效果相当于使用了concatMap，此处用的是先map，后concatAll。
        `,
        tbzy:`
        无。
        `,
        hits: 762,
        useful: 875,
        categories:'Combination Operators',
        //line: 2,
        marbleText: 'concatAll',
        code: `

    //editArea

    let RxClick,interval$,highOrder,RxConcatAll;
    RxClick = Rx.Observable.fromEvent(document,'click');
    interval$ = Rx.Observable.interval(1000).take(3);
    highOrder = RxClick.map(ev=>interval$);
    RxConcatAll = highOrder.concatAll();

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxConcatAll = RxConcatAll.subscribe(NEC(showInMar, 'last'));
    resSub.RxConcatAll = RxConcatAll.subscribe(NEC(showInRes));

`,
    },
       {
        name: 'catch',
        title: 'catch(selector: function): Observable',

        gfsm:`
        捕获 observable 中的错误，可以通过返回一个新的 observable 或者抛出错误对象来处理。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        selector(参数)接受 err 参数，即错误对象，还接受 caught 参数，即源 Observable。<br>
        这里当外部源数字到3，就会抛出错误，然后利用caught参数重复它本身。
        `,
        tbzy:`
        无。
        `,
        hits: 1235,
        useful: 451,
        categories:'Error Handling Operators',
        //line: 2,
        marbleText: 'catch',
        code: `

    //editArea

    let RxMergeMapThrow, interval$ ,throw$,RxCatch;
    interval$ = Rx.Observable.interval(500);
    throw$=Rx.Observable.throw();
    RxMergeMapThrow = interval$.mergeMap(n=>n===3 ? throw$: Rx.Observable.of(n));
    RxCatch=RxMergeMapThrow.catch((e,caught)=>caught).take(20);

    //editArea


    marSub.RxMergeMapThrow = RxMergeMapThrow.subscribe(NEC(showInMar, 1));
    marSub.RxCatch = RxCatch.subscribe(NEC(showInMar, 'last'));
    resSub.RxCatch = RxCatch.subscribe(NEC(showInRes));

`,
    },
    {
        name: 'do',
        title: 'do(nextOrObserver: Observer | function, error: function, complete: function): Observable',

        gfsm:`
        为源 Observable 上的每次发送执行副作用，但返回的 Observable 与源 Observable 是相同的。
        拦截源 Observable 上的每次发送并且运行一个函数，但返回的输出 Observable 与 源 Observable 是相同的，只要不发生错误即可。
        `,
        czsm:`
        点击开始即可。
        `,
        cclj:`
        3个参数，分别是next,error,complete，这里next设置为n=>n*5，但实际返回的源就是初始源。
        `,
        tbzy:`
        无。
        `,
        hits: 1235,
        useful: 451,
        categories:'Utility Operators',
        //line: 2,
        marbleText: 'do',
        code: `

    //editArea

    let RxInterval,RxDo;
    RxInterval = Rx.Observable.interval(1000).take(5);
    RxDo = RxInterval.do(n=>n*5);

    //editArea


    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxDo = RxDo.subscribe(NEC(showInMar, 'last'));
    resSub.RxDo = RxDo.subscribe(NEC(showInRes));

`,
    },
    {
        name: 'concat',
        title: 'concat(other: ObservableInput, scheduler: Scheduler): Observable',

        gfsm:`
        创建一个输出 Observable，它在当前 Observable 之后顺序地发出每个给定的输入 Observable 中的所有值。
        `,
        czsm:`
        点击开始后，使用click触发。
        `,
        cclj:`
        将2个源按顺序合并，点击3次鼠标后开始interval，这两个发射源结果是合并的。
        `,
        tbzy:`
        会等第一个源结束后才开始第二个源值合并。
        `,
        hits: 1235,
        useful: 451,
        categories:'Combination Operators',
        //line: 2,
        marbleText: 'concat',
        code: `

    //editArea

    let RxClick,interval$,RxConcat;
    RxClick = Rx.Observable.fromEvent(document,'click').take(3);
    interval$ = Rx.Observable.interval(1000).take(3);
    RxConcat = RxClick.concat(interval$);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxConcat = RxConcat.subscribe(NEC(showInMar, 'last'));
    resSub.RxConcat = RxConcat.subscribe(NEC(showInRes));

`,
    }
]
export const notFoundData = {
    title:  '无数据',
    name:   '无数据',
    gfsm:   '无数据',
    czsm:   '无数据',
    cclj:   '无数据',
    tbzy:   '无数据',
    code:   '无数据',
    //line: 0,
    marbleText: '无数据'
}


function fillDeepList() {
    for (var i = 0; i < Data.length; i++) {
        let deepObj = {
            id: count++,
            name: Data[i].name,
            firstCapital:Data[i].name[0].toUpperCase(),
            hits: Data[i].hits,
            useful: Data[i].useful
        }
        _deepList.push(deepObj)
    }
    return _deepList;
}
_deepList = fillDeepList()

/*
 * deepList=[
 *   {id:1,name:xxx,hits:1,useful:1},
 *   {id:2,name:xxx,hits:5,useful:21},
 *   {id:3,name:xxx,hits:2341,useful:541}
 * ]
 *
 */


export let deepList = _deepList
