const barChartConfig = {
  mode: 'x',
  intersect: false,
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Tweets',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
}

const lineChartConfig = {
  data: {
    labels: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ],
    datasets: [],
  },
  options: {
    legend: {
      display: false,
    },
    onClick: data => {
      console.log(data)
    },
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Hours',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Tweets',
          },
        },
      ],
    },
  },
}

const pieChartConfig = {
  data: {
    datasets: [
      {
        data: [1],
        backgroundColor: ['rgba(255, 99, 132, 1)'],
        label: 'users',
      },
    ],
    labels: ['none'],
  },
  options: {
    responsive: true,
    legend: {
      display: false,
      position: 'left',
    },
  },
}

const radarChartConfig = {
  data: {
    labels: ['none'],
    datasets: [
      {
        label: 'Hashtags',
        data: [1],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  },
}
export { barChartConfig, lineChartConfig, pieChartConfig, radarChartConfig }
