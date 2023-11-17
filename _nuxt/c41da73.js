(window.webpackJsonp=window.webpackJsonp||[]).push([[6,5],{722:function(t,e,n){"use strict";n.r(e);var r=n(711),l=n(788),o=n(232),c=n(239),d=n(51),f=n(493),_=n(720),h=n(716),m=n(717),v=n(151),x=n(235),y=n(152),k=n(784),w=n(783),C=n(786),$=n(794),O=n(787),S=n(206),j=(n(13),n(5),n(116),n(12),n(11),n(14),n(15),n(3)),R=(n(10),n(55),n(46),n(56),n(472),n(246),n(85)),D=n(248);n(474);function L(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function P(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?L(Object(source),!0).forEach((function(e){Object(j.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):L(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var A={name:"LetterSettingModal",components:{Cropper:D.a},computed:P(P({},Object(R.b)(["MediaUrl","CurrentUser"])),{},{recipient_group_list:function(){return this.$store.state.letter.recipient_group_list},recipient_list:function(){return this.$store.state.letter.recipient_list},frequent_text_list:function(){return this.$store.state.letter.frequent_text_list}}),data:function(){return{loading:!1,groups:[{id:0,title:"",recipients:[]}],texts:[{id:0,body:""}],required:[function(t){return!!t||"*"}],watch_list:{page:1,count:0,list:[]},sign:{dialog:!1,loading:!1,src:"",file:null}}},methods:{initialize:function(){var t=this;this.groups=[],this.recipient_group_list.forEach((function(e){return t.groups.push({id:e.id,title:e.title,recipients:e.recipients.map((function(t){return t.id}))})})),this.texts=[],this.watch_list={page:1,count:0,list:[]},this.frequent_text_list.forEach((function(e){return t.texts.push({id:e.id,body:e.body})})),this.$refs.form.resetValidation(),this.loadWatchList()},saveSetting:function(){var t=this;this.$refs.form.validate()?(this.loading=!0,this.$axios.$post("save-setting/",{groups:JSON.stringify(this.groups),texts:JSON.stringify(this.texts)},{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){t.$store.commit("letter/saveSetting",e),t.$toast.success("Done"),t.$emit("closeDialog")})).catch((function(e){return t.$toast.error(e.response.data.detail)})).finally((function(){return t.loading=!1}))):this.$toast.error("Incomplete Information`s")},loadWatchList:function(){var t=this;this.$axios.$get("watch-list/".concat(this.watch_list.page),{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){t.watch_list.list=e.list,t.watch_list.count=e.count}))},loadSign:function(t){t&&(this.sign.src&&URL.revokeObjectURL(this.sign.src),this.sign.src=URL.createObjectURL(t))},changeSign:function(){var t=this,canvas=this.$refs.cropper.getResult().canvas;if(canvas){var e=new FormData;canvas.toBlob((function(n){e.append("file",n,t.CurrentUser.username+".jpg"),t.sign.loading=!0,t.$axios.$post("save-user-signature/",e,{headers:{Authorization:"token "+t.$cookies.get("userToken")}}).then((function(e){t.$store.commit("setUserSignature",e),t.$toast.success("Done"),t.sign.file=null,t.sign.src="",t.sign.dialog=!1})).catch((function(){return t.$toast.error("something went wrong")})).finally((function(){return t.sign.loading=!1}))}),"image/jpeg")}}}},T=n(79),component=Object(T.a)(A,(function(){var t=this,e=t._self._c;return e(m.a,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.saveSetting.apply(null,arguments)}}},[e(c.a,{attrs:{loading:t.loading}},[e(d.c,{staticClass:"teal lighten-4 font-weight-bold"},[e("small",[t._v("Configuration")])]),t._v(" "),e(d.b,[e(O.a,{attrs:{"fixed-tabs":""}},[e(C.a,{staticClass:"caption text-normal"},[t._v("Referral Groups")]),t._v(" "),e(C.a,{staticClass:"caption text-normal"},[t._v("Frequent Text`s")]),t._v(" "),e(C.a,{staticClass:"caption text-normal"},[t._v("Followed Letter`s")]),t._v(" "),e(C.a,{staticClass:"caption text-normal"},[t._v("My Sign")]),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[e(w.a,[e("tbody",t._l(t.groups,(function(n,r){return e("tr",[e("td",[e(S.a,{staticClass:"caption",attrs:{dense:"",outlined:"","hide-details":"",color:"teal",label:"title",rules:t.required},model:{value:n.title,callback:function(e){t.$set(n,"title",e)},expression:"group.title"}})],1),t._v(" "),e("td",[e(l.a,{staticClass:"caption",attrs:{dense:"",outlined:"","hide-details":"",color:"teal",multiple:"",items:t.recipient_list.filter((function(t){return t.id>0})),"item-value":"id","item-text":"title","menu-props":"offsetY","small-chips":"",rules:t.required},scopedSlots:t._u([{key:"selection",fn:function(r){var l=r.item,o=r.index;return[0===o?e(f.a,{attrs:{small:"",color:"teal lighten-3"}},[e("span",[t._v(t._s(l.title))])]):t._e(),t._v(" "),1===o?e("span",[t._v("\n                        (+"+t._s(n.recipients.length-1)+" more)\n                      ")]):t._e()]}}],null,!0),model:{value:n.recipients,callback:function(e){t.$set(n,"recipients",e)},expression:"group.recipients"}})],1),t._v(" "),e("td",{staticClass:"text-left",attrs:{width:"40"}},[e(o.a,{attrs:{small:"",outlined:"",icon:"",color:"pink lighten-2",title:"remove"},on:{click:function(e){return t.groups.splice(r,1)}}},[e(v.a,{attrs:{small:""}},[t._v("mdi-trash-can-outline")])],1)],1)])})),0)]),t._v(" "),e(o.a,{staticClass:"subtitle-2 ma-4 text-normal",attrs:{small:"",rounded:"",color:"success"},on:{click:function(e){return t.groups.push({id:0,title:"",recipients:[]})}}},[t._v("New")])],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[e(w.a,[e("tbody",t._l(t.texts,(function(text,n){return e("tr",[e("td",[e(S.a,{staticClass:"caption",attrs:{dense:"",solo:"","hide-details":"",color:"teal",label:"text",rules:t.required},model:{value:text.body,callback:function(e){t.$set(text,"body",e)},expression:"text.body"}})],1),t._v(" "),e("td",{staticClass:"text-left",attrs:{width:"40"}},[e(o.a,{staticClass:"text-normal",attrs:{small:"",outlined:"",icon:"",color:"pink lighten-2",title:"remove"},on:{click:function(e){return t.texts.splice(n,1)}}},[e(v.a,{attrs:{small:""}},[t._v("mdi-trash-can-outline")])],1)],1)])})),0)]),t._v(" "),e(o.a,{staticClass:"subtitle-2 ma-4 text-normal",attrs:{small:"",rounded:"",color:"success"},on:{click:function(e){return t.texts.push({id:0,body:""})}}},[t._v("New")])],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[t.watch_list.list.length?e(x.a,{attrs:{dense:""}},t._l(t.watch_list.list,(function(n){return e(y.a,{staticClass:"rounded-10 mb-1",staticStyle:{border:"lightgray thin solid"},attrs:{dense:"",to:"/letter/ref".concat(n.id)}},[t._v(t._s(n.title))])})),1):t._e(),t._v(" "),e(k.a,{directives:[{name:"show",rawName:"v-show",value:t.watch_list.count>10,expression:"watch_list.count>10"}],attrs:{color:"teal lighten-3",length:Math.ceil(t.watch_list.count/10),"total-visible":"9"},on:{input:t.loadWatchList},model:{value:t.watch_list.page,callback:function(e){t.$set(t.watch_list,"page",e)},expression:"watch_list.page"}})],1),t._v(" "),e($.a,{staticClass:"pt-5 pb-2"},[t.CurrentUser.signature?e("div",{staticClass:"text-center"},[e("img",{staticStyle:{border:"lightgray thin solid"},attrs:{src:t.MediaUrl+t.CurrentUser.signature,alt:"",height:"200px"}}),t._v(" "),e(f.a,{attrs:{small:""}},[t._v("to change your sign photo contact administrator")])],1):e("div",[e(r.a,{staticClass:"mx-5",attrs:{type:"info",prominent:"",color:"info lighten-3"}},[e("ul",{staticClass:"mr-5 black--text"},[e("li",[t._v("you can register you signature only once")]),t._v(" "),e("li",[t._v("signature background should be white")])])]),t._v(" "),e("div",{staticClass:"text-center"},[e(o.a,{staticClass:"rounded-10 text-normal",attrs:{small:"",color:"cyan"},on:{click:function(e){t.sign.dialog=!0}}},[t._v("register")])],1),t._v(" "),e(_.a,{attrs:{width:"400"},model:{value:t.sign.dialog,callback:function(e){t.$set(t.sign,"dialog",e)},expression:"sign.dialog"}},[e(c.a,[e(d.c,{staticClass:"teal lighten-4"},[t._v("Signature Register")]),t._v(" "),e(d.b,{staticClass:"pt-6"},[t.sign.src?e("div",[e("cropper",{ref:"cropper",staticClass:"cropper",attrs:{src:t.sign.src}}),t._v(" "),e("div",{staticClass:"d-flex justify-space-between mt-5"},[e(o.a,{staticClass:"mx-auto subtitle-2 text-normal",attrs:{rounded:"",color:"teal lighten-1","min-width":"100px",loading:t.sign.loading},on:{click:function(e){t.sign.file=null,t.sign.src=""}}},[t._v("Change Image")]),t._v(" "),e(o.a,{staticClass:"mx-auto subtitle-2 text-normal",attrs:{rounded:"",color:"teal lighten-1","min-width":"100px",loading:t.sign.loading},on:{click:t.changeSign}},[t._v("Crop and Save")])],1)],1):e(h.a,{attrs:{accept:"image/*",placeholder:"Load Image",outlined:"",dense:""},on:{change:function(e){return t.loadSign(e)}}})],1)],1)],1)],1)])],1)],1),t._v(" "),e(d.a,{staticClass:"teal lighten-4 py-4"},[e(o.a,{staticClass:"mx-auto text-normal",attrs:{rounded:"",dark:"",color:"teal lighten-1",type:"submit",title:"Save Changes"}},[e(v.a,{attrs:{dark:""}},[t._v("mdi-content-save-outline")])],1)],1)],1)],1)}),[],!1,null,"54aa1864",null);e.default=component.exports},723:function(t,e,n){"use strict";n.r(e);var r=n(232),l=n(793),o=n(239),c=n(51),d=n(792),f=n(493),_=n(720),h=n(705),m=n(716),v=n(151),x=n(235),y=n(152),k=n(704),w=n(785),C=n(782),$=(n(5),n(10),n(104),n(116),n(36),n(12),n(11),n(14),n(15),n(3)),O=(n(13),n(85));function S(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(e){Object($.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var R={name:"ReferModal",props:["ids","is_in_inbox","reply_me"],computed:j(j({},Object(O.b)([""])),{},{recipient_list:function(){return this.$store.state.letter.recipient_list},frequent_text_list:function(){return this.$store.state.letter.frequent_text_list}}),data:function(){return{loading:!1,refers:[{recipients:[],transcripts:[],files:[],body:"",urgency:"normal",confidential:!1}],show_transcript:!1,frequent:{show:!1,index:0,x:0,y:0},dialog_setting:!1}},mounted:function(){var t=this;this.recipient_list.length||this.$axios.$get("recipient-list",{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){return t.$store.commit("letter/setRecipientList",e)})),this.frequent_text_list.length||this.$axios.$get("frequent-text-list/",{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){return t.$store.commit("letter/setFrequentTextList",e)})),this.$store.state.letter.recipient_group_list.length||this.$axios.$get("recipient-group-list/",{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(e){return t.$store.commit("letter/setRecipientGroupList",e)}))},methods:{initialize:function(){this.loading=!1,this.refers=[{recipients:[],transcripts:[],files:[],body:"",urgency:"normal",confidential:!1}],this.show_transcript=!1,this.frequent={show:!1,index:0,x:0,y:0}},sendRefer:function(t){var e=this;if(this.refers.filter((function(t){return!t.recipients.length})).length)this.$toast.error("Specify at least one recipient");else{this.loading=!0;var n=new FormData;this.ids.forEach((function(t){return n.append("parents",t)})),n.append("then",t),this.reply_me&&n.append("reply_me",!0),this.refers.forEach((function(t,e){n.append("refer"+e,JSON.stringify(t)),t.files.forEach((function(t){return n.append("files"+e,t,t.name)}))})),this.$axios.$post("add-refer/",n,{headers:{Authorization:"token "+this.$cookies.get("userToken")}}).then((function(n){e.$toast.success("Referral registered"),!t&&e.reply_me&&e.$store.commit("letter/setLetterRefers",n),e.$emit("closeModal",t)})).catch((function(t){return e.$toast.error(t.response.data.detail)})).finally((function(){return e.loading=!1}))}}}},D=n(79),component=Object(D.a)(R,(function(){var t=this,e=t._self._c;return e(o.a,{staticClass:"rounded-10"},[e(c.c,{staticClass:"teal lighten-4 font-weight-bold py-2 pl-3"},[e("small",[t._v("Refer")]),t._v(" "),e(r.a,{directives:[{name:"show",rawName:"v-show",value:!t.show_transcript,expression:"!show_transcript"}],staticClass:"ml-auto rounded-lg text-normal",attrs:{"x-small":"",outlined:"",color:"teal",disabled:t.loading},on:{click:function(e){t.show_transcript=!0}}},[t._v("add transcript")]),t._v(" "),e(r.a,{directives:[{name:"show",rawName:"v-show",value:t.show_transcript,expression:"show_transcript"}],staticClass:"ml-auto rounded-lg text-normal",attrs:{"x-small":"",outlined:"",color:"teal",disabled:t.loading},on:{click:function(e){t.show_transcript=!1,t.refers.forEach((function(t){return t.transcripts=[]}))}}},[t._v("remove transcript")]),t._v(" "),e(r.a,{staticClass:"ml-2",attrs:{"x-small":"",icon:"",color:"teal",title:"close"},on:{click:function(e){return t.$emit("closeModal",null)}}},[e(v.a,{attrs:{small:""}},[t._v("mdi-close")])],1)],1),t._v(" "),e(c.b,{staticClass:"pt-4"},[t._l(t.refers,(function(n,c){return e(o.a,{staticClass:"pa-1 mb-3 rounded-lg",staticStyle:{border:"lightgrey thin solid !important"},attrs:{flat:"",color:"grey lighten-3"}},[e(k.a,{attrs:{"offset-y":"",transition:"scale-transition",origin:"top center","close-on-content-click":!1,disabled:t.loading},scopedSlots:t._u([{key:"activator",fn:function(r){var l=r.on;return[e(o.a,t._g({staticClass:"mb-2 rounded-lg px-2 d-flex",attrs:{outlined:""}},l),[e(v.a,{attrs:{color:"teal"}},[t._v("mdi-account-check-outline mdi-18px")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:!n.recipients.length,expression:"!ref.recipients.length"}],staticClass:"caption grey--text ml-1"},[t._v("Receiver")]),t._v(" "),e("div",{staticStyle:{"padding-bottom":"2px"}},t._l(n.recipients,(function(n){return e(C.a,{key:n.id,attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(r){var l=r.on;return[e(f.a,t._g({staticClass:"ml-1",attrs:{"x-small":"",color:n>0?"teal lighten-4":"orange lighten-3"}},l),[t._v(t._s(t.recipient_list.find((function(t){return t.id===n})).title))])]}}],null,!0)},[t._v(" "),e("small",[t._v(t._s(t.recipient_list.find((function(t){return t.id===n})).subtitle))])])})),1)],1)]}}],null,!0)},[t._v(" "),e(x.a,{attrs:{dense:""}},t._l(t.recipient_list,(function(r){return e(y.a,{key:r.id},[e(d.a,{staticClass:"subtitle-2",attrs:{dense:"","hide-details":"",value:r.id,color:"teal"},model:{value:n.recipients,callback:function(e){t.$set(n,"recipients",e)},expression:"ref.recipients"}}),t._v(" "),e("div",{staticClass:"caption mt-2"},[t._v(t._s(r.title)+" "),e("small",{staticClass:"grey--text"},[t._v(" - "+t._s(r.subtitle))])])],1)})),1)],1),t._v(" "),t.show_transcript?e(k.a,{attrs:{"offset-y":"",transition:"scale-transition",origin:"top center","close-on-content-click":!1,disabled:t.loading},scopedSlots:t._u([{key:"activator",fn:function(r){var l=r.on;return[e(o.a,t._g({staticClass:"mb-2 rounded-lg px-2 d-flex",attrs:{outlined:""}},l),[e(v.a,{attrs:{color:"teal"}},[t._v("mdi-account-check-outline mdi-18px")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:!n.transcripts.length,expression:"!ref.transcripts.length"}],staticClass:"caption grey--text ml-1"},[t._v("Transcript")]),t._v(" "),e("div",{staticStyle:{"padding-bottom":"2px"}},t._l(n.transcripts,(function(n){return e(C.a,{key:n.id,attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(r){var l=r.on;return[e(f.a,t._g({staticClass:"ml-1",attrs:{"x-small":"",color:n>0?"teal lighten-4":"orange lighten-3"}},l),[t._v(t._s(t.recipient_list.find((function(t){return t.id===n})).title))])]}}],null,!0)},[t._v(" "),e("small",[t._v(t._s(t.recipient_list.find((function(t){return t.id===n})).subtitle))])])})),1)],1)]}}],null,!0)},[t._v(" "),e(x.a,{attrs:{dense:""}},t._l(t.recipient_list,(function(r){return e(y.a,{key:r.id},[e(d.a,{staticClass:"subtitle-2",attrs:{dense:"","hide-details":"",value:r.id,color:"teal"},model:{value:n.transcripts,callback:function(e){t.$set(n,"transcripts",e)},expression:"ref.transcripts"}}),t._v(" "),e("div",{staticClass:"caption mt-2"},[t._v(t._s(r.title)+" "),e("small",{staticClass:"grey--text"},[t._v(" - "+t._s(r.subtitle))])])],1)})),1)],1):t._e(),t._v(" "),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"flex-fill"},[e(w.a,{staticClass:"caption mb-1",attrs:{dense:"",flat:"",solo:"",rows:2,"hide-details":"",color:"teal",disabled:t.loading},on:{contextmenu:function(e){return e.preventDefault(),function(e){t.frequent.show=!1,t.frequent.index=c,t.frequent.x=e.clientX,t.frequent.y=e.clientY,t.frequent.show=!0}.apply(null,arguments)}},model:{value:n.body,callback:function(e){t.$set(n,"body",e)},expression:"ref.body"}}),t._v(" "),e("div",{staticClass:"d-flex justify-space-between"},[e(f.a,{attrs:{"x-small":""}},[t._v("right click, for insert frequent text`s")]),t._v(" "),c?e(r.a,{staticClass:"rounded-lg text-normal",attrs:{"x-small":"",text:"",outlined:"",color:"pink",disabled:t.loading},on:{click:function(e){return t.refers.splice(c,1)}}},[e(v.a,{attrs:{small:""}},[t._v("mdi-trash-can-outline")]),t._v("\n                Remove Refer\n              ")],1):t._e()],1)],1),t._v(" "),e("div",{staticClass:"pl-2 d-flex flex-column"},[e(l.a,{attrs:{color:"immediate"===n.urgency?"pink":"urgent"===n.urgency?"orange":"teal",dense:"",mandatory:""},model:{value:n.urgency,callback:function(e){t.$set(n,"urgency",e)},expression:"ref.urgency"}},[e(r.a,{staticClass:"px-1 text-normal",attrs:{"x-small":"",disabled:t.loading,value:"normal"}},[t._v("normal")]),t._v(" "),e(r.a,{staticClass:"px-1 text-normal",attrs:{"x-small":"",disabled:t.loading,value:"urgent"}},[t._v("urgent")]),t._v(" "),e(r.a,{staticClass:"px-1 text-normal",attrs:{"x-small":"",disabled:t.loading,value:"immediate"}},[t._v("immediate")])],1),t._v(" "),e(r.a,{staticClass:"rounded-lg mt-2 text-normal",attrs:{"x-small":"",outlined:"",color:n.confidential?"pink lighten-2":"grey",disabled:t.loading},on:{click:function(t){n.confidential=!n.confidential}}},[n.confidential?e(v.a,{attrs:{small:""}},[t._v("mdi-check")]):t._e(),t._v("\n              confidential\n            ")],1),t._v(" "),e(r.a,{staticClass:"rounded-lg mt-2 text-normal",attrs:{"x-small":"",outlined:"",color:"grey",disabled:t.loading},on:{click:function(e){t.$refs["file_selector".concat(c)][0].$refs.input.click()}}},[t._v("Appendix")]),t._v(" "),e(m.a,{ref:"file_selector".concat(c),refInFor:!0,staticStyle:{display:"none"},attrs:{multiple:""},on:{change:function(t){}},model:{value:n.files,callback:function(e){t.$set(n,"files",e)},expression:"ref.files"}}),t._v(" "),t._l(n.files,(function(r,l){return e("div",[e(f.a,{staticClass:"px-1",staticStyle:{"max-width":"90px"},attrs:{"x-small":""}},[t._v(t._s(r.name))]),t._v(" "),t.loading?t._e():e(v.a,{staticStyle:{cursor:"pointer"},attrs:{"x-small":"",color:"pink lighten-2"},on:{click:function(t){return n.files.splice(c,1)}}},[t._v("mdi-trash-can-outline")])],1)}))],2)])],1)})),t._v(" "),e(r.a,{staticClass:"rounded-lg text-normal",attrs:{"x-small":"",text:"",outlined:"",color:"teal",disabled:t.loading},on:{click:function(e){return t.refers.push({recipients:[],transcripts:[],files:[],body:"",urgency:"Add Refer",confidential:!1})}}},[e(v.a,{attrs:{small:""}},[t._v("mdi-plus")]),t._v("\n        Add Refer\n      ")],1)],2),t._v(" "),e(c.a,{staticClass:"teal lighten-4 d-flex justify-space-around py-4"},[e(r.a,{staticClass:"mx-auto caption rounded-lg text-normal",attrs:{small:"",dark:"",color:"teal lighten-1",width:"140",loading:t.loading},on:{click:function(e){return t.sendRefer("inbox")}}},[t._v("Send")]),t._v(" "),t.is_in_inbox?e(r.a,{staticClass:"mx-auto caption rounded-lg text-normal",attrs:{small:"",dark:"",color:"teal lighten-1",width:"140",loading:t.loading},on:{click:function(e){return t.sendRefer("archive")}}},[t._v("Send & Archive")]):t._e(),t._v(" "),t.is_in_inbox?e(r.a,{staticClass:"mx-auto caption rounded-lg text-normal",attrs:{small:"",dark:"",color:"teal lighten-1",width:"140",loading:t.loading},on:{click:function(e){return t.sendRefer("trash")}}},[t._v("Send & Remove")]):t._e()],1),t._v(" "),e(k.a,{attrs:{"position-x":t.frequent.x,"position-y":t.frequent.y,absolute:"","offset-y":""},model:{value:t.frequent.show,callback:function(e){t.$set(t.frequent,"show",e)},expression:"frequent.show"}},[e(x.a,{attrs:{dense:""}},[t._l(t.frequent_text_list,(function(text){return e(y.a,{staticClass:"caption",attrs:{link:""},on:{click:function(e){t.refers[t.frequent.index].body=text.body}}},[t._v(t._s(text.body))])})),t._v(" "),e(h.a),t._v(" "),e(y.a,{staticClass:"caption",attrs:{link:""},on:{click:function(e){t.dialog_setting=!0,t.$nextTick((function(){return t.$refs.letter_setting.initialize()}))}}},[e(v.a,{staticClass:"mr-2",attrs:{small:""}},[t._v("mdi-cog")]),t._v("\n          Configurations\n        ")],1)],2)],1),t._v(" "),e(_.a,{attrs:{width:"800"},model:{value:t.dialog_setting,callback:function(e){t.dialog_setting=e},expression:"dialog_setting"}},[e("LetterSettingModal",{ref:"letter_setting",on:{closeDialog:function(e){t.dialog_setting=!1}}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LetterSettingModal:n(722).default})}}]);