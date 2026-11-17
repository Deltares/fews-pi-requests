# fews-pi-requests

## Project setup

```
npm install
```

### Compiles and minifies for production

```
npm run build
```

### Check formatting, lint and types

```
npm run check
```

### Format files

```
npm run format
```

### Run unit tests

```
npm run test:unit
```

### Run End-to-End tests

For e2e tests a docker container with a Delft-FEWS Web Service is required.
Make sure the docker container is running with the correct date and time.

The docker container can be run with:

docker run --pull=always -p 8080:8080 -e FAKETIME="2025-03-14 10:00:00" -e JAVA_OPTS="-Xms512m -Xmx4068m -DTEST_PAGE_ENABLED=true" delftfewsregistry.azurecr.io/deltares/delft-fews-web-oc/202502/web-oc-web-services:latest

```
npm run test:e2e
```
