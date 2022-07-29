import{u as b,s as h,g}from"./util.9e521194.js";import{o as i,e as o,t as d,f as c,n as k,w as S,g as p,r as v,h as m,i as _,F as C,j as B,p as T,k as I,l as L}from"./vendor.a8b34c3e.js";import{_ as w}from"./index.164c1c09.js";const M={props:["itemTitle","itemContent","itemBtn","styleObject","btnShowType"],data(){return{title:"title",content:"content",btn:"btn",showType:0,btnShown:!0}},created(){if(this.title=this.itemTitle||"title",this.itemContent&&(this.content=this.itemContent),this.itemBtn&&(this.btn=this.itemBtn),this.btnShowType)switch(this.btnShowType){case"Hover":this.showType=1,this.btnShown=!1;break}},methods:{btnClick(){console.log("card click"),this.$emit("hit-click",this)},startHover(){this.showType&&(this.btnShown=!0)},endHover(){this.showType&&(this.btnShown=!1)}}},H={key:0,class:"info title"},N={key:1,class:"info content"};function j(e,t,a,f,n,s){return i(),o("div",{class:"card",style:p(a.styleObject),onMouseenter:t[1]||(t[1]=(...r)=>s.startHover&&s.startHover(...r)),onMouseleave:t[2]||(t[2]=(...r)=>s.endHover&&s.endHover(...r))},[a.itemTitle?(i(),o("div",H,d(n.title),1)):c("",!0),a.itemContent?(i(),o("div",N,d(n.content),1)):c("",!0),a.itemBtn?(i(),o("div",{key:2,class:k(["info btn",{shown:n.btnShown}]),onClick:t[0]||(t[0]=S((...r)=>s.btnClick&&s.btnClick(...r),["stop","prevent"]))},d(n.btn),3)):c("",!0)],36)}var D=w(M,[["render",j]]);const x={props:["link"],components:{MindnoteCard:D},data(){return{err:null,msg:"no data",itemList:[],addNewBtnStr:" + \u6DFB\u52A0",deleteBtnStr:"\u5220\u9664",styleObj:"border-style: dashed;"}},created(){this.fetchData()},methods:{addNewMindnotePage(){console.log("click add new");const e=b(),t=new Date,a={id:e,name:window.moment(new Date).format("YYYY-MM-DD\u65E5\u8BB0"),time:{createAt:t.toLocaleString()}};this.itemList.push(a),h("mindnoteItems",this.itemList),h(e,[{id:1,name:"Untitled"}]),this.$router.push("/mindnote/"+e)},deleteItem(e,t){console.log("delete item",this,e,t),this.itemList.splice(t,1),h("mindnoteItems",this.itemList),localStorage.removeItem(e.toString())},fetchData(){const e=g("mindnoteItems");e==null?console.log(`no local data 
check for cloud data`):this.itemList=e}}},P=e=>(T("data-v-5e25ea6e"),e=e(),I(),e),O={class:"page-space"},Y=P(()=>m("div",{class:"navbar"},[m("h3",null,"Z Mindnote")],-1)),A={key:0,class:"msg"},V={class:"grid"},z={key:0,class:"itemwrapper"};function F(e,t,a,f,n,s){const r=v("mindnote-card"),y=v("router-link");return i(),o("div",O,[Y,n.err?(i(),o("div",A,d(n.msg),1)):c("",!0),m("div",V,[m("div",{class:"addNewBtn",onClick:t[0]||(t[0]=(...l)=>s.addNewMindnotePage&&s.addNewMindnotePage(...l))},[_(r,{itemTitle:n.addNewBtnStr,style:p(n.styleObj)},null,8,["itemTitle","style"])]),n.itemList?(i(),o("div",z,[(i(!0),o(C,null,B(n.itemList,(l,u)=>(i(),o("div",{class:"blockwrapper",key:u},[_(y,{class:"block",to:{name:"MindnotePage",params:{mindnoteId:l.id}}},{default:L(()=>[_(r,{itemTitle:l.name,itemContent:l.time.createAt,itemBtn:n.deleteBtnStr,btnShowType:"Hover",onHitClick:q=>s.deleteItem(l.id,u)},null,8,["itemTitle","itemContent","itemBtn","onHitClick"])]),_:2},1032,["to"])]))),128))])):c("",!0)])])}var G=w(x,[["render",F],["__scopeId","data-v-5e25ea6e"]]);export{G as default};