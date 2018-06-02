'use strict';

/* Helper functions */
Math.sign = function(x) {
	return x > 0 ? 1 : x < 0 ? -1 : 0;
}

String.prototype.replaceAt = function(index, newCharacter) {
	return this.substring(0, index) + newCharacter + this.substring(index + newCharacter.length);
}

function $(str) {
	return document.querySelectorAll(str);
}

function index(el) {
	var i = 0;
	while (el = el.previousElementSibling) { i++; }
	return i;
}

var Ajax = {
    request: function(ops) {
        if(typeof ops == 'string') ops = { url: ops };
        ops.url = ops.url || '';
        ops.method = ops.method || 'get'
        ops.data = ops.data || {};
        var getParams = function(data, url) {
            var arr = [], str;
            for(var name in data) {
                arr.push(name + '=' + encodeURIComponent(data[name]));
            }
            str = arr.join('&');
            if(str != '') {
                return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
            }
            return '';
        }
        var api = {
            host: {},
            process: function(ops) {
                var self = this;
                this.xhr = null;
                if(window.ActiveXObject) { this.xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
                else if(window.XMLHttpRequest) { this.xhr = new XMLHttpRequest(); }
                if(this.xhr) {
                    this.xhr.onreadystatechange = function() {
                        if(self.xhr.readyState == 4 && self.xhr.status == 200) {
                            var result = self.xhr.responseText;
                            if(ops.json === true && typeof JSON != 'undefined') {
                                result = JSON.parse(result);
                            }
                            self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
                        } else if(self.xhr.readyState == 4) {
                            self.failCallback && self.failCallback.apply(self.host, [self.xhr]);
                        }
                        self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.xhr]);
                    }
                }
                if(ops.method == 'get') {
                    this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
                } else {
                    this.xhr.open(ops.method, ops.url, true);
                    this.setHeaders({
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-type': 'application/x-www-form-urlencoded'
                    });
                }
                if(ops.headers && typeof ops.headers == 'object') {
                    this.setHeaders(ops.headers);
                }       
                setTimeout(function() { 
                    ops.method == 'get' ? self.xhr.send() : self.xhr.send(getParams(ops.data)); 
                }, 20);
                return this;
            },
            done: function(callback) {
                this.doneCallback = callback;
                return this;
            },
            fail: function(callback) {
                this.failCallback = callback;
                return this;
            },
            always: function(callback) {
                this.alwaysCallback = callback;
                return this;
            },
            setHeaders: function(headers) {
                for(var name in headers) {
                    this.xhr && this.xhr.setRequestHeader(name, headers[name]);
                }
            }
        }
        return api.process(ops);
    }
}

/* Init variables */
var record = {
		bottles: 0,
		crates: 0,
		returns: 0
	},
	persons,
	bottlesPerDay = [0, 0, 0, 0, 0, 0, 0];

/* Main methods */
function init() {
	function fail() {
		$('#personList')[0].innerHTML = '<span class="error">De lijst kon niet geladen worden, probeer de pagina te herladen.</span>';
	}

	loadData(createPersons, fail);
}

function loadData(done, fail) {
	Ajax.request({
		url: 'load.php',
		method: 'get',
		data: {},
		json: true
	}).done(function(result) {
		persons = result.persons;
		
		for (var i = 0; i < 7; i++) {
			bottlesPerDay[result.bottlesPerDay[i].day] = result.bottlesPerDay[i].bottles;
		}

		done();
	}).fail(function(xhr) {
		fail();
	});
}

