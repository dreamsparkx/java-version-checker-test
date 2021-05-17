### Java Version Checker

## Prerequisites
1. NodeJS

## RUN
```
npm install
npm run build
npm start {java_version}    example: npm start 8.0
```

As this code uses os.platform function to check, we have created constants file to map the platform version that needs to be sent with the API. So if there is some problem per platform, please check the utils/constants.ts file and add/change the osVersions object keys and values.