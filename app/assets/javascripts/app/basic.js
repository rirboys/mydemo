Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Material', 'assets/app/material');
Ext.grid.column.Column.prototype.doSort = function (state) { 
    var ds = this.up('tablepanel').store;
    if(this.canDoSort) { 
        ds.sort({
            property: this.getSortParam(),
            direction: state
        });
    }
};
Ext.ns("Ext.usg");

//Ext.usg.collect(array, fn);
Ext.usg.collect = function(array, fn) { 
    var r = [];
    if(typeof fn === 'function' && array instanceof Array) {
        Ext.each(array, function (item) { 
            if(fn(item))r.push(Ext.clone(item));
        });
    }
    return r;
};
Ext.usg.removeBlankValues = function (values) { 
    var r = {};
    if(values instanceof Object) {
        for(key in values) { 
            if(values[key] != "" && values[key] != null)r[key] = Ext.clone(values[key]);
        }
    }
    return r;
};
