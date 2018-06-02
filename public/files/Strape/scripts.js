'use strict';

Math.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

var classes = {
		add: function(el, name) {
			var list = el.className.split(' ');

			if (list.indexOf(name) == -1) {
				list.push(name);
				el.className = list.join(' ');
			}
		},
		remove: function(el, name) {
			var list = el.className.split(' '),
				i = list.indexOf(name);

			if (i !== -1) {
				list.splice(i, 1);
				el.className = list.join(' ');
			}
		},
		toggle: function(el, name) {
			var list = el.className.split(' '),
				i = list.indexOf(name);

			if (i !== -1) {
				list.splice(i, 1);
			} else {
				list.push(name);
			}

			el.className = list.join(' ');
		},
		contains: function(el, name) {
			return el.className.split(' ').indexOf(name) !== -1;
		}
	},
	element = {
		index: function(el) {
			var n = 0;
			while (el = el.previousElementSibling) { n++; }
			return n;
		},
		addEvent: function(els, e, f){
			if (!els) { return; }
			if (els instanceof Element || els === window) { els = [els]; }
			if (!els.length) { return; }

			if (els[0].attachEvent) {
				for (var i = 0; i < els.length; i++) {
					els[i].attachEvent('on' + e, f);
				}
			} else {
				for (var i = 0; i < els.length; i++) {
					els[i].addEventListener(e, f, false);
				}
			}
		}
	};

function load() {
	resize();
	//document.getElementById('bgvid').playbackRate = 0.5;
}

function resize() {
	scroll();
}

function scroll() {

}

window.onload = load;
window.onresize = resize;
window.onscroll = scroll;