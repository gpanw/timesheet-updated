(this["webpackJsonpreactify-ui"]=this["webpackJsonpreactify-ui"]||[]).push([[0],{39:function(e,t,a){e.exports=a(62)},44:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(21),s=a.n(r),o=(a(44),a(45),a(46),a(47),a(3)),c=a(4),i=a(6),u=a(5),m=a(7),h=a(22),d=a(10),p=(a(19),a(18)),v=a.n(p),f=a(20),g=a(9),E=a(15),k=a(14),b=(n.Component,n.Component,function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).captureChange=function(e){var t=a.props.timeSheetEntry,n=a.props.change_timeSheet,l=a.state.daySum,r=e.target.value;if(""!==r&&" "!==r||(r=0),r>=0&&r<=24){var s=parseInt(e.target.name),o=parseInt(s/10),c=s%10,i=r-t[o].hours[c];l[c]=parseFloat(l[c])+parseFloat(i),n(o,c,r),a.setState({daySum:l})}else alert("not a valid value")},a.captureBlur=function(e){e.preventDefault();var t=a.props.change_timeSheet,n=parseInt(e.target.name),l=parseInt(n/10),r=n%10,s=parseFloat(e.target.value).toFixed(1);""!==s&&" "!==s||(s=0),t(l,r,s)},a.state={currWeek:[0,0,0,0,0,0,0],myVal:" ",daySum:[0,0,0,0,0,0,0]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.currDate,t=this.state.currWeek;t[0]=this.decrementDate(new Date(e),-1)[0],t[1]=this.decrementDate(new Date(e),0)[0],t[2]=this.decrementDate(new Date(e),1)[0],t[3]=this.decrementDate(new Date(e),2)[0],t[4]=this.decrementDate(new Date(e),3)[0],t[5]=this.decrementDate(new Date(e),4)[0],t[6]=this.decrementDate(new Date(e),5)[0],this.setState({currWeek:t})}},{key:"componentDidUpdate",value:function(e){if(this.props.currDate!==e.currDate){var t=this.props.currDate,a=this.state.currWeek;a[0]=this.decrementDate(new Date(t),-1)[0],a[1]=this.decrementDate(new Date(t),0)[0],a[2]=this.decrementDate(new Date(t),1)[0],a[3]=this.decrementDate(new Date(t),2)[0],a[4]=this.decrementDate(new Date(t),3)[0],a[5]=this.decrementDate(new Date(t),4)[0],a[6]=this.decrementDate(new Date(t),5)[0],this.setState({currWeek:a,daySum:[0,0,0,0,0,0,0]})}if(this.props.timeSheetEntry!==e.timeSheetEntry){for(var n=this.props.timeSheetEntry,l=this.props.add_task,r=[0,0,0,0,0,0,0],s=0;s<n.length;s++){for(var o=n[s].taskid+n[s].is_billable,c=0;c<=6;c++)r[c]=parseFloat(r[c])+parseFloat(n[s].hours[c]);l&&l(o)}this.setState({daySum:r})}}},{key:"decrementDate",value:function(e,t){if(!e)return[0,0,0];if(e.getDay()<6)var a=e.getDate()-e.getDay()+t;else a=e.getDate()+1+t;var n=new Date(e.setDate(a)).toDateString(),l=n.split(" "),r=l[0]+" "+l[2]+"-"+l[1],s=new Date(e.setDate(a));return[r,n,s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate()]}},{key:"add_td",value:function(e,t){for(var a=[],n=0;n<=6;n++)a.push(l.a.createElement("td",null,l.a.createElement("input",{className:"hours form-control",onChange:this.captureChange,onBlur:this.captureBlur,name:e.toString()+n,type:"text",value:t.hours[n]})));return a}},{key:"add_td_total",value:function(){for(var e=this.state.daySum,t=[],a=0;a<=6;a++)t.push(l.a.createElement("td",null,l.a.createElement("input",{className:"hours form-control",type:"text",value:parseFloat(e[a]).toFixed(1),readonly:!0,disabled:!0})));return t}},{key:"render",value:function(){var e=this,t=this.props.timeSheetEntry,a=this.state.daySum,n=this.state.currWeek;return l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:"table table-striped",id:"task-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"task"},"Task #"),l.a.createElement("th",{className:"isbill"},"Billable"),l.a.createElement("th",{id:"head-sat"},n[0]),l.a.createElement("th",{id:"head-sun"},n[1]),l.a.createElement("th",{id:"head-mon"},n[2]),l.a.createElement("th",{id:"head-tue"},n[3]),l.a.createElement("th",{id:"head-wed"},n[4]),l.a.createElement("th",{id:"head-thu"},n[5]),l.a.createElement("th",{id:"head-fri"},n[6]),l.a.createElement("th",null,"Total"))),l.a.createElement("tbody",{id:"timesheet-table"},t.map((function(t,a){return l.a.createElement("tr",null,l.a.createElement("td",null,t.taskid),l.a.createElement("td",null,l.a.createElement("input",{className:"checkbill",type:"checkbox",readonly:!0,disabled:!0,defaultChecked:"B"===t.is_billable})),e.add_td(a,t),l.a.createElement("td",{className:"total-task"},l.a.createElement("input",{className:"hours form-control",type:"text",value:parseFloat(parseFloat(t.hours[0])+parseFloat(t.hours[1])+parseFloat(t.hours[2])+parseFloat(t.hours[3])+parseFloat(t.hours[4])+parseFloat(t.hours[5])+parseFloat(t.hours[6])).toFixed(1),readonly:!0,disabled:!0})))})),l.a.createElement("tr",{id:"total"},l.a.createElement("td",{className:"task-total"},"Total"),l.a.createElement("td",{className:"isbill"}),this.add_td_total(),l.a.createElement("td",null,l.a.createElement("input",{className:"hours form-control total-day",type:"text",value:parseFloat(parseFloat(a[0])+parseFloat(a[1])+parseFloat(a[2])+parseFloat(a[3])+parseFloat(a[4])+parseFloat(a[5])+parseFloat(a[6])).toFixed(1),readonly:!0,disabled:!0}))))))))}}]),t}(n.Component)),_=a(67),D=a(63),y=a(64),j=a(65),S=a(66);function w(e){return l.a.createElement("select",{className:"form-control",ref:e.InputRef,onChange:e.selectItem},l.a.createElement("option",{value:"0"},e.initials),e.userTasks.map((function(t,a){if(e.inputKey){var n=t[e.inputKey];if(void 0!==t.is_billable)n+=" | "+(t.is_billable?"Billable":"NonBillable")}else n=t;return l.a.createElement("option",{value:n},n)})),e.other?l.a.createElement("option",{value:"other"},e.other):"")}var O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggle_radio=function(e){a.setState({leave_checked:!a.state.leave_checked})},a.selectTask=function(e){e.preventDefault();var t=a.selectRef.value;a.addSelectedTask(t),a.selectRef.value=0},a.otherSelectTask=function(e){e.preventDefault(),a.setState({otherTask:a.otherSelectRef.value})},a.addOtherTask=function(e){e.preventDefault();var t=a.state.otherTask;t&&a.addSelectedTask(t)},a.addSelectedTask=function(e){var t=a.props.addedTask,n=a.props.handle_selectTask,l=a.state.leave_checked;if("other"===e)a.toggle_modal();else{if(l)e+="L";else{var r=e.split(" | ")[1];e=e.split(" | ")[0],"Billable"===r&&(e+="B"),"NonBillable"===r&&(e+="N")}t.includes(e)?alert("task has already been added!!!"):n&&n(e)}},a.selectTeam=function(e){e.preventDefault(),a.loadTasks(a.TeamSelectRef.value)},a.toggle_modal=function(){a.state.modal_open||0!==a.state.teamList.length||a.loadTeams(),a.setState({modal_open:!a.state.modal_open,taskList:[],otherTask:""})},a.state={leave_checked:!1,modal_open:!1,teamList:[],taskList:[],otherTask:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({leave_checked:!1,modal_open:!1})}},{key:"loadTeams",value:function(){var e=this;fetch("/api/project/teams/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e.setState({teamList:t})})).catch((function(e){console.log("error",e)}))}},{key:"loadTasks",value:function(e){var t=this,a="/api/project/tasks/";e&&(a+=e);fetch(a,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t.setState({taskList:e})})).catch((function(e){console.log("error",e)}))}},{key:"render",value:function(){var e=this,t=this.props.userTasks,a=this.props.leaves,n=this.state.leave_checked;return l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"radio col-xs-3 offset-md-3"},"Leaves",l.a.createElement("label",{className:"radio ml-1"},l.a.createElement("input",{type:"radio",value:"leaves",ref:function(t){e.leaveRadioRef=t},checked:n,onClick:this.toggle_radio}))),this.state.leave_checked?l.a.createElement("div",{className:"col-md-6"},l.a.createElement("select",{className:"form-control",ref:function(t){e.selectRef=t},onChange:this.selectTask},l.a.createElement("option",{value:"0"},"Select leaves from dropdown"),a.map((function(e,t){return l.a.createElement("option",{value:e.leave_id+" - "+e.leave_description},e.leave_id+" - "+e.leave_description)})))):l.a.createElement("div",{className:"col-md-6"},l.a.createElement(w,{userTasks:t,selectItem:this.selectTask,InputRef:function(t){e.selectRef=t},other:"Other - Tasks from other Teams",inputKey:"task_name",initials:"Select tasks from dropdown"})),l.a.createElement("div",null,l.a.createElement(_.a,{isOpen:this.state.modal_open,toggle:this.toggle_modal},l.a.createElement(D.a,{toggle:this.toggle_modal},"Add Tasks From Other Team"),l.a.createElement(y.a,null,l.a.createElement(w,{userTasks:this.state.teamList,selectItem:this.selectTeam,InputRef:function(t){e.TeamSelectRef=t},other:!1,inputKey:"team_name",initials:"Select Team from dropdown"}),l.a.createElement("br",null),l.a.createElement(w,{userTasks:this.state.taskList,selectItem:this.otherSelectTask,InputRef:function(t){e.otherSelectRef=t},other:!1,inputKey:"task_name",initials:"Select tasks from dropdown"})),l.a.createElement(j.a,null,l.a.createElement(S.a,{color:"secondary",onClick:this.addOtherTask},"Add To timesheet")))))}}]),t}(n.Component),T=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.userTasks,t=this.props.leaves,a=this.props.title,n=this.props.addedTask,r=this.props.handle_selectTask;return l.a.createElement("div",{className:"jumbotron"},l.a.createElement("div",{className:"container-fluid"},l.a.createElement("h2",null,a),l.a.createElement("hr",null),l.a.createElement(O,{userTasks:e,leaves:t,addedTask:n,handle_selectTask:r})))}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handle_clickDate=function(e){var t=a.props.handle_changeDate;e.preventDefault();var n=e.target.innerText.replace("Current","");a.setState({selected_p:e.target.id}),t(new Date(n))},a.state={weekList:[],selected_p:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({selected_p:0}),this.add_dates()}},{key:"componentDidUpdate",value:function(e){this.props.currDate!==e.currDate&&this.add_dates()}},{key:"add_dates",value:function(){var e=this.props.decrementDate,t=this.props.currDate;if(t){var a=this.state.weekList,n=new Date(t);a.push(e(n,5)[1]);var l=-7;"Time Sheet"===this.props.title&&(l*=-1);for(var r=0;r<11;r++){var s=n.getDate()+l,o=new Date(n.setDate(s)).toDateString(),c=e(n=new Date(o),5)[1];a.push(c)}this.setState({weekList:a})}}},{key:"add_p_el",value:function(){var e=this.state.weekList,t=this.state.selected_p,a=[];a.push(l.a.createElement("p",{className:0==t?"future-week selected":"future-week",id:0,onClick:this.handle_clickDate},e[0]," ","Time Sheet"===this.props.title?"Current":""));for(var n=1;n<11;n++)a.push(l.a.createElement("p",{className:t==n?"future-week selected":"future-week",id:n,onClick:this.handle_clickDate},e[n]));return a}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"week-list-head"},"Select a week from dropdown"),l.a.createElement("div",{className:"float-left week-list"},this.add_p_el()))}}]),t}(n.Component),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).add_task=function(e){e=e.replace(" | ","");var t=a.state.addedTask;t.includes(e)?alert("task has already been added"):(t.push(e),a.setState({addedTask:t}))},a.handle_selectTask=function(e){var t=a.state.timeSheetEntry,n={};n.taskid=e.slice(0,e.length-1),n.is_billable=e[e.length-1],n.hours=["0.0","0.0","0.0","0.0","0.0","0.0","0.0"],n.sum_hours=0,n.approved="Y",n.approved_by="",t.push(n),a.add_task(e),a.setState({timeSheetEntry:t})},a.change_timeSheet=function(e,t,n){var l=a.state.timeSheetEntry;l[e].hours[t]=n,a.setState({timeSheetEntry:l})},a.handle_submtSheet=function(e){e.preventDefault();var t=a.state.timeSheetEntry;a.createTimesheet(t)},a.state={timeSheetEntry:[],userTasks:[],leaves:[],addedTask:[],is_login:!0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.loadTimesheet(),this.loadTasks(),this.loadLeaves()}},{key:"componentDidUpdate",value:function(e){this.props.currDate!==e.currDate&&this.loadTimesheet()}},{key:"fetchApi",value:function(e,t){var a=this;fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return 403==e.status&&a.setState({is_login:!1}),e.json()})).then((function(e){a.setState(Object(h.a)({},t,e))})).catch((function(e){console.log("error",e)}))}},{key:"loadTimesheet",value:function(){this.setState({addedTask:[]});var e=this.props.currDate,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate(),a=this.props.endPoint+t;this.fetchApi(a,"timeSheetEntry")}},{key:"loadTasks",value:function(e){var t="/api/project/tasks/";e&&(t+=e),this.fetchApi(t,"userTasks")}},{key:"loadLeaves",value:function(){this.fetchApi("/api/project/leaves/","leaves")}},{key:"createTimesheet",value:function(e){var t=this.props.currDate,a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate(),n=this.props.endPoint+a+"/create/",l=v.a.load("csrftoken"),r=this;if(void 0!==l){var s={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":l},body:JSON.stringify(e),credentials:"include"};fetch(n,s).then((function(e){return 403==e.status&&r.setState({is_login:!1}),e.json()})).then((function(e){alert(e.rc)})).catch((function(e){console.log("error",e),alert("An error "+e+" occured, please try again later.")}))}}},{key:"decrementDate",value:function(e,t){if(!e)return[0,0,0];if(e.getDay()<6)var a=e.getDate()-e.getDay()+t;else a=e.getDate()+1+t;var n=new Date(e.setDate(a)),l=n.toDateString().split(" "),r=l[0]+" "+l[2]+"-"+l[1],s=n,o=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate();return[r,n.toDateString(),o]}},{key:"render",value:function(){var e=this.state.timeSheetEntry,t=this.state.userTasks,a=this.state.leaves,n=this.props.currDate,r=this.state.addedTask;return 0==this.state.is_login?l.a.createElement(f.a,{to:"/login"}):l.a.createElement("div",null,l.a.createElement(T,{userTasks:t,addedTask:r,leaves:a,title:this.props.title,handle_selectTask:this.handle_selectTask}),l.a.createElement(b,{timeSheetEntry:e,currDate:n,add_task:this.add_task,change_timeSheet:this.change_timeSheet}),l.a.createElement("br",null),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement(N,{currDate:n,decrementDate:this.decrementDate,handle_changeDate:this.props.handle_changeDate,title:this.props.title})),l.a.createElement("div",{className:"col-xs-3 float-right"},l.a.createElement("button",{className:"btn btn-success btn-block submit-btn",type:"submit",onClick:this.handle_submtSheet},"Submit")))),l.a.createElement("hr",null))}}]),t}(n.Component);var F=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handle_changeDate=function(e){a.setState({currDate:e})},a.state={currDate:new Date,endPoint:"/api/timesheet/"},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(C,{title:"Time Sheet",currDate:this.state.currDate,handle_changeDate:this.handle_changeDate,endPoint:this.state.endPoint}))}}]),t}(n.Component),L=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handle_changeDate=function(e){a.setState({currDate:e})};var n=new Date,l=n.getDate()-7;new Date(n.setDate(l)).toDateString();return a.state={currDate:n},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=new Date,t=e.getDate()-7;new Date(e.setDate(t)).toDateString();this.setState({currDate:e,endPoint:"/api/priortime/"})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(C,{title:"Time Adjustment",currDate:this.state.currDate,handle_changeDate:this.handle_changeDate,endPoint:this.state.endPoint}))}}]),t}(n.Component),M=function(e){function t(e){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.date,t=e.toLocaleString("default",{month:"short"}),a=e.getFullYear(),n=this.props.change_month;return l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{class:"month"}),l.a.createElement("th",{class:"month change-date",onClick:function(){return n(-12)}},"<<"),l.a.createElement("th",{class:"month change-date",onClick:function(){return n(-1)}},"<"),l.a.createElement("th",{class:"month"},t," ",a),l.a.createElement("th",{class:"month change-date",onClick:function(){return n(1)}},">"),l.a.createElement("th",{class:"month change-date",onClick:function(){return n(12)}},">>"),l.a.createElement("th",{class:"month"})))}}]),t}(n.Component),P=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).calDay_Hover=function(e){a.setState({is_hover:!0})},a.calDay_Leave=function(e){a.setState({is_hover:!1})},a.state={is_hover:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.weekDay,t=this.props.leaves;return l.a.createElement("td",{className:""===e?"noday":!0===this.state.is_hover?"calday highlight-day":"calday",onMouseEnter:this.calDay_Hover,onMouseLeave:this.calDay_Leave,onClick:this.props.open_modal,value:e},l.a.createElement("div",{classname:"dayNumber"},e),l.a.createElement("div",null,t.map((function(t,a){return l.a.createElement("p",{className:"leaveevents"},e==t.day?t.user+"-"+t.leaveid:"")}))))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={week:[],leaves:[]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.populate_days()}},{key:"componentDidUpdate",value:function(e){this.props.date!=e.date&&this.populate_days()}},{key:"populate_days",value:function(){var e=this.props.date,t=new Date(e.getFullYear(),e.getMonth(),1),a=new Date(e.getFullYear(),e.getMonth()+1,0),n=[],l=[];if(t.getDay()>0)for(var r=0;r<t.getDay();r++)l.push("");for(var s=1;s<=a.getDate();s++)l.push(s),l.length>=7&&(n.push(l),l=[]);if(l.length>0){for(var o=l.length;o<7;o++)l.push("");n.push(l)}this.setState({week:n})}},{key:"add_days_td",value:function(e){for(var t=[],a=0;a<e.length;a++)t.push(l.a.createElement(P,{weekDay:e[a],leaves:this.props.leaves,open_modal:this.props.open_modal}));return t}},{key:"render",value:function(){var e=this,t=this.state.week;return l.a.createElement("tbody",null,t.map((function(t,a){return l.a.createElement("tr",null,e.add_days_td(t))})))}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).submitLeave=function(e){e.preventDefault(),console.log("submit button11"),console.log(a.props.clicked_date),console.log(a.props.clicked_date.getDate())},a.state={},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.leaves,t=this.props.clicked_date.getDate();return l.a.createElement(_.a,{isOpen:this.props.modal_open,toggle:this.props.toggle_modal},l.a.createElement(D.a,{toggle:this.props.toggle_modal},"Manage Leaves"),l.a.createElement(y.a,null,this.props.clicked_date.getDate()," -",l.a.createElement("table",{className:"table",id:"task-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"User"),l.a.createElement("th",null,"Leave Type"),l.a.createElement("th",null,"Comments"))),l.a.createElement("tbody",null,e.map((function(e,a){return l.a.createElement(l.a.Fragment,null,t==e.day?l.a.createElement("tr",null,l.a.createElement("td",null,e.user),l.a.createElement("td",null,e.leaveid),l.a.createElement("td",null,e.comment)):null)}))))),l.a.createElement(j.a,null,l.a.createElement("div",{className:"container-fluid"},l.a.createElement(S.a,{className:"float-right",color:"primary",onClick:this.submitLeave},"Upload"))))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggle_modal=function(e){a.setState({modal_open:!a.state.modal_open})},a.open_modal=function(e){var t=new Date(a.state.date.getFullYear(),a.state.date.getMonth(),e.currentTarget.getAttribute("value"));a.setState({clicked_date:t,modal_open:!0})},a.change_month=function(e){var t=a.state.date,n=new Date(t.getFullYear(),t.getMonth()+e,1),l=n.getMonth()+1;a.fetchApi("/api/leave/month/"+l+"/year/"+n.getFullYear()),a.setState({date:n})},a.state={is_login:!0,date:new Date,days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],week:[],modal_open:!1,clicked_date:new Date,leaves:[]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.date,t=e.getMonth()+1;this.fetchApi("/api/leave/month/"+t+"/year/"+e.getFullYear())}},{key:"fetchApi",value:function(e){var t=this;fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return 403==e.status&&t.setState({is_login:!1}),e.json()})).then((function(e){t.setState({leaves:e})})).catch((function(e){console.log("error",e)}))}},{key:"add_days_th",value:function(){for(var e=this.state.days,t=[],a=0;a<=6;a++)t.push(l.a.createElement("th",null,e[a]));return t}},{key:"render",value:function(){if(0==this.state.is_login)return l.a.createElement(f.a,{to:"/login"});this.state.week;var e=this.state.date;e.toLocaleString("default",{month:"short"}),e.getFullYear();return l.a.createElement("div",null,l.a.createElement("div",{className:"jumbotron"},l.a.createElement("div",{className:"container-fluid"},l.a.createElement("h2",null,"Leave Tracker"),l.a.createElement("hr",null))),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"table-responsive",id:"calendar"},l.a.createElement("table",{className:"table month",id:"task-table"},l.a.createElement(M,{date:this.state.date,change_month:this.change_month}),l.a.createElement("thead",null,l.a.createElement("tr",null,this.add_days_th())),l.a.createElement(I,{date:this.state.date,leaves:this.state.leaves,open_modal:this.open_modal}))))),l.a.createElement("br",null),l.a.createElement(x,{modal_open:this.state.modal_open,toggle_modal:this.toggle_modal,clicked_date:this.state.clicked_date,leaves:this.state.leaves}))}}]),t}(n.Component),R=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).change_pic=function(e){a.setState({modal_open:!0})},a.toggle_modal=function(e){a.setState({modal_open:!a.state.modal_open})},a.handleImageChange=function(e){e.preventDefault(),a.setState({image:e.target.files[0]})},a.uploadImage=function(e){e.preventDefault();var t=new FormData;t.append("profile_photo",a.state.image,a.state.image.name);var n=v.a.load("csrftoken"),l=Object(d.a)(a);void 0!==n&&fetch("/api/user/reports/userprofile/post/image/",{method:"PUT",headers:{Accept:"application/json","X-CSRFToken":n},body:t,credentials:"include"}).then((function(e){return 403==e.status&&l.setState({is_login:!1}),e.json()})).then((function(e){var t=l.state.user;t.profile_photo=e.profile_photo,l.setState({user:t}),console.log(e.profile_photo)})).catch((function(e){console.log("error",e),alert("An error "+e+" occured, please try again later.")}))},a.state={is_login:!0,user:null,modal_open:!1,image:null},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getUserInfo()}},{key:"getUserInfo",value:function(){this.fetchApi("/api/user/reports/userprofile/")}},{key:"fetchApi",value:function(e){var t=this;fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return 403==e.status&&t.setState({is_login:!1}),e.json()})).then((function(e){t.setState({user:e[0]})})).catch((function(e){console.log("error",e)}))}},{key:"render",value:function(){var e=this.state.user;return 0==this.state.is_login?l.a.createElement(f.a,{to:"/login"}):l.a.createElement("div",null,l.a.createElement("div",{className:"jumbotron",id:"leave-jumbotron"},l.a.createElement("div",{className:"container"})),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-8"},l.a.createElement("div",{className:"userprofile container-fluid box-tag"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-7"},l.a.createElement("div",null,l.a.createElement("img",{src:null===e?"":e.profile_photo,height:"80%",width:"80%",className:"profile-pic"}),l.a.createElement("span",{className:"glyph-custom-nav-p profile-pic-glyph",onClick:this.change_pic},l.a.createElement(E.a,{icon:k.f}))),l.a.createElement("div",{className:"user-name userprofile-large"},null===e?"":e.user_id.first_name+" "+e.user_id.last_name),l.a.createElement("div",{className:"user-role"},null===e?"":e.user_role+" "+e.user_skill)),l.a.createElement("div",{className:"col-md-5"},l.a.createElement("h4",null,"Contact Info:"),l.a.createElement("div",{className:"user-email"},null===e?"":e.user_id.email),l.a.createElement("div",{className:"user-mobile"},null===e?"":e.user_mobile),l.a.createElement("div",{className:"user-location"},null===e?"":e.user_location),l.a.createElement("hr",null),l.a.createElement("h4",null,"Project Info:"),l.a.createElement("div",{className:"user-project"},"Project Name:  ",null===e?"":e.project),l.a.createElement("div",{className:"user-manager"},"Manager:  ",null===e?"":e.manager_id),l.a.createElement("div",{className:"user-joinedon"},"Joined On:  ",null===e?"":e.date_joined))))),l.a.createElement("div",{className:"col-md-4"},l.a.createElement("div",{className:"userprofile container-fluid"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-12"},l.a.createElement("h4",null,"Leave Balance"),l.a.createElement("table",{className:"table table-striped",id:"leave-profile"},l.a.createElement("tbody",{id:"leave-table"},l.a.createElement("tr",null,l.a.createElement("th",null,"CL (in hrs)"),l.a.createElement("th",null,"EL (in hrs)")),l.a.createElement("tr",null,l.a.createElement("td",{className:"balance-casual"}," ",null===e?"":e.casual_leave," "),l.a.createElement("td",{className:"balance-earned"}," ",null===e?"":e.earned_leave," ")))))))))),l.a.createElement("div",null,l.a.createElement(_.a,{isOpen:this.state.modal_open,toggle:this.toggle_modal},l.a.createElement(D.a,{toggle:this.toggle_modal},"Update Profile Picture"),l.a.createElement(y.a,null,l.a.createElement("img",{src:null===e?"":e.profile_photo,className:"change-profile-img"})),l.a.createElement(j.a,null,l.a.createElement("div",{className:"container-fluid"},l.a.createElement("form",{onSubmit:this.uploadImage},l.a.createElement("input",{type:"file",id:"image",accept:"image/png, image/jpeg",onChange:this.handleImageChange,required:!0}),l.a.createElement(S.a,{className:"float-right",color:"primary"},"Upload")))))))}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onClick_li=function(e){e.preventDefault(),a.setState({clicked:!a.state.clicked})},a.state={clicked:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.value,t=this.props.icon,a=this.props.linkname;return l.a.createElement("li",{className:"nav-item",onClick:this.props.inactiveProfile},l.a.createElement(g.c,{maintainScrollPosition:!1,to:{pathname:a,state:{fromDashboard:!1}},activeClassName:"active",exact:!0},l.a.createElement("p",{className:"glyph-custom-nav-p"},l.a.createElement(E.a,{icon:t})),l.a.createElement("div",null,e)))}}]),t}(n.Component),U=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleClick=function(e){a.node.contains(e.target)||a.state.showDropDown&&a.setState({showDropDown:!a.state.showDropDown})},a.inactiveProfile=function(e){a.node.classList.contains("active")&&a.node.classList.remove("active")},a.activeProfile=function(e){console.log(a.node.classList),a.node.className+=" active"},a.toggle_dropDown=function(e){e.preventDefault(),a.setState({showDropDown:!a.state.showDropDown})},a.logout=function(e){e.preventDefault();var t=Object(d.a)(a);fetch("/api/auth/logout/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return 200==e.status&&t.setState({is_login:!1}),e.json()})).then((function(e){console.log(e)})).catch((function(e){console.log("error",e)}))},a.state={showDropDown:!1,nav_li_value:["Timesheet","Prior Time","Leave Tracker"],nav_li_link:["/react/timesheet/","/react/timesheet/prior","/react/leave"],nav_li_icon:[k.e,k.a,k.b],user:null,email:null,profile_photo:null,is_login:!0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getUserInfo(),document.addEventListener("click",this.handleClick,!1)}},{key:"getUserInfo",value:function(){this.fetchApi("/api/user/reports/userprofile/")}},{key:"fetchApi",value:function(e){var t=this;fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return 403==e.status&&t.setState({is_login:!1}),e.json()})).then((function(e){t.setState({user:e[0].user_id.username,email:e[0].user_id.email,profile_photo:e[0].profile_photo})})).catch((function(e){console.log("error",e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.nav_li_value,n=t.nav_li_icon,r=t.nav_li_link,s=t.user,o=t.email,c=t.profile_photo;return 0==this.state.is_login?l.a.createElement(f.a,{to:"/login"}):l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark"},l.a.createElement("a",{className:"navbar-brand",href:"/timesheet"},l.a.createElement("span",null,l.a.createElement("img",{className:"img-responsive",src:"/static/our_static/img/logo.gif",height:"30",width:"30"})),l.a.createElement("span",null,"OTes")),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},l.a.createElement("ul",{className:"navbar-nav ml-auto"},a.map((function(t,a){return l.a.createElement(B,{value:t,icon:n[a],linkname:r[a],inactiveProfile:e.inactiveProfile})})),l.a.createElement("li",{className:"nav-item dropdown",onClick:this.toggle_dropDown,ref:function(t){return e.node=t}},l.a.createElement("a",null,l.a.createElement("span",null,l.a.createElement("img",{src:c,height:"38",width:"38",className:"profile-pic rounded-circle"})),l.a.createElement("span",{className:"glyph-custom-nav-p"},this.state.showDropDown?l.a.createElement(E.a,{icon:k.d}):l.a.createElement(E.a,{icon:k.c}))),l.a.createElement("ul",{className:this.state.showDropDown?"dropdown-menu show-dropdown-menu":"dropdown-menu"},l.a.createElement("li",{className:"profile-dropdown"},l.a.createElement("a",{className:"avatar-a"},l.a.createElement("span",null,l.a.createElement("img",{src:c,height:"48",width:"48",className:"profile-pic rounded-circle avatar float-left"})),l.a.createElement("span",null,l.a.createElement("p",{class:"avatar-name"},s),l.a.createElement("p",{class:"avatar-name"},o)))),l.a.createElement("li",{class:"profile-dropdown card-footer"},l.a.createElement("div",{onClick:this.activeProfile},l.a.createElement(g.b,{maintainScrollPosition:!1,to:{pathname:"/react/profile/",state:{fromDashboard:!1}}},"My Profile"),l.a.createElement("a",{href:"",class:"float-right",role:"button",onClick:this.logout},"Logout"))))))))}}]),t}(n.Component),Y=function(e){function t(e){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(g.a,null,l.a.createElement(U,null),l.a.createElement(f.d,null,l.a.createElement(f.b,{exact:!0,path:"/react/timesheet",component:F}),l.a.createElement(f.b,{exact:!0,path:"/react/timesheet/prior",component:L}),l.a.createElement(f.b,{exact:!0,path:"/react/leave",component:A}),l.a.createElement(f.b,{exact:!0,path:"/react/profile",component:R}),l.a.createElement(f.b,{exact:!0,path:"/login",render:function(){return window.location="/login"}}))))}}]),t}(n.Component),W=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(Y,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.b2747493.chunk.js.map