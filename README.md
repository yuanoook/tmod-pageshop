# Tmod-pageshop

## Start
``` bash
    # after you download/clone this repo
    npm install

    # after npm install
    npm run postinstall 
    
    # and you need manual fix some node_modules, see postinstall
    manual fix some node_modules

    # before you start
    npm run build-all

    # node dev
    npm start
```

## 安装之后，因为依赖库的因素，需要手动依赖库 bugfix 的。
### postinstall
``` bash
    # **** 1,2,3 在 windows 上面需要手动执行
    #1. cssmin background-image url svg bugfix https://github.com/yui/yuicompressor/issues/141
    #   文件：./node_modules/gulp-htmlone/index.js
    #   120 行左右 token = token.replace(/\s+/g, ""); 把双引号中间加一个空格
    #   >  sed -i '' '120s/\"\"/\" \"/' ./node_modules/gulp-htmlone/node_modules/ycssmin/cssmin.js;
    #   如果新版的 npm 把 ycssmin 安装到了 ./node_modules , 可以在 ./node_modules/ycssmin 中操作

    #2. force update cheerio to ^0.22.0 in gulp-htmlone
    #   强制更新 gulp-htmlone 的依赖项 cheerio 到最新版
    #   移除文件夹 ./node_modules/gulp-htmlone/node_modules/cheerio
    #   项目根目录 package.json 加入 "cheerio": "^0.22.0"
    #   >  rm -rf ./node_modules/gulp-htmlone/node_modules/cheerio;
    #   >  npm install cheerio --save-dev;

    # **** 下面需要手动FIX ****
    #3. gulp-htmlone Bugfix: cssmin 干掉了 url('data:xxx') 里面的单引号，引起 svg 的 background 异常
    #   文件：./node_modules/gulp-htmlone/index.js
    #   1. 280 行左右 if (reg_http.test(d) || data_url.test(d)) return c; 前面加上
           # d = d.replace(/^(\s|\'|\")*|(\s|\'|\")*$/g,'')
    #   2. 340 行左右，uniform url() 下面，手动注释掉头两行 replace
           # // .replace(/url\(\s*"([^"]+)"\s*\)/g, 'url($1)')
           # // .replace(/url\(\s*\'([^\']+)\'\s*\)/g, 'url($1)')

    npm run postinstall
```

## commit2SVN / commit2Server 快捷提交代码到 svn 或 ftp
#### 怎么使用 commit2SVN / commit2Server
``` bash
    # windows with git-bash
    # To commit book.html to svn
    npm run commit2svn book

    # To comm book.html to server
    npm run commit2server book
```

#### svn 依赖安装
Windows/MacOS: svn && svnmucc

TODP: 
    ftp -> vinyl-ftp
    scp -> gulp-scp2
    svn -> node-svn-ultimate

    postinstall -> use node scripts