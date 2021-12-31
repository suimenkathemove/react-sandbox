const { paramCase } = require('change-case');

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'componentName',
        message: "What's the component name?",
        validate: (input) => input !== '',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Input the path.',
      },
    ];

    return inquirer.prompt(questions).then((answers) => {
      const { path, componentName } = answers;

      const absPath = `src/components/${path}/${paramCase(componentName)}`;

      return {
        ...answers,
        path,
        absPath,
      };
    });
  },
};
