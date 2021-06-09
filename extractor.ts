import moment from 'moment';

import * as tinderData from './data.json';

type UsageType = { [key: string]: number; };
type UsagePropertyNames = 'totalLikes' | 'totalPasses' | 'totalMatches' | 'totalContacts' | 'totalAnswers';

const computedDataPerYear = {} as {
    [key: string]: {
        totalLikes?: number,
        totalPasses?: number,
        totalMatches?: number,
        totalContacts?: number,
        totalAnswers?: number
    }
};
let dates: string[];

const addToComputedDataPerYear = (year: number, property: UsagePropertyNames, valueToAdd: number) => {
    if (computedDataPerYear[year]) {
        if (computedDataPerYear[year][property]) {
            computedDataPerYear[year][property]! += valueToAdd;
        } else {
            computedDataPerYear[year][property] = valueToAdd;
        }
    } else {
        computedDataPerYear[year] = {
            [property]: valueToAdd
        };
    }
};

const extractDataFromUsageAndAddToComputedDataPerYear = (dataName: string, savedPropertyName: UsagePropertyNames) => {
    const usage = tinderData.Usage as unknown as { [key: string]: UsageType};
    const dataToExtract = usage[dataName];

    dates = Object.keys(dataToExtract);
    dates.forEach((date) => {
        const dayData = dataToExtract[date];
        const year = moment(date).year();
        addToComputedDataPerYear(year, savedPropertyName, dayData);
    });
}

console.log('----------------------------------------------------------------');
console.log('---------------------- Numbers of swipes -----------------------');

extractDataFromUsageAndAddToComputedDataPerYear('swipes_likes', 'totalLikes');

extractDataFromUsageAndAddToComputedDataPerYear('swipes_passes', 'totalPasses');

console.log('----------------------------------------------------------------');
console.log('--------------------- Numbers of matches -----------------------');

extractDataFromUsageAndAddToComputedDataPerYear('matches', 'totalMatches');

console.log('----------------------------------------------------------------');
console.log('---------- Contacts & answers (sent more than 3 msgs) ----------');

tinderData.Messages.forEach((MatchMessages) => {
    const numberOfMessages = MatchMessages.messages.length;
    if (numberOfMessages >= 3) {
        const year = moment(MatchMessages.messages[0].sent_date).year();
        addToComputedDataPerYear(year, 'totalAnswers', 1);
    }

    if (numberOfMessages < 1) {
        console.log('A match contact was lost in time.');
    } else {
        const year = moment(MatchMessages.messages[0].sent_date).year();
        addToComputedDataPerYear(year, 'totalContacts', 1);
    }
});

console.log('----------------------------------------------------------------');
console.log('computedDataPerYear:', computedDataPerYear);
