/*:
 * @plugindesc Relationship System Plugin - Manage relationships between
 * the player and NPCs!
 *
 * @author Raft of Penguins
 *
 * @param RPGMV Game Variable ID
 * @desc Choose the ID of the game variable you wish to use for this plugin.
 * @default 1
 * @help Relationship Plugin by Raft of Penguins
 *  A plugin for managing relationships between the player and NPCs!
 *
 *	===================
 *	 Table of Contents
 *	===================
 *	1. Summary
 * 	2. Instructions
 *	3. Parameters
 *	4. Plugin Commands
 *	5. Future Additions
 *  
 *  ======================================================================
 *   1. Relationship Plugin - Summary
 *  ======================================================================
 *      "Welcome to our plugin's Help File!"
 *           _  /_
 *         (`v`)//
 *        //-=-\/
 *        (\_=_/)
 *         ^^ ^^
 *
 *  Thank you for downloading our Relationship Plugin!
 *  
 *  This plugin will help you create relationships between
 *  the player and NPCs in your game. It will also help you
 *  create events that require certain levels of friendship
 *  with NPCs.
 *
 *  The plugin does not currently provide means for the player
 *  to access exact values or anything of that nature, aside from
 *  using console commands for debugging purposes, but we plan to
 *  add some menu functionality in the future.
 *
 *  Please let us know if you have any questions, comments, or
 *  suggestions for future content! 
 *
 *  Raft of Penguins   
 *  raftofpenguins[at]gmail.com
 *
 *  ======================================================================
 *   2. Instructions
 *  ======================================================================
 *  
 *  1. Put RoP_Relationships.js in your project's plugins folder.
 *
 *  2. Choose an RPGMV Game Variable to be used by this plugin. 
 *
 *  3. Change the RPGMV Game Variable ID parameter to match this ID.
 *      - E.g., we used variable number [0001], so our RPGMV Game 
 *          Variable ID is set to 1.
 *
 *  4. In an event that occurs before engaging in actions affecting 
 *      relationships between the player and NPCs, use the 
 *      relationshipsCreate Plugin Command to kick things off.
 *        - E.g., if we wanted to have 20 NPCs with relationships in
 *          our game, we would use this Plugin Command:
 *
 *              relationshipsCreate 20
 *
 *  5. Give each NPC an ID number so that you can reference them
 *     in events that affect their relationship with the player.
 *
 *  6. Use the relationshipMod Plugin Command to alter the value
 *     of an NPC's relationship with the player.
 *          - E.g., if we wanted to increase NPC #3's relationship
 *            with the player by 20 points, we'd use this Plugin Command:
 *
 *                  relationshipMod 3 20
 *
 *  7. Any time you want to create events that require some minimum level
 *     of relationship points between the player and an NPC, use the
 *     relationshipConditional Plugin Command and your RPGMV Game
 *     Variable to setup the minimum requirements for each outcome.
 *          - E.g., if we wanted to create an event where NPC #5 will
 *            react differently to a certain gesture depending on their
 *            relationship with the player, we could use this Plugin
 *            Command to set different outcomes at levels of 30 and 40:
 *
 *                  relationshipConditional 5 30 40
 *
 *          - This situation would have 3 outcomes:
 *              1. The player's relationship is below 30
 *              2. The player's relationship is between 30 and 40
 *              3. The player's relationship is above 40
 *
 *          - The RPGMV Game Variable will be set to the following values
 *            depending on the outcome:
 *              <30     => Outcome = 0
 *              30~40   => Outcome = 1
 *              > 40    => Outcome = 2
 *
 *          - Use Conditional Branches in the RPGMV Event Editor to utilize
 *            the value of the RPGMV Game Variable when creating different
 *            outcomes to similar circumstances based on relationships.
 *
 *  ======================================================================
 *   3. Parameters
 *  ======================================================================
 *  
 *  RPGMV Game Variable ID
 *      - Choose the ID of the game variable you wish to use for this plugin. 
 *          (Numbers only!)
 *      - View the Variables section of the RPGMV Event Editor to find the 
 *          ID# of the game variable you wishe to use.
 *      - Default Value: 1
 *
 *  ======================================================================
 *   4. Plugin Commands
 *  ======================================================================
 *
 *  relationshipCreate n
 *      - n => Number of NPCs with whom the player can develop relationships
 *
 *  relationshipMod x y
 *      - x => ID number of affected NPC
 *      - y => Value of the magnitude of change
 *  
 *  relationshipConditional i args
 *      - i     => ID number of relevant NPC
 *      - args  => Any number of "breakpoints" that denotes the minimum level of 
 *                  relationship for each outcome, each separated by a space
 *
 *  ======================================================================
 *   5. Future Additions
 *  ======================================================================
 *	- Integration with a day/night system to handle daily interactions
 *	- Menu system for the player to access relationship details
 *	- More debug commands for developers
 */

 //-----------------------------------------------------------------------------
 // Global variables
 //

 var relationship = []; // Creates array for storing NPCs' relationship values

 //-----------------------------------------------------------------------------
 // Parameter stuff
 //

 var parameters = PluginManager.parameters('RoP_Relationships');
 var outcomeVar = Number(parameters['RPGMV Game Variable ID'] || 1);

