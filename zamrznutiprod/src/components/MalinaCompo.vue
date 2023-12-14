<template>
  <div class="malinaCompo">

    <b-jumbotron bg-variant="dark" text-variant="danger" border-variant="dark"
                 header="Ponuda Maline" :lead="'Broj proizvoda: ' + maline.length">

      <b-button  v-b-toggle="'add'">DODAJ MALINU</b-button> |
      <b-button v-b-toggle="'delete'">IZBRISI MALINU</b-button> |
      <b-button v-b-toggle="'update'">AZURIRAJ MALINU</b-button> |
      <b-button v-b-toggle="'search'">PRETRAZI MALINU</b-button>

      <b-collapse  id="add" class="mt-2">
        <b-card>
          <b-container fluid>
            <b-form>
              <b-row class="mt-2">

                <b-col sm="4" offset="2">
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Upisite vrstu maline"></b-input>
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
                  <b-input v-model="idMalina" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Unesite id koji zelite da obrisete"></b-input>
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
                  <b-input v-model="idMalina" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Unesite id koji zelite da azurirate"></b-input>
                </b-col>

                <b-col sm="4" >
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Upisite novu vrstu maline"></b-input>
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
                  <b-input v-model="vrsta" class="mb-2 mr-sm-2 mb-sm-0" @keyup= "searchMet" placeholder="Pretrazite vrstu malinu"></b-input>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-card>
      </b-collapse>


    </b-jumbotron>
    <b-table v-if="maline.length" :items="maline" sticky-header="800px" head-variant="light" />
    <h1 v-else>Nema malina!</h1>

  </div>

</template>

<script>

const Joi = require('joi');
const schemaMalina = Joi.object().keys({
  idMalina: Joi.number().allow(),
  vrsta: Joi.string().max(100).required(),
  cenaPoKg: Joi.number().max(99999).required()

});

export default {
  name: "MalinaCompo",
  props: {

  },

  data() {
    return {
      maline: [],
      idMalina: '',
      vrsta: '',
      cenaPoKg: '',
      malineTMP: []
    }
  },

  mounted: function (){
    fetch(`http://localhost:8080/api/malina`, {

      method: 'get'

    }).then((response) => {
      if (!response.ok)
        throw response;

      return response.json();
    }).then((jsonData) => {
      this.maline= jsonData;
      this.malineTMP = this.maline;
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

    addMet: function () {
      const malina = {vrsta: this.vrsta, cenaPoKg: this.cenaPoKg};
      let {error} = schemaMalina.validate(malina);
      if (error) {
        alert(error.details[0].message);  // Greska zahteva
      } else {
        fetch(`http://localhost:8080/api/malina`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(malina)
        }).then((response) => {
          if (!response.ok)
            throw response;

          return response.json();
        }).then((jsonData) => {
          this.maline.push(jsonData);
          this.vrsta = '';
          this.cenaPoKg = '';
          this.malineTMP = this.maline
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

    deleteMet: function () {
      fetch(`http://localhost:8080/api/malina/delete`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.idMalina})
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        this.maline = []
        this.idMalina = ''
        for (let i = 0; i < jsonData.length; i++) {
          this.maline.push(jsonData[i])

        }
        this.malineTMP = this.maline
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },


    updateMet: function () {
      const malina = {vrsta: this.vrsta, cenaPoKg: this.cenaPoKg, idMalina: this.idMalina};
      let {error} = schemaMalina.validate(malina);
      if (error) {
        alert(error.details[0].message);  // Greska zahteva
      } else {
        fetch(`http://localhost:8080/api/malina/update`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(malina)
        }).then((response) => {
          if (!response.ok)
            throw response;

          return response.json();
        }).then((jsonData) => {
          this.maline = [];
          this.idMalina = '';
          this.vrsta = '';
          this.cenaPoKg = '';
          for (let i = 0; i < jsonData.length; i++) {
            this.maline.push(jsonData[i])

          }
          this.malineTMP = this.maline
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
    searchMet: function (e) {
      let help = []
      if (e.target.value === "") {
        help = this.malineTMP
      } else {
        for (let i = 0; i < this.malineTMP.length; i++) {
          if (this.malineTMP[i].vrsta.includes(e.target.value)) {
            help.push(this.malineTMP[i])
          }
        }
      }
      this.maline = help;
    }


  }
}
</script>

<style scoped>



</style>