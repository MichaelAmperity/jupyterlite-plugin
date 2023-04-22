

- animation of running icon
- messages for !all for 100k, showing first 5000
- when first creates a notebook have in the first cell
#

- feature flags 
    - 'analysis-notebooks' allows creating and viewing notebooks




- clean code
- stand up jupyter site like docsite 
    - setup repo to be a jupyterlite pages on amperity
    - talk to joshp about how to get that exposed as an s3 bucket publicly (only accessible being iframed in app?)
- squash commits and pull request



// final set
- stop button when running + when press reset kernel send cancel signal?
- in SQL cell: color coding + load in autocomplete tables and columns + remove python autocomplete
- amp_id links to cluster browser in ipydatagrid
- 'analysis-notebooks-only-published' allows only viewing 'published' notebooks (not creating or editing) 
    - hides edit button when on published 
    - removes create notebook dropdown
    - if navigate to a document directly in edit, don't go past loading and show 'no access, request this document be published'
    - hides all docs not in publish state on list view





# Use amperity() to view the notebook help
# (press the 'play' button to the right to do so now)
amperity()


-- notebooks --
ctrl-enter 
shift-enter

restart kernal, reload or close and open the page

save or ctrl-s update, 5 seconds autosave

switching between notebook and edit with esc or enter/click
notebook mode
    - up , down
    - a, a
    - b, b
    - d, d
    - drag cells

tab complete

shift-tab to view doc for object function 

-- run sql ---
sql tag, toggle for current cell, view others
delete and run buttons
!all
df is dataframe
result is DataGrid
DataGrid(df[:5000], layout={ 'height' : '300px' }, auto_fit_columns = True) 

-- tablous style graph builder --
pyg.walk(df, dark='light')


-- code charts and publish ---
publish

import seaborn
https://seaborn.pydata.org/examples/index.html


import ipympl
https://matplotlib.org/ipympl/examples/full-example.html


import bokeh in cell before where you want your graph
https://docs.bokeh.org/en/latest/docs/gallery.html

import plotly
plotly express
https://plotly.com/python/plotly-fundamentals/

import bqplot
https://bqplot.github.io/bqplot/

import altair
https://altair-viz.github.io/gallery/index.html

import ipycytoscape
https://github.com/cytoscape/ipycytoscape
https://js.cytoscape.org/

--- build widgets and apps then publish ---

'import ipywidgets'

ipywidgets are a way to interact with the python code like an app
https://ipywidgets.readthedocs.io/en/latest/index.html

ipyvuetify
https://ipyvuetify.readthedocs.io/en/latest/usage.html
https://v2.vuetifyjs.com/en/components/alerts/

dynamic code
-- run sql cell
-- RunSQL() setup object
-- object.run_query()

import ipywidgets
output_for_sql = widgets.VBox()
def callback_for_sql(status, df_in):
     pass
display(output_for_sql)
sql_r = RunSQL(output_for_sql, callback_for_sql, event_to_set=False)
v.Btn()
sql_r.run_query("select * from Customer360 limit 19")



--- run javascript directly ---
javascript 
in the kernel 
'import js' to run javascript on the pyodide kernal which has interop with all python code and variables

With IPython the browser window
from IPython.display import Javascript


