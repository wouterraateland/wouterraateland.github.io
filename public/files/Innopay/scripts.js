'use strict';

Math.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

var keys = document.getElementsByClassName('key'),
	cloud = document.getElementById('cloud'),
	wrapper = document.getElementById('wrapper'),
	mx = 0,
	my = 0,
	touch = 'ontouchstart' in document.documentElement,
	rect = {
		left: cloud.offsetLeft,
		top: cloud.offsetTop,
		width: cloud.clientWidth,
		height: cloud.clientHeight,
		update: function() {
			this.left = 0;
			this.top = 0;
			for (var e = cloud; e; e = e.offsetParent) {
				this.left += e.offsetLeft;
				this.top += e.offsetTop;
			}
			this.width = cloud.clientWidth;
			this.height = cloud.clientHeight;

			if (touch) {
				mx = rect.width/2;
				my = rect.height/2;
			}
		}
	},
	x = new Array(),
	y = new Array(),
	supportPageOffset = window.pageXOffset !== undefined,
	isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
	wx = 0,
	wy = 0;

mx = rect.width/2;
my = rect.height/2;

function addEvent(el, e, f){
	if (el.attachEvent) {
		return el.attachEvent('on' + e, f);
	} else {
  		return el.addEventListener(e, f, false);
	}
}

function load() {
	resize();
	move(rect.width/2, rect.height/2);

	for (var i = 0; i < keys.length; i++) {
		var words = keys[i].getElementsByClassName('word'),
			l = words.length;
		for (var j = 0; j < l; j++) {
			words[j].style.top = (96 + 160*Math.cos(j*2*Math.PI/l + Math.PI*2/5)) + 'px';
			words[j].style.left = (96 + 160*Math.sin(j*2*Math.PI/l + Math.PI*2/5)) + 'px';
		}
	}
}

function resize() {
	rect.update();
	scroll();
}

function scroll() {
	wx = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	wy = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

	x[0] = rect.width/2;
	y[0] = rect.height/2;

	for (var i = 1; i < 7; i++) {
		x[i] = rect.width/2*(1 + Math.cos(Math.PI*i/3 + Math.PI*2/3 + (wx + wy)/500));
		y[i] = rect.height/2*(1 + Math.sin(Math.PI*i/3 + Math.PI*2/3 + (wx + wy)/500));
	}

	move();
}

function move() {
	var dx, dy, d, s;
	for (var i = 0; i < 7; i++) {
		dx = ((x[i] - mx)/rect.width + 2.25) % 1.5 - 0.75;
		dy = ((y[i] - my)/rect.height + 2.25) % 1.5 - 0.75;
		s = Math.max(0, 1 - 2*(dx*dx + dy*dy));
		keys[i].style.left = rect.width*(0.5 + dx*(1+s)/2) + 'px';
		keys[i].style.top = rect.height*(0.5 + dy*(1+s)/2) + 'px';
		keys[i].style.webkitTransform = 'scale(' + s + ')';
		keys[i].style.MozTransform = 'scale(' + s + ')';
		keys[i].style.msTransform = 'scale(' + s + ')';
		keys[i].style.OTransform = 'scale(' + s + ')';
		keys[i].style.transform = 'scale(' + s + ')';
		keys[i].style.opacity = touch ? 1 : s;
	}
}

function mousemove(e) {
	if (!touch) {
		var p = 2.8,
			s = 4;

		e = e || window.event;
		var dx = (e.clientX + wx - rect.left - rect.width/2)/s,
			dy = (e.clientY + wy - rect.top - rect.height/2)/s,
			d = dx*dx+dy*dy;

		if (d > rect.width*rect.height/(4*s)) {
			dx = dx*Math.pow(rect.width*rect.height/(4*s*d), p);
			dy = dy*Math.pow(rect.width*rect.height/(4*s*d), p);
		}
		
		mx = dx + rect.width/2;
		my = dy + rect.height/2;
	}

	move();
}

function toggle() {
	for (var i = 1; i < keys.length; i++) {
		if (keys[i].className == 'key active') {
			keys[i].className = 'key waiting';
			var j = i;
			setTimeout(function() {
				keys[j].className = 'key';
			}, 200);
		} else if (keys[i] == this && keys[i].className == 'key') {
			keys[i].className = 'key active';
		}
	}
}

addEvent(window, 'load', load);
addEvent(window, 'resize', resize);
addEvent(window, 'scroll', scroll);
addEvent(window, 'touchstart', toggle);
if (!touch) { addEvent(window, 'mousedown', toggle); }
addEvent(window, 'mousemove', mousemove);

for (var i = 0; i < keys.length; i++) {
	addEvent(keys[i], 'click', toggle);
}