# Tinder match/like ratio extractor

This script takes your Tinder data (https://account.gotinder.com/data) and generates something like:

```
  '2019': {
    totalLikes: 4322,
    totalPasses: 1460,
    totalMatches: 12,
    totalAnswers: 7,
    totalContacts: 3
  },
  '2020': {
    totalLikes: 7550,
    totalPasses: 4522,
    totalMatches: 100,
    totalContacts: 44,
    totalAnswers: 15
  }
```

## Usage

You need `yarn`. Initialize the repository by running the command `yarn` (inside the directory).

Add the Tinder-extracted JSON file `data.json`.

Run `yarn extract` to obtain results.
