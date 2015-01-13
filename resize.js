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
                this.resize.handler = $('<div class="redactor-resize-handler" style="cursor:s-resize;display:block;position:absolute;bottom:0;right:0;width:16px;height:16px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAtUlEQVR42mL8//8/AyUAIICYGCgEAAFEtAFnz551AuKTQJyALA4QQKS4oA6IzYC4C1kQIIBIMWAZEP+F0nAAEECMlAYiQACx4PMzkGoH4unGxsYLZs2aBeenpaUtgKkDCCAmEvyMNQwAAoiJBD9jDQOAAKI4DAACiAlXPKenpzsB8UkgBvMZGRmdgPgkEKOkA4AAYiLBz1jDACCAmEjwM9YwAAggisMAIIAozkwAAUSxAQABBgCBl0L7jJdTdgAAAABJRU5ErkJggg==);" />')
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
                this.$editor.height(this.$editor.height() + (e.pageY - this.resize.drag.y));
            }
            if (this.opts.resizeX) {
                this.$editor.width(this.$editor.width() + (e.pageX - this.resize.drag.x));
            }
            this.resize.drag = {x: e.pageX, y: e.pageY};
        }
    };
};