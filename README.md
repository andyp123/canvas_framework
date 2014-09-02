canvas_framework
================

Simple framework for making games and toys using Javascript and HTML5 canvas

https://rawgithub.com/andyp123/canvas_framework/master/index.html

TODO
----
+ switch to requestanimationframe
+ namespace entire project
 - game.js (game initialization file)
 - game/ (game files)
 - system/ (system files)
   - input/
    - keyboard.js
    - touch.js
    - mouse.js
    - gamepad.js
   - output/
    - surface.js
    - screen.js
    - audio.js
   - managers/
    - assetmanager.js
    - particlemanager.js
    - particlesystem.js
    - renderlist.js
   - math/
    - math.js
    - seedrandom.js
    - perlin.js
    - vec2.js
   - physics/
    - masspring.js
    - collision2d.js
   - util/
    - util.js
    - pool.js
    - camera.js
    - sprite.js
    - spriteanimation.js
    - ui.js
    - font.js
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
  - 2d axis support (maybe even 3d)
  - handle controllers via manager instead of getting the controller? INPUT.controllerButtonPressed(controller_id, button_id)?
+ SOUND
 - core audio should use audio api, not HTML audio tag :/
 - preloading audio handled by a data manager
+ FONTS
 - improve bitmap font support (change to font with json descriptor?)
 - add truetype font support (via existing canvas functions...)
+ UTIL / HELPERS
 - move the existing utility functions to a library
 - math library?
