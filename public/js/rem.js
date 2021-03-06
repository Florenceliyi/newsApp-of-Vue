/*
注意点:
预渲染的本质就是在打包时就"模拟浏览器"提前访问路由对应的网页, 然后将访问的结果写入到.html文件中
但是由于在打包时访问并不是通过"真实的浏览器"来访问, 所以拿不到正是的像素比
所以预渲染时写入到.html文件中的meta就是错误的
也正是因为预渲染的时候已经写入过meta标签了, 而运行的时候又会执行一次JS代码再写入一次
就导致了网页中有两个meta标签
* */
let scale = 1.0 / window.devicePixelRatio;
let text =
    `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
document.write(text);
document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
document.documentElement.setAttribute('data-dpr', window.devicePixelRatio + '');
document.documentElement.setAttribute('data-theme', 'theme');