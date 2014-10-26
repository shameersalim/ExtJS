var sessionsPanel = {
    xtype: 'panel',
    html: '<b>Sessions Panel</b>',
    flex: 2
};


var speakersPanel = {
    xtype: 'panel',
    html: '<b>Speakers Panel</b>',
    flex: 1
};

var combinedSessionSpeaker = Ext.create('Ext.Panel', {
    layout: {
        type: "vbox",
        align: "stretch"
    },
    items: [sessionsPanel, speakersPanel]
});


Ext.application({
    name: "MyApp",
    launch: function () {

        Ext.define('SessionForm', {
            extend: "Ext.window.Window",
            alias: "widget.sessionform",
            padding: 5,
            width: 600,
            title: "Edit Sessions",
            model: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    defaults: {
                        labelWidth: 90,
                        margin: '0 0 10 0',
                        anchor: '90%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'title',
                            fieldLabel: "Title"
                        },
                        {
                            xtype: 'checkbox',
                            name: 'approved',
                            fieldLabel: "Approved"
                        }

                    ]
                }
            ]
        });

        Ext.define("SessionGridPanel", {
            extend: "Ext.grid.Panel",
            alias: "widget.sessiongridpanel",
            listeners: {
                itemdblclick: function (gridpanel, record, item, e) {
                    var formWindow = Ext.create('SessionForm');
                    var form = formWindow.down('form');
                    form.loadRecord(record);
                    formWindow.show();
                }
            },
            store: {
                fields: ['id',
                    {
                        name: 'title',
                        sortType: 'asUCText'
                    },
                    'approved',
                {
                    dateFormat: 'c',
                    name: 'sessionTimeDateTime',
                    sortType: 'asDate',
                    type: 'date'
                },
                {
                    name: 'sessionTimePretty',
                    type: 'string',

                    convert: function (v, rec) {
                        var convertIt = Ext.util.Format.dateRenderer('m/d/Y g:i a');
                        pretty = convertIt(rec.get("sessionTimeDateTime"));
                        return pretty;
                    }
                }],
                autoLoad: true,
                autoSync: true,
                sorters: [
                    //{ property: 'approved' },
                    { property: 'title' }
                ],
                proxy: {
                    type: "rest",
                    url: 'sessions.json',
                    reader: {
                        type: "json",
                        root: "data"
                    }
                },
                groupField: 'sessionTimeDateTime'
            },

            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: "id",
                    text: "Id"
                },
                 {
                     xtype: 'gridcolumn',
                     dataIndex: "title",
                     text: "Title",
                     flex: 1,
                     minWidth: 75,
                     width: 100,
                 },
                  {
                      xtype: 'gridcolumn',
                      dataIndex: "approved",
                      text: "Approved"
                  },
                  {
                      xtype: 'gridcolumn',
                      dataIndex: "sessionTimePretty",
                      text: "Session Start Time",
                      width: 180
                  }

            ],
            features: [
                {
                    ftype: 'grouping',
                    groupHeaderTpl: [
                        '{[values.rows[0].get(\'sessionTimePretty\')]} (Session Count: {rows.length})'
                       //'Session Count : '
                    ]
                }
            ]
        });

        Ext.create('Ext.container.Viewport', {
            layout: {
                type: "border",
                //align: "stretch"
            },
            items: [
                {
                    region: 'west',
                    layout: {
                        type: "vbox",
                        align: "stretch"
                    },
                    flex: 1,
                    split: true,
                    items: [
                        {
                            xtype: "sessiongridpanel",
                            flex: 3
                        },
                        {
                            xtype: 'panel',
                            html: '<b>Sessions Panel</b>',
                            flex: 2
                        },
                        {
                            xtype: 'splitter',
                            width: 1
                        },
                        {
                            xtype: 'panel',
                            html: '<b>Presenters</b>',
                            flex: 1
                        }
                    ]

                },
                {
                    region: 'center',
                    xtype: 'panel',
                    html: '<b>Session Details</b>',
                    flex: 1,
                    title: "Details",
                    collapsible: true,
                    collapseDirection: "right",
                    collapsed: false
                }
            ]

        });
    }
});
