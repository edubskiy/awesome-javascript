function groupBy(arr, key) {
    return arr.reduce((acc, i) => {
      (acc[i[key]] = acc[i[key]] || []).push(i);
      return acc;
    }, {});
  }
  
  // raw data example
  const roleModels = [
    {
      userId: 1,
      name: 'John Williams',
      type: 'Composer'
    },
    {
      userId: 2,
      name: 'Hans Zimmer',
      type: 'Composer'
    },
    {
      userId: 3,
      name: 'Michael Jordan',
      type: 'Athlete'
    },
    {
      userId: 4,
      name: 'J.K. Rowling',
      type: 'Author'
    }
  ];
  
  const byType = groupBy(roleModels, 'type');
  
  // results (derived):
  {
    Athlete: [{...}],
    Author: [{...}],
    Composer: [
      {
        userId: 1,
        name: 'John Williams',
        type: 'Composer'
      },
      {
        userId: 2,
        name: 'Hans Zimmer',
        type: 'Composer'
      }
    ]
  }
  