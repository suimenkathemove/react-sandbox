import { QuestionTree } from '../types';

export const questionTree: QuestionTree = {
  kind: 'root',
  id: 'root',
  questions: [
    {
      kind: 'input',
      id: '1',
      message: '1',
    },
    {
      kind: 'select',
      id: '2',
      message: '2',
      choices: [
        {
          kind: 'select_choice',
          id: '2-1',
          label: '2-1',
          questions: [
            {
              kind: 'select',
              id: '6',
              message: '6',
              choices: [
                {
                  kind: 'select_choice',
                  id: '6-1',
                  label: '6-1',
                  questions: [
                    {
                      kind: 'select',
                      id: '15',
                      message: '15',
                      choices: [
                        {
                          kind: 'select_choice',
                          id: '15-1',
                          label: '15-1',
                          questions: [
                            {
                              kind: 'input',
                              id: '23',
                              message: '23',
                            },
                          ],
                        },
                        {
                          kind: 'select_choice',
                          id: '15-2',
                          label: '15-2',
                          questions: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: 'select_choice',
                  id: '6-2',
                  label: '6-2',
                  questions: [
                    {
                      kind: 'input',
                      id: '16',
                      message: '16',
                    },
                  ],
                },
              ],
            },
            {
              kind: 'input',
              id: '7',
              message: '7',
            },
            {
              kind: 'input',
              id: '8',
              message: '8',
            },
          ],
        },
        {
          kind: 'select_choice',
          id: '2-2',
          label: '2-2',
          questions: [
            {
              kind: 'input',
              id: '9',
              message: '9',
            },
            {
              kind: 'input',
              id: '10',
              message: '10',
            },
            {
              kind: 'select',
              id: '11',
              message: '11',
              choices: [
                {
                  kind: 'select_choice',
                  id: '11-1',
                  label: '11-1',
                  questions: [
                    {
                      kind: 'input',
                      id: '17',
                      message: '17',
                    },
                  ],
                },
                {
                  kind: 'select_choice',
                  id: '11-2',
                  label: '11-2',
                  questions: [
                    {
                      kind: 'input',
                      id: '18',
                      message: '18',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'input',
      id: '3',
      message: '3',
    },
    {
      kind: 'select',
      id: '4',
      message: '4',
      choices: [
        {
          kind: 'select_choice',
          id: '4-1',
          label: '4-1',
          questions: [
            {
              kind: 'select',
              id: '12',
              message: '12',
              choices: [
                {
                  kind: 'select_choice',
                  id: '12-1',
                  label: '12-1',
                  questions: [
                    {
                      kind: 'input',
                      id: '19',
                      message: '19',
                    },
                  ],
                },
                {
                  kind: 'select_choice',
                  id: '12-2',
                  label: '12-2',
                  questions: [
                    {
                      kind: 'input',
                      id: '20',
                      message: '20',
                    },
                  ],
                },
              ],
            },
            {
              kind: 'select',
              id: '13',
              message: '13',
              choices: [
                {
                  kind: 'select_choice',
                  id: '13-1',
                  label: '13-1',
                  questions: [
                    {
                      kind: 'input',
                      id: '21',
                      message: '21',
                    },
                  ],
                },
                {
                  kind: 'select_choice',
                  id: '13-2',
                  label: '13-2',
                  questions: [
                    {
                      kind: 'input',
                      id: '22',
                      message: '22',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'select_choice',
          id: '4-2',
          label: '4-2',
          questions: [
            {
              kind: 'input',
              id: '14',
              message: '14',
            },
          ],
        },
      ],
    },
    {
      kind: 'input',
      id: '5',
      message: '5',
    },
  ],
};
