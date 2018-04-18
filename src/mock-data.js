import Rx from 'rxjs/Rx';
import {changeStatus} from './tools'
let count = 0
let _deepList = [];

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
    Rx.Subscriber.prototype.complete=Rx.Subscriber.prototype.complete.addBefore(changeStatus,'complete')
    Rx.Subscriber.prototype.error=Rx.Subscriber.prototype.error.addBefore(changeStatus,'error')
    Rx.Subscriber.prototype.unsubscribe=Rx.Subscriber.prototype.unsubscribe.addBefore(changeStatus,'unsubscribe')
}
addCEUStatus()

export const shallowList = [
    {shallowTitle: '全部(按字母顺序)', sort: 'name', pathname: 'operators', notShowChild: true},
    {shallowTitle: '按点击量排序', sort: 'hits', pathname: 'hits'},
    {shallowTitle: '按常用程度排序', sort: 'useful', pathname: 'useful'}
];


/*
 * 规则：
 * 一、this.unSubMarble 的命名 都要带上Rx，再以具体的Observable命名
 * 以事件名称命名例如：this.unSubMarble.RxClick
 * 自发数据命名例如：this.unSubMarble.RxInterval,this.unSubMarble.RxOf
 *
 *
 * 二、使用NEC(next,error,complete)方法创建回调，
 * 参数1 表示要显示的方法
 * 参数2 表示要显示的行数
 *
 * 三、代码code:``最后一行不要带分号
 */


/*


 * */


