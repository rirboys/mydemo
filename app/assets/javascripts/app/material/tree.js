Ext.define("Material.tree", { 
    extend : 'Ext.tree.Panel',
    width : 230,
    title : 'Tree',
    requires : ['Ext.tree.Panel', 'Ext.data.TreeStore'],
    initStore : function () { 
        var ts = Ext.create('Ext.data.TreeStore', { 
            root : { 
                expand : true,
                children : [
                    { text : 'Today',     leaf : true, id : 'today' },
                    { text : 'Yesterday', leaf : true, id : 'yesterday' },
                    { text : 'ThisWeek',  leaf : true, id : 'this_week' },
                    { text : 'ThisMonth', leaf : true, id : 'this_month' },
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
