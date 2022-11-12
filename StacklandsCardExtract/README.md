# Overview
This folder contains a BepInEx mod which extracts the cards from the game.
This is a hack and the outputs require more modification before adding to the website.

# Requirements
* BepInEx must be installed.
* The .dll must be copied the the BepInEx Plugins folder

# Terms
Internally the game calls Ideas Blueprints.

# Usage

## Outputs
The program extracts two files to the c:\work folder:
card-data.json and blueprints.json.

Blueprints contains the initially extracted blueprints.  Mostly no longer needed.
The card-data.json are all the cards, but the colors will be set if possible.

The card-data.json is what will be used by the website.
## Using the game to export
The blueprints file will always be exported on the game launch.  
The card-data (unfortunately) currently requires the user to go to the Card-o-pedia and hover over every card.

The BepInEx console will show if cards are found or not.  Not all of the cards will be found.  Currently the left over count is somewhere around 16.
