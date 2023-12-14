<template>
  <div id="app">
    <div id="nav" align="right" >
      <router-link to="/">Home</router-link> |
      <router-link to="/maline">Maline</router-link> |
      <router-link to="/kupine">Kupine</router-link>
    </div>


    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: lightgray;
  width: 100%;
  min-height: 100vh;

}

#nav {
  padding: 30px;
  color: #b53b4b;
  padding-right: 200px;
  background: #696969;
  max-height: 50px;

}

#nav a {
  padding: 5px;
  font-weight: bold;
  color: lightgray;
  position: center;

}

#nav a.router-link-exact-active {
  color: #b53b4b;
}
</style>
