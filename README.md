Todo application using ionic v4 angular v7 and firebase as our backend server.


<img width="850" src="https://github.com/narendrasinghrathore/todo_app_ionic/blob/master/desktop-calendar-snap.PNG" />

<img  width="900" src="https://github.com/narendrasinghrathore/todo_app_ionic/blob/master/desktop-calendar-snap-mobile-performance-audit.PNG"/>

<img  width="900" src="https://github.com/narendrasinghrathore/todo_app_ionic/blob/master/desktop-calendar-snap-desktop-performance-audit.PNG"/>

<img width="250" src="https://github.com/narendrasinghrathore/todo_app_ionic/blob/master/theme-update.gif"/>
<img width="250" src="https://github.com/narendrasinghrathore/todo_app_ionic/blob/master/gif.gif" />



demo  here: https://gifs.com/gif/yo9GZP

We have heavliy used lazy loading technique which in result for a android or 
ios app will not be helpful as it's a package we will deliver.
But will be helpful if same app is used as web app which definitely if a better approach
for Hybrid app ( write once and run anywhere ).

This application manages it's state using own implementation of Rxjs BehaviorSubject in our custom app store.
We are using firebase realtime database for storing all our json data.

We divide components in two categories
1) Stateful - components that manage internal state
2) Stateless - components that don't have internal state

Application contains: 
1) Shared module that contains our stateless components
2) Core module that contain our basic functionality like show modal/dialog
3) Auth module
4) Firebase module that contains CRUD operational service and
user related api to store and retrieve user data
5) Guard module to validate user is logged in and if not then to redirect to login page




We have currently 
1) Home component which display all data at once
2) Profile component that store information of user
3) About component, nothing much
4) Register component
5) Login component

New Feature:
Theme update, you can manually update the theme of your choice from given list of themes. ✔






