# Error Codes

Before start for the first time, run:
```
npm install
gulp migrate:up
```

To start the server, run:
```
gulp
```

To migrate production db, run:
```
host=$host user=$user project=ofa-backend-template env=production target=Prod command=migrate-product bash devops.sh
```

To deploy to production, run:
```
host=$host user=$user project=ofa-backend-template env=production target=Prod command=deploy-product bash devops.sh
```