function createPersons() {
	function createPerson(name, crates, bottles, returns) {
		var person = document.createElement('div');
		person.className = 'row person';
		person.dataset.name = name;

		var net = crates*24 - bottles;

		var str = '';

		str +=  '<h2>' + name + '</h2>' +
				'<p class="message"></p>' +
				'<div class="action bottlePlus" data-action="bottlePlus"></div>' +
				'<div class="toggle"></div>' +
				'<ul class="actions">' +
					'<li class="action" data-action="bottleMin">Fles minder</li>' +
					'<li class="action" data-action="crateMin">Krat minder</li>' +
					'<li class="action" data-action="returnPlus">Krat weggebracht</li>' +
					'<li class="action" data-action="returnMin">Krat minder weggebracht</li>' +
					'<hr>' +
					'<li class="action" data-action="showStatistics">Statistieken</li>' +
				'</ul>' +
				'<div class="crates">';

		for (var i = 0; i < Math.max(bottles/24, crates); i++) {
			str +=  '<div class="crate';
			if (i < crates) { str += ' paid'; }
			if (i < returns) { str += ' returned'; }
			str +=  '">';

			for (var j = i*24; j < Math.min(bottles, i*24 + 24); j++) {
				str +=  '<div class="bottle open"></div>';
			}

			for (var j = Math.max(i*24, bottles); j < i*24 + 24; j++) {
				str +=  '<div class="bottle"></div>';
			}

			str +=  '</div>';
		}

		str +=  	'<div class="action cratePlus" data-action="cratePlus">+</div>' +
				'</div>';

		person.innerHTML = str;
		$('#personList')[0].appendChild(person);
		updatePerson(name);
	}

	for (var name in persons) {
		createPerson(name,
					 persons[name].crates,
					 persons[name].bottles,
					 persons[name].returns);
	}

	var els = $('.crates');
	for (var i = 0; i < els.length; i++) { els[i].scrollLeft = els[i].scrollWidth; }

	updateListeners();
	updateRecord();
	updateBars();
}

function updateListeners() {
	window.onclick = toggleActions;
	window.onscroll = toggleActions;

	var els = $('.action');
	for (var i = 0; i < els.length; i++) { els[i].onclick = window[els[i].dataset.action]; }
}

function updatePerson(name) {
	var el = $('.person[data-name="' + name + '"] .message')[0],
		e = persons[name].crates,
		d = persons[name].bottles,
		net = e*24 - d;

	if (net > 0) {
		el.className = 'message good';
		el.innerHTML = 'Mag nog ' + net + ' flesjes drinken';
	} else if (net == 0) {
		el.className = 'message';
		el.innerHTML = '';
	} else {
		el.className = 'message bad';

		var a = Math.ceil(-net/24);
		if (a === 1) {
			el.innerHTML = 'Moet 1 kratje kopen';
		} else {
			el.innerHTML = 'Moet ' + a + ' kratjes kopen';
		}
	}
}

function updateBars() {
	var bars = $('.bar'),
		max = 0,
		H = Math.floor(Math.min(window.innerWidth, 800)/8);

	for (var i = 0; i < 7; i++) {
		if (bottlesPerDay[i] > max) { max = bottlesPerDay[i]; }
	}

	for (var i = 0; i < 7; i++) {
		var h = Math.floor(H*bottlesPerDay[i]/max);
		bars[i].style.borderBottomWidth = h + 'px';
		bars[i].style.paddingBottom = (16 + (H - h)) + 'px';
	}
}

function updateRecord() {
	record.bottles = 0;
	record.crates  = 0;
	record.returns = 0;

	for (var name in persons) {
		record.bottles += persons[name].bottles;
		record.crates  += persons[name].crates;
		record.returns += persons[name].returns;
	}

	$('#bottleCount')[0].innerHTML = record.bottles;
	$('#crateCount')[0].innerHTML  = record.crates;
	$('#bottlesLeft')[0].innerHTML = record.crates*24 - record.bottles;
	$('#returnCount')[0].innerHTML = record.returns;
}

function toggleActions() {
	var els = $('.toggle');

	if (window.event.target.className == 'toggle') {
		for (var i = 0; i < els.length; i++) { els[i].className = 'toggle'; }
		window.event.target.className = 'toggle open';
	} else {
		for (var i = 0; i < els.length; i++) { els[i].className = 'toggle'; }
	}
}

function bottlePlus() {
	var name = this.parentElement.dataset.name;

	updateDatabase(name, 1, 0, 0, function() {
		var el,
			crates = $('.person[data-name="' + name + '"] .crate');

		if (persons[name].bottles >= 24*crates.length) {
			el = document.createElement('div');
			el.className = 'crate';

			var html = '';

			for (var i = 0; i < persons[name].bottles + 1 - 24*crates.length; i++) {
				html += '<div class="bottle open"></div>';
			}

			for (; i < 24; i++) {
				html += '<div class="bottle"></div>';
			}

			el.innerHTML = html;
			$('.person[data-name="' + name + '"] .crates')[0]
				.insertBefore(el, $('.person[data-name="' + name + '"] .cratePlus')[0]);
		} else {
			var bottles = $('.person[data-name="' + name + '"] .bottle');

			for (var i = 0; i < bottles.length; i++) {
				if (bottles[i].className == 'bottle') {
					bottles[i].className = 'bottle open';
					break;
				}
			}
		}

		el = $('.person[data-name="' + name + '"] .crates')[0];
		el.scrollLeft = el.scrollWidth;

		persons[name].bottles += 1;
	});
}

