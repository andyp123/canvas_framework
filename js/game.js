/* GLOBAL VARIABLES AND DATA QUEUEING ******************************************
*/

//queue all the texture data in the system
function game_queueData() {
		var data = [
			"img/awesome.png",
			"img/awesome_rays.png"
		];
		g_ASSETMANAGER.queueAssets(data);
		data = [
		];
		g_SOUNDMANAGER.loadSounds(data);
}
game_queueData();

//objects
g_CAMERA = null;
g_GAMEMANAGER = null;
g_GAMEPAD = null;


/* MAIN FUNCTIONS **************************************************************
*/
function game_update() {
	g_GAMEMANAGER.update();
}

function game_draw(ctx, xofs, yofs) {
	g_SCREEN.clear();

	//add stuff to the renderlist
	g_GAMEMANAGER.addDrawCall();
	//sort and draw everything
	g_RENDERLIST.sort();
	g_RENDERLIST.draw(ctx, g_CAMERA.pos.x, g_CAMERA.pos.y);
	//do any debug drawing etc.
	if (g_DEBUG) {
		g_SCREEN.context.strokeStyle = "rgb(0,255,0)";
		g_SCREEN.context.fillStyle = "rgba(0,255,0,0.5)";
		g_RENDERLIST.drawDebug(ctx, g_CAMERA.pos.x, g_CAMERA.pos.y, 0);
	} else {
		g_SCREEN.context.strokeStyle = "rgb(0,0,0)";
		g_SCREEN.context.fillStyle = "rgb(0,0,0)";	
	}
	
	//make sure the renderlist is clear for the next frame
	g_RENDERLIST.clear();
}

function game_main() {
	if (g_KEYSTATES.isPressed( KEYS.SHIFT ) && g_KEYSTATES.justPressed( KEYS.D ) ) { //d for debug
		g_DEBUG = !g_DEBUG;
		if (!g_DEBUG) {
			document.getElementById('keystates').innerHTML = "";
		}
	}
	if (g_DEBUG) {
		document.getElementById('keystates').innerHTML = g_MOUSE.toString() + "<br>" + g_KEYSTATES.toString() + "<br><b>Camera</b><br>" + g_CAMERA.toString();

		if (g_MOUSE.left.isPressed() && g_KEYSTATES.isPressed( KEYS.C )) {
			g_CAMERA.pos.addXY(g_MOUSE.dx, g_MOUSE.dy);
		}
		if (g_KEYSTATES.isPressed( KEYS.SHIFT ) && g_KEYSTATES.justPressed( KEYS.C )) {
			g_CAMERA.pos.set(0, 0);
		}
	}
	
	// gamepad test
	if (g_GAMEPAD) {
		var buttons = g_GAMEPAD.buttons;
		for (var i = 0; i < buttons.length; ++i) {
			if (buttons[i].justPressed()) {
				console.log("Button %d was pressed.", i);
			}
		}
		var axes = g_GAMEPAD.axes;
		for (var i = 0; i < axes.length; ++i) {
			if (axes[i].dx != 0) {
				console.log("Axis %d changed by %f.", i, axes[i].dx);
			}
		}
	}

	game_update();
	game_draw(g_SCREEN.context, 0, 0);
}

function game_init() {
	if(g_SCREEN.init('screen', 320, 200)) {
		g_CAMERA = new Camera(0, 0);
		g_GAMEMANAGER = new GameManager();
		g_GAMEPAD = g_GAMEPADMANAGER.getGamepad(0);
	}
}


