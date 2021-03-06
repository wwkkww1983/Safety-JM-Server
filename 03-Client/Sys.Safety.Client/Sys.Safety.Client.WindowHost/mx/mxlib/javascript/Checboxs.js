﻿// vim: ts=4:sw=4:nu:fdc=4:nospell

Ext.form.MultiSelect


// add RegExp.escape if it has not been already added
if('function' !== typeof RegExp.escape) {
RegExp.escape = function(s) {
if('string' !== typeof s) {
return s;
}
// Note: if pasting from forum, precede ]/\ with backslash manually
return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}; // eo function escape
}

// create namespace
Ext.ns('Ext.form');


Ext.form.MultiSelect = Ext.extend(Ext.form.ComboBox, {

    // {{{
    // configuration options

    checkField: 'checked'


, separator: ','


    // }}}
    // {{{
, initComponent: function () {

    // template with checkbox
    if (!this.tpl) {
        this.tpl =
'<tpl for=".">'//str.replace(/^\s+|\s+$/g,"")
+ '<div class="x-combo-list-item" ext:qtip="{' + this.displayField + '}" style="text-align:left;width:' + this.width + 200 + ';">'//20111214hqb modify
+ '<img src="' + Ext.BLANK_IMAGE_URL + '" '
+ 'class="ux-MultiSelect-icon ux-MultiSelect-icon-'
+ '{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
+ '{[values.' + this.displayField + ']}'
+ '</div>'
+ '</tpl>'
; //tpl: '<tpl for="."><div ext:qtip="{addr}. {point}" class="x-combo-list-item">{addr}</div></tpl>'
    }

    // call parent
    Ext.form.MultiSelect.superclass.initComponent.apply(this, arguments);

    // install internal event handlers
    this.on({
        scope: this
, beforequery: this.onBeforeQuery
, blur: this.onRealBlur
    });

    // remove selection from input field
    this.onLoad = this.onLoad.createSequence(function () {
        if (this.el) {
            var v = this.el.dom.value;
            this.el.dom.value = '';
            this.el.dom.value = v;
        }
    });

} // e/o function initComponent
    // }}}
    // {{{

, initEvents: function () {
    Ext.form.MultiSelect.superclass.initEvents.apply(this, arguments);

    // disable default tab handling - does no good
    this.keyNav.tab = false;

} // eo function initEvents
    // }}}
    // {{{

, clearValue: function () {
    this.value = '';
    this.setRawValue(this.value);
    this.store.clearFilter();
    this.store.each(function (r) {
        r.set(this.checkField, false);
    }, this);
    if (this.hiddenField) {
        this.hiddenField.value = '';
    }
    this.applyEmptyText();
} // eo function clearValue
    // }}}
    // {{{
    //显示选中的项
, getCheckedDisplay: function () {
    var re = new RegExp(this.separator, "g");
    return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
} // eo function getCheckedDisplay
    // }}}
    // {{{

, getCheckedValue: function (field) {
    field = field || this.valueField;
    var c = [];
    // store may be filtered so get all records
    var snapshot = this.store.snapshot || this.store.data;
    snapshot.each(function (r) {
        if (r.get(this.checkField)) {
            c.push(r.get(field));
        }
    }, this);
    return c.join(this.separator);
} // eo function getCheckedValue
    // }}}
    // {{{

, onBeforeQuery: function (qe) {
    qe.query = qe.query.replace(new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ' + this.separator + ']*'), '');
} // eo function onBeforeQuery
    // }}}
    // {{{

, onRealBlur: function () {
    this.list.hide();
    var rv = this.getRawValue();
    var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
    var va = [];
    this.store.clearFilter();
    var snapshot = this.store.snapshot || this.store.data;

    // iterate through raw values and records and check/uncheck items
    Ext.each(rva, function (v) {
        snapshot.each(function (r) {
            if (v === r.get(this.displayField)) {
                va.push(r.get(this.valueField));
            }
        }, this);
    }, this);
    this.setValue(va.join(this.separator));
    this.store.clearFilter();
} // eo function onRealBlur
    // }}}
    // {{{
    // 重写combobox的失去焦点前触发的事件，避免清空多选的值 by 20120802 wumengyun
    , beforeBlur: function () {
    }
, onSelect: function (record, index) {
    if (this.fireEvent('beforeselect', this, record, index) !== false) {

        // toggle checked field
        record.set(this.checkField, !record.get(this.checkField));

        // display full list
        if (this.store.isFiltered()) {
            this.doQuery(this.allQuery);
        }

        // set (update) value and fire event
        this.setValue(this.getCheckedValue());
        this.fireEvent('select', this, record, index);
    }
} // eo function onSelect
    // }}}
    // {{{

, setValue: function (v) {
    if (v) {
        v = '' + v;
        if (this.valueField) {
            this.store.clearFilter();
            this.store.each(function (r) {
                var checked = !(!v.match('(^|' + this.separator + ')'
                                + RegExp.escape(r.get(this.valueField))
                                + '(' + this.separator + '|$)'));
                r.set(this.checkField, checked);
                //加上this才能成功的setValue by 20120802 wumengyun
            }, this);
            this.value = this.getCheckedValue();
            this.setRawValue(this.getCheckedDisplay());
            if (this.hiddenField) {
                this.hiddenField.value = this.value;
            }
        }
        else {
            this.value = v;
            this.setRawValue(v);
            if (this.hiddenField) {
                this.hiddenField.value = v;
            }
        }
        if (this.el) {
            this.el.removeClass(this.emptyClass);
        }
    }
    else {
        this.clearValue();
    }
} // eo function setValue
    // }}}
    // {{{

, selectAll: function () {
    this.store.each(function (record) {
        // toggle checked field
        record.set(this.checkField, true);
    }, this);

    //display full list
    this.doQuery(this.allQuery);
    this.setValue(this.getCheckedValue());
} // eo full selectAll
    // }}}
    // {{{

, deselectAll: function () {
    this.clearValue();
} // eo full deselectAll
    // }}}

});                                       // eo extend