export const Data = [
    {
        name: 'merge',
        title: 'merge:将发射源合并，同时执行',
        caption: '说明：' + ' merge合并不管发射源顺序，直接合并',
        hits: 985,
        useful: 612,
        line: 3,
        marbleText: 'merge',
        code: `
            //cut
            let RxClick, RxTimer0_1000, RxMerge;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(3);
            RxMerge = Rx.Observable.merge(RxClick, RxTimer0_1000)
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxTimer0_1000, RxMerge;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxTimer0_1000 = Rx.Observable.timer(0, 30).take(200);
            //RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
            //RxMerge = Rx.Observable.merge(RxClick, RxTimer0_1000)

            //this.unSubResult.RxMerge = RxMerge.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showRxjsInMarble, 2));
            //this.unSubMarble.RxMerge = RxMerge.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'forkJoin',
        title: 'forkJoin:将最终结果合并成1个数组',
        caption: '说明：' + ' 第一个发射源执行显示1到6(几乎同时),第二个发射源每隔1s显示增加1,' +
        'forkJoin会等全部发射源完成结束后，才将各自的最终结果合并成1个数组',
        hits: 1524,
        useful: 912,
        line: 3,
        marbleText: 'forkJoin',
        code: `
            //cut
            let RxRange, RxTimer0_1000, RxForkJoin;
            RxRange = Rx.Observable.range(1, 6);
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(3);
            RxForkJoin = Rx.Observable.forkJoin(RxRange, RxTimer0_1000)
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxRange, RxTimer0_1000, RxForkJoin;
            RxRange = Rx.Observable.range(1, 6);
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(3);
            RxForkJoin = Rx.Observable.forkJoin(RxRange, RxTimer0_1000);

            this.unSubResult.RxForkJoin = RxForkJoin.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxRange = RxRange.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showRxjsInMarble, 2));
            this.unSubMarble.RxForkJoin = RxForkJoin.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'distinctUntilKeyChange',
        title: 'distinctUntilKeyChange 只对比前一项，通过参数中的key值去比较value',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据 x 值去重，可以在Result看到原来4组obj，' +
        '对比前一项去重后剩下第1,3,4组',
        hits: 25,
        useful: 89,
        line: 2,
        marbleText: 'distinctUntilKeyChange',
        code: `
            //cut
            let RxFrom,RxDistinctUntilKeyChanged;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
            RxDistinctUntilKeyChanged = RxFrom.distinctUntilKeyChanged('x',(prevV,nextV)=>prevV===nextV);
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxFrom,RxDistinctUntilKeyChanged;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
            RxDistinctUntilKeyChanged = RxFrom.distinctUntilKeyChanged('x',(prevV,nextV)=>prevV===nextV);

            this.unSubResult.RxDistinctUntilKeyChanged = RxDistinctUntilKeyChanged.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxFrom = RxFrom.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDistinctUntilKeyChanged = RxDistinctUntilKeyChanged.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'distinctUntilChange',
        title: 'distinctUntilChange 只对比前一项',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据当前项 x 和上一项 y 对比去重，可以在Result看到原来4组obj，' +
        '对比前一项去重后剩下第1,2,4组',
        hits: 273,
        useful: 425,
        line: 2,
        marbleText: 'distinctUntilChange',
        code: `
            //cut
            let RxFrom,RxDistinctUntilChange;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:2},{x:2,y:4},{x:1,y:6}]);
            RxDistinctUntilChange = RxFrom.distinctUntilChanged((prevObj,nextObj)=>prevObj.y===nextObj.x);
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxFrom,RxDistinctUntilChange;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:2},{x:2,y:4},{x:1,y:6}]);
            RxDistinctUntilChange = RxFrom.distinctUntilChanged((prevObj,nextObj)=>prevObj.y===nextObj.x);

            this.unSubResult.RxDistinctUntilChange = RxDistinctUntilChange.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxFrom = RxFrom.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDistinctUntilChange = RxDistinctUntilChange.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'distinct',
        title: 'distinct 全部对比并且去重复',
        caption: '说明：' + ' 参数可以设定根据那一项进行去重，此处根据x值去重，可以在Result看到原来4组obj，去重后剩下2组',
        hits: 213,
        useful: 745,
        line: 2,
        marbleText: 'distinct',
        code: `
            //cut
            let RxFrom,RxDistinct;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
            RxDistinct = RxFrom.distinct(obj=>obj.x);
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxFrom,RxDistinct;
            RxFrom = Rx.Observable.from([{x:1,y:2},{x:1,y:3},{x:2,y:4},{x:1,y:6}]);
            RxDistinct = RxFrom.distinct(obj=>obj.x);

            this.unSubResult.RxDistinct = RxDistinct.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxFrom = RxFrom.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDistinct = RxDistinct.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'delayWhen',
        title: 'delayWhen：根据另一个源来执行延迟',
        caption: '说明：' + ' 源RxOf根据RxClick触发后才触发，此处点击屏幕后才会显示start',
        hits: 78,
        useful: 527,
        line: 2,
        marbleText: 'delayWhen',
        code: `
            //cut
               let RxOf,RxClick,RxDelayWhen;
            RxOf = Rx.Observable.of('start');
            RxClick = Rx.Observable.fromEvent(document,'click');
            RxDelayWhen = RxOf.delayWhen(e=>RxClick);
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxOf,RxClick,RxDelayWhen;
            RxOf = Rx.Observable.of('start');
            RxClick = Rx.Observable.fromEvent(document,'click').take(1);
            RxDelayWhen = RxOf.delayWhen(e=>RxClick);

            this.unSubResult.RxDelayWhen = RxDelayWhen.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDelayWhen = RxDelayWhen.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'delay',
        title: 'delay：参数为延迟的时间（毫秒）',
        caption: '说明：' + '点击后第一行为当前点击，最后一行为实际输出（此处延迟1秒），点击5次后complete',
        hits: 42,
        useful: 128,
        line: 2,
        marbleText: 'delay',
        code: `
            //cut
            let RxClick,RxDelay;
            RxClick = Rx.Observable.fromEvent(document,'click');
            RxDelay = RxClick.delay(1000)
            //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick,RxDelay;
            RxClick = Rx.Observable.fromEvent(document,'click').take(5);
            RxDelay = RxClick.delay(1000);

            this.unSubResult.RxDelay = RxDelay.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDelay = RxDelay.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'audit',
        title: 'audit:等待时间由另一个observable决定，不会立刻发送第一个源',
        caption: '说明：' + '点击后会立刻输出最新值，此处是1秒内任意多次点击也只发出1次值，<font color="#8d8d8d">跟debounce很像，暂时未弄清楚区别?</font>' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        line: 3,
        marbleText: 'audit',
        code: `
        //cut
        let RxTimer0_1000,RxClick,RxThrottle;
        RxTimer0_1000 =  Rx.Observable.timer(0,1000);
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxThrottle = RxTimer0_1000.audit(()=>RxClick)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxTimer0_1000, RxClick, RxAudit;
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxAudit = RxTimer0_1000.audit(()=>RxClick);

            this.unSubResult.RxAudit = RxAudit.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showRxjsInMarble, 2));
            this.unSubMarble.RxAudit = RxAudit.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'debounce',
        title: 'debounce:等待时间由另一个observable决定，不会立刻发送第一个源',
        caption: '说明：' + '点击后会立刻输出最新值，而不像throttle等待下一次的最新值，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        line: 3,
        marbleText: 'debounce',
        code: `
        //cut
        let RxTimer0_1000,RxClick,RxThrottle;
        RxTimer0_1000 =  Rx.Observable.timer(0,1000);
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxThrottle = RxTimer0_1000.debounce(()=>RxClick)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxTimer0_1000, RxClick, RxDebounce;
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxDebounce = RxTimer0_1000.debounce(()=>RxClick);

            this.unSubResult.RxDebounce = RxDebounce.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showRxjsInMarble, 2));
            this.unSubMarble.RxDebounce = RxDebounce.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'throttle',
        title: 'throttle:等待时间由另一个observable决定，立刻发送第一个源',
        caption: '说明：' + '点击后不立刻发出，而是会等下一个发射源，再发射出去，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        hits: 762,
        useful: 875,
        line: 3,
        marbleText: 'throttle',
        code: `
        //cut
        let RxTimer0_1000,RxClick,RxThrottle;
        RxTimer0_1000 =  Rx.Observable.timer(0,1000);
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxThrottle = RxTimer0_1000.throttle(()=>RxClick)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxTimer0_1000, RxClick, RxThrottle;
            RxTimer0_1000 = Rx.Observable.timer(0, 1000).take(10);
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxThrottle = RxTimer0_1000.throttle(()=>RxClick);

            this.unSubResult.RxThrottle = RxThrottle.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxTimer0_1000 = RxTimer0_1000.subscribe(NEC(showRxjsInMarble, 2));
            this.unSubMarble.RxThrottle = RxThrottle.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'auditTime',
        title: 'auditTime:类似throttleTime，收到第一个源不会立刻发送最新值，而是等待间隔时间后发送最新值',
        caption: '说明：' + '此处最后一行不论点击多少次会等1秒才会发送最新值',
        hits: 762,
        useful: 875,
        line: 2,
        marbleText: 'auditTime',
        code: `
        //cut
        let RxClick,RxDebounceTime;
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxDebounceTime = RxClick.auditTime(1000)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxAuditTime;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxAuditTime = RxClick.auditTime(1000)
            this.unSubResult.RxAuditTime = RxAuditTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxAuditTime = RxAuditTime.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'throttleTime',
        title: 'throttleTime:有click就取消上一次的，这里间隔时间最多1秒，收到第一个源立刻发送',
        caption: '说明：' + '此处最后一行一旦有点击立刻会发出一个事件',
        hits: 762,
        useful: 875,
        line: 2,
        marbleText: 'throttleTime',
        code: `
        //cut
        let RxClick,RxDebounceTime;
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxDebounceTime = RxClick.throttleTime(1000)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxThrottleTime;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxThrottleTime = RxClick.throttleTime(1000)
            this.unSubResult.RxThrottleTime = RxThrottleTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxThrottleTime = RxThrottleTime.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'debounceTime',
        title: 'debounceTime:有click就取消上一次的，间隔时间可超过1秒，最后发送最新值',
        caption: '说明：' + '最后一行为实际发出的事件',
        hits: 762,
        useful: 875,
        line: 2,
        marbleText: 'debounceTime',
        code: `
        //cut
        let RxClick,RxDebounceTime;
        RxClick =Rx.Observable.fromEvent(document,'click');
        RxDebounceTime = RxClick.debounceTime(1000)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxDebounceTime;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxDebounceTime = RxClick.debounceTime(1000)
            this.unSubResult.RxDebounceTime = RxDebounceTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxDebounceTime = RxDebounceTime.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'concatMap',
        title: 'concatMap:先转换成高阶observable（map），再转换成一阶observable',
        caption: '说明：此处累计click的次数，然后按顺序依次执行',
        hits: 762,
        useful: 875,
        line: 2,
        marbleText: 'concatMap',
        code: `
        //cut
        let RxClick,RxInterval,RxConcatMap;
        RxClick = Rx.Observable.fromEvent(document,'click').take(3);
        RxInterval = Rx.Observable.interval(1000).take(3);
        RxConcatMap = RxClick.concatMap(ev=>RxInterval)
        //cut
         `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxInterval, RxConcatMap;
            RxClick = Rx.Observable.fromEvent(document, 'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcatMap = RxClick.concatMap(ev=>RxInterval);
            this.unSubResult.RxConcatMap = RxConcatMap.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxConcatMap = RxConcatMap.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'concatAll',
        title: 'concatAll：将高阶observable(类似obs1$.map(obs2$))转换成一阶observable',
        caption: '说明：此处所展示效果相当于使用了concatMap，此处用的是先map 后concatAll',
        hits: 762,
        useful: 875,
        line: 2,
        marbleText: 'concatAll',
        code: `
        //cut
        let RxClick,RxInterval,highOrder,RxConcatAll;
        RxClick = Rx.Observable.fromEvent(document,'click');
        RxInterval = Rx.Observable.interval(1000).take(3);
        highOrder = RxClick.map(ev=>RxInterval);
        RxConcatAll = highOrder.concatAll()
        //cut
        `,

        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxInterval, highOrder, RxConcatAll;
            RxClick = Rx.Observable.fromEvent(document, 'click');
            RxInterval = Rx.Observable.interval(1000).take(3);
            highOrder = RxClick.map(ev=>RxInterval);
            RxConcatAll = highOrder.concatAll();
            this.unSubResult.RxConcatAll = RxConcatAll.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxConcatAll = RxConcatAll.subscribe(NEC(showRxjsInMarble, 'last'));
        }
    },
    {
        name: 'concat',
        title: 'concat:将2个源按顺序合并,点击3次鼠标后合并interval',
        caption: '',
        hits: 1235,
        useful: 451,
        line: 2,
        marbleText: 'concat',
        code: `
        //cut
        let RxClick,RxInterval,RxConcat;
        RxClick = Rx.Observable.fromEvent(document,'click').take(3);
        RxInterval = Rx.Observable.interval(1000).take(3);
        RxConcat = RxClick.concat(RxInterval)
        //cut
        `,
        func: function (showRxjsInResult, showRxjsInMarble) {
            let RxClick, RxInterval, RxConcat;
            RxClick = Rx.Observable.fromEvent(document, 'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcat = RxClick.concat(RxInterval);
            this.unSubResult.RxConcat = RxConcat.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick = RxClick.subscribe(NEC(showRxjsInMarble, 1));
            this.unSubMarble.RxConcat = RxConcat.subscribe(NEC(showRxjsInMarble, 'last'))
        }

    }
]
export const notFoundData = {
    title: '无数据',
    name: '无数据',
    caption: '无数据',
    code: '无数据',
    line: 0,
    marbleText: ''
}


function fillDeepList() {
    for (var i = 0; i < Data.length; i++) {
        let deepObj = {
            id: count++,
            name: Data[i].name,
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
 *
 *
 */


export let deepList = _deepList

function NEC(showInWhere, whichLine) {
    return {
        next: (v)=> {
            showInWhere(v, whichLine)
        },
        error: ()=> {
            showInWhere('error', whichLine)
        },
        complete: ()=> {
            showInWhere('complete', whichLine)
        }
    }
}
