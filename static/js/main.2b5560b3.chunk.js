(this["webpackJsonprestaurant-review-site"]=this["webpackJsonprestaurant-review-site"]||[]).push([[0],{14:function(e,a,t){e.exports=t(26)},22:function(e,a,t){},26:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(11),c=t.n(l),s=t(6),i=t(12),o=(t(22),t(13)),m=t(7),u=t(3),d=t(2),p=t(4),g=t(8),f=t.n(g),E=function(e,a){return Array.from({length:a-e},(function(a,t){return t+e}))},v=function(e){var a,t=arguments;return f.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:2,n.abrupt("return",new Promise((function(t,n){var r=(e.size/1e6).toFixed(3);if(r<a){var l=new FileReader;l.onload=function(){return t(l.result)},l.onerror=function(){return n()},l.onabort=function(){return n()},l.readAsDataURL(e)}else window.alert("Your file has ".concat(r,"mb. The max is ").concat(a,"mb. Please try again with another file.")),n()})));case 2:case"end":return n.stop()}}))},b=function(){return f.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){"geolocation"in window.navigator?window.navigator.geolocation.getCurrentPosition((function(a){var t=a.coords,n=t.latitude,r=t.longitude;e(new window.google.maps.LatLng(n,r))}),(function(){return a()}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0}):a()})));case 1:case"end":return e.stop()}}))},h=function(e,a){return f.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){e.nearbySearch({location:a,radius:500,type:["restaurant"],fields:["formatted_address"]},(function(e,a){switch(a){case window.google.maps.places.PlacesServiceStatus.OK:t(x(e));break;default:t({})}}),(function(){return n()}))})));case 1:case"end":return t.stop()}}))},N=function(e,a){return f.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){Object.prototype.hasOwnProperty.call(window.places,a)?t(window.places[a]):e.getDetails({placeId:a,fields:["place_id","name","type","reviews","user_ratings_total","formatted_address","photos","international_phone_number","url","rating","geometry","vicinity","website"]},(function(e,r){r===window.google.maps.places.PlacesServiceStatus.OK?(window.places[a]=w(e),t(window.places[a])):n()}))})));case 1:case"end":return t.stop()}}))},w=function(e){var a=e.place_id,t=void 0===a?"":a,n=e.name,r=void 0===n?"":n,l=e.photos,c=void 0===l?[{getUrl:function(){return null}}]:l,s=e.types,i=void 0===s?[]:s,o=e.rating,m=void 0===o?0:o,u=e.user_ratings_total,d=void 0===u?0:u,p=e.geometry.location,g=e.international_phone_number,f=void 0===g?"":g,E=e.opening_hours,v=(E=void 0===E?{}:E).isOpen,b=void 0===v?function(){return!0}:v,h=e.website,N=void 0===h?"":h,w=e.vicinity,x=void 0===w?"":w,O=e.formatted_address,S=void 0===O?"":O,j=e.reviews,k=void 0===j?[]:j,C=e.url,T=void 0===C?"":C;return{id:t,cover:c[0].getUrl({maxWidth:570,maxHeight:260}),types:i.slice(-8).map((function(e){return e.replace(/_/g," ")})),phoneNumber:f,gmap:T,address:S||x,ratings:d,reviews:y(A(k)),rating:m,isOpen:b,website:N,name:r,location:p}},x=function(e){return e.reduce((function(e,a){return e[a.place_id]=w(a),e}),{})},A=function(e){return e.map((function(e){return function(e){var a=e.profile_photo_url,t=e.author_name,n=e.text,r=e.time;return{date:new Date(1e3*r),avatar:a,author:t,comment:n}}(e)}))},y=function(e){return e.sort((function(e,a){return a.date.getTime()-e.date.getTime()}))},O=function(e,a,t,n){return Object.values(e).filter((function(e){var r=e.name,l=e.rating;return r.toLowerCase().includes(a.toLowerCase())&&l>=t&&l<=n}))},S=function(e){return e.sort((function(e,a){return a.rating-e.rating}))},j=function(){},k=function(e){return window.encodeURIComponent(e)},C=function(){return((new Date).getTime()*Math.random()).toString(32).replace(".","")},T=function(){return Object.values(window.markers).forEach((function(e){return e.setMap(null)}))},_=function(e){var a,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:150,n=function(){for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];window.clearTimeout(a),a=window.setTimeout((function(){return e.apply(void 0,r)}),t)};return n},I=t(5);var R=function(e){var a=e.className,t=void 0===a?"":a,n=e.children,l=Object(I.a)(e,["className","children"]),c=r.a.useRef(null);return r.a.useEffect((function(){return c.current.scrollTo(0,0)}),[]),r.a.createElement("div",Object.assign({ref:c,className:"relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll ".concat(t)},l),n)};var L=function(e){var a=e.query,t=e.children,n=r.a.useState(!0),l=Object(d.a)(n,2),c=l[0],s=l[1],i=r.a.useState(""),o=Object(d.a)(i,2),m=o[0],u=o[1],p=r.a.useState(null),g=Object(d.a)(p,2),f=g[0],E=g[1],v=r.a.useCallback((function(){a().then((function(e){return E(e)})).catch((function(e){return u(e)})).finally((function(){return s(!1)}))}),[a]);return r.a.useEffect((function(){return v()}),[v]),r.a.createElement(r.a.Fragment,null,t({loading:c,error:m,data:f,refetch:v}))};var z=function(e){var a=e.className,t=e.children,n=Object(I.a)(e,["className","children"]);return r.a.createElement("span",Object.assign({className:"inline-block text-xs capitalize tracking-wide font-semibold px-2 rounded-lg ".concat(a)},n),t)};var D=function(e){var a=e.className,t=e.children,n=Object(I.a)(e,["className","children"]);return r.a.createElement(z,Object.assign({className:"bg-blue-200 text-blue-800 ".concat(a)},n),t)};var M=function(e){var a=e.className,t=e.children,n=Object(I.a)(e,["className","children"]);return r.a.createElement(z,Object.assign({className:"bg-purple-200 text-purple-800 ".concat(a)},n),t)};function F(e){var a=e.tags;return r.a.createElement("div",null,a.map((function(e){return r.a.createElement(M,{key:"place-tag-".concat(e),className:"mr-2"},e)})))}var P=function(e){var a=e.name,t=void 0===a?"":a,n=e.cover,l=void 0===n?"":n,c=e.rating,s=void 0===c?0:c,i=e.ratings,o=void 0===i?0:i,m=e.types,u=void 0===m?[]:m,d=e.handleClick,p=void 0===d?function(){}:d,g=Object(I.a)(e,["name","cover","rating","ratings","types","handleClick"]);return r.a.createElement("div",Object.assign({role:"button",tabIndex:"0",className:"flex p-3 -mx-3 my-2 rounded hover:shadow-md focus:shadow-md",onKeyDown:function(e){e.persist()," "!==e.key&&"Enter"!==e.key&&"Spacebar"!==e.key||p(e)},onClick:function(e){e.persist(),p(e)}},g),r.a.createElement("div",{className:"w-32 min-w-32 h-32"},l?r.a.createElement("img",{alt:"cover",className:"w-32 h-32 object-cover bg-gray-200 rounded",src:l}):r.a.createElement("div",{className:"flex items-center justify-center w-32 h-32 bg-gray-200 rounded"},r.a.createElement("span",{className:"uppercase text-lg font-bold"},t.charAt(0)))),r.a.createElement("div",{className:"flex flex-col items-start flex-1 pl-4"},r.a.createElement("div",{className:"flex items-start mb-2"},r.a.createElement(D,{className:"mr-2"},s.toFixed(1)||"New"),r.a.createElement("span",{className:"inline-block text-lg font-bold leading-none text-gray-900"},t)),r.a.createElement(F,{tags:u}),r.a.createElement("div",{className:"text-xs font-bold text-gray-600 mt-auto"},o>0?"".concat(o," ratings"):"Without ratings")))};var U=function(e){var a=e.className;return r.a.createElement("div",{className:"h-px my-8 bg-gray-300 ".concat(a)})};var q=function(e){var a=e.avatar,t=e.author,n=e.date,l=e.comment;return r.a.createElement("div",{className:"mb-8"},r.a.createElement("div",{className:"flex items-center"},r.a.createElement("div",{className:"w-12 h-12"},r.a.createElement("img",{className:"w-12 h-12 object-fit rounded-full",alt:t,src:a})),r.a.createElement("div",{className:"ml-2"},r.a.createElement("div",{className:"text-sm leading-snug font-bold text-gray-900"},t),r.a.createElement("div",{className:"text-sm leading-snug text-gray-600"},n))),r.a.createElement("div",{className:"my-4"},r.a.createElement("div",{dir:"ltr",className:"text-base text-gray-900"},l)))};function W(e){var a=e.name,t=k(a);return r.a.createElement("div",{className:"w-full h-64 bg-gray-200 rounded"},r.a.createElement("iframe",{title:"Map",width:"100%",height:"256",frameBorder:"0",className:"h-full h-64 b-0",src:"https://www.google.com/maps/embed/v1/place?key=".concat("AIzaSyD5_tW7XIWdolzRoZE0f6OUF7P9zP5Aav8","&q=").concat(t),allowFullScreen:!0}))}function G(e){var a=e.children;return r.a.createElement("table",{className:"table-fixed w-full mt-6"},r.a.createElement("tbody",null,a))}function H(e){var a=e.icon,t=e.action,n=e.children;return r.a.createElement("tr",null,r.a.createElement("td",{className:"w-6 pr-2 py-2 align-top"},r.a.createElement(p.a,{icon:a})),r.a.createElement("td",{className:"w-6/12 py-2 align-top"},n),r.a.createElement("td",{className:"w-6/12 py-2 text-right align-top"},t||r.a.createElement(r.a.Fragment,null,"\xa0")))}var J=function(e){var a=e.name,t=e.address,n=e.gmap,l=e.phoneNumber,c=e.website,s=e.isOpenNow,i=e.types;return r.a.createElement("div",{className:"w-full"},r.a.createElement(W,{name:a}),r.a.createElement(G,null,r.a.createElement(H,{icon:"map-marker",action:n?r.a.createElement("a",{rel:"noopener noreferrer",className:"text-sm text-indigo-600 no-underline hover:underline",href:n,target:"_blank"},"Get directions"):null},r.a.createElement("span",{className:"text-sm text-gray-900"},t)),l.length>0&&r.a.createElement(H,{icon:"phone-alt",action:r.a.createElement("a",{rel:"noopener noreferrer",className:"text-sm text-indigo-600 no-underline hover:underline",href:"tel:".concat(l.replace(/ /g,"")),target:"_blank"},"Call")},r.a.createElement("span",{className:"text-sm text-gray-900"},l)),c.length>0&&r.a.createElement(H,{icon:"globe"},r.a.createElement("a",{rel:"noopener noreferrer",className:"text-sm text-indigo-600 break-all no-underline hover:underline",href:c,target:"_blank"},c.indexOf("facebook")>-1?"facebook.com":c)),r.a.createElement(H,{icon:"clock"},r.a.createElement("span",{className:"text-sm text-gray-900"},"".concat(s?"Open":"Closed now"))),r.a.createElement(H,{icon:"utensils"},r.a.createElement("span",{className:"text-sm capitalize text-gray-900"},i.join(", ")))))};var B=function(e){var a=e.place,t=void 0===a?null:a,n=e.handleDissmis,l=void 0===n?function(){}:n,c=e.handleClickAddReview,s=void 0===c?function(){}:c;return r.a.createElement("div",{className:"w-full"},r.a.createElement("header",null,r.a.createElement("nav",{className:"flex items-center absolute top-0 right-0 p-6"},r.a.createElement("div",{className:"flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none",role:"button",tabIndex:"0",onKeyDown:function(e){e.persist()," "!==e.key&&"Enter"!==e.key&&"Spacebar"!==e.key||(e.preventDefault(),l(e))},onClick:function(e){e.persist(),l(e)}},r.a.createElement(p.a,{className:"text-gray-900",icon:"times"}))),r.a.createElement("div",{className:"mb-8"},t.cover?r.a.createElement("img",{className:"w-full h-64 object-cover bg-gray-200",alt:"cover",src:t.cover}):r.a.createElement("div",{className:"w-full h-64 object-cover bg-gray-200"})),r.a.createElement("div",{className:"px-6"},r.a.createElement("div",{className:"m-0"},r.a.createElement("span",{className:"text-xs uppercase font-bold text-gray-600"},"Restaurant")),r.a.createElement("div",{className:"mt-2"},r.a.createElement("div",{className:"text-4xl font-bold leading-none text-gray-900 my-2"},t.name),r.a.createElement("div",{className:"mt-2"},r.a.createElement("span",{className:"text-sm"},t.ratings," ratings"))))),r.a.createElement("main",{className:"mb-6"},r.a.createElement(U,{className:"mx-6"}),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement(J,{name:t.name,address:t.address,phoneNumber:t.phoneNumber,types:t.types,gmap:t.gmap,website:t.website,isOpenNow:t.isOpen()}))),r.a.createElement(U,{className:"mx-6"}),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement("header",{className:"mb-6"},r.a.createElement("span",{className:"text-2xl font-bold"},"Reviews")),t.reviews.length>0?r.a.createElement(r.a.Fragment,null,t.reviews.map((function(e,a){return r.a.createElement(q,{key:"review-".concat(a),avatar:e.avatar,author:e.author,date:e.date.toUTCString(),comment:e.comment})}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mb-4"},r.a.createElement("div",{className:"text-2xl font-bold text-center"},"No Reviews, yet."),r.a.createElement("div",{className:"text-center"},"No reviews yet in this restaurant! Start adding a new review."))))),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement("button",{className:"w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg",onClick:function(e){e.persist(),s(e)}},"Add Review")))))};function K(){return r.a.createElement("div",{className:"mb-8"},r.a.createElement("div",{className:"flex items-center"},r.a.createElement("div",{className:"w-12 h-12"},r.a.createElement("div",{className:"w-12 h-12 bg-gray-200 rounded-full"})),r.a.createElement("div",{className:"ml-2"},r.a.createElement("div",{className:"text-sm leading-snug font-bold w-20 bg-gray-400"},"\xa0"),r.a.createElement("div",{className:"text-sm leading-snug w-48 bg-gray-400"},"\xa0"))),r.a.createElement("div",{className:"my-4"},r.a.createElement("div",{dir:"ltr",className:"text-base w-full h-20 bg-gray-400"},"\xa0")))}function X(e){var a=e.children;return r.a.createElement("table",{className:"w-full mt-6"},r.a.createElement("tbody",null,a))}function Y(e){var a=e.icon,t=e.action,n=e.children;return r.a.createElement("tr",null,r.a.createElement("td",{className:"w-6 pr-2 py-2 align-top"},r.a.createElement(p.a,{icon:a})),r.a.createElement("td",{className:"w-6/12 py-2 align-top"},n),r.a.createElement("td",{className:"py-2 text-right align-top"},t))}function Z(){return r.a.createElement("div",{className:"w-full"},r.a.createElement("div",{className:"w-full h-64 bg-gray-200 rounded"}),r.a.createElement(X,null,r.a.createElement(Y,{icon:"map-marker",action:r.a.createElement("div",{className:"text-sm inline-block w-24 bg-gray-400"},"\xa0")},r.a.createElement("div",{className:"text-sm w-full h-20 bg-gray-400"},"\xa0")),r.a.createElement(Y,{icon:"phone-alt",action:r.a.createElement("div",{className:"text-sm inline-block w-16 bg-gray-400"},"\xa0")},r.a.createElement("div",{className:"text-sm w-40 bg-gray-400"},"\xa0")),r.a.createElement(Y,{icon:"globe"},r.a.createElement("div",{className:"text-sm w-24 bg-gray-400"},"\xa0")),r.a.createElement(Y,{icon:"clock"},r.a.createElement("div",{className:"text-sm w-24 bg-gray-400"},"\xa0")),r.a.createElement(Y,{icon:"utensils"},r.a.createElement("div",{className:"text-sm capitalize w-24 bg-gray-400"},"\xa0"))))}var V=function(){return r.a.createElement("div",{className:"w-full"},r.a.createElement("header",null,r.a.createElement("nav",{className:"flex items-center absolute top-0 right-0 p-6"},r.a.createElement("div",{className:"flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none",role:"button",tabIndex:"0"},r.a.createElement(p.a,{className:"text-gray-900",icon:"times"}))),r.a.createElement("div",{className:"mb-8"},r.a.createElement("div",{className:"w-full h-64 bg-gray-100"})),r.a.createElement("div",{className:"px-6"},r.a.createElement("div",{className:"m-0"},r.a.createElement("div",{className:"text-xs uppercase font-bold w-24 bg-gray-400"},"\xa0")),r.a.createElement("div",{className:"mt-2"},r.a.createElement("div",{className:"text-4xl font-bold leading-none my-2 w-full bg-gray-400"},"\xa0"),r.a.createElement("div",{className:"mt-2"},r.a.createElement("div",{className:"text-sm w-20 bg-gray-400"},"\xa0"))))),r.a.createElement("main",{className:"mb-6"},r.a.createElement(U,{className:"mx-6"}),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement(Z,null))),r.a.createElement(U,{className:"mx-6"}),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement("header",{className:"mb-6"},r.a.createElement("div",{className:"text-2xl font-bold w-32 bg-gray-400"},"\xa0")),r.a.createElement(K,null))),r.a.createElement("section",null,r.a.createElement("div",{className:"mx-6"},r.a.createElement("button",{className:"w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg"},"\xa0")))))},Q={name:"",cover:"",location:{lat:"",lng:""},phoneNumber:"",website:"",address:"",gmap:null,isOpen:function(){return!0},rating:0,ratings:0,reviews:[],types:["restaurant"]};var $=function(e){var a=e.location,t=e.handleSubmit,n=e.handleCancel,l=r.a.useReducer((function(e,a){switch(a.type){case"RESET":return Q;case"SET_COVER":return Object(u.a)({},e,{cover:a.payload});case"SET_NAME":return Object(u.a)({},e,{name:a.payload});case"SET_PHONE_NUMBER":return Object(u.a)({},e,{phoneNumber:a.payload});case"SET_WEBSITE":return Object(u.a)({},e,{website:a.payload});case"SET_ADDRESS":return Object(u.a)({},e,{address:a.payload});case"SET_LOCATION":return Object(u.a)({},e,{location:a.payload});case"SET_LOCATION_LATITUDE":return Object(u.a)({},e,{location:Object(u.a)({},e.location,{lat:a.payload})});case"SET_LOCATION_LONGITUDE":return Object(u.a)({},e,{location:Object(u.a)({},e.location,{lng:a.payload})});default:return e}}),Q),c=Object(d.a)(l,2),s=c[0],i=c[1];r.a.useEffect((function(){i({type:"SET_LOCATION",payload:a})}),[a]);var o=r.a.useCallback((function(e){return"Escape"===e.key&&n(e)}),[n]);return r.a.useEffect((function(){return window.addEventListener("keydown",o),function(){window.removeEventListener("keydown",o)}}),[o]),r.a.createElement("div",{className:"bg-white rounded-lg overflow-hidden"},r.a.createElement("form",{onSubmit:function(e){e.persist();var a=Object(u.a)({},s,{id:C()});t(e,a)}},r.a.createElement("div",{className:"relative bg-indigo-400 h-64"},r.a.createElement("label",{className:"absolute inset-0"},s.cover?r.a.createElement("img",{className:"w-full h-full object-fit",alt:s.name,src:s.cover}):r.a.createElement("div",{className:"flex flex-col items-center justify-center relative w-full h-full"},r.a.createElement(p.a,{icon:"image",color:"#fff",size:"8x"}),r.a.createElement("div",{className:"inline-block px-4 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-lg"},"Add a preview image"),r.a.createElement("input",{className:"absolute inset-0 opacity-0 cursor-pointer z-10",type:"file",name:"cover",accept:"image/png, image/jpeg",placeholder:"Cover",onChange:function(e){v(e.target.files[0]).then((function(e){return i({type:"SET_COVER",payload:e})})).catch(j)},required:!0})))),r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Name"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"What is the name of the restaurant?",value:s.name,onChange:function(e){i({type:"SET_NAME",payload:e.target.value})},required:!0}))),r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Location"),r.a.createElement("div",{className:"flex mt-1"},r.a.createElement("div",{className:"w-6/12"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Latitude",value:s.location.lat,onChange:function(e){i({type:"SET_LOCATION_LATITUDE",payload:e.target.value})},required:!0})),r.a.createElement("div",{className:"w-6/12"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Longitude",value:s.location.lng,onChange:function(e){i({type:"SET_LOCATION_LONGITUDE",payload:e.target.value})},required:!0})))),r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Phone Number"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Phone Number",value:s.phoneNumber,onChange:function(e){i({type:"SET_PHONE_NUMBER",payload:e.target.value})}}))),r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Website"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Website",value:s.website,onChange:function(e){i({type:"SET_WEBSITE",payload:e.target.value})}}))),r.a.createElement("div",{className:"px-4 pt-4 pb-2"},r.a.createElement("div",{className:"text-xs leading-none"},"Address"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Entrer the address of the restaurant",value:s.address,onChange:function(e){i({type:"SET_ADDRESS",payload:e.target.value})},required:!0}))),r.a.createElement("div",{className:"p-4 bg-gray-100"},r.a.createElement("div",{className:"flex justify-end"},r.a.createElement("button",{className:"px-4 py-2 text-sm font-semibold text-indigo-600 rounded",type:"button",onClick:function(e){e.persist(),i({type:"RESET"}),n(e)}},"Cancel"),r.a.createElement("button",{className:"px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded",type:"submit"},"Send")))))},ee=["https://lh6.ggpht.com/-jaAm1eO765Q/AAAAAAAAAAI/AAAAAAAAAAA/HfmyBFH1UZs/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh4.ggpht.com/-Cu-MPkJG_4Y/AAAAAAAAAAI/AAAAAAAAAAA/DX_BrEbhVuQ/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh5.ggpht.com/-hgFk-liXn3A/AAAAAAAAAAI/AAAAAAAAAAA/A16JG3gJSpU/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh5.ggpht.com/-HsotJk0cfrw/AAAAAAAAAAI/AAAAAAAAAAA/z3atZ66qn0A/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh3.ggpht.com/-KmajRHZh-sw/AAAAAAAAAAI/AAAAAAAAAAA/MCXjoNGSZO0/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh4.ggpht.com/-rImN8nsM2fY/AAAAAAAAAAI/AAAAAAAAAAA/iL9CadC9kXw/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh5.ggpht.com/-xeAcqbCc1fs/AAAAAAAAAAI/AAAAAAAAAAA/g9V9J9JSvos/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh3.ggpht.com/-sSicK12N2DM/AAAAAAAAAAI/AAAAAAAAAAA/vXSAqNet4Ag/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh3.ggpht.com/-iy8gIz3zJYY/AAAAAAAAAAI/AAAAAAAAAAA/zzUjb0ENeaw/s128-c0x00000000-cc-rp-mo/photo.jpg","https://lh3.ggpht.com/-hReL3evr7Wg/AAAAAAAAAAI/AAAAAAAAAAA/fjuD5e2zxv8/s128-c0x00000000-cc-rp-mo/photo.jpg"],ae={avatar:"",rating:1,author:"",comment:""},te=function(e){return e[Math.floor(Math.random()*(e.length-1))]};var ne=function(e){var a=e.handleSubmit,t=e.handleCancel,n=r.a.useReducer((function(e,a){switch(a.type){case"SET_RATING":return Object(u.a)({},e,{rating:a.payload});case"SET_AUTHOR":return Object(u.a)({},e,{author:a.payload});case"SET_COMMENT":return Object(u.a)({},e,{comment:a.payload});case"RESET":return ae;default:return e}}),ae),l=Object(d.a)(n,2),c=l[0],s=l[1],i=r.a.useCallback((function(e){return"Escape"===e.key&&t(e)}),[t]);return r.a.useEffect((function(){return window.addEventListener("keydown",i),function(){window.removeEventListener("keydown",i)}}),[i]),r.a.createElement("div",{className:"bg-white rounded-lg overflow-hidden"},r.a.createElement("form",{onSubmit:function(e){e.persist();var t=Object(u.a)({},c,{avatar:te(ee),date:new Date});a(e,t)}},r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Rating"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("div",{className:"flex justify-around py-1"},r.a.createElement("label",{role:"button",tabIndex:"0",className:"cursor-pointer"},r.a.createElement(p.a,{className:1===c.rating?"text-gray-900":"text-gray-600",icon:"angry",size:"3x"}),r.a.createElement("input",{className:"hidden",type:"radio",name:"rating",value:"1",checked:1===c.rating,onChange:function(e){s({type:"SET_RATING",payload:+e.target.value})}})),r.a.createElement("label",{role:"button",tabIndex:"0",className:"cursor-pointer"},r.a.createElement(p.a,{className:2===c.rating?"text-gray-900":"text-gray-600",icon:"frown",size:"3x"}),r.a.createElement("input",{className:"hidden",type:"radio",name:"rating",value:"2",checked:2===c.rating,onChange:function(e){s({type:"SET_RATING",payload:+e.target.value})}})),r.a.createElement("label",{role:"button",tabIndex:"0",className:"cursor-pointer"},r.a.createElement(p.a,{className:3===c.rating?"text-gray-900":"text-gray-600",icon:"meh",size:"3x"}),r.a.createElement("input",{className:"hidden",type:"radio",name:"rating",value:"3",checked:3===c.rating,onChange:function(e){s({type:"SET_RATING",payload:+e.target.value})}})),r.a.createElement("label",{role:"button",tabIndex:"0",className:"cursor-pointer"},r.a.createElement(p.a,{className:4===c.rating?"text-gray-900":"text-gray-600",icon:"smile",size:"3x"}),r.a.createElement("input",{className:"hidden",type:"radio",name:"rating",value:"4",checked:4===c.rating,onChange:function(e){s({type:"SET_RATING",payload:+e.target.value})}})),r.a.createElement("label",{role:"button",tabIndex:"0",className:"cursor-pointer"},r.a.createElement(p.a,{className:5===c.rating?"text-gray-900":"text-gray-600",icon:"laugh",size:"3x"}),r.a.createElement("input",{className:"hidden",type:"radio",name:"rating",value:"5",checked:5===c.rating,onChange:function(e){s({type:"SET_RATING",payload:+e.target.value})}}))))),r.a.createElement("div",{className:"px-4 pt-4 pb-2 border-b"},r.a.createElement("div",{className:"text-xs leading-none"},"Name"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("input",{className:"w-full py-1",type:"text",placeholder:"Enter your name",value:c.author,onChange:function(e){s({type:"SET_AUTHOR",payload:e.target.value})}}))),r.a.createElement("div",{className:"px-4 pt-4 pb-2"},r.a.createElement("div",{className:"text-xs leading-none"},"Comment"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("textarea",{className:"w-full py-1",type:"text",rows:"4",placeholder:"Write a comment about your experience",value:c.comment,onChange:function(e){s({type:"SET_COMMENT",payload:e.target.value})}}))),r.a.createElement("div",{className:"p-4 bg-gray-100"},r.a.createElement("div",{className:"flex justify-end"},r.a.createElement("button",{className:"px-4 py-2 text-sm font-semibold text-indigo-600 rounded",type:"button",onClick:function(e){e.persist(),s({type:"RESET"}),t(e)}},"Cancel"),r.a.createElement("button",{className:"px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded",type:"submit"},"Send")))))};window.places={},window.markers={};var re=function(){var e=r.a.useState(""),a=Object(d.a)(e,2),t=a[0],n=a[1],l=r.a.useState(new window.google.maps.LatLng(0,0)),c=Object(d.a)(l,2),s=c[0],i=c[1],g=r.a.useState(null),f=Object(d.a)(g,2),v=f[0],w=f[1],x=r.a.useState({}),A=Object(d.a)(x,2),y=A[0],k=A[1],C=r.a.useState(null),I=Object(d.a)(C,2),z=I[0],D=I[1],M=r.a.useState(null),F=Object(d.a)(M,2),U=F[0],q=F[1],W=r.a.useState(null),G=Object(d.a)(W,2),H=G[0],J=G[1],K=r.a.useState(0),X=Object(d.a)(K,2),Y=X[0],Z=X[1],Q=r.a.useState(5),ee=Object(d.a)(Q,2),ae=ee[0],te=ee[1],re=r.a.useState(!1),le=Object(d.a)(re,2),ce=le[0],se=le[1],ie=r.a.useState(!1),oe=Object(d.a)(ie,2),me=oe[0],ue=oe[1],de=r.a.useState({lat:0,lng:0}),pe=Object(d.a)(de,2),ge=pe[0],fe=pe[1],Ee=!!z,ve=r.a.useRef(),be=r.a.useCallback((function(){return N(H,z)}),[H,z]);r.a.useEffect((function(){var e=new window.google.maps.Map(ve.current,{center:new window.google.maps.LatLng(0,0),zoom:16,fullscreenControl:!1,mapTypeControl:!1,gestureHandling:"cooperative"}),a=new window.google.maps.places.PlacesService(e);e.addListener("click",(function(e){fe(e.latLng.toJSON()),ue(!0)})),e.addListener("bounds_changed",_((function(){return i(e.getCenter())}))),q(e),J(a)}),[]),r.a.useEffect((function(){b().then((function(e){return w(e)})).catch(j)}),[]),r.a.useEffect((function(){U&&v&&(new window.google.maps.Marker({map:U,position:v,icon:{url:"images/marker.png",scaledSize:{width:32,height:48},labelOrigin:{x:16,y:18}},label:"\ud83d\ude0a"}),i(v))}),[U,v]),r.a.useEffect((function(){U&&U.setCenter(s)}),[U,s]),r.a.useEffect((function(){H&&h(H,s).then((function(e){return k(e)})).catch(j)}),[H,s]),r.a.useEffect((function(){z&&(Object.prototype.hasOwnProperty.call(y,z)||D(null))}),[y,z]),r.a.useEffect((function(){if(U){T();var e=Object.values(y).reduce((function(e,a){var t=a.location,n=a.id,r=a.rating,l=new window.google.maps.Marker({map:U,position:t,icon:{url:"images/marker.png",scaledSize:{width:32,height:48},labelOrigin:{x:16,y:18}},label:{fontFamily:'"Montserrat", sans-serif',fontWeight:"600",fontSize:"12px",color:"#fff",text:r>0?r.toFixed(1):"N"}});return l.addListener("click",(function(){return D(n)})),e[n]=l,e}),{});window.markers=e}}),[U,y]);var he=r.a.useMemo((function(){return S(O(y,t,Y,ae))}),[y,t,Y,ae]),Ne=r.a.useCallback((function(e){e.preventDefault();var a=e.target.nextSibling,t=e.target.previousSibling;switch(e.key){case"ArrowUp":case"ArrowLeft":t&&t.focus();break;case"ArrowDown":case"ArrowRight":a&&a.focus()}}),[]);return r.a.createElement("div",{className:"absolute inset-0"},r.a.createElement("div",{className:"flex relative w-full h-full overflow-hidden"},r.a.createElement("div",{className:"flex-initial relative w-full max-w-xl h-full shadow-xl z-50"},r.a.createElement("div",{className:"flex flex-col w-full h-full"},r.a.createElement("header",{className:"flex-none"},r.a.createElement("nav",{className:"flex py-4 border-b"},r.a.createElement("div",{className:"w-full px-6"},r.a.createElement("form",null,r.a.createElement("div",{className:"flex items-center h-12 shadow-md rounded"},r.a.createElement("label",{className:"w-full",htmlFor:"query"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"flex flex-initial w-10 h-10 items-center justify-center cursor-pointer",role:"button",tabIndex:"0"},r.a.createElement(p.a,{className:"text-gray-900",icon:"search"})),r.a.createElement("input",{id:"query",className:"flex-auto h-10 font-bold text-gray-900 placeholder-gray-600 rounded",name:"query",value:t,placeholder:"Search a Restaurant",onChange:function(e){return n(e.target.value)}}),t.length>0&&r.a.createElement("div",{className:"flex flex-initial w-10 h-10 items-center justify-center cursor-pointer",tabIndex:"0",role:"button",onKeyDown:function(e){" "!==e.key&&"Enter"!==e.key&&"Spacebar"!==e.key||(e.preventDefault(),n(""))},onClick:function(){return n("")}},r.a.createElement(p.a,{className:"text-gray-900",icon:"times"}))))),r.a.createElement("div",{className:"flex mt-3"},r.a.createElement("div",{className:"flex-1"},r.a.createElement("select",{className:"w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appearance-none rounded",value:Y,onChange:function(e){return Z(+e.target.value)}},r.a.createElement("option",{key:"min-rating-option-0",value:"0"},"New"),E(1,5).map((function(e){return r.a.createElement("option",{key:"min-rating-option-".concat(e),value:e},e," (Star",e>1?"s":"",")")})))),r.a.createElement("div",{className:"flex items-center justify-center w-12"},r.a.createElement("span",{className:"font-bold"},"\u2bc8")),r.a.createElement("div",{className:"flex-1"},r.a.createElement("select",{className:"w-full h-12 px-4 font-bold text-gray-900 bg-gray-200 shadow-inner appearance-none rounded",value:ae,onChange:function(e){return te(+e.target.value)}},E(Y+1,6).map((function(e){return r.a.createElement("option",{key:"max-rating-option-".concat(e),value:e},e," (Star",e>1?"s":"",")")}))))))))),r.a.createElement("div",{className:"flex-1 relative max-h-full"},r.a.createElement("div",{className:"absolute inset-0"},r.a.createElement("div",{className:"relative w-full h-full max-h-full overflow-x-hidden overflow-y-scroll"},r.a.createElement("main",{className:"p-6",onKeyDown:function(e){e.persist(),Ne(e)}},he.length>0?r.a.createElement(r.a.Fragment,null,he.map((function(e){return r.a.createElement(P,{key:e.id,id:e.id,name:e.name,cover:e.cover,types:e.types,rating:e.rating,ratings:e.ratings,handleClick:function(a){a.preventDefault(),D(e.id)}})}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex items-center justify-center mb-6"},r.a.createElement(p.a,{className:"text-purple-400",icon:"sad-tear",size:"5x"})),r.a.createElement("div",{className:"text-2xl font-bold text-gray-900 text-center"},"No Results!"),r.a.createElement("div",{className:"text-gray-700 text-center"},"Sorry there are no results for this search. Please try again.")))))))),Ee&&r.a.createElement(L,{query:be},(function(e){var a=e.loading,t=e.error,n=e.data,l=e.refetch;return r.a.createElement(r.a.Fragment,null,a?r.a.createElement("div",{className:"absolute left-xl w-full max-w-lg h-screen bg-white z-10"},r.a.createElement(R,{key:z},r.a.createElement(V,null))):r.a.createElement(r.a.Fragment,null,t.length>0?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{role:"dialog",tabIndex:"0",className:"absolute left-xl w-full max-w-lg h-screen bg-white z-10"},r.a.createElement(R,{key:z},r.a.createElement(B,{place:n,handleDissmis:function(){return D(null)},handleClickAddReview:function(){return se(!0)}}))),ce&&r.a.createElement("div",{className:"absolute left-xl w-full max-w-lg h-screen z-20"},r.a.createElement("div",{className:"absolute inset-0 bg-black opacity-50 -z-1"}),r.a.createElement("div",{className:"p-6"},r.a.createElement(ne,{handleSubmit:function(e,a){e.preventDefault(),function(e,a){var t=[e].concat(Object(o.a)(a.reviews)),n=a.rating?(a.ratings*a.rating+e.rating)/(a.ratings+1):e.rating,r=a.ratings+1;window.places[a.id]=Object(u.a)({},a,{rating:n,ratings:r,reviews:t}),window.markers[a.id].setLabel(n.toString()),k((function(e){return Object(u.a)({},e,Object(m.a)({},a.id,window.places[a.id]))})),se(!1)}(a,n),l()},handleCancel:function(){return se(!1)}}))))))})),me&&r.a.createElement("div",{className:"absolute left-xl w-full max-w-lg h-screen z-20"},r.a.createElement("div",{className:"absolute inset-0 bg-black opacity-50 -z-1"}),r.a.createElement("div",{className:"p-6"},r.a.createElement($,{handleSubmit:function(e,a){var t;e.preventDefault(),t=a,window.places[t.id]=t,k((function(e){return Object(u.a)({},e,Object(m.a)({},t.id,window.places[t.id]))})),ue(!1)},handleCancel:function(){return ue(!1)},location:ge}))),r.a.createElement("div",{className:"flex-auto relative"},r.a.createElement("div",{ref:ve,className:"absolute inset-0"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.b.add(i.a),c.a.render(r.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.2b5560b3.chunk.js.map