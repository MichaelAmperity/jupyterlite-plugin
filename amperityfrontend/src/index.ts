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
        app.commands.execute("apputils:change-theme",{"theme":"Darcula"})
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


%pip install ipywidgets
from ipywidgets import widgets
a = widgets.Textarea(
    value='Hello World',
    placeholder='Type something',
    description='String:',
    disabled=False,
)
a.layout.display='none'
a.add_class('sqldata')
a
sqlstatus


a.value
import os
import re
import pandas as pd
import asyncio
%pip install -q ipywidgets<8.0.5
from IPython.display import Javascript, clear_output


def _gen_sql_request(query):
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

def request_sql(query, output_widget):
  js_command = _gen_sql_request(query)
  output_widget.outputs = ()
  output_widget.append_display_data(Javascript(js_command))  

async def wait_for_sql():
  results =  await _run_sql("", True, True)
  return results

async def _run_sql(query, sql_df_only=False, skip_sql_request=False):
  global sql_df
  status = 'Pending'
  if not skip_sql_request:
    js_command = _gen_sql_request(query)
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
    os.remove('status.txt')
    if status.startswith('Error:'):
        return pd.DataFrame()
    return sql_df

  %pip install ipydatagrid==1.1.14
  from ipydatagrid import DataGrid
  import ipywidgets
  clear_output()
  print(status)
  os.remove('status.txt')
  
  if status.startswith('Completed:'):
    dg = DataGrid(sql_df)
    dg.auto_fit_columns = True
    displayout = ipywidgets.VBox([dg])
  elif status.startswith('Error:'):
    out = ipywidgets.Output(layout={'border': '1px solid red'})
    displayout = ipywidgets.VBox([out])
  else:
    displayout = sql_df
  return displayout

query = """${code}"""
await _run_sql(query)`

// let a =
// `

// %pip install ipywidgets
// from ipywidgets import widgets

// import re
// import pandas as pd
// import asyncio
// from IPython.display import Javascript, clear_output
// from io import StringIO

// def _gen_sql_request(query):
//     query = re.sub(r'--(.*?)\\n','\\n',query)
//     query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')
//     js_command = '''
//     window.postMessage(
//     {
//     notebookreact_msg_type: \"sql_request_from_cell\", 
//     sql_request:\"'''+query+'''\"
//     });
//     '''
//     return js_command

// def request_sql(query, output_widget):
//     js_command = _gen_sql_request(query)
//     output_widget.outputs = ()
//     output_widget.append_display_data(Javascript(js_command))  

// async def wait_for_sql():
//     results =  await _run_sql("", True, True)
//     return results

// async def _run_sql(query, sql_df_only=False, skip_sql_request=False):
//     global sql_df
//     global out
//     js_command = _gen_sql_request(query)
//     out.outputs = ()
//     out.append_display_data(Javascript(js_command))  
//     sqlstatus = widgets.Textarea(
//         value='Pending',
//         placeholder='Type something',
//         description='String:',
//         disabled=False,
//     )
//     # sqlstatus.layout.display='none'
//     sqlstatus.add_class('sqlstatus')
//     out.append_display_data(sqlstatus)  
    
//     sqldata = widgets.Textarea(
//         value='',
//         placeholder='Type something',
//         description='String:',
//         disabled=False,
//     )
//     # sqldata.layout.display='none'
//     sqldata.add_class('sqldata')
//     out.append_display_data(sqldata)  

//     while sqlstatus.value.startswith("Pending"):
//         await asyncio.sleep(.2)
//         # print(sqlstatus.value)
//         if not (sqlstatus.value.startswith('Error:') or sqlstatus.value.startswith("Pending")):
//             sql_df = pd.read_csv(StringIO(sqldata.value))
        

//     %pip install ipydatagrid==1.1.14
//     from ipydatagrid import DataGrid
//     import ipywidgets
//     clear_output()
//     print(sqlstatus.value)
//     if sqlstatus.value.startswith('Completed:'):
//         dg = DataGrid(sql_df)
//         dg.auto_fit_columns = True
//         displayout = ipywidgets.VBox([dg])
//     elif status.startswith('Error:'):
//         out = ipywidgets.Output(layout={'border': '1px solid red'})
//         displayout = ipywidgets.VBox([out])
//     else:
//         displayout = sql_df
//     return displayout

// query = """select * from Customer360 limit 100"""
// out = widgets.Output()
// display(out) 
// with out:
//     await _run_sql(query)

// `

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
        }
      });
      window.parent.postMessage({notebook_msg_type: "jupyter_is_ready"}, '*');
  }
};



export default plugin;



