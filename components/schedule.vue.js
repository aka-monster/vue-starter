var scheduleComponent = Vue.component("Schedule", {
  template: `<div>
  <div class="row gy-2">
    <h4>User input (forms)</h4>
    <p>
    The idea of this demo is to gather some info to book a service, with two mandatory fields and one optional value.<br>
    The code will convert that into a JSON object (JavaScript Object Notation / format for data exchange) then send it to a backend/API (to be implemented later on)
    </p>
  </div>

    <form class="row g-3" @submit.prevent="submit">
      <div class="input-group mb-3">
      <label class="input-group-text" for="optionsId"> {{ $t("page.schedule.options") }} </label>
      <select class="form-select" required v-model="optionSelected" id="optionsId">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      </div>
      
      <div class="mb-3">
        <label for="numericOptionId" class="form-label">Number</label>
        <input type="number" required v-model="numericOption" min="1" max="5" class="form-control" id="numericOptionId" >
      </div>

      <div class="mb-3">
        <label for="stringOptionId" class="form-label">Text</label>
        <input type="text" v-model="stringOption" class="form-control" id="stringOptionId" >
      </div>

      <button type="submit" class="btn btn-primary">{{ $t("page.schedule.submit") }}</button>
    </form>

    <div class="row gy-2">
      <div class="alert alert-success" role="alert" v-if="requestOK">
        <strong>{{requestResponse}}</strong>
      </div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="requestError">
        <strong>{{requestResponse}}</strong>
      </div>
    </div>

    </div>
    `,
  data() {
    return {
      optionSelected: null,
      options: [
        { text: "Basic", value: 0 },
        { text: "Premium", value: 1 },
        { text: "Ultimate", value: 2 },
      ],
      numericOption: null,
      stringOption: null,

      requestOK: false,
      requestError: false,
      requestResponse: null,
    };
  },
  methods: {
    async submit() {
      this.requestOK = false;
      this.requestError = false;
      var json = JSON.stringify({
        option: this.optionSelected,
        number: this.numericOption,
        text: this.stringOption,
      });

      // TODO wire up a proper endpoint/API
      axios
        .post("/BACKEND_API.SOMEWHERE/book", json)
        .then((response) => {
          this.requestResponse = response;
          this.requestOK = true;
        })
        .catch((error) => {
          this.requestResponse = error;
          this.requestError = true;
        });
    },
  },
});
