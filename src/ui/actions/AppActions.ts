import 'babel-polyfill'
import Elastic from '../lib/elastic'
import store from '../store'
import types from '../constants/action-types'
import FullDataset from '../lib/dataset'
import notifier from 'node-notifier'

export const esConnect = (
  protocol,
  hostname,
  port,
  index,
  type,
  size,
  scroll,
) => {
  try {
    const client = new Elastic(
      protocol,
      hostname,
      port,
      index,
      type,
      size,
      scroll,
    )
    client.newClient()
    notifier.notify({
      title: 'Twint Desktop',
      message: 'Connected to Elasticsearch',
    })
    store.dispatch({
      type: types.APP_ES_CONNECT,
      payload: {
        client,
      },
    })
  } catch (err) {
    notifier.notify({
      title: 'Twint Desktop',
      message: 'Error while connecting to Elasticsearch',
    })
    console.log(err)
  }
}

export const appSearch = async (client, template) => {
  const body = {
    query: {
      bool: {
        should: [] as any,
      },
    },
  }
  for (const key in template) {
    if (template.hasOwnProperty(key)) {
      if (key === 'username') {
        body['query']['bool']['should'].push({
          match: {
            username: template[key],
          },
        })
      }
      if (key === 'hashtags') {
        body['query']['bool']['should'].push({
          match: {
            hashtags: template[key],
          },
        })
      }
      if (key === 'tweet') {
        body['query']['bool']['should'].push({
          match: {
            tweet: template[key],
          },
        })
      }
    }
  }

  const totalDatasets = new FullDataset()
  await client.scrollSearch(body, totalDatasets)
  totalDatasets.prepareHeaps(10, 10)
  totalDatasets.fillMapPoints()
  totalDatasets.fillTweetsCloud()
  let tweets = [] as any
  for (const i of totalDatasets.tweets) {
    tweets += [...i]
  }
  const graphData = await client.singleSearch(body, [{}])
  const geoPoints = totalDatasets.geoPoints
  store.dispatch({
    type: types.APP_INIT_DATASET,
    payload: {
      totalDatasets,
      tweets,
      graphData,
      geoPoints,
    },
  })
}
