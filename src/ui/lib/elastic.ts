import elasticsearch from 'elasticsearch'

export default class Elastic {
  protocol: string
  hostname: string
  port: number
  index: string
  type: string
  size: string
  scroll: string
  client: any
  maxItems: number

  constructor(
    protocol: string,
    hostname: string,
    port: number,
    index: string,
    type: string,
    size: string,
    scroll: string,
    maxItems: number = 0,
  ) {
    this.protocol = protocol
    this.hostname = hostname
    this.port = port
    this.index = index
    this.type = type
    this.size = size
    this.scroll = scroll
    this.maxItems = maxItems
  }

  newClient(): void {
    this.client = new elasticsearch.Client({
      host: [
        {
          host: this.hostname,
          port: this.port,
          protocol: this.protocol,
          log: 'trace',
        },
      ],
    })
  }

  async singleSearch(body: object, graphData: object[]) {
    try {
      const resp = await this.client.search({
        index: this.index,
        type: this.type,
        size: this.size,
        body,
        ignore: [404],
      })
      for (const tweet of resp.hits.hits) {
        const currentDoc = tweet['_source']
        graphData.push({
          username: currentDoc['username'],
          hashtags: currentDoc['hashtags'],
        })
      }
      return graphData
    } catch (err) {
      console.log(err)
    }
  }

  async scrollSearch(body: object, totalDatasets: any) {
    try {
      var { _scroll_id, hits } = await this.client.search({
        index: this.index,
        type: this.type,
        scroll: this.scroll,
        size: this.size,
        body,
      })
      while (hits && hits.hits.length) {
        for (const hit of hits.hits) {
          const currentDoc = hit['_source']
          if (!totalDatasets.dataset[currentDoc['username']]) {
            totalDatasets.dataset[currentDoc['username']] = {
              value: 1,
              hashtags: {},
              days: {},
              hours: {},
              tweets: [currentDoc['tweet']],
            }
            try {
              if (typeof currentDoc['geo_tweet'] !== 'undefined') {
                totalDatasets.dataset[currentDoc['username']]['geo_points'] = [
                  currentDoc['geo_tweet'],
                ]
              }
            } catch (err) {
              console.log(err)
            }
          } else {
            totalDatasets.dataset[currentDoc['username']]['value']++
            totalDatasets.dataset[currentDoc['username']]['tweets'].push(
              currentDoc['tweet'],
            )
            try {
              if (typeof currentDoc['geo_tweet'] !== 'undefined') {
                totalDatasets.dataset[currentDoc['username']][
                  'geo_points'
                ].push(currentDoc['geo_tweet'])
              }
            } catch (err) {
              console.log(err)
            }
          }
          if (
            !totalDatasets.dataset[currentDoc['username']]['days'][
              currentDoc['day']
            ]
          ) {
            totalDatasets.dataset[currentDoc['username']]['days'][
              currentDoc['day']
            ] = 1
          } else {
            totalDatasets.dataset[currentDoc['username']]['days'][
              currentDoc['day']
            ]++
          }
          if (
            !totalDatasets.dataset[currentDoc['username']]['hours'][
              currentDoc['hour']
            ]
          ) {
            totalDatasets.dataset[currentDoc['username']]['hours'][
              parseInt(currentDoc['hour'], 10)
            ] = 1
          } else {
            totalDatasets.dataset[currentDoc['username']]['hours'][
              parseInt(currentDoc['hour'], 10)
            ]++
          }
          for (const i of currentDoc['hashtags']) {
            if (!totalDatasets.dataset[currentDoc['username']]['hashtags'][i]) {
              totalDatasets.dataset[currentDoc['username']]['hashtags'][i] = 1
            } else {
              totalDatasets.dataset[currentDoc['username']]['hashtags'][i]++
            }
          }
        }
        var { _scroll_id, hits } = await this.client.scroll({
          scroll_id: _scroll_id,
          scroll: this.scroll,
        })
      }
    } catch (err) {
      return err.message
    }
  }
}
