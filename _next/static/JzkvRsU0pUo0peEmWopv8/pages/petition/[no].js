(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"k6K+":function(e,t,a){"use strict";a.r(t);var n=a("yFcC"),s=a.n(n),r=a("ysqo"),o=a.n(r),i=a("mgiM"),l=a("iGRc"),c=a("ERkP"),d=a.n(c),u=a("s68/"),m=d.a.createElement,p=function(e){var t=Object(c.useRef)(),a=Object(c.useState)(),n=a[0],s=a[1],r=e.items;return Object(c.useEffect)((function(){var e=t.current;if(e){var a=e.getContext("2d"),n=Chart.helpers.color,o=new Chart(a,{data:{datasets:[{label:"",data:f(r),backgroundColor:n(u.a.green).alpha(.5).rgbString(),borderColor:u.a.green,type:"bar",pointRadius:0,fill:!1,lineTension:0,borderWidth:2}]},options:{scales:{xAxes:[{type:"time",distribution:"series",time:{tooltipFormat:"MM/DD HH:mm",displayFormats:{month:"\ud83d\udcc6 M\uc6d4",hour:"HH:mm",day:"DD"}},offset:!0,ticks:{major:{enabled:!0,fontStyle:"bold"},source:"data",autoSkip:!0,autoSkipPadding:75,maxRotation:0,sampleSize:100},afterBuildTicks:function(e,t){var a=e._majorUnit;if(t){var n=t[0],s=moment(t[0].value);n.major="minute"===a&&0===s.second()||"hour"===a&&0===s.minute()||"day"===a&&9===s.hour()||"month"===a&&s.date()<=3&&1===s.isoWeekday()||"year"===a&&0===s.month();for(var r=s.get(a),o=1;o<t.length;o++){var i=moment(t[o].value).get(a);t[o].major=i!==r,r=i}}return t}}],yAxes:[{ticks:{display:!1},gridLines:{drawBorder:!0},scaleLabel:{labelString:"\uccad\uc6d0\uc218"}}]},legend:{display:!1},tooltips:{intersect:!1,mode:"index",callbacks:{label:function(e,t){return" ".concat(e.value)}}}}});s(o)}}),[]),Object(c.useEffect)((function(){n&&r.length>0&&(n.data.datasets[0].data=f(r),n.update())}),[n,r]),m("canvas",{ref:t,id:"change-chart",width:"400",height:"200"})},f=function(e){return e.map((function(e){return{x:e.at,y:e.people}})).map((function(e,t,a){var n;return{x:e.x,y:e.y-((null===(n=a[t-1])||void 0===n?void 0:n.y)||e.y)}})).slice(1)},h=a("antP"),b=d.a.createElement,j=function(e){var t=Object(c.useRef)(),a=Object(c.useState)(),n=a[0],s=a[1],r=e.items;return Object(c.useEffect)((function(){var e=t.current;if(e){var a=e.getContext("2d"),n=Chart.helpers.color,o=x(r),i=new Chart(a,{data:{datasets:[{label:"",data:o,backgroundColor:n(u.a.blue).alpha(.5).rgbString(),borderColor:u.a.blue,type:"bar",pointRadius:0,fill:!1,lineTension:0,borderWidth:2}]},options:{scales:{xAxes:[{type:"time",distribution:"series",time:{tooltipFormat:"MM/DD HH:mm",displayFormats:{month:"\ud83d\udcc6 M\uc6d4",hour:"HH:mm",day:"DD"}},offset:!0,ticks:{major:{enabled:!0,fontStyle:"bold"},source:"data",autoSkip:!0,autoSkipPadding:75,maxRotation:0,sampleSize:100},afterBuildTicks:function(e,t){var a=e._majorUnit;if(t){var n=t[0],s=moment(t[0].value);n.major="minute"===a&&0===s.second()||"hour"===a&&0===s.minute()||"day"===a&&9===s.hour()||"month"===a&&s.date()<=3&&1===s.isoWeekday()||"year"===a&&0===s.month();for(var r=s.get(a),o=1;o<t.length;o++){var i=moment(t[o].value).get(a);t[o].major=i!==r,r=i}}return t}}],yAxes:[{ticks:{display:!1},gridLines:{drawBorder:!1},scaleLabel:{labelString:"\uccad\uc6d0\uc218"}}]},legend:{display:!1},tooltips:{intersect:!1,mode:"index",callbacks:{label:function(e,t){return" ".concat(e.value)}}}}});s(i)}}),[]),Object(c.useEffect)((function(){n&&r.length>0&&(n.data.datasets[0].data=x(r),n.update())}),[n,r]),b("canvas",{ref:t,id:"acc-chart",width:"400",height:"200"})},x=function(e){return e.map((function(e){return{y:e.people,x:e.at}})).slice(1)},v=a("jvFD"),y=a.n(v),g=a("7xIC"),k=a("cJ3w");a.d(t,"DetailPage",(function(){return S}));var w=d.a.createElement,S=function(e){var t=Object(c.useState)(!1),a=t[0],n=t[1],r=Object(c.useState)({title:"\ubd88\ub7ec \uc624\ub294 \uc911",endDate:"-",remains:"-",people:0,chart:[]}),d=r[0],u=r[1],m=d.title,f=d.people,b=d.remains,x=d.endDate,v=d.chart,S=Object(g.useRouter)().query.no;return Object(c.useEffect)((function(){S&&Object(l.a)("\n        query ($no: Int!) {\n          petition(id: $no) {\n            category\n            remains\n            endDate\n            no\n            title\n            people\n          }\n          chart(petitionId: $no) {\n            no\n            at\n            people\n          }\n        }\n      ",{no:Number(S)}).then((function(e){var t=e.petition,a=e.chart,n=t.title,s=t.people,r=t.remains,o=t.endDate;u({title:n,people:s,remains:r,endDate:o,chart:a})}))}),[S]),w("div",{className:"jsx-3066624629 page ml-auto mr-auto"},w(s.a,{id:"3066624629"},[".page.jsx-3066624629{max-width:976px;}"]),w(o.a,null,w("meta",{name:"viewport",content:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",className:"jsx-3066624629"}),w("link",{rel:"stylesheet",type:"text/css",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",className:"jsx-3066624629"}),w("link",{rel:"stylesheet",type:"text/css",href:"https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css",className:"jsx-3066624629"})),w(h.a,null),w("div",{className:"jsx-3066624629 ph3 black-70"},w("h1",{className:"jsx-3066624629 f3"},m),w("p",{className:"jsx-3066624629 flex flex-column w-100"},w("span",{className:"jsx-3066624629"},"\ud83d\ude4b\ud83c\udffb\u200d\u2640\ufe0f ",f," \uba85"),w("span",{className:"jsx-3066624629 red"},"\u23f3 ",b," \ub0a8\uc74c",w("span",{className:"jsx-3066624629 black-70"},"(",x,")"))),a&&w("div",{className:"jsx-3066624629 flex flex-column"},w("div",{className:"jsx-3066624629"},w("h5",{className:"jsx-3066624629 mv3"},"\ubcc0\ud654\uc728"),w(p,{items:v})),w("div",{className:"jsx-3066624629"},w("h5",{className:"jsx-3066624629 mv3"},"\ub204\uc801"),w(j,{items:v}))),w("p",{className:"jsx-3066624629 flex flex-column items-end mv4 tc"},w("a",{target:"_blank",href:"https://www1.president.go.kr/petitions/".concat(S),className:"jsx-3066624629 w4-ns w-50 link ph2 pv1 ba black-70"},"\uccad\uc6d0 \ud398\uc774\uc9c0\ub85c \u21e5"),w(y.a,{href:"/"},w("a",{className:"jsx-3066624629 w4-ns w-50 link ph2 pv1 ba black-70 mt1"},"\ubaa9\ub85d")))),w(k.a,null),w(i.Script,{src:"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"},w(i.Script,{src:"https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",onLoad:n})))};t.default=S},mgiM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,s=a("ERkP"),r=(n=s)&&"object"===typeof n&&"default"in n?n.default:n;const o=e=>{const[t,a]=s.useState(!1),[n,r]=s.useState(null);return s.useEffect(()=>{if("undefined"!==typeof window)if((e=>{for(const t of document.body.children)if("SCRIPT"===t.nodeName&&t.src===e)return!0;return!1})(e))a(!0);else{const t=document.createElement("script");t.addEventListener("load",()=>a(!0),{once:!0}),t.addEventListener("error",r,{once:!0}),t.src=e,document.body.appendChild(t)}},[e]),[{loaded:t,error:n}]};t.Script=e=>{const[{loaded:t,error:a}]=o(e.src);return s.useEffect(()=>{if(e.onLoad){if(t)return void e.onLoad(!0);if(a)return console.error(a),void e.onLoad(!1)}},[t,a]),t?r.createElement(r.Fragment,null,e.children):null},t.useScript=o},ygmT:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/petition/[no]",function(){return a("k6K+")}])}},[["ygmT",1,2,0,3]]]);