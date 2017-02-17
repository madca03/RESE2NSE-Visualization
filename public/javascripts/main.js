"use strict"

/*************  Constants  *************/

const BASEURL = "http://localhost:3000";
// node visual properties
const NODERADIUS = 8;
const NODEFILL = "black";
// link visual properties
const LINKSTROKEOPACITY = '1';
const LINKSTROKEWIDTH = '2px';
const UPDATERATE = 1000;
const UPDATERATE2 = 2000;

/*************  Application starts here  *************/

var dummy;
var dummy2;

// http://stackoverflow.com/questions/544993/official-way-to-ask-jquery-wait-for-all-images-to-load-before-executing-somethin
/* wait for all images to load */
$(window).on("load", function() {
  var graph = new Graph();
  var ui = new UI();
  var dataFetcher = new DataFetcher();
  var slider = new Slider();
  var eventHandler = new EventHandler();
  var graphDrawer = new GraphDrawer();

  ui.init();
  slider.init(dataFetcher, graph, graphDrawer, displayGraphOption);
  graphDrawer.setDimensions(ui.svgWidth, ui.svgHeight);
  graphDrawer.initSVGStage();

  dataFetcher.setWidth(ui.svgWidth);
  dataFetcher.setHeight(ui.svgHeight);
  dataFetcher.setBaseSVGWidth(ui.baseSVGWidth);

  displayGraph();

  var display_timer = setInterval(function() {
    if (!dataFetcher.updateDisabled) {
      displayGraph();
    }
  }, UPDATERATE);

/*
  setTimeout(function() {
     displayGraph();
   }, 1000);
*/

  /* function is called when the browser is resized */
  // window.onresize = function() {
  //   ui.updateUIOnBrowserResize();
  //   dataFetcher.getDataForDisplay();
  //
  //   console.log("browser resize");
  //   clearInterval(display_timer);
  //
  //   display_timer = setInterval(function() {
  //     dataFetcher.getDataForDisplay();
  //   }, UPDATERATE);
  // }

  // $('#info-selector').change(function() {
  $('.graph-type').on('click', function() {
    var graph_type = $(this).data();
    var graph_type_name = graph_type.graphType.toLowerCase();
    var sensor_type_id = $(this).data().sensorId;

    $('span#graph-type-selected').removeAttr('id');
    if (graph_type_name !== "network") {
      $('span[data-graph-type="' + graph_type_name + '"][data-sensor-id="' + sensor_type_id + '"]').attr('id','graph-type-selected');
    } else {
      $('span[data-graph-type="' + graph_type_name + '"]').attr('id','graph-type-selected');
    }


    clearInterval(display_timer);
    // graphDrawer.graphDisplayed = false;

    if (slider.inArchive) {
      if (graph_type_name === "network") {
        dataFetcher.getArchiveDataForDisplay(
          slider.archiveId, function(data) {
            graphDrawer.setGraphType("Network");
            graphDrawer.setGraph(data);
            graphDrawer.drawGraphDisplay();
          });
      } else if (graph_type_name === "sensor") {
        dataFetcher.getSensorDataArchive(sensor_type_id,
          slider.archiveId, function(data) {
            graphDrawer.setGraphType("Sensor");
            graphDrawer.setNodes(data.nodes, data.nodes_length);
            graphDrawer.setSensorType(data.sensor)
            graphDrawer.updateGraphDisplayForSensorData();
          });
      }
    } else {
      if (graph_type_name !== "network") {
        displayGraphForSensorData(sensor_type_id);
        display_timer = setInterval(function() {
          if (!dataFetcher.updateDisabled) {
            displayGraphForSensorData(sensor_type_id);
          }
        }, UPDATERATE2);
      } else {
        displayGraph();
        display_timer = setInterval(function() {
          if (!dataFetcher.updateDisabled) {
            displayGraph();
          }
        }, UPDATERATE);
      }
    }
  });

  $('.range-menu').change(function() {
    var range;
    if ($(this).val() === "all") {
      range = $(this).val();
    } else {
      range = $(this).val().split("_");
    }

    if (graph.archiveDate.length !== 0) {
      var last_entry_id = graph.archiveDate[graph.archiveDate.length - 1].id;

      var request = $.ajax({
        url: BASEURL + "/datetime/" + range[0] + "/" + range[1]
          + "/" + last_entry_id,
        type: "GET",
        dataType: "json",
        context: this
      });

      request.done(function(_data, textStatus, jqXHR) {
        graph.archiveDate = _data.data;
        slider.adjustSliderHandlePosition($(this).val(), graph.archiveDate, dataFetcher, graphDrawer);
      });
    }
  });

  // add click event listener to edit graph button
  $('.edit-btn').on('click', function() {
    clearInterval(display_timer);
    eventHandler.editBtnClicked();
    displayGraphForEdit();

    // add event handler to cancel button
    $('.cancel-btn').on('click', function() {
      eventHandler.cancelBtnClicked();
    });

    // add event handler to save button
    $('.save-btn').on('click', function() {
      var updatedNodes = getUpdatedNodes();
      eventHandler.saveBtnClicked(updatedNodes);
    });
  });

  $('#pres-btn').on('click', function() {
    var max = $('.slider-range').slider('option','max');
    $('.slider-range').slider('option', 'value', max);
    slider.inArchive = false;
    dataFetcher.updateDisabled = false;
  });

  function displayGraphOption() {
    if (graphDrawer.graph_type !== "Network") {
      displayGraphForSensorData(graphDrawer.sensor_type.id);
      display_timer = setInterval(function() {
        if (!dataFetcher.updateDisabled) {
          displayGraphForSensorData(graphDrawer.sensor_type.id);
        }
      }, UPDATERATE2);
    } else {
      displayGraph();
      display_timer = setInterval(function() {
        if (!dataFetcher.updateDisabled) {
          displayGraph();
        }
      }, UPDATERATE);
    }
  }

  function displayGraphForSensorData(sensor_type) {
    dataFetcher.getSensorData(graph.archiveDate, sensor_type, function(data) {
      graphDrawer.setGraphType("Sensor");
      graphDrawer.setNodes(data.nodes, data.nodes_length);
      graphDrawer.setSensorType(data.sensor_type);
      graphDrawer.updateGraphDisplayForSensorData();

      slider.storeArchiveDate(graph.archiveDate, data.date_archive);
      slider.updateSliderRange(graph.archiveDate.length);
      slider.updateArchiveDate(graph.archiveDate);
    });
  }

  function displayGraph() {
    dataFetcher.getDataForDisplay(graph.archiveDate, function(data) {
      graphDrawer.setGraphType("Network");
      graphDrawer.setGraph(data.graph);
      graphDrawer.drawGraphDisplay();


      /* update the maximum value of the slider to the total archive count
        add the old archiveDate length to the number of new archiveDate
      */

      /* update the array of archive dates */
      // http://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
      slider.storeArchiveDate(graph.archiveDate, data.date_archive);
      slider.updateSliderRange(graph.archiveDate.length);
      slider.updateArchiveDate(graph.archiveDate);
    });
  }

  function displayGraphForEdit() {
    dataFetcher.getDataForEdit(function(data) {
      graphDrawer.setGraphType("Network");
      graphDrawer.setGraph(data.graph);
      graphDrawer.drawGraphForEdit();
    });
  }

  function getUpdatedNodes() {
    /* graphDataFetcher.graphDrawer property is of type SingleGraphDrawer
      When the edit button is clicked, the graphDrawer is set to draw
      a single graph for the floor selected. This graphDrawer object of type
      SingleGraphDrawer also contains the information about the nodes.
    */

    var nodes = graphDrawer.nodes;
    var modifiedNodes = [];

    /* The properties node.x and node.y come from the force layout of d3js.
      The "moved" property is set to true in the dragstart function of d3js
      if a node is dragged.
    */

    for (var i = 0; i < nodes.length; i++) {
      if (typeof(nodes[i].moved) !== 'undefined' && nodes[i].moved == true) {
        modifiedNodes.push({
          'id': nodes[i].id,
          'x_coordinate': nodes[i].x,
          'y_coordinate': nodes[i].y
        });
      }
    }

    return modifiedNodes;
  }
}); // end application block

/***********************  END  ***********************/
