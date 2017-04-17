# next-move
Predict where a user will travel next by analyzing their location history

![](http://i.imgur.com/PtiVvFG.gif)

## Get Started

*Estimated setup time: 5 minutes*

1. [Download your Google location history](https://takeout.google.com/settings/takeout) and save it as `RawLocationHistory.json`. **The name matters.**
2. `cd` to the folder with `RawLocationHistory.json` and run the setup script.
```
curl -O https://raw.githubusercontent.com/codyromano/next-move/master/setup.sh
sh setup.sh
```
3. You're all set!
```
open http://localhost:8080/
```

## Customize (Optional)

Play around with `config.js` to adjust the behavior of the location model.
