# svelte-currency-input

An interactive form input that instantly transforms numerical entries into localized currency formats while you type

---

## Features

- Formats **positive** and **negative** values
- Leverages [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) for **localizing** currency denominations and masking the input
- Simple [PROPS](#props)
- Minimal default styling, easy to [customize](#styling)

## Usage

```bash
npm install @adityarizqi/svelte-currency-format-input --save
```

```html
<script lang="ts">
  import CurrencyFormatInput from '@adityarizqi7/svelte-currency-format-input';
</script>

<CurrencyFormatInput name="total" placeholder='Your Placeholder' value={666} locale="id-ID" currency="IDR" />
```

## How it works

When the form is submitted you get _unformatted_ or _formatted_ values from two `<input />`'s.
This is more or less what `<CurrencyFormatInput />` looks like under the hood:

```html
<div class="currencyInput">
  <!-- Unformatted value -->
  <input
    class="currencyInput__unformatted"
    type="hidden"
    name="total"
    value="-322.76"
  />

  <!-- Formatted value -->
  <input
    class="currencyInput__formatted"
    type="text"
    name="formatted-total"
    value="€ -322,76"
  />
</div>
```

## PROPS

Option            | Type            | Default     | Description |
----------------- | --------------- | ----------- | ----------- |
value             | `number`        | `undefined` | Initial value. If left `undefined` a formatted value of `0` is visible as a placeholder |
locale            | `string`        | `en-US`     | Overrides default locale. [Examples](https://gist.github.com/ncreated/9934896) |
currency          | `string`        | `USD`       | Overrides default currency. [Examples](https://www.xe.com/symbols/) |
name              | `string`        | `total`     | Applies the name to the [input fields](#how-it-works) for _unformatted_ (e.g `[name=total]`) and _formatted_ (e.g. `[name=formatted-total]`) values |
required          | `boolean`       | `false`     | Marks the inputs as required |
disabled          | `boolean`       | `false`     | Marks the inputs as disabled |
placeholder       | `string` `number` `null` | `0`         | A `string` will override the default placeholder. A `number` will override  it by formatting it to the set currency. Setting it to `null` will not show a placeholder   |
isZeroNullish | `boolean`       | `false`      | If `true` and when the value is `0`, it will override the default placeholder and render the formatted value in the field like any other value.
autocomplete      | `string`        | `undefined` | Sets the autocomplete attribute. Accepts any valid HTML [autocomplete attribute values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values) |
isNegativeAllowed | `boolean`       | `true`      | If `false`, forces formatting only to positive values and ignores `--positive` and `--negative` styling modifiers                                   |
fractionDigits    | `number`        | `2`         | Sets `maximumFractionDigits` in [`Intl.NumberFormat()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits) used for formatting the currency. Supported digits: `0` to `20` |
inputClasses      | `object`        | [See below](#Styling)         | Selectively overrides any class names passed |
onValueChange     | `Callback`      | `undefined` | Runs a callback function after the value changes |

## Styling

There are two ways of customizing the styling of the input:
1. Passing it your own CSS classes
2. Overriding the styles using the existing class names

You can **override all of the class names** by passing an object to `inputClasses` that has **one or more** of these properties:

```typescript
interface InputClasses {
  wrapper?: string; // <div> that contains the two <input> elements
  unformatted?: string; // <input type="hidden"> that contains the unformatted value
  formatted?: string; // <input type="text"> that contains the formatted value
  formattedPositive?: string; // Class added when the formatted input is positive
  formattedNegative?: string; // Class added when the formatted input is negative
  formattedZero?: string; // Class added when the formatted input is zero
}
```

Usage (with [Tailwind CSS](https://tailwindcss.com/) as an example):

```html
<CurrencyFormatInput name="total" value="{322.76}" inputClasses={
  { 
    wrapper: "py-1 text-sm text-gray-800 border border-gray-300 rounded-md",
    formatted: 'text-gray-800 border-0 bg-white max-w-full',
    formattedPositive: 'text-green-700',
    formattedNegative: 'text-red-700'
  }
} />
```

Alternatively you can **write your own CSS** by overriding the [default styles](https://github.com/Adityarizqi7/svelte-currency-format-input/blob/main/src/lib/CurrencyFormatInput.svelte) which use [BEM naming conventions](https://getbem.com/naming/). To do so apply your styles as shown below:

```html
<div class="my-currency-input">
  <CurrencyFormatInput name="total" value="{420.69}" />
</div>

<style>
  /* Container */
  div.my-currency-input :global(div.currencyInput) { /* ... */ }

  /* Formatted input */
  div.my-currency-input :global(input.currencyInput__formatted) { /* ... */ }

  /* Formatted input when the it's disabled */
  div.my-currency-input :global(input.currencyInput__formatted:disabled) { /* ... */ }

  /* Formatted input when the value is zero */
  div.my-currency-input :global(input.currencyInput__formatted--zero) { /* ... */ }

  /* Formatted input when the value is positive */
  div.my-currency-input :global(input.currencyInput__formatted--positive) { /* ... */ }

  /* Formatted input when the value is negative */
  div.my-currency-input :global(input.currencyInput__formatted--negative) { /* ... */ }
</style>
```

## Contributing

Here's ways in which you can contribute:

- Found a bug? Open a [new issue](https://github.com/Adityarizqi7/svelte-currency-format-input/issues/new)
- Comment or upvote [existing issues](https://github.com/Adityarizqi7/svelte-currency-format-input/issues)
- Submit a [pull request](https://github.com/Adityarizqi7/svelte-currency-format-input/pulls)

## Developing

This package was generated with [SvelteKit](https://kit.svelte.dev/). Install dependencies with `npm install`, then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

#### Integration tests

The component is tested using [Playwright](https://playwright.dev/).
You can find the tests in [`tests/svelte-currency-input.test.ts`](https://github.com/Adityarizqi7/svelte-currency-format-input/blob/main/tests/svelte-currency-input.test.ts)

To run all tests on **Chromium**, **Firefox** and **Webkit**:
```bash
npm run test
```

To run all tests on a specific browser (e.g. **Webkit**):
```bash
npx playwright test --project=webkit
```

Additional debug commands can be found on [Playwright's documentation](https://playwright.dev/docs/test-cli).
