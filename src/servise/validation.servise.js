export class CardValidationServise {
  cardImages = {
    Visa: "/img/visa-2.png",
    Mastercard: "/img/mastercard-2.png",
    Humo: "/img/humo.png",
    UzCard: "/img/uzcard-2.png",
    Mir: "/img/mir.png",
  };
  constructor() {}
  isCvvValid = (cvv) => {
    const regex = /^\d{0,3}$/;
    return regex.test(cvv) && cvv.length === 3;
  };
  isExpDateValid = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/2[0-9]$/;
    return regex.test(expiryDate);
  };
  isCardHolderValid = (cardHolder) => {
    const regex = /^[^!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?`~]*$/;
    return regex.test(cardHolder) && cardHolder.length >= 2;
  };
  getCardType = (cardNumber) => {
    const cardPatterns = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      Mastercard: /^5[1-5][0-9]{14}$/,
      // UzCard: /^8600[0-9]{10}$/,
      // Humo: /^9860[0-9]{10}$/,
      // Mir: /^220[0-4][0-9]{12}$/,
    };

    const bins = [
      "860020",
      "860050",
      "860038",
      "860055",
      "860056",
      "860057",
      "860002",
      "860003",
      "860004",
      "860005",
      "860006",
      // '860007',
      "860008",
      "860009",
      "860011",
      "860012",
      "860013",
      "860014",
      "860030",
      "860031",
      "860033",
      "860034",
      "860048",
      "860049",
      "860051",
      "860053",
      "860043",
      "860058",
      "860059",
      "860060",
      "860061",
      "860062",
      "860063",
    ];
    const cobrand = [
      "56146814",
      "56146819",
      "56146813",
      "56146841",
      "56146827",
      "56146818",
      "56146804",
      "56146828",
      "56146810",
      "56146840",
      "56146824",
      "56146816",
      "56146812",
      "56146800",
      "56146839",
      "56146805",
      "56146806",
      "56146807",
      "56146822",
      "56146801",
      "56146802",
      "56146820",
      "56146815",
      "56146823",
      "56146809",
      "56146826",
      "56146803",
      "56146825",
      "56146821",
      "56146811",
      "56146808",
      "56146817",
    ];

    const cardType = Object.keys(cardPatterns).find((type) =>
      cardPatterns[type].test(cardNumber)
    );

    if (!cardType) {
      const firstDigits = cardNumber.slice(0, 4);
      const firstDigits_5 = cardNumber.slice(0, 5);
      if (
        bins.includes(cardNumber.slice(0, 6)) ||
        cobrand.includes(cardNumber.slice(0, 8))
      ) {
        return "UzCard";
      } else if (firstDigits === "2200" || firstDigits === "2204") {
        return "Mir";
      } else if (
        firstDigits_5 === "98611" ||
        firstDigits_5 === "98600" ||
        firstDigits_5 === "98602" ||
        firstDigits_5 === "98603" ||
        firstDigits_5 === "98606" ||
        firstDigits_5 === "98601"
      ) {
        return "Humo";
      }
      // Add more conditions if needed for other card types
    }

    return cardType || "";
  };

  isCardNumberValid = (
    cardNumber,
    cardType,
    setCardType,
    setCardNumberError
  ) => {
    const joinedCardNumber = cardNumber;
    const cardNumberDigitsOnly = joinedCardNumber.replace(/\D/g, "");
    if (cardNumberDigitsOnly.length !== 16) {
      return false;
    }
    let sum = 0;
    let doubleUp = false;

    for (let i = cardNumberDigitsOnly.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumberDigitsOnly.charAt(i));

      if (doubleUp && (digit *= 2) > 9) {
        digit -= 9;
      }

      sum += digit;
      doubleUp = !doubleUp;
    }
    // Check if the card number passes the Luhn algorithm
    if (sum % 10 !== 0) {
      // Check if the card number is UzCard
      if (!this.isUzCard(cardNumberDigitsOnly)) {
        return false;
      }
    }

    // Determine the card type based on the card number prefix
    const newCardType = this.getCardType(cardNumberDigitsOnly);
    if (newCardType !== cardType) {
      console.log("Card Type:", newCardType);
      setCardType(newCardType); // Записываем тип карты в состояние
    }

    return true;
  };
  isUzCard = (cardNumber) => {
    const bins = [
      "860020",
      "860050",
      "860038",
      "860055",
      "860056",
      "860057",
      "860002",
      "860003",
      "860004",
      "860005",
      "860006",
      // '860007',
      "860008",
      "860009",
      "860011",
      "860012",
      "860013",
      "860014",
      "860030",
      "860031",
      "860033",
      "860034",
      "860048",
      "860049",
      "860051",
      "860053",
      "860043",
      "860058",
      "860059",
      "860060",
      "860061",
      "860062",
      "860063",
    ];
    const cobrand = [
      "56146814",
      "56146819",
      "56146813",
      "56146841",
      "56146827",
      "56146818",
      "56146804",
      "56146828",
      "56146810",
      "56146840",
      "56146824",
      "56146816",
      "56146812",
      "56146800",
      "56146839",
      "56146805",
      "56146806",
      "56146807",
      "56146822",
      "56146801",
      "56146802",
      "56146820",
      "56146815",
      "56146823",
      "56146809",
      "56146826",
      "56146803",
      "56146825",
      "56146821",
      "56146811",
      "56146808",
      "56146817",
    ];
    const _prefix = cardNumber.slice(0, 6);
    const _prefix2 = cardNumber.slice(0, 5);
    const _prefix3 = cardNumber.slice(0, 8);

    return (
      bins.includes(_prefix) ||
      cobrand.includes(_prefix3) ||
      _prefix2 === "86001" ||
      _prefix2 === "86000" ||
      _prefix2 === "98611" ||
      _prefix2 === "98600"
    );
  };

  getCardImagePath = (cardType) => {
    return this.cardImages[cardType] || "";
  };
}
