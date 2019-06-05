import { app, BrowserWindow } from 'electron'
import * as url from 'url'
import * as path from 'path'

let win: Electron.BrowserWindow

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', function() {
  win = new BrowserWindow({
    title: 'Twint',
    width: 1400,
    height: 800,
    minWidth: 200,
    minHeight: 200,
    autoHideMenuBar: true,
    show: false,
    icon: path.join(__dirname, '../logo/logo.png'),
  })
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  )

  // @ts-ignore
  if (process.argv.includes('--devtools')) win.openDevTools({ mode: 'detach' }) // tslint:disable-line

  win.webContents.on('new-window', e => {
    e.preventDefault()
  })

  win.once('ready-to-show', () => {
    if (win) {
      win.show()
    }
  })

  win.on('close', () => app.quit())
})
