// didn't want to bother importing asynchronously so I hard-coded it. My bad future reader
data = [
  {
    "Entity": "Africa",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "Africa",
    "lpi_final": 61.5358,
    "Year": 1980
  },
  {
    "Entity": "Africa",
    "lpi_final": 43.6167,
    "Year": 1990
  },
  {
    "Entity": "Africa",
    "lpi_final": 40.7465,
    "Year": 2000
  },
  {
    "Entity": "Africa",
    "lpi_final": 31.545,
    "Year": 2010
  },
  {
    "Entity": "Africa",
    "lpi_final": 23.967,
    "Year": 2020
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 101.171,
    "Year": 1980
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 90.7065,
    "Year": 1990
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 60.8369,
    "Year": 2000
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 42.0389,
    "Year": 2010
  },
  {
    "Entity": "Asia and Pacific",
    "lpi_final": 39.6039,
    "Year": 2020
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 111.7907,
    "Year": 1980
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 128.2238,
    "Year": 1990
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 97.2654,
    "Year": 2000
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 85.3536,
    "Year": 2010
  },
  {
    "Entity": "Europe and Central Asia",
    "lpi_final": 64.715,
    "Year": 2020
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 74.023,
    "Year": 1980
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 49.2326,
    "Year": 1990
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 28.348,
    "Year": 2000
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 17.5656,
    "Year": 2010
  },
  {
    "Entity": "Freshwater",
    "lpi_final": 14.7831,
    "Year": 2020
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 63.4376,
    "Year": 1980
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 35.5696,
    "Year": 1990
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 19.0162,
    "Year": 2000
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 9.4994,
    "Year": 2010
  },
  {
    "Entity": "Latin America and the Caribbean",
    "lpi_final": 5.3773,
    "Year": 2020
  },
  {
    "Entity": "North America",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "North America",
    "lpi_final": 91.3587,
    "Year": 1980
  },
  {
    "Entity": "North America",
    "lpi_final": 85.0634,
    "Year": 1990
  },
  {
    "Entity": "North America",
    "lpi_final": 72.7109,
    "Year": 2000
  },
  {
    "Entity": "North America",
    "lpi_final": 72.0721,
    "Year": 2010
  },
  {
    "Entity": "North America",
    "lpi_final": 60.955,
    "Year": 2020
  },
  {
    "Entity": "World",
    "lpi_final": 100,
    "Year": 1970
  },
  {
    "Entity": "World",
    "lpi_final": 78.4334,
    "Year": 1980
  },
  {
    "Entity": "World",
    "lpi_final": 60.0921,
    "Year": 1990
  },
  {
    "Entity": "World",
    "lpi_final": 44.3735,
    "Year": 2000
  },
  {
    "Entity": "World",
    "lpi_final": 31.1,
    "Year": 2010
  },
  {
    "Entity": "World",
    "lpi_final": 27.1341,
    "Year": 2020
  }
]



const groupedByEntity = {};
data.forEach(entry => {
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