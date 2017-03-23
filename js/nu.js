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

	register : function(name, settings) {
		nu.log(name, "Started to register element: " + name);
		var proto = Object.create(HTMLElement.prototype);
		var templateTag = document.currentScript.ownerDocument.getElementsByTagName("template")[0];
		var template = templateTag.innerHTML;

		proto.createdCallback = function() {
			var shadowRoot = this.createShadowRoot();
			shadowRoot.innerHTML = template;
			if ("defaults" in settings) {
				Object.keys(settings["defaults"]).forEach(function (index, value) {
					var key = "{{" + index.toUpperCase() + "}}";
					while (shadowRoot.innerHTML.indexOf(key) != -1) {
						nu.log(name, "Applying template [" + index + "], value : " +  settings["defaults"][index]);
						shadowRoot.innerHTML = shadowRoot.innerHTML.replace(key, settings["defaults"][index]);
					}
				});
			}
			if ("oncreate" in settings) {
				var customCallback = settings["oncreate"];
				customCallback();
			}
		};

		proto.attributeChangedCallback = function(name, oldValue, newValue) {
			var shadow = this.createShadowRoot();
			// Temporary solution, very buggy.
			shadow.innerHTML = shadow.innerHTML.replace(oldValue, newValue);
		};

		document.registerElement(name, {prototype:proto});
	}

};
