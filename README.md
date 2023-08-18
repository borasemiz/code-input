# Code Input

An unstyled and fully typed code input field with full accesibility support and simple API, for React projects. This component can be use to show input fields where you accept verificiation codes, OTPs (One Time Password) or PIN codes like the following image, or any other way that your imagination comes up with:

![](./doc/example.webp)

It provides no default styling out of the box, so that you are free to style in any way you want.

## Installation

```shell
$ npm install --save @borasemiz/code-input
```

## Usage

### Step 1: `CodeInputContainer` Component

You first bring in the `CodeInputContainer` element to the play. This component is responsible to provide wrapper around the individual character fields. When you want to change the size of this input field, you change the size of this component.

```tsx
import { CodeInputContainer } from '@borasemiz/code-input';
import styles from 'my-style-somehere.css'

function MyStyledCodeInput() {
  return (
    <CodeInputContainer className={styles['MyStyledCodeInputContainer']}>
      {/** We will put more content here... */}
    </CodeInputContainer>
  );
}
```

This component is nothing but a plain old `div` element under the hood. It has a default `position: relative` styling. Setting this CSS rule is required for the code input field to work properly. Because this is just a `div` element, this component accepts every attribute that a plain old `div` tag accepts. These attributes then transfered to the underlying `div` element that renders this component.

#### Using Another Element as Container

Because this component is a `div` under the hood, if you want to have use a different element, you need to use that element instead. If you are using a different element, make sure that element has `position: relative` in its styling. For example, the `fieldset` element as a container:

```tsx
import styles from 'my-style-somehere.css';

function MyStyledCodeInput() {
  return (
    <fieldset className={styles['MyStyledCodeInputContainer']}>
      {/** We will put more content here... */}
    </fieldset>
  );
}
```

```css
/** my-style-somewhere.css */
.MyStyledCodeInputContainer {
  position: relative;
}
```

### Step 2: `CodeInput` Component

Inside the container, place `CodeInput` component. This is the actual input component you will deal with. It accepts 3 props that are required:

- `length` **number**: The maximum number of characters to be entered.
- `Segment` **React.ComponentType&lt;SegmentProps&gt;**: A React render prop. This render prop is used to render the individual character box. The component that you give to this prop accepts 2 props:
  - `state` **string**: The state of the character box. It can be one of 3 string values:
    - `'default'`: The character box hasn't have any characters in it, and it doesn't have focus.
    - `'focused'`: The character box hasn't have any characters, but it has focus. Meaning that the cursor is on it.
    - `'filled'`: The character box has a character in it, but it hasn't focus.
  - `children` **React.ReactNode** _optional_: Each character the user entered will be provided in the `children` prop.
- `SegmentContainer` **React.ComponentType&lt;PropsWithChildren&gt;**: A React render prop. This renders the component which wraps the `Segment`s. It accepts only one optional prop: `children`, a **React.ReactNode**, which is the rendered `Segment`s.

```tsx
import {
  CodeInputContainer,
  CodeInput,
  type SegmentComponentType,
  type SegmentContainerComponentType,
} from '@borasemiz/code-input';
import styles from 'my-style-somehere.css'

const SegmentContainer: SegmentContainerComponentType = ({ children }) => {
  return (
    <div className={styles['CharacterBoxContainer']}>
      {children}
    </div>
  )
}

const Segment: SegmentComponentType = ({ state, children }) => {
  return (
    <div className={styles['CharacterBox']}>
      {children}
    </div>
  );
}

function MyStyledCodeInput() {
  return (
    <CodeInputContainer className={styles['MyStyledCodeInputContainer']}>
      <CodeInput
        length={4}
        Segment={Segment}
        SegmentContainer={SegmentContainer}
      />
    </CodeInputContainer>
  );
}
```

`CodeInput` component behaves like a plain old `input` element under the hood. It accepts all the props that `input` accepts, but there are few exceptions:

- `className`, `maxLength`, and `style` props are not allowed. The `length` prop is used to limit the number of characters the user can enter, therefore, `maxLength` shouldn't be used. `className` and `style` should not be used as they would interfere with the required styling of the component.
- If `value` prop is provided, it can only be a string.
- If `type` prop is provided, it can only be either `'text'` or `'password'`.

## Examples

If you want to get more ideas on how to use this component, checkout the examples below:

- [Basic Styling](./examples/basic/README.md)
