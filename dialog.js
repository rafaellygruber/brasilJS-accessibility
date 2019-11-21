export class Dialog {
  dialogElement;
  overlayElement;
  focusedElementBeforeOpen;
  focusableElements;
  firstFocusableElement;
  lastFocusableElement;

  constructor(dialogElement, overlayElement) {
    this.dialogElement = dialogElement;
    this.overlayElement = overlayElement;

    var focusableElements = this.dialogElement.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    this.focusableElements = Array.prototype.slice.call(focusableElements);

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    this.close(); // Reset
  }

  open() {
    this.dialogElement.removeAttribute('aria-hidden');
    this.overlayElement.removeAttribute('aria-hidden');

    this.focusedElementBeforeOpen = document.activeElement;

    this.dialogElement.addEventListener('keydown', (e) => {
      this._handleKeyDown(e);
    });

    this.overlayElement.addEventListener('click', () => {
      this.close();
    });

    this.firstFocusableElement.focus();
  }

  close() {
    this.dialogElement.setAttribute('aria-hidden', true);
    this.overlayElement.setAttribute('aria-hidden', true);

    if (this.focusedElementBeforeOpen) {
      this.focusedElementBeforeOpen.focus();
    }
  }

  _handleKeyDown(event) {
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    switch (event.keyCode) {
      case KEY_TAB:

        if (this.focusableElements.length === 1) {
          event.preventDefault();
          break;
        }

        if (event.shiftKey) {
          this._handleBackwardTab(event);
        } else {
          this._handleForwardTab(event);
        }

        break;

      case KEY_ESC:
        this.close();
        break;
      default:
        break;
    }

  }

  _handleBackwardTab(event) {
    if (document.activeElement === this.firstFocusableElement) {
      event.preventDefault();
      this.lastFocusableElement.focus();
    }
  }

  _handleForwardTab(event) {
    if (document.activeElement === this.lastFocusableElement) {
      event.preventDefault();
      this.firstFocusableElement.focus();
    }
  }


  addEventListeners(openDialogSelector, closeDialogSelector) {
    const openDialogElements = document.querySelectorAll(openDialogSelector);

    for (var i = 0; i < openDialogElements.length; i++) {
      openDialogElements[i].addEventListener('click', () => {
        this.open();
      });
    }

    const closeDialogElements = document.querySelectorAll(closeDialogSelector);
  
    for (var i = 0; i < closeDialogElements.length; i++) {
      closeDialogElements[i].addEventListener('click', () => {
        this.close();
      });
    }

  }

}