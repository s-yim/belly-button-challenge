// Create charts
function buildCharts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let resultsArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
        let result = resultsArray[0];

        let sampleValues = result.sample_values;
        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;

        // Create horizontal bar chart
        let yticks = otuIDs.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                x: sampleValues.slice(0,10).reverse(),
                y: yticks,
                text: otuLabels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        let barLayout = {
            title: "Top 10 Microbial Species (OTUs) Found",
            xaxis: {title: "# of Samples"},
            yaxis: {title: "OTU ID"},
            margin: {t: 25, l: 150}
        }

        Plotly.newPlot("bar", barData, barLayout);

        // Create bubble chart
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]

        let bubbleLayout = {
            title: "Microbial Species Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "# of Samples"},
            margin: {t: 30}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}

// Display sample metadata
function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);
        let result = resultArray[0];
        let PANEL = d3.select("#sample-metadata");
        PANEL.html("");
     
        for(key in result){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        }
     
        //BONUS
        buildGauge(result.wfreq);
     
    })
}

// Use D3 library to read in json file from url
function init(){
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let sampleNames = data.names;
        
        for(let i = 0; i < sampleNames.length; i++){
            selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
        }

        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    })
}

function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();