# CookieClicker-Automation
This repo contains code to automate most of the minigames in cookie clicker as well as autoclickers for the big cookie, golden cookies and sugar lumps
## How to use
Right click on the webpage and click inspect. Navigate to the console and copy paste the code from the components that you want, or use everything by copying the script in the main directory.

## Components
In the components directory you will find scripts that contain the code that automate a different part of the game. If you don't want to automate everything you can copy from these individually.
### Autoclickers
There are three auto clickers in this directory: AutoClicker, GoldenCookieClicker, and SugarLumpClicker. These will click the big cookie, golden cookies when they appear on screen, and sugar lumps when the reach maturity. It clicks big cookie 10 times a second by default.
### Garden
The garden automation can be set to maximize either sugar lumps or cookies. For sugar lump maximization it will unlock every seed in the garden automatically and then sacrifice the garden for 10 sugar lumps. For maximizing cookies it will plant bake berries and harvest them when given thresholds are met. With either mode it will unlock the entire garden before picking a strategy. To choose the mode set MAXIMIZE_SUGAR_LUMPS to either true or false.

The script will not plant if you have any multiplier active, if it is not planting make sure that there is not a current Frenzy or other buff.
### Stock Market
Buys and sells stocks at predetermined prices. Buy and sell prices were determined by simulating the stock market at with level 10 banks and iterating through possible buy and sell prices to find a maximum.

If your bank is not level 10 you can find your buy and sell points running the following command
```console
python simulate.py BANK_LEVEL
```
this will output the id of the stock and the buy and sell points. You just need to copy into your script.
### Grimoire
Casts "Force the Hand of Fate" when cookie multiplier is greater than given threshold. It will then sell towers and cast a second "Force the Hand of Fate" if second threshold is met.
