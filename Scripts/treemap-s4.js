
let data_tm; 
async function getData() {
    const d = await fetch("./Data/data4_food.json").then(r => r.json());
    data_tm = d;
    return d;
}
await getData() // safety

function emissionTreeMap() {
    // thanks this person: https://stackoverflow.com/a/26902030
    var countries = [];
    var emissions = [];
    for (var i = 0; i < data_tm.length; i++) {
        countries.push(data_tm[i].Code);
        emissions.push(data_tm[i].per_capita_embodied_emissions);
    }
    

    const trace = {
        type: 'treemap',
        labels: countries,
        parents: Array(countries.length).fill(''),
        values: emissions,
        textposition: 'middle center',
        marker: {
            colors: emissions,
            colorscale: 'RdYlGn',
            reversescale: true,
            line: {width: 2, color: 'white'}
        },
        hovertemplate: `<b>${"Hello"}</b>`,
        textfont: {size: 14}
    };
    const layout = {
        margin: {l: 0, r: 0, t: 0, b: 0},
        paper_bgcolor: 'white'
    };
    Plotly.newPlot('scene-4-treemap', [trace], layout, {responsive: true})
}

emissionTreeMap()