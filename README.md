USE [Create React App](https://github.com/facebookincubator/create-react-app).

### [DEMO](https://codesandbox.io/s/github/stonehank/animateRxjs-react)(建议大屏操作，暂未做分辨率适配)

#### 运行
`npm install`

`npm start`

#### 使用技术
1. react
2. react-router-dom v4
3. rxjs
4. 部分使用immutable

#### 目的
1. 首先是自己觉得rxjs操作符太多...有些特别容易混淆。
2. 虽然[Rxjs官方文档(英文)](http://reactivex.io/rxjs/)，[中文](http://cn.rx.js.org/)
的marble图确实让人更容易理解，但能动的还是更加直观。
3. 之前用原生JS做了一个[rxjs动画版](https://github.com/stonehank/animateRxjs-rawJS)，
这次用react做也加深自己对react的学习。
4. 使用最新API `createContext` 和 `getDerivedStateFromProps`

#### 程序功能

1. 菜单：默认显示前10条，点击则显示全部。

2. 开始动画：点击`开始(subscribe)`按钮，执行`subscribe`，按钮状态会根据当前订阅情况变更。
3. 停止动画：点击`停止(unsubscribe)`，当前小球位置保留，但停止后无法继续，只能重新开始。
4. 重新开始：可以点击`清除(unsubscribe&clear)`或者再次点击`开始`。
5. Marble：每种数据类型都有对应颜色的小球。
6. 当前状态：会精确显示当前订阅情况(包括complete,error,subscribe,unsubscribe)。
7. 开启/关闭界面：开启/关闭Marble界面和Result界面(会保留当前数据)，但会自动`unsubscribe`。(如果不取消，多次开关会出现内存泄露)
8. 增减行：增行/减行是根据当前操作符源码和上一个操作符源码进行对比计算出的，可选择开启关闭。
9. 源码：只显示最核心的源码，关于`subscribe`部分的并未进行显示，但所有操作符都是订阅了`next,error,complete`。
10. hover小球：出现说明框，第一行为值(如果非基本类型则显示类型)，第二行对其值进行了`JSON.stringify`。


#### 问题
1. marble球排序以时间顺序排序，因此当遇到 例如`Observable.of(1,2,3,4,5)`的时候，
五次发射源基本上是同一个时间戳，因此会发生叠加，marble球看上去只有1个，其实是5个叠加一起，
这种情况可以看result表更为清楚。
18-4-18：增加拖拽，可以拖开查看