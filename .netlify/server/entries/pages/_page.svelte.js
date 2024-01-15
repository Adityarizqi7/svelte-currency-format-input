import { c as create_ssr_component, d as add_attribute, e as escape, f as null_to_empty, v as validate_component } from "../../chunks/ssr.js";
const CurrencyFormatInput_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "input.currencyFormatInput__formatted.svelte-azuej{padding:10px;box-sizing:border-box;border:1px solid #e2e2e2}input.currencyFormatInput__formatted--zero.svelte-azuej{color:#333}input.currencyFormatInput__formatted--positive.svelte-azuej{color:#00a36f}input.currencyFormatInput__formatted--negative.svelte-azuej{color:#e75258}input.currencyFormatInput__formatted.svelte-azuej:disabled{color:#999;cursor:default;pointer-events:none;background-color:#e2e2e2}",
  map: null
};
const DEFAULT_VALUE = 0;
const DEFAULT_NAME = "total";
const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";
const DEFAULT_FRACTION_DIGITS = 2;
const DEFAULT_CLASS_WRAPPER = "currencyFormatInput";
const DEFAULT_CLASS_UNFORMATTED = "currencyFormatInput__unformatted";
const DEFAULT_CLASS_FORMATTED = "currencyFormatInput__formatted";
const DEFAULT_CLASS_FORMATTED_POSITIVE = "currencyFormatInput__formatted--positive";
const DEFAULT_CLASS_FORMATTED_NEGATIVE = "currencyFormatInput__formatted--negative";
const DEFAULT_CLASS_FORMATTED_ZERO = "currencyFormatInput__formatted--zero";
const CurrencyFormatInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isNegative;
  let isPositive;
  let isZero;
  let { required = false } = $$props;
  let { disabled = false } = $$props;
  let { name = DEFAULT_NAME } = $$props;
  let { value = DEFAULT_VALUE } = $$props;
  let { isZeroNullish = false } = $$props;
  let { locale = DEFAULT_LOCALE } = $$props;
  let { isNegativeInput = true } = $$props;
  let { currency = DEFAULT_CURRENCY } = $$props;
  let { id = "currency-format-input" } = $$props;
  let { inputClasses = null } = $$props;
  let { fractionDigits = DEFAULT_FRACTION_DIGITS } = $$props;
  let { placeholder = DEFAULT_VALUE } = $$props;
  let { autocomplete = void 0 } = $$props;
  let { onValueChange = () => {
  } } = $$props;
  const formatCurrency = (value2, maximumFractionDigits, minimumFractionDigits) => {
    return new Intl.NumberFormat(
      locale,
      {
        currency,
        style: "currency",
        maximumFractionDigits: maximumFractionDigits || 0,
        minimumFractionDigits: minimumFractionDigits || 0
      }
    ).format(value2);
  };
  let inputTarget;
  const currencyDecimal = new Intl.NumberFormat(locale).format(1.1).charAt(1);
  const isDecimalComma = currencyDecimal === ",";
  const currencySymbol = formatCurrency(0, 0).replace("0", "").replace(/\u00A0/, "");
  const setUnformattedValueInput = (event) => {
    if (event) {
      if (event.key === currencyDecimal)
        return;
      if (isDecimalComma && event.key === ".")
        formattedValue = formattedValue.replace(/\.([^.]*)$/, currencyDecimal + "$1");
      if (!isDecimalComma && event.key === ",")
        formattedValue = formattedValue.replace(/\,([^,]*)$/, currencyDecimal + "$1");
      const ignoreSymbols = [currencySymbol, `-${currencySymbol}`, "-"];
      const strippedUnformattedValue = formattedValue.replace(" ", "");
      if (ignoreSymbols.includes(strippedUnformattedValue))
        return;
      inputTarget = event.target;
      if (isNegativeInput && event.key === "-")
        value = value * -1;
    }
    let unformattedValue = isNegativeInput ? formattedValue.replace(/[^0-9,.-]/g, "") : formattedValue.replace(/[^0-9,.]/g, "");
    if (Number.isNaN(parseFloat(unformattedValue))) {
      value = 0;
    } else {
      unformattedValue = unformattedValue.replace(isDecimalComma ? /\./g : /\,/g, "");
      if (isDecimalComma)
        unformattedValue = unformattedValue.replace(",", ".");
      const previousValue = value;
      value = parseFloat(unformattedValue);
      if (event && previousValue === value) {
        if (unformattedValue.includes(".") && unformattedValue.split(".")[1].length > fractionDigits) {
          setFormattedValueInput(false);
        }
      }
    }
  };
  const setFormattedValueInput = (hasMinFractionDigits) => {
    const startCaretPosition = inputTarget?.selectionStart || 0;
    const previousFormattedValueLength = formattedValue.length;
    formattedValue = isZero && !isZeroNullish ? "" : formatCurrency(value, fractionDigits, hasMinFractionDigits ? fractionDigits : 0);
    setUnformattedValueInput();
    let retries = 0;
    while (previousFormattedValueLength === formattedValue.length && retries < 10)
      retries++;
    if (previousFormattedValueLength !== formattedValue.length) {
      const endCaretPosition = startCaretPosition + formattedValue.length - previousFormattedValueLength;
      inputTarget?.setSelectionRange(endCaretPosition, endCaretPosition);
    }
    onValueChange(value);
  };
  const handleCustomPlaceholder = (placeholder2) => {
    if (typeof placeholder2 === "number")
      return formatCurrency(placeholder2, fractionDigits, fractionDigits);
    if (placeholder2 === null)
      return "";
    return placeholder2;
  };
  let formattedValue = "";
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.isZeroNullish === void 0 && $$bindings.isZeroNullish && isZeroNullish !== void 0)
    $$bindings.isZeroNullish(isZeroNullish);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.isNegativeInput === void 0 && $$bindings.isNegativeInput && isNegativeInput !== void 0)
    $$bindings.isNegativeInput(isNegativeInput);
  if ($$props.currency === void 0 && $$bindings.currency && currency !== void 0)
    $$bindings.currency(currency);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.inputClasses === void 0 && $$bindings.inputClasses && inputClasses !== void 0)
    $$bindings.inputClasses(inputClasses);
  if ($$props.fractionDigits === void 0 && $$bindings.fractionDigits && fractionDigits !== void 0)
    $$bindings.fractionDigits(fractionDigits);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  $$result.css.add(css$1);
  isNegative = value < 0;
  isPositive = value > 0;
  isZero = !isNegative && !isPositive;
  {
    setFormattedValueInput(false);
  }
  return `<div${add_attribute("class", inputClasses?.wrapper ?? DEFAULT_CLASS_WRAPPER, 0)}><input class="${escape(null_to_empty(inputClasses?.unformatted ?? DEFAULT_CLASS_UNFORMATTED), true) + " svelte-azuej"}" type="hidden"${add_attribute("name", name, 0)} ${disabled ? "disabled" : ""}${add_attribute("value", value, 0)}> <input${add_attribute("id", id, 0)} class="${"" + escape(inputClasses?.formatted ?? DEFAULT_CLASS_FORMATTED, true) + " " + escape(
    isNegativeInput && !isZero && !isNegative ? inputClasses?.formattedPositive ?? DEFAULT_CLASS_FORMATTED_POSITIVE : "",
    true
  ) + " " + escape(
    isZero ? inputClasses?.formattedZero ?? DEFAULT_CLASS_FORMATTED_ZERO : "",
    true
  ) + " " + escape(
    isNegativeInput && isNegative ? inputClasses?.formattedNegative ?? DEFAULT_CLASS_FORMATTED_NEGATIVE : "",
    true
  ) + " svelte-azuej"}" ${disabled ? "disabled" : ""} type="text"${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("name", `formatted-${name}`, 0)} ${required && !isZero ? "required" : ""}${add_attribute("inputmode", fractionDigits > 0 ? "decimal" : "numeric", 0)}${add_attribute("placeholder", handleCustomPlaceholder(placeholder), 0)}${add_attribute("value", formattedValue, 0)}> </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "form.demo.svelte-1pcd5ay input.currencyInput__formatted{width:100%;color:black;font-size:13px;font-family:Helvetica, sans-serif}.custom-formatted-class.svelte-1pcd5ay.svelte-1pcd5ay{padding-top:0.25rem;padding-bottom:0.25rem;color:red !important}body{--gap:100px;margin:0;display:flex;align-items:center;place-items:center;padding:var(--gap);box-sizing:border-box;justify-content:center;background-color:#fafafa;font-family:Helvetica, sans-serif;@media (max-width: 768px) {\r\n			--gap: 48px;\r\n		};@media (max-width: 512px) {\r\n			--gap: 32px;\r\n		};@media (max-width: 411px) {\r\n			min-height: auto;\r\n		}}.demo__nav.svelte-1pcd5ay.svelte-1pcd5ay{gap:20px;display:flex;margin-bottom:40px;flex-direction:column;justify-content:center}.demo__nav-item.svelte-1pcd5ay.svelte-1pcd5ay{gap:12px;display:flex;flex-wrap:wrap;text-align:center;align-items:center;justify-content:center}h1.demo__h1.svelte-1pcd5ay.svelte-1pcd5ay{color:#333;font-size:30px;line-height:1em;text-align:center;margin-block:unset;letter-spacing:-0.025em}a.demo__a.svelte-1pcd5ay.svelte-1pcd5ay{color:#333;text-decoration:none}a.demo__a.svelte-1pcd5ay.svelte-1pcd5ay:visited{color:#666}div.demo__wrapper-item.svelte-1pcd5ay.svelte-1pcd5ay{gap:30px;display:grid;grid-template-columns:repeat(2, minmax(0, 1fr))}div.demo__wrapper-item.svelte-1pcd5ay label.svelte-1pcd5ay{color:#000;font-weight:600;margin-bottom:12px;display:inline-block}div.demo__wrapper-item__input-currency.svelte-1pcd5ay.svelte-1pcd5ay{gap:12px;display:flex;flex-direction:column}button.demo__submit.svelte-1pcd5ay.svelte-1pcd5ay{width:100%;color:#fff;border:none;padding:10px;font-size:13px;cursor:pointer;height:max-content;background-color:#1e40af}nav.demo__output.svelte-1pcd5ay.svelte-1pcd5ay{margin-top:2rem}pre.demo__pre.svelte-1pcd5ay.svelte-1pcd5ay{color:#666;padding:10px;max-width:100%;overflow-y:auto;margin-top:1rem;border-radius:10px;box-sizing:border-box;background-color:white;box-shadow:rgba(0, 0, 0, 0.1) 0px 3px 6px}pre.demo__pre--placeholder.svelte-1pcd5ay.svelte-1pcd5ay{font-size:13px;font-family:Helvetica, sans-serif}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let unchangedValue = 999;
  $$result.css.add(css);
  return `<form class="demo svelte-1pcd5ay"><nav class="demo__nav svelte-1pcd5ay" data-svelte-h="svelte-1ned51r"><div class="demo__nav-heading"><h1 class="demo__h1 svelte-1pcd5ay">svelte-currency-format-input</h1> <h6 style="text-align: center; font-size: 12px; color: #666; font-weight: 400; margin-top: 15px; margin-bottom: 10px;">An interactive form input that instantly transforms numerical entries into localized currency formats while you type.</h6></div> <div class="demo__nav-item svelte-1pcd5ay"><a class="demo__a svelte-1pcd5ay" href="https://github.com/Adityarizqi7/svelte-currency-format-input" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 128 128"><g fill="#181616"><path fill-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" clip-rule="evenodd"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0"></path></g></svg></a> <a class="demo__a svelte-1pcd5ay" href="https://www.npmjs.com/package/@adityarizqi/svelte-currency-format-input" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="#C12127" d="M0 256V0h256v256z"></path><path fill="#FFF" d="M48 48h160v160h-32V80h-48v128H48z"></path></svg></a> <a class="demo__a svelte-1pcd5ay" href="https://github.com/Adityarizqi7/svelte-currency-format-input/issues" target="_blank">Known Issues</a> <a class="demo__a svelte-1pcd5ay" href="https://github.com/Adityarizqi7/svelte-currency-format-input#contributing" target="_blank">Contribute</a></div></nav> <div class="demo__container"><div class="demo__wrapper-item svelte-1pcd5ay"><div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-1d8od0n">DEFAULT</label> <div class="demo__wrapper-item__input-currency default-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "default",
      value: 666.69,
      isNegativeInput: false
    },
    {},
    {}
  )}</div></div> <div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-1hgr4ew">Custom VALUE, LOCALE and CURRENCY</label> <div class="demo__wrapper-item__input-currency custom-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      id: "currency-input",
      name: "default",
      locale: "id-ID",
      currency: "IDR",
      value: 12e4
    },
    {},
    {}
  )} ${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "colon",
      locale: "es-CR",
      currency: "CRC",
      value: 75e4
    },
    {},
    {}
  )}</div></div> <div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-vkigu1">Custom LOCALE and CURRENCY</label> <div class="demo__wrapper-item__input-currency custom-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      id: "currency-input",
      name: "bitcoin",
      locale: "th-TH",
      currency: "THB",
      value: 2382.22
    },
    {},
    {}
  )} ${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "yen",
      locale: "en-JP",
      currency: "JPY"
    },
    {},
    {}
  )}</div></div> <div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-1mjumki">Custom NEGATIVE INPUT and PLACEHOLDER</label> <div class="demo__wrapper-item__input-currency custom-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "pound",
      locale: "en-GB",
      currency: "GBP",
      isNegativeInput: true,
      id: "currency-input",
      placeholder: "Are you happy now?"
    },
    {},
    {}
  )} ${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      locale: "en-GB",
      currency: "GBP",
      name: "pound-currency",
      isNegativeInput: false,
      placeholder: "Are you proud?"
    },
    {},
    {}
  )}</div></div> <div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-1ar1csp">Custom FRACTION DIGITS and DISABLED Format</label> <div class="demo__wrapper-item__input-currency custom-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      id: "currency-input",
      name: "rupees",
      value: 7782,
      locale: "hi-IN",
      currency: "INR",
      fractionDigits: 0
    },
    {},
    {}
  )} ${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "shekel",
      value: 97532.95,
      disabled: true,
      locale: "il-IL",
      currency: "ILS"
    },
    {},
    {}
  )}</div></div> <div class="demo__wrapper-item__group-input"><label for="currency-input" class="svelte-1pcd5ay" data-svelte-h="svelte-s3akox">Custom ONCHANGE and ZERO NULL Format</label> <div class="demo__wrapper-item__input-currency custom-input svelte-1pcd5ay">${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "pesos",
      locale: "es-AR",
      currency: "ARS",
      autocomplete: "off",
      placeholder: null,
      id: "currency-input",
      value: unchangedValue,
      isNegativeInput: false,
      onValueChange: (value) => {
        if (unchangedValue !== value) {
          unchangedValue = value;
        }
      }
    },
    {},
    {}
  )} ${validate_component(CurrencyFormatInput, "CurrencyFormatInput").$$render(
    $$result,
    {
      name: "soles",
      value: 0,
      isZeroNullish: true,
      placeholder: null,
      locale: "es-PE",
      currency: "PEN"
    },
    {},
    {}
  )}</div></div></div></div> <nav class="demo__output svelte-1pcd5ay"><button type="submit" class="demo__submit svelte-1pcd5ay" data-svelte-h="svelte-xi7i71">Send</button> <pre class="${"demo__pre " + escape("demo__pre--placeholder", true) + " svelte-1pcd5ay"}">${escape("Submit the form to view a JSON output of the values.")}</pre></nav> </form>`;
});
export {
  Page as default
};
