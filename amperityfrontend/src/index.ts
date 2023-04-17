import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {KernelMessage, KernelConnection } from '@jupyterlab/services';

/**
 * Initialization data for the amperityfrontend extension.
 */

import { IRetroShell, RetroShell } from '@retrolab/application';
import {
  NotebookPanel,
  Notebook,
  NotebookActions
} from '@jupyterlab/notebook';
import { IExecuteReplyMsg } from '@jupyterlab/services/lib/kernel/messages';
import { ISessionContext } from '@jupyterlab/apputils';
import {
  Cell,
  ICellModel
} from "@jupyterlab/cells";
import {OutputArea} from '@jupyterlab/outputarea';
import {JSONObject} from '@lumino/coreutils';
import { ICommandPalette, InputDialog } from '@jupyterlab/apputils';
import {IDocumentManager} from '@jupyterlab/docmanager';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'amperityfrontend:plugin',
  autoStart: true,
  requires: [IRetroShell, ICommandPalette, IDocumentManager],
  activate: (
    app: JupyterFrontEnd,
    retroShell: IRetroShell,
    palette: ICommandPalette,
    docManager: IDocumentManager,
    panel: NotebookPanel,
    kconnection: KernelConnection
  ) => {
      const { shell, commands } = app; 
      
      let isPublishedMode = false;

      class SQLRunQueue {
        private items: [number, boolean][] = [];
        private counter: number=0;
        public activeWaiting: boolean = false;
      
        public pushID(IsSQLWait: boolean): number {
          let id = this.counter
          this.counter++
          this.items.push([id, IsSQLWait]);
          console.log('push'+String(id))
          return id
        }
      
        public popID(id: number): void {
          if (this.items[0][0] === id) {
            this.activeWaiting = this.items[0][1];
            this.items.shift();
            console.log('pop'+String(id))
          }
        }
      
        public async wait(id: number): Promise<void> {
          while ((this.items[0][0] !== id)||(this.activeWaiting === true)) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }
      }
      
      let sqlQueue = new SQLRunQueue();


      if (document.getElementsByClassName('darkreader').length>0)
      {
        app.commands.execute("apputils:change-theme",{"theme":"JupyterLab Dark"})
        var r = <HTMLElement>document.querySelector(':root');
        r?.style.setProperty('--jp-editor-selected-focused-background', 'grey');
        r?.style.setProperty('--jp-editor-cursor-color', 'black');
      }
      var r = <HTMLElement>document.querySelector(':root');
      r?.style.setProperty('--jp-notebook-toolbar-margin-bottom', '0px');

      // handle the parent react componant messages
      window.onmessage = function(e: MessageEvent) {

        if ((!('data' in e)) || (typeof e.data !== 'object') || (!('notebookreact_msg_type' in e.data)))
            return;
            
        var msgType = e.data.notebookreact_msg_type;
        if (msgType == "startup_as_published")
        {
            app.commands.execute('startup_as_published')
        }

        if (msgType == "startup_as_notebook")
        {
          app.commands.execute('startup_as_notebook')
        }
        if (msgType == "sql_error")
        {
          var sqlstatus = <HTMLTextAreaElement>document.getElementsByClassName('sqlstatus')[0].children[1]
          sqlstatus.value = "Error: "+e.data.error
          sqlstatus.dispatchEvent(new Event('change', { 'bubbles': true }));
        }
        if (msgType == "sql_results")
        {
          var sqlstatus = <HTMLTextAreaElement>document.getElementsByClassName('sqlstatus')[0].children[1]
          var sqldata = <HTMLTextAreaElement>document.getElementsByClassName('sqldata')[0].children[1]
          sqlstatus.value = e.data.status_text
          sqldata.value = e.data.csv_data
          sqldata.dispatchEvent(new Event('change', { 'bubbles': true }));
          sqlstatus.dispatchEvent(new Event('change', { 'bubbles': true }));
        }
        if (msgType == "load_notebook")
        {          
          app.serviceManager.contents.save('default.ipynb', JSON.parse(String(e.data.file_json))).then(()=>
          {
            const context = docManager.contextForWidget(shell.currentWidget!);
            if (context)
              context.revert().then(()=> 
              {  
                if (isPublishedMode)
                  afterLoadPublished();
                else
                  window.parent.postMessage({notebook_msg_type: "finished_load"}, '*');

              });
            else
            {
              if (isPublishedMode)
                afterLoadPublished();
              else
                window.parent.postMessage({notebook_msg_type: "finished_load"}, '*');

            }
          });
        }
        if (msgType == "sql_request_from_cell")
        {
          window.parent.postMessage({notebook_msg_type: "request_sql_query", sql_request: e.data.sql_request, download: e.data.download}, '*');
        }
        if (msgType == "sql_finish_from_cell")
        {
          sqlQueue.activeWaiting = false
        }
      }

      commands.addCommand('sqltag', {
        label: 'Run SQL',
        execute: () => {
          if (app && app.shell)
          {
            let retroshell =  <RetroShell>app.shell;
            if (retroshell.currentWidget)
            {  
              let nb = <NotebookPanel>retroshell.currentWidget
              if (nb.content)
              {
                if (nb.content.activeCell)
                {
                  let tags = nb.content.activeCell.model.metadata.get('tags');  
                  if (tags!="SQL") {
                      nb.content.activeCell.model.metadata.set('tags', ["SQL"])
                  }
                  else
                  {
                    nb.content.activeCell.model.metadata.set('tags', [])
                  }
                }
              }
            }
          }
        }
      });
      palette.addItem({ command:'sqltag', category:'amperity'});

      var r = <HTMLElement>document.querySelector(':root');
      r?.style.setProperty('--jp-notebook-max-width', '100%');
      commands.addCommand('set_notebook_width', {
        label: 'Set notebook width',
        execute: args => {
          var r = <HTMLElement>document.querySelector(':root');
          var rs = getComputedStyle(r);
          InputDialog.getText({
            title: 'How wide should the cells be? (i.e. 2000px or 100%)',
            text: rs.getPropertyValue('--jp-notebook-max-width') as string
          })
            .then(result => {
              if (result.value) {
                var r = <HTMLElement>document.querySelector(':root');
                r?.style.setProperty('--jp-notebook-max-width', result.value);
              }
            })
            .catch(console.error);
        }
      });
      palette.addItem({ command:'set_notebook_width', category:'amperity'});

      // to hide the file and top bannar
      commands.addCommand('startup_as_notebook', {
        label: 'Startup as notebook',
        execute: () => {
          retroShell.top.dispose();
          retroShell.menu.setHidden(true);

          window.parent.postMessage({notebook_msg_type: "request_notebook"}, '*');
        }
      });
      palette.addItem({ command:'startup_as_notebook', category:'amperity'});


      commands.addCommand('startup_as_published', {
        label: 'Startup as published',
        execute: () => {
          isPublishedMode = true;
          app.commands.execute('startup_as_notebook');
        }
      });
      palette.addItem({ command:'startup_as_published', category:'amperity'});

      
      function afterLoadPublished()
      {
        window.parent.postMessage({notebook_msg_type: "loading_status", loadingText:"Calculating metrics..."}, '*');
        app.commands.execute("notebook:run-all-cells").then(()=>{
          var outputs = document.querySelectorAll(".jp-OutputArea-output");
          var finalcell = outputs[outputs.length-1];
          document.querySelectorAll(".jp-Toolbar")[0].remove();
          var cells = document.querySelectorAll(".jp-Notebook-cell");
          for (var i = 0;i<cells.length;i++)
          {
            if (finalcell.parentElement!=null 
              && finalcell.parentElement.parentElement!=null 
              && finalcell.parentElement.parentElement.parentElement!=null
              && (cells[i] != finalcell.parentElement.parentElement.parentElement.parentElement))
              cells[i].remove();

          }
          document.querySelectorAll(".jp-Cell-inputArea")[0].remove();
          document.querySelectorAll(".jp-OutputCollapser")[0].remove();
          var all_count_labels = document.querySelectorAll(".jp-OutputArea-prompt");
          all_count_labels[all_count_labels.length -1 ].innerHTML='';
          document.querySelectorAll<HTMLElement>(".jp-NotebookPanel-notebook")[0].style.top='0px';
          document.getElementsByClassName('jp-OutputPrompt')[0].classList.remove('jp-OutputPrompt');
            
          // make for new cell toolbar
          function removeMouseOver()
          {
            var found = document.getElementsByClassName("jp-enh-cell-toolbar");
            if (found &&(found.length>0))
            {
              found[0].remove();
              app.commands.execute("notebook:disable-output-scrolling");
            }
            else
              window.setTimeout(removeMouseOver, 50);
          }
          removeMouseOver();
          app.contextMenu.dispose();

          window.parent.postMessage({notebook_msg_type: "finished_load"}, '*');
        });
      }

      
      function registerDocListener()
      {
        if (app && app.shell && app.shell.currentWidget)
        {
            let currWig = app.shell.currentWidget
            docManager.contextForWidget(currWig)?.fileChanged.connect((sender, args) => {
              app.serviceManager.contents.get('default.ipynb',{'content':true}).then((current_notebook)=>
              {
                for(var i = 0; i< current_notebook.content.cells.length; i++)
                {
                  delete current_notebook.content.cells[i].outputs; 
                  delete current_notebook.content.cells[i].execution_count;
                  delete current_notebook.content.cells[i].metadata.jupyter;
                }
                let notebook_as_string = JSON.stringify(current_notebook);
                window.parent.postMessage({notebook_msg_type: "save_notebook", notebook: notebook_as_string}, '*');  
              });
              
            });
          }
          else
            window.setTimeout(registerDocListener, 200);
      }
      registerDocListener();

      kconnection.statusChanged.connect((kernel: KernelConnection, kernalstatus: KernelMessage.Status) =>
      {
        if ((kernalstatus === 'starting')||(kernalstatus === 'restarting')||(kernalstatus === 'autorestarting'))
            sqlQueue = new SQLRunQueue();
      });


      let executeFn = OutputArea.execute;
      NotebookActions.executionScheduled.connect((sender: any, args: { notebook: Notebook, cell: Cell<ICellModel> }) => { 
        let tags = args.cell.model.metadata.get('tags');
            OutputArea.execute = (
              code: string,
              output: OutputArea,
              sessionContext: ISessionContext,
              metadata?: JSONObject | undefined
            ): Promise<IExecuteReplyMsg | undefined> => {
  
              let promise;
              let isSQLCell = false
  
              try {
                let code_to_run = code

                if (tags&&tags=="SQL")
                {
                  isSQLCell = true
                  let sql_to_run =`

%pip install -q ipywidgets==8.0.6 ipydatagrid==1.1.15
import ipywidgets as widgets
from ipydatagrid import DataGrid
import re
import pandas as pd
import asyncio
from IPython.display import Javascript, clear_output
from io import StringIO

class RunSQL:
    def __init__(self, containing_box, optional_callback_with_status_df=False, event_to_set=False, should_show_results=False, needs_to_unblock=False):
        self.containing_box = containing_box
        self.optional_callback_with_status_df = optional_callback_with_status_df
        self.event_to_set = event_to_set
        self.should_show_results = should_show_results
        self.needs_to_unblock = needs_to_unblock
        
    
    def _reset(self):
        if self.event_to_set:
            self.event_to_set.clear()
        operations_out = widgets.Output()
        results_out = widgets.Output()  
        self.containing_box.children = [operations_out, results_out]
        sqlstatus = widgets.Textarea(
            value='Pending',
            placeholder='Type something',
            description='String:',
            disabled=False,
        )
        sqlstatus.layout.display='none'
        sqlstatus.add_class('sqlstatus')
        operations_out.append_display_data(sqlstatus)  

        sqldata = widgets.Textarea(
            value='',
            placeholder='Type something',
            description='String:',
            disabled=False,
        )
        sqldata.layout.display='none'
        sqldata.add_class('sqldata')
        operations_out.append_display_data(sqldata)
        if self.should_show_results:
          results_out.append_stdout("Pending...")

        def on_value_update(el):
            sqlstatus_value = sqlstatus.value
            sqldata_value = sqldata.value
            df = ''
            if not sqlstatus_value.startswith("Pending"):
                if self.should_show_results:
                    results_out.outputs = ()
                    results_out.append_stdout(sqlstatus_value)
                if not (sqlstatus_value.startswith('Error:') or sqlstatus_value.startswith("Pending")):
                    df = pd.read_csv(StringIO(sqldata_value))
                    if self.should_show_results:
                        if df.size <= 5000:
                          results_out.append_display_data(widgets.VBox([DataGrid(df,  layout={ 'height' : '300px' }, auto_fit_columns=True)]))
                        else:
                          results_out.append_display_data(widgets.VBox([DataGrid(df[:5000],  layout={ 'height' : '300px' }, auto_fit_columns=True)]))
                operations_out.outputs = ()
                if self.optional_callback_with_status_df:
                    self.optional_callback_with_status_df(sqlstatus_value, df)
                if self.event_to_set:
                    self.event_to_set.set()
                if self.needs_to_unblock:
                  js_command = '''
                  window.postMessage(
                  {
                  notebookreact_msg_type: \"sql_finish_from_cell\", 
                  });
                  '''
                  self.containing_box.children[0].append_display_data(Javascript(js_command))  
        sqlstatus.observe(on_value_update, names='value')
        

    def run_query(self, query):
        self._reset()
        query = re.sub(r'--(.*?)\\n','\\n',query)
        query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')
        isDownload = query.lstrip().startswith('!all')
        if isDownload:
            query = query.replace('!all', '',1)
        js_command = '''
        window.postMessage(
        {
        notebookreact_msg_type: \"sql_request_from_cell\", 
        sql_request:\"'''+query+'''\",
        download:\"'''+str(isDownload)+'''\"
        });
        '''
        self.containing_box.children[0].append_display_data(Javascript(js_command))  
        
    
output_for_sql = widgets.VBox()
def callback_for_sql(status, dfin):
     global df
     df = dfin
display(output_for_sql)
sql_r = RunSQL(output_for_sql, callback_for_sql, event_to_set=False, should_show_results=True, needs_to_unblock=True)
sql_r.run_query("""${code}""")`

                  code_to_run = sql_to_run
                }
                else //normal code cell
                {
                  let import_ipywalker = `
%pip install -q requests==2.28.2 pygwalker=='0.1.7a5'
import pandas as pd
import pygwalker as pyg, pygwalker.utils.config as pyg_conf
pyg_conf.set_config({'privacy': 'offline'})
`
                  if (code.includes('pyg.walk'))
                    code_to_run = import_ipywalker + code_to_run

                  let import_bokeh = `

%pip install xyzservices==2023.2.0 bokeh==3.1.0
from bokeh.plotting import output_notebook
import pandas
import numpy as np
output_notebook()
`
                  if (code.includes('import bokeh'))
                    code_to_run = import_bokeh + code_to_run

                }
               
                async function executeWait(code: string, output: OutputArea, sessionContext: ISessionContext, metadata?: JSONObject): Promise<KernelMessage.IExecuteReplyMsg | undefined>
                {
                  let t = sqlQueue.pushID(isSQLCell)
                  await sqlQueue.wait(t)
                  sqlQueue.popID(t)
                  return executeFn(code, output, sessionContext, metadata) // has callback to switch sql_open
                }
                promise = executeWait(code_to_run, output, sessionContext, metadata);
              }
              catch (e) {
  
                throw e;
              }
              finally {
  
                OutputArea.execute = executeFn;
              }
  
              return promise;
            }
      });

      window.parent.postMessage({notebook_msg_type: "jupyter_is_ready"}, '*');
  }
};



export default plugin;



