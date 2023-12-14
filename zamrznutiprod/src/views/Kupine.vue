<template>
  <div class="Kupine">
    <b-container>
      <b-row>
        <b-col cm="6">
          <KupinaCompo v-if="kupine.length" :kupine="kupine"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import KupinaCompo from "@/components/KupinaCompo";

export  default {
  name: 'Kupine',
  components: {
    KupinaCompo
  },
  data() {
    return {
      kupine: []
    }
  },
  mounted: function (){
    fetch("http://localhost:8080/api/kupina", { method: 'get' }).then((resp) => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    }).then((jsonData) => {
      this.kupine = jsonData;
    }).catch((err) => {
      if(typeof err.text === 'function')
        err.text().then((kup) => {
          alert(kup);
        });
      else
        alert(err)
    })
  }
}
</script>

<style scoped>

</style>