<script lang="ts">
	import { onMount } from 'svelte';

	const DEFAULT_LOCALE = 'en-US';
	const DEFAULT_CURRENCY = 'USD';
	const DEFAULT_NAME = 'total';
	const DEFAULT_VALUE = 0;
	const DEFAULT_FRACTION_DIGITS = 2;

	const DEFAULT_CLASS_WRAPPER = 'currencyInput';
	const DEFAULT_CLASS_UNFORMATTED = 'currencyInput__unformatted';
	const DEFAULT_CLASS_FORMATTED = 'currencyInput__formatted';
	const DEFAULT_CLASS_FORMATTED_POSITIVE = 'currencyInput__formatted--positive';
	const DEFAULT_CLASS_FORMATTED_NEGATIVE = 'currencyInput__formatted--negative';
	const DEFAULT_CLASS_FORMATTED_ZERO = 'currencyInput__formatted--zero';

	interface InputClasses {
		wrapper?: string;
		unformatted?: string;
		formatted?: string;
		formattedPositive?: string;
		formattedNegative?: string;
		formattedZero?: string;
	}

	type Callback = (value: number) => any;

	export let required: boolean = false;
	export let disabled: boolean = false;
	export let name: string = DEFAULT_NAME;
	export let value: number = DEFAULT_VALUE;
	export let isZeroNullish: boolean = false;
	export let locale: string = DEFAULT_LOCALE;
	export let isNegativeInput: boolean = true;
	export let currency: string = DEFAULT_CURRENCY;
	export let id: string = 'currency-format-input'
	export let inputClasses: InputClasses | null = null;
	export let fractionDigits: number = DEFAULT_FRACTION_DIGITS;
	export let placeholder: string | number | null = DEFAULT_VALUE;
	export let autocomplete: string | null | undefined = undefined;

	export let onValueChange: Callback = () => {};

	// Formats value as: e.g. $2,345.00 | -$2,345.00 && $2,345 || -$2,345
	const formatCurrency = (
		value: number,
		maximumFractionDigits?: number,
		minimumFractionDigits?: number
	) => {
		return new Intl.NumberFormat(locale, {
			currency: currency,
			style: 'currency',
			maximumFractionDigits: maximumFractionDigits || 0,
			minimumFractionDigits: minimumFractionDigits || 0
		}).format(value);
	};

	// Verifies whether the pressed key is permissible.
	const handleKeyDown = (event: KeyboardEvent) => {
		const isDeletion = event.key === 'Backspace' || event.key === 'Delete';
		const isModifier = event.metaKey || event.altKey || event.ctrlKey;
		const isArrowKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
		const isTab = event.key === 'Tab';
		const isInvalidCharacter = !/^\d|,|\.|-$/g.test(event.key); // Keys other than digits, commas, periods, or minus signs.

		// If a decimal point is already present, restrict the input to not allow more than one.
		const isPunctuationDuplicated = () => {
			if (event.key !== ',' && event.key !== '.') return false; // It is false because it is not a key associated with punctuation.
			if (isDecimalComma) return formattedValue.split(',').length >= 2;
			if (!isDecimalComma) return formattedValue.split('.').length >= 2;
			return false;
		};

		if (
			isPunctuationDuplicated() ||
			(!isDeletion && !isModifier && !isArrowKey && isInvalidCharacter && !isTab)
		)
			event.preventDefault();
	};

	// Adjusts the formatting of the value when the input loses focus and ensures the appropriate number of 
	// decimal places when the value is zero.
	const handleOnBlur = () => setFormattedValue(true);

	// Additionally, establish the correct number of decimal places when the value is zero upon the initial load.
	onMount(() => setFormattedValue(true));

	let inputTarget: HTMLInputElement;
	const currencyDecimal = new Intl.NumberFormat(locale).format(1.1).charAt(1); // '.' or ','
	const isDecimalComma = currencyDecimal === ',';
	const currencySymbol = formatCurrency(0, 0)
		.replace('0', '') // e.g. '$0' > '$'
		.replace(/\u00A0/, ''); // e.g '0 €' > '€'

	// Updates the value by removing the currency formatting.
	const setUnformattedValue = (event?: KeyboardEvent) => {
		if (event) {
			// Don't format if the user is typing a `currencyDecimal` point
			if (event.key === currencyDecimal) return;

			// Pressing `.` when the decimal point is `,` gets replaced with `,`
			if (isDecimalComma && event.key === '.')
				formattedValue = formattedValue.replace(/\.([^.]*)$/, currencyDecimal + '$1'); // Only replace the last occurence

			// Pressing `,` when the decimal point is `.` gets replaced with `.`
			if (!isDecimalComma && event.key === ',')
				formattedValue = formattedValue.replace(/\,([^,]*)$/, currencyDecimal + '$1'); // Only replace the last occurence

			// Don't format if `formattedValue` is ['$', '-$', "-"]
			const ignoreSymbols = [currencySymbol, `-${currencySymbol}`, '-'];
			const strippedUnformattedValue = formattedValue.replace(' ', '');
			if (ignoreSymbols.includes(strippedUnformattedValue)) return;

			// Set the starting caret positions
			inputTarget = event.target as HTMLInputElement;

			// Reverse the value when minus is pressed
			if (isNegativeInput && event.key === '-') value = value * -1;
		}

		// Eliminate any characters that are not numbers, commas, periods, or minus signs (if isNegativeInput).
		let unformattedValue = isNegativeInput
			? formattedValue.replace(/[^0-9,.-]/g, '')
			: formattedValue.replace(/[^0-9,.]/g, '');

		// Finally set the value
		if (Number.isNaN(parseFloat(unformattedValue))) {
			value = 0;
		} else {
			// The order of the following operations is *critical*
			unformattedValue = unformattedValue.replace(isDecimalComma ? /\./g : /\,/g, ''); // Remove all group symbols
			if (isDecimalComma) unformattedValue = unformattedValue.replace(',', '.'); //If the decimal point is represented as a comma, substitute it with a period.

			// If the zero-key has been pressed
			// and if the current `value` is the same as the `value` before the key-press
			// formatting may need to be done
			const previousValue = value;
			value = parseFloat(unformattedValue);

			if (event && previousValue === value) {
				// Do the formatting if the number of digits after the decimal point exceeds `fractionDigits`
				if (
					unformattedValue.includes('.') &&
					unformattedValue.split('.')[1].length > fractionDigits
				) {
					setFormattedValue(false);
				}
			}
		}
	};

	const setFormattedValue = (hasMinFractionDigits?: boolean) => {
		// Previous caret position
		const startCaretPosition = inputTarget?.selectionStart || 0;
		const previousFormattedValueLength = formattedValue.length;

		// Apply formatting to input
		formattedValue = isZero && !isZeroNullish ? '' : formatCurrency(value, fractionDigits, hasMinFractionDigits ? fractionDigits : 0);

		// Update `value` after formatting
		setUnformattedValue();

		let retries = 0;
		while (previousFormattedValueLength === formattedValue.length && retries < 10) retries++;

		if (previousFormattedValueLength !== formattedValue.length) {
			const endCaretPosition =
				startCaretPosition + formattedValue.length - previousFormattedValueLength;
			inputTarget?.setSelectionRange(endCaretPosition, endCaretPosition);
		}

		// Run callback function when `value` changes
		onValueChange(value);
	};

	const handlePlaceholder = (placeholder: string | number | null) => {
		if (typeof placeholder === "number") return formatCurrency(placeholder, fractionDigits, fractionDigits);
		if (placeholder === null) return "";
		return placeholder;
	};

	let formattedValue = '';
	$: isNegative = value < 0;
	$: isPositive = value > 0;
	$: isZero = !isNegative && !isPositive;
	$: value, setFormattedValue(false);
