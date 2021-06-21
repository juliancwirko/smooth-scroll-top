import { SmoothScrollTopOptions } from './types.js';
import { buttonDefaultStyles } from './button-default-styles.js';

class SmoothScrollTop {
  private scrollButton: HTMLElement | undefined;
  private scrollTopEvtListener: EventListenerOrEventListenerObject | undefined;
  private windowEvtListener: EventListenerOrEventListenerObject | undefined;
  private ticking: boolean | undefined;
  private options: SmoothScrollTopOptions | undefined;

  constructor(options: SmoothScrollTopOptions) {
    this.options = {
      bgColor: '#000',
      color: '#fff',
      style: undefined,
      visibilityOffset: 300,
      icon: '&#9650;',
      width: '50px',
      height: '40px',
      position: 'right',
      ...options,
    };
  }

  init(): null {
    if (document && window) {
      // Create wrapper element
      this.scrollButton = document.createElement('div');

      // Add proper attributes
      this.scrollButton.setAttribute('data-js-scroll-top', '');
      this.scrollButton.classList.add('scroll-top-element');

      // Add styling
      this.scrollButton.style.cssText =
        (this.options && this.options.style) ||
        buttonDefaultStyles(this.options) ||
        '';

      // Create the arrow icon
      const arrowIcon = document.createElement('div');
      if (this.options && typeof this.options.icon === 'string') {
        arrowIcon.innerHTML = this.options.icon;
      } else if (this.options && this.options.icon instanceof HTMLElement) {
        arrowIcon.appendChild(this.options.icon);
      }

      // Append the arrow icon
      this.scrollButton.appendChild(arrowIcon);

      // Append the scrollButton to the body
      document.body.appendChild(this.scrollButton);

      // Add event listener for document scroll
      this.windowEvtListener = () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            if (
              this.scrollButton &&
              this.options &&
              this.options.visibilityOffset &&
              window.scrollY > this.options.visibilityOffset
            ) {
              this.scrollButton.style.transform = 'translateY(0)';
            } else if (this.scrollButton) {
              this.scrollButton.style.transform = 'translateY(105%)';
            }
            this.ticking = false;
          });
          this.ticking = true;
        }
      };
      document.addEventListener('scroll', this.windowEvtListener);

      // Add event listener for scrollButton click
      this.scrollTopEvtListener = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      };
      this.scrollButton.addEventListener('click', this.scrollTopEvtListener);
    }

    return null;
  }

  destroy(): null {
    // Cleanup
    if (this.scrollButton && document) {
      document.removeEventListener(
        'scroll',
        this.windowEvtListener as EventListenerOrEventListenerObject
      );
      this.scrollButton.removeEventListener(
        'click',
        this.scrollTopEvtListener as EventListenerOrEventListenerObject
      );
      document.body.removeChild(this.scrollButton);
      this.scrollButton = undefined;
      this.windowEvtListener = undefined;
      this.scrollTopEvtListener = undefined;
      this.ticking = undefined;
      this.options = undefined;
    }
    return null;
  }
}

export default SmoothScrollTop;
