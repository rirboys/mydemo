Ext.define("Material.one", {
    extend : 'Ext.form.Panel',
    requires : ['Ext.form.Panel'],
    frame : true,
    insertItems : function () { 
        var me = this;
        return [{ 
            xtype : 'textfield',
            fieldLabel : '编号',
            readOnly : true,
            name : 'number'
        }, { 
            xtype : 'textfield',
            fieldLabel : '物料名',
            readOnly : true,
            name : 'name'
        }, { 
            xtype : 'textfield',
            fieldLabel : '供应商',
            readOnly : true,
            name : 'supplier'
        }];
    },
    setReadOnly : function (b) { 
        for(var i = 0; i < this.items.length; i ++) {
            this.getComponent(i).setReadOnly(b);
        }
    },
    inNew : function () { 
        this.inEdit();

        this.bns[0].setVisible(true);
        this.bns[1].setVisible(false);
        this.bns[2].setVisible(false);
        this.bns[3].setVisible(true);
    },
    inShow : function (values) {
        this.setReadOnly(true);
        this.setValues(values);

        this.bns[0].setVisible(false);
        this.bns[1].setVisible(false);
        this.bns[2].setVisible(false);
        this.bns[3].setVisible(true);
    },
    inEdit : function (values) {
        this.setReadOnly(false);
        this.getForm().reset();
        if(values) { 
            this.setValues(values);
        }

        this.bns[0].setVisible(false);
        this.bns[1].setVisible(true);
        this.bns[2].setVisible(true);
        this.bns[3].setVisible(false);
    },
    setValues : function (values) { 
        this.getForm().setValues(values);
    },
    getValues : function () { 
        return this.getForm().getValues();
    },
    insertButtons : function () { 
        var me = this, r = [];
        me.bns = [
                Ext.create("Ext.button.Button", { 
                    text : '保存',
                    handler : function () { 
                        me.fireEvent("aftersave");
                    }
                }),
                Ext.create("Ext.button.Button", { 
                    text : '更新',
                    handler : function () { 
                        me.fireEvent("aftersave");
                    }
                }),
                Ext.create("Ext.button.Button", { 
                    text : '重置',
                    handler : function () { 
                        me.fireEvent("aftersave");
                    }
                }),
                Ext.create("Ext.button.Button", { 
                    text : '取消',
                    handler : function () { 
                        me.fireEvent("aftersave");
                    }
                })
        ];

        Ext.each(me.bns, function (bn) { 
            r.push(bn);
        });
        return r;
    },
    initComponent : function () {
        this.items = this.insertItems();
        this.buttons = this.insertButtons();
        this.callParent(arguments);

        this.addEvents("aftersave", "afterupdate", "aftercancel", "afterclear");
    }
});