</script>

<div class={inputClasses?.wrapper ?? DEFAULT_CLASS_WRAPPER}>
	<input
		class={inputClasses?.unformatted ?? DEFAULT_CLASS_UNFORMATTED}
		type="hidden"
		{name}
		{disabled}
		bind:value
	/>
	<input
		id={id}
		class="
			{inputClasses?.formatted ?? DEFAULT_CLASS_FORMATTED}
			{isNegativeInput && !isZero && !isNegative
			? inputClasses?.formattedPositive ?? DEFAULT_CLASS_FORMATTED_POSITIVE
			: ''}
			{isZero ? inputClasses?.formattedZero ?? DEFAULT_CLASS_FORMATTED_ZERO : ''}
			{isNegativeInput && isNegative
			? inputClasses?.formattedNegative ?? DEFAULT_CLASS_FORMATTED_NEGATIVE
			: ''}
		"
		type="text"
		inputmode={fractionDigits > 0 ? "decimal" : "numeric"}
		name={`formatted-${name}`}
		required={required && !isZero}
		placeholder={handlePlaceholder(placeholder)}
		{autocomplete}
		{disabled}
		bind:value={formattedValue}
		on:keydown={handleKeyDown}
		on:keyup={setUnformattedValue}
		on:blur={handleOnBlur}
	/>
</div>

<style>
	input.currencyInput__formatted {
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #e2e2e2;
	}

	input.currencyInput__formatted--zero {
		color: #333;
	}

	input.currencyInput__formatted--positive {
		color: #00a36f;
	}

	input.currencyInput__formatted--negative {
		color: #e75258;
	}

	input.currencyInput__formatted:disabled {
		color: #999;
		cursor: default;
		pointer-events: none;
		background-color: #e2e2e2;
	}
</style>