/*! leaflet-routing-machine - v2.3.0 - 2015-03-18 */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(b.L||(b.L={})).Routing=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){function c(a,b,c){function d(a){return a>=200&&300>a||304===a}function e(){void 0===h.status||d(h.status)?b.call(h,null,h):b.call(h,h,null)}var f=!1;if("undefined"==typeof window.XMLHttpRequest)return b(Error("Browser not supported"));if("undefined"==typeof c){var g=a.match(/^\s*https?:\/\/[^\/]*/);c=g&&g[0]!==location.protocol+"//"+location.domain+(location.port?":"+location.port:"")}var h=new window.XMLHttpRequest;if(c&&!("withCredentials"in h)){h=new window.XDomainRequest;var i=b;b=function(){if(f)i.apply(this,arguments);else{var a=this,b=arguments;setTimeout(function(){i.apply(a,b)},0)}}}return"onload"in h?h.onload=e:h.onreadystatechange=function(){4===h.readyState&&e()},h.onerror=function(a){b.call(this,a||!0,null),b=function(){}},h.onprogress=function(){},h.ontimeout=function(a){b.call(this,a,null),b=function(){}},h.onabort=function(a){b.call(this,a,null),b=function(){}},h.open("GET",a,!0),h.send(null),f=!0,h}"undefined"!=typeof b&&(b.exports=c)},{}],2:[function(a,b){function c(a,b){a=Math.round(a*b),a<<=1,0>a&&(a=~a);for(var c="";a>=32;)c+=String.fromCharCode((32|31&a)+63),a>>=5;return c+=String.fromCharCode(a+63)}var d={};d.decode=function(a,b){for(var c,d,e=0,f=0,g=0,h=[],i=0,j=0,k=null,l=Math.pow(10,b||5);e<a.length;){k=null,i=0,j=0;do k=a.charCodeAt(e++)-63,j|=(31&k)<<i,i+=5;while(k>=32);c=1&j?~(j>>1):j>>1,i=j=0;do k=a.charCodeAt(e++)-63,j|=(31&k)<<i,i+=5;while(k>=32);d=1&j?~(j>>1):j>>1,f+=c,g+=d,h.push([f/l,g/l])}return h},d.encode=function(a,b){if(!a.length)return"";for(var d=Math.pow(10,b||5),e=c(a[0][0],d)+c(a[0][1],d),f=1;f<a.length;f++){var g=a[f],h=a[f-1];e+=c(g[0]-h[0],d),e+=c(g[1]-h[1],d)}return e},void 0!==typeof b&&(b.exports=d)},{}],3:[function(){!function(){"use strict";L.Routing=L.Routing||{},L.Routing.Autocomplete=L.Class.extend({options:{timeout:500,blurTimeout:100,noResultsMessage:"No results found."},initialize:function(a,b,c,d){L.setOptions(this,d),this._elem=a,this._resultFn=d.resultFn?L.Util.bind(d.resultFn,d.resultContext):null,this._autocomplete=d.autocompleteFn?L.Util.bind(d.autocompleteFn,d.autocompleteContext):null,this._selectFn=L.Util.bind(b,c),this._container=L.DomUtil.create("div","leaflet-routing-geocoder-result"),this._resultTable=L.DomUtil.create("table","",this._container),L.DomEvent.addListener(this._elem,"input",this._keyPressed,this),L.DomEvent.addListener(this._elem,"keypress",this._keyPressed,this),L.DomEvent.addListener(this._elem,"keydown",this._keyDown,this),L.DomEvent.addListener(this._elem,"blur",function(){this._isOpen&&this.close()},this)},close:function(){L.DomUtil.removeClass(this._container,"leaflet-routing-geocoder-result-open"),this._isOpen=!1},_open:function(){var a=this._elem.getBoundingClientRect();this._container.parentElement||(this._container.style.left=a.left+window.scrollX+"px",this._container.style.top=a.bottom+window.scrollY+"px",this._container.style.width=a.right-a.left+"px",document.body.appendChild(this._container)),L.DomUtil.addClass(this._container,"leaflet-routing-geocoder-result-open"),this._isOpen=!0},_setResults:function(a){var b,c,d,e;for(delete this._selection,this._results=a;this._resultTable.firstChild;)this._resultTable.removeChild(this._resultTable.firstChild);for(b=0;b<a.length;b++)c=L.DomUtil.create("tr","",this._resultTable),c.setAttribute("data-result-index",b),d=L.DomUtil.create("td","",c),e=document.createTextNode(a[b].name),d.appendChild(e),L.DomEvent.addListener(d,"mousedown",L.DomEvent.preventDefault),L.DomEvent.addListener(d,"click",this._createClickListener(a[b]));b||(c=L.DomUtil.create("tr","",this._resultTable),d=L.DomUtil.create("td","leaflet-routing-geocoder-no-results",c),d.innerHTML=this.options.noResultsMessage),this._open(),a.length>0&&this._select(1)},_createClickListener:function(a){var b=this._resultSelected(a);return L.bind(function(){this._elem.blur(),b()},this)},_resultSelected:function(a){return L.bind(function(){this.close(),this._elem.value=a.name,this._lastCompletedText=a.name,this._selectFn(a)},this)},_keyPressed:function(a){var b;return this._isOpen&&13===a.keyCode&&this._selection?(b=parseInt(this._selection.getAttribute("data-result-index"),10),this._resultSelected(this._results[b])(),void L.DomEvent.preventDefault(a)):13===a.keyCode?void this._complete(this._resultFn,!0):this._autocomplete&&document.activeElement===this._elem?(this._timer&&clearTimeout(this._timer),void(this._timer=setTimeout(L.Util.bind(function(){this._complete(this._autocomplete)},this),this.options.timeout))):void this._unselect()},_select:function(a){var b=this._selection;b&&(L.DomUtil.removeClass(b.firstChild,"leaflet-routing-geocoder-selected"),b=b[a>0?"nextSibling":"previousSibling"]),b||(b=this._resultTable[a>0?"firstChild":"lastChild"]),b&&(L.DomUtil.addClass(b.firstChild,"leaflet-routing-geocoder-selected"),this._selection=b)},_unselect:function(){this._selection&&L.DomUtil.removeClass(this._selection.firstChild,"leaflet-routing-geocoder-selected"),delete this._selection},_keyDown:function(a){if(this._isOpen)switch(a.keyCode){case 27:return this.close(),void L.DomEvent.preventDefault(a);case 38:return this._select(-1),void L.DomEvent.preventDefault(a);case 40:return this._select(1),void L.DomEvent.preventDefault(a)}},_complete:function(a,b){function c(a){this._lastCompletedText=d,b&&1===a.length?this._resultSelected(a[0])():this._setResults(a)}var d=this._elem.value;d&&(d!==this._lastCompletedText?a(d,c,this):b&&c.call(this,this._results))}})}()},{}],4:[function(a,b){(function(c){!function(){"use strict";var d="undefined"!=typeof window?window.L:"undefined"!=typeof c?c.L:null;d.Routing=d.Routing||{},d.extend(d.Routing,a("./L.Routing.Itinerary")),d.extend(d.Routing,a("./L.Routing.Line")),d.extend(d.Routing,a("./L.Routing.Plan")),d.extend(d.Routing,a("./L.Routing.OSRM")),d.Routing.Control=d.Routing.Itinerary.extend({options:{fitSelectedRoutes:"smart",routeLine:function(a,b){return d.Routing.line(a,b)},autoRoute:!0,routeWhileDragging:!1,routeDragInterval:500,waypointMode:"connect",useZoomParameter:!1},initialize:function(a){d.Util.setOptions(this,a),this._router=this.options.router||new d.Routing.OSRM(a),this._plan=this.options.plan||d.Routing.plan(this.options.waypoints,a),this._requestCount=0,d.Routing.Itinerary.prototype.initialize.call(this,a),this.on("routeselected",this._routeSelected,this),this._plan.on("waypointschanged",this._onWaypointsChanged,this),a.routeWhileDragging&&this._setupRouteDragging(),this.options.autoRoute&&this.route()},onAdd:function(a){var b=d.Routing.Itinerary.prototype.onAdd.call(this,a);return this._map=a,this._map.addLayer(this._plan),this.options.useZoomParameter&&this._map.on("zoomend",function(){this.route({callback:d.bind(this._updateLineCallback,this)})},this),this._plan.options.geocoder&&b.insertBefore(this._plan.createGeocoders(),b.firstChild),b},onRemove:function(a){return this._line&&a.removeLayer(this._line),a.removeLayer(this._plan),d.Routing.Itinerary.prototype.onRemove.call(this,a)},getWaypoints:function(){return this._plan.getWaypoints()},setWaypoints:function(a){return this._plan.setWaypoints(a),this},spliceWaypoints:function(){var a=this._plan.spliceWaypoints.apply(this._plan,arguments);return a},getPlan:function(){return this._plan},getRouter:function(){return this._router},_routeSelected:function(a){var b=a.route,c=this.options.fitSelectedRoutes,d="smart"===c&&!this._waypointsVisible()||"smart"!==c&&c;this._updateLine(b),d&&this._map.fitBounds(this._line.getBounds()),"snap"===this.options.waypointMode&&(this._plan.off("waypointschanged",this._onWaypointsChanged,this),this.setWaypoints(b.waypoints),this._plan.on("waypointschanged",this._onWaypointsChanged,this))},_waypointsVisible:function(){var a,b,c,e,f,g=this.getWaypoints();try{for(a=this._map.getSize(),e=0;e<g.length;e++)f=this._map.latLngToLayerPoint(g[e].latLng),b?b.extend(f):b=d.bounds([f]);return c=b.getSize(),(c.x>a.x/5||c.y>a.y/5)&&this._waypointsInViewport()}catch(h){return!1}},_waypointsInViewport:function(){var a,b,c=this.getWaypoints();try{a=this._map.getBounds()}catch(d){return!1}for(b=0;b<c.length;b++)if(a.contains(c[b].latLng))return!0;return!1},_updateLine:function(a){var b=void 0!==this.options.addWaypoints?this.options.addWaypoints:!0;this._clearLine(),this._line=this.options.routeLine(a,d.extend({addWaypoints:b,extendToWaypoints:"connect"===this.options.waypointMode},this.options.lineOptions)),this._line.addTo(this._map),this._hookEvents(this._line)},_hookEvents:function(a){a.on("linetouched",function(a){this._plan.dragNewWaypoint(a)},this)},_onWaypointsChanged:function(a){this.options.autoRoute&&this.route({}),this._plan.isReady()||(this._clearLine(),this._clearAlts()),this.fire("waypointschanged",{waypoints:a.waypoints})},_setupRouteDragging:function(){var a,b=0;this._plan.on("waypointdrag",d.bind(function(c){a=c.waypoints,b||(b=setTimeout(d.bind(function(){this.route({waypoints:a,geometryOnly:!0,callback:d.bind(this._updateLineCallback,this)}),b=void 0},this),this.options.routeDragInterval))},this)),this._plan.on("waypointdragend",function(){b&&(clearTimeout(b),b=void 0),this.route()},this)},_updateLineCallback:function(a,b){a||this._updateLine(b[0])},route:function(a){var b,c=++this._requestCount;a=a||{},this._plan.isReady()&&(this.options.useZoomParameter&&(a.z=this._map&&this._map.getZoom()),b=a&&a.waypoints||this._plan.getWaypoints(),this.fire("routingstart",{waypoints:b}),this._router.route(b,a.callback||function(d,e){if(c===this._requestCount){if(this._clearLine(),this._clearAlts(),d)return void this.fire("routingerror",{error:d});a.geometryOnly?this._routeSelected({route:e[0]}):(this.fire("routesfound",{waypoints:b,routes:e}),this.setAlternatives(e))}},this,a))},_clearLine:function(){this._line&&(this._map.removeLayer(this._line),delete this._line)}}),d.Routing.control=function(a){return new d.Routing.Control(a)},b.exports=d.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./L.Routing.Itinerary":6,"./L.Routing.Line":8,"./L.Routing.OSRM":10,"./L.Routing.Plan":11}],5:[function(a,b){(function(c){!function(){"use strict";var d="undefined"!=typeof window?window.L:"undefined"!=typeof c?c.L:null;d.Routing=d.Routing||{},d.extend(d.Routing,a("./L.Routing.Localization")),d.Routing.Formatter=d.Class.extend({options:{units:"metric",unitNames:{meters:"m",kilometers:"km",yards:"yd",miles:"mi",hours:"h",minutes:"mín",seconds:"s"},language:"en",roundingSensitivity:1,distanceTemplate:"{value} {unit}"},initialize:function(a){d.setOptions(this,a)},formatDistance:function(a){var b,c,e=this.options.unitNames;return"imperial"===this.options.units?(a/=1.609344,c=a>=1e3?{value:this._round(a)/1e3,unit:e.miles}:{value:this._round(a/1.76),unit:e.yards}):(b=this._round(a),c={value:b>=1e3?b/1e3:b,unit:b>=1e3?e.kilometers:e.meters}),d.Util.template(this.options.distanceTemplate,c)},_round:function(a){var b=Math.pow(10,(Math.floor(a/this.options.roundingSensitivity)+"").length-1),c=Math.floor(a/b),d=c>5?b:b/2;return Math.round(a/d)*d},formatTime:function(a){return a>86400?Math.round(a/3600)+" h":a>3600?Math.floor(a/3600)+" h "+Math.round(a%3600/60)+" min":a>300?Math.round(a/60)+" min":a>60?Math.floor(a/60)+" min"+(a%60!==0?" "+a%60+" s":""):a+" s"},formatInstruction:function(a,b){return void 0===a.text?d.Util.template(this._getInstructionTemplate(a,b),d.extend({exitStr:a.exit?d.Routing.Localization[this.options.language].formatOrder(a.exit):"",dir:d.Routing.Localization[this.options.language].directions[a.direction]},a)):a.text},getIconName:function(a,b){switch(a.type){case"Straight":return 0===b?"depart":"continue";case"SlightRight":return"bear-right";case"Right":return"turn-right";case"SharpRight":return"sharp-right";case"TurnAround":return"u-turn";case"SharpLeft":return"sharp-left";case"Left":return"turn-left";case"SlightLeft":return"bear-left";case"WaypointReached":return"via";case"Roundabout":return"enter-roundabout";case"DestinationReached":return"arrive"}},_getInstructionTemplate:function(a,b){var c="Straight"===a.type?0===b?"Head":"Continue":a.type,e=d.Routing.Localization[this.options.language].instructions[c];return e[0]+(e.length>1&&a.road?e[1]:"")}}),b.exports=d.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./L.Routing.Localization":9}],6:[function(a,b){(function(c){!function(){"use strict";var d="undefined"!=typeof window?window.L:"undefined"!=typeof c?c.L:null;d.Routing=d.Routing||{},d.extend(d.Routing,a("./L.Routing.Formatter")),d.extend(d.Routing,a("./L.Routing.ItineraryBuilder")),d.Routing.Itinerary=d.Control.extend({includes:d.Mixin.Events,options:{pointMarkerStyle:{radius:5,color:"#03f",fillColor:"white",opacity:1,fillOpacity:.7},summaryTemplate:"<h2>{name}</h2><h3>{distance}, {time}</h3>",timeTemplate:"{time}",containerClassName:"",alternativeClassName:"",minimizedClassName:"",itineraryClassName:"",show:!0,collapsible:void 0},initialize:function(a){d.setOptions(this,a),this._formatter=this.options.formatter||new d.Routing.Formatter(this.options),this._itineraryBuilder=this.options.itineraryBuilder||new d.Routing.ItineraryBuilder({containerClassName:this.options.itineraryClassName})},onAdd:function(a){var b,c=this.options.collapsible;return c=c||void 0===c&&a.getSize().x<=640,this._container=d.DomUtil.create("div","leaflet-routing-container leaflet-bar "+(this.options.show?"":"leaflet-routing-container-hide ")+(c?"leaflet-routing-collapsible ":"")+this.options.containerClassName),this._altContainer=this.createAlternativesContainer(),this._container.appendChild(this._altContainer),d.DomEvent.disableClickPropagation(this._container),d.DomEvent.addListener(this._container,"mousewheel",function(a){d.DomEvent.stopPropagation(a)}),c&&(b=d.DomUtil.create("span","leaflet-routing-collapse-btn"),d.DomEvent.on(b,"click",this._toggle,this),this._container.insertBefore(b,this._container.firstChild)),this._container},onRemove:function(){},createAlternativesContainer:function(){return d.DomUtil.create("div","leaflet-routing-alternatives-container")},setAlternatives:function(a){var b,c,d;for(this._clearAlts(),this._routes=a,b=0;b<this._routes.length;b++)c=this._routes[b],d=this._createAlternative(c,b),this._altContainer.appendChild(d),this._altElements.push(d);return this.fire("routeselected",{route:this._routes[0]}),this},show:function(){d.DomUtil.removeClass(this._container,"leaflet-routing-container-hide")},hide:function(){d.DomUtil.addClass(this._container,"leaflet-routing-container-hide")},_toggle:function(){var a=d.DomUtil.hasClass(this._container,"leaflet-routing-container-hide");this[a?"show":"hide"]()},_createAlternative:function(a,b){var c=d.DomUtil.create("div","leaflet-routing-alt "+this.options.alternativeClassName+(b>0?" leaflet-routing-alt-minimized "+this.options.minimizedClassName:"")),e=this.options.summaryTemplate,f=d.extend({name:a.name,distance:this._formatter.formatDistance(a.summary.totalDistance),time:this._formatter.formatTime(a.summary.totalTime)},a);return c.innerHTML="function"==typeof e?e(f):d.Util.template(e,f),d.DomEvent.addListener(c,"click",this._onAltClicked,this),c.appendChild(this._createItineraryContainer(a)),c},_clearAlts:function(){for(var a=this._altContainer;a&&a.firstChild;)a.removeChild(a.firstChild);this._altElements=[]},_createItineraryContainer:function(a){var b,c,d,e,f,g,h=this._itineraryBuilder.createContainer(),i=this._itineraryBuilder.createStepsContainer();for(h.appendChild(i),b=0;b<a.instructions.length;b++)c=a.instructions[b],f=this._formatter.formatInstruction(c,b),e=this._formatter.formatDistance(c.distance),g=this._formatter.getIconName(c,b),d=this._itineraryBuilder.createStep(f,e,g,i),this._addRowListeners(d,a.coordinates[c.index]);return h},_addRowListeners:function(a,b){var c,e=this;d.DomEvent.addListener(a,"mouseover",function(){c=d.circleMarker(b,e.options.pointMarkerStyle).addTo(e._map)}),d.DomEvent.addListener(a,"mouseout",function(){c&&(e._map.removeLayer(c),c=null)}),d.DomEvent.addListener(a,"click",function(a){e._map.panTo(b),d.DomEvent.stopPropagation(a)})},_onAltClicked:function(a){var b,c,e,f,g;for(b=a.target||window.event.srcElement;!d.DomUtil.hasClass(b,"leaflet-routing-alt");)b=b.parentElement;if(d.DomUtil.hasClass(b,"leaflet-routing-alt-minimized"))for(c=0;c<this._altElements.length;c++)e=this._altElements[c],f=b===e,g=f?"removeClass":"addClass",d.DomUtil[g](e,"leaflet-routing-alt-minimized"),this.options.minimizedClassName&&d.DomUtil[g](e,this.options.minimizedClassName),f?this.fire("routeselected",{route:this._routes[c]}):e.scrollTop=0;d.DomEvent.stop(a)}}),d.Routing.itinerary=function(a){return new d.Routing.Itinerary(a)},b.exports=d.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./L.Routing.Formatter":5,"./L.Routing.ItineraryBuilder":7}],7:[function(a,b){(function(a){!function(){"use strict";var c="undefined"!=typeof window?window.L:"undefined"!=typeof a?a.L:null;c.Routing=c.Routing||{},c.Routing.ItineraryBuilder=c.Class.extend({options:{containerClassName:""},initialize:function(a){c.setOptions(this,a)},createContainer:function(a){var b=c.DomUtil.create("table",a||""),d=c.DomUtil.create("colgroup","",b);return c.DomUtil.create("col","leaflet-routing-instruction-icon",d),c.DomUtil.create("col","leaflet-routing-instruction-text",d),c.DomUtil.create("col","leaflet-routing-instruction-distance",d),b},createStepsContainer:function(){return c.DomUtil.create("tbody","")},createStep:function(a,b,d,e){var f,g,h=c.DomUtil.create("tr","",e);return g=c.DomUtil.create("td","",h),f=c.DomUtil.create("span","leaflet-routing-icon leaflet-routing-icon-"+d,g),g.appendChild(f),g=c.DomUtil.create("td","",h),g.appendChild(document.createTextNode(a)),g=c.DomUtil.create("td","",h),g.appendChild(document.createTextNode(b)),h}}),b.exports=c.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(a,b){(function(a){!function(){"use strict";var c="undefined"!=typeof window?window.L:"undefined"!=typeof a?a.L:null;c.Routing=c.Routing||{},c.Routing.Line=c.LayerGroup.extend({includes:c.Mixin.Events,options:{styles:[{color:"black",opacity:.15,weight:9},{color:"white",opacity:.8,weight:6},{color:"red",opacity:1,weight:2}],missingRouteStyles:[{color:"black",opacity:.15,weight:7},{color:"white",opacity:.6,weight:4},{color:"gray",opacity:.8,weight:2,dashArray:"7,12"}],addWaypoints:!0,extendToWaypoints:!0,missingRouteTolerance:10},initialize:function(a,b){c.setOptions(this,b),c.LayerGroup.prototype.initialize.call(this,b),this._route=a,this.options.extendToWaypoints&&this._extendToWaypoints(),this._addSegment(a.coordinates,this.options.styles,this.options.addWaypoints)},addTo:function(a){return a.addLayer(this),this},getBounds:function(){return c.latLngBounds(this._route.coordinates)},_findWaypointIndices:function(){var a,b=this._route.inputWaypoints,c=[];for(a=0;a<b.length;a++)c.push(this._findClosestRoutePoint(b[a].latLng));return c},_findClosestRoutePoint:function(a){var b,c,d,e=Number.MAX_VALUE;for(c=this._route.coordinates.length-1;c>=0;c--)d=a.distanceTo(this._route.coordinates[c]),e>d&&(b=c,e=d);return b},_extendToWaypoints:function(){var a,b,d,e=this._route.inputWaypoints,f=this._getWaypointIndices();for(a=0;a<e.length;a++)b=e[a].latLng,d=c.latLng(this._route.coordinates[f[a]]),b.distanceTo(d)>this.options.missingRouteTolerance&&this._addSegment([b,d],this.options.missingRouteStyles)},_addSegment:function(a,b,d){var e,f;for(e=0;e<b.length;e++)f=c.polyline(a,b[e]),this.addLayer(f),d&&f.on("mousedown",this._onLineTouched,this)},_findNearestWpBefore:function(a){for(var b=this._getWaypointIndices(),c=b.length-1;c>=0&&b[c]>a;)c--;return c},_onLineTouched:function(a){var b=this._findNearestWpBefore(this._findClosestRoutePoint(a.latlng));this.fire("linetouched",{afterIndex:b,latlng:a.latlng})},_getWaypointIndices:function(){return this._wpIndices||(this._wpIndices=this._route.waypointIndices||this._findWaypointIndices()),this._wpIndices}}),c.Routing.line=function(a,b){return new c.Routing.Line(a,b)},b.exports=c.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(a,b){!function(){"use strict";L.Routing=L.Routing||{},L.Routing.Localization={en:{directions:{N:"north",NE:"northeast",E:"east",SE:"southeast",S:"south",SW:"southwest",W:"west",NW:"northwest"},instructions:{Head:["Head {dir}"," on {road}"],Continue:["Continue {dir}"," on {road}"],SlightRight:["Slight right"," onto {road}"],Right:["Right"," onto {road}"],SharpRight:["Sharp right"," onto {road}"],TurnAround:["Turn around"],SharpLeft:["Sharp left"," onto {road}"],Left:["Left"," onto {road}"],SlightLeft:["Slight left"," onto {road}"],WaypointReached:["Waypoint reached"],Roundabout:["Take the {exitStr} exit in the roundabout"," onto {road}"],DestinationReached:["Destination reached"]},formatOrder:function(a){var b=a%10-1,c=["st","nd","rd"];return c[b]?a+c[b]:a+"th"}},de:{directions:{N:"Norden",NE:"Nordosten",E:"Osten",SE:"Südosten",S:"Süden",SW:"Südwesten",W:"Westen",NW:"Nordwesten"},instructions:{Head:["Richtung {dir}"," auf {road}"],Continue:["Geradeaus Richtung {dir}"," auf {road}"],SlightRight:["Leicht rechts abbiegen"," auf {road}"],Right:["Rechts abbiegen"," auf {road}"],SharpRight:["Scharf rechts abbiegen"," auf {road}"],TurnAround:["Wenden"],SharpLeft:["Scharf links abbiegen"," auf {road}"],Left:["Links abbiegen"," auf {road}"],SlightLeft:["Leicht links abbiegen"," auf {road}"],WaypointReached:["Zwischenhalt erreicht"],Roundabout:["Nehmen Sie die {exitStr} Ausfahrt im Kreisverkehr"," auf {road}"],DestinationReached:["Sie haben ihr Ziel erreicht"]},formatOrder:function(a){return a+"."}},sv:{directions:{N:"norr",NE:"nordost",E:"öst",SE:"sydost",S:"syd",SW:"sydväst",W:"väst",NW:"nordväst"},instructions:{Head:["Åk åt {dir}"," på {road}"],Continue:["Fortsätt {dir}"," på {road}"],SlightRight:["Svagt höger"," på {road}"],Right:["Sväng höger"," på {road}"],SharpRight:["Skarpt höger"," på {road}"],TurnAround:["Vänd"],SharpLeft:["Skarpt vänster"," på {road}"],Left:["Sväng vänster"," på {road}"],SlightLeft:["Svagt vänster"," på {road}"],WaypointReached:["Viapunkt nådd"],Roundabout:["Tag {exitStr} avfarten i rondellen"," till {road}"],DestinationReached:["Framme vid resans mål"]},formatOrder:function(a){return["första","andra","tredje","fjärde","femte","sjätte","sjunde","åttonde","nionde","tionde"][a-1]}},sp:{directions:{N:"norte",NE:"noreste",E:"este",SE:"sureste",S:"sur",SW:"suroeste",W:"oeste",NW:"noroeste"},instructions:{Head:["Derecho {dir}"," sobre {road}"],Continue:["Continuar {dir}"," en {road}"],SlightRight:["Leve giro a la derecha"," sobre {road}"],Right:["Derecha"," sobre {road}"],SharpRight:["Giro pronunciado a la derecha"," sobre {road}"],TurnAround:["Dar vuelta"],SharpLeft:["Giro pronunciado a la izquierda"," sobre {road}"],Left:["Izquierda"," en {road}"],SlightLeft:["Leve giro a la izquierda"," en {road}"],WaypointReached:["Llegó a un punto del camino"],Roundabout:["Tomar {exitStr} salida en la rotonda"," en {road}"],DestinationReached:["Llegada a destino"]},formatOrder:function(a){return a+"º"}},nl:{directions:{N:"noordelijke",NE:"noordoostelijke",E:"oostelijke",SE:"zuidoostelijke",S:"zuidelijke",SW:"zuidewestelijke",W:"westelijke",NW:"noordwestelijke"},instructions:{Head:["Vertrek in {dir} richting"," de {road} op"],Continue:["Ga in {dir} richting"," de {road} op"],SlightRight:["Volg de weg naar rechts"," de {road} op"],Right:["Ga rechtsaf"," de {road} op"],SharpRight:["Ga scherpe bocht naar rechts"," de {road} op"],TurnAround:["Keer om"],SharpLeft:["Ga scherpe bocht naar links"," de {road} op"],Left:["Ga linksaf"," de {road} op"],SlightLeft:["Volg de weg naar links"," de {road} op"],WaypointReached:["Aangekomen bij tussenpunt"],Roundabout:["Neem de {exitStr} afslag op de rotonde"," de {road} op"],DestinationReached:["Aangekomen op eindpunt"]},formatOrder:function(a){return 1==a||a>=20?a+"ste":a+"de"}},fr:{directions:{N:"nord",NE:"nord-est",E:"est",SE:"sud-est",S:"sud",SW:"sud-ouest",W:"ouest",NW:"nord-ouest"},instructions:{Head:["Tout droit au {dir}"," sur {road}"],Continue:["Continuer au {dir}"," sur {road}"],SlightRight:["Légèrement à droite"," sur {road}"],Right:["A droite"," sur {road}"],SharpRight:["Complètement à droite"," sur {road}"],TurnAround:["Faire demi-tour"],SharpLeft:["Complètement à gauche"," sur {road}"],Left:["A gauche"," sur {road}"],SlightLeft:["Légèrement à gauche"," sur {road}"],WaypointReached:["Point d'étape atteint"],Roundabout:["Au rond-point, prenez la {exitStr} sortie"," sur {road}"],DestinationReached:["Destination atteinte"]},formatOrder:function(a){return a+"º"}}},b.exports=L.Routing}()},{}],10:[function(a,b){(function(c){!function(){"use strict";var d="undefined"!=typeof window?window.L:"undefined"!=typeof c?c.L:null,e=a("corslite"),f=a("polyline");d.Routing=d.Routing||{},d.extend(d.Routing,a("./L.Routing.Waypoint")),d.Routing.OSRM=d.Class.extend({options:{serviceUrl:"//router.project-osrm.org/viaroute",timeout:3e4},initialize:function(a){d.Util.setOptions(this,a),this._hints={locations:{}}},route:function(a,b,c,f){var g,h,i,j,k=!1,l=[];for(f=f||{},g=this.buildRouteUrl(a,f),h=setTimeout(function(){k=!0,b.call(c||b,{status:-1,message:"OSRM request timed out."})},this.options.timeout),j=0;j<a.length;j++)i=a[j],l.push(new d.Routing.Waypoint(i.latLng,i.name,i.options));return e(g,d.bind(function(a,d){var e;clearTimeout(h),k||(a?b.call(c||b,{status:-1,message:"HTTP request failed: "+a}):(e=JSON.parse(d.responseText),this._routeDone(e,l,b,c)))},this)),this},_routeDone:function(a,b,c,d){var e,g,h,i;if(d=d||c,0!==a.status)return void c.call(d,{status:a.status,message:a.status_message});if(e=f.decode(a.route_geometry,6),h=this._toWaypoints(b,a.via_points),g=[{name:a.route_name.join(", "),coordinates:e,instructions:a.route_instructions?this._convertInstructions(a.route_instructions):[],summary:a.route_summary?this._convertSummary(a.route_summary):[],inputWaypoints:b,waypoints:h,waypointIndices:this._clampIndices(a.via_indices,e)}],a.alternative_geometries)for(i=0;i<a.alternative_geometries.length;i++)e=f.decode(a.alternative_geometries[i],6),g.push({name:a.alternative_names[i].join(", "),coordinates:e,instructions:a.alternative_instructions[i]?this._convertInstructions(a.alternative_instructions[i]):[],summary:a.alternative_summaries[i]?this._convertSummary(a.alternative_summaries[i]):[],inputWaypoints:b,waypoints:h,waypointIndices:this._clampIndices(1===a.alternative_geometries.length?a.alternative_indices:a.alternative_indices[i],e)});a.hint_data&&this._saveHintData(a.hint_data,b),c.call(d,null,g)},_toWaypoints:function(a,b){var c,e=[];for(c=0;c<b.length;c++)e.push(d.Routing.waypoint(d.latLng(b[c]),a[c].name,a[c].options));return e},buildRouteUrl:function(a,b){for(var c,d,e,f,g,h=[],i=0;i<a.length;i++)c=a[i],f=this._locationKey(c.latLng),h.push("loc="+f),g=this._hints.locations[f],g&&h.push("hint="+g),c.options&&c.options.allowUTurn&&h.push("u=true");return e=d=!(b&&b.geometryOnly),this.options.serviceUrl+"?instructions="+d+"&alt="+e+"&"+(b.z?"z="+b.z+"&":"")+h.join("&")+(void 0!==this._hints.checksum?"&checksum="+this._hints.checksum:"")+(b.fileformat?"&output="+b.fileformat:"")+(b.allowUTurns?"&uturns="+b.allowUTurns:"")},_locationKey:function(a){return a.lat+","+a.lng},_saveHintData:function(a,b){var c;this._hints={checksum:a.checksum,locations:{}};for(var d=a.locations.length-1;d>=0;d--)c=b[d].latLng,this._hints.locations[this._locationKey(c)]=a.locations[d]},_decode:function(a,b){var c=a.length,d=0,e=0,f=0,g=[];for(b=Math.pow(10,-b);c>d;){var h,i=0,j=0;do h=a.charCodeAt(d++)-63,j|=(31&h)<<i,i+=5;while(h>=32);var k=1&j?~(j>>1):j>>1;e+=k,i=0,j=0;do h=a.charCodeAt(d++)-63,j|=(31&h)<<i,i+=5;while(h>=32);var l=1&j?~(j>>1):j>>1;f+=l,g.push([e*b,f*b])}return g},_convertSummary:function(a){return{totalDistance:a.total_distance,totalTime:a.total_time}},_convertInstructions:function(a){var b,c,d,e,f=[];for(b=0;b<a.length;b++)c=a[b],d=this._drivingDirectionType(c[0]),e=c[0].split("-"),d&&f.push({type:d,distance:c[2],time:c[4],road:c[1],direction:c[6],exit:e.length>1?e[1]:void 0,index:c[3]});return f},_drivingDirectionType:function(a){switch(parseInt(a,10)){case 1:return"Straight";case 2:return"SlightRight";case 3:return"Right";case 4:return"SharpRight";case 5:return"TurnAround";case 6:return"SharpLeft";case 7:return"Left";case 8:return"SlightLeft";case 9:return"WaypointReached";case 10:return"Straight";case 11:case 12:return"Roundabout";case 15:return"DestinationReached";default:return null}},_clampIndices:function(a,b){var c,d=b.length-1;for(c=0;c<a.length;c++)a[c]=Math.min(d,Math.max(a[c],0))}}),d.Routing.osrm=function(a){return new d.Routing.OSRM(a)},b.exports=d.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./L.Routing.Waypoint":12,corslite:1,polyline:2}],11:[function(a,b){(function(c){!function(){"use strict";function d(a){a.setSelectionRange?a.setSelectionRange(0,9999):a.select()}var e="undefined"!=typeof window?window.L:"undefined"!=typeof c?c.L:null;e.Routing=e.Routing||{},e.extend(e.Routing,a("./L.Routing.Autocomplete")),e.extend(e.Routing,a("./L.Routing.Waypoint")),e.Routing.Plan=e.Class.extend({includes:e.Mixin.Events,options:{dragStyles:[{color:"black",opacity:.15,weight:9},{color:"white",opacity:.8,weight:6},{color:"red",opacity:1,weight:2,dashArray:"7,12"}],draggableWaypoints:!0,routeWhileDragging:!1,addWaypoints:!0,reverseWaypoints:!1,addButtonClassName:"",maxGeocoderTolerance:200,autocompleteOptions:{},geocodersClassName:"",geocoderPlaceholder:function(a,b){return 0===a?"Start":b-1>a?"Via "+a:"End"},geocoderClass:function(){return""},createGeocoder:function(){var a=e.DomUtil.create("div","leaflet-routing-geocoder"),b=e.DomUtil.create("input","",a),c=e.DomUtil.create("span","leaflet-routing-remove-waypoint",a);return{container:a,input:b,closeButton:c}},createMarker:function(a,b){var c={draggable:this.draggableWaypoints},d=e.marker(b.latLng,c);return d},waypointNameFallback:function(a){var b=a.lat<0?"S":"N",c=a.lng<0?"W":"E",d=(Math.round(1e4*Math.abs(a.lat))/1e4).toString(),e=(Math.round(1e4*Math.abs(a.lng))/1e4).toString();return b+d+", "+c+e}},initialize:function(a,b){e.Util.setOptions(this,b),this._waypoints=[],this.setWaypoints(a)},isReady:function(){var a;for(a=0;a<this._waypoints.length;a++)if(!this._waypoints[a].latLng)return!1;return!0},getWaypoints:function(){var a,b=[];for(a=0;a<this._waypoints.length;a++)b.push(this._waypoints[a]);return b},setWaypoints:function(a){var b=[0,this._waypoints.length].concat(a);return this.spliceWaypoints.apply(this,b),this},spliceWaypoints:function(){var a,b=[arguments[0],arguments[1]];for(a=2;a<arguments.length;a++)b.push(arguments[a]&&arguments[a].hasOwnProperty("latLng")?arguments[a]:e.Routing.waypoint(arguments[a]));for([].splice.apply(this._waypoints,b),this._updateMarkers(),this._fireChanged.apply(this,b);this._waypoints.length<2;)this.spliceWaypoints(this._waypoints.length,0,null)},onAdd:function(a){this._map=a,this._updateMarkers()},onRemove:function(){var a;

if(this._removeMarkers(),this._newWp)for(a=0;a<this._newWp.lines.length;a++)this._map.removeLayer(this._newWp.lines[a]);delete this._map},createGeocoders:function(){var a,b,c=e.DomUtil.create("div","leaflet-routing-geocoders "+this.options.geocodersClassName),d=this._waypoints;return this._geocoderContainer=c,this._geocoderElems=[],this.options.addWaypoints&&(a=e.DomUtil.create("button","leaflet-routing-add-waypoint "+this.options.addButtonClassName,c),a.setAttribute("type","button"),e.DomEvent.addListener(a,"click",function(){this.spliceWaypoints(d.length,0,null)},this)),this.options.reverseWaypoints&&(b=e.DomUtil.create("button","leaflet-routing-reverse-waypoints",c),b.setAttribute("type","button"),e.DomEvent.addListener(b,"click",function(){this._waypoints.reverse(),this.setWaypoints(this._waypoints)},this)),this._updateGeocoders(),this.on("waypointsspliced",this._updateGeocoders),c},_createGeocoder:function(a){var b=this._waypoints.length,c=this.options.createGeocoder(a,b),f=c.closeButton,g=c.input,h=this._waypoints[a];return g.setAttribute("placeholder",this.options.geocoderPlaceholder(a,b)),g.className=this.options.geocoderClass(a,b),this._updateWaypointName(a,g),g.value=h.name,e.DomEvent.addListener(g,"click",function(){d(this)},g),f&&e.DomEvent.addListener(f,"click",function(){a>0||this._waypoints.length>2?this.spliceWaypoints(a,1):this.spliceWaypoints(a,1,new e.Routing.Waypoint)},this),new e.Routing.Autocomplete(g,function(b){g.value=b.name,h.name=b.name,h.latLng=b.center,this._updateMarkers(),this._fireChanged(),this._focusGeocoder(a+1)},this,e.extend({resultFn:this.options.geocoder.geocode,resultContext:this.options.geocoder,autocompleteFn:this.options.geocoder.suggest,autocompleteContext:this.options.geocoder},this.options.autocompleteOptions)),c},_updateGeocoders:function(){var a,b,c=[];for(a=0;a<this._geocoderElems.length;a++)this._geocoderContainer.removeChild(this._geocoderElems[a].container);for(a=this._waypoints.length-1;a>=0;a--)b=this._createGeocoder(a),this._geocoderContainer.insertBefore(b.container,this._geocoderContainer.firstChild),c.push(b);this._geocoderElems=c.reverse()},_updateGeocoder:function(a,b){var c=this._waypoints[a],d=c&&c.name?c.name:"";b&&(b.value=d)},_updateWaypointName:function(a,b,c){var d,e=this._waypoints[a];e.name=e.name||"",!e.latLng||!c&&e.name||(d=this.options.waypointNameFallback(e.latLng),this.options.geocoder&&this.options.geocoder.reverse?this.options.geocoder.reverse(e.latLng,67108864,function(c){e.name=c.length>0&&c[0].center.distanceTo(e.latLng)<this.options.maxGeocoderTolerance?c[0].name:d,this._updateGeocoder(a,b)},this):e.name=d,this._updateGeocoder(a,b))},_removeMarkers:function(){var a;if(this._markers)for(a=0;a<this._markers.length;a++)this._markers[a]&&this._map.removeLayer(this._markers[a]);this._markers=[]},_updateMarkers:function(){var a,b;if(this._map)for(this._removeMarkers(),a=0;a<this._waypoints.length;a++)this._waypoints[a].latLng?(b=this.options.createMarker(a,this._waypoints[a],this._waypoints.length),b&&(b.addTo(this._map),this.options.draggableWaypoints&&this._hookWaypointEvents(b,a))):b=null,this._markers.push(b)},_fireChanged:function(){this.fire("waypointschanged",{waypoints:this.getWaypoints()}),arguments.length>=2&&this.fire("waypointsspliced",{index:Array.prototype.shift.call(arguments),nRemoved:Array.prototype.shift.call(arguments),added:arguments})},_hookWaypointEvents:function(a,b,c){var d,f,g=function(a){return c?a.latlng:a.target.getLatLng()},h=e.bind(function(a){this.fire("waypointdragstart",{index:b,latlng:g(a)})},this),i=e.bind(function(a){this._waypoints[b].latLng=g(a),this.fire("waypointdrag",{index:b,latlng:g(a)})},this),j=e.bind(function(a){this._waypoints[b].latLng=g(a),this._waypoints[b].name="",this._updateWaypointName(b,this._geocoderElems&&this._geocoderElems[b].input,!0),this.fire("waypointdragend",{index:b,latlng:g(a)}),this._fireChanged()},this);c?(d=e.bind(function(a){this._markers[b].setLatLng(a.latlng),i(a)},this),f=e.bind(function(a){this._map.dragging.enable(),this._map.off("mouseup",f),this._map.off("mousemove",d),j(a)},this),this._map.dragging.disable(),this._map.on("mousemove",d),this._map.on("mouseup",f),h({latlng:this._waypoints[b].latLng})):(a.on("dragstart",h),a.on("drag",i),a.on("dragend",j))},dragNewWaypoint:function(a){var b=a.afterIndex+1;this.options.routeWhileDragging?(this.spliceWaypoints(b,0,a.latlng),this._hookWaypointEvents(this._markers[b],b,!0)):this._dragNewWaypoint(b,a.latlng)},_dragNewWaypoint:function(a,b){var c,d=new e.Routing.Waypoint(b),f=this._waypoints[a-1],g=this._waypoints[a],h=this.options.createMarker(a,d,this._waypoints.length+1),i=[],j=e.bind(function(a){var b;for(h&&h.setLatLng(a.latlng),b=0;b<i.length;b++)i[b].spliceLatLngs(1,1,a.latlng)},this),k=e.bind(function(b){var c;for(h&&this._map.removeLayer(h),c=0;c<i.length;c++)this._map.removeLayer(i[c]);this._map.off("mousemove",j),this._map.off("mouseup",k),this.spliceWaypoints(a,0,b.latlng)},this);for(h&&h.addTo(this._map),c=0;c<this.options.dragStyles.length;c++)i.push(e.polyline([f.latLng,b,g.latLng],this.options.dragStyles[c]).addTo(this._map));this._map.on("mousemove",j),this._map.on("mouseup",k)},_focusGeocoder:function(a){var b;this._geocoderElems[a]?(b=this._geocoderElems[a].input,b.focus(),d(b)):document.activeElement.blur()}}),e.Routing.plan=function(a,b){return new e.Routing.Plan(a,b)},b.exports=e.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./L.Routing.Autocomplete":3,"./L.Routing.Waypoint":12}],12:[function(a,b){(function(a){!function(){"use strict";var c="undefined"!=typeof window?window.L:"undefined"!=typeof a?a.L:null;c.Routing=c.Routing||{},c.Routing.Waypoint=c.Class.extend({options:{allowUTurn:!1},initialize:function(a,b,d){c.Util.setOptions(this,d),this.latLng=a,this.name=b}}),c.Routing.waypoint=function(a,b,d){return new c.Routing.Waypoint(a,b,d)},b.exports=c.Routing}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[4])(4)});
