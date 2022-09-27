import{e as O}from"./actions.c117c8b0.28e8e71a.64d8a71b.js";import{G as W,K as J}from"./ShippingAddress.a6e140a5.4ede364b.d30e1e51.js";import{h as w,j as A,E as q,G as x,r as T,H as X,W as K,w as N,q as o,k as f,s as C,C as a,D as t,m as b,n as c,I as m,g as M,v as j,l as U,x as Z,F as z}from"./index.aeebef3f.js";import{r as y}from"./_plugin-vue_export-helper.e9cbb45e.72bab03e.a8c17577.js";const Y=w({name:"ConceptCard",components:{ShipmentOptionsForm:W,ShippingAddress:J},setup:()=>({translate:A(),saveDeliveryOptions:async()=>{},exportOrderQuery:async(e=!1)=>{e?O.ORDER_EXPORT_PRINT:O.ORDER_EXPORT}})}),ee=["textContent"],ne={class:"sm:flex"},te={class:"sm:w-1/2"},le={class:"sm:w-1/2"},ae=b("div",{class:"flex-fill"},null,-1),oe={class:"gap-2 grid-flow-col inline-grid"};function se(e,n,s,h,p,_){const d=o("ShipmentOptionsForm"),l=o("ShippingAddress"),i=o("PdkButton"),u=o("PdkCard");return f(),C(u,{loading:e.loading},{header:a(()=>[b("span",{class:"mr-2",textContent:c(e.translate("concept"))},null,8,ee)]),default:a(()=>[b("div",ne,[b("div",te,[t(d)]),b("div",le,[t(l)])])]),footer:a(()=>[t(i,{icon:"save",onClick:e.saveDeliveryOptions},null,8,["onClick"]),ae,b("div",oe,[t(i,{icon:"add",label:"action_new_shipment",variant:"outline-primary",onClick:e.exportOrderQuery},null,8,["onClick"]),t(i,{icon:["add","local_printshop"],variant:"outline-primary",onClick:n[0]||(n[0]=()=>e.exportOrderQuery(!0))},{default:a(()=>[m(c(e.translate("action_new_shipment_print")),1)]),_:1})])]),_:1},8,["loading"])}const re=y(Y,[["render",se]]),H={label:"action_delete",action:O.LABEL_DELETE,icon:"delete",variant:"danger"},G={label:"action_refresh",action:O.LABEL_REFRESH,icon:"refresh"},ie={label:"action_create_return_label",action:O.CREATE_RETURN_LABEL,icon:"reply"},de={label:"action_print",action:O.LABEL_PRINT,icon:"print"};var V;const ue=typeof window<"u",ce=e=>typeof e<"u",pe=e=>typeof e=="function";ue&&((V=window==null?void 0:window.navigator)==null?void 0:V.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function me(e){return e}function he(e){return JSON.parse(JSON.stringify(e))}const E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},R="__vueuse_ssr_handlers__";E[R]=E[R]||{};E[R];var Q;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(Q||(Q={}));var _e=Object.defineProperty,F=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable,$=(e,n,s)=>n in e?_e(e,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[n]=s,ve=(e,n)=>{for(var s in n||(n={}))be.call(n,s)&&$(e,s,n[s]);if(F)for(var s of F(n))fe.call(n,s)&&$(e,s,n[s]);return e};const ge={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};ve({linear:me},ge);function ke(e,n,s,h={}){var p,_,d;const{clone:l=!1,passive:i=!1,eventName:u,deep:v=!1,defaultValue:g}=h,r=M(),I=s||(r==null?void 0:r.emit)||((p=r==null?void 0:r.$emit)==null?void 0:p.bind(r))||((d=(_=r==null?void 0:r.proxy)==null?void 0:_.$emit)==null?void 0:d.bind(r==null?void 0:r.proxy));let L=u;n||(n="modelValue"),L=u||L||`update:${n.toString()}`;const B=k=>l?pe(l)?l(k):he(k):k,D=()=>ce(e[n])?B(e[n]):g;if(i){const k=D(),S=T(k);return N(()=>e[n],P=>S.value=B(P)),N(S,P=>{(P!==e[n]||v)&&I(L,P)},{deep:v}),S}else return x({get(){return D()},set(k){I(L,k)}})}const Ce=w({name:"ShipmentLabel",props:{shipment:{type:Object,required:!0},modelValue:{type:String,default:null}},setup:(e,n)=>{const s=async(h=O.LABEL_PRINT)=>{};return{model:ke(e,"modelValue",n.emit),doLabelAction:s,rowDropdownItems:[G,ie,H]}}}),Oe=["href"],we={class:"btn-group"};function ye(e,n,s,h,p,_){const d=o("PdkCheckbox"),l=o("PdkTableCol"),i=o("PdkIcon"),u=o("PdkButton"),v=o("PdkDropdownButton"),g=o("PdkTableRow");return f(),C(g,null,{default:a(()=>[t(l,null,{default:a(()=>[t(d,{modelValue:e.model,"onUpdate:modelValue":n[0]||(n[0]=r=>e.model=r),value:e.shipment.id},null,8,["modelValue","value"])]),_:1}),t(l,null,{default:a(()=>[b("a",{href:e.shipment.barcode,class:"text-nowrap",rel:"noopener noreferrer",target:"_blank"},[m(c(e.shipment.barcode)+" ",1),t(i,{class:"font-16",icon:"open_in_new"})],8,Oe)]),_:1}),t(l,null,{default:a(()=>[m(c(e.shipment.status),1)]),_:1}),t(l,null,{default:a(()=>[m(c(e.shipment.updated),1)]),_:1}),t(l,{class:"text-right"},{default:a(()=>[b("div",we,[t(u,{class:"btn-sm",icon:"local_printshop",label:"action_print",onClick:n[1]||(n[1]=()=>e.doLabelAction())}),t(v,{options:e.rowDropdownItems,class:"dropdown-toggle-split",onClick:n[2]||(n[2]=r=>e.doLabelAction(r))},null,8,["options"])])]),_:1})]),_:1})}const Ie=y(Ce,[["render",ye]]),Le=w({name:"ShipmentLabels",components:{ShipmentLabel:Ie},setup:(e,n)=>{var s;const h=q(),p=x(()=>h.data.value),_=T([]),d=x({get(){return _.value},set(l){_.value=l,n.emit("select",l.map(Number))}});return{orderQuery:h,selectAll:l=>{var i,u;d.value=l||d.value.length!==((i=p.value)==null?void 0:i.shipments.length)?(u=p.value)==null?void 0:u.shipments.map(v=>{var g;return(g=v.id)==null?void 0:g.toString()}):[]},selectedRows:d,shipments:(s=p.value)==null?void 0:s.shipments,translate:A()}}}),Pe={class:"p-3 text-center"};function Se(e,n,s,h,p,_){const d=o("PdkCheckbox"),l=o("PdkTableCol"),i=o("PdkTableRow"),u=o("PdkIcon"),v=o("ShipmentLabel"),g=o("PdkTable");return f(),C(g,{class:"mb-0"},{header:a(()=>[t(i,null,{default:a(()=>[t(l,{component:"th"},{default:a(()=>[t(d,{checked:Boolean(e.shipments.length&&e.selectedRows.length===e.shipments.length),disabled:!e.shipments.length,onChange:e.selectAll},null,8,["checked","disabled","onChange"])]),_:1}),t(l,{component:"th"},{default:a(()=>[m(c(e.translate("order_labels_column_track_trace")),1)]),_:1}),t(l,{component:"th"},{default:a(()=>[m(c(e.translate("order_labels_column_status")),1)]),_:1}),t(l,{component:"th"},{default:a(()=>[m(c(e.translate("order_labels_column_last_update")),1)]),_:1}),t(l,{class:"text-right",component:"th"},{default:a(()=>[m(c(e.translate("order_labels_column_actions")),1)]),_:1})]),_:1})]),default:a(()=>[e.shipments.length?j("",!0):(f(),C(i,{key:"tr_no_shipments"},{default:a(()=>[t(l,{colspan:"5"},{default:a(()=>[b("div",Pe,[t(u,{icon:"warning"}),m(" "+c(e.translate("no_shipments")),1)])]),_:1})]),_:1})),(f(!0),U(z,null,Z(e.shipments,r=>(f(),C(v,{key:`${r==null?void 0:r.id}_${r.updated}`,modelValue:e.selectedRows,"onUpdate:modelValue":n[0]||(n[0]=I=>e.selectedRows=I),shipment:r},null,8,["modelValue","shipment"]))),128))]),_:1})}const xe=y(Le,[["render",Se]]),Ee=w({name:"ShipmentsCard",components:{ShipmentLabels:xe},setup:()=>{const e=T([]);return{translate:A(),selectedLabels:e,setSelectedLabels(n){e.value=n},bulkActionDropdownItems:[G,de,H],async onBulkAction(n){}}}}),Re=["textContent"];function Ae(e,n,s,h,p,_){const d=o("PdkIcon"),l=o("ShipmentLabels"),i=o("PdkDropdownButton"),u=o("PdkCard");return f(),C(u,null,{header:a(()=>[t(d,{icon:"local_shipping"}),m(" "+c(e.translate("order_labels_header")),1)]),default:a(()=>[t(l,{onSelect:e.setSelectedLabels},null,8,["onSelect"])]),footer:a(()=>[t(i,{disabled:!e.selectedLabels.length,options:e.bulkActionDropdownItems,onClick:e.onBulkAction},{default:a(()=>[m(c(e.translate("bulk_actions"))+" ",1),e.selectedLabels.length?(f(),U("span",{key:0,class:"badge badge-dark ml-1",textContent:c(e.selectedLabels.length)},null,8,Re)):j("",!0)]),_:1},8,["disabled","options","onClick"])]),_:1})}const Te=y(Ee,[["render",Ae]]),Be=w({name:"OrderCard",components:{ConceptCard:re,ShipmentsCard:Te},setup:()=>({context:X(K.ORDER_DATA)})}),De=b("h3",{class:"card-header-title",textContent:"MyParcel"},null,-1);function Ne(e,n,s,h,p,_){const d=o("ConceptCard"),l=o("ShipmentsCard"),i=o("PdkCard");return f(),C(i,null,{header:a(()=>[De]),default:a(()=>[t(d),t(l)]),_:1})}const je=y(Be,[["render",Ne]]);export{je as default};
