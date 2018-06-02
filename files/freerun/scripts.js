'use strict';

Math.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

String.prototype.replaceAt = function(index, newCharacter) {
	return this.substring(0, index) + newCharacter + this.substring(index+newCharacter.length);
}

function $(str) {
	return document.querySelectorAll(str);
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

var liked = localStorage.likes ? localStorage.likes.split('') : [];

function load() {
	var e = $('#options')[0];
	
	Ajax.request({
		url: 'load.php',
		method: 'get',
		data: {},
		json: true
	}).done(function(result) {
		function opt(i, n, d, l) {
			var li = document.createElement('li');
			li.className = 'option';
			li.setAttribute('index', i);
			li.innerHTML = '<span>' + n + '</span><div class="dislike">' + d + '</div><div class="like">' + l + '</div>';
			return li;
		}
		
		result.sort(function(a, b){return (b.likes-b.dislikes) - (a.likes-a.dislikes)});

		for (var i = 0; i < result.length; i++) {
			e.appendChild(opt(result[i].index, result[i].name, result[i].dislikes, result[i].likes));
		}

		var options = document.getElementsByClassName('option'),
			likes = document.getElementsByClassName('like'),
			dislikes = document.getElementsByClassName('dislike');

		for (var i = 0; i < options.length; i++) {
			if (liked[i] !== '0' && liked[i] !== undefined) {
				$('.option[index="' + i + '"]')[0].className = liked[i] == '1' ? 'option liked' : 'option disliked';
			}
		
			likes[i].onclick = like;
			dislikes[i].onclick = dislike;
		}

	}).fail(function(xhr) {
		e.innerHTML = '<span class="error">De lijst kon niet geladen worden, probeer de pagina te herladen.</span>';
	}).always(function(xhr) {
	
	});
	
	resize();
}

function resize() {
	scroll();
}

function scroll() {

}

function like() {
	var n = this.parentElement.className,
		i = this.parentElement.getAttribute('index');

	if (n == 'option disliked') {
		updateDatabase(i, 1, -1);
	} else if (n == 'option') {
		updateDatabase(i, 1, 0);
	} else {
		updateDatabase(i, -1, 0);
	}
}

function dislike() {
	var n = this.parentElement.className,
		i = this.parentElement.getAttribute('index');

	if (n == 'option liked') {
		updateDatabase(i, -1, 1);
	} else if (n == 'option') {
		updateDatabase(i, 0, 1);
	} else {
		updateDatabase(i, 0, -1);
	}
}

function updateDatabase(i, l, d) {
	/*i = option index,
	  l = like increase,
	  d = dislike increase*/
	
	Ajax.request({
		url: 'update.php',
		method: 'post',
		data: {
			name: $('.option[index="' + i + '"]')[0].getElementsByTagName('span')[0].innerHTML,
			likes: l,
			dislikes: d
		}
	}).done(function(result) {
		$('.option[index="' + i + '"]')[0].className = (l == 1) ? 'option liked' : (d == 1) ? 'option disliked' : 'option';
		liked[i] = (l == 1) ? '1' : (d == 1) ? '2' : '0';
		for (var j = 0; j < liked.length; j++) { if (liked[j] == undefined) { liked[j] = '0'; } }
		localStorage.likes = liked.join('');

		var e = $('.option[index="' + i + '"]')[0].getElementsByClassName('like')[0];
		e.innerHTML = parseInt(e.innerHTML) + l;
		e = $('.option[index="' + i + '"]')[0].getElementsByClassName('dislike')[0];
		e.innerHTML = parseInt(e.innerHTML) + d;
	}).fail(function(xhr) {
		alert('Error: Je like kon niet geregistreerd worden. Probeer het nog eens of herlaad de pagina.');
	}).always(function(xhr) {
	
	});
}

function submit() {
	if ($('#newOption')[0].value == '') { return; }
	
	Ajax.request({
		url: 'suggest.php',
		method: 'post',
		data: {
			name: $('#newOption')[0].value
		}
	}).done(function(result) {		
		var li = document.createElement('li'),
			s = document.createElement('span'),
			l = document.createElement('div'),
			d = document.createElement('div');

		li.setAttribute('index', $('.option').length);
		li.className = 'option';

		s.innerHTML = $('#newOption')[0].value;

		l.className = 'like';
		l.innerHTML = '0';
		l.onclick = like;
		
		d.className = 'dislike';
		d.innerHTML = '0';
		d.onclick = dislike;
		
		$('#options')[0].appendChild(li);
		li.appendChild(s);
		li.appendChild(d);
		li.appendChild(l);

		$('#newOption')[0].value = '';
	}).fail(function(xhr) {
		alert('Error: Je suggestie kon niet verzonden worden. Probeer het nog eens of herlaad de pagina.');
	}).always(function(xhr) {
	
	});

}

window.onload = load;
window.onresize = resize;
window.onscroll = scroll;
$('#submit')[0].onclick = submit;
