/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

var cXULElement_treerow	= function() {
	// Collections
	this.cells		= new ample.classes.NodeList;
};
cXULElement_treerow.prototype	= new cXULElement("treerow");
cXULElement_treerow.prototype.$hoverable	= true;

// Public Methods
cXULElement_treerow.prototype.$isAccessible	= function() {
	return this.parentNode && this.parentNode.parentNode && this.parentNode.parentNode.tree ? this.parentNode.parentNode.tree.$isAccessible() : true;
};

// Private members
cXULElement_treerow.prototype._onCommandClick	= function(oEvent) {
	var oTree	= this.parentNode.parentNode.tree;
	if (this.$getContainer("command").checked) {
		if (oTree.attributes["type"] == "radio")
			oTree.selectItem(this.parentNode);
		else
		if (oTree.attributes["type"] == "checkbox")
			oTree.addItemToSelection(this.parentNode);
	}
	else
		oTree.removeItemFromSelection(this.parentNode);
};

// Class events handlers
cXULElement_treerow.handlers	= {
	"DOMNodeInserted":	function(oEvent) {
		if (oEvent.target.parentNode == this)
			if (oEvent.target instanceof cXULElement_treecell)
				this.cells.$add(oEvent.target);
	},
	"DOMNodeRemoved":	function(oEvent) {
		if (oEvent.target.parentNode == this)
			if (oEvent.target instanceof cXULElement_treecell)
				this.cells.$remove(oEvent.target);
	},
	"DOMNodeInsertedIntoDocument":	function(oEvent) {
		// Move view node if neccessary
		var oItem	= this.parentNode,
			aItems	= oItem.parentNode.tree.items;
		var nItemIndex	= aItems.$indexOf(oItem);
		if (aItems[nItemIndex - 1]) {
			var oItemPrevious	= aItems[nItemIndex - 1].$getContainer();
			var oRowContainer	= this.$getContainer();
			if (oRowContainer != oItemPrevious.nextSibling)
				oRowContainer.parentNode.insertBefore(oRowContainer, oItemPrevious.nextSibling);
		}
	}
};

// Element Render: open
cXULElement_treerow.prototype.$getTagOpen	= function() {
	var oTree	= this.parentNode.parentNode.tree;
	if (this.parentNode.parentNode.parentNode.attributes["open"] == "false")
		this.parentNode.parentNode.attributes["hidden"] = "true";

	return '<tr class="xul-treerow' + (this.attributes["class"] ? " " + this.attributes["class"] : '') + '" style="height:1.2em;vertical-align:top;' + (this.parentNode.parentNode.parentNode.attributes["open"] == "false" ? 'display:none' : '')+ '">' +
			(this.parentNode.attributes["label"] || (oTree && (oTree.attributes["type"] == "checkbox" || oTree.attributes["type"] == "radio"))
			? ('<td style="padding:0" onmousedown="event.cancelBubble=true" class="xul-treecell">' +
				(this.parentNode.attributes["label"]
				? '<div class="xul-treecell--gateway">' + this.parentNode.attributes["label"] + '</div>'
				: (oTree.attributes["type"] == "checkbox"
					? '<input type="checkbox" name="' + oTree.uniqueID + '_cmd" class="xul-treeitem--command" onclick="ample.$instance(this)._onCommandClick(event);" autocomplete="off"/>'
						: (oTree.attributes["type"] == "radio"
						? '<input type="radio" name="' + oTree.uniqueID + '_cmd" class="xul-treeitem--command" onclick="ample.$instance(this)._onCommandClick(event);"/>'
					: ' ')))+
			'</td>')
			: '');
};

// Element Render: close
cXULElement_treerow.prototype.$getTagClose	= function() {
	return '</tr>';
};

// Register Element
ample.extend(cXULElement_treerow);
