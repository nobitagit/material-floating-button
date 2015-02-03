(function () {

  "use strict";

  var toggleId = 'data-mfb-click',
      menuState = 'data-mfb-state',
      isOpen = 'open',
      isClosed = 'closed',
      mainButtonClass = 'mfb-component__button--main';

  var els = document.querySelectorAll('[' + toggleId + ']'),
      mainButton,
      target,
      toggleMenuState;

  for( var i = 0, len = els.length; i < len; i++ ){
    mainButton = els[i].querySelector('.' + mainButtonClass);
    mainButton.addEventListener('click', toggleButton, false);
    mainButton.addEventListener('touchstart', toggleButton, false); 
  }

  function toggleButton(e){
    target = e.target;
    while ( target && !target.hasAttribute(toggleId) ){
      target = target.parentNode;
      if(!target) { return; }
    }

    toggleMenuState = target.getAttribute(menuState) === isOpen ? isClosed : isOpen;

    target.setAttribute(menuState, toggleMenuState);
   
  }

})()