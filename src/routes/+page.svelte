<script lang="ts">
	
	import { browser } from '$app/environment';
	import CurrencyFormatInput from '$lib/CurrencyFormatInput.svelte';

	let output: string;
	const handleSubmitJSON = (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		output = JSON.stringify(Object.fromEntries(data.entries()), null, 4);
	};

	let unchangedValue = 999;
</script>

<form class="demo" on:submit={handleSubmitJSON}>
	<nav class="demo__nav">
		<div class="demo__nav-heading">
			<h1 class="demo__h1">svelte-currency-format-input</h1>
			<h6 style="text-align: center; font-size: 12px; color: #666; font-weight: 400; margin-top: 15px; margin-bottom: 10px;">
				An interactive form input that instantly transforms numerical entries into localized currency formats while you type.
			</h6>
		</div>
		<div class="demo__nav-item">
			<a class="demo__a" href="https://github.com/Adityarizqi7/svelte-currency-format-input" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 128 128"><g fill="#181616"><path fill-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" clip-rule="evenodd"/><path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0"/></g></svg>
			</a>
			<a
				class="demo__a"
				href="https://www.npmjs.com/package/@adityarizqi/svelte-currency-format-input"
				target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="#C12127" d="M0 256V0h256v256z"/><path fill="#FFF" d="M48 48h160v160h-32V80h-48v128H48z"/></svg>
			</a>
			<a
				class="demo__a"
				href="https://github.com/Adityarizqi7/svelte-currency-format-input/issues"
				target="_blank">Known Issues</a
			>
			<a
				class="demo__a"
				href="https://github.com/Adityarizqi7/svelte-currency-format-input#contributing"
				target="_blank">Contribute</a
			>
		</div>
	</nav>

	<div class="demo__container">
		<div class="demo__wrapper-item">
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">DEFAULT</label>
				<div class="demo__wrapper-item__input-currency default-input">
					<CurrencyFormatInput name="default" value={666.69} isNegativeInput={false} />
				</div>
			</div>
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">Custom VALUE, LOCALE and CURRENCY</label>
				<div class="demo__wrapper-item__input-currency custom-input">
					<CurrencyFormatInput id='currency-input' name="default" locale='id-ID' currency='IDR' value={120000} />
					<CurrencyFormatInput name="colon" locale="es-CR" currency="CRC" value={750000} />
				</div>
			</div>
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">Custom LOCALE and CURRENCY</label>
				<div class="demo__wrapper-item__input-currency custom-input">
					<CurrencyFormatInput id='currency-input' name="bitcoin" locale='th-TH' currency='THB' value={2382.22} />
					<CurrencyFormatInput name="yen" locale="en-JP" currency="JPY" />
				</div>
			</div>
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">Custom NEGATIVE INPUT and PLACEHOLDER</label>
				<div class="demo__wrapper-item__input-currency custom-input">
					<CurrencyFormatInput
						name="pound"
						locale="en-GB"
						currency="GBP"
						isNegativeInput
						id='currency-input'
						placeholder='Are you happy now?'
					/>
					<CurrencyFormatInput
						locale="en-GB"
						currency="GBP"
						name="pound-currency"
						isNegativeInput={false}
						placeholder='Are you proud?'
					/>
				</div>
			</div>
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">Custom FRACTION DIGITS and DISABLED Format</label>
				<div class="demo__wrapper-item__input-currency custom-input">
					<CurrencyFormatInput id='currency-input' name="rupees" value={7782} locale="hi-IN" currency="INR" fractionDigits={0} />
					<CurrencyFormatInput name="shekel" value={97532.95} disabled={true} locale="il-IL" currency="ILS" />
				</div>
			</div>
			<div class="demo__wrapper-item__group-input">
				<label for="currency-input">Custom ONCHANGE and ZERO NULL Format</label>
				<div class="demo__wrapper-item__input-currency custom-input">
					<CurrencyFormatInput
						name="pesos"
						locale="es-AR"
						currency="ARS"
						autocomplete="off"
						placeholder={null}
						id='currency-input'
						value={unchangedValue}
						isNegativeInput={false}
						onValueChange={(value) => {
							// Prevent alerting on initial load
							if (unchangedValue !== value) {
								unchangedValue = value; // Update the unchanged value
								if (browser) window.alert(`Hello there, The value for ARS has changed to: ${value}`); // Alert the user
							}
						}}
					/>
					<CurrencyFormatInput name="soles" value={0} isZeroNullish={true} placeholder={null} locale="es-PE" currency="PEN" />
				</div>
			</div>
		</div>
	</div>

	<nav class="demo__output">
		<button type="submit" class="demo__submit">Send</button>

		<pre class="demo__pre {!output && 'demo__pre--placeholder'}">{output
				? `This is the result of the entered values in currency format above: \n\n ${output}`
				: 'Submit the form to view a JSON output of the values.'}</pre>
	</nav>
</form>

<style>
	/* Overriding the styles of the <CurrencyFormatInput /> component */
	form.demo :global(input.currencyInput__formatted) {
		width: 100%;
		color: black;
		font-size: 13px;
		font-family: Helvetica, sans-serif;
	}
	.custom-formatted-class {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		color: red !important;
	}

	/* Styles for demo presentation (you can ignore these) */
	:global(body) {
		--gap: 100px;

		margin: 0;
		display: flex;
		align-items: center;
		place-items: center;
		padding: var(--gap);
		box-sizing: border-box;
		justify-content: center;
		background-color: #fafafa;
		font-family: Helvetica, sans-serif;

		@media (max-width: 768px) {
			--gap: 48px;
		}

		@media (max-width: 512px) {
			--gap: 32px;
		}

		@media (max-width: 411px) {
			min-height: auto;
		}
	}

	.demo__nav {
		gap: 20px;
		display: flex;
		margin-bottom: 40px;
		flex-direction: column;
		justify-content: center;
	}
	.demo__nav-item {
		gap: 12px;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	h1.demo__h1 {
		color: #333;
		font-size: 30px;
		line-height: 1em;
		text-align: center;
		margin-block: unset;
		letter-spacing: -0.025em;
	}

	a.demo__a {
		color: #333;
		text-decoration: none;
	}

	a.demo__a:visited {
		color: #666;
	}
	
	div.demo__wrapper-item {
		gap: 30px;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	div.demo__wrapper-item label {
		color: #000;
		font-weight: 600;
		margin-bottom: 12px;
		display: inline-block;
	}
	div.demo__wrapper-item__input-currency {
		gap: 12px;
		display: flex;
		flex-direction: column;
	}
	button.demo__submit {
		width: 100%;
		color: #fff;
		border: none;
		padding: 10px;
		font-size: 13px;
		cursor: pointer;
		height: max-content;
		background-color: #1e40af;
	}
	nav.demo__output {
		margin-top: 2rem;
	}

	pre.demo__pre {
		color: #666;
		padding: 10px;
		max-width: 100%;
		overflow-y: auto;
		margin-top: 1rem;
		border-radius: 10px;
		box-sizing: border-box;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px;
	}

	pre.demo__pre--placeholder {
		font-size: 13px;
		font-family: Helvetica, sans-serif;
	}
</style>
