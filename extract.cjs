const fs = require('fs');

const content = fs.readFileSync('C:/Users/$BDL000-4D1V63KAI41A/.gemini/antigravity/brain/e401ed86-5579-40b0-8b44-01f236300b55/.system_generated/steps/69/content.md', 'utf8');

const match = content.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\n/);
if (match) {
  try {
    const data = JSON.parse(match[1]);
    const formTitle = data[3];
    const formDescription = data[1][0];
    const fields = data[1][1];
    
    const parsedFields = fields.map(f => {
      return {
        id: f[0],
        title: f[1],
        description: f[2],
        type: f[3], // 0: short text, 1: paragraph, 2: multiple choice, 3: dropdown, 4: checkboxes, 5: scale, 7: grid, 9: date, 10: time
        choices: f[4] ? f[4][0][1].map(c => c[0]) : null
      }
    });

    const result = {
      title: formTitle,
      description: formDescription,
      fields: parsedFields
    };
    
    fs.writeFileSync('form_data.json', JSON.stringify(result, null, 2));
    console.log('Successfully extracted form data to form_data.json');
  } catch(e) {
    console.error('Error parsing JSON:', e);
  }
} else {
  console.log('Could not find FB_PUBLIC_LOAD_DATA_');
}
