const fs = require('fs');
const csv = require('csv-parser');

const outputFile = 'C:\\Users\\kchen\\stocks-over-under\\sp500-data.js';
const jsHeader = `// S&P 500 Companies List
// Generated ${new Date().toISOString()}
const sp500Companies = [\n`;
const jsFooter = '\n];\n';

const results = [];

fs.createReadStream('src\\sp500_companies.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      symbol: data.Symbol,
      name: data.Shortname,
      industry: data.Industry
    });
  })
  .on('end', () => {
    // Format entries with proper indentation
    const formattedEntries = results.map(item => 
      `  {
    symbol: "${item.symbol}",
    name: "${item.name}",
    industry: "${item.industry}"
  }`).join(',\n');

    // Combine everything
    const jsContent = jsHeader + formattedEntries + jsFooter;
    
    // Write to file
    fs.writeFileSync(outputFile, jsContent);
    console.log(`Data saved to ${outputFile}`);
  });