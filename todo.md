
- auto replace 'import library' with what is needed for the different tools with pip install and other append to the top
- help menu with links to all tools
- fix issue of sql request getting in a bad state and never completing




- feature flags 
    - 'analysis-notebooks' allows creating and viewing notebooks
    - 'analysis-notebooks-only-published' allows only viewing 'published' notebooks (not creating or editing) 
        - hides edit button when on published 
        - removes create notebook dropdown
        - if navigate to a document directly in edit, don't go past loading and show 'no access, request this document be published'
        - hides all docs not in publish state on list view
- clean code
- stand up jupyter site like docsite 
    - setup repo to be a jupyterlite pages on amperity
    - talk to joshp about how to get that exposed as an s3 bucket publicly (only accessible being iframed in app?)
- squash commits and pull request



// next set
- csv path: rerun with full set option if <500k rows, !download at top of sql to auto do that
- when running with display_results, add stop button


// final set
- in SQL cell: color coding + load in autocomplete tables and columns + remove python autocomplete
- amp_id links to cluster browser in ipydatagrid





-- run sql ---
normal 
download
df
DataGrid
DataGrid(df, layout={ 'height' : '300px' }, auto_fit_columns = True) 

-- tablous style graph builder --
import pyg
pyg.walk(df, dark='light')


-- code charts then publish ---
ipympl + Matplotlib + seaborn

bokeh

plotly

import bgplot

altair

ipycytoscape


--- build widgets and apps then publish ---
ipyvuetify + ipywidgets
dynamic sql



