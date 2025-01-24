//Importação dos recursos que serão utilizados do framework.
const { app, BrowserWindow, nativeTheme, Menu, shell } = require("electron");

//Janela principal
//Função para criar a janela.
const createWindow = () => {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/pc.png',
    //resizable: false,
    //autoHideMenuBar: true,
    //titleBarStyle: 'hidden'
    
});
    //Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile("./src/views/index.html");
};

//Janela sobre
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/public/img/info.png',
        autoHideMenuBar: true,
        resizable: false
    });

    about.loadFile('./src/views/sobre.html')
};

//Renderização da janela.
app.whenReady().then(() => {
    createWindow();
    //aboutWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

//Template do menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir zoom',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'docs',
                click: () => shell.openExternal('https://www.electronjs.org/pt/docs/latest')
            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    },
]
