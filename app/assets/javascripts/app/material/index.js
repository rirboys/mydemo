Ext.define("Material.index", { 
    extend : 'Ext.panel.Panel',
    requires : ['Ext.panel.Panel', 'Material.*'],
    layout : 'border',
    initList : function () { 
        return Ext.create('Material.list', { region : 'center' })
    },
    initQuery : function () { 
        return Ext.create('Material.query', { region : 'west' })
    },
    initComponent : function () { 
        this.list = this.initList();
        this.query = this.initQuery();
        this.items = [this.list, this.query];
        this.callParent(arguments);
    }
});
