
window.onload = function(){ 
    var obj = document.getElementById('xtree');
    var data = [{"name":"Users","child":[{"name":"Default","child":[{"name":"AppData","child":[{"name":"Local"},{"name":"Roaming"}]},{"name":"Downloads"},{"name":"NTUSER.DAT.LOG"},{"name":"NTUSER.DAT.LOG1"},{"name":"NTUSER.DAT.LOG2"}]},{"name":"Administrator","child":[{"name":"AppData","child":[{"name":"Local","child":[{"name":"Adobe","child":[{"name":"AIR","child":[{"name":"logs","child":[{"name":"Install.log"}]}]}]},{"name":"Apple","child":[{"name":"Apple Software Update","child":[]}]}]},{"name":"LocalLow","child":[{"name":"Baidu","child":[{"name":"Common","child":[{"name":"XTorrent","child":[{"name":"logs"}]},{"name":"BT_DHTTable.dat"},{"name":"BTCfg.ini"}]}]}]},{"name":"Roaming"}]},{"name":"bootstrap"}]}]},{"name":"Windows","child":[{"name":"Setup","child":[{"name":"scripts","child":[{"name":"labelc2rdrive.exe"},{"name":"labelc2rdrive.exe.config"},{"name":"oobe.cmd"}]},{"name":"State","child":[{"name":"State.ini"}]}]}]},{"name":"Program","child":[{"name":"iTunes","child":[{"name":"iPodUpdaterExt.dll"}]},{"name":"Microsoft Office","child":[{"name":"Office14","child":[{"name":"ACCVDT.DLL"}]}]}]},{"name":"temp","child":[{"name":"t.txt"}]},{"name":"Intel","child":[{"name":"Logs","child":[{"name":"IntelAMT.log"},{"name":"IntelChipset.log"},{"name":"IntelControlCenter.log"}]},{"name":"ExtremeGraphics","child":[{"name":"CUI","child":[{"name":"Resource","child":[]}]}]}]},{"name":"live_deamon.dll"},{"name":"ScrubRetValFile.txt"},{"name":"U36SG.BIN"},{"name":"UCLiveCore.dll"},{"name":"version.conf"}];
    zz.app.xTree(obj, data);
};


var zz = {};

zz.tools = {};
//添加事件
zz.tools.addEvent = function (node, type, fn) {
    if (node.addEventListener) {
        node.addEventListener(type, fn, false);
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, fn);
    } else {
        node['on' + type] = fn;
    }
};

zz.ui = {};
//创建目录树
zz.ui.createTree = function (data) {
    var ul = document.createElement('ul');
    (function(data, ul) {
        for(var i = 0; i < data.length; i++){
            var d = data[i];
            console.log(d);
            var c = d['child'];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = d['url'] ? d['url'] : 'javascript:void(0);';
            a.innerHTML = d.name;
            if(i === data.length - 1) {
                li.className = 'last';
            }
            li.appendChild(a);
            ul.appendChild(li);
            if(c) {
                var _ul = document.createElement('ul');
                _ul.style.display = 'none';
                li.appendChild(_ul);
                var aa = document.createElement('a');
                aa.className = i === data.length - 1 ? 'plus last' : 'plus';
                li.insertBefore(aa, a);
                a.className = 'close';
                arguments.callee(c, _ul);
            } else {
                a.className = 'file';
            }
        }
    })(data, ul);
    return ul;
};
//绑定事件
zz.ui.bindEvent = function(wrap) {
    zz.tools.addEvent(wrap, 'click', function(e) {//e 为 mouseEvent
        var e = e || window.event;
        //firefox 下的 event.target = IE 下的 event.srcElement  即：当前事件的源
        var target = e.target || e.srcElement;
        zz.ui.clickHandler(target);
    });
};
//点击处理
zz.ui.clickHandler = function(tar) {
    if(!tar.nextSibling || tar.tagName == 'LI') {
        return;
    }
    var ns = tar.nextSibling;
    var ps = tar.previousSibling;
    //alert(ns.tagName)
    if(ns.tagName === 'A') {
        ps = tar;
        tar = ns;
        ns = ns.nextSibling;
    }
    var pClass = ps.className;
    if(tar.className === 'close') {
        tar.className = 'open';
        ps.className = pClass.replace('plus', 'minus');
        ns.style.display = '';
    } else {
        tar.className = 'close';
        ps.className = pClass.replace('minus', 'plus');
        ns.style.display = 'none';
    }
    
};


zz.app = {};
zz.app.xTree = function(obj,opts){  
    var wrap = document.createElement('div');
    wrap.className = 'z-tree-wrap';
    var ul = zz.ui.createTree(opts);
    wrap.appendChild(ul);
    zz.ui.bindEvent(wrap);
    obj.appendChild(wrap);
};

