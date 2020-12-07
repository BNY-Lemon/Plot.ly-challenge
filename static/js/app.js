const url = "../data/samples.json"
let data;
// load the data once from json file
d3.json(url).then(function(json) {
    console.log(json);
    data = json;
    // grab test ids to populate the dropdown
    var dropdownid = d3.select ('#selDataset');
    data.names.forEach(id => {
        dropdownid.append('option').text(id);
    });
    // optionChanged code goes here

});
// write funtion to change the charts/graphs when new option is selected
function optionChanged(dropdownid) {
    console.log(dropdownid)
    // grab data for selected dropdown id from data variable using a filter that grabs the first item
    var currentSample = data.samples.filter(sample => sample.id == dropdownid)[0];
    var currentMetadata = data.metadata.filter(metadata => metadata.id == dropdownid)[0];
    // make sure we got the correct data from the filter
    console.log(currentSample);
    console.log(currentMetadata);
    // execute functions that populate the charts with new data
}