var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB ||window.webkitIndexedDB;

var open=idb.open("StoreData",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event)
{
 request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}

open.onerror=function(error){
  console.log("Object store is not created",+error);
}
open.onsuccess=function(event)
{
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
    education(data.target.result);
    skills(data.target.result);
  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
var img=document.createElement("img");
img.src="images/add.svg";
left.append(img);

var name=document.createElement("h3");
name.textContent=data.name;
left.append(name);

var role=document.createElement("h3");
role.textContent=data.role;
left.append(role);

var email=document.createElement("h3");
email.textContent=data.email;
left.append(email);

var mobile=document.createElement("h3");
mobile.textContent=data.mobile;
left.append(mobile);
}

function education(ed){

var career=document.createElement("h2")
career.textContent="Career Objectives";
right.append(career)

var pc=document.createElement("p");
pc.textContent=ed.career;
right.append(pc);

var h1=document.createElement("h1");
h1.textContent="Educational Details";
right.append(h1);

var hr=document.createElement("hr");
right.append(hr)

var table=document.createElement('table');
table.border="1";
let row='';

row+="<tr>"+
"<td>"+"Institute"+"</td>"+
"<td>"+"Degree"+"</td>"+
"<td>"+"Branch"+"</td>"+
"<td>"+"Per"+"</td>"+
"</tr>";

for(i in ed.education){

row +="<tr>"+"<td>"+ed.education[i].college+"</td>"+
"<td>"+ed.education[i].degree+"</td>"+
"<td>"+ed.education[i].branch+"</td>"+
"<td>"+ed.education[i].marks+"</td>"+
"</tr>";


table.innerHTML=row;
right.appendChild(table);
}
}
function skills(sk){
  var skills=document.createElement('h2');
  skills.textContent="Technical Skills";
  right.appendChild(skills);

  var l3=document.createElement('hr');
  right.appendChild(l3);

var skills1=document.createElement("h3");
skills1.textContent=sk.skills;
right.appendChild(skills1);


  }
