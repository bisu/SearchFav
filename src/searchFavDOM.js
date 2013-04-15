
function searchFav(){ //START searchFav

//TIMER START//

//GLOBAL List.js object 
window.vList;

//COLLECT DATA FROM PAGE AND HREF START//
var numOfVids = parseInt( $(".stat-value").eq(0).text().replace(",", ""), 10 );
var numOfVidsOnOnePage = 100;
var numOfPages = Math.ceil( numOfVids / numOfVidsOnOnePage );

var pageNotToDownload = 1; //default is 1

var pageSuffix = "&page=";
var pagePreffix = "http://www.youtube.com/playlist?list=";

function getParameterByName(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var playlistName = getParameterByName("list");
var page = getParameterByName("page");

if( page ){
  pageNotToDownload = parseInt(page, 10);
}
//COLLECT DATA FROM PAGE AND HREF END//

//GUI START//
var $mainCont = $(".ypc-list-container").attr("id", "videos-list");
var $mainOl = $mainCont.find("ol").addClass("list");

var loadingEnd = false;
var loadingInterval = 300;

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
//GUI END//

//DOWNLOAD OTHER VIDS START//
//prepare links
var links = [];
var link = pagePreffix + playlistName + pageSuffix;
for(var i = 1; i <= numOfPages; i++){

  if( i == pageNotToDownload ){
    continue;
  }

  links.push( link + i );
}

var callbackCounter = 0;

if( !links.length ){

  constructVideoList();
}else{

  $.each(links, function(i, link){

    $.ajax({
      url: link,
      dataType:"html"
    }).done(function(data) {

      var $lis = $(data.trim()).find(".ypc-list-container").find("li");

      //extract video thumnail and change src to thumbnail
      $lis.each(function(i, li){
        var $img = $(li).find(".yt-thumb-clip-inner").find("img");
        var dataThumb = $img.attr("data-thumb");  
        $img.attr("src", dataThumb);
      }); 

      $mainOl.append( $lis );

      //console.log("callback nr " + (i + 1));

      callbackCounter += 1;
      if( callbackCounter == (numOfPages - 1) ){
        constructVideoList();
      }
    });
  });
}
//DOWNLOAD OTHER VIDS END//

}//END searchFav