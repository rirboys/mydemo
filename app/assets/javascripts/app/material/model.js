Ext.define('Material.model', { 
    extend : 'Ext.data.Model',
    fields : [
        { name : 'id' },
        { name : 'number' },
        { name : 'name' },
        { name : 'supplier' },
        { name : 'created_at', type : 'date' }
    ],
    idProperty : 'id'
});
