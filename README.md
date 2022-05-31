# 🎩 Magical Transition

Magical transition is a lightweight react transition library, I made it for my grandma and now she is too good at making transitions. Yaay! 🎉🍾

This component adds classnames to your component when it mounts/unmounts so that you can add css transitions to it. basically the same thing as CSSTransition from react-transition-group, except smaller and without dependencies.

This component does not include any transition effects; you need to add your own. See example css below.

Browser support:
Magical Transition needs requestAnimationFrame (compatibility table) and element.classList (compatibility table) in order to do its thing, so make sure to add polyfills if you need to support older browsers (like IE9 and below).

# Installation

```
npm install --save magical-transitions
```

Or

```
yarn add magical-transitions
```

## API Reference

| Parameter                 | Type             | Default  | Description                                                      |
| :------------------------ | :--------------- | :------- | :--------------------------------------------------------------- |
| `duration `               | `Number`         | 500      | **Required**. The duration of your css transition (milliseconds) |
| `disableInitialAnimation` | `Boolean`        | `false ` | Disable the animation when TinyTransition mounts                 |
| `delay `                  | `Number`         | `0 `     | Delay before adding classnames (milliseconds)                    |
| `children `               | ` React element` | ` `      | **Required** Single React element                                |
| `classNames `             | ` Object`        | ` `      | Classnames to use when mounting / unmounting                     |

# Basic example:

```
import MagicalTransitions from "magical-transitions";

...

<MagicalTransitions duration={500}>
  {isVisible &&
    <MyComponent />
  }
</MagicalTransitions>
```

# css

```
.before-enter {
  opacity: 0;
}

.entering {
  transition: opacity 0.5s;
  opacity: 1;
}

.before-leave {
  transition: opacity 0.5s;
}

.leaving {
  opacity: 0;
}
```
## Usage/Examples

```javascript
import Component from "my-project";

function App() {
  return <Component />;
}
```
## Authors

- [@Damilare](https://github.com/DAMILARE69)

## Documentation

[Documentation](https://linktodocumentation)

## FAQ

#### Question 1

Answer 1
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

#### Question 2

Answer 2

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)

## Used By

This project is used by the following companies:

- Company 1
- Company 2


