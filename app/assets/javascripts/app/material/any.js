Ext.define("Material.any", {
    extend : 'Ext.form.Panel',
    requires : ['Ext.form.Panel'],
    insertItems : function () { 
        var me = this;
        return [{ 
            xtype : 'textarea'
        }, { 
            layout : 'vbox',
            frame : true,
            items : [
                { xtype : 'button', text : '查询', width : 68, handler : function () { me.fireEvent('clickquery') } },
                { xtype : 'button', text : '清空', width : 68, handler : function () { me.fireEvent('afterclear') } }
            ]
        }];
    },
    layout : 'column',
    frame : true,
    initComponent : function () {
        this.items = this.insertItems();
        this.callParent(arguments);

        this.addEvents("clickquery", 'afterclear');
    }
});
