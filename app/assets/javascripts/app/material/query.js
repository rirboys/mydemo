Ext.define("Material.query", { 
    title : 'Query',
    requires : ['Material.any', 'Material.tree', 'Material.form', 'Ext.panel.Panel'],
    extend : 'Ext.panel.Panel',
    layout : { 
        type : 'border',
        padding : 5
    },
    width : 250,
    insertItems : function () { 
        var me = this;
        return [
            Ext.create("Material.any", { region : 'north', collapsible : true, collapsed : true  }),
            Ext.create("Material.tree", { region : 'east', collapsible : true, collapsed : true }),
            Ext.create("Material.form", { region : 'center' })
        ];
    },
    initComponent : function () {
        this.items = this.insertItems();
        this.callParent(arguments);
    }
});
