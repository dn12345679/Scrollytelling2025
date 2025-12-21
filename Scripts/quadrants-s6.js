let data; 
async function getData() {
    const d = await fetch("./Data/wf.json").then(r => r.json());
    data = d;
    return d;
}

await getData() // safety

// future ref: columns: Entity: String, Year: number, area_ha: number, co2: number(float)


// idea: plot x = area_ha (loss) vs y = co2 (emission)
// divide by 1,000,000 (there should be at most 5 ticks on x excluding 0, from 10 to 50), and 5 ticks on y excluding 0 from 200 to 1000

function quadrantsPlotly() {
    let x = [];
    let y = []; 
    let names = [];

    const divide = 1000000
    
    // congregate
    for (let i = 0; i < data.length; i++) {
        if (data[i].area_ha !== 0 && data[i].co2 !== 0) {
            x.push(data[i].area_ha/divide);
            y.push(data[i].co2/divide);
            names.push(data[i].Entity);
        }

    }

    const medianX = x.slice().sort((a, b) => a-b)[Math.floor(x.length / 2)];
    const medianY = y.slice().sort((a, b) => a-b)[Math.floor(y.length / 2)];

    console.log(medianX)
    console.log(medianY)

    const pts = [{
        type: 'scatter',
        mode: 'markers',
        x: x,
        y: y,
        text: names,
        marker: {size: 10},
        hovertemplate: '<b>%{text}</b><br>' + 
                       'Burned Area (mil. ha): %{x:.2f}<br>' + 
                       'CO2 Emissions (mil. tons): %{y:.2f}<br>' +
                       '<extra></extra>',
    }]

    const layout = {
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      autosize: true, 
      width: window.innerWidth * 0.48,
      height: window.innerWidth * 0.48,
      title: {
        text: "Burned Area total vs Carbon Emissions (2024)",
        font: {size: 30}
      },
      xaxis: {
        title: {
          text: "Burned Area (millions tons ha)",
          font: {size: 26, color: "#000000ff"}
        },
        tickfont: {
          size: 14
        },

      },
      yaxis: {
        title: {
          text: "Total Carbon Dioxide emission (millions tons Co2)",
          font: {size: 26, color: "#000000ff"}
        },
        tickfont: {
          size: 14
        },
      },

    }
    var config = {
      responsive: true , 
      displayModeBar: false,
      scrollZoom: false, 
    }
    Plotly.newPlot('scene6-static', pts, layout, config);
}
quadrantsPlotly();

function quadrantManual() {
    var pointfrag = document.createDocumentFragment();
    const divide = 1000000

    for (let i = 0; i < data.length - 1; i++) {
            const current = data[i];
            
            const x = current.area_ha/divide 
            const y = current.co2/divide

            let point = document.createElement('div');
            point.className = 's-point';
            point.style.cssText = `
                left: ${x}px;
                bottom: ${y}px;
                background: black;
            `;
            pointfrag.appendChild(point);
        }


    document.querySelector(".quadrants-s6").appendChild(pointfrag);
}
