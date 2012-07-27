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
            Ext.create("Material.any", { region : 'north', collapsible : true, collapsed : true, listeners : { 
                clickquery : function (values) { 
                    this.fireEvent("anyquery", values);
                },
                scope : me
            } }),
            Ext.create("Material.tree", { region : 'east', collapsible : true, collapsed : true, listeners : { 
                cellclick : function (table, td, cellIndex, record, tr, rowIndex, e, eOpt) { 
                    if(record.getData()['leaf']) { 
                        this.fireEvent("leafclick", record.getData()['id']);
                    }
                },
                scope : me
            } }),
            Ext.create("Material.form", { region : 'center', listeners : { 
                clickquery : function (values) {
                    this.fireEvent("formquery", values);
                },
                scope : me
            } })
        ];
    },
    initComponent : function () {
        this.items = this.insertItems();
        this.callParent(arguments);

        this.addEvents("formquery", "anyquery", "leafclick");
    }
});
