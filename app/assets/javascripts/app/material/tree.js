Ext.define("Material.tree", { 
    extend : 'Ext.tree.Panel',
    width : 240,
    requires : ['Ext.tree.Panel', 'Ext.data.TreeStore'],
    initStore : function () { 
        var ts = Ext.create('Ext.data.TreeStore', { 
            root : { 
                expand : true,
                children : [
                    { text : '供应商', leaf : true }
                ]
            }
        });
        return ts;
    },
    rootVisible : false,
    initComponent : function () {
        this.store = this.initStore();
        this.callParent(arguments);
    }
});
