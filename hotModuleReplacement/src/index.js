// console.log('hello world!,刷新就可以啦,现在不用刷新啦!!!');


// 运行npm run start启动webpack-dev-server服务，并不会生成dist目录，而是把打包的文件放在缓存中。

// 模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

// 保留在完全重新加载页面时丢失的应用程序状态。
// 只更新变更内容，以节省宝贵的开发时间。
// 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。
// import './style.css'; // 当css发生变化时，webpack-dev-server会重新打包，重新刷新浏览器。这样不利于开发的效率。
// var btn = document.createElement('button');
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function () {
//     var div = document.createElement('div');
//     div.innerHTML = 'item';
//     document.body.appendChild(div);
// }

import lll from "./counter.js";
import number from './number';
lll();
number();

// js的热更新需要以下配置，css之所以不需要下面的配置，是因为css-loader中已经有配置过了。
// 如果该项目的热更新存在
if (module.hot) {
    // 当指定的模块发生改变时的回调
    module.hot.accept('./number', () => {
        // 把上次生成的先删掉
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}
