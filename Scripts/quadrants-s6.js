let data; 
async function getData() {
    const d = await fetch("./Data/wf.json").then(r => r.json());
    data = d;
    return d;
}
await getData() // safety

// future ref: columns: Entity: String, Year: number, area_ha: number, co2: number(float)
console.log(data[0])

// idea: plot x = area_ha (loss) vs y = co2 (emission)
// divide by 1,000,000 (there should be at most 5 ticks on x excluding 0, from 10 to 50), and 5 ticks on y excluding 0 from 200 to 1000

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