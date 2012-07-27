Ext.define("Material.form", {
    extend : 'Ext.form.Panel',
    requires : ['Ext.form.Panel'],
    split : true,
    frame : true,
    insertItems : function () { 
        var items = [{
            xtype : 'textfield',
            labelWidth : 50,
            fieldLabel : '编号',
            name : 'number'
        }, { 
            xtype : 'textfield',
            labelWidth : 50,
            fieldLabel : '物料名',
            name : 'name'
        }, { 
            xtype : 'textfield',
            labelWidth : 50,
            fieldLabel : '供应商',
            name : 'supplier'
        }];

//此编码是为了方便之后扩展功能
        var result = [];
        Ext.each(items, function (item) {
            result.push(item);
        });
        return result;
    },
    insertButtons : function () {
        var me = this,
            bns = [{
                text : '查询',
                handler : function () { 
                    me.fireEvent('clickQuery', Ext.usg.removeBlankValues(me.getForm().getValues()));
                }
            }, {
                text : '清空',
                handler : function () {
                    me.getForm().reset();
                    me.fireEvent('afterclear');
                }
            }];

//此编码是为了方便之后扩展功能
        var r = [];
        Ext.each (bns, function (bn) {
            r.push(bn);
        });
        return r;
    },
    initComponent : function () { 
        this.buttons = this.insertButtons();
        this.items = this.insertItems();
        this.callParent();


        this.addEvents('afterclear', 'clickquery');
    }
});
