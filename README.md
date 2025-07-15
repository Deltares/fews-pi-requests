# fews-pi-requests

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run Unit tests
```
npm run test
```

### Run End-to-End tests
For e2e tests a docker container with a Delft-FEWS Web Service is required.
Make sure the docker container is running with the correct date and time.

The docker container can be run with: 

docker run --pull=always -p 8080:8080 -e FAKETIME="2025-03-14 10:00:00" -e JAVA_OPTS="-Xms512m -Xmx4068m -DTEST_PAGE_ENABLED=true"  delftfewsregistry.azurecr.io/deltares/delft-fews-web-oc/202502/web-oc-web-services:latest

```
npm run e2e
```

