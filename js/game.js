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
	if (g_GAMEPADMANAGER) {
		var GPM = g_GAMEPADMANAGER;

		for (var gamepad_index in GPM.gamepads) {
			for (var i = 0; i < GPM.getNumButtons(gamepad_index); ++i) {
				if (GPM.buttonJustPressed(gamepad_index, i)) {
					var value = GPM.buttonValue(gamepad_index, i);
					console.log("[Gamepad %s] Button %d pressed. (%f)", gamepad_index, i, value);
				}
			}
			for (var i = 0; i < GPM.getNumAxes(gamepad_index); ++i) {
				var change = GPM.axisValueChange(gamepad_index, i);
				if (Math.abs(change) > 0.15) {
					var value = GPM.axisValue(gamepad_index, i);
					console.log("[Gamepad %s] Axis %d changed by %f. (%s)", gamepad_index, i, change, value);
				}
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
	}
}


