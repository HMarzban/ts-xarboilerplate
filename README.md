## TypeScript starter status

This is the TypeScript continuation of [xarboilerplate](https://github.com/HMarzban/xarboilerplate) and the canonical overview of this starter family. It preserves an earlier API architecture and its tests. The original service requirements still apply; use the setup and test commands below to assess compatibility before adopting it.

<p>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://camo.githubusercontent.com/e192698c11f7faf47a6587a45741926b04e6b5a4/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6d616b652d636f7665726167652d62616467652e737667" alt="License" data-canonical-src="https://img.shields.io/npm/l/make-coverage-badge.svg" style="max-width:100%;"></a>

<a href="https://github.com/sheerun/prettier-standard">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>
<a href="https://github.com/sheerun/prettier-standard" rel="nofollow"><img src="https://camo.githubusercontent.com/58fbab8bb63d069c1e4fb3fa37c2899c38ffcd18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d7374616e646172642d627269676874677265656e2e737667" alt="Standard - JavaScript Style Guide" data-canonical-src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" style="max-width:100%;"></a>


<img src="./coverage/badge-lines.svg" alt="Coverage lines" data-canonical-src="./coverage/badge-lines.svg" style="max-width:100%;">

<img src="./coverage/badge-functions.svg" alt="Coverage functions" data-canonical-src="./coverage/badge-functions.svg" style="max-width:100%;">


<img src="./coverage/badge-branches.svg" alt="Coverage branches" data-canonical-src="./coverage/badge-branches.svg" style="max-width:100%;">

<img src="./coverage/badge-statements.svg" alt="Coverage statements" data-canonical-src="./coverage/badge-statements.svg" style="max-width:100%;">
</p>

# xarboilerplate
NodeJs Expressjs boilerplate 

> cloned from [xarboilerplate](https://github.com/HMarzban/xarboilerplate)

# scripts
```bash
yarn build              # tsc --project ./tsconfig.json,
yarn start              # node ./dist/index.js,
yarn dev                # nodemon ./src/index.ts,
yarn test:e2e           # npm run build & jest -c ./jest.config.e2e.js --testTimeout=20000,
yarn test:e2e:coverage  # npm run build & jest -c ./jest.config.e2e.js --coverage,
yarn test:intg          # jest \\.intg.test.js$ --testTimeout=20000,
yarn test:badges        # npm run test:e2e:coverage & jest-coverage-badges,
yarn lint               # prettier-standard --lint **/*.ts,
yarn pretty             # prettier --write **/*.ts

```

## Heavily Inspired and Used These Methods

Try to use these best practices:

 - [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
 - [javascript testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices/)

 Feel free to fork it and/or contribute if you’d like :)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Environment and verification

The original manifests use Mongoose 5 and Jest 26. This documentation pass does not claim compatibility with every current Node.js release. Install the committed Yarn dependency set in a compatible environment:

```sh
npx --yes yarn@1.22.22 install --frozen-lockfile
```

Configuration is loaded by `dotenv-flow`. The tracked `.env` files are examples; supply your own local values through the environment or a local override. Relevant keys are `MONGODB_URL`, `PORT`, `JWT_TOKEN`, `PHONE_CODE_SALT`, and `SALTROUNDS`. Keep local overrides out of commits.

For the application, include a development database name:

```sh
npm run build
MONGODB_URL=mongodb://127.0.0.1:27017/xarboilerplate_dev npm start
```

For tests, use a disposable local MongoDB instance and a **database-free** connection URL. Each E2E suite appends a generated database name; a URL that already ends in a database name will be invalid. The helpers clear collections and drop their generated database. Keep this instance separate from data you need to preserve.

```sh
MONGODB_URL=mongodb://127.0.0.1:27017 npm run test:e2e
MONGODB_URL=mongodb://127.0.0.1:27017 npm run test:intg
```

The E2E commands wait for compilation to succeed before starting Jest. Coverage badges also wait for the coverage run. The existing suites have not been rerun as part of this documentation and command-ordering change.

## Design scope

Route/component code is separate from shared middleware and the MongoDB data source. The integration and E2E tests exercise that original architecture. Choose the TypeScript continuation for a single overview of the family; keep the JavaScript repository as a record of the earlier implementation.
