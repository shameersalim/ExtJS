Ext.define("SE.view.MainView", {
    extend: "Ext.container.Viewport",
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
             /*   {
                    xtype: "sessiongridpanel",
                    flex: 3
                },*/
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