(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69b9c9b5"],{"057a":function(t,e,n){"use strict";var a=n("4bf5"),s=n.n(a);s.a},"4bf5":function(t,e,n){},"616e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-cb-wrapper"},[n("div",{staticClass:"wrap"},[n("div",{staticClass:"icon"},[n("i",{staticClass:"img ",class:{loading:t.loading}})]),n("div",{staticClass:"msg"},[t._v(t._s(t.text))]),n("div",{staticClass:"info"},[t._v(t._s(t.info))])])])},s=[],i=(n("b449"),n("ae9a")),r={name:"github",data:function(){return{text:"登陆中，请稍后...",info:"",loading:!0,message:""}},created:function(){this.login(this.$utils.getUrlParam("code"))},methods:{login:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.text="登陆中，请稍后...",e.loading=!0,n.prev=2,n.next=5,e.$api.user.login.gitHub(t);case 5:if(a=n.sent,s=a.data,console.log(s),s.result.token){n.next=10;break}throw new Error(s.result);case 10:e.$utils.store.set("token",s.result.token),e.text="登陆成功！",window.opener.location.reload(),window.close(),n.next=20;break;case 16:n.prev=16,n.t0=n["catch"](2),console.log(n.t0),e.text="登陆失败！";case 20:e.loading=!1;case 21:case"end":return n.stop()}}),n,null,[[2,16]])})))()}}},o=r,c=(n("c383"),n("057a"),n("4023")),l=Object(c["a"])(o,a,s,!1,null,"1db92bab",null);e["default"]=l.exports},c383:function(t,e,n){"use strict";var a=n("f686"),s=n.n(a);s.a},f686:function(t,e,n){}}]);
//# sourceMappingURL=chunk-69b9c9b5.ad6f5414.js.map