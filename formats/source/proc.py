#!/usr/bin/env python
"""
This is a script not intended for the web serving, but to take the formatted .src files within this directory, and create a formats.json, and the apropriate pages for both messages and functions.

Formatting for a .pdesc (Pyodec Description) file, based on newlines
[message|file]
[module name]
::[class]
[class quick description] # first line following the class
::[class]
[quick description]
[webpage content]

"""
import os
import json
formats = {'messages':[],'files':[]}
for fl in os.listdir('.'):
    if os.path.splitext(fl)[1] != ".pdesc": continue
    print fl
    with open(fl,'r') as fil:
        data = fil.readlines() # don't make super huge files
        if len(data) < 3: continue
        if 'file' in data[0]:
            k = 'files'
        else:
            k = 'messages'
        # start with the module name, the first element
        row = [data[1].strip(),[],[]]
        cls = False
        desc = ""
        web = ""
        cls_start=False
        for line in data[2:]:
            if "::" in line:
                if cls is not False:
                    # append the previous class, and reset
                    row[1].append(cls)
                    row[2].append(desc)
                    desc  = ""
                cls = line[2:].strip()
                cls_start=True
                
            elif cls_start:
                # this is the first line after a class
                desc = line.strip()
                cls_start=False
            else:
                web += line

        if cls is not False:
            # append the previous class, and reset
            row[1].append(cls)
            row[2].append(desc)
        
    formats[k].append(row)
with open('./formats.json','w') as fil:
    json.dump(formats,fil)