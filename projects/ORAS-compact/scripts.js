var pipe = function () {
	fns = Array.prototype.slice.call(arguments);

	console.log(fns);

	return function (x) {
		fns.reduce(function (prev, func) {
			func(prev);
		}, x);
	};
};

var createClickableElement = function (type, onclick, classes) {
	var e = document.createElement(type);

	if (!(classes instanceof Array)) {
		classes = [classes];
	}

	classes.forEach(function (c) {
		e.classList.add(c);
	});

	if (!(onclick instanceof Array)) {
		onclick = [onclick];
	}

	onclick.forEach(function (o) {
		e.addEventListener('click', o);
	});

	return e;
};

/* Navigation part */
(function () {
	var nav = document.getElementsByTagName('nav')[0];

	var handleScroll = function () {
		nav.classList.toggle('down', window.scrollY > 3*16);
	}

	window.addEventListener('scroll', handleScroll);	
})();

/* Sliders */
(function () {
	var getSlides = function (slider) {
		return slider.getElementsByClassName('slide');
	};

	var getDuration = function (slider) {
		var defaultDuration = 5000; // ms
		return parseInt(slider.getAttribute('duration')) || defaultDuration;
	};

	var updateSlide = function (slide, done) {
		slide.classList.toggle('curr', done === 0);
		slide.classList.toggle('prev', done === 1);
		slide.classList.toggle('next', done === -1);
	};

	var initSlider = function (slider) {
		var slides = getSlides(slider);
		var currentSlide = 0;
		var d = getDuration(slider);
		var t;

		var prevSlide = function () {
			currentSlide--;
			if (currentSlide < 0) { currentSlide += slides.length; }
		};

		var nextSlide = function () {
			currentSlide++;
			if (currentSlide >= slides.length) { currentSlide = 0; }
		};

		var refresh = function () {
			clearTimeout(t);
			t = setTimeout(next, d);

			for (var i = 0; i < slides.length; i++) {
				var c = -2;

				if (currentSlide == i) { c = 0; }
				if (currentSlide == i + 1 ||
					(currentSlide == 0 && i == slides.length - 1)) { c = 1; }
				if (currentSlide == i - 1 ||
					(currentSlide == slides.length - 1 && i == 0)) { c = -1; }

				updateSlide(slides[i], c);
			}
		};

		var next = function () {
			nextSlide();
			refresh();
		};

		var prev = function () {
			prevSlide();
			refresh();
		};

		t = setTimeout(next, d);
		refresh();

		slider.appendChild(createClickableElement('div', prev, 'prev_slide'));
		slider.appendChild(createClickableElement('div', next, 'next_slide'));
	};

	for (slider of document.getElementsByClassName('slider')) {
		initSlider(slider);
	}
})();

/* Article part */
(function () {
	var rem = 16;

	var header = document.getElementsByTagName('header')[0];
	var aside = document.getElementsByTagName('aside')[0];
	var article = document.getElementsByTagName('article')[0];

	var hHeight;

	var handleResize = function () {
		hHeight = header ? header.offsetHeight : 0;

		aside.style.width = (article.offsetWidth / 2) + 'px';

		handleScroll();
	};

	var handleScroll = function () {
		var atBottom = window.scrollY + 7*rem + aside.offsetHeight
					>= article.offsetHeight + 7*rem + hHeight;

		var atTop = window.scrollY <= 5*rem + hHeight;

		aside.classList.toggle('fixed', !atTop && !atBottom);
		aside.classList.toggle('bottom', atBottom);
	};

	if (aside && article) {
		handleResize();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);
	}
})();