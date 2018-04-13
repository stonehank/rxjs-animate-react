USE [Create React App](https://github.com/facebookincubator/create-react-app).

#### 使用技术
1. react
2. react-router-dom v4
3. rxjs

#### 目的
1. 首先是自己觉得rxjs操作符太多...有些特别容易混淆。
2. 虽然[Rxjs官方文档(英文)](http://reactivex.io/rxjs/)，[中文](http://cn.rx.js.org/)
的marble图确实让人更容易理解，但能动的还是更加直观。
3. 之前用原生JS做了一个[rxjs动画版](https://github.com/stonehank/animateRxjs-rawJS)，
这次用react做也加深自己对react的学习。

#### 程序功能
1. `开始(subscribe)`按钮会根据当前订阅情况(检测到所有subscription是否已经完成或者取消)变成`停止(unsubscribe)`。
2. 点击`开始`按钮，有些直接开始运行，有些要等待事件触发(如click)，具体可见说明。
3. 当想停止动画，可以点击`停止`，当前小球位置保留，但停止后无法继续，只能重新开始。
4. 当想重新开始，可以点击`清除(unsubscribe&clear)`或者直接再次点击`开始`。
5. 可以通过滑动条选择开启/关闭Marble界面和Result界面(保留当前小球位置)，变更后会自动`unsubscribe`对应的界面的`subscription`，
如果不取消，多次开关会出现内存泄露。
6. 增加行：增行/减行是根据当前操作符源码和上一个操作符源码进行对比计算出的，可选择开启关闭。
7. 源码：只显示最核心的源码，关于`subscribe`部分的并未进行显示，但所有操作符都是订阅了`next,error,complete`。
8. Marble界面，当发射源执行`complete`或者`error`时，都会有对应的小球紧随出现，代表一种状态的完成。
9. 鼠标移动到小球上，会出现说明框，第一行为值(如果非基本类型则显示类型)，第二行对其值进行了`JSON.stringify`。

#### 问题
1. marble球排序以时间戳排序，因此当遇到 例如`Observable.of(1,2,3,4,5)`的时候，
五次发射源基本上是同一个时间戳，因此会发生叠加，marble球看上去只有5，
这种情况可以看result表更为清楚。