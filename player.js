var Player = {
    // dom elements; set on load
    "pl": null, 
    "timeInfo": null,
    "timeInterval": undefined,
    
    "volume": 5,

    // jumps to a position given by an integer representing a percentage
    "setTime": function(s) {
	console.debug(this.pl);
	if(s <= 100 && s >= 0) {
	    this.pl.currentTime = this.pl.duration * (s / 100);
	}
	this.updTime();
    },
    
    // decreases volume by one step
    "decVol": function() {
	this.volume--;
	this.updVol();
    },

    // increases volume by one step
    "incVol": function() {
	this.volume++;
	this.updVol();
    },
    
    // updates volume to player and gui
    "updVol": function() {
	if(this.volume < 0) {
	    this.volume = 0;
	} else if(this.volume > 10) {
	    this.volume = 10;
	} 

	this.pl.volume = this.volume / 10;

	document.getElementById("vBar").style.width
	    = this.volume * 10 + "%";
	
    },

    // updates audio time progression in the gui
    "updTime": function() {
	var ratio = this.pl.currentTime / this.pl.duration;
	var perc = Math.floor(ratio * 10000) / 100  + "%";
	var percText = document.getElementById("pbPerc");
	if(percText !== null)
	    percText.textContent = perc;
	document.getElementById("pb").style.width = perc;
    },

    // hooks the audio time progression updates to every 10 ms
    "hookTimeUpdates": function() {
	var that = this; 
	this.timeInterval = setInterval(Player.updTime, 10);
    },

    // clear audio time progression updates
    "clearTimeUpdates": function() {
	clearInterval(this.timeInterval);
    },
    

    // initializes player
    "init": function() {
	this.pl = document.getElementById("player");
	this.timeInfo = document.getElementById("time");
	
	if(this.pl === null) {
	    alert("Couldn't find any <media> object!");
	    return;
	}
	this.updVol();
	pl = this.pl;
	
	bindClicks({
	    // next song
	    "next": function(e) {
		alert("Not implemented");
	    },
	    // previous song
	    "prev": function(e) {
		alert("Not implemented");
	    },
	    // play stopped or paused song 
	    "play": function(e) {
		e.stopPropagation();
		Player.hookTimeUpdates();
		pl.play();
	    },
	    // play/pause toggle
	    "pause": function(e) {
		e.stopPropagation();
		Player.clearTimeUpdates();
		pl.pause();
	    },
	    // stops song and rewinds to start
	    "stop": function(e) {
		e.stopPropagation();
		Player.clearTimeUpdates();
		pl.pause();
		Player.setTime(0);
	    },
	    // increases volume by 1 step of 10
	    "incVol": function(e) {
		e.stopPropagation();
		Player.incVol();
		Player.updVol();
	    },
	    // decreases volume
	    "decVol": function(e) {
		e.stopPropagation();
		Player.decVol();
		Player.updVol();
	    },
	    // jumps to a specific segment in song progression
	    "pbContainer": function(e) {
		e.stopPropagation();
		var x = e.pageX - this.offsetLeft + 1;
		var p = Math.floor(x  / this.offsetWidth * 100);
		document.getElementById("pb").style.width = p + "%";
		Player.setTime(p);
	    }
	});
    }
};

window.onload = function() {
    Player.init();
}

