<template>
  <div class="kupinaCompo">

    <b-jumbotron bg-variant="dark" text-variant="danger" border-variant="dark"
                 header="Ponuda Kupine" :lead="'Broj proizvoda: ' + kupine.length">

      <b-button  v-b-toggle="'add'">DODAJ KUPINU</b-button> |
      <b-button v-b-toggle="'delete'">IZBRISI KUPINU</b-button> |
      <b-button v-b-toggle="'update'">AZURIRAJ KUPINU</b-button> |
      <b-button v-b-toggle="'search'">PRETRAZI KUPINU</b-button>

      <b-collapse  id="add" class="mt-2">
        <b-card>
          <b-container fluid>
            <b-form>
              <b-row class="mt-2">

                <b-col sm="4" offset="2">
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Upisite vrstu kupine"></b-input>
                </b-col>

                <b-col sm="3">
                  <b-input v-model="cenaPoKg" placeholder="Upisite cenu po kg"></b-input>
                </b-col>

                <b-col sm="1">
                  <b-button variant="danger" size="lg" @click="addMet">Save</b-button>
                </b-col>

              </b-row>
            </b-form>
          </b-container>
        </b-card>
      </b-collapse>

      <b-collapse  id="delete" class="mt-2" >
        <b-card >

          <b-container  fluid>
            <b-form >
              <b-row class="mt-2">

                <b-col sm="4" offset="4">
                  <b-input v-model="idKupina" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Unesite id koji zelite da obrisete"></b-input>
                </b-col>
                <b-col sm="1">
                  <b-button variant="danger" size="lg" @click="deleteMet">Delete</b-button>
                </b-col>

              </b-row>
            </b-form>
          </b-container>

        </b-card>
      </b-collapse>

      <b-collapse  id="update" class="mt-2">
        <b-card>
          <b-container fluid>
            <b-form>
              <b-row class="mt-2">

                <b-col sm="3" >
                  <b-input v-model="idKupina" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Unesite id koji zelite da azurirate"></b-input>
                </b-col>

                <b-col sm="4" >
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Upisite novu vrstu kupine"></b-input>
                </b-col>

                <b-col sm="3">
                  <b-input v-model="cenaPoKg" placeholder="Upisite novu cenu po kg"></b-input>
                </b-col>

                <b-col sm="1">
                  <b-button variant="danger" size="lg" @click="updateMet">Update</b-button>
                </b-col>

              </b-row>
            </b-form>
          </b-container>
        </b-card>
      </b-collapse>

      <b-collapse  id="search" class="mt-2">
        <b-card>
          <b-container fluid>
            <b-form>
              <b-row class="mt-2">

                <b-col sm="4" offset="2">
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" @keyup= "searchMet" placeholder="Pretrazite vrstu kupine"></b-input>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-card>
      </b-collapse>


    </b-jumbotron>
    <b-table v-if="kupine.length" :items="kupine" sticky-header="800px" head-variant="light" />
    <h1 v-else>Nema kupina!</h1>

  </div>

</template>


<script>
const Joi = require('joi');
const schemaKupina = Joi.object().keys({
  idKupina: Joi.number().allow(),
  vrsta: Joi.string().max(100).required(),
  cenaPoKg: Joi.number().max(99999).required()
});



export default {
  name: "KupinaCompo",
  props: {

  },

  data() {
    return {

      kupine: [],
      idKupina: '',
      vrsta: '',
      cenaPoKg: '',
      kupineTMP: []
    }
  },


  mounted: function (){
    fetch(`http://localhost:8080/api/kupina`, {

    }).then((response) => {
      if (!response.ok)
        throw response;

      return response.json();
    }).then((jsonData) => {
      this.kupine= jsonData;
      this.kupineTMP = this.kupine;
    }).catch((error) => {
      if (typeof error.text === 'function')
        error.text().then((errorMessage) => {
          alert(errorMessage);
        });
      else
        alert(error);
    });
  },
  methods: {

    addMet: function() {

      const kupina = {vrsta: this.vrsta, cenaPoKg: this.cenaPoKg};
      let {error} = schemaKupina.validate(kupina);
      if (error) {
        alert(error.details[0].message);
      } else {

        fetch(`http://localhost:8080/api/kupina`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(kupina)
        }).then((response) => {
          if (!response.ok)
            throw response;

          return response.json();
        }).then((jsonData) => {
          this.kupine.push(jsonData);
          this.vrsta = '';
          this.cenaPoKg = '';
          this.kupineTMP = this.kupine
        }).catch((error) => {
          if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
              alert(errorMessage);
            });
          else
            alert(error);
        });
      }
    },
    deleteMet: function() {
      fetch(`http://localhost:8080/api/kupina/delete`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.idKupina})
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        this.kupine = []
        this.idKupina = ''
        for (let i = 0; i < jsonData.length; i++) {
          this.kupine.push(jsonData[i])

        }
        this.kupineTMP = this.kupine
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    updateMet: function() {

      const kupina = {vrsta: this.vrsta, cenaPoKg: this.cenaPoKg, idKupina: this.idKupina};
      let {error} = schemaKupina.validate(kupina);
      if (error) {
        alert(error.details[0].message);
      } else {

        fetch(`http://localhost:8080/api/kupina/update`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(kupina)
        }).then((response) => {
          if (!response.ok)
            throw response;

          return response.json();
        }).then((jsonData) => {
          this.kupine = [];
          this.idKupina = '';
          this.vrsta = '';
          this.cenaPoKg = '';
          for (let i = 0; i < jsonData.length; i++) {
            this.kupine.push(jsonData[i])

          }
          this.kupineTMP = this.kupine
        }).catch((error) => {
          if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
              alert(errorMessage);
            });
          else
            alert(error);
        });
      }
    },
    searchMet: function(e) {
      let help = []
      if(e.target.value === ""){
        help = this.kupineTMP
      }else{
        for(let i = 0; i < this.kupineTMP.length; i++){
          if(this.kupineTMP[i].vrsta.includes(e.target.value)){
            help.push(this.kupineTMP[i])
          }
        }
      }
      this.kupine = help;
    }

  }
}
</script>

<style scoped>



</style>