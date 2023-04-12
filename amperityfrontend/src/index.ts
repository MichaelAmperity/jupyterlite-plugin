import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { KernelMessage } from '@jupyterlab/services';

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
    panel: NotebookPanel
  ) => {
      const { shell, commands } = app; 
      
      let isPublishedMode = false;

      if (document.getElementsByClassName('darkreader').length>0)
      {
        app.commands.execute("apputils:change-theme",{"theme":"JupyterLab Dark"})
        var r = <HTMLElement>document.querySelector(':root');
        r?.style.setProperty('--jp-editor-selected-focused-background', 'grey');
        r?.style.setProperty('--jp-editor-cursor-color', 'black');
      }

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
      r?.style.setProperty('--jp-notebook-max-width', '2000px');
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
            OutputArea.execute = (
              code: string,
              output: OutputArea,
              sessionContext: ISessionContext,
              metadata?: JSONObject | undefined
            ): Promise<IExecuteReplyMsg | undefined> => {
  
              let promise;
  
              try {
                let code_to_run = code

                if (tags&&tags=="SQL")
                {
                  let sql_to_run =`
%pip install ipywidgets
from ipywidgets import widgets
import re
import pandas as pd
import asyncio
from IPython.display import Javascript, clear_output
from io import StringIO

def request_sql(query, shouldBlock=False, shouldShowResults=True, callBackThatGetsStatusAndDF=False):
    global sql_df
    operations_out = widgets.Output()
    results_out = widgets.Output()    
    display(operations_out) 
    if shouldShowResults:
        display(results_out) 
    sqldata_value = ""
    sqlstatus_value = ""
    sqlstatus = widgets.Textarea(
        value='Pending',
        placeholder='Type something',
        description='String:',
        disabled=False,
    )
    sqlstatus_value = "Pending"
    sqlstatus.layout.display='none'
    sqlstatus.add_class('sqlstatus')
    operations_out.append_display_data(sqlstatus)  

    sqldata = widgets.Textarea(
        value='',
        placeholder='Type something',
        description='String:',
        disabled=False,
    )
    sqldata_value = ""
    sqldata.layout.display='none'
    sqldata.add_class('sqldata')
    operations_out.append_display_data(sqldata)  
    
    def on_value_update(el):
        global sql_df
        sqlstatus_value = sqlstatus.value
        sqldata_value = sqldata.value
        if not sqlstatus_value.startswith("Pending"):
            if shouldShowResults:
                results_out.append_display_data(sqlstatus_value)
            if not (sqlstatus_value.startswith('Error:') or sqlstatus_value.startswith("Pending")):
                sql_df = pd.read_csv(StringIO(sqldata_value))
                if shouldShowResults:
                    results_out.append_display_data(sql_df)
            operations_out.clear_output()
            if callBackThatGetsStatusAndDF:
                callBackThatGetsStatusAndDF(sqlstatus_value, sql_df)
            # TODO update call that is done if isblocking
    sqlstatus.observe(on_value_update, names='value')
    
    def _gen_sql_request(query):
        query = re.sub(r'--(.*?)\\n','\\n',query)
        query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')
        js_command = '''
        window.postMessage(
        {
        notebookreact_msg_type: \"sql_request_from_cell\", 
        sql_request:\"'''+query+'''\"
        });
        '''
        return js_command
    
    js_command = _gen_sql_request(query)
    operations_out.append_display_data(Javascript(js_command))  
    
                
query = """${code}"""
request_sql(query, True)`

                  code_to_run = sql_to_run
                  // TODO count the outstanding run 
                }
               
                async function executeWait(code: string, output: OutputArea, sessionContext: ISessionContext, metadata?: JSONObject): Promise<KernelMessage.IExecuteReplyMsg | undefined>
                {
                  await new Promise(res => setTimeout(res, 10));
                  return executeFn(code, output, sessionContext, metadata) 
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



