/***************  GraphDrawer Class  ***********/

function GraphDrawer() {
  this.nodes = [];
  this.links = [];
  this.svgStage = null;
  // this.width = ui.svgWidth;
  // this.height = ui.svgHeight;
  this.linkSelection = null;
  this.nodeSelection = null;
  this.force = null;
  this.forEdit = false;
  this.baseGraphContainerWidth = 866;
  // this.baseGraphContainerHeight = ui.svgHeight;

  this.graphDisplayed = false;
  this.updateDisabled = false;
}

/**
 * GraphDrawer.prototype.drawGraphDisplay
 * GraphDrawer.prototype.setGraph
 * GraphDrawer.prototype.createTooltip
 */

GraphDrawer.prototype.setGraph = function(graph) {
  this.nodes = graph.nodes;
  this.links = graph.links;
};

GraphDrawer.prototype.setNodes = function(nodes, nodes_length) {
  this.nodes = nodes;
  this.nodes_length = nodes_length;
};

GraphDrawer.prototype.setSensorData = function(sensor_data) {
  this.sensor_data = sensor_data;
};

GraphDrawer.prototype.setSensorType = function(sensor_type) {
  this.sensor_type = sensor_type;
};

GraphDrawer.prototype.setGraphType = function(graph_type) {
  this.graph_type = graph_type;
};

GraphDrawer.prototype.setDimensions = function(width, height) {
  this.svgWidth = width;
  this.svgHeight = height;
};

GraphDrawer.prototype.setWidth = function(width) {
  this.width = width;
};

GraphDrawer.prototype.setHeight = function(height) {
  this.height = height;
  this.baseGraphContainerHeight = height;
};

GraphDrawer.prototype.createArrowHead = function() {
  // build the arrow.
  if (this.svgStage.select("defs")[0][0] === null) {
    this.svgStage.append("defs")
      .append("marker")
        .attr("id", "end")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 13)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .attr("orient", "auto")
        .attr("markerUnits", "userSpaceOnUse")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");
  }
}

GraphDrawer.prototype.drawGraphDisplay = function() {
  // initial graph display
  this.createArrowHead();
  this.getLinkSelection();
  this.getNodeSelection();

  // // this.scaleNodePosition();
  this.createSVGLinks();
  this.createSVGNodes();
}

GraphDrawer.prototype.scaleNodePosition = function() {
  var currentSVGWidth = this.width;
  var currentSVGHeight = this.height;
  var baseGraphContainerWidth = this.baseGraphContainerWidth;
  var baseGraphContainerHeight = this.baseGraphContainerHeight;

  // change cx and cy attribute of the circle for the window resize event
  this.nodeSelection.selectAll('circle')
    .attr('cx', function(d) {
      var scaledX = (currentSVGWidth * d.x_coordinate) / baseGraphContainerWidth;
      return scaledX;
    })
    .attr('cy', function(d) {
      var scaledY = (currentSVGHeight * d.y_coordinate) / baseGraphContainerHeight;
      return scaledY;
    });

  // change the x and y attribute of the node label (svg text) for the window resize event
  this.nodeSelection.selectAll('text')
    .attr("x", function(d) {
      var scaledX = (currentSVGWidth * d.x_coordinate) / baseGraphContainerWidth;
      return scaledX;
    })
    .attr("y", function(d) {
      var scaledY = (currentSVGHeight * d.y_coordinate) / baseGraphContainerHeight;
      return scaledY;
    });
}


GraphDrawer.prototype.drawGraphForEdit = function() {
  this.forEdit = true;
  this.initSVGStage();
  this.initForceLayout();
  this.getNodeSelection();
  this.createSVGNodesForEdit();
  this.addNodeDragBehavior();
}

/**
  * This method creates an SVG stage for the graph display and it appends the
  * created SVG stage as a child to the div.graph-container element. The height
  * and width of the svg stage is set based on the width and height of the
  * image.
  */

