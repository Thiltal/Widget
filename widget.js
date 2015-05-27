/*
 * Widget is build on the top of Mustache library. Widget always know its data model. Data model NEVER know its widgets.
 * Widgets is a tree structure. Repaint goes from root every animation frame. If Widget is repainted, every child must be repainted.
 * If widget is not repainted, every child can be repainted.
 */

window.namespace = window.namespace || {};
namespace.classes = namespace.classes || {};
namespace.classes.Widget = {
    // Name is there for developers comfort especially in error reporting
    name:"Widget",
    // Template is String template used by Mustache library as template.
    template: null,
    // Target is jQuery element representing HTMLElement in which widget should be painted
    $target: null,
    // Parent widget is parent of this widget in widget hierarchy tree
    parentWidget: null,
    // Widget lang is i18n or just map used in repaint
    widgetLang: null,
    // List<Widget>
    children: [],
    // set to true every time, you need to repaint widget. If it is set to true, next repaint loop will repaint the widget.
    repaintRequested: true,
    // stop repainting during some special operation (<input> create in <td>)
    keepPaintedState: false,
    requestRepaint: function () {
        this.repaintRequested = true;
    },
    init: function () {
        
    },
    // Returns map to be used to merge with template using Mustache library
    out: function () {

    },
    repaint: function (force) {
        if (this.keepPaintedState) {
            this.onNoRepaint();
            return;
        }
        if (this.repaintRequested || force) {
            this.repaintRequested = false;
            if (this.$target === null) {
                throw "Target is null for " + this.templateName;
            }
            this.$target.html(Mustache.render(this.template, this.out()));
            this.tideFunctionality();
            this.setChildrenTargets();
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].repaint(true);
            }

        } else {
            this.onNoRepaint();
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].repaint();
            }
        }
    },
    // Method called 60/s instead of repaint for repeat checking utilities
    onNoRepaint: function () {

    },
    // after Widget repaint, every HTMLElement inside Widget is new - query it and bind events 
    tideFunctionality: function () {

    },
    // after Widget repaint, every HTMLElement is new, so child widgets are painted in detached element.
    // New element must be set to child widgets. After that repaint on new widgets will be performed.
    setChildrenTargets: function () {

    },
    destroy: function () {
        
    }
};
