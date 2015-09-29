
// Makes an AJAX call, using always Content Type: JSON
function ajax(url, options)
{
  var xmlhttp, method;

  return new Promise(function(resolve, reject) {
    method = (options.method)?options.method:'GET';

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
    else { // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4) {
        if (xmlhttp.status==200) {
          var data = (xmlhttp.response)?JSON.parse(xmlhttp.response):{};
          resolve(data);
        } else {
          var data = (xmlhttp.response)?JSON.parse(xmlhttp.response):{};
          reject(data);
        }
      }
    }
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(options.data));
  });
}

