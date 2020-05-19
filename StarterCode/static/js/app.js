// Function for updating metadata
function update(data) {

  demoInfo = d3.select("#sample-metadata");

  demoInfo.html("");

  var selection = d3.select("#sample-metadata").selectAll("ul")
      .data(data);

  selection.enter()
      .append("li")
      .merge(selection)
      .text(function(d) {
      return d
      });

selection.exit().remove();
}

// Filter for selection
function filteredIds(obj) {
  return parseInt(obj.id) == idSelect;
  console.log(idSelect);
};

// This is the event handler for changing id names.
dropdown = d3.select("#selDataset");

// Default value for id name
var idSelect = 940;

dropdown.on("change", function() {
  console.log("This thing was changed!");
  idSelect = d3.event.target.value;
  console.log(idSelect);
});

// Create async function for reading json
(async function(){
  var data = await d3.json("./data/samples.json").catch(function(error) {
    console.log(error);
  });

// Log data
console.log(`Somehow logging...`);
console.log(data);
metadata = data.metadata;
console.log(data.metadata);

// Assign the data names to variable for the select element
names = data.names;

// Append select element with name data
var options = d3.select("select")
  .selectAll("option")
  .data(names)
  .enter()
  .append("option");

options.text(function(d) {
  return d
  })
      .attr("value", function(d) {
  return d;
  });

sampleData = data.samples;
console.log(sampleData);

// Filtering objects based on init
filteredSample = sampleData.filter(filteredIds);
filteredMetaData = metadata.filter(filteredIds);

// This sorting works!
sortedSample = filteredSample.sort((a, b) => (b.sample_values - a.sample_values));

slicedSampleValues = sortedSample[0].sample_values.slice(0,10);
slicedIds = sortedSample[0].otu_ids.slice(0,10);
slicedLabels = sortedSample[0].otu_labels.slice(0,10);

function init() {
// Initial metadata
var filteredMetaData = metadata.filter(filteredIds);

// Assign empty arr for readOut
var readOut = []

// Create string elementd for new array
Object.entries(filteredMetaData[0]).forEach(([key, value]) => {
    readOut.push(`${key}: ${value}`);
   });

// Update the metadata list
update(readOut);

// The initial bar chart
var trace1 = {
  x: slicedSampleValues,
  y: slicedIds.map(d => `OTU ${d}`),
  text: slicedLabels,
  type: "bar",
  orientation: 'h',
  transforms: [{
    type: 'sort',
    target: 'y',
    order: 'descending'
  }]
};

var plotData = [trace1];

var layout = {
  title: `Name: ${idSelect}`,
  yaxis: {
    automargin: true
  }
};

Plotly.newPlot("bar", plotData, layout);

// The initial bubble chart
var bubbleTrace = {
  x: slicedIds,
  y: slicedSampleValues,
  text: slicedLabels,
  mode: 'markers',
marker: {
    color: slicedIds,
    size: slicedSampleValues
  }
};

var bubbleData = [bubbleTrace];

var layout = {
  title: `Name: ${idSelect}`,
  showlegend: false,
  yaxis: {
    automargin: true
  }
};

Plotly.newPlot('bubble', bubbleData, layout);
}



// On change to the DOM, call optionChanged()
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  // Function called by DOM changes
  dropdown = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  idSelect = dropdown.property("value");
  console.log(idSelect);
  // Assign filtered object
  filteredSample = sampleData.filter(filteredIds);
  console.log(filteredSample);
  // Sort the filtered sample and assign
  sortedSample = filteredSample.sort((a, b) => (b.sample_values - a.sample_values));

  // Assign new values to slices
  slicedSampleValues = sortedSample[0].sample_values.slice(0,10);
  slicedIds = sortedSample[0].otu_ids.slice(0,10);
  slicedLabels = sortedSample[0].otu_labels.slice(0,10);

  // Event change for metadata
  var filteredMetaData = metadata.filter(filteredIds);

  // Assign empty arr for readOut
  var readOut = []

  // Create string elementd for new array
  Object.entries(filteredMetaData[0]).forEach(([key, value]) => {
      readOut.push(`${key}: ${value}`);
    });

  // Update the metadata list
  update(readOut);

  // Event change data for bar graph
  var trace = {
        x: slicedSampleValues,
        y: slicedIds.map(d => `OTU ${d}`),
        text: slicedLabels,
        type: "bar",
        orientation: 'h',
        transforms: [{
          type: 'sort',
          target: 'y',
          order: 'descending'
        }]
  };

  var plotData = [trace];

  var layout = {
    title: `Name: ${idSelect}`,
    yaxis: {
      automargin: true
    }
  };

  console.log(plotData);
  Plotly.newPlot("bar", plotData, layout);
  
  // Event change data for bubble chart
  var bubbleTrace = {
    x: slicedIds,
    y: slicedSampleValues,
    text: slicedLabels,
    mode: 'markers',
  marker: {
      color: slicedIds,
      size: slicedSampleValues
    }
  };

  var bubbleData = [bubbleTrace];

  var layout = {
    title: `Name: ${idSelect}`,
    showlegend: false,
    yaxis: {
      automargin: true
    },
  };

  Plotly.newPlot('bubble', bubbleData, layout);
}

init();
})();