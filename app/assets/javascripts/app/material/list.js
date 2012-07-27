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
        { text      : '供应商',     dataIndex : 'supplier' },
        { text      : '创建时间',   dataIndex : 'created_at', xtype : 'datecolumn', format : 'Y-m-d' }
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
        if(sm.getCount() == 0) { 
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
                { text : 'Add',   iconCls : 'icon-add', handler : function () { me.one.inNew(); me.win.show(); } },
                { text : 'Edit',  iconCls : 'icon-grid', handler : function () { var s = me.getSelectedValues(); if(s) { me.one.inEdit(s); me.win.show(); } else { alert("请选择数据!"); } } },
                { text : 'Show',  iconCls : 'icon-summary', handler : function () { var s = me.getSelectedValues(); if(s) { me.one.inShow(s); me.win.show(); } else { alert("请选择数据!"); } } },
                { text : 'Delete',  iconCls : 'icon-delete', handler : function () { 
                    var s = me.getSelectedValues(); 
                    if(s) { 
                        Ext.Ajax.request ({ 
                            url : Ext.String.format('/materials/{0}.json', s["id"]),
                            method : 'delete',
                            jsonData : { material : Ext.usg.removeBlankValues(s) },
                            success : function () { 
                                Ext.Msg.alert("Delete", "Success!", function (btn, text) { 
                                    if(btn == 'ok') { 
                                        this.store.loadPage(1);
                                    }
                                }, this);
                            },
                            failure : function (response, options) { 
                                Ext.Msg.alert("Error", "Failure!");
                            },
                            scope : me
                        });
                    } else { 
                        alert("请选择数据!"); };
                    } 
                }
            ]
        }
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
    initOne : function () { 
      var me = this;
      return Ext.create("Material.one", { 
          listeners : { 
              aftersave : function (values) { 
                  Ext.Ajax.request({ 
                      url : '/materials.json',
                      method : 'post',
                      jsonData : { material : Ext.usg.removeBlankValues(values) },
                      success : function () { 
                          Ext.Msg.alert("Create", "Success!", function (btn, text) { 
                              if(btn == 'ok') {
                                  this.store.proxy.extraParams.order = "created_at DESC";
                                  this.store.loadPage(1);
                              }
                          }, this);
                      },
                      failure : function (response, options) { 
                          var a = [], msg = Ext.decode(response.responseText);
                          for(m in msg) { 
                              a.push(Ext.String.format("{0}: {1}", m, msg[m]));
                          }
                          Ext.Msg.alert("Error", a.join("\n"));
                      },
                      scope : this 
                  });
                  this.win.hide();
              },
              afterupdate : function (values) { 
                  Ext.Ajax.request({ 
                      url : Ext.String.format('/materials/{0}.json', values["id"]),
                      method : 'put',
                      jsonData : { material : Ext.usg.removeBlankValues(values) },
                      success : function () {
                          Ext.Msg.alert("Update", "Success!", function (btn, text) { 
                              if(btn == 'ok') { 
                                  this.store.loadPage(1);
                              }
                          }, this);
                      },
                      failure : function (response, options) { 
                          var a = [], msg = Ext.decode(response.responseText);
                          for(m in msg) { 
                              a.push(Ext.String.format("{0}: {1}", m, msg[m]));
                          }
                          Ext.Msg.alert("Error", a.join("\n"));
                      },
                      scope : this
                  });
                  this.win.hide();
              },
              afterreset : function (panel) { 
                  panel.getForm().setValues(this.getSelectedValues());
              },
              aftercancel : function () { 
                  this.win.hide();
              },
              scope : me
          }
      });
    },
    initComponent : function () {
        this.store = this.initStore();
        this.tbar = this.initTbar();
        this.bbar = this.initBbar();
        this.one = this.initOne();
        this.win = this.initWin();
        this.callParent(arguments);

        this.addListener("sortchange", function (ct, column, direction, eOpts) {
            this.store.proxy.extraParams.order = Ext.String.format("{0} {1}", column.dataIndex, direction);
            this.store.loadPage(1);
        }, this);
    }
});
