module.exports = function (source) {
    // 携带传过来的参数
    //console.log(this.query);
    return source.replace('dwz',this.query.name);
}