GraphDrawer.prototype.initSVGStage = function() {
  this.svgStage = d3.select('.graph-container').append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight);

  // add svg group elements for the links and nodes
  this.svgStage.append("g").attr("class", "links-group");
  this.svgStage.append("g").attr("class", "nodes-group");
}

/**
  * This method starts the force layout algorithm provided by the D3js library.
  * The force layout algorithm will be used for implementing drag and drop
  * features and for smooth transition of nodes from one place to another.
  *
  * Example use of D3js force layout can be found here:
  * https://bl.ocks.org/mbostock/4062045
  */

GraphDrawer.prototype.initForceLayout = function() {
  this.force = d3.layout.force()
    .nodes(this.nodes)
    .size([this.svgWidth, this.svgHeight])
    .start();
}

/**
  * This method creates a data-binding between the nodes' data and the
  * svg g.node elements.
  */
GraphDrawer.prototype.getNodeSelection = function() {
  this.nodeSelection = this.svgStage.select("g.nodes-group")
    .selectAll("g.node")
    .data(this.nodes);
}

GraphDrawer.prototype.createSVGNodesForEdit = function() {
  this.nodeSelection.enter().append("g")
    .attr("class", "node");

  this.createNodeCircle();
  this.createNodeLabel();
}

// add a svg:circle element inside a node group
GraphDrawer.prototype.createNodeCircle = function() {
  var graphForEdit = this.forEdit;
  var nodeCircle = this.nodeSelection.append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) {
      if (graphForEdit) {
        return "0px";
      } else {
        return d.scaledX;
      }
    })
    .attr("cy", function(d) {
      if (graphForEdit) {
        return "0px";
      } else {
        return d.scaledY;
      }
    })
    .attr("r", NODERADIUS);

  this.setStylesToCircle(nodeCircle);
  this.setNodeColor(nodeCircle);

  if (!this.forEdit) {
    this.addClickEventToCircle(nodeCircle);
  }
}

GraphDrawer.prototype.setNodeColor = function(nodeCircle) {
  if (this.graph_type === "Network") {
    this.setNodeColorForNetwork(nodeCircle);
  } else if (this.graph_type === "Sensor") {
    this.setNodeColorForSensorData(nodeCircle);
  }
};

GraphDrawer.prototype.updateGraphDisplay = function() {
  // This block is for normal graph update
  this.getSVGStage();
  this.removeSVGLinks();
  this.removeSVGNodes();

  this.getNodeSelection();
  this.getLinkSelection();

  // this.scaleNodePosition();
  this.createSVGLinks();
  this.createSVGNodes();

  // // if (this.updateJustEnabled) {
  //   this.removeSVGNodes();
  //   this.getNodeSelection();
  //   this.createSVGNodes();
  // // }
}

// GraphDrawer.prototype.removeExcessTooltip = function() {
//   $('.qtip').each(function(index) {
//     if ($(this).attr("cla"))
//   });
// };

GraphDrawer.prototype.updateArchiveGraphDisplay = function() {
  // This block is for updating the graph display for archive graph dataset
  this.getSVGStage();
  this.removeSVGLinks();
  this.removeSVGNodes();

  this.getNodeSelection();
  this.getLinkSelection();

  // this.scaleNodePosition();
  this.createSVGLinks();
  this.createSVGNodes();
}

GraphDrawer.prototype.drawGraphDisplayForSensorData = function() {
  this.getSVGStage();
  this.removeSVGLinks();
  this.removeSVGNodes();
  this.getNodeSelection();
  this.createSVGNodes();
}

GraphDrawer.prototype.updateGraphDisplayForSensorData = function() {
  this.getSVGStage();
  this.removeSVGNodes();
  this.getNodeSelection();
  this.createSVGNodes();
}

GraphDrawer.prototype.removeSVGLinks = function() {
  $(".graph-container svg g.links-group").empty();
}

GraphDrawer.prototype.removeSVGNodes = function() {
  $('.graph-container svg g.nodes-group').empty();
}

