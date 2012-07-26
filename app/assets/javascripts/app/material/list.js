Ext.define("Material.list", {
    title : 'List',
    extend : 'Ext.grid.Panel',
    requires : [
        'Ext.grid.Panel',
        'Material.model',
        'Material.one'
    ],
    split : true,
    viewConfig : { 
        stripeRows : true,
        enableTextSelection : true
    },
    columns : [
        { text      : 'ID',         dataIndex : 'id' },
        { text      : '编号',       dataIndex : 'number' },
        { text      : '物料名',     dataIndex : 'name' },
        { text      : '供应商',     dataIndex : 'supplier', }
    ],
    initStore : function () { 
        return Ext.create('Ext.data.JsonStore', { 
            model : 'Material.model',
            pageSize : 25,
            proxy : { 
                type : 'ajax',
                url : 'materials.json',
                reader : { 
                    type : 'json',
                    root : 'materials',
                    totalProperty : 'totalRecord',
                    idProperty : 'id'
                }
            },
            autoLoad : true
        });
    },
    initBbar : function () { 
        return Ext.create('Ext.PagingToolbar', { 
            store : this.store,
            displayInfo : true,
            displayMsg : 'Displaying topics {0} - {1} of {2}',
            emptyMsg : 'No topics to display'
        });
    },
    getSelectedValues : function () { 
        var sm = this.getSelectionModel();
        if(sm.getCount = 0) { 
            return false;
        } else { 
            return sm.getSelection()[0].data;
        }
    },
    initTbar : function () { 
        var me = this;
        return { 
            items : [
                '->',
                { text : 'Add',   handler : function () { me.one.inNew(); me.win.show(); } },
                { text : 'Edit',  handler : function () { var s = me.getSelectedValues(); if(s) { me.one.inEdit(s); me.win.show(); } else { alert("请选择数据!"); } } },
                { text : 'Show',  handler : function () { var s = me.getSelectedValues(); if(s) { me.one.inEdit(s); me.win.show(); } else { alert("请选择数据!"); } } },
                { text : 'Show',  handler : function () { var s = me.getSelectedValues(); if(s) { alert("删除选中的数据！"); } else { alert("请选择数据!"); } } }
            ]
        }
    },
    listeners : { 
        sortchange : function (ct, column, direction, eOpts) { 
            this.store.loadPage(1, { params :{ order : Ext.String.format("{0} {1}", column.dataIndex, direction) } });
        },
        scope : this
    },
    initWin : function () {
        var me = this;
        return Ext.create("widget.window", { 
            title : 'Material',
            closable : true,
            closeAction : 'hide',
            width : 350,
            height : 300,
            layout : {
                type : 'fit',
                padding : 5
            },
            items : [
                me.one
            ]
        });
    },
    initComponent : function () {
        this.store = this.initStore();
        this.tbar = this.initTbar();
        this.bbar = this.initBbar();
        this.one = Ext.create("Material.one");
        this.win = this.initWin();
        this.callParent(arguments);
    }
});
