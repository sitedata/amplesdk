/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2010 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

//
cAMLQuery.prototype.animate	= function(oProperties, nSpeed, fEasing, fCallback) {
	// Validate API call
	fGuard(arguments, [
		["properties",	cObject, true],
		["speed",		cObject, true],
		["easing",		cFunction, true],
		["callback",	cFunction, true]
	]);

	// Invoke implementation
	return this;
};
