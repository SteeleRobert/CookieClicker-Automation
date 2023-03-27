# CookieClicker-Automation
This repo contains code to automate most of the minigames in cookie clicker as well as autoclickers for the big cookie, golden cookies and sugar lumps
## How to use
Right click on the webpage and click inspect. Navigate to the console and copy paste the code from the components that you want, or use everything by copying the script in the main directory.

## Components
In the components directory you will find scripts that contain the code that automate a differeny part of the game. If you don't want to automate everything you can copy from these individually.
### Autoclickers
There are three auto clickers in this directory: AutoClicker, GoldenCookieClicker, and SugarLumpClicker. These will click the big cookie, golden cookies when they appear on screen, and sugar lumps when the reach maturity
### Garden
They garden automation can be set to two maximize either sugar lumps or cookies. For sugar lump maximization it will unlock every seed in the garden automatically and then sacrifice the garden for 10 sugar lumps (not fully optimzed, only tried to unlock one type of seed at a time). For maximizing cookies it will 
### Stock Market
Buys and sells stocks at predetermined prices. Buy and sell prices were determined by simulating the stock market at with level 10 banks and iterating through possible buy and sell prices to find a maximum.

If your bank is not level 10 you can find your buy and sell points running the following command
```console
python simulate.py BANK_LEVEL
```
this will output the id of the stock and the buy and sell points. You just need to copy into your script.
### Grimoire
Casts "Force the Hand of Fate" when cookie multiplier is greater than given threshold. It will then sell towers and cast a second "Force the Hand of Fate" if second threshold is met.
