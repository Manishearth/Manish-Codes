#!/usr/bin/env python
import wnck
import gtk
import sys,os
import time

# Use the following as a keyboard shortcut command:
# bash -c 'python ~/path/to/switch.py "Google Chrome"'
# To find out the program names (like "Google Chrome"), run switch.py without any parameters


#Based on http://askubuntu.com/questions/49631/is-there-a-way-to-set-shortcut-keys-for-specific-opened-windows-in-gnome by http://askubuntu.com/users/667/dv3500ea . CC-BY-SA

screen = wnck.screen_get_default()
apps={'gedit':'gedit&','Google Chrome':'google-chrome&','Terminal':'gnome-terminal&','geany':'geany&'}
while gtk.events_pending():
    gtk.main_iteration()

windows = screen.get_windows()
a=screen.get_active_window()
if len(sys.argv) > 1 and a.get_application().get_name() == sys.argv[1]:
    for w in windows[windows.index(a)+1:]:
       if w.get_application().get_name() == sys.argv[1] and w != a:
            w.activate(int(time.time()+1))
            exit(0)
for w in windows:
    if len(sys.argv) > 1:
        if w.get_application().get_name() == sys.argv[1]:
            w.activate(int(time.time()+1))
            exit(0)
    else:
        print("Application name of window with title " + repr(w.get_name()) + " is " + repr(w.get_application().get_name()))

if len(sys.argv) > 1 and sys.argv[1] in apps.keys():
	os.system(apps[sys.argv[1]])
	
