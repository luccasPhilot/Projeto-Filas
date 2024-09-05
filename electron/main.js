const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const screenshot = require('screenshot-desktop');
const Jimp = require('jimp');
const path = require('path');
const vision = require('@google-cloud/vision');
const { API_KEY } = require('./config');
const db = require("./db")

// Instancia o cliente do Google Cloud Vision
const client = new vision.ImageAnnotatorClient({
  apiKey: API_KEY
});

let mainWindow;
let captureEnabled = true;
let ocrResults = []; // Lista para armazenar resultados do OCR

const saveToDatabase = async (data) => {
  try {
    const result = await db.insertDocuments(data);
    return result;
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
  }
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('status', { captureEnabled, ocrResults });
  });
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('z', async () => {
    if (!captureEnabled) return;

    console.log('Key "Z" pressed, capturing screen...');

    try {
      const img = await screenshot({ format: 'png' });
      const image = await Jimp.read(img);

      const x = 780;
      const y = 480;
      const width = 370;
      const height = 200;

      image.crop(x, y, width, height);
      const croppedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

      // Usa o Google Cloud Vision API para reconhecer o texto
      const [result] = await client.textDetection({ image: { content: croppedBuffer } });
      const textArray = result.textAnnotations.map(annotation => annotation.description).filter(text => text.trim() !== '');

    // Pega apenas o primeiro elemento do array e coloca no campo "codigo"
    const resultObject = { codigo: textArray[0] };
    console.log(resultObject.codigo);

    // Atualiza a lista de resultados e salva no MongoDB
    ocrResults.push(resultObject);
    await saveToDatabase(resultObject);;

      // Envia os resultados do OCR para a janela principal do Electron
      mainWindow.webContents.send('ocr-result', ocrResults);
    } catch (err) {
      console.error('Error capturing screen:', err);
    }
  });

  globalShortcut.register('x', () => {
    captureEnabled = !captureEnabled;
    console.log(`Screen capture ${captureEnabled ? 'enabled' : 'disabled'}`);
    mainWindow.webContents.send('status', { captureEnabled, ocrResults });
  });

  ipcMain.on('toggle-capture', () => {
    captureEnabled = !captureEnabled;
    mainWindow.webContents.send('status', { captureEnabled, ocrResults });
  });

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
