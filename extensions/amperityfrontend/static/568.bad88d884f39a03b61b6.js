"use strict";(self.webpackChunkamperityfrontend=self.webpackChunkamperityfrontend||[]).push([[568],{568:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(834),o=n(172),s=n(47),r=n(859),l=n(856);const u={id:"amperityfrontend:plugin",autoStart:!0,requires:[a.IRetroShell,r.ICommandPalette,l.IDocumentManager],activate:(e,t,n,a,r)=>{const{shell:l,commands:u}=e;let d=!1;function i(){window.parent.postMessage({notebook_msg_type:"loading_status",loadingText:"Calculating metrics..."},"*"),e.commands.execute("notebook:run-all-cells").then((()=>{var t=document.querySelectorAll(".jp-OutputArea-output"),n=t[t.length-1];document.querySelectorAll(".jp-Toolbar")[0].remove();for(var a=document.querySelectorAll(".jp-Notebook-cell"),o=0;o<a.length;o++)null!=n.parentElement&&null!=n.parentElement.parentElement&&null!=n.parentElement.parentElement.parentElement&&a[o]!=n.parentElement.parentElement.parentElement.parentElement&&a[o].remove();document.querySelectorAll(".jp-Cell-inputArea")[0].remove(),document.querySelectorAll(".jp-OutputCollapser")[0].remove();var s=document.querySelectorAll(".jp-OutputArea-prompt");s[s.length-1].innerHTML="",document.querySelectorAll(".jp-NotebookPanel-notebook")[0].style.top="0px",document.getElementsByClassName("jp-OutputPrompt")[0].classList.remove("jp-OutputPrompt"),function t(){var n=document.getElementsByClassName("jp-enh-cell-toolbar");n&&n.length>0?(n[0].remove(),e.commands.execute("notebook:disable-output-scrolling")):window.setTimeout(t,50)}(),e.contextMenu.dispose(),window.parent.postMessage({notebook_msg_type:"finished_load"},"*")}))}window.onmessage=function(t){if("data"in t&&"object"==typeof t.data&&"notebookreact_msg_type"in t.data){var n=t.data.notebookreact_msg_type;"startup_as_published"==n&&e.commands.execute("startup_as_published"),"startup_as_notebook"==n&&e.commands.execute("startup_as_notebook"),"sql_error"==n&&e.serviceManager.contents.save("status.txt",{format:"text",content:"Error: "+t.data.error}),"sql_results"==n&&e.serviceManager.contents.save("data.csv",{format:"text",content:t.data.csv_data}).then((()=>{e.serviceManager.contents.save("status.txt",{format:"text",content:t.data.status_text})})),"load_notebook"==n?e.serviceManager.contents.save("default.ipynb",JSON.parse(String(t.data.file_json))).then((()=>{const t=a.contextForWidget(l.currentWidget);t?t.revert().then((()=>{e.serviceManager.kernelspecs.refreshSpecs(),d?window.setTimeout(i,500):window.parent.postMessage({notebook_msg_type:"finished_load"},"*")})):d?i():window.parent.postMessage({notebook_msg_type:"finished_load"},"*")})):"sql_request_from_cell"==n&&window.parent.postMessage({notebook_msg_type:"request_sql_query",sql_request:t.data.sql_request},"*")}},u.addCommand("sqltag",{label:"Quick Run SQL",execute:()=>{if(e&&e.shell){let t=e.shell;if(t.currentWidget){let e=t.currentWidget;e.content&&e.content.activeCell&&e.content.activeCell.model.metadata.set("tags",["SQL"])}}}}),n.addItem({command:"sqltag",category:"amperity"}),u.addCommand("sqldltag",{label:"Run SQL Then Store All Results",execute:()=>{if(e&&e.shell){let t=e.shell;if(t.currentWidget){let e=t.currentWidget;e.content&&e.content.activeCell&&e.content.activeCell.model.metadata.set("tags",["SQL_DL"])}}}}),n.addItem({command:"sqldltag",category:"amperity"}),u.addCommand("cleartag",{label:"Clear Any SQL Tag",execute:()=>{if(e&&e.shell){let t=e.shell;if(t.currentWidget){let e=t.currentWidget;e.content&&e.content.activeCell&&e.content.activeCell.model.metadata.set("tags",null)}}}}),n.addItem({command:"cleartag",category:"amperity"}),u.addCommand("startup_as_notebook",{label:"Startup as notebook",execute:()=>{t.top.dispose(),t.menu.setHidden(!0),window.parent.postMessage({notebook_msg_type:"request_notebook"},"*")}}),n.addItem({command:"startup_as_notebook",category:"amperity"}),u.addCommand("startup_as_published",{label:"Startup as published",execute:()=>{d=!0,e.commands.execute("startup_as_notebook")}}),n.addItem({command:"startup_as_published",category:"amperity"}),function t(){var n;if(e&&e.shell&&e.shell.currentWidget){let t=e.shell.currentWidget;null===(n=a.contextForWidget(t))||void 0===n||n.fileChanged.connect(((t,n)=>{e.serviceManager.contents.get("default.ipynb",{content:!0}).then((e=>{for(var t=0;t<e.content.cells.length;t++)delete e.content.cells[t].outputs,delete e.content.cells[t].execution_count;let n=JSON.stringify(e);window.parent.postMessage({notebook_msg_type:"save_notebook",notebook:n},"*")}))}))}else window.setTimeout(t,200)}();let c=s.OutputArea.execute;o.NotebookActions.executionScheduled.connect(((e,t)=>{let n=t.cell.model.metadata.get("tags");n&&("SQL"==n?s.OutputArea.execute=(e,t,n,a)=>{let o;try{o=c(`\n%pip install ipydatagrid\nimport asyncio\nimport os\nimport re\nimport pandas as pd\nfrom ipydatagrid import DataGrid\nimport ipywidgets\nfrom IPython.display import Javascript, clear_output\n\nasync def run_sql(query):\n  query = re.sub(r'--(.*?)\\n','\\n',query)\n  query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')\n  try:\n    os.remove('status.txt')\n  except:\n    pass\n  try:\n    os.remove('data.csv')\n  except:\n    pass\n  with open('status.txt', 'w') as f:\n    f.write('pending')\n  global sql_df\n  status = 'pending'\n  js_command = '''\n  window.postMessage(\n  {\n    notebookreact_msg_type: "sql_request_from_cell", \n    sql_request:"'''+query+'''"\n  });\n  '''\n  get_ipython().run_cell_magic("javascript", "", js_command)\n  data = ''\n  while status=="pending":\n    await asyncio.sleep(.2)\n    with open('status.txt', 'r') as f:\n        status = f.read()\n        clear_output()\n        print(status)\n    # handle one and no case\n    if status.startswith('No results:'):\n        pass\n    if status.startswith('One result:'):\n        pass\n    if status.startswith('Completed:'):\n        sql_df = pd.read_csv('data.csv')\n        os.remove('data.csv')\n  clear_output()\n  print(status)\n  os.remove('status.txt')\n\n  if status.startswith('Completed:'):\n    displayout = ipywidgets.VBox([DataGrid(sql_df)])\n  elif status.startswith('Error:'):\n    out = ipywidgets.Output(layout={'border': '1px solid red'})\n    displayout = ipywidgets.VBox([out])\n  else:\n    ipywidgets.VBox()\n  return displayout\n\nquery = """${e}"""\nawait run_sql(query)`,t,n,a)}catch(e){throw e}finally{s.OutputArea.execute=c}return o}:"SQL_DL"==n&&(s.OutputArea.execute=(e,t,n,a)=>{let o;try{o=c(e=`print('hello sqlfull')\n${e}`,t,n,a)}catch(e){throw e}finally{s.OutputArea.execute=c}return o}))})),window.parent.postMessage({notebook_msg_type:"jupyter_is_ready"},"*")}}}}]);