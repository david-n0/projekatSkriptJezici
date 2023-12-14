<template>
  <div class="Maline">

    <b-container>
      <b-row>
        <b-col cm="6">
          <MalinaCompo v-if="maline.length" :maline="maline"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MalinaCompo from "@/components/MalinaCompo";

export  default {
  name: 'Maline',
  components: {
    MalinaCompo
  },
  data() {
    return {
      maline: []
    }
  },
  mounted: function (){
    fetch("http://localhost:8080/api/malina", { method: 'get' }).then((resp) => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    }).then((jsonData) => {
      this.maline = jsonData;
    }).catch((err) => {
      if(typeof err.text === 'function')
        err.text().then((mal) => {
          alert(mal);
        });
      else
        alert(err)
    })
  }
}
</script>

<style scoped>

</style>