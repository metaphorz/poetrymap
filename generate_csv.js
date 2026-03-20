// Generates list.csv from the poem data files
// Run: node generate_csv.js

const fs = require('fs');
const path = require('path');

// Load data files by converting const to var so they're accessible
const dataFiles = ['data.js', 'data_expanded.js', 'data_expanded_2.js', 'data_frost.js'];
let combined = '';
for (const file of dataFiles) {
    let code = fs.readFileSync(path.join(__dirname, file), 'utf8');
    // Replace leading const with var so variables are accessible after eval
    code = code.replace(/^const /gm, 'var ');
    combined += code + '\n';
}

// Execute all data files (safe: only loading our own local data files)
// eslint-disable-next-line no-new-func
const fn = new Function(combined + `
    var allPoems = [];
    for (var k in POETRY_DATA) allPoems.push(POETRY_DATA[k]);
    for (var k in FROST_DATA) allPoems.push(FROST_DATA[k]);
    return allPoems;
`);
const allPoems = fn();

// CSV escape helper
function csvField(val) {
    if (val == null) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
}

// Build CSV
const header = 'Poem Title,Poet,Location,Type,Coordinates,Accuracy';
const rows = allPoems.map(p => {
    const coords = p.polygonBounds ? 'Regional Polygon' :
        (p.lat != null && p.lng != null ? `${p.lat}, ${p.lng}` : '');
    return [
        csvField(p.title),
        csvField(p.author),
        csvField(p.locationName),
        csvField(p.typeTag || p.type),
        csvField(coords),
        csvField(p.accuracy || '')
    ].join(',');
});

const csv = header + '\n' + rows.join('\n') + '\n';
fs.writeFileSync(path.join(__dirname, 'list.csv'), csv);
console.log(`Generated list.csv with ${rows.length} poems`);
