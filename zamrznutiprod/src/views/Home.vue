<template>
  <div class="home" id="home">
    <img alt="Logo" id="slika" src="../assets/ZamrznutoVoce.png">
    <h1 >Dobrodosli!</h1>
    <h4>
      Ovo je sajt za prodaju zamrznutih proizvoda!
    </h4>
    <h4>
      Nas cilj je da Vam ponudimo najkvalitetnije proizvode i najprilagodinije cene.
    </h4>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',


  mounted: function () {

  }
}
</script>

<style scoped>

h1{
  color: #b53b4b;

}

h4{
  color: darkslategrey;
}

#slika{
  width:1000px;
  height: 400px;

}


</style>