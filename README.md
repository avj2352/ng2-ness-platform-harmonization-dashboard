# Ng2PlatformHarmonizationDashboard

# Import Static JSON inside Angular

In order to access your file locally in Angular 2+ you must do the following steps:
- Inside your assets folder create a .json file, example: data.json
- Go to your angular.cli.json inside your project and inside the assets array put another object (after the package.json object) like this:
```js
{ "glob": "data.json", "input": "./", "output": "./assets/" }
```
> full example from angular.cli.json
```js
"apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "package.json", "input": "../", "output": "./assets/" },
        { "glob": "data.json", "input": "./", "output": "./assets/" }
      ],
```
> Remember, data.json is just the example file we've previously added in the assets folder (you can name your file whatever you want to)
- Now, try to access your file via localhost. It should be visible within this address, http://localhost:your_port/assets/data.json
- If it's not visible than you've done something incorrectly. Make sure you can access it by typing it in the URL field in your browser before proceeding to step #4.
- Now preform a GET request to retrieve your .json file (you've got your full path .json URL and it should be simple)
```ts
 constructor(private http: HttpClient) {}
        // Make the HTTP request:
        this.http.get('http://localhost:your_port/assets/data.json')
                 .subscribe(data => {
                   console.log(data)
                  });
```