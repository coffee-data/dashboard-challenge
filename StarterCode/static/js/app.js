// Create unpack function
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// This filter works!
function filteredIds(obj) {
  return parseInt(obj.id) === idSelect;
};

// This is the event handler for changing id names.
nameSelect = d3.select("#selDataset");

// Default value for id name
var idSelect = 940;

nameSelect.on("change", function() {
  console.log("This thing was changed!");
  idSelect = d3.event.target.value;
  console.log(idSelect);
});

// // Try this for selection
// function filteredIds(obj, sel) {
//   return parseInt(obj.id) === sel;
// };

// Create async function for reading json
(async function(){
  var data = await d3.json("./data/samples.json").catch(function(error) {
    console.log(error);
  });

// Log data
console.log(data);

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

// Test sorting
filteredSample = sampleData.filter(filteredIds);

// This sorting works!
sortedSample = filteredSample.sort((a, b) => (b.sample_values - a.sample_values));

slicedSampleValues = sortedSample[0].sample_values.slice(0,10);
slicedIds = sortedSample[0].otu_ids.slice(0,10);
slicedLabels = sortedSample[0].otu_labels.slice(0,10);

// Graph the default selection
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
  title: "'Bar' Chart",
  yaxis: {
    automargin: true
  }
};

Plotly.newPlot("plot", plotData, layout);



})()

// sampleData.forEach(function(d) {
//   console.log(d.sample_values);
//   console.log(d.otu_ids);
//   console.log(d.otu_labels);
// })

// Map Sample Values
// sampleValues = sampleData.map(function(d) {
//   return d.sample_values;
// });

// // Map OTU Ids
// sampleIds = sampleData.map(function(d) {
//   return d.otu_ids;
// });

// // Map OTU Labels
// sampleLabels = sampleData.map(function(d) {
//   return d.otu_labels;
// });









// // Create async function for reading json
// (async function(){
//     var bellyData = await d3.json("./data/samples.json").catch(function(error) {
//       console.log(error);
//     });
//     console.log(bellyData);
   
//     sampleValues = bellyData.samples.map(function(d) {
//       return d.sample_values;
//     });
//     console.log(sampleValues);

//     labels = bellyData.samples.map(function(d) {
//       return d.otu_ids;
//     });

//     hoverText = bellyData.samples.map(function(d) {
//       return d.otu_labels;
//     });

//     var trace1 = {
//       x: labels,
//       y: sampleValues,
//       type: "bar"
//     };

//     var barData = [trace1];

//     var layout = {
//       title: "'Bar' Chart"
//     };

//     Plotly.newPlot("plot", barData, layout);

//   })()




  // var metadata = bellyData.metadata;
  // console.log(`Metadata`);
  // console.log(bellyData.metadata);

  // var names = bellyData.names;
  // console.log(`Data Names`);
  // console.log(bellyData.names);

  // var sampleLook = bellyData.sample;
  // console.log(`Samples`);
  // console.log(bellyData.sample);

  // // var sampleValues = bellyData.samples.forEach(function(data) {
  // //   console.log(data.sample_values);
  // // })

  // var sampleValues = bellyData.samples.map(d => d.sample_values);
  // console.log(sampleValues);

  // // var sampleIds = bellyData.samples.forEach(function(data) {
  // //   console.log(data.otu_ids);
  // // })