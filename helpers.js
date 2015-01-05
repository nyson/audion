/*
 Executes function fun() on every list element
*/ 
var map = function(list, fun) {
    for(i in list) {
	list[i] = fun(list[i]);
    }
    return list; 
};

/*
 Creates a new list with every element e where fun(e) === true
*/
var filter = function(list, fun) {
    var nList = [];
    for(i in list) {
	if(fun(list[i]) === true) {
	    nList.add(list[i]);
	}
    }

    return nList;
};

/*
 Returns true if for every list element fun() is equal to true
*/
 
var all = function(list, fun) {
    for(i in list) {
	if(fun(list[i]) !== true) {
	    return false;
	}
    }

    return true;
}

var bindClicks = function(arr) {
    var defined = function(a) {
	return a !== undefined;
    }
    if(!all(arr, defined)) {
	var filtered = filter(arr, defined);
	var str = "";
	var first = false;
	for(i in filtered) {
	    if(first) {
		first = false;
	    } else {
		str += ", ";
	    }

	    str += i;
	}
	
	alert ("bindClicks couldn't find ids\n"
	       + "Affected IDs: " + str);

	return;
    }
    
    for(i in arr) {
	var e;
	e = document.getElementById(i);
	if(i === undefined) {
	    alert("ID not found: '"+ i +"'");
	    return;
	}

	e.onclick = arr[i];	
    }
}
