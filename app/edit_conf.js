/*!
 * AriaNg GUI
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/aria-ng-gui
 * 
 * edit_conf.js - 根据用户的操作系统动态编辑aria2的配置文件
 * 
*/

const os = require('os');
const fs = require('fs')
const path = require('path')
const { app } = require('electron')

const download_dir = app.getPath("downloads") || path.join(os.homedir(), "Downloads")

const edit_conf = (conf_path) => {
    const session_path = path.join(path.dirname(conf_path), "aria2.session")

    let old_conf = fs.readFileSync(conf_path).toString()

    let new_conf = old_conf
        .replace(/dir=.+/, "dir=" + download_dir)
        .replace(/(input-file=|save-session=).*/g, "$1" + session_path)

    fs.writeFileSync(conf_path, new_conf)
}

module.exports = edit_conf