GraphDrawer.prototype.getNodeDragBehavior = function() {
  var force = this.force;
  var tick = this.getTick();

  var nodes = this.nodes;

  var nodeDrag = d3.behavior.drag()
    .on("dragstart", dragstart)
    .on("drag", dragmove)
    .on("dragend", dragend);

  /* arguments: d = node object,
        i = index of the node object from the node array defined in the graph object
    return: This function stops the force-layout algorithm of d3js when
      a node is being dragged so that the force-layout will not affect the
      placing of the node to its new position.
  */
  function dragstart(d, i) {
    force.stop(); // stops the force auto positioning before you start dragging

    /* set the "moved" property of the node object to true when a node is dragged
     this will be used as the condition whether the node should be sent back
     to the server for database update.
    */
    d.moved = true;
  }

  /* arguments: d = node object,
        i = index of the node object from the node array defined in the graph object
    return: This function saves the new coordinate of the node to px,py,x,y
      properties of the node object. After that, the tick function is called
      to make visual changes to the position of the node and other svg elements
      related to it.
  */
  function dragmove(d, i) {
    d.px += d3.event.dx;
    d.py += d3.event.dy;
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    tick(); // this is the key to make it work together with updating both px,py,x,y on d !
  }

  /*  arguments: d = node object,
        i = index of the node object from the node array defined in the graph object
      return: After dragging a node, the node's "fixed" property will be set to true.
        This will prevent the force-layout algorithm of d3js to make changes to
        this node when other nodes are dragged.
  */
  function dragend(d, i) {
    d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
    tick();
    force.resume();
  }

  return nodeDrag;
}

