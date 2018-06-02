'use strict';

Math.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

var img = new Image();
img.onload = function() {
	createHistogram(this, 10);
}

img.src = 'images/image.jpg';

var createHistogram = function (image, number) {
	var createBar = function (r, g, b, length) {
		var el = document.createElement('div');
		el.className = 'bar';
		el.style.width = length*100 + '%';
		el.style.height = 10 + 'px';
		el.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

		document.getElementById('result').appendChild(el);
	};

	// Init colors
	var colors = [];

	for (var r = 0; r < 256; r++) {
		colors[r] = [];
		for (var g = 0; g < 256; g++) {
			colors[r][g] = [];
			for (var b = 0; b < 256; b++) {
				colors[r][g][b] = 0;
			}
		}
	}

	// Get colors from image
	var canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.heigth = image.height;

	var context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
	var data = context.getImageData(0, 0, image.width, image.height).data;
	var max = 1, pixels = 0;

	for (var i = 0; i < data.length; i += 4) {
		if (data[i] == data[i+1] && data[i+1] == data[i+2] && data[i+2] == 0) { continue; }
		if (colors[data[i]][data[i+1]][data[i+2]]++ > max) { max ++; }
	}

	var R = 0,
		G = 0,
		B = 0;

	for (var r = 0; r < 256; r++) {
		for (var g = 0; g < 256; g++) {
			for (var b = 0; b < 256; b++) {
				var c = (colors[r][g][b] >= max*0.2) ? colors[r][g][b] : 0;
				R += r*c;
				G += g*c;
				B += b*c;
				pixels += c;
			}
		}
	}

	R = Math.floor(R/pixels);
	G = Math.floor(G/pixels);
	B = Math.floor(B/pixels);

	// Show image
	var el = document.createElement('img');
	el.src = image.src;
	document.getElementById('result').appendChild(el);

	// Show dominant color
	var el = document.createElement('div');
	el.className = 'color';
	el.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
	document.getElementById('result').appendChild(el);


	/*
	// Create bars
	for (var r = 0; r < 256; r++) {
		for (var g = 0; g < 256; g++) {
			for (var b = 0; b < 256; b++) {
				if (colors[r][g][b] !== 0) {
					createBar(r, g, b, colors[r][g][b]/max);
				}
			}
		}
	}*/
};