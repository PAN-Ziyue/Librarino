const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 680,
        height:600,
        webPreferences: {nodeIntegration: true}
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

// const template=[{
//     label: 'Edit',
//     submenu:[
//         {
//             label: 'About',
//             role: 'about',
//             click: ()=>{
//                 electron.shell.openExternal('https://')
//             }
//         },

//     ]
// }]
