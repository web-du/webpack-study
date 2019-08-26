import img from './index-img12.jpg';
// webpack默认只识别js打包，其他模块的打包方式都需要去配置webpack.
// import './index.scss';
// css模块化
import style from './index.scss';
import creatAvatar from './createAvatar'

// 如果需要这个函数生成的也可以被css控制，则需在函数中引入
creatAvatar();

var image = new Image();
image.src = img;
// image.classList.add('avatar');
image.classList.add(style.avatar);


var root = document.getElementById('root');
root.appendChild(image);