var _ = require('underscore');
var m = require('mithril');
var TWEEN = require('tween.js');

var app = {};

function url(prop) {
    return 'url(\"' + prop() + '\")';
}

function negPx(val) {
    console.log(val());
    return val() * -1 + 'px';
}

app.view = function() {
    return m('div', [
        m('input', { class: 'image-url', onchange: m.withAttr('value', app.vm.image.src), value: app.vm.image.src() }),
        m('div', { class: 'image', style: {
            backgroundPositionX: negPx(app.vm.image.x),
            backgroundPositionY: negPx(app.vm.image.y),
            backgroundImage: url(app.vm.image.src),
            backgroundSize: app.vm.image.w() + 'px ' + app.vm.image.h() + 'px'
        }})
    ]);
};

app.vm = {
    init: function() {
        app.vm.image = {
            src : m.prop('images/naruto.jpg'),
            x: m.prop('0'),
            y: m.prop('0'),
            w: m.prop('600'),
            h: m.prop('400')
        }
    }
};

function tweenState(vmObj, fields) {
    var state = {};
    var i;
    var len;

    for (i = 0, len = fields.length; i < len; i++) {
        state[fields[i]] = vmObj[fields[i]]();
    }

    return state;
 }

app.controller = function() {
    app.vm.init();

    var tweenFrom = tweenState(app.vm.image, ['x', 'y', 'w', 'h']);

    var tween = new TWEEN.Tween(tweenFrom)
        .to({
            x: 300,
            y: 0,
            w: 800,
            h: 600
        }, 1000)
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(function() {
            m.startComputation();
            app.vm.image.x(this.x);
            app.vm.image.y(this.y);
            app.vm.image.w(this.w);
            app.vm.image.h(this.h);
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
