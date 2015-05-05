if (!RedactorPlugins)
    var RedactorPlugins = {};

RedactorPlugins.resize = function ()
{
    return {
        drag: {
            x: 0,
            y: 0
        },
        init: function ()
        {
            if (this.opts.resizeX || this.opts.resizeY) {
                this.resize.handler = $('<div class="redactor-resize-handler" />')
                        .bind('mousedown.redactor.resize', $.proxy(this.resize.mousedown, this))
                        .insertAfter(this.$editor);
            }
        },
        mousedown: function (e) {
            this.resize.drag = {x: e.pageX, y: e.pageY};

            if (this.opts.resizeY) {
                this.$editor.height(this.$editor.height()).css({'max-height': '', 'min-height': ''});
            }
            if (this.opts.resizeX) {
                this.$editor.width(this.$editor.width()).css({'max-width': '', 'min-width': ''});
            }

            $(window).bind('mousemove.redactor.resize', $.proxy(this.resize.resize, this))
                     .bind('mouseup.redactor.resize', function () {
                $(window).unbind('mousemove.redactor.resize mouseup.redactor.resize');
            });
        },
        resize: function (e) {
            if (this.opts.resizeY) {
                $('textarea', this.$box).add(this.$editor).height(this.$editor.height() + (e.pageY - this.resize.drag.y));
            }
            if (this.opts.resizeX) {
                $('textarea', this.$box).add(this.$editor).width(this.$editor.width() + (e.pageX - this.resize.drag.x));
            }
            this.resize.drag = {x: e.pageX, y: e.pageY};
        }
    };
};