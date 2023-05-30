# FrontEnd Portafolio Application
***
## 1. :notebook_with_decorative_cover: General Info
This project is a dynamic website that contains all the relevant profesional information about me, like my laboral experience, the technologies I know, etc and the possibility to edit this information, if you are logged in. Check the Back End repository [here](https://github.com/JulianMeneses1/Portafolio-BackEnd-AP)!

Status: ACTIVE :heavy_check_mark:

## 2. :gear: Technologies/Libraries
***
Here are the technologies and libraries used in this project:
### Technologies
* [Angular](https://angular.io/): Version 15.2.8
* [NodeJS](https://nodejs.org/es): Version 18.16.0
* [npm](https://www.npmjs.com/): Version 9.5.1
* [TypeScript](https://www.typescriptlang.org/): Version: 5.0.4
### Libraries
* [AOS](https://michalsnik.github.io/aos/): Version 2.3.4
* [jQuery](https://jquery.com/): Version 3.6.4
* [FontAwesome](https://fontawesome.com/): Version 0.12.1
* [Bootstrap](https://getbootstrap.com/): Version 5.2.3
## 3. :hammer_and_wrench: Installation
***
First of all you need to install NodeJS, for that go the official page of NodeJS (https://nodejs.org/es) and follow the instructions to install this technologie in your system, which includes npm. 
Then, using npm, you have to install Angular CLI with the next command:
  ```
  npm install -g @angular/cli@latest
  ```
After this you need to install in your proyect the basic libraries with this command:
```
  npm install
 ```

Great, now you only need to install the libraries that are used in this project. Here you have the respective command for each one:

**AOS** 
```
  npm install aos --save
  ```
 And then you have to insert this code into the class AppComponent of your app.component.ts:
 ```
  ngOnInit (): void {
    AOS.init
    }
  ```
**jQuery**
```
  npm install jquery
  ```
 And then you have to add this in the property "scripts" of your angular.json:  
```
  "./node_modules/jquery/dist/jquery.js" 
```
**FontAwesome**
```
  npm install @fortawesome/angular-fontawesome@0.12.x
```
:heavy_check_mark: Now you are ready to run your project locally in an test enviroment with this command:
```
  ng serve
```
:warning: Remember that all the data is loaded from the Back End server, so you need to start the Back End server first to be able to see the data and successfully run the app. For more information visit the back end [repository](https://github.com/JulianMeneses1/Portafolio-BackEnd-AP) 

## 4. :wave: Collaboration
***
Feel free to make any suggestion that you think can help improve the quality of the project! :grinning:



