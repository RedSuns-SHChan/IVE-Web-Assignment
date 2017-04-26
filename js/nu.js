/**
 * Nu - Light weight element registration framework.
 */

var nu = {

	log : function(name, msg) {
		console.log("[" + name + "]" + msg);
	},

	warn : function(name, msg) {
		console.warn("[" + name + "]" + msg);
	},

	error : function(name, msg) {
		console.error("[" + name + "]" + msg);
	},

	register : function(name, options) {
		nu.log(name, "Started to register element: " + name);
		var proto = Object.create(HTMLElement.prototype);
		var templateTag = document.currentScript.ownerDocument.getElementsByTagName("template")[0];
		var template = templateTag.innerHTML;

		if (options != null) {
			proto.createdCallback = function() {
				var shadowRoot = this.createShadowRoot();
				shadowRoot.innerHTML = template;
				if ("attrs" in options) {
					Object.keys(options["attrs"]).forEach(function(index, value) {
						var data = options["attrs"][index];
						var attr = document.createAttribute(index);
						attr.value = data;
						this.setAttributeNode(attr);
					});
				}
				if ("defaults" in options) {
					Object.keys(options["defaults"]).forEach(function (index, value) {
						var key = "{{" + index.toUpperCase() + "}}";
						while (shadowRoot.innerHTML.indexOf(key) != -1) {
							nu.log(name, "Applying template [" + index + "], value : " +  options["defaults"][index]);
							shadowRoot.innerHTML = shadowRoot.innerHTML.replace(key, options["defaults"][index]);
						}
					});
				}
				if ("oncreate" in options) {
					var customCallback = options["oncreate"];
					customCallback();
				}
			};

			proto.attributeChangedCallback = function(name, oldValue, newValue) {
				var shadow = this.createShadowRoot();
				// Temporary solution, very buggy.
				var key = "{{" + name + "}}";
				while (shadow.innerHTML.indexOf(key) != -1) {
					shadow.innerHTML = shadow.innerHTML.replace(key, newValue);
				}
				while (shadow.innerHTML.indexOf(oldValue) != -1) {
					shadow.innerHTML = shadow.innerHTML.replace(oldValue, newValue);
				}
				window.alert("Setted attribute " + name + ", value : " + this.getAttribute(name));
			};
		}
		document.registerElement(name, {prototype:proto});
	},

	ajax : function(url, method) {

	}

};
