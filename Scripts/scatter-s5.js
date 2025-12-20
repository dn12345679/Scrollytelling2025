
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

    var trace1 = { x: years, y: lpi_final.slice(0, 6),   name: countries[0]   };  // Africa
    var trace2 = { x: years, y: lpi_final.slice(6, 12),  name: countries[6]   };  // Asia
    var trace3 = { x: years, y: lpi_final.slice(12, 18), name: countries[12]  };  // Europe
    var trace4 = { x: years, y: lpi_final.slice(18, 24), name: countries[18]  };  // Freshwater
    var trace5 = { x: years, y: lpi_final.slice(24, 30), name: countries[24]  };  // Latin America
    var trace6 = { x: years, y: lpi_final.slice(30, 36), name: countries[30]  };  // North America
    var trace7 = { x: years, y: lpi_final.slice(36, 42), name: countries[36]  };  // World

    

    var traces = [trace1, trace2, trace3, trace4, trace5, trace6, trace7]
    var layout = {
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        title: {
          text: "Year",
          font: {size: 16, color: "#000000ff"}
        }
      },
      yaxis: {
        title: {
          text: "Living Planet Index (LPI)",
          font: {size: 16, color: "#000000ff"}
        }
      }
    }

    Plotly.newPlot('scatter-s5', traces, layout, {responsive: true});
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



