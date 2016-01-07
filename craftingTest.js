/*:
 * @plugindesc Crafting Plugin
 *
 * @author A Raft of Penguins
 *
 * 
 * @help A plugin for combining items into new items!
 * 
 */

//-----------------------------------------------------------------------------
// Scene_Crafting
//
// The scene class of the crafting screen.

function Scene_Crafting() {
    this.initialize.apply(this, arguments);
}

Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Crafting.prototype.constructor = Scene_Crafting;

Scene_Crafting.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Crafting.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCraftingHeaderWindow();
};

Scene_Crafting.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._craftingHeaderWindow.refresh();
};

Scene_Crafting.prototype.createCraftingHeaderWindow = function() {
    this._craftingHeaderWindow = new Window_CraftingHeader(0, 0);
    // this._craftingHeaderWindow.y = Graphics.boxHeight - this._craftingWindow.height;
    // Begin Setting Handlers ===================================================
    //this._craftingWindow.setHandler('cancel',    this.popScene.bind(this));
    // End Setting Handlers =====================================================
    this.addWindow(this._craftingHeaderWindow);
};

// End of Scene Info ============================================================

//-----------------------------------------------------------------------------
// Window_CraftingHeader
//
// The window for displaying the crafting menu.

function Window_CraftingHeader() {
    this.initialize.apply(this, arguments);
}

Window_CraftingHeader.prototype = Object.create(Window_Base.prototype);
Window_CraftingHeader.prototype.constructor = Window_CraftingHeader;

Window_CraftingHeader.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_CraftingHeader.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_CraftingHeader.prototype.windowHeight = function() {
    // return this.fittingHeight(1);
    // return Graphics.boxHeight;
    return 75;
};

Window_CraftingHeader.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawTextEx("Crafting Menu", 0, 0);
};

Window_CraftingHeader.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

// Copied and modified code from Window_Command - rpg_windows.js @ line 1281+

/* TO DO:
 * - Copy Window_Command info
 * - Modify list
 * - Create window creation functions and call them
 * - Create another Content Window
 */


/* ============== Tutorial Coding that works ===============
Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createCraftingWindow();
    this.createStatusWindow();
};

Scene_Menu.prototype.createCraftingWindow = function() {
    this._craftingWindow = new Window_CraftingHeader(0, 0);
    this._craftingWindow.y = Graphics.boxHeight - this._craftingWindow.height;
    this.addWindow(this._craftingWindow);
};
    =========================================================== */

// End of Window Info ============================================================

//-----------------------------------------------------------------------------
// Plugin Commands
//
// Allows plugin commands to be called from RPGMV Editor

var craftingPluginCommands = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
	craftingPluginCommands.call(this, command, args);

	if(command == 'openCraftingWindow') {
		// $gameMessage.add("Creating a crafting window!");

        SceneManager.push(Scene_Crafting);
        
	}
}