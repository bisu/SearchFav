(function getJQuery(url,success){
  var script = document.createElement('script');
  script.src = url;
  var head = document.getElementsByTagName('head')[0];
  var done = false;
  
  script.onload = script.onreadystatechange = function(){
    if ( !done && (!this.readyState
         || this.readyState == 'loaded'
         || this.readyState == 'complete') ) {
      done = true;
      success();
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
})("http://code.jquery.com/jquery-latest.min.js", searchFav);