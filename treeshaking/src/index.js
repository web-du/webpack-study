// Tree Shaking 只支持 ES Module
// tree shaking 只会打包业务代码中用到的js模块，这样就不会把main中的minus也打包了
// 当你使用的模块没有导出时如：import '@babel/polly-fill'，使用tree shaking就会忽略掉，这是我们不想看到的，所以需要在package.json中配置sideEffects:true,这样就不会被忽略掉
import { add } from './math.js';
add(1, 2);