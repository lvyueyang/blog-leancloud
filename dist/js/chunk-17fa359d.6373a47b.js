(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17fa359d"],{"0382":function(t,e,n){},"29a2":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-detail"},[t.loading?n("div",{staticClass:"text-center"},[t._v("文章加载中...")]):t._e(),t.articleError?n("div",{staticClass:"text-center"},[t._v("文章加载失败，或者文章不存在")]):t._e(),t.info?[n("div",{staticClass:"article-title"},[n("span",[t._v(t._s(t.info.title))])]),n("div",{staticClass:"article-info"},[n("div",{staticClass:"span"},[n("i",{staticClass:"iconfont icon-time-line"}),t._v(t._s(t._f("formatDate")(t.info.createdAt))+" ")]),n("div",{staticClass:"span"},[n("i",{staticClass:"iconfont icon-heart-line"}),t._v(t._s(t.info.counts.collection)+" ")]),n("div",{staticClass:"span"},[n("i",{staticClass:"iconfont icon-message--line1"}),t._v(t._s(t.info.counts.comment)+" ")]),n("div",{staticClass:"span collection",on:{click:t.handlerCollection}},[t._v(" "+t._s(t.isCollection?"已收藏":"收藏")+" ")]),t.userId===t.info.auth.objectId?n("router-link",{staticClass:"span cur",attrs:{target:"_blank",to:"/editor?id="+t.info.objectId}},[t._v("编辑 ")]):t._e()],1),n("div",{staticClass:"content-html markdown-body",domProps:{innerHTML:t._s(t.info.content)}}),n("div",{staticClass:"article-tags"},t._l(t.info.tags,(function(e){return n("router-link",{key:e,attrs:{to:"/article?tag="+e}},[t._v("# "+t._s(e)+" ")])})),1),n("div",{staticClass:"page"},[t.info.prev?n("router-link",{attrs:{to:"/article/"+t.info.prev._id}},[t._v("上一篇 : "+t._s(t.info.prev.title))]):n("span"),t.info.next?n("router-link",{attrs:{to:"/article/"+t.info.next._id}},[t._v("下一篇 : "+t._s(t.info.next.title))]):n("span")],1),n("comment",{attrs:{"article-id":t.articleId}})]:t._e()],2)},r=[],a=(n("b449"),n("51bc")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment-wrap"},[t._m(0),n("comment-rich",{attrs:{placeholder:"填写你的评论内容 (支持Markdown语法，但是[表格、标题、图片]不会被转义)",loading:t.form.loading},on:{submit:t.handlerSubmit},model:{value:t.form.value,callback:function(e){t.$set(t.form,"value",e)},expression:"form.value"}}),0===t.list.length?n("div",{staticClass:"list-none"},[t._v("暂无评论")]):t._e(),n("div",{staticClass:"comment-list"},t._l(t.list,(function(e,i){return n("div",{key:e.objectId,staticClass:"comment-item"},[n("div",{staticClass:"parent"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:e.auth.avatar,alt:""}})]),n("div",{staticClass:"item-wrap-content"},[n("div",{staticClass:"iw-header"},[n("div",{staticClass:"username"},[n("span",[n("b",[t._v(t._s(e.auth.name))])]),n("span",[t._v(t._s(t._f("relativeTime")(e.createdAt)))])]),n("div",{staticClass:"operate"},[t.userId===e.auth.objectId?n("span",{staticClass:"del",on:{click:function(n){return t.handlerRemoveComment(e.objectId,i)}}},[t._v(" 删除 ")]):t._e(),n("span",{staticClass:"cur",on:{click:function(n){return t.handlerToggleChildren(e,i)}}},[t._v(t._s(e.counts.comment)+"条评论")])])]),n("div",{staticClass:"content markdown-body",domProps:{innerHTML:t._s(e.content)}})])]),"object"===typeof e.children?n("div",{directives:[{name:"show",rawName:"v-show",value:e.children.show,expression:"v.children.show"}],staticClass:"children-comment-list"},[n("div",{staticClass:"comment-item"},[n("div",{staticClass:"parent"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:t.userInfo.avatar,alt:""}})]),n("div",{staticClass:"item-wrap-content"},[n("div",{staticClass:"iw-header"},[n("div",{staticClass:"username"},[n("span",[n("b",[t._v(t._s(t.userInfo.name))])])])]),n("div",{staticClass:"content"},[n("comment-rich",{attrs:{placeholder:e.children.placeholder},on:{submit:function(n){return t.handlerCreateChildrenComment(e)}},model:{value:e.children.content,callback:function(n){t.$set(e.children,"content",n)},expression:"v.children.content"}})],1)])])]),t._l(e.children.list,(function(r,a){return n("div",{key:r.objectId,staticClass:"comment-item"},[n("div",{staticClass:"parent"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:r.auth.avatar,alt:""}})]),n("div",{staticClass:"item-wrap-content"},[n("div",{staticClass:"iw-header"},[n("div",{staticClass:"username"},[n("span",[n("b",[t._v(t._s(r.auth.name))])]),n("span",[t._v(t._s(t._f("relativeTime")(r.createdAt)))])]),n("div",{staticClass:"operate"},[n("span",{staticClass:"hf"},[t._v("回复")]),t.userId===r.auth.objectId?n("span",{staticClass:"del",on:{click:function(n){return t.handlerRemoveChildrenComment(r,a,e,i)}}},[t._v("删除 ")]):t._e()])]),n("div",{staticClass:"content markdown-body",domProps:{innerHTML:t._s(r.content)}})])])])})),e.children.more?n("div",{staticClass:"text-center more"},[n("Button",{attrs:{loading:e.children.loading},on:{click:function(n){return t.handlerChildrenNext(e,i)}}},[t._v("加载更多")])],1):t._e()],2):t._e()])})),0),t.more?n("div",{staticClass:"text-center more"},[n("Button",{attrs:{loading:t.loading},on:{click:t.handlerNext}},[t._v("加载更多")])],1):t._e()],1)},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("span",[t._v("评 论")])])}],o=(n("ea69"),n("053b"),n("513c"),n("4822"));function l(t){if(Array.isArray(t))return Object(o["a"])(t)}n("f3dd"),n("0a51"),n("9b11"),n("98e0"),n("a133"),n("e18c"),n("96db"),n("af86");function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var d=n("9b7b");function h(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(t){return l(t)||u(t)||Object(d["a"])(t)||h()}var v=n("2a7d"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment-rich"},[n("textarea",{directives:[{name:"show",rawName:"v-show",value:!t.md.show,expression:"!md.show"},{name:"model",rawName:"v-model",value:t.content,expression:"content"}],ref:"Editor",attrs:{placeholder:t.placeholder},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.md.show,expression:"md.show"}],staticClass:"markdown-wrap",domProps:{innerHTML:t._s(t.md.content)}}),t._m(0),n("div",{staticClass:"operate"},[n("div",{staticClass:"left"},[t._m(1),n("div",{staticClass:"icon",attrs:{title:"插入代码"},on:{click:t.handlerInsetBlockCode}},[n("i",{staticClass:"iconfont icon-terminal-fill"})]),n("div",{staticClass:"icon",attrs:{title:"添加引用"},on:{click:t.handlerInsetQuote}},[n("i",{staticClass:"iconfont icon-double-quotes-l"})]),n("div",{staticClass:"icon",attrs:{title:"添加连接"},on:{click:t.handlerInsetLink}},[n("i",{staticClass:"iconfont icon-link"})]),n("div",{staticClass:"icon",attrs:{title:"加粗"},on:{click:t.handlerInsetBold}},[n("i",{staticClass:"iconfont icon-bold"})]),n("div",{staticClass:"icon",attrs:{title:"斜体"},on:{click:t.handlerInsetItalic}},[n("i",{staticClass:"iconfont icon-italic"})]),n("div",{staticClass:"icon",attrs:{title:"删除线"},on:{click:t.handlerInsetStrikethrough}},[n("i",{staticClass:"iconfont icon-strikethrough"})]),n("div",{staticClass:"icon",attrs:{title:"预览"},on:{click:t.handlerPreview}},[n("i",{staticClass:"iconfont icon-file-word--line"})])]),n("Button",{attrs:{type:"black",loading:t.loading},on:{click:t.handlerSubmit}},[t._v("评论")])],1)])},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"img-list"},[n("div",{staticClass:"item"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"icon",attrs:{title:"添加图片"}},[n("i",{staticClass:"iconfont icon-image-fill"})])}],C=(n("e35a"),n("5e9f"),{name:"CommentRich",props:{value:{type:String,value:""},placeholder:String,submit:Function,loading:Boolean},data:function(){return{md:{show:!1,content:""}}},computed:{content:{get:function(){return this.value},set:function(t){this.setValue(t)}}},watch:{},components:{Button:v["a"]},mounted:function(){},methods:{handlerSubmit:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$emit("submit");case 2:case"end":return e.stop()}}),e)})))()},handlerAtUser:function(){},handlerPreview:function(){this.md.show=!this.md.show,this.md.show&&(this.md.content=this.$utils.renderComment(this.content))},handlerInsetBold:function(){var t="**{-}**",e=2;this.insetStr(t,e,!0)},handlerInsetItalic:function(){var t="*{-}*",e=1;this.insetStr(t,e,!0)},handlerInsetStrikethrough:function(){var t="~~{-}~~",e=2;this.insetStr(t,e,!0)},handlerInsetBlockCode:function(){var t="\n``` \n\n```\n",e=5;0===this.content.length&&(e-=1,t="``` \n\n```\n"),this.insetStr(t,e)},handlerInsetQuote:function(){var t="\n> \n",e=3;0===this.content.length&&(e-=1,t="> \n"),this.insetStr(t,e)},handlerInsetLink:function(){var t="[]()",e=1;this.insetStr(t,e)},insetStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.$refs["Editor"],r=i.selectionStart,a=i.selectionEnd,s=this.content;if(n&&r!==a){var c=s.substring(r,a);console.log(c),t=t.replace(/{-}/gi,c)}else t=t.replace(/{-}/gi,"");var o=s.substring(0,r)+t+s.substring(a,s.length);this.setValue(o),this.$nextTick((function(){i.selectionStart=r+e,i.selectionEnd=r+e,i.focus()}))},setValue:function(t){this.$emit("input",t)}}}),g=C,b=(n("dbaa"),n("4023")),_=Object(b["a"])(g,f,p,!1,null,"2f96635b",null),w=_.exports,I=n("a097"),k={name:"Comment",props:{articleId:[String,Number]},data:function(){return{form:{value:"",loading:!1},page:1,list:[],loading:!1,more:!1}},computed:{userId:function(){return this.$utils.store.get("userInfo").objectId||""},userInfo:function(){return this.$utils.store.get("userInfo")}},components:{Button:v["a"],CommentRich:w},mounted:function(){this.getList()},methods:{getList:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,i,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$api.comment.list({page:t.page,articleId:t.articleId});case 3:i=e.sent,r=i.data,(n=t.list).push.apply(n,m(r.results)),t.more=10===r.results.length,e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))()},handlerSubmit:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.form.loading=!0,e.prev=1,e.next=4,t.$api.comment.create({content:Object(I["b"])(t.form.value),articleId:t.articleId});case 4:n=e.sent,t.form.value="",t.$api.comment.detail(n.data.objectId).then((function(e){t.list.unshift(e)})),e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](1);case 11:t.form.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},handlerNext:function(){this.page+=1,this.getList()},handlerRemoveComment:function(t,e){var n=this;this.$pop.confirm({content:"确定要删除这条评论吗？",ok:function(){var i=Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,n.$api.comment.remove(t,n.articleId);case 3:n.list.splice(e,1),i.next=9;break;case 6:i.prev=6,i.t0=i["catch"](0),console.log(i.t0);case 9:case"end":return i.stop()}}),i,null,[[0,6]])})));function r(){return i.apply(this,arguments)}return r}()})},handlerToggleChildren:function(t,e){t.children||this.$set(this.list[e],"children",{show:!1,content:"",loading:!1,placeholder:"回复：".concat(t.auth.name),list:[],page:1}),this.$set(this.list[e].children,"show",!t.children.show),t.children.show&&(this.$set(this.list[e].children,"list",[]),this.getChildrenCommentList(t.children.page,t.objectId,e))},getChildrenCommentList:function(t,e,n){var i=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var a,s,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i.list[n].children.loading=!0,r.prev=1,r.next=4,i.$api.commentChildren.list({page:t,commentId:e});case 4:s=r.sent,c=s.data,i.list[n].children.more=10===c.results.length,(a=i.list[n].children.list).push.apply(a,m(c.results)),r.next=12;break;case 10:r.prev=10,r.t0=r["catch"](1);case 12:i.list[n].children.loading=!1,i.list.splice(0,0);case 14:case"end":return r.stop()}}),r,null,[[1,10]])})))()},handlerCreateChildrenComment:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i,r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$api.commentChildren.create({commentId:t.objectId,content:Object(I["b"])(t.children.content)});case 3:return i=n.sent,r=i.data,t.children.content="",n.next=8,e.$api.commentChildren.detail(r.objectId);case 8:a=n.sent,t.children.list.unshift(a),e.list.splice(0,0),n.next=15;break;case 13:n.prev=13,n.t0=n["catch"](0);case 15:case"end":return n.stop()}}),n,null,[[0,13]])})))()},handlerRemoveChildrenComment:function(t,e,n,i){var r=this;this.$pop.confirm({content:"确定要删除这条评论吗？",ok:function(){var s=Object(a["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,r.$api.commentChildren.remove(t.objectId,n.objectId);case 3:r.list[i].children.list.splice(e,1),a.next=9;break;case 6:a.prev=6,a.t0=a["catch"](0),console.log(a.t0);case 9:case"end":return a.stop()}}),a,null,[[0,6]])})));function c(){return s.apply(this,arguments)}return c}()})},handlerChildrenNext:function(t,e){t.children.page+=1,this.getChildrenCommentList(t.children.page,t.objectId,e)}}},x=k,j=(n("5380"),Object(b["a"])(x,s,c,!1,null,null,null)),$=j.exports,R={name:"ArticleDetail",data:function(){return{info:null,loading:!0,articleError:!1,addLoading:!1,isCollection:!1}},computed:{articleId:function(){return this.$route.params.id},userId:function(){return this.$utils.store.get("userInfo").objectId}},components:{Comment:$},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,t.articleError=!1,e.next=4,t.getDetail();case 4:t.loading=!1,t.judgeCollection();case 6:case"end":return e.stop()}}),e)})))()},methods:{judgeCollection:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$api.article.userInCollectionArticle(t.articleId);case 3:n=e.sent,t.isCollection=!!n,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),t.isCollection=!1;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getDetail:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.articleId,e.prev=1,e.next=4,t.$api.article.detail(n);case 4:t.info=e.sent,e.next=11;break;case 7:e.prev=7,e.t0=e["catch"](1),t.$pop.notice({title:"获取失败",type:"error"}),t.articleError=!0;case 11:case"end":return e.stop()}}),e,null,[[1,7]])})))()},handlerCollection:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.articleId,e.prev=1,e.next=4,t.$api.article.collection(n);case 4:return e.next=6,t.getDetail();case 6:return e.next=8,t.judgeCollection();case 8:e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](1),console.log(e.t0),t.$pop.notice({title:"操作失败",type:"error"});case 14:case"end":return e.stop()}}),e,null,[[1,10]])})))()}}},N=R,y=(n("8ba5"),Object(b["a"])(N,i,r,!1,null,"23a3cc4b",null));e["default"]=y.exports},"513c":function(t,e,n){"use strict";var i=n("1e2c"),r=n("d890"),a=n("e8d6"),s=n("1944"),c=n("faa8"),o=n("2118"),l=n("7063"),u=n("9f67"),d=n("efe2"),h=n("6d60"),m=n("b338").f,v=n("aa6b").f,f=n("d910").f,p=n("c10f").trim,C="Number",g=r[C],b=g.prototype,_=o(h(b))==C,w=function(t){var e,n,i,r,a,s,c,o,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=p(l),e=l.charCodeAt(0),43===e||45===e){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+l}for(a=l.slice(2),s=a.length,c=0;c<s;c++)if(o=a.charCodeAt(c),o<48||o>r)return NaN;return parseInt(a,i)}return+l};if(a(C,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var I,k=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof k&&(_?d((function(){b.valueOf.call(n)})):o(n)!=C)?l(new g(w(e)),n,k):w(e)},x=i?m(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),j=0;x.length>j;j++)c(g,I=x[j])&&!c(k,I)&&f(k,I,v(g,I));k.prototype=b,b.constructor=k,s(r,C,k)}},5380:function(t,e,n){"use strict";var i=n("f25b"),r=n.n(i);r.a},7367:function(t,e,n){},"8ba5":function(t,e,n){"use strict";var i=n("0382"),r=n.n(i);r.a},dbaa:function(t,e,n){"use strict";var i=n("7367"),r=n.n(i);r.a},f25b:function(t,e,n){}}]);
//# sourceMappingURL=chunk-17fa359d.6373a47b.js.map