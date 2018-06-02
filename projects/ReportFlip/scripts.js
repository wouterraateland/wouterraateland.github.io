var hasParent = function (el, parent) {
	var e = el;
	while (e = e.parentElement) {
		if (e === parent) {
			return true;
		}
	}

	return false;
};

var getScrollTop = function () {
	if (typeof pageYOffset != 'undefined') {
		// Most browsers except IE before #9
		return pageYOffset
	} else {
		var B = document.body // IE 'quirks'
		var D = document.documentElement // IE with doctype
		D = D.clientHeight ? D : B
		return D.scrollTop
	}
};

// Navigation
(function () {
	var nav = document.getElementById('mainNav');
	var menu = document.getElementById('mainMenu');
	var menuToggle = document.getElementById('menuToggle');
	var header = document.getElementsByTagName('header')[0];

	var handleScroll = function () {
		nav.className = getScrollTop() > header.clientHeight ? 'down' : '';
	};

	var toggleMenu = function () {
		menu.className = menu.className === 'open' ? '' : 'open';
	};

	window.addEventListener('scroll', handleScroll);
	menuToggle.addEventListener('click', toggleMenu);
})();

// Search
(function () {
	var search = document.getElementById('navSearch');

	var toggle = function (active) {
		return function () {
			search.className = active ? 'active' : '';
		};
	};

	var deactivate = toggle(false);

	var check = function (event) {
		toggle(hasParent(event.target, search))();
	};

	window.addEventListener('click', check);
	window.addEventListener('submit', deactivate);
})();

// Testimonials
(function () {
	var testimonials = document.getElementsByClassName('testimonial');
	var current = 0;
	var timeout;

	var resetTimer = function () {
		clearTimeout(timeout);
		timeout = setTimeout(next, 5000);
	};

	var update = function (increment) {
		return function () {
			resetTimer();
			current = (current + testimonials.length + increment) % testimonials.length;
			testimonials[0].style.marginLeft = (-100 * current) + '%';
		}
	};

	var prev = update(-1);
	var next = update(1);

	document.getElementById('prevTestimonial').addEventListener('click', prev);
	document.getElementById('nextTestimonial').addEventListener('click', next);
	
	resetTimer();
})();

/*ES6 version

// Navigation
(function () {
	const nav = document.querySelector('#mainNav')

	const handleScroll = () => nav.classList.toggle('down', window.scrollY > 0)

	window.addEventListener('scroll', handleScroll)
})()

// Testimonials
(function () {
	const testimonials = document.querySelectorAll('.testimonial')
	let current = 0
	let timeout

	const resetTimer = () => {
		clearTimeout(timeout)
		timeout = setTimeout(next, 3000)
	}

	const update = increment => () => {
		resetTimer()
		current = (current + testimonials.length + increment) % testimonials.length
		testimonials[0].style.marginLeft = (-100 * current) + '%'
	}

	const prev = update(-1)
	const next = update(1)

	document.querySelector('#prevTestimonial').addEventListener('click', prev)
	document.querySelector('#nextTestimonial').addEventListener('click', next)

	resetTimer()
})()*/