var	outerRadius = 99;
var	innerRadius = outerRadius * 0.866025404;

var grassColor = [0, 206, 86];
var woodColor = [46, 130, 70];
var stoneColor = [74, 74, 74];
var beachColor = [232, 225, 174];
var wheatColor = [239, 196, 92];
var waterColor = [71, 131, 229];

var colors = [grassColor, woodColor, stoneColor, beachColor, wheatColor, waterColor];

var HexCenter = function(x, z) {

	this.corners = [[x, z + outerRadius],[x + innerRadius, z + outerRadius/2],
	[x + innerRadius, z - outerRadius/2],[x, z - outerRadius],
	[x - innerRadius, z - outerRadius/2],[x - innerRadius, z + outerRadius/2],
	[x, z + outerRadius]];

	this.drawHex = function(canvas) {
		//var c = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(this.corners[0][0], this.corners[0][1]);

		for (i = 1; i < this.corners.length; i++) {
			ctx.lineTo(this.corners[i][0], this.corners[i][1]);
		}

		var color = colors[Math.floor(Math.random() * colors.length)];
		ctx.strokeStyle = 'rgb(0,0,0)'
		ctx.lineWidth = 9;
		ctx.stroke();
		ctx.fillStyle = 'rgb(' + color.join(',') + ')';
		ctx.fill();

		/*ctx.moveTo(x, z);
		ctx.beginPath();
		ctx.arc(x,z,20,0,2*Math.PI);
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.fillStyle = '#FFFFFF';
		ctx.fill();*/
	}
}

var Catanify = function(elem) {
	var canvas = document.getElementById('hexCanvas');
	var el = $(elem);
	canvas.style.zIndex = -1;
	canvas.style.position = "fixed";
	canvas.style.border = "0px";
	
	canvas.width = el.width();
	canvas.height = el.height();
	var staggered = false;

	for (var j = el.position().top - outerRadius/2; j < el.position().top + el.height() + outerRadius * 2; j+= outerRadius * 6/4) {
		for (var i = el.position().left - innerRadius / 2; i < el.position().left + el.width() + outerRadius * 2; i += innerRadius * 2) {
			if (staggered) {
				var hex = new HexCenter(i - innerRadius , j);
			}

			else {
				var hex = new HexCenter(i, j);
			}

			hex.drawHex(canvas);
		}
		staggered = !staggered;
	}
}

$(document).ready(function() {
	Catanify('.catanify');
});