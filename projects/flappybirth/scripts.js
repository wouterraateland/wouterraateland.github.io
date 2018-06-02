'use strict';

//polyfills
(function() {
	//animationFrame
	var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'];
	
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
        	};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) { clearTimeout(id); };
	}

	//timer
	if (!window.performance) { window.performance = {}; }

	if (!window.performance.now) {
		if (window.performance.webkitNow) {
			window.performance.now = window.performance.webkitNow;
		} else {
			window.performance.now = function() { return new Date().getTime(); };
		}
	}

	//audio
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	window.audioContext = new AudioContext();

	//localstorage
	if (window.localStorage === undefined) { window.localStorage = {}; };
}());

//handheld
var handheld = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), online = true;
document.body.className = handheld ? 'handheld' : '';

//game
function Game() {
	//static classes
	//sound
	function Sound(url) {
		var sound = this;
		this.buffer = null;

		var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		request.open("GET", url, true);
		request.responseType = "arraybuffer";

		request.onload = function() {
			window.audioContext.decodeAudioData(request.response, function(buffer) {
				sound.buffer = buffer;
			});
		}

		try {
			request.send();
		} catch(e) {
			console.warn('You are probably offline. Check your internet connection');
			elements.scoreTable.innerHTML = '<p id="message">Could not load highscores. Check your internet connection.</p>';
			online = false;
		}
	}

	Sound.prototype.play = function(time, loop) {
		if (this.buffer != null) {
			var source = audioContext.createBufferSource();
			source.buffer = this.buffer;
			source.loop = loop || false;
			source.connect(audioContext.destination);
			if (!source.start) { source.start = source.noteOn; }
			source.start(time);
		}	
	};

	//sprites
	function Sprite(url, xorigin, yorigin) {
		this.sprite = new Image();
		this.sprite.src = url;

		this.origin = {x: xorigin || 0, y: yorigin || 0};
	}

	Sprite.prototype = {
		setOrigin: function(x, y) {
			return this.origin = {x: x, y: y};
		},
		draw: function(x, y, xscale, yscale, rotation) {
			ctx.save();
			ctx.translate(x, y);
			ctx.scale(xscale || 1, yscale || 1);
			ctx.rotate(rotation || 0);
			ctx.drawImage(this.sprite, -this.origin.x, -this.origin.y);
			ctx.restore();
		},
		get width() { return this.sprite.width; },
		get height() { return this.sprite.height; }
	};

	//angle difference
	function angleDifference(a1, a2) {
		return ((((a1 - a2) % (Math.PI*2)) + Math.PI*3) % (Math.PI*2)) - Math.PI;
	}

	//game
	var canvas = document.getElementsByTagName('canvas')[0];

	canvas.height = Math.min(568, window.innerHeight);
	canvas.width = canvas.height*320/568;

	var	ctx = canvas.getContext('2d'),
		gameState = 0,//0: name input, 1: menu, 2: playing, 3: paused, 4: death
		score = 0,
		name = localStorage.name || '',
		instances = new Array(),
		view = {
			x: 0,
			y: 0,
			w: 320,
			h: 568,
			f: null,
			s: Math.min(window.innerHeight, 1),
			needsUpdate: true,
			update: function() {
				if (view.needsUpdate) {
					elements.container.style.width = Math.min(window.innerHeight/568*320, 320) + 'px';
					canvas.height = Math.min(window.innerHeight, 568);
					canvas.width = Math.min(window.innerHeight/568*320, 320);
					view.s = canvas.height/568;
					document.body.style.fontSize = canvas.width/10 + 'px';
					background.scale = view.h/140;
					view.needsUpdate = false;
				}

				if (view.f === null) { return; }

				try {
					view.x = Math.max(-view.w, view.f.x - view.w/4);
					view.y = Math.min(player.x + view.w*5/4, 0);
				} catch (error) {
					console.error('The view does not know who to follow!');
				}
			},
			follow: function(i) { view.f = i; },
			reset: function() { view.f = null; }
		},
		timer = {
			prev: window.performance.now(),
			get timespan() {
				var n = window.performance.now(), d = n - timer.prev;
				timer.prev = n;

				return d;
			}
		},
		elements = {
			container: document.getElementById('container'),
			menu: document.getElementsByTagName('menu')[0],
			name: document.getElementById('nameForm'),
			nameInput: document.getElementById('nameForm').getElementsByTagName('input')[0],
			start: document.getElementById('start'),
			highscores: document.getElementById('highscores'),
			score: document.getElementById('score'),
			h1: document.getElementsByTagName('h1')[0],
			results: document.getElementById('results'),
			highscore: document.getElementById('highscore'),
			lastscore: document.getElementById('lastscore'),
			scoreTable: document.getElementById('scoreTable')
		},
		background = new Sprite('images/background.svg'),
		player,
		track;/*,
		backgroundMusic = new Sound('background.wav');
	
	setTimeout(function() {
		backgroundMusic.play(0, true);
	}, 100);*/

	background.offset = {x: 0, y: 0};
	background.scale = 568/140;

	//functions
	function init() {
		//load highscores
		updateHighscores(false);	

		if (localStorage.name === undefined) {//first time
			localStorage.score = 0;

			var carrier = createInstance(Carrier);
			
			elements.name.addEventListener('submit', function(event) {
				event.preventDefault();
				elements.nameInput.blur();
				name = localStorage.name = elements.nameInput.value;
				elements.name.className = '';
				carrier.done = true;
			});

			elements.name.className = 'open';
			elements.nameInput.focus();
		} else {//not first time
			showMenu();
		}

		window.addEventListener('resize', function() { view.needsUpdate = true; });
		elements.start.addEventListener('click', start);
		elements.highscores.addEventListener('click', toggleHighscores);

		timer.timespan;
		window.requestAnimationFrame(update);
	}

	function showMenu() {
		gameState = 1;
		elements.menu.className = 'open';
		elements.start.focus();
	}

	function start(event) {
		event.preventDefault;

		if (gameState === 1) {
			gameState = 2;
			elements.menu.className = elements.results.className = elements.scoreTable.className = '';

			instances = new Array();
			
			setTimeout(function() {
				track = createInstance(Track);
				player = createInstance(Player, -view.w*3/2, view.h/2);
			}, 500);
		}
	}

	function update() {
		var dt = timer.timespan;

		//update
		for (var i = 0; i < instances.length; i ++) {
			if (instances[i] !== null) { instances[i].update(dt); }
		}

		//update background
		background.offset.x -= (gameState == 2)*dt*Player.speed/8;

		if (background.offset.x + background.width*background.scale < 0) { background.offset.x = view.w; }

		//draw
		view.update();

		ctx.clearRect(0, 0, view.w, view.h);

		ctx.save();
		ctx.scale(view.s, view.s);

		background.draw(background.offset.x, background.offset.y, background.scale, background.scale);

		ctx.translate(-view.x, -view.y);

		for (var i = 0; i < instances.length; i ++) {
			if (instances[i] !== null) { instances[i].draw(); }
		}

		ctx.restore();

		//UI
		if (gameState == 2) { elements.score.innerHTML = score; }

		window.requestAnimationFrame(update);
	}

	function updateHighscores(submit) {
		if (!online) { return; }

		var xhr = new XMLHttpRequest(), data = submit ? ('name=' + localStorage.name + '&score=' + localStorage.score) : 'name=Nobody&score=0';
		xhr.open('POST', 'submit.php', false);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		try {
			xhr.send(data);
		} catch(e) {
			console.warn('You are probably offline. Check your internet connection');
			elements.scoreTable.innerHTML = '<p id="message">Could not load highscores. Check your internet connection.</p>';
			online = false;
			return;
		}

		var text = '<ol>', a = xhr.responseText.split('\n');

		for (var i = 0; i < a.length - 1; i += 2) {
			text += '<li>' + a[i] + '<span>' + a[i + 1] + '</span></li>';
		}

		text += '</ol>';

		elements.scoreTable.innerHTML = text;
	}

	function toggleHighscores(event) {
		event.preventDefault();
		if (gameState == 1) {
			elements.scoreTable.className = elements.scoreTable.className == '' ? 'open' : '';
		}
	}

	function gameOver() {
		if (score > (parseInt(localStorage.score) || 0)) {
			localStorage.score = score;
			updateHighscores(true);
		}
		
		elements.score.innerHTML = '';
		elements.h1.innerHTML = 'Game Over';
		elements.highscore.innerHTML = localStorage.score;
		elements.lastscore.innerHTML = score;
		elements.results.className = 'open';
		showMenu();
	}

	function createInstance(F, x, y) {
		return instances[instances.push(new F(x || 0, y || 0)) - 1];
	}

	//objects
	function Carrier() {
		this.id = instances.length;
		this.x = -view.w/2;
		this.y = 0;
		this.t = 0;
		this.done = false;
	}

	Carrier.timeSpan = 1000;

	Carrier.prototype = {
		update: function(dt) {
			this.t += dt;

			if (this.done == false) {
				this.t = Math.min(this.t, Carrier.timeSpan);
			} else if (this.t >= Carrier.timeSpan*2) {
				showMenu();
				this.destroy();
			}

			this.x = view.w*(.5 + (this.t/Carrier.timeSpan - 1)*(this.t/Carrier.timeSpan - 1)*(this.t/Carrier.timeSpan - 1));
			this.y = view.h*this.t/Carrier.timeSpan*(1 - this.t/Carrier.timeSpan/2)
		},
		draw: function() {
			Player.wing1.draw(this.x, this.y, Math.sin(timer.prev/Player.period), Math.sin(timer.prev/Player.period));
			Player.body.draw(this.x, this.y);
			Player.sack.draw(this.x + Player.sack.offset.x, this.y + Player.sack.offset.y, 1, 1, Player.sackD*Math.cos(timer.prev/Player.sackPeriod));
			Player.wing1.draw(this.x, this.y, Math.sin(timer.prev/Player.period), Math.sin(timer.prev/Player.period));
		},
		destroy: function() {
			instances[this.id] = null;
		}
	};

	function Player(x, y) {
		this.x = x || 0;
		this.y = y || 0;
		this.r = 0;

		this.dead = false;

		this.wing = {v: 0, d: 0};
		this.sack = 0;

		this.jumping = false;
		this.started = false;
		this.jumped = false;

		this.speed = {x: Player.speed, y: 0};
		
		view.follow(this);

		//keyboard
		window.addEventListener('keydown', function() { if (player.x >= -view.w*3/4) { player.jumping = player.started = true; }});
		window.addEventListener('keyup', function() { player.jumping = player.jumped = false; });

		//mouse
		window.addEventListener('mousedown', function() { if (player.x >= -view.w*3/4) { player.jumping = player.started = true; }});
		window.addEventListener('mouseup', function() { player.jumping = player.jumped = false; });

		//touch
		window.addEventListener('touchstart', function() { if (player.x >= -view.w*3/4) { player.jumping = player.started = true; }});
		window.addEventListener('touchend', function() { player.jumping = player.jumped = false; });
	}

	Player.width = 48;
	Player.height = 48;
	
	Player.body = new Sprite('images/stork-body.svg', 24, 24);
	Player.wing1 = new Sprite('images/stork-back-wing.svg', 20, 24);
	Player.wing2 = new Sprite('images/stork-front-wing.svg', 24, 20);
	Player.sack = new Sprite('images/sack.svg', 5.5, 0);
	Player.sack.offset = {x: 18.5, y: -22};
	
	Player.speed = .2;
	Player.jump = -.45;
	Player.gravity = .0015;
	Player.period = 200;
	Player.sackPeriod = 100;
	Player.sackD = .3;

	Player.prototype = {
		update: function(dt) {
			var prev = {x: this.x, y: this.y};

			this.speed.y += (Player.gravity*this.started)*dt;

			if (this.dead === false) {
				if (this.jumping && !this.jumped) {
					this.jumped = true;
					this.speed.y = Player.jump;
					this.wing.v = -.04;
				}

				var i = Math.max(0, Math.round(this.x/Track.hd));
				
				if (this.y + Player.height/2 >= view.h - Track.bottom || //screen bottom
				   (Math.abs(this.x - i*Track.hd - 32) <= Player.width/2 + 32 &&
				   (this.y - Player.height/2 <= track.poles[i].h || this.y + Player.height/2 >= track.poles[i].h + Track.vd))) { //pole
				    	this.dead = true;
					this.speed.x = 0;
				}
			}

			this.x += this.speed.x*dt;
			this.y += this.speed.y*dt;
			this.r += .001*(this.speed.y - this.r)*dt;

			this.wing.v += .0002*dt;
			this.wing.d = Math.max(-Math.PI/2, Math.min(this.wing.d + this.wing.v*dt, Math.PI/2));

			this.sack += dt;

			if (this.started === false) { this.x = Math.min(this.x, -view.w*3/4); }

			if (this.y + Player.height/2 >= view.h - Track.bottom) { gameOver(); }
			
			this.y = Math.max(Player.height/2, Math.min(this.y, view.h - Track.bottom - Player.height/2));	
			this.speed.y = (this.y - prev.y)/dt;

			score = Math.max(0, Math.floor((this.x - 96)/Track.hd) + 1);
		},
		draw: function() {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.r + Math.PI*this.dead);
			Player.wing1.draw(0, 0, Math.sin(this.wing.d), Math.sin(this.wing.d));
			Player.body.draw(0, 0);
			Player.sack.draw(Player.sack.offset.x, Player.sack.offset.y, 1, 1, Player.sackD*Math.cos(this.sack/Player.sackPeriod) - this.r + .1);
			Player.wing2.draw(0, 0, Math.sin(this.wing.d), Math.sin(this.wing.d));
			ctx.restore();
		}
	};

	function Track() {
		this.poles = new Array();

		for (var i = 0; i < 10000; i ++) {
			this.poles[i] = {h: 64 + (view.h - Track.bottom - 128 - Track.vd)*Math.random(), t: Math.floor(Math.random()*Math.random()*3)};
		}
	}

	Track.nest = new Sprite('images/nest.svg');
	Track.fence = new Sprite('images/fence.svg', 0, 12);
	Track.torch = new Sprite('images/torch.svg');
	Track.ground = new Sprite('images/ground.svg');
	
	Track.hd = 240;
	Track.vd = 160;
	Track.bottom = 64;
	Track.f = .001;
	
	Track.prototype = {
		update: function(dt) {
			var s = Math.max(0, Math.round(view.x/Track.hd));
			for (var i = s; i < s + 5; i ++) {
				if (this.poles[i].t == 2) {
					this.poles[i].h = 64 + (view.h - Track.bottom - Track.vd - 128)*(.5 + .5*Math.sin(i + timer.prev*Track.f));
				}
			}
		},
		draw: function() {
			var s = Math.max(0, Math.round(view.x/Track.hd));
			for (var i = s; i < s + 2; i ++) {
				switch (this.poles[i].t) {
					case 0:
						Track.nest.draw(i*Track.hd + 64, this.poles[i].h, 1, 1, Math.PI);
						Track.nest.draw(i*Track.hd, this.poles[i].h + Track.vd);
						break;
					case 1:
						var o = Math.max(0, Math.min(i*Track.hd*2 - player.x*2 - Player.width - Track.vd, Track.vd/2));
						Track.fence.draw(i*Track.hd + 64, this.poles[i].h + o, 1, 1, Math.PI);
						Track.fence.draw(i*Track.hd, this.poles[i].h + Track.vd - o);
						break;
					case 2:
						Track.torch.draw(i*Track.hd + 64, this.poles[i].h, 1, 1, Math.PI);
						Track.torch.draw(i*Track.hd, this.poles[i].h + Track.vd);
						break;
				}
			}

			Track.ground.draw(Math.floor(view.x/view.w)*view.w, view.h - Track.bottom);
		}
	};

	init();
}

window.addEventListener('load', new Game);
