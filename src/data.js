export const initialMessages = [
    {   
        titleId: 1,
        title: 'All failed run ids', 
        date: '2023-10-16T14:45:00.000Z', 
        data: [
            {
                id: 1,
                date: '2023-10-16T14:45:00.000Z',
                question: 'All failed run ids',
                answer: 'Here is the list of run ids that failed - R123, R234, R345'
            },
        ]
    },
    {   
        titleId: 2,
        title: 'model 2519 all failed run ids', 
        date: '2023-10-15T14:45:00.000Z', 
        data: [
            {
                id: 1,
                date: '2023-10-15T14:45:00.000Z',
                question: 'model 2519 all failed run ids',
                answer: 'Here is the list of run ids that failed for model 2519 - R2519123, R2519345, R2519789'
            },
            {
                id: 2,
                date: '2023-10-15T15:45:00.000Z',
                question: 'Last failed run id for model 2519',
                answer: 'Last failed run id is R123789'
            },
        ]
    },
    {   
        titleId: 3,
        title: 'model 1987 when scenario hub failed', 
        date: '2023-10-15T18:45:00.000Z', 
        data: [
            {
                id: 1,
                date: '2023-10-15T14:45:00.000Z',
                question: 'model 1987 when scenario hub failed',
                answer: 'model 1987 when scenario hub failed on 2023-10-15 8:23PM'
            },
            {
                id: 2,
                date: '2023-10-15T15:45:00.000Z',
                question: 'Last failed run id for model 1987',
                answer: 'No run id failed for model 1987'
            },
        ]
    },
  ];

  export const initialTitleMessages = function() {
    return initialMessages.map(m => ({titleId: m.titleId, title: m.title, date: m.date}));
  }