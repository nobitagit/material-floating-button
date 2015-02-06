
;(function ( window, document, undefined ) {

  'use strict';

  /**
   * Some defaults
   */
  var clickOpt = 'data-mfb-click',
      hoverOpt = 'data-mfb-hover',
      menuState = 'data-mfb-state',
      isOpen = 'open',
      isClosed = 'closed',
      mainButtonClass = 'mfb-component__button--main';

  /**
   * Internal references
   */
  var elsToClick,
      elsToHover,
      mainButton,
      target,
      toggleMenuState;

  /**
   * For every menu we need to get the main button and attach the appropriate evt.
   */
  function attachEvt( elems, evt ){
    for( var i = 0, len = elems.length; i < len; i++ ){
      mainButton = elems[i].querySelector('.' + mainButtonClass);
      mainButton.addEventListener( evt , toggleButton, false);
    }
  }

  /**
   * Remove the hover attribute and set a click attribute and a default,
   * initial state of 'closed' to menu that's been targeted.
   */
  function replaceAttrs( elems ){
    for( var i = 0, len = elems.length; i < len; i++ ){
      elems[i].removeAttribute( hoverOpt );
      elems[i].setAttribute( clickOpt, '' );
      elems[i].setAttribute( menuState, isClosed );
    }    
  }

  /**
   * The open/close action is performed by toggling an attribute
   * on the menu main element. 
   *
   * First, check if the target is the menu itself. If it's a child
   * keep walking up the tree until we found the main element
   * where we can toggle the state.
   */   
  function toggleButton( evt ){

    target = evt.target;
    while ( target && !target.hasAttribute(clickOpt) ){
      target = target.parentNode;
      if(!target) { return; }
    }

    toggleMenuState = target.getAttribute( menuState ) === isOpen ? isClosed : isOpen;

    target.setAttribute(menuState, toggleMenuState);
   
  }

  /**
   * On touch enabled devices we assume that no hover state is possible.
   * So, we get the menu with hover action configured and we set it up
   * in order to make it usable with tap/click.
   **/
  if ( window.Modernizr && Modernizr.touch ){
    elsToHover = document.querySelectorAll('[' + hoverOpt + ']');
    replaceAttrs( elsToHover );
  }

  elsToClick = document.querySelectorAll('[' + clickOpt + ']');

  attachEvt( elsToClick, 'click' );

})( window, document );