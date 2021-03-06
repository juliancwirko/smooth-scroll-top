### Smooth Window Scroll Top

This is a JavaScript browser component for scrolling the page to the top. The page will scroll when the user clicks the button attached to the bottom of the page.
Useful for blogs and content-based sites.
ES2020 modules.

### Demo

1. clone the repo
2. in the project run `npm install`
2. then run `npm run build && npm run dev:server` or `npm run dev:watch`
3. go to localhost:3000

Codepen: [codepen.io/juliancwirko/pen/qBrGOgw](https://codepen.io/juliancwirko/pen/qBrGOgw)

### Usage

#### Modern browsers:

```javascript
import ScrollTop from 'https://cdn.skypack.dev/smooth-scroll-top';
const scrollTop = new ScrollTop();
scrollTop.init();
```

Also, see the example in the `example` directory.

#### As npm package:

```
npm install smooth-scroll-top --save
```

```javascript
import SmoothScrollTop from 'smooth-scroll-top'; // es2020 module

(...)
const scrollTop = new SmoothScrollTop();
scrollTop.init();
(...)
scrollTop.destroy();
```

#### In React:

For Create React App works well with `Node: ^12.20.0 || ^14.13.1 || >=16.0.0`
Although there are compromises:

1. I had to leave `"browser": "./build/index.js",` in package.json because the `exports` is not supported yet. Hopefully soon.
2. I had to remove the optional chaining operator from the code because it was problematic in `Node: >=16.0.0`. (This or switching to `"target": "ES2019",` in tsconfig.json, but this was no go)

```javascript
import SmoothScrollTop from 'smooth-scroll-top';
(...)
useEffect(() => {
  const smoothScroll = new SmoothScrollTop();
  smoothScroll.init();
  return () => smoothScroll.destroy();
}, []);
(...)
```

### Possible initialization options

You can pass some options when initializing:

```
const scrollTop = new SmoothScrollTop(options);
```

Options interface:

```typescript
interface SmoothScrollTopOptions {
  bgColor?: string; // background of the scroll top button | default black
  color?: string; // color of the icon (if text-based) | default white
  style?: string; // overwrite all inline styles for the button | default undefined
  visibilityOffset?: number; // when to show the button durring scroll | default 200
  icon?: string | HTMLElement; // icon can be utf8 test or HTMLElement | default &#9650;
  width?: string; // width of the scroll button | default 50px
  height?: string; // height of the scroll button | default 40px
  position?: 'left' | 'right'; // postion of the scroll button | default right
}
```

Example: 

```javascript
const icon = document.createElement('div');
icon.style.cssText = `
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
`;
const smoothScroll = new SmoothScrollTop({ icon, position: 'left' });

```

### Possible methods

- `init` - initialize SmoothScrollTop on page
- `destroy` - destroy SmoothScrollTop instance and make clean up

### Possible npm scripts

- `build` - builds the package for publication
- `dev:lint` - code lint
- `dev:prettier` - code style
- `dev:server` - development server which serves example
- `dev:watch` - development server and build watch mode

### License

MIT
