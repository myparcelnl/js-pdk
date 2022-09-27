import{P}from"./actions.4188b86e.js";import{S as M,a as W}from"./ShippingAddress.5b234cf2.js";import{o as X}from"./boot.e272cece.js";import{u as R}from"./useTranslate.377a0d4c.js";import{h as w,L as O,q as a,k,s as v,C as o,m as h,n as u,D as t,I as f,r as B,w as D,G as A,g as K,v as G,l as H,x as z,F as Y}from"./index.aeebef3f.js";import{u as Z,a as x}from"./useOrder.f854e906.js";const ee=w({name:"ConceptCard",components:{ShipmentOptionsForm:M,ShippingAddress:W},setup:()=>({translate:R(),saveDeliveryOptions:async()=>{},exportOrderQuery:async(e=!1)=>{e?P.ORDER_EXPORT_PRINT:P.ORDER_EXPORT}})}),ne=["textContent"],te={class:"sm:flex"},oe={class:"sm:w-1/2"},se={class:"sm:w-1/2"},ae=h("div",{class:"flex-fill"},null,-1),le={class:"gap-2 grid-flow-col inline-grid"};function re(e,n,l,p,_,m){const i=a("ShipmentOptionsForm"),s=a("ShippingAddress"),d=a("PdkButton"),c=a("PdkCard");return k(),v(c,{loading:e.loading},{header:o(()=>[h("span",{class:"mr-2",textContent:u(e.translate("concept"))},null,8,ne)]),default:o(()=>[h("div",te,[h("div",oe,[t(i)]),h("div",se,[t(s)])])]),footer:o(()=>[t(d,{icon:"save",onClick:e.saveDeliveryOptions},null,8,["onClick"]),ae,h("div",le,[t(d,{icon:"add",label:"action_new_shipment",variant:"outline-primary",onClick:e.exportOrderQuery},null,8,["onClick"]),t(d,{icon:["add","local_printshop"],variant:"outline-primary",onClick:n[0]||(n[0]=()=>e.exportOrderQuery(!0))},{default:o(()=>[f(u(e.translate("action_new_shipment_print")),1)]),_:1})])]),_:1},8,["loading"])}const de=O(ee,[["render",re]]),J={label:"action_delete",action:P.LABEL_DELETE,icon:"delete",variant:"danger"},q={label:"action_refresh",action:P.LABEL_REFRESH,icon:"refresh"},ie={label:"action_create_return_label",action:P.CREATE_RETURN_LABEL,icon:"reply"},ce={label:"action_print",action:P.LABEL_PRINT,icon:"print"};var Q;const y=typeof window<"u",ue=e=>typeof e<"u",pe=e=>typeof e=="function";y&&((Q=window==null?void 0:window.navigator)==null?void 0:Q.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function _e(e){return e}y&&window.document;y&&window.navigator;y&&window.location;function me(e){return JSON.parse(JSON.stringify(e))}const E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},T="__vueuse_ssr_handlers__";E[T]=E[T]||{};E[T];var F;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(F||(F={}));var fe=Object.defineProperty,U=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,j=(e,n,l)=>n in e?fe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[n]=l,ke=(e,n)=>{for(var l in n||(n={}))he.call(n,l)&&j(e,l,n[l]);if(U)for(var l of U(n))be.call(n,l)&&j(e,l,n[l]);return e};const Ce={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};ke({linear:_e},Ce);function ge(e,n,l,p={}){var _,m,i;const{clone:s=!1,passive:d=!1,eventName:c,deep:b=!1,defaultValue:C}=p,r=K(),$=l||(r==null?void 0:r.emit)||((_=r==null?void 0:r.$emit)==null?void 0:_.bind(r))||((i=(m=r==null?void 0:r.proxy)==null?void 0:m.$emit)==null?void 0:i.bind(r==null?void 0:r.proxy));let I=c;n||(n="modelValue"),I=c||I||`update:${n.toString()}`;const N=g=>s?pe(s)?s(g):me(g):g,V=()=>ue(e[n])?N(e[n]):C;if(d){const g=V(),L=B(g);return D(()=>e[n],S=>L.value=N(S)),D(L,S=>{(S!==e[n]||b)&&$(I,S)},{deep:b}),L}else return A({get(){return V()},set(g){$(I,g)}})}const ve=w({name:"ShipmentLabel",props:{shipment:{type:Object,required:!0},modelValue:{type:String,default:null}},setup:(e,n)=>{const l=async(_=P.LABEL_PRINT)=>{};return{model:ge(e,"modelValue",n.emit),doLabelAction:l,rowDropdownItems:[q,ie,J]}}}),Pe=["href"],we={class:"btn-group"};function Oe(e,n,l,p,_,m){const i=a("PdkCheckbox"),s=a("PdkTableCol"),d=a("PdkIcon"),c=a("PdkButton"),b=a("PdkDropdownButton"),C=a("PdkTableRow");return k(),v(C,null,{default:o(()=>[t(s,null,{default:o(()=>[t(i,{modelValue:e.model,"onUpdate:modelValue":n[0]||(n[0]=r=>e.model=r),value:e.shipment.id},null,8,["modelValue","value"])]),_:1}),t(s,null,{default:o(()=>[h("a",{href:e.shipment.barcode,class:"text-nowrap",rel:"noopener noreferrer",target:"_blank"},[f(u(e.shipment.barcode)+" ",1),t(d,{class:"font-16",icon:"open_in_new"})],8,Pe)]),_:1}),t(s,null,{default:o(()=>[f(u(e.shipment.status),1)]),_:1}),t(s,null,{default:o(()=>[f(u(e.shipment.updated),1)]),_:1}),t(s,{class:"text-right"},{default:o(()=>[h("div",we,[t(c,{class:"btn-sm",icon:"local_printshop",label:"action_print",onClick:n[1]||(n[1]=()=>e.doLabelAction())}),t(b,{options:e.rowDropdownItems,class:"dropdown-toggle-split",onClick:n[2]||(n[2]=r=>e.doLabelAction(r))},null,8,["options"])])]),_:1})]),_:1})}const $e=O(ve,[["render",Oe]]),Ie=w({name:"ShipmentLabels",components:{ShipmentLabel:$e},setup:(e,n)=>{var s;const l=Z(),p=A(()=>l.data.value),_=B([]),m=A({get(){return _.value},set(d){_.value=d,n.emit("select",d.map(Number))}});return{orderQuery:l,selectAll:d=>{var c,b;m.value=d||m.value.length!==((c=p.value)==null?void 0:c.shipments.length)?(b=p.value)==null?void 0:b.shipments.map(C=>{var r;return(r=C.id)==null?void 0:r.toString()}):[]},selectedRows:m,shipments:(s=p.value)==null?void 0:s.shipments,translate:R()}}}),Se={class:"p-3 text-center"};function ye(e,n,l,p,_,m){const i=a("PdkCheckbox"),s=a("PdkTableCol"),d=a("PdkTableRow"),c=a("PdkIcon"),b=a("ShipmentLabel"),C=a("PdkTable");return k(),v(C,{class:"mb-0"},{header:o(()=>[t(d,null,{default:o(()=>[t(s,{component:"th"},{default:o(()=>[t(i,{checked:Boolean(e.shipments.length&&e.selectedRows.length===e.shipments.length),disabled:!e.shipments.length,onChange:e.selectAll},null,8,["checked","disabled","onChange"])]),_:1}),t(s,{component:"th"},{default:o(()=>[f(u(e.translate("order_labels_column_track_trace")),1)]),_:1}),t(s,{component:"th"},{default:o(()=>[f(u(e.translate("order_labels_column_status")),1)]),_:1}),t(s,{component:"th"},{default:o(()=>[f(u(e.translate("order_labels_column_last_update")),1)]),_:1}),t(s,{class:"text-right",component:"th"},{default:o(()=>[f(u(e.translate("order_labels_column_actions")),1)]),_:1})]),_:1})]),default:o(()=>[e.shipments.length?G("",!0):(k(),v(d,{key:"tr_no_shipments"},{default:o(()=>[t(s,{colspan:"5"},{default:o(()=>[h("div",Se,[t(c,{icon:"warning"}),f(" "+u(e.translate("no_shipments")),1)])]),_:1})]),_:1})),(k(!0),H(Y,null,z(e.shipments,r=>(k(),v(b,{key:`${r==null?void 0:r.id}_${r.updated}`,modelValue:e.selectedRows,"onUpdate:modelValue":n[0]||(n[0]=$=>e.selectedRows=$),shipment:r},null,8,["modelValue","shipment"]))),128))]),_:1})}const Le=O(Ie,[["render",ye]]),Ae=w({name:"ShipmentsCard",components:{ShipmentLabels:Le},setup:()=>{const e=B([]);return{translate:R(),selectedLabels:e,setSelectedLabels(n){e.value=n},bulkActionDropdownItems:[q,ce,J],async onBulkAction(n){}}}}),Ee=["textContent"];function Te(e,n,l,p,_,m){const i=a("PdkIcon"),s=a("ShipmentLabels"),d=a("PdkDropdownButton"),c=a("PdkCard");return k(),v(c,null,{header:o(()=>[t(i,{icon:"local_shipping"}),f(" "+u(e.translate("order_labels_header")),1)]),default:o(()=>[t(s,{onSelect:e.setSelectedLabels},null,8,["onSelect"])]),footer:o(()=>[t(d,{disabled:!e.selectedLabels.length,options:e.bulkActionDropdownItems,onClick:e.onBulkAction},{default:o(()=>[f(u(e.translate("bulk_actions"))+" ",1),e.selectedLabels.length?(k(),H("span",{key:0,class:"badge badge-dark ml-1",textContent:u(e.selectedLabels.length)},null,8,Ee)):G("",!0)]),_:1},8,["disabled","options","onClick"])]),_:1})}const Re=O(Ae,[["render",Te]]),Be=w({name:"OrderCard",components:{ConceptCard:de,ShipmentsCard:Re},setup:()=>({context:x(X.ORDER_DATA)})}),Ne=h("h3",{class:"card-header-title",textContent:"MyParcel"},null,-1);function Ve(e,n,l,p,_,m){const i=a("ConceptCard"),s=a("ShipmentsCard"),d=a("PdkCard");return k(),v(d,null,{header:o(()=>[Ne]),default:o(()=>[t(i),t(s)]),_:1})}const He=O(Be,[["render",Ve]]);export{He as default};
