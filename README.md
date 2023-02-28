# UPON CHART

## Run

* Dev

```shell
npm run start-api # first launch mock api
npm run start # navigate to http://localhost:4200/
```

* Staging

```shell
npm run start-staging # first start uponchart-back
```

## eBay

> JDD

```
testuser_vma
HciKVp2k7Yniwcf#
```

## Docker

* Warning : prod build on your local machine

```shell
docker build -t vmagne/uponchartfront .
docker run -d -p 8081:80 vmagne/uponchartfront:latest
```
