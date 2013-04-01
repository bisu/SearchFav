//use searchFavourites first

//videos container
var container = $(".playlist-video-item").eq(0).parent();
//gui
var input = $("<input type='text'>").css({
	position: "fixed",
	left: "50px",
	top: "50px",
	width: "100px",
}).appendTo( $("body") );

var button = $("<button type='button'>Search</button>").addClass("yt-uix-button yt-uix-button-default").css({
	position: "fixed",
	left: "50px",
	top: "75px",
	width: "104px",
}).appendTo( $("body") );

button.on("click", function(){

	var val = input.val();
	var results = hash[val];

	if( !results ){
		container.html("there are no results");	
	}

	var resultsDOM = $();

	$.each(results, function(i, e){
		resultsDOM = resultsDOM.add( e.dom );
	});

	//EXP
	//container.children().detach();
	container.html("");
	resultsDOM.appendTo( container );


});