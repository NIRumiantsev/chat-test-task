# Attention please!

This is my test project that represents simple chat application on stack of 
#### React+MobX+TypeScript

It contains a lot of things to improve also it is not fully covered by tests, but it can give you 
understanding of my development skills. 

#### I hope you will enjoy my app!

## Below I prepared a small instruction for you

### Before you start
You have to create .env file in the project root directory
```bash
cp .env.dist .env
```
In this file you have to put some environment secrets.
In our case, base url is https://assignment.bunq.com/api.
You also have to use your own API token.

### Start application
You can just start with react script
```bash
npm start
```

### Login
For fake login you can use one of usernames from API database with any password.
For example:

#### login: wessel

#### password: 123

After login, your user id automatically saves into local storage, so it is not
required to log in again. If you would like to change current user, you can just click
'log out' button or remove your user id from the local storage.

### Other commands
Create production build:
```bash
npm run build
```
Start application tests:
```bash
npm run test 
```
Prettify code and check code style warnings:
```bash
npm run lint
```


