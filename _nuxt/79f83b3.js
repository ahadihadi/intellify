(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{722:function(t,e,n){"use strict";n.r(e);var r=n(711),o=n(788),l=n(232),c=n(239),d=n(51),h=n(493),f=n(720),v=n(716),_=n(717),m=n(151),x=n(235),w=n(152),y=n(784),C=n(783),k=n(786),$=n(794),O=n(787),S=n(206),j=(n(13),n(5),n(116),n(12),n(11),n(14),n(15),n(3)),U=(n(10),n(55),n(46),n(56),n(472),n(246),n(85)),L=n(248);n(474);function D(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function P(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?D(Object(source),!0).forEach((function(e){Object(j.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):D(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var R={name:"LetterSettingModal",components:{Cropper:L.a},computed:P(P({},Object(U.b)(["MediaUrl","CurrentUser"])),{},{recipient_group_list:function(){return this.$store.state.letter.recipient_group_list},recipient_list:function(){return this.$store.state.letter.recipient_list},frequent_text_list:function(){return this.$store.state.letter.frequent_text_list}}),data:function(){return{loading:!1,groups:[{id:0,title:"",recipients:[]}],texts:[{id:0,body:""}],required:[function(t){return!!t||"*"}],watch_list:{page:1,count:0,list:[]},sign:{dialog:!1,loading:!1,src:"",file:null}}},methods:{initialize:function(){var t=this;this.groups=[],this.recipient_group_list.forEach((function(e){return t.groups.push({id:e.id,title:e.title,recipients:e.recipients.map((function(t){return t.id}))})})),this.texts=[],this.watch_list={page:1,count:0,list:[]},this.frequent_text_list.forEach((function(e){return t.texts.push({id:e.id,body:e.body})})),this.$refs.form.resetValidation(),this.loadWatchList()},saveSetting:function(){var t=this;this.$refs.form.validate()?(this.loading=!0,this.$axios.$post("save-setting/",{groups:JSON.stringify(this.groups),texts:JSON.stringify(this.texts)},{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){t.$store.commit("letter/saveSetting",e),t.$toast.success("Done"),t.$emit("closeDialog")})).catch((function(e){return t.$toast.error(e.response.data.detail)})).finally((function(){return t.loading=!1}))):this.$toast.error("Incomplete Information`s")},loadWatchList:function(){var t=this;this.$axios.$get("watch-list/".concat(this.watch_list.page),{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){t.watch_list.list=e.list,t.watch_list.count=e.count}))},loadSign:function(t){t&&(this.sign.src&&URL.revokeObjectURL(this.sign.src),this.sign.src=URL.createObjectURL(t))},changeSign:function(){var t=this,canvas=this.$refs.cropper.getResult().canvas;if(canvas){var e=new FormData;canvas.toBlob((function(n){e.append("file",n,t.CurrentUser.username+".jpg"),t.sign.loading=!0,t.$axios.$post("save-user-signature/",e,{headers:{Authorization:"token "+t.$cookies.get("userToken")}}).then((function(e){t.$store.commit("setUserSignature",e),t.$toast.success("Done"),t.sign.file=null,t.sign.src="",t.sign.dialog=!1})).catch((function(){return t.$toast.error("something went wrong")})).finally((function(){return t.sign.loading=!1}))}),"image/jpeg")}}}},M=n(79),component=Object(M.a)(R,(function(){var t=this,e=t._self._c;return e(_.a,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.saveSetting.apply(null,arguments)}}},[e(c.a,{attrs:{loading:t.loading}},[e(d.c,{staticClass:"teal lighten-4 font-weight-bold"},[e("small",[t._v("Configuration")])]),t._v(" "),e(d.b,[e(O.a,{attrs:{"fixed-tabs":""}},[e(k.a,{staticClass:"caption text-normal"},[t._v("Referral Groups")]),t._v(" "),e(k.a,{staticClass:"caption text-normal"},[t._v("Frequent Text`s")]),t._v(" "),e(k.a,{staticClass:"caption text-normal"},[t._v("Followed Letter`s")]),t._v(" "),e(k.a,{staticClass:"caption text-normal"},[t._v("My Sign")]),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[e(C.a,[e("tbody",t._l(t.groups,(function(n,r){return e("tr",[e("td",[e(S.a,{staticClass:"caption",attrs:{dense:"",outlined:"","hide-details":"",color:"teal",label:"title",rules:t.required},model:{value:n.title,callback:function(e){t.$set(n,"title",e)},expression:"group.title"}})],1),t._v(" "),e("td",[e(o.a,{staticClass:"caption",attrs:{dense:"",outlined:"","hide-details":"",color:"teal",multiple:"",items:t.recipient_list.filter((function(t){return t.id>0})),"item-value":"id","item-text":"title","menu-props":"offsetY","small-chips":"",rules:t.required},scopedSlots:t._u([{key:"selection",fn:function(r){var o=r.item,l=r.index;return[0===l?e(h.a,{attrs:{small:"",color:"teal lighten-3"}},[e("span",[t._v(t._s(o.title))])]):t._e(),t._v(" "),1===l?e("span",[t._v("\n                        (+"+t._s(n.recipients.length-1)+" more)\n                      ")]):t._e()]}}],null,!0),model:{value:n.recipients,callback:function(e){t.$set(n,"recipients",e)},expression:"group.recipients"}})],1),t._v(" "),e("td",{staticClass:"text-left",attrs:{width:"40"}},[e(l.a,{attrs:{small:"",outlined:"",icon:"",color:"pink lighten-2",title:"remove"},on:{click:function(e){return t.groups.splice(r,1)}}},[e(m.a,{attrs:{small:""}},[t._v("mdi-trash-can-outline")])],1)],1)])})),0)]),t._v(" "),e(l.a,{staticClass:"subtitle-2 ma-4 text-normal",attrs:{small:"",rounded:"",color:"success"},on:{click:function(e){return t.groups.push({id:0,title:"",recipients:[]})}}},[t._v("New")])],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[e(C.a,[e("tbody",t._l(t.texts,(function(text,n){return e("tr",[e("td",[e(S.a,{staticClass:"caption",attrs:{dense:"",solo:"","hide-details":"",color:"teal",label:"text",rules:t.required},model:{value:text.body,callback:function(e){t.$set(text,"body",e)},expression:"text.body"}})],1),t._v(" "),e("td",{staticClass:"text-left",attrs:{width:"40"}},[e(l.a,{staticClass:"text-normal",attrs:{small:"",outlined:"",icon:"",color:"pink lighten-2",title:"remove"},on:{click:function(e){return t.texts.splice(n,1)}}},[e(m.a,{attrs:{small:""}},[t._v("mdi-trash-can-outline")])],1)],1)])})),0)]),t._v(" "),e(l.a,{staticClass:"subtitle-2 ma-4 text-normal",attrs:{small:"",rounded:"",color:"success"},on:{click:function(e){return t.texts.push({id:0,body:""})}}},[t._v("New")])],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[t.watch_list.list.length?e(x.a,{attrs:{dense:""}},t._l(t.watch_list.list,(function(n){return e(w.a,{staticClass:"rounded-10 mb-1",staticStyle:{border:"lightgray thin solid"},attrs:{dense:"",to:"/letter/ref".concat(n.id)}},[t._v(t._s(n.title))])})),1):t._e(),t._v(" "),e(y.a,{directives:[{name:"show",rawName:"v-show",value:t.watch_list.count>10,expression:"watch_list.count>10"}],attrs:{color:"teal lighten-3",length:Math.ceil(t.watch_list.count/10),"total-visible":"9"},on:{input:t.loadWatchList},model:{value:t.watch_list.page,callback:function(e){t.$set(t.watch_list,"page",e)},expression:"watch_list.page"}})],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[t.CurrentUser.signature?e("div",{staticClass:"text-center"},[e("img",{staticStyle:{border:"lightgray thin solid"},attrs:{src:t.MediaUrl+t.CurrentUser.signature,alt:"",height:"200px"}}),t._v(" "),e(h.a,{attrs:{small:""}},[t._v("to change your sign photo contact administrator")])],1):e("div",[e(r.a,{staticClass:"mx-5",attrs:{type:"info",prominent:"",color:"info lighten-3"}},[e("ul",{staticClass:"mr-5 black--text"},[e("li",[t._v("you can register you signature only once")]),t._v(" "),e("li",[t._v("signature background should be white")])])]),t._v(" "),e("div",{staticClass:"text-center"},[e(l.a,{staticClass:"rounded-10 text-normal",attrs:{small:"",color:"cyan"},on:{click:function(e){t.sign.dialog=!0}}},[t._v("register")])],1),t._v(" "),e(f.a,{attrs:{width:"400"},model:{value:t.sign.dialog,callback:function(e){t.$set(t.sign,"dialog",e)},expression:"sign.dialog"}},[e(c.a,[e(d.c,{staticClass:"teal lighten-4"},[t._v("Signature Register")]),t._v(" "),e(d.b,{staticClass:"pt-6"},[t.sign.src?e("div",[e("cropper",{ref:"cropper",staticClass:"cropper",attrs:{src:t.sign.src}}),t._v(" "),e("div",{staticClass:"d-flex justify-space-between mt-5"},[e(l.a,{staticClass:"mx-auto subtitle-2 text-normal",attrs:{rounded:"",color:"teal lighten-1","min-width":"100px",loading:t.sign.loading},on:{click:function(e){t.sign.file=null,t.sign.src=""}}},[t._v("Change Image")]),t._v(" "),e(l.a,{staticClass:"mx-auto subtitle-2 text-normal",attrs:{rounded:"",color:"teal lighten-1","min-width":"100px",loading:t.sign.loading},on:{click:t.changeSign}},[t._v("Crop and Save")])],1)],1):e(v.a,{attrs:{accept:"image/*",placeholder:"Load Image",outlined:"",dense:""},on:{change:function(e){return t.loadSign(e)}}})],1)],1)],1)],1)])],1)],1),t._v(" "),e(d.a,{staticClass:"teal lighten-4 py-4"},[e(l.a,{staticClass:"mx-auto text-normal",attrs:{rounded:"",dark:"",color:"teal lighten-1",type:"submit",title:"Save Changes"}},[e(m.a,{attrs:{dark:""}},[t._v("mdi-content-save-outline")])],1)],1)],1)],1)}),[],!1,null,"54aa1864",null);e.default=component.exports}}]);