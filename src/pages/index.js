import Head from "next/head";
import styles from "@/styles/Loader.module.css";
import { useState, useEffect, useRef } from "react";
import { CardValidationServise } from "@/servise/validation.servise";
import Loader from "@/components/loader";
import { dictionary } from "@/servise/dictionary";
export default function Home() {
  const state = {
    cardHolder: "Abdula",
    status: 1,
    reference: "141111",
    updateContinue: true,
    sum: 50,
    currency: "₽",
    lang: "ru",
  };

  const [updateContinue, setUpdateContinue] = useState(state.updateContinue);
  const [loadingStatus, setLoadingStatus] = useState(2);
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [reference, setReference] = useState(state.reference || "");
  const [status, setStatus] = useState(state.cardHolder || null);
  const [cardHolder, setCardHolder] = useState(state.cardHolder || "");
  const [cardType, setCardType] = useState("");
  const [isCvvNeeded, setIsCvvNeeded] = useState(true);
  const inputRef = useRef(null);
  const [sum, setSum] = useState(state.sum || 0);
  const [currency, setCurrency] = useState(state.currency || "usd");
  const [langDictionary, seLengDictionary] = useState(state.lang || "ru");

  const [cardNumberError, setCardNumberError] = useState(
    dictionary[langDictionary].errors.emptyCard
  );
  const [cardNumberDirty, setCardNumberDirty] = useState(false);
  const [expDateDirty, setExpDateDirty] = useState(false);
  const [cvvDirty, setCvvDirty] = useState(false);
  const [holderNameDirty, setHolderNameDirty] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(
    dictionary[langDictionary].errors.emptyExpDate
  );
  const [cvvError, setCvvError] = useState(
    dictionary[langDictionary].errors.emptyCvv
  );
  const [cardHolderError, setCardHolderError] = useState(
    state.cardHolder ? "" : dictionary[langDictionary].errors.emptyCardHolder
  );
  const [formValid, setFormValid] = useState(false);

  const inputRefCardNumber = useRef(null);
  const inputRefExpDate = useRef(null);
  const inputRefCvv = useRef(null);

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

  const validateCardData = () => {};

  const TIME_FOR_UPDATING = 10000;
  const cardValidation = new CardValidationServise();

  const update = () => {
    if (updateContinue) {
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
    setLoadingStatus(1);
    setInterval(() => {
      setLoadingStatus(2);
    }, 2000);
    setUpdateContinue(false);
  };
  const handleClickInput = (event) => {
    const inputElement = event.target;
    inputElement.setSelectionRange(
      inputElement.value.length,
      inputElement.value.length
    );
  };

  const handleChangeHolder = (event) => {
    const inputValue = event.target.value;
    const inputElement = inputRef.current;

    setCardHolder(inputValue);
    if (!cardValidation.isCardHolderValid(cardHolder)) {
      setCardHolderError(dictionary[langDictionary].errors.shortName);
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
      setCvvError(dictionary[langDictionary].errors.shortCvv);
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
      setExpiryDateError(dictionary[langDictionary].errors.incorrectDate);
    } else {
      setExpiryDateError("");
      inputRefCvv.current.focus();
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
        setCardNumberError(dictionary[langDictionary].errors.incorrectCard);
      } else {
        setCardNumberError("");
        inputRefExpDate.current.focus();
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
      <div className="payment">
        <div className="payment__wrapper">
          {/* <div className="payment__header">
            <h2 className="payment__title">пополнить</h2>
          </div> */}
          <div className="payment__body body-payment">
            {loadingStatus === 1 ? (
              <div className="body-payment__loader">
                <Loader />
              </div>
            ) : null}

            <h2 className="body-payment__title">
              {dictionary[langDictionary].title}

              <span>№{reference}</span>
            </h2>
            <form
              onSubmit={(e) => handlePayment(e)}
              onChange={validateCardData}
              className="body-payment__form form-payment"
            >
              <div className="form-payment__wrapper">
                <div className="form-payment__card">
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
                    <div className="form-paymen__type">
                      {cardType ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cardValidation.getCardImagePath(cardType)}
                          alt="homo"
                        />
                      ) : null}
                    </div>
                    <input
                      autoComplete="off"
                      type="text"
                      name="number"
                      data-error="Ошибка"
                      maxLength=""
                      placeholder="0000 0000 0000 0000"
                      className="form-payment__input form-payment__input-number input"
                      value={cardNumber}
                      onBlur={(e) => blureHandle(e)}
                      onChange={(e) => {
                        handleChangeCardNumber(e);
                      }}
                      ref={inputRefCardNumber}
                    />
                  </div>
                  <div className="form-payment__group">
                    <div
                      style={{
                        flex: isCvvNeeded ? "0 1 69.117%" : "0 1 100%",
                      }}
                      className="form-payment__item  form-payment__item-date  "
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
                        autoComplete="off"
                        type="text"
                        name="date"
                        id="date"
                        placeholder="MM / YY"
                        className="form-payment__input form-payment__input-date input"
                        required
                        value={expiryDate}
                        onChange={(e) => handleChangeExpDate(e)}
                        ref={inputRefExpDate}
                      />
                      <label className="form-payment__label" htmlFor="date">
                        MM / YY
                      </label>
                    </div>
                    <div
                      style={{ display: isCvvNeeded ? "block" : "none" }}
                      className="form-payment__item form-payment__item-cvv "
                    >
                      <input
                        style={{
                          outline:
                            cardValidation.isCvvValid(cvv) || cvv === ""
                              ? ""
                              : "2px solid red",
                        }}
                        onBlur={(e) => blureHandle(e)}
                        autoComplete="off"
                        type="text"
                        name="cvv"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => handleChangeСvv(e)}
                        maxLength="3"
                        placeholder="CVV"
                        className="form-payment__input form-payment__input-cvv input"
                        required
                        ref={inputRefCvv}
                      />
                      <label className="form-payment__label" htmlFor="cvv">
                        CVV
                      </label>
                    </div>
                  </div>

                  <div className="form-payment__error">
                    {cardNumberDirty && cardNumberError && (
                      <span>{cardNumberError}</span>
                    )}
                    {expDateDirty && expiryDateError && (
                      <span>{expiryDateError}</span>
                    )}
                    {cvvDirty && cvvError && <span>{cvvError}</span>}
                  </div>
                </div>
                <div className="form-payment__item form-payment__item-name">
                  <input
                    style={{
                      border:
                        cardValidation.isCardHolderValid(cardHolder) ||
                        cardHolder === ""
                          ? ""
                          : "2px solid red",
                    }}
                    autoComplete="off"
                    type="text"
                    name="name_of_card"
                    placeholder="Name on card"
                    id="name_on_card"
                    className="form-payment__input form-payment__input-name input"
                    required
                    value={cardHolder}
                    onChange={(e) => handleChangeHolder(e)}
                    onBlur={(e) => blureHandle(e)}
                    onClick={handleClickInput}
                  />
                  <label className="form-payment__label" htmlFor="name_on_card">
                    Name on card
                  </label>
                  {holderNameDirty && cardHolderError && (
                    <div className="form-payment__error">{cardHolderError}</div>
                  )}
                </div>
                {/* <div className="body-payment__checkbox checkbox">
                  <input
                    id="c_1"
                    data-error="Ошибка"
                    className="checkbox__input"
                    type="checkbox"
                    value="1"
                    name="form[]"
                  />
                  <label htmlFor="c_1" className="checkbox__label">
                    <span className="checkbox__text"> {dictionary[langDictionary].save}</span>
                  </label>
                </div> */}
              </div>
              <button
                disabled={!formValid}
                type="submit"
                className="form-payment__button"
              >
                {loadingStatus === 1 ? (
                  <div className="loader">
                    <div className="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {dictionary[langDictionary].pay}{" "}
                    <span>
                      {sum} {currency}
                    </span>{" "}
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="payment__footer footer-payment">
            <div className="footer-payment__providers">
              <div className="footer-payment__image">
                <img src="/img/uzcard.png" alt="UZCARD" />
              </div>
              <div className="footer-payment__image">
                <img src="img/humo-2.png" alt="HUMO" />
              </div>
              <div className="footer-payment__image">
                <img src="/img/visa.png" alt="VISA" />
              </div>
              <div className="footer-payment__image">
                <img src="/img/mastercard.png" alt="MASTERCARD" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
