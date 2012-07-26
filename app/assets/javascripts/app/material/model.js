Ext.define('Material.model', { 
    extend : 'Ext.data.Model',
    fields : [
        { name : 'id' },
        { name : 'number' },
        { name : 'name' },
        { name : 'supplier' }
    ],
    idProperty : 'id'
});
