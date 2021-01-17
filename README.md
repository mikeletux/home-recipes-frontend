# home-recipes-frontend

Example frontend for the home-recipes Rest API.  

To build the docker container:  
~~~
docker build -t home-recipes-frontend .
~~~

To run the docker image:
~~~
docker run -dit --name home-recipes-frontend -p 8081:80 -e "HOME_RECIPES_API=http://localhost:8080"  home-recipes-frontend
~~~

Envoronment variables:
  - HOME_RECIPES_API: Tells the frontend where the Rest API is.

/Miguel Sama 2021
