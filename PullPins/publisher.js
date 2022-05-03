/**
 * CoolGames SDK config. Do not change the values!
 */
var enableAds = false; //. true;
var adChannel = "hallpass_0161-pull_pin";
var adFreq = 60;
var firstAd = 120;
var Ctr = 0;

var gamePAUSED = 0;

/**
 * CoolGames game config. Will be provided
 */
var gameName = "Pull Pin";
var gameCategory = "Puzzle";
var developerId = "0161";
var gameCode = "0161-pull_pin";

/**
 * Load SDK
 * NOTE: path is relative and will work only after the game is published
 */
(function(w, d) {
    setInterval(function() {
        Ctr++;
    }, 1000);

    w.Booster = w.Booster || {};
    var s = d.createElement("script");
    var p = d.getElementsByTagName("script")[0];
    s.async = 1;
/* WORKER_DELETE
    s.src = "https://games.gamesplaza.com/shared/booster/api.js";
WORKER_DELETE */
    s.src = "api.js";
    s.setAttribute("id", "booster-api");
    p.parentNode.insertBefore(s, p);
})(window, document);

window.RewardedVideoConfig = {
    AdTech: {
        adtechZones: {
            mobile: "4103", //test id
            desktop: "4102" //test id

        }
    },
    HyperMx: {
        descriptor: {
            frameClass: "adFrame",
            adClass: "hypermx",
            width: 800,
            height: 540
        },
        distId: "80801205", //test id
        siteId: "coolgames"
    }
}


/**
 * Will be automatically called when SDK is loaded
 */
Booster.ready = function()
{
    console.log('[test] New version');
    new Booster.Init({
        orientation: "portrait"
    });

    adSense = new Booster.Ad({
        channelID: adChannel
    });

    community = new Booster.Community({
        position: 1,
        gameCode: gameCode
    });

    analytics = new Booster.Analytics({
        gameName: gameName,
        gameId: gameCode,
        gameCategory: gameCategory,
        developer: developerId
    });

    banner = new Booster.AdBanner({});
    banner.show();

    moregames = new Booster.Moregames();

    /**
     * Start the game
     */
    Booster.onSplashFinishedEvent = function() {
				//console.log("Splash completed.");
    };

    /**
     * Add a game pause handler
     */
    Booster.onOpenTab = function() {
    //console.log("Game is paused");
    };

    /**
     * Add a game unpause handler
     */
    Booster.onCloseTab = function() {
	//console.log("Game is resumed");
    };
};

// OdiusFly Studio Functions

function gameADS()
{
/*
    gamePAUSED = 1;
    //console.log(gamePAUSED);
    console.log('[test] gameADS called');
    adSense.showAdvertising({
                callback: function() {
                  gamePAUSED = 0;
                  //console.log(gamePAUSED);
                  //console.log("Done");
                }
            });
    //console.log("Show Ads")
*/
}

function gameREWARD(){
//.    gamePAUSED = 1;
    //console.log(gamePAUSED);
    console.log('[test] gameREWARD called');
    Booster.RewardedVideo.play(this.onVideoCompleted);
    //console.log("Rewarded Ads");
}

function onVideoCompleted() {
//.    gamePAUSED = 0;
    //console.log(gamePAUSED);
    //console.log("Done");
}

function gamePAUSE()
{
//. c3_callFunction('Pause',[gamePAUSED]);
}

function gameSTARTS() {

}