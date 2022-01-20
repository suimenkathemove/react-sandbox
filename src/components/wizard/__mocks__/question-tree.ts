import { QuestionTree } from '../types';

export const questionTree: QuestionTree = {
  type: 'root',
  id: 'root',
  questions: [
    {
      type: 'input',
      id: '1',
      message: '1',
    },
    {
      type: 'select',
      id: '2',
      message: '2',
      choices: [
        {
          type: 'selectChoice',
          id: '2-1',
          label: '2-1',
          questions: [
            {
              type: 'select',
              id: '6',
              message: '6',
              choices: [
                {
                  type: 'selectChoice',
                  id: '6-1',
                  label: '6-1',
                  questions: [
                    {
                      type: 'select',
                      id: '15',
                      message: '15',
                      choices: [
                        {
                          type: 'selectChoice',
                          id: '15-1',
                          label: '15-1',
                          questions: [
                            {
                              type: 'input',
                              id: '23',
                              message: '23',
                            },
                          ],
                        },
                        {
                          type: 'selectChoice',
                          id: '15-2',
                          label: '15-2',
                          questions: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'selectChoice',
                  id: '6-2',
                  label: '6-2',
                  questions: [
                    {
                      type: 'input',
                      id: '16',
                      message: '16',
                    },
                  ],
                },
              ],
            },
            {
              type: 'input',
              id: '7',
              message: '7',
            },
            {
              type: 'input',
              id: '8',
              message: '8',
            },
          ],
        },
        {
          type: 'selectChoice',
          id: '2-2',
          label: '2-2',
          questions: [
            {
              type: 'input',
              id: '9',
              message: '9',
            },
            {
              type: 'input',
              id: '10',
              message: '10',
            },
            {
              type: 'select',
              id: '11',
              message: '11',
              choices: [
                {
                  type: 'selectChoice',
                  id: '11-1',
                  label: '11-1',
                  questions: [
                    {
                      type: 'input',
                      id: '17',
                      message: '17',
                    },
                  ],
                },
                {
                  type: 'selectChoice',
                  id: '11-2',
                  label: '11-2',
                  questions: [
                    {
                      type: 'input',
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
      type: 'input',
      id: '3',
      message: '3',
    },
    {
      type: 'select',
      id: '4',
      message: '4',
      choices: [
        {
          type: 'selectChoice',
          id: '4-1',
          label: '4-1',
          questions: [
            {
              type: 'select',
              id: '12',
              message: '12',
              choices: [
                {
                  type: 'selectChoice',
                  id: '12-1',
                  label: '12-1',
                  questions: [
                    {
                      type: 'input',
                      id: '19',
                      message: '19',
                    },
                  ],
                },
                {
                  type: 'selectChoice',
                  id: '12-2',
                  label: '12-2',
                  questions: [
                    {
                      type: 'input',
                      id: '20',
                      message: '20',
                    },
                  ],
                },
              ],
            },
            {
              type: 'select',
              id: '13',
              message: '13',
              choices: [
                {
                  type: 'selectChoice',
                  id: '13-1',
                  label: '13-1',
                  questions: [
                    {
                      type: 'input',
                      id: '21',
                      message: '21',
                    },
                  ],
                },
                {
                  type: 'selectChoice',
                  id: '13-2',
                  label: '13-2',
                  questions: [
                    {
                      type: 'input',
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
          type: 'selectChoice',
          id: '4-2',
          label: '4-2',
          questions: [
            {
              type: 'input',
              id: '14',
              message: '14',
            },
          ],
        },
      ],
    },
    {
      type: 'input',
      id: '5',
      message: '5',
    },
  ],
};
