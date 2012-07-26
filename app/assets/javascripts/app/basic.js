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