// register xtype
Ext.reg('multiSelect', Ext.form.MultiSelect);



/*****************by yan 点击重置form时，清空多选的值***********************/
if ('function' !== typeof RegExp.escape) {
    RegExp.escape = function (s) {
        if ('string' !== typeof s) {
            return s;
        }
        // Note: if pasting from forum, precede ]/\ with backslash manually
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }; // eo function escape
}
// create namespace
Ext.ns('Ext.form');
Ext.form.MultiSelect = Ext.extend(Ext.form.ComboBox, {

    // {{{
    // configuration options

    checkField: 'checked'

	,
    multi: true
	,
    separator: ','

    // }}}
    // {{{
	,
    initComponent: function () {

        // template with checkbox
        if (!this.tpl) {

            this.tpl = '<tpl for=".">' + '<div class="x-combo-list-item">'
					+ '<img src="' + Ext.BLANK_IMAGE_URL + '" '
					+ 'class="ux-MultiSelect-icon ux-MultiSelect-icon-'
					+ '{[values.' + this.checkField + '?"checked":"unchecked"'
					+ ']}">' + '{[values.' + this.displayField + ']}'
					+ '</div>' + '</tpl>';
        }

        // call parent
        Ext.form.MultiSelect.superclass.initComponent.apply(this, arguments);


        // install internal event handlers
        this.on({
            scope: this,
            beforequery: this.onBeforeQuery,
            blur: this.onRealBlur
        });

        // remove selection from input field
        this.onLoad = this.onLoad.createSequence(function () {
            if (this.el) {
                var v = this.el.dom.value;
                this.el.dom.value = '';
                this.el.dom.value = v;
            }
        });

    } // e/o function initComponent
    // }}}
    // {{{

	,
    initEvents: function () {
        Ext.form.MultiSelect.superclass.initEvents.apply(this, arguments);

        // disable default tab handling - does no good
        this.keyNav.tab = false;

    } // eo function initEvents
    // }}}
    // {{{

	,


    beforeBlur: function () {
        // this.assertValue();
    },


    postBlur: function () {
        //        Ext.form.ComboBox.superclass.postBlur.call(this);
        //        this.collapse();
        //        this.inKeyMode = false;
    },

    clearValue: function () {
        this.value = '';
        this.setRawValue(this.value);
        this.store.clearFilter();
        this.store.each(function (r) {
            r.set(this.checkField, false);
        }, this);
        if (this.hiddenField) {
            this.hiddenField.value = '';
        }
        this.applyEmptyText();
    } // eo function clearValue
    // }}}
    // {{{

	,
    getCheckedDisplay: function () {
        var re = new RegExp(this.separator, "g");
        return this.getCheckedValue(this.displayField).replace(re,
				this.separator + ' ');
    } // eo function getCheckedDisplay
    // }}}
    // {{{

	,
    getCheckedValue: function (field) {
        field = field || this.valueField;
        var c = [];

        // store may be filtered so get all records
        var snapshot = this.store.snapshot || this.store.data;

        snapshot.each(function (r) {
            if (r.get(this.checkField)) {
                c.push(r.get(field));
            }
        }, this);

        return c.join(this.separator);
    } // eo function getCheckedValue
    // }}}
    // {{{

	,
    onBeforeQuery: function (qe) {
        qe.query = qe.query.replace(new RegExp(RegExp.escape(this
				.getCheckedDisplay())
				+ '[ ' + this.separator + ']*'), '');
    } // eo function onBeforeQuery
    // }}}
    // {{{

	,
    onRealBlur: function () {
        this.list.hide();
        var rv = this.getRawValue();
        var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
        var va = [];
        var snapshot = this.store.snapshot || this.store.data;

        // iterate through raw values and records and check/uncheck items
        Ext.each(rva, function (v) {
            snapshot.each(function (r) {
                if (v === r.get(this.displayField)) {
                    va.push(r.get(this.valueField));
                }
            }, this);
        }, this);
        this.setValue(va.join(this.separator));
        this.store.clearFilter();
    } // eo function onRealBlur
    // }}}
    // {{{

	,
    onSelect: function (record, index) {
        if (this.fireEvent('beforeselect', this, record, index) !== false) {

            // toggle checked field
            record.set(this.checkField, !record.get(this.checkField));

            // display full list
            if (this.store.isFiltered()) {
                this.doQuery(this.allQuery);
            }

            // set (update) value and fire event
            if (this.multi) {
                if (record.get("key") == "---" && record.get(this.checkField)) {
                    this.setValue("---");
                } else
                    this.setValue(this.getCheckedValue());
            }
            else {
                this.clearValue();
                this.value = record.get(this.valueField);
                this.setRawValue(record.get(this.displayField));
                this.list.hide();
            }

            //alert(this.value+"============================");
            this.fireEvent('select', this, record, index);
        }
    } // eo function onSelect
    // }}}
    // {{{

	,
    setValue: function (v) {
        if (v) {
            v = '' + v;
            if (this.valueField) {
                this.store.clearFilter();
                this.store.each(function (r) {
                    var checked = !(!v.match('(^|' + this.separator + ')'
							+ RegExp.escape(r.get(this.valueField)) + '('
							+ this.separator + '|$)'));

                    r.set(this.checkField, checked);
                }, this);
                this.value = this.getCheckedValue();
                this.setRawValue(this.getCheckedDisplay());
                if (this.hiddenField) {
                    this.hiddenField.value = this.value;
                }
            } else {
                this.value = v;
                this.setRawValue(v);
                if (this.hiddenField) {
                    this.hiddenField.value = v;
                }
            }
            if (this.el) {
                this.el.removeClass(this.emptyClass);
            }
        } else {
            //支持取消最后一个选项
            this.clearValue();
        }
    } // eo function setValue
    // }}}
    // {{{

	,
    selectAll: function () {
        this.store.each(function (record) {
            // toggle checked field
            record.set(this.checkField, true);
        }, this);

        // display full list
        this.doQuery(this.allQuery);
        this.setValue(this.getCheckedValue());
    } // eo full selectAll
    // }}}
    // {{{

    //支持reset
, reset: function () {
    this.clearValue();
}

,
    deselectAll: function () {
        this.clearValue();
    } // eo full deselectAll
    // }}}

}); // eo extend

// register xtype
Ext.reg('multiSelect', Ext.form.MultiSelect);

/*****************by yan end***********************/