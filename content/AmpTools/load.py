# can't do the normal __init__ because underscores make it break when it fetches from a web url


import textwrap
from js import eval, TextDecoder, Uint8Array
import asyncio
from IPython.display import display, clear_output
from IPython.core.magic import  (
        Magics, magics_class, cell_magic, line_magic
)
import re
from io import StringIO
import pandas as pd
import numpy as np
from io import StringIO
import pandas as pd
import numpy as np

global last_run
last_run = False
# set broadcast channel to be always up for status and data arriving
jscommand = textwrap.dedent("""
    var toolsListening = true;
    var fulldata = false;
    var results = false;
    var status = "none";
    var bc = new BroadcastChannel('JupyterChannel');
    bc.onmessage = e => {
        fulldata = e.data;
        if (e.data.status)
            status = e.data.status;
        if (e.data.results)
            results = e.data.results;
    }
""")
jscommand = jscommand.replace('\n', '').replace('\\', '\\\\')
try:
    eval(toolsListening)
except:
    eval(jscommand)
    
async def _make_query(query_style, query):   
    print("sending query")
    global last_run
    query = re.sub(r'--(.*?)\n','\n',query)
    query = query.replace('\n', ' /* newline */ ').replace('\\', '\\\\')
    query = query.replace('"',r'\"')
    status = "N/A"
    results = False
    last_run = False
    eval("status = \"N/A\";results = false;")
    eval("bc.postMessage({\""+query_style+"\":\""+query+"\"}, \"*\");")
    while (status.split(":")[0]!="finished" and status.split(":")[0]!="error"):
        await asyncio.sleep(.8)
        status = eval("status")
        clear_output()
        print(status)
    clear_output()
    print(status)
    if (status.split(":")[0]=="finished"):
        from js import results
        enc = TextDecoder.new("utf-8")
        last_run = pd.read_csv(StringIO(enc.decode(Uint8Array.new(results))), dtype=object)
        return True
    return False

async def sql(query):
    success = await _make_query("page_query",query)
    if success:
        return get_last_run()
    return

async def sql_full(query):
    success = await _make_query("download_query",query)
    if success:
        return get_last_run()
    return

def open_ampid(amperity_id):
    eval("bc.postMessage({\"popup_ampID\":\""+ amperity_id +"\"}, \"*\");")

def sanddance(in_dataframe):
    formatted_data = in_dataframe.to_csv(index=False)
    formatted_data = formatted_data.replace('\n','\\n')
    formatted_data = formatted_data.replace('"',r'\"')
    formatted_data = str(formatted_data)
    eval("bc.postMessage({\"sanddance\":\""+ formatted_data +"\"}, \"*\");")
    
def get_last_run():
    global last_run
    return last_run

async def db_info(tenant_domain='', tenant_is_sandbox=''):
    eval("status = \"waiting\";results = false;")
    eval("bc.postMessage({\"getdbinfo\":\"true\",\"tenant_domain\":\""+
         tenant_domain+"\",\"tenant_is_sandbox\":\""+
         tenant_is_sandbox+"\"}, \"*\");")
    status = eval("status")
    while (status.split(":")[0]!="finished" and status.split(":")[0]!="error"):
        await asyncio.sleep(.8)
        status = eval("status")
        clear_output()
        print(status)
    from js import results
    dbsinfo = pd.read_csv(StringIO(results))
    return dbsinfo
    
def amp_help():
    print("""await sql(\"\"\"
          Insert your multiline query to run 
          \"\"\")
          - Does the quick run and returns first 100 results.
          - Runs against the current database set in the right UI pane
          - 'await' is required to get the async response
          - Returns result as well as stores in last_run.
          """)

    print("""await sql_full(\"\"\"
          Insert your multiline query to run 
          \"\"\")
          - Like sql command but downloads the full result set      
          """)

    print("""get_last_run()
          - Gets the dataframe from the last successful sql or sql_full run   
          """)

    print("""open_ampid(\"Insert amperity_id\")
          - Pops up Cluster browser for the requested amperity_id
          - Must have a database selected in the right pane that has Unified_Coalesced
          """)

    print("""sanddance(\"Insert dataframe or slice of dataframe like df[:1000]\")
          - Shows full page sanddance visualization on the given dataframe
          - Recommended to use a dataframe of 100k rows or less
          - If you load a large set it may take a five seconds or so to fully load up
          """)
    
    print("""df_of_info = await db_info()
      - get dataframe of all the data explorer info for dynamic sql or comparing teanants
      - optionally can specific if is_sandbox or aws/az as parameters
      - give tenant name, tenant domain, is sandbox... to complete dataframe info.
      - giving this df to sanddance works well for exploration
      """)
    