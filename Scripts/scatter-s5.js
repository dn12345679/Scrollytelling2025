
let data_lpi; 
async function getData() {
    const d = await fetch("./Data/LPI_JSON.json").then(r => r.json());
    data_lpi = d;
    return d;
}
await getData() // safety


function scatterLPI() {
    var lpi_final = []
    var countries = [];
    for (var i = 0; i < data_lpi.length; i++) {
        lpi_final.push(data_lpi[i].lpi_final);
        countries.push(data_lpi[i].Entity);
    }
    let years = Array.from({length: 6}, (e, i)=> 1970 + i * 10)
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#46ca51ff', '#d6bc25ff'];
    // auto create 7 traces with similar properties
    let regions = 7 ;
    let entriesPerRegion = 6;
    var traces = Array.from({length: regions}, (_, index) => ({
        x: years, 
        y: lpi_final.slice(index * entriesPerRegion, (index +1) * entriesPerRegion),
        name: countries[entriesPerRegion*index]
      }));
  
    var layout = {
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      autosize: true, 
      title: {
        text: "Living Planet Index by Region, 1970 - 2020",
        font: {size: 30}
      },
      xaxis: {
        title: {
          text: "Year",
          font: {size: 26, color: "#000000ff"}
        },
        tickfont: {
          size: 14
        },

      },
      yaxis: {
        title: {
          text: "Living Planet Index (LPI)",
          font: {size: 26, color: "#000000ff"}
        },
        tickfont: {
          size: 14
        },
      },
      legend: {
        font: {size: 16},
        title: {
          text: "Regions",
          font: {size: 25}
        },
        
      }

    }

    var config = {
      responsive: true , 
      displayModeBar: false,
      scrollZoom: false, 
    }

    Plotly.newPlot('scatter-s5', traces, layout, config);
}

scatterLPI();

function customScatter() {
  const groupedByEntity = {};
  data_lpi.forEach(entry => {
      if (!groupedByEntity[entry.Entity]) {
          groupedByEntity[entry.Entity] = [];
      }
      groupedByEntity[entry.Entity].push(entry);
  });

  Object.keys(groupedByEntity).forEach(entity => {
      groupedByEntity[entity].sort((a, b) => a.Year - b.Year);
  });
    const colors = ["#E7ECCE", "#E6C189", "#89e6d8", "#eb597b", "#4bd173", "#738539", "#a33a31"];
  const entityColors = {};
  let colorIndex = 0;

  Object.keys(groupedByEntity).forEach(entity => {
      entityColors[entity] = colors[colorIndex % colors.length];
      colorIndex++;
  });

  var pointfrag = document.createDocumentFragment();

  Object.keys(groupedByEntity).forEach(entity => {
      const entityData = groupedByEntity[entity];
      const color = entityColors[entity];

      for (let i = 0; i < entityData.length - 1; i++) {
          const current = entityData[i];
          const next = entityData[i + 1];
          
          const x1 = 60/7 * Math.abs(1970 - current.Year)/10 + 8;
          const y1 = current.lpi_final/40 * 12;
          const x2 = 60/7 * Math.abs(1970 - next.Year)/10 + 8;
          const y2 = next.lpi_final/40 * 12;

          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          
          let line = document.createElement('div');
          line.className = 's-line';
          line.style.cssText = `
              position: absolute;
              left: ${x1}vw;
              bottom: ${y1}vw;
              width: ${length}vw;
              height: 2px;
              background: ${color};
              transform-origin: 0 50%;
              transform: rotate(${-angle}deg);
          `;
          pointfrag.appendChild(line);
      }
      entityData.forEach(entry => {
          const x = 60/7 * Math.abs(1970 - entry.Year)/10 + 8;
          const y = entry.lpi_final/40 * 12;
          
          let point = document.createElement('div');
          point.className = 's-point';
          point.style.cssText = `
              left: ${x}vw;
              bottom: ${y}vw;
              background: ${color};
          `;
          pointfrag.appendChild(point);
      });
  });

  document.querySelector(".scatter-points").appendChild(pointfrag);
}



