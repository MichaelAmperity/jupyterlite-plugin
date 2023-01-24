import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

/**
 * Initialization data for the amperitycolors extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'amperitycolors:plugin',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    console.log('JupyterLab extension amperitycolors is activated!');
    const style = 'amperitycolors/index.css';

    manager.register({
      name: 'amperitycolors',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

export default plugin;
