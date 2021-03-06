const url = "data/samples.json"
let data;

// Load the data once from json file
d3.json(url).then(function(json) {
    console.log(json);
    data = json;
    // grab test ids to populate the dropdown
    var dropdownid = d3.select ('#selDataset');
    data.names.forEach(id => {
        dropdownid.append('option').text(id);
    });
    // optionChanged code goes here to populate first item that loads from data set
    optionChanged(d3.select('select').property('value'));
});

// Funtion to change the charts/graphs when new option is selected
function optionChanged(dropdownid) {
    console.log(dropdownid)
    // grab data for selected dropdown id from data variable using a filter that grabs the first item
    var currentSample = data.samples.filter(sample => sample.id == dropdownid)[0];
    var currentMetadata = data.metadata.filter(metadata => metadata.id == dropdownid)[0];
    // make sure we got the correct data from the filter
    console.log(currentSample);
    console.log(currentMetadata);
    // execute functions that populate the charts with new data
    demoTable(currentMetadata);
    drawBar(currentSample);
    drawBubble(currentSample);
    // drawGauge();
};

// Populate the demographic table
// TODO: Rewrite to append into an html table instead of static text elements
function demoTable(currentMetadata) {
    // point to html id where demo data will go
    var demoData = d3.select('#sample-metadata');
    // populate the div above with the currently selected metadata
    demoData
        .text(`ID: ${currentMetadata.id}`).append('div')
        .text(`Ethnicity: ${currentMetadata.ethnicity}`).append('div')
        .text(`Gender: ${currentMetadata.gender}`).append('div')
        .text(`Age: ${currentMetadata.age}`).append('div')
        .text(`Location: ${currentMetadata.location}`).append('div')
        .text(`BBType: ${currentMetadata.bbtype}`).append('div')
        .text(`WFreq: ${currentMetadata.wfreq}`).append('div')
};

// Draw horizontal bar chart using plotly
function drawBar(currentSample) {
    console.log(currentSample);
    // set up params required by plotly
    var trace = {
        // slice to get the first 10 values, reverse to get bar chart to swap lowest/highest
        x: currentSample.sample_values.slice(0,9).reverse(),
        y: currentSample.otu_ids.map(id => `OTU ${id}`).slice(0,9).reverse(),
        hovertext: currentSample.otu_labels.slice(0,9).reverse(),
        type: 'bar',
        orientation: 'h'
    };
    // draw the plot
    Plotly.newPlot('bar', [trace])
};

// Draw the bubble chart
function drawBubble(currentSample) {
    var trace = {
        x: currentSample.otu_ids,
        y: currentSample.sample_values,
        text: currentSample.otu_labels,
        mode: 'markers',
        marker: {
            size: currentSample.sample_values,
            color: currentSample.otu_ids
        }
    };
    Plotly.newPlot('bubble', [trace])
};

// Draw gauge chart -- IN PROGRESS
function drawGauge(currentMetadata) {
    console.log(currentMetadata['wfreq']);
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}

  // When browser loads, optionChanged() is called 
  optionChanged();
  
  // When browser window is resized, optionChanged() is called
  d3.select(window).on("resize", optionChanged);