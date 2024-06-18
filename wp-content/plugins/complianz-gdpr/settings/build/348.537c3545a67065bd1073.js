"use strict";(globalThis.webpackChunkcomplianz_gdpr=globalThis.webpackChunkcomplianz_gdpr||[]).push([[348,8895],{88895:(e,a,t)=>{t.r(a),t.d(a,{default:()=>l});var n=t(81621),o=t(9588);const r={optin:{labels:["Functional","Statistics","Marketing","Do Not Track","No Choice","No Warning"],categories:["functional","statistics","marketing","do_not_track","no_choice","no_warning"],datasets:[{data:["0","0","0","0","0","0"],backgroundColor:"rgba(46, 138, 55, 1)",borderColor:"rgba(46, 138, 55, 1)",label:"A (default)",fill:"false",borderDash:[0,0]},{data:["0","0","0","0","0","0"],backgroundColor:"rgba(244, 191, 62, 1)",borderColor:"rgba(244, 191, 62, 1)",label:"B",fill:"false",borderDash:[0,0]}],max:5},optout:{labels:["Functional","Statistics","Marketing","Do Not Track","No Choice","No Warning"],categories:["functional","statistics","marketing","do_not_track","no_choice","no_warning"],datasets:[{data:["0","0","0","0","0","0"],backgroundColor:"rgba(46, 138, 55, 1)",borderColor:"rgba(46, 138, 55, 1)",label:"A (default)",fill:"false",borderDash:[0,0]},{data:["0","0","0","0","0","0"],backgroundColor:"rgba(244, 191, 62, 1)",borderColor:"rgba(244, 191, 62, 1)",label:"B",fill:"false",borderDash:[0,0]}],max:5}},s={optin:{labels:["Functional","Statistics","Marketing","Do Not Track","No Choice","No Warning"],categories:["functional","statistics","marketing","do_not_track","no_choice","no_warning"],datasets:[{data:["29","747","174","292","30","10"],backgroundColor:"rgba(46, 138, 55, 1)",borderColor:"rgba(46, 138, 55, 1)",label:"Demo A (default)",fill:"false",borderDash:[0,0]},{data:["3","536","240","389","45","32"],backgroundColor:"rgba(244, 191, 62, 1)",borderColor:"rgba(244, 191, 62, 1)",label:"Demo B",fill:"false",borderDash:[0,0]}],max:5},optout:{labels:["Functional","Statistics","Marketing","Do Not Track","No Choice","No Warning"],categories:["functional","statistics","marketing","do_not_track","no_choice","no_warning"],datasets:[{data:["29","747","174","292","30","10"],backgroundColor:"rgba(46, 138, 55, 1)",borderColor:"rgba(46, 138, 55, 1)",label:"A (default)",fill:"false",borderDash:[0,0]},{data:["3","536","240","389","45","32"],backgroundColor:"rgba(244, 191, 62, 1)",borderColor:"rgba(244, 191, 62, 1)",label:"Demo B",fill:"false",borderDash:[0,0]}],max:5}},l=(0,n.vt)(((e,a)=>({consentType:"optin",setConsentType:a=>{e({consentType:a})},statisticsLoading:!1,consentTypes:[],regions:[],defaultConsentType:"optin",loaded:!1,statisticsData:r,emptyStatisticsData:r,bestPerformerEnabled:!1,daysLeft:"",abTrackingCompleted:!1,labels:[],setLabels:a=>{e({labels:a})},fetchStatisticsData:async()=>{if(!cmplz_settings.is_premium)return void e({saving:!1,loaded:!0,consentType:"optin",consentTypes:["optin","optout"],statisticsData:s,defaultConsentType:"optin",bestPerformerEnabled:!1,regions:"eu",daysLeft:11,abTrackingCompleted:!1});if(e({saving:!0}),a().loaded)return;const{daysLeft:t,abTrackingCompleted:n,consentTypes:r,statisticsData:l,defaultConsentType:i,regions:c,bestPerformerEnabled:d}=await o.doAction("get_statistics_data",{}).then((e=>e)).catch((e=>{console.error(e)}));e({saving:!1,loaded:!0,consentType:i,consentTypes:r,statisticsData:l,defaultConsentType:i,bestPerformerEnabled:d,regions:c,daysLeft:t,abTrackingCompleted:n})}})))},70348:(e,a,t)=>{t.r(a),t.d(a,{default:()=>i});var n=t(86087),o=t(4219),r=t(88895),s=t(45111),l=t(27723);const i=(0,n.memo)((()=>{const{fields:e,getFieldValue:a,addHelpNotice:t}=(0,o.default)(),{regions:i,abTrackingCompleted:c,daysLeft:d,bestPerformerEnabled:b,loaded:g,fetchStatisticsData:p}=(0,r.default)(),[f,u]=(0,n.useState)(!1),[h,m]=(0,n.useState)(!1);(0,n.useEffect)((()=>{g||p()}),[]),(0,n.useEffect)((()=>{let e=1==a("a_b_testing");u(e);let t=1==a("a_b_testing_buttons");m(t)}),[e]);const _=(e,a,t)=>(0,n.createElement)("div",{className:"cmplz-statistics-status"},(0,n.createElement)(s.default,{name:e,color:a}),t);return(0,n.useEffect)((()=>{let e=(0,l.__)('The conversion graph shows the ratio for the different choices users have. When a user has made a choice, this will be counted as either a converted user, or a not converted. If no choice is made, the user will be listed in the "No choice" category.',"complianz-gdpr");if(e+="&nbsp;",1==a("use_country")&&i.length>0){const a=i.filter((e=>"label"!==e.value)).map((e=>e.label));e+=(0,l.__)("As you have enabled geoip, there are several regions in which a banner is shown, in different ways. In regions apart from %s no banner is shown at all.","complianz-gdpr").replace("%s",a.join(", "))}t("a_b_testing","warning",e,(0,l.__)("Banners in different regions","complianz-gdpr"))}),[i]),(0,n.createElement)(n.Fragment,null,b&&_("circle-check","green",(0,l.__)("The consent banner with the best results has been enabled as default banner.","complianz-gdpr")),!b&&f&&!h&&_("circle-times","grey",(0,l.__)("A/B testing is disabled. Previously made progress is saved.","complianz-gdpr")),!b&&h&&(0,n.createElement)(n.Fragment,null,!c&&(0,n.createElement)(n.Fragment,null,d>1&&_("circle-check","green",(0,l.__)("A/B is enabled and will end in %s days.","complianz-gdpr").replace("%s",d)),1===d&&_("circle-check","green",(0,l.__)("A/B is enabled and will end in 1 day.","complianz-gdpr").replace("%s",d)),0===d&&_("circle-check","green",(0,l.__)("A/B is enabled and will end today.","complianz-gdpr"))),c&&(0,n.createElement)(n.Fragment,null,_("circle-check","green",(0,l.__)("The A/B tracking period has ended, the best performer will be enabled on the next scheduled check.","complianz-gdpr")))))}))}}]);