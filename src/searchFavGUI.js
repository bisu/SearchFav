//gui
var loadingEnd;
var loadingInterval = 200;

//remove share button, hangout button, navigation buttons
$mainCont.children().not("ol").remove();

var $input = $("<input type='text' class='search'>").css({
	margin: "1em",
	marginRight:"0",
	width: "30%",
	height: "21px",
	display: "none"
}).prependTo( $mainCont );

var $optionButton = $('<button type="button" class="end flip yt-uix-button yt-uix-button-default yt-uix-button-empty"><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button>');
$optionButton.css("display","none").insertAfter( $input );

var $loading = $("<div>Wait</div>").css({
	margin: "1em",
	fontSize: "1.5em"
}).prependTo( $mainCont );

function loadingEndCallback(){
	$loading.remove();
	$input.show();
}

setTimeout(function(){

	if( loadingEnd ){
		loadingEndCallback();
		return;
	}

	var str = $loading.text();
	if( str === "Wait........." ){
		str = "Wait";
	}else{
		str += ".";
	}

	$loading.text( str );

	setTimeout(arguments.callee, loadingInterval);

}, loadingInterval);




