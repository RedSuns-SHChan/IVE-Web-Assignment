/**
 * A simple library for color code operating.
 *
 * @author Chan Sze Ho
 */

function rgbToHex(rgb) {
	
}

function rgbaToHex(rgba) {
	
}

function hexToRgb(hex) {
	
}

function hexToRgba(hex) {
	
}

function getBrightness(rgba) {
	//[0-9]+[\.0-9]+|[\d]
}

function getHexBrightness(hex) {
	hexCode = hexCode.replace('#', '');

	var c_r = parseInt(hexCode.substr(0, 2),16);
	var c_g = parseInt(hexCode.substr(2, 2),16);
	var c_b = parseInt(hexCode.substr(4, 2),16);

	return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
}

function getColorWithBrightness(baseColor, Brightness) {
	
}

function calTextColor(hexcolor) {
	var r = 0, g = 0, b = 0;
	if (hexcolor.length == 4) {
		r = parseInt(hexcolor.substr(1,1) + "0", 16);
		g = parseInt(hexcolor.substr(2,1) + "0", 16);
		b = parseInt(hexcolor.substr(3,1) + "0", 16);
	} else {
		r = parseInt(hexcolor.substr(1,2),16);
		g = parseInt(hexcolor.substr(2,2),16);
		b = parseInt(hexcolor.substr(4,2),16);
	}
	var yiq = ((r*299)+(g*587)+(b*114))/1000;

	return (yiq >= 128) ? "#101010" : "#EFEFEF";
}
