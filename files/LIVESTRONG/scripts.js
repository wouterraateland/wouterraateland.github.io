'use strict';

Math.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

var classes = {
	toggle: function (e, n) {
		var a = e.className.split(' ');
		if (a.indexOf(n) == -1) {
			a[a.length] = n;
		} else {
			a.splice(a.indexOf(n), 1);
		}

		e.className = a.join(' ');
	},
	contains: function(e, n) {
		var a = e.className.split(' ');
		return (a.indexOf(n) !== -1);
	}
};


function load() {
	resize();
	updateHash();
}

function resize() {
	scroll();
}

function scroll() {
	var w = document.getElementById('wrist');
	w.style.bottom = -window.scrollY*w.height/window.innerHeight + 'px';
	//document.getElementsByTagName('header')[0].style.backgroundPosition = 'center ' + 100*(1+window.scrollY/window.innerHeight) + '%';
}

function updateHash() {
	document.body.style.overflowY = (location.hash == '') ? 'auto' : 'hidden';
}

function toggle(e) {
	e = e || this;
	classes.toggle(e, 'open');
}

function openStory() {
	event.preventDefault();

	var y = window.scrollY;
	var self = this;
	this.children[0].style.transform = 'translate(416px, 0) scale(20)';
	this.children[0].style.zIndex = 1;
	this.children[0].children[0].style.opacity = 0;

	window.location.hash = '#melinda';
	window.scrollTo(0, window.scrollY);

	setTimeout(function() {
		self.children[0].style.transform = '';
		self.children[0].style.zIndex = 0;
		self.children[0].children[0].style.opacity = 1;
	}, 2000);
}

function scrollStory() {
	var h = this.getElementsByTagName('header')[0],
		e = h.getElementsByTagName('img')[0];

	e.style.top = (h.clientHeight - e.height)*this.scrollTop/h.clientHeight + 'px';
	e.style.opacity = 1 - this.scrollTop/h.clientHeight;
}

window.onload = load;
window.onresize = resize;
window.onscroll = scroll;
window.onhashchange = updateHash;

document.getElementById('navOpen').onclick = function () {
	toggle(document.getElementById('nav'));
	updateHash();
	if (classes.contains(document.getElementById('nav'), 'open')) {
		document.body.style.overflowY = 'hidden';
	}
};
document.getElementById('survivorOpen').onclick = function () { toggle(document.getElementById('survivors')); };
document.getElementById('melindaLink').onclick = openStory;

var stories = document.getElementsByClassName('story');

for (var i = 0; i < stories.length; i++) {
	stories[i].onscroll = scrollStory;
}