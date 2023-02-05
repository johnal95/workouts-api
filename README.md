# Workouts API

![Build](https://github.com/JohnAL95/workouts-api/actions/workflows/build.yml/badge.svg)
![Known Vulnerabilities](https://snyk.io/test/github/JohnAL95/workouts-api/badge.svg)
![GitHub Issues Open](https://img.shields.io/github/issues/JohnAL95/workouts-api.svg?maxAge=2592000)

## Running API locally

1. Create a `.env` file following the template in `.env.example`. Replacing any of the example values where appropriate. e.g.:

```
AWS_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION = us-east-1
```

2. Run docker compose, starting up a local DynamoDB image with an in-memory database. (This step requires a local `docker` installation)

```bash
docker compose up
```

3. Install dependencies.

```bash
npm install
```

4. Run server in development mode.

```bash
npm run dev
```

## Running tests locally

1. Complete the first 3 steps in the section above.

2. Run either of the following test scripts:

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## API documentation

The API specification can be consulted by accessing the URL below while running the project locally.

```bash
http://localhost:$PORT/api/docs
```
