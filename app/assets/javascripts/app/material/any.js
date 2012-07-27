Ext.define("Material.any", {
    extend : 'Ext.form.Panel',
    title : 'Any',
    requires : ['Ext.form.Panel'],
    insertItems : function () { 
        var me = this;
        return [{ 
            name : "any",
            xtype : 'textarea'
        }, { 
            layout : 'vbox',
            frame : true,
            items : [
                { xtype : 'button', text : '查询', width : 68, handler : function () { me.fireEvent('clickquery', me.getForm().getValues()); } },
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
