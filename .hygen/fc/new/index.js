module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the name of component?',
      },
      {
        type: 'confirm',
        name: 'have_props',
        message: 'Is it have props?',
      },
      {
        type: 'input',
        name: 'tag',
        message: 'What is the root tag? (No problem in blank)',
      },
      {
        type: 'confirm',
        name: 'have_style',
        message: 'Is it have style?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { component_name, have_props } = answers;
      const abs_path = `src/components/${component_name}`;
      const type_annotate = have_props ? 'React.VFC<Props>' : 'React.VFC';
      const props = have_props ? 'props' : '';
      const tag = answers.tag || 'div';

      return {
        ...answers,
        abs_path,
        type_annotate,
        props,
        tag,
      };
    });
  },
};
