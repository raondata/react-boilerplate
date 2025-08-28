import _ from 'lodash';

const formatUtils = {
  price: (value?: number): string => {
    return (value || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  fixed: (value: number | undefined, fix?: number): number | string => {
    if (value === undefined) return '-';
    if (!isFinite(value)) return 'Nan';

    // Check if value is an integer
    if (Number.isInteger(value)) {
      return value;
    }

    // If not, round to 2 decimal places and remove trailing zeros
    return parseFloat(value.toFixed(fix === undefined ? 2 : fix));
  },
  minute: (val: number | string | undefined, skipZeroSecond?: boolean) => {
    if (typeof val === 'number') {
      const min = Math.floor(val / 60);
      const sec = (val % 60).toFixed(0);

      return min > 0
        ? `${min}분 ${
            !(skipZeroSecond === true && sec === '0') ? `${sec}초` : ''
          }`
        : sec === '0' && skipZeroSecond === true
        ? '0분'
        : `${sec}초`;
    } else {
      return '-';
    }
  },
  addLeadingZero: (val?: number | string | undefined) => {
    const numVal = Number(val);
    if (numVal < 10 && numVal >= 0) {
      return `0${val}`;
    } else if (Number.isInteger(numVal)) {
      return numVal;
    }

    return undefined;
  },
  camelToSnakeObjectKey: (obj: { [key: string]: any }) => {
    const result: { [key: string]: any } = {};

    Object.entries(obj).forEach(([key, value]) => {
      result[_.snakeCase(key)] = value;
    });

    return result;
  },
  extractSentence: (sentences: string, keywords: string[]) => {
    if (!sentences) return '';
    const splited = sentences.split('|');
    const sentencesWithSpecificWords = [];
    // Iterate through each sentence and check if it contains the specific words
    for (const sentence of splited) {
      const sentenceLower = sentence.toLowerCase(); // Convert to lowercase for case-insensitive search
      if (keywords.some((word) => sentenceLower.includes(word))) {
        sentencesWithSpecificWords.push(sentence.trim()); // Remove leading/trailing spaces
      }
    }

    return sentencesWithSpecificWords.join('..');
  },
};

export default formatUtils;
