import Heap from 'heap'
import { generateColors } from '../utils/utils'

export default class FullDataset {
  dataset: object
  geoPoints: object[]
  tweets: string[]

  private heapUsers: any
  private heapHashtags: any

  constructor() {
    this.tweets = []
    this.geoPoints = []
    this.dataset = []
    this.heapUsers = new Heap(function(a, b) {
      return a.value - b.value
    })
    this.heapHashtags = new Heap(function(a, b) {
      return a.hashtags.value - b.hashtags.value
    })
  }

  prepareHeaps(maxUsers: number, maxHashtags: number): void {
    const oldHeapHashtags = this.heapHashtags
    this.heapHashtags = new Heap(function(a, b) {
      return a.hashtags.value - b.hashtags.value
    })
    this.heapUsers = new Heap(function(a, b) {
      return a.value - b.value
    })
    const _tempHash = {}
    for (const key in this.dataset) {
      if (key) {
        this.heapUsers.push({
          users: { value: this.dataset[key]['value'], name: key },
        })
        for (const hashtag in this.dataset[key]['hashtags']) {
          if (!_tempHash[hashtag]) {
            _tempHash[hashtag] = this.dataset[key]['hashtags'][hashtag]
          } else {
            _tempHash[hashtag] += this.dataset[key]['hashtags'][hashtag]
          }
        }
      }
    }
    for (const i of oldHeapHashtags.toArray()) {
      const hash = oldHeapHashtags.toArray()[i]['hashtags']['name']
      const value = oldHeapHashtags.toArray()[i]['hashtags']['value']
      if (!_tempHash[hash]) {
        _tempHash[hash] = value
      } else {
        _tempHash[hash] += value
      }
    }
    for (const hash in _tempHash) {
      if (hash) {
        this.heapHashtags.push({
          hashtags: { value: _tempHash[hash], name: hash },
        })
      }
    }
    while (maxHashtags < this.heapHashtags.size()) {
      this.heapHashtags.pop()
    }
    while (maxUsers < this.heapUsers.size()) {
      this.heapUsers.pop()
    }
  }

  fillOtherCharts(barChart: any, lineChart: any, pieChart: any) {
    const totalDays: object = {}
    const totalHours: object = {}
    pieChart.data.datasets[0].data = []
    pieChart.data.labels = []
    pieChart.data.datasets[0].backgroundColor = []
    barChart.data.datasets = []
    lineChart.data.datasets = []
    let colors: [Array<string>, Array<string>] = generateColors()
    for (let u = 0; u < this.heapUsers.toArray().length; u++) {
      colors = generateColors()
      const key = this.heapUsers.toArray()[u]['users']['name']
      totalDays[key] = {}
      totalHours[key] = {}

      const newTargetBar = {
        label: key,
        stack: key,
        data: [],
        backgroundColor: colors[0],
        borderColor: colors[1],
        borderWidth: 1,
      }
      barChart.data.datasets.push(newTargetBar)

      const newTargetLine = {
        label: key,
        stack: key,
        backgroundColor: newTargetBar.backgroundColor[0],
        borderColor: newTargetBar.borderColor[0],
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        fill: false,
      }
      lineChart.data.datasets.push(newTargetLine)
      for (const hash in this.dataset[key]['days']) {
        if (!totalDays[key][hash]) {
          totalDays[key][hash] = this.dataset[key]['days'][hash]
        } else {
          totalDays[key][hash] += this.dataset[key]['days'][hash]
        }
      }
      for (const hash in totalDays[key]) {
        if (hash) {
          barChart.data.datasets[u].data[parseInt(hash, 10) - 1] =
            totalDays[key][hash]
        }
      }
      for (const hash in this.dataset[key]['hours']) {
        if (!totalHours[key][hash]) {
          totalHours[key][hash] = this.dataset[key]['hours'][hash]
        } else {
          totalHours[key][hash] += this.dataset[key]['hours'][hash]
        }
      }
      for (const hash in totalHours[key]) {
        if (hash) {
          lineChart.data.datasets[u].data[parseInt(hash, 10)] =
            totalHours[key][hash]
        }
      }
      pieChart.data.labels.push(key)
      pieChart.data.datasets[0].data.push(this.dataset[key]['value'])
      pieChart.data.datasets[0].backgroundColor.push(colors[1])
    }
  }

  fillRadarChart(radarChart: any): void {
    radarChart.data.labels = []
    radarChart.data.datasets[0].data = []
    for (const i of this.heapHashtags.toArray()) {
      radarChart.data.labels.push(i['hashtags']['name'])
      radarChart.data.datasets[0].data.push(i['hashtags']['value'])
    }
  }

  fillMapPoints() {
    for (const key in this.dataset) {
      if (typeof this.dataset[key]['geo_points'] !== 'undefined') {
        this.geoPoints.push({
          user: key,
          geo_points: this.dataset[key]['geo_points'],
        })
      }
    }
  }

  fillTweetsCloud() {
    for (const key in this.dataset) {
      if (this.dataset.hasOwnProperty(key)) {
        this.tweets.push(this.dataset[key]['tweets'])
      }
    }
  }
}
