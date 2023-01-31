import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

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
import { ICommandPalette } from '@jupyterlab/apputils';
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
    panel: NotebookPanel
  ) => {
      const { shell, commands } = app; 
      
      let isPublishedMode = false;

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
          app.serviceManager.contents.save('status.txt', {'format':"text", "content":"Error: "+e.data.error});

        }
        if (msgType == "sql_results")
        {
          app.serviceManager.contents.save('data.csv', {'format': "text", "content":e.data.csv_data}).then(()=>{
            app.serviceManager.contents.save('status.txt', {'format':"text", "content":e.data.status_text});});

        }
        if (msgType == "load_notebook")
        {          
          app.serviceManager.contents.save('default.ipynb', JSON.parse(String(e.data.file_json))).then(()=>
          {
            const context = docManager.contextForWidget(shell.currentWidget!);
            if (context)
              context.revert().then(()=> 
              {  
                // fixes syntax knowledge that is lost when reloading doc, without popup warning... 
                // maybe this line doesn't work, hard to test. restarting kernel always works but that is heavy
                app.serviceManager.kernelspecs.refreshSpecs();
                
                if (isPublishedMode)
                  window.setTimeout(afterLoadPublished, 500);
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
        else if (msgType == "sql_request_from_cell")
        {
          window.parent.postMessage({notebook_msg_type: "request_sql_query", sql_request: e.data.sql_request}, '*');
        }
      }

      commands.addCommand('sqltag', {
        label: 'Quick Run SQL',
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
                  nb.content.activeCell.model.metadata.set('tags', ["SQL"])
              }
            }
          }
        }
      });
      palette.addItem({ command:'sqltag', category:'amperity'});

      commands.addCommand('sqldltag', {
        label: 'Run SQL Then Store All Results',
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
                  nb.content.activeCell.model.metadata.set('tags', ["SQL_DL"])
              }
            }
          }
        }
      });
      palette.addItem({ command:'sqldltag', category:'amperity'});


      commands.addCommand('cleartag', {
        label: 'Clear Any SQL Tag',
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
                  nb.content.activeCell.model.metadata.set('tags', null)
              }
            }
          }
        }
      });
      palette.addItem({ command:'cleartag', category:'amperity'});





      // to hide the file and top bannar
      commands.addCommand('startup_as_notebook', {
        label: 'Startup as notebook',
        execute: () => {
          retroShell.top.dispose();
          retroShell.menu.setHidden(true);

          // // remove panel and tag toolbar options
          // function removeToolbarButtons()
          // {
          //   let retroshell =  <RetroShell>app.shell;
          //   if (retroshell['_main'].children()['_source'][0]['_toolbar']['_layout']['_widgets'].length == 17)
          //   {
          //     retroshell['_main'].children()['_source'][0]['_toolbar']['_layout']['_widgets'][11].hide();
          //     retroshell['_main'].children()['_source'][0]['_toolbar']['_layout']['_widgets'][10].hide();
          //   } 
          //   else
          //     window.setTimeout(removeToolbarButtons, 50);
          // }
          // removeToolbarButtons();

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


      let executeFn = OutputArea.execute;
      NotebookActions.executionScheduled.connect((sender: any, args: { notebook: Notebook, cell: Cell<ICellModel> }) => {
        let tags = args.cell.model.metadata.get('tags');
        if (tags) {
  
          if (tags=="SQL") {
  
            OutputArea.execute = (
              code: string,
              output: OutputArea,
              sessionContext: ISessionContext,
              metadata?: JSONObject | undefined
            ): Promise<IExecuteReplyMsg | undefined> => {
  
              let promise;
  
              try {

                let sql_to_run =`
%pip install ipydatagrid
import asyncio
import os
import re
import pandas as pd
from ipydatagrid import DataGrid
import ipywidgets
from IPython.display import Javascript, clear_output

async def run_sql(query, sql_df_only=False):
  query = re.sub(r'--(.*?)\\n','\\n',query)
  query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')
  try:
    os.remove('status.txt')
  except:
    pass
  try:
    os.remove('data.csv')
  except:
    pass
  with open('status.txt', 'w') as f:
    f.write('Pending')
  global sql_df
  status = 'Pending'
  js_command = '''
  window.postMessage(
  {
    notebookreact_msg_type: \"sql_request_from_cell\", 
    sql_request:\"'''+query+'''\"
  });
  '''
  get_ipython().run_cell_magic("javascript", "", js_command)
  data = ''
  while status.startswith("Pending"):
    await asyncio.sleep(.2)
    with open('status.txt', 'r') as f:
        status = f.read()
        if not sql_df_only:
            clear_output()
            print(status)
    if not (status.startswith('Error:') or status.startswith("Pending")):
        sql_df = pd.read_csv('data.csv')
        os.remove('data.csv')
        
  if sql_df_only:
    if status.startswith('Error:'):
        return pd.DataFrame()
    return sql_df

  clear_output()
  print(status)
  os.remove('status.txt')
  
  if status.startswith('Completed:'):
    displayout = ipywidgets.VBox([DataGrid(sql_df)])
  elif status.startswith('Error:'):
    out = ipywidgets.Output(layout={'border': '1px solid red'})
    displayout = ipywidgets.VBox([out])
  else:
    displayout = sql_df
  return displayout

query = """${code}"""
await run_sql(query)`

                promise = executeFn(sql_to_run, output, sessionContext, metadata);
              }
              catch (e) {
  
                throw e;
              }
              finally {
  
                OutputArea.execute = executeFn;
              }
  
              return promise;
            }
          }
          else if (tags=="SQL_DL") {

            OutputArea.execute = (
              code: string,
              output: OutputArea,
              sessionContext: ISessionContext,
              metadata?: JSONObject | undefined
            ): Promise<IExecuteReplyMsg | undefined> => {
  
              let promise;
  
              try {
  
                code = `print('hello sqlfull')\n${code}`;
  
                promise = executeFn(code, output, sessionContext, metadata);
              }
              catch (e) {
  
                throw e;
              }
              finally {
  
                OutputArea.execute = executeFn;
              }
  
              return promise;
            }
          }
        }
      });
      window.parent.postMessage({notebook_msg_type: "jupyter_is_ready"}, '*');
  }
};



export default plugin;