function bottleMin() {
	var name = this.parentElement.parentElement.dataset.name;

	if (persons[name].bottles <= 0) { return; }

	updateDatabase(name, -1, 0, 0, function() {
		var bottles = $('.person[data-name="' + name + '"] .bottle');

		for (var i = bottles.length - 1; i >= 0; i--) {
			if (bottles[i].className == 'bottle open') {
				bottles[i].className = 'bottle';

				var crate = bottles[i].parentElement;
				if (crate.className == 'crate') {
					if (crate.getElementsByClassName('bottle open').length == 0) {
						crate.parentElement.removeChild(crate);
					}
				}

				break;
			}
		}

		persons[name].bottles -= 1;
	});
}

function cratePlus() {
	var name = this.parentElement.parentElement.dataset.name;

	updateDatabase(name, 0, 1, 0, function() {
		var crates = $('.person[data-name="' + name + '"] .crate'),
			p = true;

		for (var i = 0; i < crates.length; i++) {
			if (crates[i].className == 'crate') {
				crates[i].className = 'crate paid';
				p = false;
				break;
			}
		}

		if (p) {
			var el = document.createElement('div');
			el.className = 'crate paid';

			var html = '';
			for (var i = 0; i < 24; i++) { html += '<div class="bottle"></div>'; }
			el.innerHTML = html;

			$('.person[data-name="' + name + '"] .crates')[0]
				.insertBefore(el, $('.person[data-name="' + name + '"] .cratePlus')[0]);
		}

		el = $('.person[data-name="' + name + '"] .crates')[0];
		el.scrollLeft = el.scrollWidth;

		persons[name].crates += 1;
	});
}

function crateMin() {
	var name = this.parentElement.parentElement.dataset.name;
	if (persons[name].crates <= persons[name].returns) { return; }

	updateDatabase(name, 0, -1, 0, function() {
		var crates = $('.person[data-name="' + name + '"] .crate');

		for (var i = crates.length - 1; i >= 0; i--) {
			if (crates[i].className == 'crate paid') {
				crates[i].className = 'crate';

				if (crates[i].getElementsByClassName('bottle open').length == 0) {
					crates[i].parentElement.removeChild(crates[i]);
				}

				break;
			}
		}

		persons[name].crates -= 1;
	});
}

function returnPlus() {
	var name = this.parentElement.parentElement.dataset.name;
	if (persons[name].returns >= persons[name].crates ||
		persons[name].returns >= Math.floor(persons[name].bottles/24)) { return; }

	updateDatabase(name, 0, 0, 1, function() {
		var crates = $('.person[data-name="' + name + '"] .crate');

		for (var i = 0; i < crates.length; i++) {
			if (crates[i].className == 'crate') {
				crates[i].className = 'crate returned';
				break;
			}

			if (crates[i].className == 'crate paid') {
				crates[i].className = 'crate paid returned';
				break;
			}
		}

		persons[name].returns += 1;
	});
}

function returnMin() {
	var name = this.parentElement.parentElement.dataset.name;
	if (persons[name].returns <= 0) { return; }

	updateDatabase(name, 0, 0, -1, function() {
		var crates = $('.person[data-name="' + name + '"] .crate');

		for (var i = crates.length - 1; i >= 0; i--) {
			if (crates[i].className == 'crate returned') {
				crates[i].className = 'crate';
				break;
			}

			if (crates[i].className == 'crate paid returned') {
				crates[i].className = 'crate paid';
				break;
			}
		}

		persons[name].returns -= 1;
	});
}

function updateDatabase(name, bottles, crates, returns, callback) {
	Ajax.request({
		url: 'update.php',
		method: 'post',
		data: {
			name: name,
			bottles: bottles,
			crates: crates,
			returns: returns
		}
	}).done(function(result) {
		callback(result);
		updatePerson(name);
		updateRecord();
	}).fail(function(xhr) {
		alert('Error: Je biertje kon niet geregistreerd worden. Probeer het nog eens of herlaad de pagina.');
	}).always(function(xhr) {
	
	});
}

window.onload = init;
window.onresize = updateBars;