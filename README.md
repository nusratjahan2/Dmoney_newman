# Dmoney API Testing with Postman and Newman

API test automation for Dmoney, a mobile financial service API. A Postman collection runs a complete money flow between a system account, an agent, two customers and a merchant, then checks commissions, service fees and error handling. Newman runs the collection and creates an HTML report.

**Postman collection:** [Dmoney-flow.postman_collection.json](Dmoney-flow.postman_collection.json)

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

## Test results

Latest run against the local API on 6 November 2026:

| Total requests | Total assertions | Failed tests | Skipped tests |
|---|---|---|---|
| 35 | 39 | 0 | 0 |

Values returned by the API in that run:

## API Documentation
https://documenter.getpostman.com/view/40420353/2sBYHYtxX1

## Attachment
<img width="700" height="792" alt="Screenshot 2026-11-06 231610" src="https://github.com/user-attachments/assets/2e019df3-fb8c-4e86-89b9-28c768ffe8e2" />
<img width="700" height="555" alt="Screenshot 2026-11-06 231822" src="https://github.com/user-attachments/assets/a35dd496-c540-412c-8091-835faa9e6bb0" />


