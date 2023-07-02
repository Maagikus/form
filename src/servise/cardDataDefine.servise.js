export class CardDataDefine {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }
  bins = [
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
  cobrand = [
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

  getCardType() {
    const cardPatterns = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      Mastercard: /^5[1-5][0-9]{14}$/,
      // UzCard: /^8600[0-9]{10}$/,
      // Humo: /^9860[0-9]{10}$/,
      // Mir: /^220[0-4][0-9]{12}$/,
    };

    const cardType = Object.keys(cardPatterns).find((type) =>
      cardPatterns[type].test(this.cardNumber)
    );

    if (!cardType) {
      const firstDigits = this.cardNumber.slice(0, 4);
      const firstDigits_5 = this.cardNumber.slice(0, 5);
      if (
        this.bins.includes(this.cardNumber.slice(0, 6)) ||
        this.cobrand.includes(this.cardNumber.slice(0, 8))
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
  }
}
