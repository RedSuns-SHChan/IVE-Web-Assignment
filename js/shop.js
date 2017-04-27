
var onAmountModified = function(element) {
	var selected = document.querySelector("#selected_amount_num");
	var price = document.querySelector("#total_price_num");

	console.log(element.amount);

	selected.innerText = "0";
	price.innerText = "$0";

	document.querySelectorAll("shop-product").forEach(function(element, index) {
		selected.innerText = (parseInt(selected.innerText) + parseInt(element.amount));
		price.innerText = "$" + (parseInt(price.innerText.replace("$", "")) + (parseInt(element.amount) * parseInt(element.price.replace("$", ""))));
	});
};

var onClickResetButton = function() {
	var selected = document.querySelector("#selected_amount_num");
	var price = document.querySelector("#total_price_num");

	selected.innerText = "0";
	price.innerText = "$0";

	document.querySelectorAll("shop-product").forEach(function(element, index) {
		element.amount = "0";
	});
};

document.querySelectorAll("shop-product").forEach(function(element, index) {
	element.onClick = "onAmountModified(this)";
});
