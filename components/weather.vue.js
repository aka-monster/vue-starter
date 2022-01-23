var weatherComponent = Vue.component("Weather", {
  template: `<div class="container">
        <div class="row gy-2">
            <h4>Using an external service to get weather/forecast info for Auckland</h4>
            <p>
            The demo uses a free, external API (Application Programming Interface = interface to get/transfer data between applications), 
            see <a href="https://github.com/Yeqzids/7timer-issues/wiki/Wiki">Github</a> for more details<br>
            The code converts that information into a chart and a table
            </p>
        </div>
        <div class="row gy-2">
            <canvas id="chart"></canvas>
        </div>        
        <div class="row gy-2">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">Wind</th>
                    <th scope="col">Cloud cover</th>
                    <th scope="col">Rain</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in weather">
                    <td>{{item.time}}</td>
                    <td>{{item.temp}}</td>
                    <td>{{item.humidity}}</td>
                    <td>{{item.wind}}</td>
                    <td>{{item.cloudcover}}</td>
                    <td>{{item.rain}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>`,
  data() {
    return {
      weather: [],
    };
  },
  methods: {
    toHumidity(code) {
      if (code >= 16) return "100%";
      if (code < -4) return "0%";
      var start = 5 + (code + 4);
      return start + "% - " + (start + 5) + "%";
    },
    toCloudCover(code) {
      // approx
      if (code <= 1) return "0% - 6%";
      if (code <= 2) return "6% - 19%";
      if (code == 8) return "81% - 94%";
      if (code >= 9) return "94% - 100%";
      var start = 6 + 13 * (code - 2);
      return start + "% - " + (start + 12) + "%";
    },
    toWind(speed) {
      if (speed <= 1) return "calm";
      if (speed == 2) return "light";
      if (speed == 3) return "moderate";
      if (speed == 4) return "fresh";
      if (speed == 5) return "strong";
      if (speed == 6) return "gale";
      if (speed == 7) return "storm";
      if (speed == 8) return "hurricane";
      if (speed >= 9) return "hurricane+";
    },
    async getData() {
      const api =
        "https://www.7timer.info/bin/astro.php?lon=174.77&lat=-36.86&ac=0&unit=metric&output=json&tzshift=-1";
      axios.get(api).then((response) => {
        var temperature = [];
        var labels = [];
        var items = response.data.dataseries;
        var previous = null;
        var initial = moment.utc(response.data.init, "YYYYMMDDhh");

        var weather = [];
        for (var i = 0; i < items.length; i++) {
          var date = moment(initial).local().add(items[i].timepoint, "hours");
          var label = date.format("DD MMM");
          if (label != previous) labels.push(date.format("DD MMM, hA"));
          else labels.push(date.format("hA"));

          temperature.push(items[i].temp2m);
          previous = label;
          weather.push({
            time: date.format("DD MMM, hA"),
            temp: items[i].temp2m,
            humidity: this.toHumidity(items[i].rh2m),
            wind:
              items[i].wind10m.direction +
              " " +
              this.toWind(items[i].wind10m.speed),
            cloudcover: this.toCloudCover(items[i].cloudcover),
            rain: items[i].prec_type,
          });
        }
        this.weather = weather;

        const config = {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Temperature C",
                data: temperature,
                backgroundColor: "#f4a261",
                borderColor: "#f4a261",
                borderWidth: 3,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
              },
            },
          },
        };

        _ = new Chart(document.getElementById("chart"), config);
      });
    },
  },
  async mounted() {
    await this.getData();
  },
});
