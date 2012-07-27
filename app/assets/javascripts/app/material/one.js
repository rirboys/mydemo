Ext.define("Material.one", {
    extend : 'Ext.form.Panel',
    requires : ['Ext.form.Panel'],
    frame : true,
    insertItems : function () { 
        var me = this;
        return [{ 
            xtype : 'textfield',
            fieldLabel : 'ID',
            readOnly : true,
            name : 'id'
        }, { 
            xtype : 'textfield',
            fieldLabel : '编号',
            readOnly : true,
            name : 'number',
            allowBlank : false,
            blankText : 'Number is required!'
        }, { 
            xtype : 'textfield',
            fieldLabel : '物料名',
            readOnly : true,
            name : 'name',
            allowBlank : false,
            blankText : 'Name is required!'
        }, { 
            xtype : 'textfield',
            fieldLabel : '供应商',
            readOnly : true,
            name : 'supplier',
            allowBlank : false,
            blankText : 'Supplier is required!'
        }];
    },
    setReadOnly : function (b) { 
        for(var i = 1; i < this.items.length; i ++) {
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
                        if(me.getForm().isValid()) { 
                            me.fireEvent("aftersave", me.getForm().getValues());
                        }
                    }
                }),
                Ext.create("Ext.button.Button", {
                    text : '更新',
                    handler : function () { 
                        if(me.getForm().isValid()) { 
                            me.fireEvent("afterupdate", me.getForm().getValues());
                        }
                    }
                }),
                Ext.create("Ext.button.Button", {
                    text : '重置',
                    handler : function () {
                        me.fireEvent("afterreset", me);
                    }
                }),
                Ext.create("Ext.button.Button", { 
                    text : '取消',
                    handler : function () { 
                        me.fireEvent("aftercancel", me.getForm().getValues());
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

        this.addEvents("aftersave", "afterupdate", "aftercancel", "afterreset");
    }
});