GraphDrawer.prototype.getTick = function() {
  var node = this.nodeSelection;

  /* This function is called whenever a node is drag to a new position.
    Return: Moves the node and other svg elements related to it to a new position.
      It also calculates the new curvature for the link between nodes.
  */
  var tick = function() {
    node.select('circle.circle')
      .attr('transform', function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

    node.select("text.nodetext")
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
  }

  return tick;
}

GraphDrawer.prototype.addNodeDragBehavior = function() {
  this.nodeSelection.call(this.getNodeDragBehavior());
  this.force.on("tick", this.getTick());
}

GraphDrawer.prototype.getSVGStage = function() {
  this.svgStage = d3.select('.graph-container').select('svg');
}

GraphDrawer.prototype.getLinkSelection = function() {
  this.linkSelection = this.svgStage.select("g.links-group")
    .selectAll("path.link")
    .data(this.links);
}

/**
 * This method SVG nodes from the previous graph dataset.
 */
GraphDrawer.prototype.removeOldSVGNodes = function() {
  this.nodeSelection = this.svgStage.select("g.nodes-group")
    .selectAll("g.node")
    .data([]);
   this.nodeSelection.exit().remove();
}

GraphDrawer.prototype.createSVGLinks = function() {
  this.createArrowHead();

  // "Enter" sub-selection
  this.linkSelection.enter()
    .append("path")
    .attr("class", "link")
    .attr("marker-end", "url(#end)"); // add the marker

  this.computeLinkCurvature();
  this.setStylesToLinks();
}

GraphDrawer.prototype.removeOldSVGLinks = function() {
  this.linkSelection = this.svgStage.select("g.links-group")
    .selectAll("path.link").data([]);
  this.linkSelection.exit().remove();
}

/**
 * This method updates the link selection by binding the new link data
 * to the SVG links.path.
 */
GraphDrawer.prototype.updateSVGLinkSelection = function() {
  this.linkSelection = this.linkSelection.data(this.links);
}

/**
 * This method updates the node selection by binding the new node data
 * to the SVG g.nodes
 */
GraphDrawer.prototype.updateSVGNodeSelection = function() {
  this.nodeSelection = this.nodeSelection.data(this.nodes);
}

GraphDrawer.prototype.computeLinkCurvature = function() {
  var thisObj = this;

  // The "d" attribute of the SVG path element specifies the type of path
  // that links the two nodes. In this case, the type of path is an arc
  this.linkSelection.attr("d", function(d) {
    var d1 = {
      x: d.source.scaledX,
      y: d.source.scaledY
    };

    var d2 = {
      x: d.target.scaledX,
      y: d.target.scaledY
    };

    // get the x and y differentials
    var dx = (d2.x - d1.x);
    var dy = (d2.y - d1.y);

    // compute for the distance between the two points
    var dr = Math.sqrt(dx * dx + dy * dy);

    // get the midpoint of the two points
    var midx = (d2.x + d1.x) / 2.0;
    var midy = (d2.y + d1.y) / 2.0;

    var conC = ((d1.x*d1.x) + (d1.y*d1.y) - (d2.x*d2.x) - (d2.y*d2.y)) / (2*(d2.y-d1.y));
    var conD = (d2.x-d1.x) / (d2.y-d1.y);

    // 40% of midpoint distance
    var linkRadius = 0.4 * dr / 2;

    var a = (1 + (conD*conD));
    var b = (2*conC*conD - 2*midx + 2*conD*midy);
    var c = ((midx*midx) + (conC*conC) + (2*conC*midy) + (midy*midy) - (linkRadius*linkRadius));

    var discriminant = (b*b) - (4*a*c);

    var px1 = (-b + Math.sqrt(discriminant)) / (2*a);
    var px2 = (-b - Math.sqrt(discriminant)) / (2*a);

    // difference between node point (source node) and px1 (px2)
    var dpx1 = Math.abs(px1 - d1.x);
    var dpx2 = Math.abs(px2 - d1.x);

    // (px,py) is the coordinate of the control point
    // for the quadratic bezier curve
    var px = 0;

    if (dpx1 > dpx2) {
      // link is concave left or concave down
      px = px2;
    } else {
      // link is concave right or concave up
      px = px1;
    }

    var py = (-1)*conC - (conD*px);

    // if the midpoint is near the top side of the svg stage
    if ((midy - linkRadius) < 0) {
      py = 0;
    }
    // if the midpoint is near the bottom side of the svg stage
    else if ((midy + linkRadius) > thisObj.svgHeight) {
      py = thisObj.svgHeight;
    }

    // if the midpoint is near the left side of the svg stage
    if ((midx - linkRadius) < 0)  {
        px = 0;
    }
    // if the midpoint is near the right side of the svg stage
    else if ((midx + linkRadius) > thisObj.svgWidth) {
      px = thisObj.svgWidth;
    }

    // return a quadratic bezier curve
    return "M " + d1.x + "," + d1.y
      + " Q " + px + "," + py
      + " " + d2.x + "," + d2.y;
  });
}

GraphDrawer.prototype.setStylesToLinks = function() {
  this.setLinkStroke();
  this.setLinkStrokeWidth();
  this.linkSelection.attr('stroke-opacity', LINKSTROKEOPACITY);
  this.linkSelection.attr('fill', 'none');
}

GraphDrawer.prototype.setLinkStroke = function() {
  this.linkSelection.attr('stroke', function(d) {
      switch (d.status) {
        case 'heavy':
          return '#FF0000';
          break;
        case 'moderate':
          return '#0000CD';
          break;
        case 'light':
          return '#008000';
          break;
      }
    });
}

GraphDrawer.prototype.setLinkStrokeWidth = function()  {
  this.linkSelection.attr('stroke-width', function(d) {
    switch (d.status) {
      case 'heavy':
        return '6px';
        break;
      case 'moderate':
        return '3px';
        break;
      case 'light':
        return '1px';
        break;
    }
  });
}

GraphDrawer.prototype.createSVGNodes = function() {
  this.nodeSelection.enter()
    .append("g")
    .attr("class", "node");

  this.createNodeCircle();
  this.createNodeLabel();
  this.createTooltip();
}

GraphDrawer.prototype.addClickEventToCircle = function(nodeCircle) {
  var thisObj = this;


  nodeCircle.on("click", function() {
    var nodeID = this.__data__.id;

    var request = $.ajax({
      url: BASEURL + '/nodes/' + nodeID,
      type: 'GET',
      dataType: 'json',
      context: this
    });

    request.done(function(_data, textStatus, jqXHR) {
      console.log("hello");
      var url = BASEURL + '/node_display?'
      var node = _data.data;
      var node_properties = Object.keys(node);

      for (var i = 0; i < node_properties.length; i++) {
          var property = node_properties[i];

          if (node.hasOwnProperty(property)) {
            url += (property + '=' + node[property]);
          }

          if (i != node_properties.length - 1) url += '&';
        }

      window.open(url, "_blank");
    });


  });
  nodeCircle.attr("cursor", "pointer");
}

GraphDrawer.prototype.setStylesToCircle = function(nodeCircle) {
  nodeCircle.attr("stroke", "black")
    .attr("stroke-width", "2px");
}

GraphDrawer.prototype.setNodeColorForSensorData = function(nodeCircle) {
  var sensor_type = this.sensor_type;
  var colorLight = null;
  var colorDark = null;

  switch (sensor_type) {
    case '1': // Humidity
      colorLight = "#d5f5ff";
      colorDark = "#020f9e";
      break;
    case '2': // Temperature
      colorLight = "#ffd1cc";
      colorDark = "#b50006";
      break;
    case '3': // Light
      colorLight = "#edd1f5";
      colorDark = "#710173";
      break;
    case '4': // Pressure
      colorLight = "#f7f3d2";
      colorDark = "#dbcc00";
      break;
  }

  var color = d3.scale.linear().domain([1, this.nodes_length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb(colorLight), d3.rgb(colorDark)]);

  var i = 0;
  /* iterate over all SVG node circles */
  nodeCircle.each(function(d) {
    var circle = d3.select(this);

    circle.attr("fill", function(d) {
      return color(i);
    });

    i++;
  });
  // nodeCircle.attr("fill", function(d) {
  //   // return color(i);
  //   i++;
  //   console.log(i);
  // });
}

GraphDrawer.prototype.setNodeColorForNetwork = function(nodeCircle) {
  nodeCircle.attr("fill", function(d) {
    return '#1ce605';
  });
}

// add a svg:text element inside a node group
// and set the x and y attributes of the svg:text element
// similar to the node's svg:circle element's x and y attributes
GraphDrawer.prototype.createNodeLabel = function() {
  this.nodeSelection.append("text")
    .attr("class", "nodetext")
    .attr("x", function(d) { return d.scaledX; })
    .attr("y", function(d) { return d.scaledY; })
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.label; });
}

GraphDrawer.prototype.createTooltip = function() {
  var thisObj = this;

  /* Add tooltip functionality to each circle SVG DOM element
    having a class name 'circle'
  */
  $('circle.circle').qtip({
    /* "this" currently points to a single circle SVG DOM element */
    style: {
      classes: 'custom-tooltip'  /* add user-defined classes to the tooltip */
    },
    content: {
      /* $(this).prop("__data__") returns an object
        containing the node's properties
      */
      title: function(event, api) {
        return $(this).prop("__data__").label;
      },
      text: function(event, api) {
        var contents = thisObj.tooltipContents($(this).prop("__data__"));
        return contents;
      }
    },
    hide: {
      fixed: true
    }
  });
}

GraphDrawer.prototype.tooltipContents = function(node_data) {
  var html = ""
    + "<div class='tooltip-row'>Mac Address: " + node_data.mac_address + "</div>"
    + "<div class='tooltip-row'>Last Transmission: " + node_data.last_transmission + "</div>"
    + "<div class='tooltip-row'>Packets Sent: " + node_data.packets_sent + "</div>"
    + "<div class='tooltip-row'>Packets Received: " + node_data.packets_received + "</div>";
  return html;
}

/*************  END GraphDrawer Class  *********/
