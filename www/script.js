/*
 * --------------ITW-----------------
 *
 * Project:   Javascript pro zobrazovani aktualit v html kodu v index.html
 * File:        script.js
 * Author:   Jaroslav Sendler, xsendl00, xsendl00 AT stud.fit.vutr.cz
 *
 * Created on May 3, 2010
 *
 * Encoding: ISO-8859-2
 *
 * Description:
 */

window.onload = start;                                                           /* oznaceni prvku povinnych poli na zacatku */
var EventUtil = new Object();

      /* pouzivat jen pro znaky, ne por jine klavesy jako je f5 atd*/
function checkIt(evt, form) {
   evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.charCode;/*evt.keyCode;*/
   var target = evt.target || evt.srcElement;
   var charDel = (evt.which) ? evt.which : evt.keyCode;
   var correct = true;
   if((charCode != 'undefined' && charCode != null && typeof(charCode) != "undefined" && charCode != 13 && charCode != 9) || (charDel == 46)) {   /* reaguji pouze na tisknutelne znaky, ne entre ne tab*/ 
      if( !/TEXTAREA|SELECT|BUTTON/.test(target.nodeName) && /TEXT|text/.test(target.type)) { /*TODO:musi byt??? ma to byt je pro typ TeXT*/
         for(var i = 0; i < form.elements.length; i++) {                         /* prohledavam vsechny prvy daneho formulare */
            if(target == form[i]) {                                             /* nasel jsem pole do ktere se pise*/
               var act = form[i].value;
               if(charCode == 8)
                  act = form[i].value.substring(0, form[i].value.length-1);
               else if(charDel == 46)
                  act = form[i].value.substring(0, form[i].value.length-1);
               else
                  act = act + String.fromCharCode(charCode);
               if((act.length == 0) && (charCode == 8 || charDel == 46)) {/* pokud mam v poli jeden prvek a chci ho smazt, nastiv na puvodni hodnotu */
                  if(form[i].getAttribute("required"))                         /* povinne pole */
                     form[i].style.backgroundColor = "red";
                  else
                     form[i].style.backgroundColor = "white";
               }
               else {
                  if(form[i].getAttribute("required") || act.length != 0) { /* povinne pole nebo neprazden pole*/
                     if(form[i].getAttribute("minlength")) {
                        if(act.length < (form[i].getAttribute("minlength"))) {
                           form[i].style.backgroundColor = "blue";
                           correct = false;
                        }
                        else
                           form[i].style.backgroundColor = "green";
                     }
                     if(form[i].getAttribute("maxlengt") ) {
                        if(act.length > (form[i].getAttribute("maxlengt"))) {
                           form[i].style.backgroundColor = "blue";
                           if(charCode != 8 || charCode != 46)
                              return false;
                           else
                              form[i].style.backgroundColor = "green";
                        }
                        else if(!correct)
                           form[i].style.backgroundColor = "blue";
                        else
                           form[i].style.backgroundColor = "green";
                     }
                     else if(!correct)
                        form[i].style.backgroundColor = "blue";
                     else
                        form[i].style.backgroundColor = "green";
                  }
                  else if(act.lenght)
                     form[i].style.backgroundColor = "white";
               }
               break;                                                            /* prvek formular jsem jiz nasel, dalsi hledani neni potreba */
            }
         }
      }
      if(charCode != charDel)
         charCode = charDel;
      isCorrect(form, act, target);
   }
   else {
      return true;
   }
   /*form[i].value = old;*/
   return true;
}

/**
 * Comment
 */
function isCorrect(form, last, target ) {
   var correct = true;
   var act;
   for(var i = 0; i < form.length; i++) {
      if(!/TEXTAREA|SELECT|BUTTON/.test(form[i].nodeName) && /TEXT|text/.test(form[i].type)){
         act = form[i].value;
         if(form[i] == target)
            act = last;
         if(form[i].getAttribute("required") || act.length != 0 ) {
            if(form[i].getAttribute("maxlengt")) {                                  /* kontrola maximalni delka */
               if(act.length > (form[i].getAttribute("maxlengt"))) {
                  correct = false;
                  break;
               }
               else
                  correct = true;
               
            }
            if(form[i].getAttribute("minlength")) {                                 /* minimalni delka */
               if((act.length ) < (form[i].getAttribute("minlength"))) {
                  correct = false;
                  break;
               }
               else
                  correct = true;
            }
            if(act == "") {
               correct = false;
               break;
            }
         }
      }
   }
   if(correct) {
      enableSend(form);
   }
   else {
      disableSend(form);      
   }
}

/**
 * Pocatecni nastaveni vsech poli na cervenou barvu, pokud jsou povinna.
 */
function start() {
   var form = document.getElementsByTagName("form");
   for(var i = 0; i < form.length; i++) {
      var myElem = form[i]
      for(var j = 0; j < myElem.length; j++) {
         if(myElem[j].getAttribute("required")) {
            myElem[j].style.backgroundColor = "red";
            disableSend(form[i]);
         }
      }
   }
}
      
function disableSend(form) {
   if (document.all || document.getElementById) {
      for (i = 0; i < form.length; i++) {
         var tempobj = form.elements[i];
         if (tempobj.type.toLowerCase() == "submit") {
            tempobj.disabled = true;
         }
      }
   }
}

function enableSend(form) {
   if (document.all || document.getElementById) {
      for (i = 0; i < form.length; i++) {
         var tempobj = form.elements[i];
         if (tempobj.type.toLowerCase() == "submit") {
            tempobj.disabled = false;
         }
      }
   }
}