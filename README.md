# Dmoney API Testing with Postman and Newman

API test automation for Dmoney, a mobile financial service API. A Postman collection runs a complete money flow between a system account, an agent, two customers and a merchant, then checks commissions, service fees and error handling. Newman runs the collection and creates an HTML report.

## Tools

- Postman
- Newman
- newman-reporter-htmlextra
- Node.js

## Project structure

```text
Dmoney_newman/
├── Dmoney-flow.postman_collection.json   # Requests and tests
├── report.js                             # Runs the collection and creates the report
├── Report/                               # Generated report is saved here
├── package.json
└── README.md
```

The collection has four folders, which run in this order:

| Folder | Requests | Contents |
|---|---|---|
| `setup` | 11 | Admin login, user registration, activation and system login |
| `Agent` | 7 | Agent login, deposits and deposit negative tests |
| `Customer` | 14 | Customer logins, send money, cashout, merchant payment and negative tests |
| `Merchant` | 3 | Merchant login and a negative login test |

## How to run

### Prerequisites

- Node.js is installed.
- The Dmoney API is running at `http://localhost:5000`.

To use a different address, change the `baseurl` collection variable.

### Run with Newman

```bash
git clone https://github.com/nusratjahan2/Dmoney_newman.git
cd Dmoney_newman
npm install
node report.js
```

The results appear in the terminal, and the HTML report is saved to `Report/report.html`. This file is not stored in Git, so it is created when you run the tests. Each run replaces the previous report.

### Run in Postman

1. Click **Import** and select `Dmoney-flow.postman_collection.json`.
2. Open the collection's **...** menu and choose **Run collection**.
3. Keep the default request order, because each step depends on the one before it.

To send requests one at a time, start with **Admin login**, because it creates the `run_id` used by later requests.

### Running more than once

Each run generates a new `run_id` and adds it to the user details, such as `test-agent-2774547@gmail.com`. This keeps each run's emails and phone numbers unique, so the collection can run repeatedly on the same database. Every run adds 4 new users and their transactions to the database.

## Negative test cases

| Folder | Test | Expected status |
|---|---|---|
| `setup` | Register with an existing email | 208 |
| `Agent` | Deposit below the minimum (5 tk) | 400 |
| `Agent` | Deposit above the maximum (10001 tk) | 400 |
| `Agent` | Deposit to an account that does not exist | 404 |
| `Customer` | Log in with the wrong password | 401 |
| `Customer` | Send money without a token | 401 |
| `Customer` | Cash out from another customer's account | 403 |
| `Customer` | Cash out above the daily limit (50000 tk) | 400 |
| `Customer` | Pay a merchant with insufficient balance | 208 |
| `Customer` | Pay a merchant that does not exist | 404 |
| `Customer` | Pay an account that is not a merchant | 400 |
| `Merchant` | Log in with the wrong password | 401 |

## Test results

Latest run against the local API on 6 November 2026:

| Total requests | Total assertions | Failed tests | Skipped tests |
|---|---|---|---|
| 35 | 39 | 0 | 0 |

Values returned by the API in that run:

| Transaction | Amount | Commission or fee | Balance after transaction |
|---|---|---|---|
| Agent deposit to customer 1 | 2000 tk | 50 tk commission | Agent: 3050 tk |
| Send money | 1000 tk | 5 tk fee | Customer 1: 995 tk |
| Cashout | 500 tk | 5 tk fee | Customer 2: 495 tk |
| Merchant payment | 400 tk | 5 tk fee | Customer 2: 90 tk |

## API Documentation
https://documenter.getpostman.com/view/40420353/2sBYHYtxX1
