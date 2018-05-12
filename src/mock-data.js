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
        caption: '说明：' + '三行同时刷出小球 timer(0,30)',
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
        name: 'pluck',
        title: 'pluck(properties: ...string): Observable',
        caption: `
        官方说明：将每个源值(对象)映射成它指定的嵌套属性。<br>
        操作说明：点击开始后，使用click触发。<br>
        此处理解：每次click将会获取目标('event.target.tagName')，返回新的Observable然后显示。<br>
        特别注意：如果嵌套属性无法找到，返回undefined。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：将源 Observable 一分为二，一个是所有满足 predicate 函数的值，另一个是所有 不满足 predicate 的值。<br>
        操作说明：点击开始即可。<br>
        此处理解：这里partition$将发射源分为偶数和奇数，返回值是数组，数组内分别为偶数Observable和奇数Observable。<br>
        特别注意：返回值是一个数组[]，不是Observable。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：将一系列连续的发送成对的组合在一起，并将这些分组作为两个值的数组发出。<br>
        操作说明：点击开始即可。<br>
        此处理解：当发射源发射值到达2个时，每次发射值，都将最新值和前一次的值作为数组传递，然后将两个值相加。<br>
        特别注意：只有在有2个值时，才会开始出发pairwise。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：当任何提供的 Observable 发出完成或错误通知时，它会立即地订阅已传入下一个 Observable 。<br>
        操作说明：点击开始即可。<br>
        此处理解：第一行是会发出错误的Observable，当第一行发出错误被onErrorResumeNext接收到，onErrorResumeNext不会发出错误，而是继续执行它内部的Observable。<br>
        特别注意：类似concat，但即便发生错误也继续进行，使用onErrorResumeNext后，无法获得错误通知。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：返回的 Observable 发出对 ConnectableObservable 发出的项调用一个指定的 selector 函数的结果， ConnectableObservable 可以在潜在的多个流之间共享单个 subscription 。<br>
        操作说明：点击开始即可。<br>
        此处理解：第1行为立即订阅；<br>
        第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>
        第3行隔4秒订阅，此时之前发射源状态是complete，<strong>直接进入complete</strong>；<br>
        第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>
        第5行隔8秒订阅，此时之前发射源状态是unsubscribe，<strong>共享数据</strong>；<br>
        <strong>结论：共享数据；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error</strong>`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：在源 Observable 上应用 accumulator 函数，其中 accumulator 函数本身返回 Observable ，然后每个返回的中间 Observable 会被合并到输出 Observable 中。<br>
        操作说明：点击开始后，使用click触发。<br>
        此处理解：累计click的次数。与scan类似，每次计算都有返回值，返回值是内部源(of$)的最新值。<br>
        特别注意：每当外部源触发时，内部源(of$)的最新值是会返回给外部源，作为新的acc参与到新的内部源；因此如果内部源使用interval等长时间源值不断变化的操作符，结果就会根据点击位置而改变。因为内部源的最新值一直在变。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：将每个源值投射成同一个 Observable ，该 Observable 会多次合并到输出 Observable 中。<br>
        操作说明：点击开始后，使用click触发。<br>
        此处理解：这里的内部源(interval$)是定值(不是function)，每次click时，都触发相同的内部发射源。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：将每个源值投射成 Observable ，该 Observable 会合并到输出 Observable 中。<br>
        操作说明：点击开始后，使用click触发。<br>
        此处理解：先理解mergeAll，这里就是先map，再mergeAll，将高阶Observable打平合并。<br>
        这里每次click后，内部源从加上click次数开始递增。`,
        hits: 152,
        useful: 562,
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
        caption: `
        官方说明：将高阶 Observable 转换成一阶 Observable ，一阶 Observable 会同时发出在内部 Observables 上发出的所有值。<br>
        操作说明：点击开始后，使用click触发。<br>
        此处理解：将高阶Observable打平，再合并，合并规则与merge一样，参数为最多同时订阅的数量，此处最多同时订阅2个输入源。<br>
        这里每次click后，内部源从加上click次数开始递增。<br>
        特别注意：任何由内部 Observable 发出的错误都会立即在输出 Observalbe 上发出。`,
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '组合多个 Observables 来创建一个 Observable ，该 Observable 的值根据每个输入 Observable 的最新值计算得出的。'+
        '为了保证输出数组的长度相同，combineLatest 实际上会等待所有的输入 Observable 至少发出一次， 在返回 Observable 发出之前。'+
        '这意味着如果某个输入 Observable 在其余的输入 Observable 之前发出，它所发出 的值只保留最新的。<br>'+
        '操作说明：点击开始即可。<br>'+
        '此处理解：第三个参数project：function可选，接受上一次的最新值作为参数，这里是(x,y)=>x+y；<br>'+
        '1秒后interval1发出0，此时interval2还未发出值，因此等待；<br>'+
        '1.5秒后，interval2发出0，此时interval1最新值为0，intervale2最新值为0，发出x+y即0；<br>'+
        '2秒后，interval1发出1，最新值为1，interval2最新值还是0，发出x+y即1；<br>3秒后，interval2最新值为1，发出x+y即2。<br>'+
        '特别注意：当任何一个发射源出现错误，combineLatest也发出错误。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '通过等待外部 Observable 完成然后应用 combineLatest ，将高阶 Observable 转化为一阶 Observable。<br>'+
        '操作说明：点击2次后，触发combineAll。<br>'+
        '此处理解：RxClick是外部源，点击2次即结束，RxClick.map(e=>interval$)是一个高阶Observable，如果没有combineAll，那么结果就是每次点击后，触发interval$，类似：<br>'+
        'click1->interval1$(0,1,2)<br>'+
        'click2->interval2$(0,1,2)<br>'+
        '但现在用了combineAll，即将他们任何变更后最新的值组合一起<br>'+
        '当click1触发的interval1$的最新值为0时，click2触发的interval2$最新值最多为0，因为interval1$比interval2$提前触发，因此第一个组合[0,0]；<br>'+
        '当interval1$最新值变成1时，interval2$还是0，组合[1,0]；<br>'+
        '然后interval2$再变成1，组合[1,1]；<br>'+
        '当interval1$最新值变成2时，interval2$还是1，因此组合[2,1]；<br>'+
        '然后interval2$再变成2，组合[2,2]。<br>'+
        '特别注意：最好先要理解combineLatest（任何源任何变动都发出所有最新值）。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '缓冲源 Observable 的值, 使用关闭 Observable 的工厂函数来决定何时关闭、发出和重置缓冲区。<br>'+
        '此处理解：第一行为发射源的值，每秒递增1，源值一发射立刻开启缓冲区，当鼠标click，结束当前缓冲区，发出缓冲值，然后立刻开启新的缓冲区，一直重复。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '缓冲源 Observable 的值，openings 发送的时候开始缓冲，closingSelector 发送的时候结束缓冲。<br>'+
        '此处理解：第一行为发射源的值，每秒递增1，这里opening是第一次click，closingSelector是click之后3秒，结果为之间的值(Array)。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '在特定时间周期内缓冲源 Observable 的值。<br>'+
        '此处理解： bufferTimeSpan是每隔多久发出之前的所有缓冲值，这里是2200ms；bufferCreationInterval是隔多久开始新的缓冲区，'+
        '这里是3300ms，即创建新缓冲区的间隔都是3300ms；因此第一个缓冲区创建在0的位置，第二个创建在3.3的位置，第三个创建在6.6的'+
        '位置，但因为bufferTimeSpan是2200ms; <br>'+
        '因此第一个缓冲区到了2.2的位置，就会发出之前的所有缓冲值，而2.2-3.3这一段内的值(即3)会被忽略，<br>'+
        '第二个缓冲区从3.3开始，bufferTimeSpan是2200ms,因此第二个到5.5的位置，就会发出之前所有缓冲值，而5.5-6.6这一段值(即6)会被忽略，<br>'+
        '第三个缓冲区从6.6开始，bufferTimeSpan是2200ms,因此第三个个到8.8的位置发射之前所有缓冲值，然后9的时候complete。 <br>'+
        '特别注意：此处一定要弄清楚第二个参数是创建新缓冲区，而不是清空旧的缓冲区，因此缓冲区可以有很多个。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '缓冲源 Observable 的值直到缓冲数量到达设定的 bufferSize<br>'+
        '此处理解：bufferSize是每次发出缓冲值数量，这里是3；startBufferEvery是何时开始新的缓冲区，'+
        '这里是4，即每个新缓冲区的间隔都是4，因此第一个缓冲区创建在0的位置，第二个创建在4的位置，第三个'+
        '创建在8的位置，但因为bufferSize是3，因此只会发出新缓存区的前3个值（最后1个值不发），而当到了9，发生complete'+
        '而从8开始创建的缓冲区（第三个缓冲区）到9只有2个值，因此最后一次发出2个值。<br>'+
        '特别注意：此处一定要弄清楚第二个参数是创建新缓冲区，而不是清空旧的缓冲区，因此缓冲区可以有很多个。',
        hits: 152,
        useful: 562,
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
        caption: '说明：' + '缓冲源 Observable 的值直到 closingNotifier 发出<br>'+
        '此处理解：每当收到closingNotifier，这里是click事件，变会将之前缓冲的值一次性以数组形式发出。<br>'+
        '特别注意：buffer的缓冲区只有1个，每次发出缓冲值后即清空缓冲区再等待接受新的缓冲值，与bufferCount和bufferTime不同。',
        hits: 0,
        useful: 0,
        doNotNeedAuto:false,
        //line: 3,
        marbleText: 'buffer',
        code: `

    //editArea
  
    let RxClick,RxTimer,RxBuffer;
    RxClick = Rx.Observable.fromEvent(document, 'click');
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
        title: 'publish().refCount()，不需要connect，共享数据',
        caption: '说明：' + '此处前3行发射源是"publish$"，后2行发射源是"publish2$"；<br>' +
        '第1行为立即订阅；<br>' +
        '第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>' +
        '第3行隔4秒订阅，此时之前发射源状态是complete，<strong>直接进入complete</strong>；<br>' +
        '第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>' +
        '第5行隔8秒订阅，此时之前发射源状态是unsubscribe，<strong>直接进入complete</strong>；<br>' +
        '<strong>结论：共享数据；前面数据complete，complete；前面数据unsubscribe，complete；前面数据error，error</strong>',
        hits: 452,
        useful: 842,
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
        title: 'publish 共享数据，直到connect方法被调用才会开始把值发送给那些订阅它的观察者',
        caption: '说明：' + '此处前3行发射源是"publish$"，后2行发射源是"publish2$"；<br>' +
        '第1行为立即订阅；<br>' +
        '第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>' +
        '第3行隔4秒订阅，此时之前发射源状态是complete，<strong>直接进入complete</strong>；<br>' +
        '第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>' +
        '第5行隔8秒订阅，此时之前发射源状态是unsubscribe，<strong>共享数据</strong>；<br>' +
        '<strong>结论：共享数据；前面数据complete，complete；前面数据unsubscribe，共享数据；前面数据error，error</strong>',

        hits: 452,
        useful: 842,
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
        title: 'share 返回一个新的 Observable，该 Observable 多播(共享)源 Observable',
        caption: '说明：' + '此处前3行发射源是"share$"，后2行发射源是"share2$"；<br>' +
        '第1行为立即订阅；<br>' +
        '第2行隔2秒后订阅，订阅时第1行还在继续订阅，数据共享；<br>' +
        '第3行隔4秒订阅，此时之前发射源状态是complete，<strong>从头开始</strong>；<br>' +
        '第4行隔6秒重新订阅（新的发射源），并且在第7秒的时候unsubscribe，让它状态进入unsubscribe而不是complete；<br>' +
        '第5行隔8秒订阅，此时之前发射源状态是unsubscribe，<strong>从头开始</strong>；<br>' +
        '<strong>结论：共享数据；前面数据complete，从头开始；前面数据unsubscribe，从头开始；前面数据error，error</strong>',
        hits: 452,
        useful: 842,
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
        title: 'scan 每次计算返回结果',
        caption: '说明：' + '与reduce不同处在于返回结果的次数；参数1是一个function(累积器)，参数2是初始值；' +
        '其中参数1function有2个参数，function(acc,cur)，其中acc第一次为初始值 || 当前值，后续则为 上一次计算得出的值，' +
        'cur则是 当前值，函数内容为自定义计算方式；直到complete，每次计算都会结果',
        hits: 715,
        useful: 412,
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
        title: 'reduce 最终返回一次结果',
        caption: '说明：' + '与scan不同处在于返回结果的次数；参数1是一个function(累积器)，参数2是初始值；' +
        '其中参数1function有2个参数，function(acc,cur)，其中acc第一次为初始值 || 当前值，后续则为 上一次计算得出的值，' +
        'cur则是 当前值，函数内容为自定义计算方式；直到complete，返回 1 次结果',
        hits: 715,
        useful: 412,
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
        title: 'takeUntil:参数为另一个发射源，当发射值时，发出complete',
        caption: '说明：' + '参数隔3秒发出1，当1发出，立刻complete',
        hits: 715,
        useful: 412,
        //line: 3,
        marbleText: 'takeUntil',
        code: `

    //editArea

    let RxIntervalTake5,RxOfDelay, RxTakeUntil;
    RxIntervalTake5 = Rx.Observable.interval(1000).take(5);
    RxOfDelay = Rx.Observable.of(1).delay(3500);
    RxTakeUntil = RxIntervalTake5.takeUntil(RxOfDelay);

    //editArea


    marSub.RxIntervalTake5 = RxIntervalTake5.subscribe(NEC(showInMar, 1));
    marSub.RxOfDelay = RxOfDelay.subscribe(NEC(showInMar, 2));
    marSub.RxTakeUntil = RxTakeUntil.subscribe(NEC(showInMar, 'last'));
    resSub.RxTakeUntil = RxTakeUntil.subscribe(NEC(showInRes));
         `},
    {
        name: 'takeWhile',
        title: 'takeWhile:参数返回false时，发出complete',
        caption: '说明：' + '参数的条件是n<4，因此n为4时，发出complete',
        hits: 715,
        useful: 412,
        //line: 2,
        marbleText: 'takeWhile(n=>n<4)',
        code: `

    //editArea

    let RxIntervalTake7, RxTakeWhile;
    RxIntervalTake7 = Rx.Observable.interval(1000).take(7);
    RxTakeWhile = RxIntervalTake7.takeWhile(n=>n<4);

    //editArea

    marSub.RxIntervalTake7 = RxIntervalTake7.subscribe(NEC(showInMar, 1));
    marSub.RxTakeWhile = RxTakeWhile.subscribe(NEC(showInMar, 'last'));
    resSub.RxTakeWhile = RxTakeWhile.subscribe(NEC(showInRes));

     `,},
    {
        name: 'retryWhen',
        title: 'retryWhen:重复发射源，直到内部源(条件源)发出complete或者error',
        caption: '说明：' + '在重复条件下，retryWhen总是能重复发射源的镜像，但不包括error；此处条件为interval值>=3时发出error，此处第一行为发射源' +
        '虽然很快error，但是error并不影响retryWhen，第二行为重复的条件，即条件发射源一旦触发并且符合重复的条件（未complete，未error），' +
        '立刻开始重复一次发射源的镜像  ',
        hits: 715,
        useful: 412,
        //line: 3,
        marbleText: 'retryWhen',
        code: `

    //editArea

    let RxInterval, RxTimer_Throw, RxRetryWhen;
    RxTimer_Throw=Rx.Observable.timer(0,200).map(n=>{if(n===3){throw 'err'};return n});
    RxInterval = Rx.Observable.interval(1000).takeWhile(x=>x<3);
    RxRetryWhen =RxTimer_Throw.retryWhen(()=>RxInterval);

    //editArea


    marSub.RxTimer_Throw = RxTimer_Throw.subscribe(NEC(showInMar, 1));
    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 2));
    marSub.RxRetryWhen = RxRetryWhen.subscribe(NEC(showInMar, 'last'));
    resSub.RxRetryWhen = RxRetryWhen.subscribe(NEC(showInRes));

     `},
    {
        name: 'repeatWhen',
        title: 'repeatWhen:重复发射源，直到内部源(条件源)发出complete或者error',
        caption: '说明：' + '在重复条件下，repeatWhen总是能重复发射源的镜像，但不包括complete；此处条件为interval值>=3则发出complete，此处第一行为发射源' +
        '虽然很快complete，但是complete并不影响repeatWhen，第二行为重复的条件，即条件发射源一旦触发并且符合重复的条件（未complete，未error），' +
        '立刻开始重复一次发射源的镜像 ',
        hits: 915,
        useful: 612,
        //line: 3,
        marbleText: 'repeatWhen',
        code: `

    //editArea

    let RxInterval_takeWhile, RxTimer0_100, RxRepeatWhen;
    RxTimer0_100=Rx.Observable.timer(0,100).take(3);
    RxInterval_takeWhile = Rx.Observable.interval(1000).takeWhile(x=>x<5);
    RxRepeatWhen =RxTimer0_100.repeatWhen(()=>RxInterval_takeWhile);

    //editArea


    marSub.RxTimer0_100 = RxTimer0_100.subscribe(NEC(showInMar, 1));
    marSub.RxInterval_takeWhile = RxInterval_takeWhile.subscribe(NEC(showInMar, 2));
    marSub.RxRepeatWhen = RxRepeatWhen.subscribe(NEC(showInMar, 'last'));
     resSub.RxRepeatWhen = RxRepeatWhen.subscribe(NEC(showInRes));
     `,},
    {
        name: 'merge',
        title: ' merge(other: ObservableInput, concurrent: number, scheduler: Scheduler): Observable',
        caption: '说明：' + '创建一个输出 Observable ，它可以同时发出每个给定的输入 Observable 中的所有值。<br>'+
        '操作说明：点击开始即可。<br>'+
        '此处理解：不管发射源顺序，直接合并。',
        hits: 985,
        useful: 612,
        //line: 3,
        marbleText: 'merge',
        code: `

    //editArea

    let RxInterval, RxTimer500_2000, RxMerge;
    RxInterval = Rx.Observable.interval(1500).take(3);
    RxTimer500_2000 = Rx.Observable.timer(500, 2000).take(2);
    RxMerge = Rx.Observable.merge(RxInterval, RxTimer500_2000);

    //editArea


    marSub.RxInterval = RxInterval.subscribe(NEC(showInMar, 1));
    marSub.RxTimer500_2000 = RxTimer500_2000.subscribe(NEC(showInMar, 2));
    marSub.RxMerge = RxMerge.subscribe(NEC(showInMar, 'last'));
     resSub.RxMerge = RxMerge.subscribe(NEC(showInRes));
     `,},
    {
        name: 'forkJoin',
        title: 'forkJoin:将最终结果合并成1个数组',
        caption: '说明：' + ' 第一个发射源执行显示1到6(几乎同时),第二个发射源每隔1s显示增加1,' +
        'forkJoin会等全部发射源完成结束后，才将各自的最终结果合并成1个数组',
        hits: 1524,
        useful: 912,
        //line: 3,
        marbleText: 'forkJoin',
        code: `

    //editArea

    let RxRange, RxTimer0_1000, RxForkJoin;
    RxRange = Rx.Observable.range(1, 6);
    RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(3);
    RxForkJoin = Rx.Observable.forkJoin(RxRange, RxTimer0_1000);

    //editArea


    marSub.RxRange = RxRange.subscribe(NEC(showInMar, 1));
    marSub.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showInMar, 2));
    marSub.RxForkJoin = RxForkJoin.subscribe(NEC(showInMar, 'last'));
      resSub.RxForkJoin = RxForkJoin.subscribe(NEC(showInRes));
     `,},
    {
        name: 'distinctUntilKeyChange',
        title: 'distinctUntilKeyChange 只对比前一项，通过参数中的key值去比较value',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据 x 值去重，可以在Result看到原来4组obj，' +
        '对比前一项去重后剩下第1,3,4组',
        hits: 25,
        useful: 89,
        //line: 2,
        marbleText: 'distinctUntilKeyChange',
        code: `

    //editArea

    let RxFrom,RxDistinctUntilKeyChanged;
    RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
    RxDistinctUntilKeyChanged = RxFrom.distinctUntilKeyChanged('x',(prevV,nextV)=>prevV===nextV);

    //editArea


    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxDistinctUntilKeyChanged = RxDistinctUntilKeyChanged.subscribe(NEC(showInMar, 'last'));
    resSub.RxDistinctUntilKeyChanged = RxDistinctUntilKeyChanged.subscribe(NEC(showInRes));
     `,},
    {
        name: 'distinctUntilChange',
        title: 'distinctUntilChange 只对比前一项',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据当前项 x 和上一项 y 对比去重，可以在Result看到原来4组obj，' +
        '对比前一项去重后剩下第1,2,4组',
        hits: 273,
        useful: 425,
        //line: 2,
        marbleText: 'distinctUntilChange',
        code: `

    //editArea

    let RxFrom,RxDistinctUntilChange;
    RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:2},{x:2,y:4},{x:1,y:6}]);
    RxDistinctUntilChange = RxFrom.distinctUntilChanged((prevObj,nextObj)=>prevObj.y===nextObj.x);

    //editArea


    marSub.RxFrom = RxFrom.subscribe(NEC(showInMar, 1));
    marSub.RxDistinctUntilChange = RxDistinctUntilChange.subscribe(NEC(showInMar, 'last'));
    resSub.RxDistinctUntilChange = RxDistinctUntilChange.subscribe(NEC(showInRes));
     `,},
    {
        name: 'distinct',
        title: 'distinct 全部对比并且去重复',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据x值去重，可以在Result看到原来4组obj，去重后剩下2组',
        hits: 213,
        useful: 745,
        //line: 2,
        marbleText: 'distinct',
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
        title: 'delayWhen：根据另一个源来执行延迟',
        caption: '说明：' + ' 源RxOf根据RxClick触发后才触发，此处点击屏幕后才会显示start',
        hits: 78,
        useful: 527,
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
        title: 'delay：参数为延迟的时间（毫秒）',
        caption: '说明：' + '点击后第一行为当前点击，最后一行为实际输出（此处延迟1秒），点击5次后complete',
        hits: 42,
        useful: 128,
        //line: 2,
        marbleText: 'delay',
        code: `

    //editArea

    let RxClick,RxDelay;
    RxClick = Rx.Observable.fromEvent(document,'click');
    RxDelay = RxClick.delay(1000);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDelay = RxDelay.subscribe(NEC(showInMar, 'last'));
    resSub.RxDelay = RxDelay.subscribe(NEC(showInRes));
     `,},
    {
        name: 'audit',
        title: 'audit:等待时间由另一个observable决定，不会立刻发送第一个源',
        caption: '说明：' + '点击后会立刻输出最新值，此处是1秒内任意多次点击也只发出1次值，<font color="#8d8d8d">跟debounce很像，暂时未弄清楚区别?</font>' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        //line: 3,
        marbleText: 'audit',
        code: `

    //editArea

    let RxClick, RxTimer0_1000, RxAudit;
    RxClick = Rx.Observable.fromEvent(document, 'click');
    RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
    RxAudit = RxTimer0_1000.audit(()=>RxClick);

    //editArea

    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showInMar, 2));
    marSub.RxAudit = RxAudit.subscribe(NEC(showInMar, 'last'));
    resSub.RxAudit = RxAudit.subscribe(NEC(showInRes));
     `,},
    {
        name: 'debounce',
        title: ' debounce(durationSelector: function(value: T): SubscribableOrPromise): Observable',
        caption: '说明：' + '只有在另一个 Observable 决定的一段特定时间经过后并且没有发出另一个源值之后，才从源 Observable 中发出一个值。<br>' +
        '此处理解：当接受到第一个值，不会立刻发送。后续点击后立刻发出当前值，而不像throttle等待下一次的最新值，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        //line: 3,
        marbleText: 'debounce',
        code: `

    //editArea

    let RxTimer0_1000, RxClick, RxDebounce;
    RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
    RxClick = Rx.Observable.fromEvent(document, 'click');
    RxDebounce = RxTimer0_1000.debounce(()=>RxClick);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showInMar, 2));
    marSub.RxDebounce = RxDebounce.subscribe(NEC(showInMar, 'last'));
    resSub.RxDebounce = RxDebounce.subscribe(NEC(showInRes));
     `,},
    {
        name: 'throttle',
        title: ' throttle(durationSelector: function(value: T): SubscribableOrPromise, config: Object): Observable\<\T\>',
        caption: '说明：' + '从源 Observable 中发出一个值，然后在由另一个 Observable 决定的期间内忽略 随后发出的源值，然后重复此过程。<br>' +
        '此处理解：当收到第一个值，不等待直接立刻发出，后续点击后不立刻发出，而是会等下一个发射源，再发射出去，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        //line: 3,
        marbleText: 'throttle',
        code: `

    //editArea

    let RxTimer0_1000,RxClick,RxThrottle;
    RxTimer0_1000 =  Rx.Observable.timer(0,1000);
    RxClick =Rx.Observable.fromEvent(document,'click');
    RxThrottle = RxTimer0_1000.throttle(()=>RxClick);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showInMar, 2));
    marSub.RxThrottle = RxThrottle.subscribe(NEC(showInMar, 'last'));
    resSub.RxThrottle = RxThrottle.subscribe(NEC(showInRes));
     `,},
    {
        name: 'auditTime',
        title: 'auditTime(duration: number, scheduler: Scheduler): Observable\<\T\>',
        caption: '说明：' + 'duration 毫秒内忽略源值，然后发出源 Observable 的最新值， 并且重复此过程。<br>' +
        '此处理解：收到第一个源不会立刻发送最新值，而是等待间隔时间后发送最新值，此处最后一行不论点击多少次会等1秒才会发送最新值',
        hits: 762,
        useful: 875,
        //line: 2,
        marbleText: 'auditTime',
        code: `

    //editArea

        let RxClick, RxAuditTime;
        RxClick = Rx.Observable.fromEvent(document, 'click');
        RxAuditTime = RxClick.auditTime(1000)

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxAuditTime = RxAuditTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxAuditTime = RxAuditTime.subscribe(NEC(showInRes));
     `,},
    {
        name: 'throttleTime',
        title: 'throttleTime(duration: number, scheduler: Scheduler): Observable\<\T\>',
        caption: '说明：' + '从源 Observable 中发出一个值，然后在 duration 毫秒内忽略随后发出的源值， 然后重复此过程。<br>' +
        '此处理解：收到第一个源立刻发送此处，有click就取消上一次的，这里间隔时间最多1秒',
        hits: 762,
        useful: 875,
        //line: 2,
        marbleText: 'throttleTime',
        code: `

    //editArea

    let RxClick, RxThrottleTime;
        RxClick = Rx.Observable.fromEvent(document, 'click');
        RxThrottleTime = RxClick.throttleTime(1000)

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxThrottleTime = RxThrottleTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxThrottleTime = RxThrottleTime.subscribe(NEC(showInRes));


     `,},
    {
        name: 'debounceTime',
        title: 'debounceTime(dueTime: number, scheduler: Scheduler): Observable',
        caption: '说明：' + '只有在特定的一段时间经过后并且没有发出另一个源值，才从源 Observable 中发出一个值。<br>' +
        '此处理解：有click就取消上一次的，间隔时间可超过1秒，最后发送最新值',
        hits: 762,
        useful: 875,
        //line: 2,
        marbleText: 'debounceTime',
        code: `

    //editArea

    let RxClick,RxDebounceTime;
    RxClick =Rx.Observable.fromEvent(document,'click');
    RxDebounceTime = RxClick.debounceTime(1000);

    //editArea


    marSub.RxClick = RxClick.subscribe(NEC(showInMar, 1));
    marSub.RxDebounceTime = RxDebounceTime.subscribe(NEC(showInMar, 'last'));
    resSub.RxDebounceTime = RxDebounceTime.subscribe(NEC(showInRes));

     `,},
    {
        name: 'concatMap',
        title: ' concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable',
        caption: '说明：将源值投射为一个合并到输出 Observable 的 Observable,以串行的方式等待前一个完成再合并下一个 Observable。<br>' +
        '此处理解：先转换成高阶observable（map），再转换成一阶observable，此处累计click的次数，然后按顺序依次执行',
        hits: 762,
        useful: 875,
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
        caption: '说明：通过顺序地连接内部 Observable，将高阶 Observable 转化为一阶 Observable 。<br>' +
        '此处理解：将高阶observable(类似obs1$.map(obs2$))转换成一阶observable，此处所展示效果相当于使用了concatMap，此处用的是先map 后concatAll',
        hits: 762,
        useful: 875,
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
        name: 'concat',
        title: 'concat(other: ObservableInput, scheduler: Scheduler): Observable',
        caption: '说明：创建一个输出 Observable，它在当前 Observable 之后顺序地发出每个给定的输入 Observable 中的所有值。<br>' +
        '此处理解：将2个源按顺序合并，点击3次鼠标后开始interval，这两个发射源结果是合并的',
        hits: 1235,
        useful: 451,
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
    title: '无数据',
    name: '无数据',
    caption: '无数据',
    code: '无数据',
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
