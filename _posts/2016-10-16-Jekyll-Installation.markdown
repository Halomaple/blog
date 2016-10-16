---
layout: post
title: "Jekyll安装与使用"
date: 2016-10-16 14:40:00 +0800
category: [Jekyll]
tag: [Jekyll, 安装]
---

### Jekyll安装

Jekyll通过gem来安装。

Ruby 下载地址： http://rubyinstaller.org/downloads/

安装 Jekyll ```gem install jekyll```

可以使用```bundler install```来安装 Gemfile.lock里确定所需的对应版本的依赖包。bundler通过```gem install bundler```来安装。

### Jekyll命令

来自[https://jekyllrb.com/docs/usage/](https://jekyllrb.com/docs/usage/)

```
$ jekyll build
# => The current folder will be generated into ./_site
$ jekyll build --destination <destination>
# => The current folder will be generated into <destination>
$ jekyll build --source <source> --destination <destination>
# => The <source> folder will be generated into <destination>
$ jekyll build --watch
# => The current folder will be generated into ./_site,
#    watched for changes, and regenerated automatically.
```

```
$ jekyll serve
# => A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.
$ jekyll serve --detach
# => Same as `jekyll serve` but will detach from the current terminal.
#    If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
#    If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance. 
	 [Read more](http://unixhelp.ed.ac.uk/shell/jobz5.html).
```