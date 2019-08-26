import img from './index-img12.jpg';
import style from './index.scss';
function createAvatar () {
    var image = new Image();
    image.src = img;
    image.classList.add(style.avatar);


    var root = document.getElementById('root');
    root.appendChild(image);
}

export default createAvatar;