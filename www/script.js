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
      
function checkIt(evt, form) {
   evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   
   var target = evt.target || evt.srcElement;
   
   var correct = true;
   if ( !/TEXTAREA|SELECT|BUTTON/.test(target.nodeName) && /TEXT|text/.test(target.type)) { /*TODO:musi byt??? ma to byt je pro typ TeXT*/
      for(var i = 0; i < form.elements.length; i++) {
         if(target == form[i]) {
            /*alert(charCode);*/
            if(!form[i].getAttribute("required") && form[i].value.lenght == 1 && (charCode == 8 || charCode == 46)) {
               form[i].style.backgroundColor = "white";
            }
            else {
               if(form[i].getAttribute("required") || form[i].value.lenght != 1) {
                  if(form[i].getAttribute("minlength") ) {
                     if(form[i].value.length < (form[i].getAttribute("minlength"))) {
                        alert(form[i].value.lenght );
                        form[i].style.backgroundColor = "blue";
                        correct = false;
                     }
                     else {
                        form[i].style.backgroundColor = "green";
                        correct = true;
                     }
                  }
                  if(form[i].getAttribute("maxlength") ) {
                     if(form[i].value.length >= (form[i].getAttribute("maxlength"))) {
                        form[i].style.backgroundColor = "blue";
                        correct = false;
                     }
                     else if(correct == false) {

                     }
                     else {
                        form[i].style.backgroundColor = "green";
                     }
                  }
                  else {
                     form[i].style.backgroundColor = "green";
                  }
               }
               else if(form[i].value.lenght){
                  form[i].style.backgroundColor = "white";
               }
            }
         }
      }
   }
}

/*EventUtil.addHandler(textbox, "focus", function(event)
{
   event = EventUtil.getEvent(event);
   var target = EventUtil.getTarget(event);
   target.select();
}
);
*/
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
              }
           }
        }
		}

