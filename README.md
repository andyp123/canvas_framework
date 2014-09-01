canvas_framework
================

Simple framework for making games and toys using Javascript and HTML5 canvas

https://rawgithub.com/andyp123/canvas_framework/master/index.html

TODO
----
+ namespace entire project
+ SCREEN
 - multi screen support
 - dynamic resolution changing
 - fullscreen support
+ DATA MANAGER / FILES
 - fully async loading (by default, no blocking with "LOADING..." assets)
 - optional wait for load support (all assets or just specified)
 - loading progress bar / loading screen support
 - procedurally generate temporary assets (could just be small external temp assets?)
 - support other data types than just images (e.g. audio, 3d models)
 - regular file loading support
 - simple drag and drop file load support
+ INPUT
 - multi-touch (bind touch to specific / active elements such as a screen etc.)
 - touch emulation (single touch via mouse, multi via scripting?)
 - gamepad support
+ SOUND
 - core audio should use audio api, not HTML audio tag :/
 - preloading audio handled by a data manager
+ FONTS
 - improve bitmap font support (change to font with json descriptor?)
 - add truetype font support (via existing canvas functions...)
+ UTIL / HELPERS
 - move the existing utility functions to a library
 - math library?
