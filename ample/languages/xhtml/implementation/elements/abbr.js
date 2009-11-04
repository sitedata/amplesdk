/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2009 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/ample/licensing/
 *
 */

var cXHTMLElement_abbr	= function(){};
cXHTMLElement_abbr.prototype	= new cXHTMLElement;

// Class Events Handlers
cXHTMLElement_abbr.handlers	= {
	"DOMAttrModified":	function(oEvent) {
		if (oEvent.target == this)
			cXHTMLElement.mapAttribute(this, oEvent.attrName, oEvent.newValue);
	}
};

// Register Element with abbrinding
oXHTMLNamespace.setElement("abbr", cXHTMLElement_abbr);
