Sbo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## SSO

## Core libraries
* React
* Next-js
* MUI & concrete-ui
* TailwindCss
* React-Query
* Jest
* Prop Types
* ESLint
* Keycloak
* React Testing Library

## Running
To start development server:

```bash
yarn install
copy  .env.local.example .env.local 
yarn run dev
```

## Production
This project has a canary for promoting to Production. Before promoting check that the canary has built and there are enough healthy instances in Nomad.

## Architecture
The app is built using a Model View ViewModel pattern following a SOC principle in which business logic is handled by models.

```
sb-light-1
├── components
├── core
├── hooks
├── middlewares
├── modules
├── pages
├── styles
└── utils
```

### Authentication
For authentication SSO credentials are required and handled with [Next.js Auth].

### Data fetching
For fetching remote data, this project uses [Axios](https://github.com/axios/axios) + [React-Query](https://github.com/TanStack/query) as for fetching and data management.

All endpoints paths are located inside `/utils/constants.ts`

### Testing
For testing [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/).

### Renovate
[renovate](https://docs.renovatebot.com) is already pre-configured, do not forget to keep the `renovate.json` file up to date. To enable it on your project invite `@svc_renovate_bot` with the developer role.
