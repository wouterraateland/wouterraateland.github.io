'use strict';

function getScrollTop() { return window.scrollY || window.document.documentElement.scrollTop; }

Math.sign = function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };

var $ = function (query, root) {
	return (root || document).querySelector(query);
};

var $$ = function (query, root) {
	return [].slice.apply((root || document).querySelectorAll(query));
};

var naItems = $$('#navItems'),
	scrollDown = $('#scrollDown'),
	main = $('main'),
	pages = [],
	descriptions = [],
	shadows = [],
	rotationSpeed = .2,
	currentProject = 0;

function loadProjects() {
	var temp = $('#projectTemplate');
	var projectTemplate = temp.cloneNode(true);
	$('#projectTemplate').parentElement.removeChild(temp);

	projects.forEach(function (project) {
		var el = projectTemplate.cloneNode(true);
		el.id = project.hash;

		$('h1', el).innerHTML = project.title;
		$('.type', el).innerHTML = project.type;
		$('.description', el).innerHTML = project.description;
		$('a', el).href = project.link;
		$('a', el).innerHTML = project.linkDescription;

		var teaser = $('.teaser', el);

		if (Object.keys(project.images).length > 1) {
			teaser.className = 'teaser multiple';
		}

		for (var image in project.images) {
			var img = document.createElement('img');
			img.className = image;
			img.src = 'images/' + image + '.png';
			img.style.backgroundImage = 'url(images/projects/' + project.images[image] + ')';
			teaser.insertBefore(img, teaser.firstChild);
		}

		$('.shadow', el).src = 'images/back' + (1 + (pages.length % 3)) + '.svg';

		pages.push(el);
		descriptions.push($('.content', el));
		shadows.push($('.shadow', el));

		var a = document.createElement('a');
		a.href = '#' + project.hash;
		a.innerHTML = project.title;
		navItems.appendChild(a);

		main.appendChild(el);
	});

	(function () {
		var count = 0;
		var images = [
			'images/iphone.png',
			'images/ipad.png',
			'images/imac.png',
			'images/back1.svg',
			'images/back2.svg',
			'images/back3.svg'
		];

		images.forEach(function (url) {
			var img = new Image();
			img.onload = function () {
				if (++count == images.length) {
					resize();
				}
			}
			img.src = url;
		});
	})();
};

function load() {
	if (window.location.hash === '#mainNav') { window.location.hash = ''; }
	document.body.className = 'loaded';

	loadProjects();

	$$('a[href^="#"').forEach(function (a) { a.onclick = navigate; });
}

function resize() {
	//resize main
	main.style.height = window.innerHeight*pages.length + 'px';
	
	//resize projects
	pages.forEach(function (page) { page.style.height = window.innerHeight + 'px'; });

	//resize descriptions
	descriptions.forEach(function (description) {
		var h = [].slice.apply(description.children).reduce(function (h, child) { return h + child.offsetHeight; }, 29);
		
		description.style.height = h + 'px';
	});

	//position shadows
	shadows.forEach(function (shadow) {
		var p = shadow.parentElement.children[0];
		shadow.style.top = (p.offsetTop + p.offsetHeight - shadow.offsetHeight/2) + 'px';
	});

	scroll();
}

function scroll() {
	var y = getScrollTop() - main.offsetTop;

	currentProject = Math.round(y / window.innerHeight);
	
	pages.forEach(function (page, i) {
		page.className = currentProject == i ? 'project active': currentProject > i ? 'project done' : 'project'; 
	});

	shadows.forEach(function (shadow) {
		shadow.style.transform = shadow.style.webkitTransform
							   = 'rotateX(75deg) rotateZ(' + y*rotationSpeed + 'deg)';
	});

	scrollDown.style.opacity = 1 - 3/2*getScrollTop()/window.innerHeight;
}

function navigate(event) {
	event.preventDefault();

	var y = getScrollTop();

	window.location.hash = this.hash;

	if (this.hash === '') {
		window.scrollTo(0, y);
	} else if (this.hash !== '#mainNav') {
		var e = $(this.hash);

		for (var i = 0; i < pages.length; i++) {
			if (e === pages[i]) { break; }
		}

		window.scrollTo(0, main.offsetTop + window.innerHeight*i);
	}
}

window.onload = load;
window.onresize = resize;
window.onscroll = scroll;