//-----------------------------------------------------------------------------
// Plugin Commands
//
// Allows plugin commands to be called from RPGMV Editor
// - relationshipCreate         => creates [n] slots in which NPC relationship values can be stored
// - relationshipMod            => modifies NPC [x]'s relationship value by [y]
// - relationshipConditional    => returns outcome based on args[i] relationship-value breakpoints 

var relationshipPluginCommands = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    relationshipPluginCommands.call(this, command, args);

    if(command == 'relationshipCreate') {
        var relationshipNumber = Number(args[0]); // Designates number of NPCs with whom player can develop relationships

        // Creates a place in which relationship values can be stored, and sets their initial values to 0
        for (i = 0; i < relationshipNumber; i++) {
            relationship[i] = 0;
        }
    }

    if(command == 'relationshipMod') {

        var relationshipIndex = Number(args[0]); // Identifies NPC's ID number
        var relationshipDelta = Number(args[1]); // Magnitude of change to relationship value

        relationship[relationshipIndex] += relationshipDelta; // Adds delta to current relationship value

        //Console stuff
            console.log(""); //Skips a line for console clarity
            console.log("|=====Relationship Mod=====|");

            console.log("Relationship index: " + relationshipIndex);
            console.log("Relationship delta: " + relationshipDelta);

            console.log("---------------------------");

            console.log("Relationship value: " + relationship[relationshipIndex]);
            console.log("|===End Relationship Mod===|");
        
    }

    if(command == 'relationshipConditional') {

        /* ========================== Plugin Command Outline ==============================
            * Conditional Branch Facilitator
            *  - Plugin command that takes relationship value cut-off points and
            *      creates a way to reference them in the RPGMV event editor.
            *  - proposed syntax:
            *      relationshipConditional index breakpoints
            *  - Create a for loop that iterates over breakpoints[i] and returns an outcome
            *      based on NPC [index]'s current relationship value.
            *  - Sets RPGMV game variable to outcome
            ===============================================================================
        */

        // Creates Outcome variable to be stored in an RPGMV game variable and used in conditional branches
        var outcome = 0;
        var currentIndex = Number(args[0]);
        var currentValue = Number(relationship[currentIndex]);
        var breakpoints = args.length;

        //Console stuff
            console.log(""); //Skips a line for console clarity
            console.log("|=====Conditional=====|");

            console.log("[---Starting Values---]");
            console.log("Index: " + currentIndex);
            console.log("Value: " + currentValue);
            console.log("Breakpoints: " + breakpoints);
            //console.log("[-----Breakpoints-----]");

        //Run through breakpoints to see how many the current relationship level passes

        //Perhaps a do-while loop would be cleaner?
        for (i = 1; i < breakpoints; i++) {

            var breakpoint = Number(args[i]);

            //console.log("Breakpoint " + i + ": " + breakpoint);

            if (breakpoint <= currentValue) {
                outcome += 1;
                //console.log("Passed breakpoint " + i);                
            }

         }

        $gameVariables.setValue(outcomeVar, outcome); //Sets RPGMV game variable equal to outcome

        //Some console stuff for debugging...
            console.log("[-------Results-------]");

            console.log("Variable ID: " + outcomeVar);
            console.log("Outcome: " + outcome);
            console.log("Index: " + currentIndex);
            console.log("Value: " + currentValue);

            console.log("|=========End=========|");

    }
}

//-----------------------------------------------------------------------------

