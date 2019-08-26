function counter() {
    var div = document.createElement('div');
    div.setAttribute('id','counter');
    div.innerHTML = 1;
    div.onclick = function () {
        this.innerHTML = Number(this.innerHTML) + 1;
    }
    document.body.appendChild(div);
}

export default counter;