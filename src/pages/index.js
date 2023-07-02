import Head from "next/head";
import styles from "@/styles/Loader.module.css";
import { useState, useEffect } from "react";
import { CardValidationServise } from "@/servise/validation.servise";
export default function Home() {
  const state = {
    cardHolder: "Abdula",
    status: 1,
    reference: "141111",
    updateContinue: true,
    sum: 50,
    currency: "₽",
  };
  const [updateContinue, setUpdateContinue] = useState(state.updateContinue);
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [reference, setReference] = useState(state.reference || "");
  const [status, setStatus] = useState(state.cardHolder || null);
  const [cardHolder, setCardHolder] = useState(state.cardHolder || "");
  const [cardType, setCardType] = useState("");
  const [isCvvNeeded, setIsCvvNeeded] = useState(true);
  const [sum, setSum] = useState(state.sum || 0);
  const [currency, setCurrency] = useState(state.currency || "usd");
  const [cardNumberError, setCardNumberError] = useState(
    "Карта не может быть пустая"
  );
  const [cardNumberDirty, setCardNumberDirty] = useState(false);
  const [expDateDirty, setExpDateDirty] = useState(false);
  const [cvvDirty, setCvvDirty] = useState(false);
  const [holderNameDirty, setHolderNameDirty] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(
    "Дата не может быть пустой"
  );
  const [cvvError, setCvvError] = useState("cvv не может быть пустым");
  const [cardHolderError, setCardHolderError] = useState(
    state.cardHolder ? "" : "не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (cardHolderError || cvvError || expiryDateError || cardNumberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [cardHolderError, cvvError, expiryDateError, cardNumberError]);
  const blureHandle = (e) => {
    switch (e.target.name) {
      case "number":
        setCardNumberDirty(true);
        break;
      case "date":
        setExpDateDirty(true);
        break;
      case "cvv":
        setCvvDirty(true);
        break;
      case "name_of_card":
        setHolderNameDirty(true);
        break;
    }
  };

  console.log(cardNumberError, expiryDateError, cvvError, cardHolderError);
  const validateCardData = () => {};

  const TIME_FOR_UPDATING = 10000;
  const cardValidation = new CardValidationServise();

  const update = () => {
    if (updateContinue) {
      console.log("da");
    }
  };

  useEffect(() => {
    let updateTimeoutId = null;

    const startUpdate = () => {
      update();
      updateTimeoutId = setTimeout(startUpdate, TIME_FOR_UPDATING);
    };

    if (updateContinue) {
      startUpdate();
    }

    return () => {
      clearTimeout(updateTimeoutId);
    };
  }, [updateContinue]);

  const handlePayment = (e) => {
    e.preventDefault();

    setUpdateContinue(false);
  };
  const handleChangeHolder = (event) => {
    const inputValue = event.target.value;
    setCardHolder(inputValue);
    if (!cardValidation.isCardHolderValid(cardHolder)) {
      setCardHolderError("Имя должно быть больше 2 символов");
    } else {
      setCardHolderError("");
    }
  };
  const handleChangeСvv = (e) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    let formattedCvvValue = digitsOnly;
    setCvv(formattedCvvValue);
    if (!cardValidation.isCvvValid(formattedCvvValue)) {
      setCvvError(" должно быть 3 символа");
    } else {
      setCvvError("");
    }
  };
  const handleChangeExpDate = (e) => {
    const value = e.target.value;

    const digitsOnly = value.replace(/\D/g, "");
    let formattedValue = digitsOnly;
    if (digitsOnly.length > 2) {
      formattedValue = digitsOnly.slice(0, 2) + "/" + digitsOnly.slice(2, 4);
    }

    setExpiryDate(formattedValue);
    if (!cardValidation.isExpDateValid(formattedValue)) {
      setExpiryDateError("Дата введена некорректно");
    } else {
      setExpiryDateError("");
    }
  };
  const handleChangeCardNumber = (e) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
      if (
        !cardValidation.isCardNumberValid(formattedValue, cardType, setCardType)
      ) {
        setCardNumberError("Проверьте номер карты");
      } else {
        console.log("norm");
        setCardNumberError("");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div class="payment">
        <div class="payment__wrapper">
          {/* <div class="payment__header">
            <h2 className="payment__title">пополнить</h2>
          </div> */}
          <div class="payment__body body-payment">
            <h2 class="body-payment__title">
              Оплата заказа: <span>№{reference}</span>
            </h2>
            <form
              onSubmit={(e) => handlePayment(e)}
              onChange={validateCardData}
              className="body-payment__form form-payment"
            >
              <div class="form-payment__wrapper">
                <div class="form-payment__card">
                  <div
                    style={{
                      border:
                        cardValidation.isCardNumberValid(
                          cardNumber,
                          cardType,
                          setCardType
                        ) || cardNumber === ""
                          ? ""
                          : "2px solid red",
                    }}
                    className="form-payment__item form-payment__item-number"
                  >
                    <div class="form-paymen__type">
                      {cardType ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cardValidation.getCardImagePath(cardType)}
                          alt="homo"
                        />
                      ) : null}
                    </div>
                    <input
                      autocomplete="off"
                      type="text"
                      name="number"
                      data-error="Ошибка"
                      maxLength=""
                      placeholder="0000 0000 0000 0000"
                      class="form-payment__input form-payment__input-number input"
                      value={cardNumber}
                      onBlur={(e) => blureHandle(e)}
                      onChange={(e) => {
                        handleChangeCardNumber(e);
                      }}
                    />
                  </div>
                  <div class="form-payment__group">
                    <div
                      style={{
                        flex: isCvvNeeded ? "0 1 69.117%" : "0 1 100%",
                      }}
                      class="form-payment__item  form-payment__item-date  "
                    >
                      <input
                        style={{
                          outline:
                            cardValidation.isExpDateValid(expiryDate) ||
                            expiryDate === ""
                              ? ""
                              : "2px solid red",
                        }}
                        onBlur={(e) => blureHandle(e)}
                        autocomplete="off"
                        type="text"
                        name="date"
                        id="date"
                        placeholder="MM / YY"
                        class="form-payment__input form-payment__input-date input"
                        required
                        value={expiryDate}
                        onChange={(e) => handleChangeExpDate(e)}
                      />
                      <label class="form-payment__label" for="date">
                        MM / YY
                      </label>
                    </div>
                    <div
                      style={{ display: isCvvNeeded ? "block" : "none" }}
                      class="form-payment__item form-payment__item-cvv "
                    >
                      <input
                        style={{
                          outline:
                            cardValidation.isCvvValid(cvv) || cvv === ""
                              ? ""
                              : "2px solid red",
                        }}
                        onBlur={(e) => blureHandle(e)}
                        autocomplete="off"
                        type="text"
                        name="cvv"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => handleChangeСvv(e)}
                        maxLength="3"
                        placeholder="CVV"
                        class="form-payment__input form-payment__input-cvv input"
                        required
                      />
                      <label class="form-payment__label" for="cvv">
                        CVV
                      </label>
                    </div>
                  </div>

                  <div class="form-payment__error">
                    {cardNumberDirty && cardNumberError && (
                      <span>{cardNumberError}</span>
                    )}
                    {expDateDirty && expiryDateError && (
                      <span>{expiryDateError}</span>
                    )}
                    {cvvDirty && cvvError && <span>{cvvError}</span>}
                  </div>
                </div>
                <div class="form-payment__item form-payment__item-name">
                  <input
                    style={{
                      border:
                        cardValidation.isCardHolderValid(cardHolder) ||
                        cardHolder === ""
                          ? ""
                          : "2px solid red",
                    }}
                    autocomplete="off"
                    type="text"
                    name="name_of_card"
                    placeholder="Name on card"
                    id="name_on_card"
                    class="form-payment__input form-payment__input-name input"
                    required
                    value={cardHolder}
                    onChange={(e) => handleChangeHolder(e)}
                    onBlur={(e) => blureHandle(e)}
                  />
                  <label class="form-payment__label" for="name_on_card">
                    Name on card
                  </label>
                  {holderNameDirty && cardHolderError && (
                    <div class="form-payment__error">{cardHolderError}</div>
                  )}
                </div>
                {/* <div class="body-payment__checkbox checkbox">
                  <input
                    id="c_1"
                    data-error="Ошибка"
                    class="checkbox__input"
                    type="checkbox"
                    value="1"
                    name="form[]"
                  />
                  <label for="c_1" class="checkbox__label">
                    <span class="checkbox__text">Сохранить карту</span>
                  </label>
                </div> */}
              </div>
              <button
                disabled={!formValid}
                type="submit"
                class="form-payment__button"
              >
                Оплатить{" "}
                <span>
                  {sum} {currency}
                </span>{" "}
              </button>
            </form>
          </div>
          <div class="payment__footer footer-payment">
            <div class="footer-payment__providers">
              <div class="footer-payment__image">
                <img src="/img/uzcard.png" alt="UZCARD" />
              </div>
              <div class="footer-payment__image">
                <img src="img/humo-2.png" alt="HUMO" />
              </div>
              <div class="footer-payment__image">
                <img src="/img/visa.png" alt="VISA" />
              </div>
              <div class="footer-payment__image">
                <img src="/img/mastercard.png" alt="MASTERCARD" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
