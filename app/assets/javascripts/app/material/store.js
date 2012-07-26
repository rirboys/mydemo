Ext.define("Material.store", { 
    extend : 'Ext.data.JsonStore',
    requires : ['Ext.data.JsonStore', 'Material.model'],
    constructor : function (config) { 
        config = Ext.apply({ 
            model : 'Material.model',
            proxy : { 
                type : 'ajax',
                url : 'materials',
                reader : { 
                    type : 'json',
                    root : 'materials',
                    totalProperty : 'totalRecord',
                    idProperty : 'id'
                }
            },
            autoLoad : true
        }, config);
        this.callParent(config);
    }
});
