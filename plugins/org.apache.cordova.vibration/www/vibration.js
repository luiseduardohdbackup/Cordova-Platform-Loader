/// <reference path="ios/cordova.js" />
function get_device_type() {
    //alert("" + navigator.userAgent);
  if (navigator.userAgent.match(/(Android)\s+([\d.]+)/)
      || navigator.userAgent.match(/Silk-Accelerated/))
    return 'android';
  if (navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/)
      || navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/))
      return 'ios';
    if (navigator.userAgent.match(/Windows\sPhone/)
      || navigator.userAgent.match(/IEMobile/i)
      || navigator.userAgent.match(/ZuneWP7/i)
      || navigator.userAgent.match(/Lumia/i))
        return 'wp8';
    return 'browser';
}


var XMLHttpFactories = [
	function () { return new XMLHttpRequest() },
	function () { return new ActiveXObject("Msxml2.XMLHTTP") },
	function () { return new ActiveXObject("Msxml3.XMLHTTP") },
	function () { return new ActiveXObject("Microsoft.XMLHTTP") }
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

device_type = get_device_type();

if (device_type != 'other') {
    try {
        // get some kind of XMLHttpRequest
        var xhrObj = createXMLHTTPObject();
        //var src = 'TestCordova/' + get_device_type() + '/' + 'cordova_plugins.js';
		var src = 'cordova/' + get_device_type() + '/plugins/org.apache.cordova.vibration/www/' + 'vibration.js';
        // open and send a synchronous request
        xhrObj.open('GET', src, false);
        xhrObj.send('');
        // add the returned content to a newly created script tag
        var se = document.createElement('script');
        se.type = "text/javascript";
        eval(xhrObj.responseText);
        //se.text = xhrObj.responseText;
        //document.getElementsByTagName('head')[0].appendChild(se);

    //var script = document.createElement('script');
    //script.type = 'text/javascript';
    //script.charset = 'utf-8';
    //script.onload = function() {
    //    alert("cordova_plugins.js loaded");
    //};
    //script.src = 'TestCordova/' + get_device_type() + '/' + 'cordova_plugins.js';
    //document.head.appendChild(script);
  }catch(e) {
    alert(e);
  }
}