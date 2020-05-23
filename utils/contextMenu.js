const electron = require('electron');

const isMac = process.platform === 'darwin';

module.exports = function () {
	const application = {
		label: 'Application',
		submenu: isMac ?
		[
			{
				label: 'About Application',
				role: 'about',
			},
			{
				type: 'separator'
			},
			{
				role: 'services'
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator',
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: () => {
					electron.app.quit();
				},
			}
		]
		:
		[
			{
				label: 'About Application',
				role: 'about',
			},
			{
				type: 'separator',
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: () => {
					electron.app.quit();
				},
			}
		]
	};

	const edit = {
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo',
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo',
			},
			{
				type: 'separator',
			},
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut',
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy',
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste',
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectAll',
			},
		],
	};
	const template = [application, edit];
	electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
};
