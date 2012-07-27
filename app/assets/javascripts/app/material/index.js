Ext.define("Material.index", { 
    extend : 'Ext.panel.Panel',
    requires : ['Ext.panel.Panel', 'Material.*'],
    layout : 'border',
    initList : function () { 
        return Ext.create('Material.list', { region : 'center' })
    },
    doQuery : function (arg) { 
        delete this.list.store.proxy.extraParams.any;
        delete this.list.store.proxy.extraParams.conditions;
        delete this.list.store.proxy.extraParams.link;
        Ext.apply(this.list.store.proxy.extraParams, arg);
        this.list.store.loadPage(1);
    },
    initQuery : function () { 
        var me = this;
        return Ext.create('Material.query', { region : 'west', listeners : { 
            anyquery : function (values) {
                this.doQuery(values);
            },
            formquery : function (values) { 
                this.doQuery({ conditions : Ext.encode(values) });
            },
            leafclick : function (link) {
                this.doQuery({ 'link' : link });
            },
            scope : me
        } });
    },
    initComponent : function () { 
        this.list = this.initList();
        this.query = this.initQuery();
        this.items = [this.list, this.query];
        this.callParent(arguments);
    }
});
