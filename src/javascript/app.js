var _ = require('underscore');
var m = require('mithril');
var TWEEN = require('tween.js');

var app = {};

function url(prop) {
    return 'url(\"' + prop() + '\")';
}

app.view = function() {
    return m('div', [
        m('input', { class: 'image-url', onchange: m.withAttr('value', app.vm.image.src), value: app.vm.image.src() }),
        m('div', { class: 'image', style: { top: app.vm.image.x(), left: app.vm.image.y(), backgroundImage: url(app.vm.image.src) } })
    ]);
};

app.vm = {
    init: function() {
        app.vm.image = {
            src : m.prop('http://img1.wikia.nocookie.net/__cb20150124180545/naruto/images/c/ce/Naruto_AnimeSagemode.png'),
            x: m.prop('0px'),
            y: m.prop('0px')
        }
    }
};

app.controller = function() {
    app.vm.init();

    var tween = new TWEEN.Tween({ x: 0, y: 0 })
        .to({ x: 500, y: 500 }, 2000)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function() {
            m.startComputation();
            app.vm.image.x(this.x + 'px');
            app.vm.image.y(this.y + 'px');
            m.endComputation();
        })
        .start();

    var animate = function(time) {
        TWEEN.update(time);
        requestAnimationFrame(animate);
    };

    animate();
};

var target = document.getElementById('container');

m.mount(target, { controller: app.controller, view: app.view });

module.exports = app;
