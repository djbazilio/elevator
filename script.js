function init() {
    var $ = go.GraphObject.make;
    var diagram = new go.Diagram("myDiagramDiv2");

    function makePoint(name, spot) {
        return $(go.Shape, "Rectangle",
            {
                fill: 'black',
                fromLinkable: true,
                desiredSize: new go.Size(8, 8),
                alignment: spot,
                margin: -1,
                alignmentFocus: spot,
                portId: name,
                cursor: "pointer"
            },
            new go.Binding("fromLinkable", "from"),
            new go.Binding("toMaxLinks", "toMaxLinks"),
            new go.Binding("fromMaxLinks", "fromMaxLinks"),
            new go.Binding("toLinkable", "to")
        )
    }

    diagram.nodeTemplate =
        $(go.Node, "Vertical",
            $(go.TextBlock,
                {
                    margin: new go.Margin(3, 0, 0, 0),
                    maxSize: new go.Size(100, 30),
                    isMultiline: false,
                    font: "bold 10pt sans-serif"
                },

                new go.Binding("text", "key")),
            $(go.Panel, "Table",
                {
                    desiredSize: new go.Size(75, 75),
                    maxSize: new go.Size(80, 80)
                },
                $(go.Picture,
                    {
                        desiredSize: new go.Size(51, 51),
                        maxSize: new go.Size(50, 50),
                        background: 'red'
                    },
                    new go.Binding("source", "img")),
                makePoint("T", go.Spot.Top),
                makePoint("L", go.Spot.Left),
                makePoint("R", go.Spot.Right),
                makePoint("B", go.Spot.Bottom)
            )
        );

    diagram.initialContentAlignment = go.Spot.Center;
    diagram.model =
        $(go.GraphLinksModel,
            {
                linkFromPortIdProperty: "fromPort",
                linkToPortIdProperty: "toPort",
                nodeDataArray: [   ],
                linkDataArray: [
                    // no predeclared links
                ]
            });

    diagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.Orthogonal,  
                curve: go.Link.JumpGap
            },
            $(go.Shape),
            $(go.Shape, {toArrow: "Standard"})
        );

    addTerminal = function () {
        var newnode = {key: "Terminal", loc: "250 150", from: true, toMaxLinks: 1, img: 'img/terminal.png'};
        diagram.model.addNodeData(newnode);
    };
    addElevator = function () {
        var newnode =  {key: "Elevator", loc: "350 350", to: true, fromMaxLinks: 1, img: 'img/elevator.png'}
        diagram.model.addNodeData(newnode);
    };
}
