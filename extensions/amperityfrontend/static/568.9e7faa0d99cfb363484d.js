"use strict";(self.webpackChunkamperityfrontend=self.webpackChunkamperityfrontend||[]).push([[568],{568:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var n=a(834),o=a(123),s=a(135),l=a(33),r=a(986);const u={id:"amperityfrontend:plugin",autoStart:!0,requires:[n.IRetroShell,l.ICommandPalette,r.IDocumentManager],activate:(e,t,a,n,r)=>{const{shell:u,commands:d}=e;let i=!1;var p;function c(){window.parent.postMessage({notebook_msg_type:"loading_status",loadingText:"Calculating metrics..."},"*"),e.commands.execute("notebook:run-all-cells").then((()=>{var t=document.querySelectorAll(".jp-OutputArea-output"),a=t[t.length-1];document.querySelectorAll(".jp-Toolbar")[0].remove();for(var n=document.querySelectorAll(".jp-Notebook-cell"),o=0;o<n.length;o++)null!=a.parentElement&&null!=a.parentElement.parentElement&&null!=a.parentElement.parentElement.parentElement&&n[o]!=a.parentElement.parentElement.parentElement.parentElement&&n[o].remove();document.querySelectorAll(".jp-Cell-inputArea")[0].remove(),document.querySelectorAll(".jp-OutputCollapser")[0].remove();var s=document.querySelectorAll(".jp-OutputArea-prompt");s[s.length-1].innerHTML="",document.querySelectorAll(".jp-NotebookPanel-notebook")[0].style.top="0px",document.getElementsByClassName("jp-OutputPrompt")[0].classList.remove("jp-OutputPrompt"),function t(){var a=document.getElementsByClassName("jp-enh-cell-toolbar");a&&a.length>0?(a[0].remove(),e.commands.execute("notebook:disable-output-scrolling")):window.setTimeout(t,50)}(),e.contextMenu.dispose(),window.parent.postMessage({notebook_msg_type:"finished_load"},"*")}))}document.getElementsByClassName("darkreader").length>0&&(e.commands.execute("apputils:change-theme",{theme:"JupyterLab Dark"}),null==(p=document.querySelector(":root"))||p.style.setProperty("--jp-editor-selected-focused-background","grey"),null==p||p.style.setProperty("--jp-editor-cursor-color","black")),null==(p=document.querySelector(":root"))||p.style.setProperty("--jp-notebook-toolbar-margin-bottom","0px"),window.onmessage=function(t){if("data"in t&&"object"==typeof t.data&&"notebookreact_msg_type"in t.data){var a=t.data.notebookreact_msg_type;if("startup_as_published"==a&&e.commands.execute("startup_as_published"),"startup_as_notebook"==a&&e.commands.execute("startup_as_notebook"),"sql_error"==a&&((o=document.getElementsByClassName("sqlstatus")[0].children[1]).value="Error: "+t.data.error,o.dispatchEvent(new Event("change",{bubbles:!0}))),"sql_results"==a){var o=document.getElementsByClassName("sqlstatus")[0].children[1],s=document.getElementsByClassName("sqldata")[0].children[1];o.value=t.data.status_text,s.value=t.data.csv_data,s.dispatchEvent(new Event("change",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}"load_notebook"==a?e.serviceManager.contents.save("default.ipynb",JSON.parse(String(t.data.file_json))).then((()=>{const t=n.contextForWidget(u.currentWidget);t?t.revert().then((()=>{e.serviceManager.kernelspecs.refreshSpecs(),i?window.setTimeout(c,500):window.parent.postMessage({notebook_msg_type:"finished_load"},"*")})):i?c():window.parent.postMessage({notebook_msg_type:"finished_load"},"*")})):"sql_request_from_cell"==a&&window.parent.postMessage({notebook_msg_type:"request_sql_query",sql_request:t.data.sql_request},"*")}},d.addCommand("sqltag",{label:"Run SQL",execute:()=>{if(e&&e.shell){let t=e.shell;if(t.currentWidget){let e=t.currentWidget;e.content&&e.content.activeCell&&("SQL"!=e.content.activeCell.model.metadata.get("tags")?e.content.activeCell.model.metadata.set("tags",["SQL"]):e.content.activeCell.model.metadata.set("tags",[]))}}}}),a.addItem({command:"sqltag",category:"amperity"}),null==(p=document.querySelector(":root"))||p.style.setProperty("--jp-notebook-max-width","100%"),d.addCommand("set_notebook_width",{label:"Set notebook width",execute:e=>{var t=document.querySelector(":root"),a=getComputedStyle(t);l.InputDialog.getText({title:"How wide should the cells be? (i.e. 2000px or 100%)",text:a.getPropertyValue("--jp-notebook-max-width")}).then((e=>{if(e.value){var t=document.querySelector(":root");null==t||t.style.setProperty("--jp-notebook-max-width",e.value)}})).catch(console.error)}}),a.addItem({command:"set_notebook_width",category:"amperity"}),d.addCommand("startup_as_notebook",{label:"Startup as notebook",execute:()=>{t.top.dispose(),t.menu.setHidden(!0),window.parent.postMessage({notebook_msg_type:"request_notebook"},"*")}}),a.addItem({command:"startup_as_notebook",category:"amperity"}),d.addCommand("startup_as_published",{label:"Startup as published",execute:()=>{i=!0,e.commands.execute("startup_as_notebook")}}),a.addItem({command:"startup_as_published",category:"amperity"}),function t(){var a;if(e&&e.shell&&e.shell.currentWidget){let t=e.shell.currentWidget;null===(a=n.contextForWidget(t))||void 0===a||a.fileChanged.connect(((t,a)=>{e.serviceManager.contents.get("default.ipynb",{content:!0}).then((e=>{for(var t=0;t<e.content.cells.length;t++)delete e.content.cells[t].outputs,delete e.content.cells[t].execution_count,delete e.content.cells[t].metadata.jupyter;let a=JSON.stringify(e);window.parent.postMessage({notebook_msg_type:"save_notebook",notebook:a},"*")}))}))}else window.setTimeout(t,200)}();let m=s.OutputArea.execute;o.NotebookActions.executionScheduled.connect(((e,t)=>{let a=t.cell.model.metadata.get("tags");s.OutputArea.execute=(e,t,n,o)=>{let l;try{let r=e;async function u(e,t,a,n){return await new Promise((e=>setTimeout(e,10))),m(e,t,a,n)}a&&"SQL"==a&&(r=`\n\n%pip install -q ipywidgets==8.0.6 ipydatagrid==1.1.15\nimport ipywidgets as widgets\nfrom ipydatagrid import DataGrid\nimport re\nimport pandas as pd\nimport asyncio\nfrom IPython.display import Javascript, clear_output\nfrom io import StringIO\n\ndef request_sql(query, shouldBlock=False, shouldShowResults=True, callBackThatGetsStatusAndDF=False):\n    global sql_df\n    operations_out = widgets.Output()\n    results_out = widgets.Output()    \n    display(operations_out) \n    if shouldShowResults:\n        display(results_out) \n    sqldata_value = ""\n    sqlstatus_value = ""\n    sqlstatus = widgets.Textarea(\n        value='Pending',\n        placeholder='Type something',\n        description='String:',\n        disabled=False,\n    )\n    sqlstatus_value = "Pending"\n    sqlstatus.layout.display='none'\n    sqlstatus.add_class('sqlstatus')\n    operations_out.append_display_data(sqlstatus)  \n\n    sqldata = widgets.Textarea(\n        value='',\n        placeholder='Type something',\n        description='String:',\n        disabled=False,\n    )\n    sqldata_value = ""\n    sqldata.layout.display='none'\n    sqldata.add_class('sqldata')\n    operations_out.append_display_data(sqldata)  \n    \n    def on_value_update(el):\n        global sql_df\n        sqlstatus_value = sqlstatus.value\n        sqldata_value = sqldata.value\n        if not sqlstatus_value.startswith("Pending"):\n            if shouldShowResults:\n                results_out.append_display_data(sqlstatus_value)\n            if not (sqlstatus_value.startswith('Error:') or sqlstatus_value.startswith("Pending")):\n                sql_df = pd.read_csv(StringIO(sqldata_value))\n                if shouldShowResults:\n                    results_out.append_display_data(ipywidgets.VBox([DataGrid(sql_df)]))\n            operations_out.clear_output()\n            if callBackThatGetsStatusAndDF:\n                callBackThatGetsStatusAndDF(sqlstatus_value, sql_df)\n            # TODO update call that is done if isblocking\n    sqlstatus.observe(on_value_update, names='value')\n    \n    def _gen_sql_request(query):\n        query = re.sub(r'--(.*?)\\n','\\n',query)\n        query = query.replace('\\n', ' /* newline */ ').replace('\\\\', '\\\\\\\\')\n        js_command = '''\n        window.postMessage(\n        {\n        notebookreact_msg_type: "sql_request_from_cell", \n        sql_request:"'''+query+'''"\n        });\n        '''\n        return js_command\n    \n    js_command = _gen_sql_request(query)\n    operations_out.append_display_data(Javascript(js_command))  \n    \n                \nquery = """${e}"""\nrequest_sql(query, True)`),l=u(r,t,n,o)}catch(d){throw d}finally{s.OutputArea.execute=m}return l}})),window.parent.postMessage({notebook_msg_type:"jupyter_is_ready"},"*")}}}}]);