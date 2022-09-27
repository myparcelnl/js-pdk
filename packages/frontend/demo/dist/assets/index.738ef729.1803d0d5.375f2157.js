import{h as I,E as B,c as N,G as b,J as g,K as P,j as T,q as c,k as s,l as m,D as r,C as u,F as V,x as j,s as x,T as M,m as t,I as _,n as i,v as O}from"./index.aeebef3f.js";import{e as y}from"./actions.c117c8b0.28e8e71a.64d8a71b.js";import{r as L}from"./_plugin-vue_export-helper.e9cbb45e.72bab03e.a8c17577.js";const S=I({name:"LabelCard",props:{shipment:{type:Object,required:!0}},setup:()=>{const e=async(n,a)=>{};return{print:async n=>e(y.LABEL_PRINT),refresh:async n=>e(y.LABEL_REFRESH)}}}),$={class:"card p-1"},q=["textContent"],w={class:"align-items-center d-flex text-nowrap"},A=["href","textContent"];function D(e,n,a,l,p,d){const o=c("PdkIcon");return s(),m("div",$,[t("label",{textContent:i(e.shipment.status)},null,8,q),t("div",w,[t("a",{href:e.shipment.barcode,rel:"noopener noreferrer",target:"_blank",textContent:i(e.shipment.barcode)},null,8,A),t("a",{class:"btn btn-link",onClick:n[0]||(n[0]=()=>e.print(e.shipment.id))},[r(o,{icon:"print"})]),t("a",{class:"btn btn-link",onClick:n[1]||(n[1]=()=>e.refresh(e.shipment.id))},[r(o,{icon:"refresh"})])])])}const F=L(S,[["render",D]]),G=I({name:"OrderListColumn",components:{LabelCard:F},setup:()=>{const e=B(),n=N("id"),a=b(()=>e.data.value),l=b(()=>{var d;return(d=a.value)==null?void 0:d.externalIdentifier}),p=g();return{externalIdentifier:l,order:a,orderQuery:e,openModal(){p.open(P.SHIPMENT_OPTIONS,l.value)},id:n,translate:T(),print:async()=>{}}}}),H={class:"btn-group"};function R(e,n,a,l,p,d){var o;const E=c("LabelCard"),f=c("PdkIcon"),h=c("PdkButton");return s(),m("div",null,[r(M,{appear:"",name:"mypa__fade"},{default:u(()=>{var C;return[(s(!0),m(V,null,j((C=e.order)==null?void 0:C.shipments,v=>{var k;return s(),x(E,{key:`${(k=e.order)==null?void 0:k.externalIdentifier}_shipment_${v.id}`,shipment:v},null,8,["shipment"])}),128))]}),_:1}),t("div",H,[r(h,{variant:"outline-secondary",onClick:e.openModal},{default:u(()=>[r(f,{icon:"label"}),_(" "+i(e.translate("action_create"))+" #"+i(e.externalIdentifier),1)]),_:1},8,["onClick"]),(o=e.order)!=null&&o.shipments.length?(s(),x(h,{key:0,variant:"primary",onClick:e.print},{default:u(()=>[r(f,{icon:"print"}),_(" "+i(e.translate("action_print")),1)]),_:1},8,["onClick"])):O("",!0)])])}const W=L(G,[["render",R]]);export{W as default};
