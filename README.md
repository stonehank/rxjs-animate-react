USE [Create React App](https://github.com/facebookincubator/create-react-app).

### [DEMO](https://codesandbox.io/s/github/stonehank/animateRxjs-react)

#### 运行
`npm install`

`npm start`

#### 使用技术
1. react
2. react-router-dom v4
3. rxjs
4. ~~部分使用immutable~~
5. ~~react-dnd~~
6. react-codemirror

#### 目的
1. 首先是自己觉得rxjs操作符太多...有些特别容易混淆。
2. 虽然[Rxjs官方文档(英文)](http://reactivex.io/rxjs/)，[中文](http://cn.rx.js.org/)
的marble图确实让人更容易理解，但能动的还是更加直观。
3. 之前用原生JS做了一个[rxjs动画版](https://github.com/stonehank/animateRxjs-rawJS)，
这次用react做也加深自己对react的学习。
4. 使用最新API `createContext` 和 `getDerivedStateFromProps`。

#### 程序功能
1. 菜单：默认显示前10条，点击则显示全部。

2. 开始动画：点击`开始(subscribe)`按钮，执行`subscribe`，按钮状态会根据当前订阅情况变更。
3. 停止动画：点击`停止(unsubscribe)`，当前小球位置保留，但停止后无法继续，只能重新开始。
4. 重新开始：可以点击`清除(unsubscribe&clear)`或者再次点击`开始`。
5. Marble：每种数据类型都有对应颜色的小球。
6. 当前状态：会精确显示当前订阅情况(包括complete,error,subscribe,unsubscribe)。
7. 开启/关闭界面：开启/关闭Marble界面和Result界面(会保留当前数据)，但会自动`unsubscribe`。(如果不取消，多次开关会出现内存泄露)
~~8. 增减行：增行/减行是根据当前操作符源码和上一个操作符源码进行对比计算出的，可选择开启关闭。~~
8. 源码edit差异：当使用EDIT功能时，保存修改后会自动显示增加（绿色）和减少（红色）的部分。
9. 位置选择面板：可对当前操作符中`Observable`是否显示和显示位置进行调整，其中绿色checkBox是选择是否显示，select是对小球显示位置调整。
9. 源码：只显示最核心的源码，关于`subscribe`部分的并未进行显示，但所有操作符都是订阅了`next,error,complete`。
10. 源码EDIT：编辑源码功能，建议在`//editArea`里面编辑核心代码，save后对“选择面板”进行操作，选择显示位置。
11. 源码自动订阅功能：开启后，代码编辑SAVE时，会先清空所有subscribe语句，再自动按顺序重新subscribe，如果需要自己手写则要关闭，默认为开启。
11. hover小球：出现说明框，第一行为值(如果非基本类型则显示类型)，第二行对其值进行了`JSON.stringify`。

#### 更新记录
* 2018/5/8:  更改小屏幕的菜单样式
* 2018/5/6： 手机端/小屏幕适配基本完成，添加移动端拖拽
* 2018/5/1： 暂时取消immutable使用(fromJS占用很多性能)
* 2018/4/27：增加代码自动订阅功能
* 2018/4/27：增加开始按钮错误处理
* 2018/4/26：添加功能：代码可编辑，减少re-render
* 2018/4/25：添加功能：可自行选择每个发射源的显示及位置
* 2018/4/23：按字母排序页面添加开头大写字母提示
* 2018/4/23：使用react-dnd代替原生拖拽功能
* 2018/4/20：添加拖拽还原按钮
* 2018/4/18：增加小球可拖拽功能
* 2018/4/16：添加result显示
* 2018/4/14：状态精确显示（可显示subscribe,unsubscribe,complete及error）
* 2018/4/10：基本完成

#### 问题
1. marble球排序以时间顺序排序，因此当遇到 例如`Observable.of(1,2,3,4,5)`的时候，
五次发射源基本上是同一个时间戳，因此会发生叠加，marble球看上去只有1个，其实是5个叠加一起，
这种情况可以看result表更为清楚。

解决方案：18-4-18：增加拖拽，可以拖开查看。

2. subscribe开始后，无法暂停/继续，只能完全停止，重头开始。
3. 因为marble小球left值是根据当前时间戳决定，因此偶尔会出现线程繁忙阻塞，导致位置异常。
4. rxjs@6的编写问题，如果需要删除rxjs-compat，就必须使用pipe()，里面每一个操作符都要重新再定义，感觉不像链式调用那么方便...暂时继续用rxjs@5.5.8。相关rxjs@6变更写法参考[官方github](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)