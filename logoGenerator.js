const fs = require('fs');
const inquirer = require('inquirer');

async function generateLogo() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the text:',
        validate: (input) => {
          return input.length > 0 && input.length <= 3;
        },
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (color keyword or hexadecimal):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape: ',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (color keyword or hexadecimal):',
      },
    ]);

    let shapeSVG = '';
    let textX = 0;
    let textY = 0;

    switch (answers.shape.toLowerCase()) {
      case 'circle':
        shapeSVG = `<circle cx="150" cy="100" r="50" fill="${answers.shapeColor}"/>`;
        textX = 150;
        textY = 100;
        break;
      case 'triangle':
        shapeSVG = `<polygon points="100,150 200,150 150,50" fill="${answers.shapeColor}"/>`;
        textX = 150;
        textY = 100;
        break;
      case 'square':
        shapeSVG = `<rect x="100" y="50" width="100" height="100" fill="${answers.shapeColor}"/>`;
        textX = 150;
        textY = 100;
        break;
      default:
        break;
    }

    // Create SVG string
    const svgString = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeSVG}
        <text x="${textX}" y="${textY}" fill="${answers.textColor}" font-size="30" text-anchor="middle" alignment-baseline="central">${answers.text}</text>
      </svg>`;

    // Save as SVG file
    fs.writeFileSync('logo.svg', svgString);
    console.log('Generated logo.svg');
  } catch (error) {
    console.log(error);
  }
}

// Start the logo generation process
generateLogo();
