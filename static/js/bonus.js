function buildGauge(wfreq){
    let level = parseFloat(wfreq) * 20;
    let degrees = 180 - level;
    let radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);
    console.log("x:", x, "y:", y);
  
    let mainPath = "M-.0 -0.05 L .0 0.05 L";
    let pathX = String(x);
    let space = " ";
    let pathY = String(y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);
    console.log(path);
  
    let data = [
        {
          type: "pie",  
          values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          textinfo: "text",
          textposition: "inside",
          marker: {
                colors: [
                  "rgba(255, 95, 95, 0.5)",
                  "rgba(255, 115, 115, 0.5)",
                  "rgba(255, 135, 135, 0.5)",
                  "rgba(255, 155, 155, 0.5)",
                  "rgba(255, 175, 175, 0.5)",
                  "rgba(255, 195, 195, 0.5)",
                  "rgba(255, 215, 215, 0.5)",
                  "rgba(255, 235, 235, 0.5)",
                  "rgba(255, 255, 255, 0.5)",               
                  "rgba(255, 255, 255, .5)"
                ]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            showlegend: false      
        },
        {
          type: "scatter",
          x: [0],
          y: [0],
          marker: {size: 11, color: "#0000FF"},
          showlegend: false,
          name: "Frequency",
          text: level,
          hoverinfo: "text+name"
        }
    ]
 
    let layout = {
      shapes: [
          {
              type: "path",
              path: path,
              fillcolor: "pink",
              line: {color: "pink"}
          }
      ],
      title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
      height: 550,
      width: 550,
      xaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1],
      },
      yaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1],
      }
    }
 
    let gaugeElement = document.getElementById("gauge");
    Plotly.newPlot(gaugeElement, data, layout);
}