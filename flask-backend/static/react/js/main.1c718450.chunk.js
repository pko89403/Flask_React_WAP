(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,a){e.exports=a(219)},130:function(e,t){},132:function(e,t){},165:function(e,t){},166:function(e,t){},212:function(e,t){},213:function(e,t){},214:function(e,t){},218:function(e,t,a){},219:function(e,t,a){"use strict";a.r(t);a(114);var n=a(1),r=a.n(n),l=a(104),i=a.n(l),o=a(35),c=a.n(o),u=a(61),s=a(18),d=a(19),h=a(22),m=a(20),p=a(23),f=a(45),v=a(21),b=["Brazil","England","United States","China","Philippines","France","Greece","India","Ireland","Italy","Jamaica","Japan","Korea","Mexico","Morocco","Russia","United States","Spain","Thailand","VietNam"],E=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={data:null,load:!1},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.value!==this.state.value&&this.setState({data:e.value,load:!0})}},{key:"render",value:function(){var e,t=[["Country","Popularity"]];if(!0===this.state.load)for(var a=this.state.data,n=0;n<a.length;n++){var l=100*a[n],i=[b[n],l];l>1&&t.push(i)}return e=r.a.createElement(f.a,{chartType:"GeoChart",width:"100%",height:"5%",data:t,options:{colorAxis:{colors:["#e7711c","#4374e0"]},legend:"none"}}),r.a.createElement("div",null,e)}}]),t}(r.a.Component),O=Object(v.b)(function(e){return{value:e.addReducer.list}})(E),y=a(108),g=a(223),j=a(111),C=a(224),w=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={inputTextData:""},a.handleChange=function(e){a.setState(Object(y.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.onCreate(a.state),a.setState({inputTextData:""})},a.handleClear=function(e){e.preventDefault(),a.setState({inputTextData:""})},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,{onSubmit:this.handleSubmit,onReset:this.handleClear},r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Label,null,"Input ingredient list"),r.a.createElement(g.a.Control,{as:"textarea",required:!0,variant:"dark",placeholder:"Tomato, Green Tea, olive oil",value:this.state.inputTextData,onChange:this.handleChange,name:"inputTextData"}),r.a.createElement(g.a.Control.Feedback,{type:"invalid"},"Please provide a valid input.")),r.a.createElement("br",null),r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:j.a},r.a.createElement(C.a,{variant:"dark",type:"submit"}," \ub4f1 \ub85d ")),r.a.createElement(g.a.Group,{as:j.a},r.a.createElement(C.a,{variant:"danger",type:"reset"}," \ucde8 \uc18c "))))}}]),t}(r.a.Component),S=(a(66),a(220)),k=["Brazil","United Kingdom","United States of America","China","Philippines","France","Greece","India","Ireland","Italy","Jamaica","Japan","Korea (Republic of)","Mexico","Morocco","Russia","United States of America","Spain","Thailand","VietNam"],x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={data:null,load:!1},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.value!==this.state.value&&this.setState({data:e.value,load:!0})}},{key:"render",value:function(){var e=[["Country","Popularity"]],t="",a=[];if(!0===this.state.load){for(var n=this.state.data,l=0;l<n.length;l+=1){var i=100*n[l],o=[k[l],i];if(i>1&&e.push(o),l%2===0){var c=r.a.createElement("tr",null,r.a.createElement("td",null,k[l]),r.a.createElement("td",null,Math.round(100*n[l]),"%"),r.a.createElement("td",null,k[l+1]),r.a.createElement("td",null,Math.round(100*n[l+1]),"%"));a.push(c)}}t=r.a.createElement("div",null,r.a.createElement(f.a,{width:"100%",height:"1%",chartType:"ColumnChart",data:e,options:{chartArea:{width:"100%"},colors:["00a0ff"],hAxis:{minValue:0,textStyle:{fontSize:12}},bar:{groupWidth:"50%"},legend:{position:"none"}}}),r.a.createElement("br",null),r.a.createElement(S.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Country"),r.a.createElement("th",null,"Probabilty"),r.a.createElement("th",null,"Country"),r.a.createElement("th",null,"Probability"))),r.a.createElement("tbody",null,a)))}return r.a.createElement("div",null,t)}}]),t}(n.Component),D=Object(v.b)(function(e){return{value:e.addReducer.list}})(x),R=a(36),T=(a(215),a(112)),I=a.n(T),_="addReducer/ADDER",M={list:[]};var P=a(221),A=a(222),B=["http://127.0.0.1/model","http://127.0.0.1/model2"],G=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).classify=function(e,t){var a=[1,30];return console.log(t),R.d(function(){var n=R.c(e).pad([[a[1]-e.length,0]]);return t.predictOnBatch(R.b(n,a))}).dataSync()},a.inputFormCallBack=function(){var e=Object(u.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getData",{method:"POST",body:[t.country]}).then(function(e){return e.json()}).then(function(e){return e[0]});case 2:n=e.sent,console.log(a.state.models[a.state.chooseModel]),t.value=a.classify(n,a.state.models[a.state.chooseModel]),(0,a.props.adder)(t.value);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={models:[],loading:!1,chooseModel:0},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t,a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=[],a=0;case 2:if(!(a<2)){e.next=11;break}return e.next=5,R.a(B[a]);case 5:n=e.sent,console.log(n),t.push(n);case 8:a++,e.next=2;break;case 11:this.setState({models:t,loading:!0});case 12:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e;return e=!1===this.state.loading?r.a.createElement("container",{class:"centered"},r.a.createElement(I.a,{size:120,spinnerColor:"blue",spinnerWidth:2}),r.a.createElement("p",null,"LOADING MODEL")):r.a.createElement("div",null,r.a.createElement(P.a,null,r.a.createElement(A.a,null,r.a.createElement("h1",null,"Hit Country Classification System Based On Ingredient-Cuisine Dataset")),r.a.createElement(O,null),r.a.createElement(D,null),r.a.createElement("br",null),r.a.createElement(w,{onCreate:this.inputFormCallBack}))),r.a.createElement("div",null,e)}}]),t}(n.Component),N=Object(v.b)(function(e){return{value:e.addReducer.list}},function(e){return{adder:function(t){return e({type:_,list:t})}}})(G);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(218);var U=a(27),J=Object(U.b)({addReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:return{list:t.list};default:return e}}}),z=window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),F=Object(U.c)(J,z);i.a.render(r.a.createElement(v.a,{store:F},r.a.createElement(N,null)),document.getElementById("root"))},66:function(e,t,a){}},[[113,1,2]]]);
//# sourceMappingURL=main.1c718450.chunk.js.map