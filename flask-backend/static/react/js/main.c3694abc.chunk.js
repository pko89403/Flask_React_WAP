(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,a){e.exports=a(219)},131:function(e,t){},133:function(e,t){},166:function(e,t){},167:function(e,t){},213:function(e,t){},214:function(e,t){},215:function(e,t){},218:function(e,t,a){},219:function(e,t,a){"use strict";a.r(t);a(115);var n=a(1),r=a.n(n),l=a(104),c=a.n(l),o=a(35),i=a.n(o),u=a(61),s=a(18),d=a(19),h=a(21),m=a(20),p=a(22),f=a(45),v=[["Country","Popularity"]],E={colorAxis:{colors:["black"]},legend:"none"},b=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={data:v.concat(a.props.appData)},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.appData!==this.props.appData&&this.setState({data:this.state.data.concat(e.appData)})}},{key:"render",value:function(){return r.a.createElement(f.a,{chartType:"GeoChart",width:"100%",height:"5%",data:this.state.data,options:E})}}]),t}(r.a.Component),y=a(106),O=a(223),j=a(109),w=a(224),g=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={country:""},a.handleChange=function(e){a.setState(Object(y.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.onCreate(a.state),a.setState({country:""})},a.handleClear=function(e){e.preventDefault()},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement(O.a,{onSubmit:this.handleSubmit},r.a.createElement(O.a.Row,null,r.a.createElement(O.a.Label,null,"Input ingredient list"),r.a.createElement(O.a.Control,{as:"textarea",required:!0,variant:"dark",placeholder:"Tomato, Green Tea, olive oil",value:this.state.country,onChange:this.handleChange,name:"country"}),r.a.createElement(O.a.Control.Feedback,{type:"invalid"},"Please provide a valid input.")),r.a.createElement("br",null),r.a.createElement(O.a.Row,null,r.a.createElement(O.a.Group,{as:j.a},r.a.createElement(w.a,{variant:"dark",type:"submit"}," \ub4f1 \ub85d ")),r.a.createElement(O.a.Group,{as:j.a},r.a.createElement(w.a,{variant:"danger",type:"clear"}," \ucde8 \uc18c "))))}}]),t}(r.a.Component),C=a(27),D=(a(66),a(220)),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={data:null,load:!1},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.value!==this.state.value&&this.setState({data:e.value,load:!0})}},{key:"render",value:function(){var e=[["Country","Popularity"]],t="",a=[];if(!0===this.state.load){for(var n=this.state.data,l=0;l<n.length;l+=1){var c=100*n[l],o=[l.toString(),c];if(e.push(o),l%2===0){var i=r.a.createElement("tr",null,r.a.createElement("td",null,l.toString()),r.a.createElement("td",null,Math.round(100*n[l])),r.a.createElement("td",null,(l+1).toString()),r.a.createElement("td",null,Math.round(100*n[l+1])));a.push(i)}}t=r.a.createElement("div",null,r.a.createElement(f.a,{width:"100%",height:"1%",chartType:"Bar",data:e,options:{title:"Classification Result",chartArea:{width:"100%"},hAxis:{minValue:0,maxValue:100},bar:{groupWidth:"50%"},legend:{position:"none"}}}),r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Cuisine2"),r.a.createElement("th",null,"Classifiy1"),r.a.createElement("th",null,"Cuisine2"),r.a.createElement("th",null,"Classify2"))),r.a.createElement("tbody",null,a)))}return r.a.createElement("div",null,t)}}]),t}(n.Component),k=Object(C.b)(function(e){return{value:e.addReducer.list}})(S),R=a(36),_=a(112),x=a.n(_),T=a(113),P=a.n(T),A="addReducer/ADDER",I={list:[]};var L=a(221),N=a(222),G=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).classify=function(e){var t=[1,150];return R.d(function(){var n=R.c(e).pad([[t[1]-e.length,0]]);return a.state.model.predictOnBatch(R.b(n,t))}).dataSync()},a.handleCreate=function(){var e=Object(u.a)(i.a.mark(function e(t){var n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getData",{method:"POST",body:[t.country]}).then(function(e){return e.json()}).then(function(e){return e});case 2:n=e.sent,t.value=a.classify(n[0]),t.country="China",(0,a.props.adder)(t.value),r=[t.country,100*Number(t.value)],a.setState({formData:x()(a.state.formData,{$push:[r]})});case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={formData:[],model:null},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,R.a("http://127.0.0.1/model");case 3:e.t1=e.sent,e.t2={model:e.t1,loading:!0},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e;return e=null===this.state.model?r.a.createElement("container",{class:"centered"},r.a.createElement(P.a,{size:120,spinnerColor:"blue",spinnerWidth:2}),r.a.createElement("p",null,"LOADING MODEL")):r.a.createElement("div",null,r.a.createElement(L.a,null,r.a.createElement(N.a,null,r.a.createElement("h1",null,"Prediction Model by Learning Ingredient-Cuisine")),r.a.createElement(b,{appData:this.state.formData}),r.a.createElement(k,null),r.a.createElement(g,{onCreate:this.handleCreate}))),r.a.createElement("div",null,e)}}]),t}(n.Component),M=Object(C.b)(function(e){return{value:e.addReducer.list}},function(e){return{adder:function(t){return e({type:A,list:t})}}})(G);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(218);var B=a(26),V=Object(B.b)({addReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return{list:t.list};default:return e}}}),W=window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),X=Object(B.c)(V,W);c.a.render(r.a.createElement(C.a,{store:X},r.a.createElement(M,null)),document.getElementById("root"))},66:function(e,t,a){}},[[114,1,2]]]);
//# sourceMappingURL=main.c3694abc.chunk.js.map