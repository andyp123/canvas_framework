// test.js
// Simple test program to make sure everything is working



// ----------------------------------------------------------------------------
// GameManager
// ----------------------------------------------------------------------------
function GameManager() {
	this.player = new Player();
	this.world = new World();
}

GameManager.prototype.update = function() {
	this.player.update();
}

GameManager.prototype.addDrawCall = function() {
	this.player.addDrawCall();
	this.world.addDrawCall();
}

// ----------------------------------------------------------------------------
// Player
// ----------------------------------------------------------------------------
function Player() {
	this.sprite = new Sprite(g_ASSETMANAGER.getAsset("AWESOME"), 1, 1);
	this.pos = new Vector2(g_SCREEN.width * 0.5, g_SCREEN.height * 0.5);
	this.radius = 32.0;
}

Player.prototype.update = function() {
	var mouse_x = g_MOUSE.x + g_CAMERA.pos.x;
	var mouse_y = g_MOUSE.y + g_CAMERA.pos.y;
	var dist_sq = (this.pos.x - mouse_x) * (this.pos.x - mouse_x)
				+ (this.pos.y - mouse_y) * (this.pos.y - mouse_y);
	var radius_sq = this.radius * this.radius;

	if (!g_MOUSE.left.isPressed()) this.grabbed = false;
	if (dist_sq < radius_sq && g_MOUSE.left.justPressed()) {
		this.grabbed = true;
	}

	if (this.grabbed) {
		this.pos.x -= g_MOUSE.dx;
		this.pos.y -= g_MOUSE.dy;		
	}
}

Player.prototype.draw = function(ctx, xofs, yofs) {
	this.sprite.draw(ctx, this.pos.x + xofs, this.pos.y + yofs);
}

Player.prototype.drawDebug = function(ctx, xofs, yofs) {
	this.sprite.drawDebug(ctx, this.pos.x + xofs, this.pos.y + yofs);
	Util.drawCircle(ctx, this.pos.x + xofs, this.pos.y + yofs, this.radius);
}

Player.prototype.addDrawCall = function() {
	g_RENDERLIST.addObject(this, 0, 0, false);
}


// ----------------------------------------------------------------------------
// World
// ----------------------------------------------------------------------------
function World() {
	this.ray_sprite = new Sprite(g_ASSETMANAGER.getAsset("AWESOME_RAYS"), 1, 2);
	this.ray_pos = new Vector2(g_SCREEN.width * 0.5, g_SCREEN.height * 0.5);
	this.bg_color = "rgb(5, 120, 250)";
}

World.prototype.update = function() {
}

World.prototype.draw = function(ctx, xofs, yofs) {
	ctx.fillStyle = this.bg_color;
	ctx.fillRect(0, 0, g_SCREEN.width, g_SCREEN.height);

	var i;
	var num_rays = 9;
	var angle_per_ray = 360.0 / num_rays * Util.DEG_TO_RAD;
	var offset_angle = 0.01 * g_GAMETIME_MS * Util.DEG_TO_RAD;
	for (i = 0; i < num_rays; ++i) {
		ctx.save();
		ctx.translate(xofs + this.ray_pos.x, yofs + this.ray_pos.y);
		ctx.rotate(angle_per_ray * i + offset_angle);
		this.ray_sprite.draw(ctx, -128, 0, 1);
		ctx.restore();
	}

	for (i = 0; i < num_rays; ++i) {
		ctx.save();
		ctx.translate(xofs + this.ray_pos.x, yofs + this.ray_pos.y);
		ctx.rotate(angle_per_ray * i - offset_angle);
		this.ray_sprite.draw(ctx, -128, 0, 0);
		ctx.restore();
	}
}

World.prototype.drawDebug = function(ctx, xofs, yofs) {

}

World.prototype.addDrawCall = function() {
	g_RENDERLIST.addObject(this, -1, 0, false);
}