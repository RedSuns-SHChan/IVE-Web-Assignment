function set_cookie(name, value, expired) {
	var d = new Date();
	d.setTime(d.getTime() + (expired*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
	console.log("Created cookie: [" + name + "], value: " + value);
}

function get_cookies_as_array() {
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	return ca;
}

function get_cookie(name) {
	var cookies = get_cookies_as_array();
	for(var i = 0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length + 1, c.length);
		}
	}
	return "";
}

function remove_cookie(name) {
	if(is_cookie_exists(name)) {
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
	}
	console.warn("Removed cookie: [" + name + "]");
}

function is_cookie_exists(name) {
	return (get_cookie(name).length > 1);
}