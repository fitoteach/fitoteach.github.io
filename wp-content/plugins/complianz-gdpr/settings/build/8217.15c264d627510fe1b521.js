"use strict";(globalThis.webpackChunkcomplianz_gdpr=globalThis.webpackChunkcomplianz_gdpr||[]).push([[8217,5228],{98217:(e,t,l)=>{l.r(t),l.d(t,{default:()=>o});var a=l(86087),n=l(45111),r=l(27723),c=l(25228);const o=e=>{const[t,l]=(0,a.useState)(!1),[o,s]=(0,a.useState)(!1),[i,u]=(0,a.useState)(!1);(0,a.useEffect)((()=>{let t=e.options;if(0===t.length){let l={label:e.name,value:0};t.unshift(l)}else if(!t.filter((e=>0===e.value)).length>0){let l={label:e.name,value:0};t.unshift(l)}u(t)}),[e.options]);const m=()=>{if(o||!t||0===t)return;s(!0);let e=new XMLHttpRequest;e.responseType="blob",e.open("get",t,!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=window.URL.createObjectURL(this.response),l=window.document.createElement("a");l.setAttribute("href",e),l.setAttribute("download",i.filter((e=>e.value===t))[0].label),window.document.body.appendChild(l),l.click(),setTimeout((function(){window.URL.revokeObjectURL(e)}),6e4)}},e.onprogress=function(e){s(!0)}};return(0,a.createElement)("div",{className:"cmplz-single-document-other-documents"},(0,a.createElement)(c.default,{onChange:e=>l(e),defaultValue:"0",canBeEmpty:!1,value:t,options:i}),(0,a.createElement)("div",{onClick:()=>m()},(0,a.createElement)(n.default,{name:"file-download",color:0==t||o?"grey":"black",tooltip:(0,r.__)("Download file","complianz-gdpr"),size:14})),i.length>0&&(0,a.createElement)("a",{href:e.link},(0,a.createElement)(n.default,{name:"circle-chevron-right",color:"black",tooltip:(0,r.__)("Go to overview","complianz-gdpr"),size:14})),0===i.length&&(0,a.createElement)("a",{href:e.link},(0,a.createElement)(n.default,{name:"plus",color:"black",tooltip:(0,r.__)("Create new","complianz-gdpr"),size:14})))}},25228:(e,t,l)=>{l.r(t),l.d(t,{default:()=>o});var a=l(86087),n=l(45296),r=l(45111),c=l(27723);const o=(0,a.memo)((({value:e=!1,onChange:t,required:l,defaultValue:o,disabled:s,options:i={},canBeEmpty:u=!0,label:m})=>{if(Array.isArray(i)){let e={};i.map((t=>{e[t.value]=t.label})),i=e}return u?(""===e||!1===e||0===e)&&(e="0",i={0:(0,c.__)("Select an option","complianz-gdpr"),...i}):e||(e=Object.keys(i)[0]),(0,a.createElement)("div",{className:"cmplz-input-group cmplz-select-group",key:m},(0,a.createElement)(n.bL,{value:e,defaultValue:o,onValueChange:t,required:l,disabled:s&&!Array.isArray(s)},(0,a.createElement)(n.l9,{className:"cmplz-select-group__trigger"},(0,a.createElement)(n.WT,null),(0,a.createElement)(r.default,{name:"chevron-down"})),(0,a.createElement)(n.UC,{className:"cmplz-select-group__content",position:"popper"},(0,a.createElement)(n.PP,{className:"cmplz-select-group__scroll-button"},(0,a.createElement)(r.default,{name:"chevron-up"})),(0,a.createElement)(n.LM,{className:"cmplz-select-group__viewport"},(0,a.createElement)(n.YJ,null,Object.entries(i).map((([e,t])=>(0,a.createElement)(n.q7,{disabled:Array.isArray(s)&&s.includes(e),className:"cmplz-select-group__item",key:e,value:e},(0,a.createElement)(n.p4,null,t)))))),(0,a.createElement)(n.wn,{className:"cmplz-select-group__scroll-button"},(0,a.createElement)(r.default,{name:"chevron-down"})))))}))}}]);