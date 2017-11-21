a=[[0,1,2,3,3],[4,4,4,2,4],[3,1,5,2,4],[5,5,3,2,1],[1,1,5,4,3],[6,6,6,6,6]];
a.toString = function (){
 var l = "";
 for(var j = 0; j < 6; j++){
  for(var i = 0; i < 5; i++){
   l += a[j][i];
  }
 }
 return l.valueOf();
}
var logi = {};
col = ["black", "white", "red", "green", "cyan", "orange", "yellow"];
id="f";
var pos = {"line":0, "ring":0};
function show(){
 var t = "<table>";
  t += "<tr>"
  for(var j = 0; j < 6; j++){
   t += "<td>"
   if(j == pos.line){
    t += "<div class=sq style=\"background-color: grey;\"";
    if(pos.ring >= 4) t += "></div>";
    else t += " onclick=\"up();\">Up</div>";
   }
   t += "</td>"
  } 
  t += "<td>"
  t += "</td>"
  t += "</tr>"


 for(var i = 0; i < 5; i++){
  t += "<tr>"
  for(var j = 0; j < 6; j++){
   t += "<td>"
   t += "<div class=sq style=\"background-color: " + col[a[j][i]]+ ";\"></div>"
   t += "</td>"
  } 
  t += "<td>";
  if(i != 0) t += "<div class=sq style=\"background-color: grey;\" onclick=\"rot('" + i + "')\">Rot " + i + "</div>";
  t += "</td>";
  t += "</tr>";
 }


  t += "<tr>"
  for(var j = 0; j < 6; j++){
   t += "<td>"
   if(j == pos.line){
    t += "<div class=sq style=\"background-color: grey;\"";
    if(pos.ring <= 0) t += "></div>";
    else t += " onclick=\"down();\">Down</div>";
   }
   t += "</td>"
  } 
  t += "<td>"
  t += "</td>"
  t += "</tr>"


 t += "</table>";
// t += "(" + pos.line + ";" + pos.ring + ")";
 $("#" + id).html(t);
}

function rot(p){
 var g = a.toString();
 if(p <= pos.ring){
  for(var j = 0; j < p; j++){
   var tmp = a[5][j];
   for(var i = 5; i > 0; i--){
    a[i][j] = a[i-1][j];
   }
   a[0][j] = tmp;
  }
 }else{
  for(var j = p; j < 5; j++){
   var tmp = a[0][j];
   for(var i = 0; i < 5; i++){
    a[i][j] = a[i+1][j];
   }
   a[5][j] = tmp;
  }
 }
 show();
 var h = a.toString();
// $("#log").prepend(g + " r" + p +" -&gt; " + h +"<br>");
 if(typeof(logi[g]) != "object") logi[g] = {};
 logi[g]["r" + p] = h;
 return a;
}

function find(a){
 for (var j = 0; j < 5; j++){
   if(a[0][j] == 0) break;
  }
 pos = j;
 return pos;
}

function up(){
 var g = a.toString();
 if(pos.ring < 4){
  a[pos.line][pos.ring] = a[pos.line][++pos.ring];
  a[pos.line][pos.ring] = 0;
 }
 show();
 var h = a.toString();
// $("#log").prepend(g + " up" +" -&gt; " + h +"<br>");
 if(typeof(logi[g]) != "object") logi[g] = {};
 logi[g]["up"] = h;
 return a;
}

function down(){
 var g = a.toString();
 if(pos.ring > 0){
  a[pos.line][pos.ring] = a[pos.line][--pos.ring];
  a[pos.line][pos.ring] = 0;
 }
 show();
 var h = a.toString();
// $("#log").prepend(g + " dn" +" -&gt; " + h +"<br>");
 if(typeof(logi[g]) != "object") logi[g] = {};
 logi[g]["dn"] = h;
 return a;
}

function meili(){
 
}


function rand(){
 var ops = [];
 var g = a.toString();
 if(typeof(logi[g]) != "object") logi[g] = {};
 if(pos.ring < 4){
  if(typeof(logi[g].up) == "undefined") ops.push("up");
 }
 if(pos.ring > 0){
  if(typeof(logi[g].dn) == "undefined") ops.push("dn");
 }
 for(var i = 1; i <= 4; i++){
  if(typeof(logi[g]["r" + i]) == "undefined") ops.push("r" + i);
 }
 if(ops.length == 0) show();
// $("#log").prepend(ops.toString() + "<br>");
 var op = Math.round(Math.random() * ops.length);
 switch (ops[op]){
  case "up": up(); break;
  case "r1": rot(1); break;
  case "r2": rot(2); break;
  case "r3": rot(3); break;
  case "r4": rot(4); break;
  case "dn": down(); break;
  default: break;
 }
}

function run(){
 rand();
 setTimeout("run()", 0);
}

 $(document).ready(function(){
  show();
//  run();
 });
