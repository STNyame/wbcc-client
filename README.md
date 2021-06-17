# Notes to reader
- I chose to use https://openexchangerates.org/ as API instead, because https://ratesapi.io/ no longer supports HTTPS encryption for the free plan.
- The API time-series endpoint only gives access to clients with the Enterprise or Unlimited plans. Because I really wanted to implement a chart for the user, I decided to create one that shows the rates of the current source currency and some of the most-traded-currencies of the year 2021 and 2020.
