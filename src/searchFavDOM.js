
function searchFav(){ //START searchFav

//TIMER START//
//var start = new Date().getTime();

//GLOBAL List.js object 
window.vList;

//adres, num of videos
var numOfVids = parseInt( $(".stat-value").eq(0).text().replace(",", ""), 10 );
var numOfVidsOnOnePage = 100;
var numOfPages = Math.ceil( numOfVids / numOfVidsOnOnePage ); 

var pageNotToDownload = 1; //default is 1

var pageSuffix = "&page="; 
var pagePreffix = "http://www.youtube.com/playlist?list="; 

var playlistName = window.location.href;
var index = playlistName.indexOf("?list=") + 6;
playlistName = playlistName.slice( index );

//cut out $page=....
var cut = /&page=.*/g;
cut.lastIndex = 0;
var regResult = cut.exec( playlistName );

if( regResult ){
  playlistName = playlistName.replace(regResult, "");
  pageNotToDownload = parseInt( regResult[0].slice(6), 10);
}

//prepare links
var links = [];
var link = pagePreffix + playlistName + pageSuffix;
for(var i = 1; i <= numOfPages; i++){

  if( i == pageNotToDownload ){
    continue;
  }

  links.push( link + i );
}

//downlad other videos
var $cont = $("<ul>");
var $mainCont = $(".ypc-list-container").attr("id", "videos-list").find("ol").addClass("list");

var callbackCounter = 0;

$.each(links, function(i, link){

  $.ajax({
    url: link 
  }).done(function(data) {

    var $lis = $(data).find(".ypc-list-container").find("li");
    li = $lis;
    $mainCont.append( $lis );

    console.log("callback nr " + (i + 1));

    callbackCounter += 1;
    if( callbackCounter == (numOfPages - 1) ){
      constructVideoList();
    }
  });
});

}//END searchFav