<template>
  <div class="home">
    <h1>Donor Match</h1>
    <div class="map">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :center="center" :zoom="zoom">
        <MglMarker
          v-for="marker in filteredMarkers"
          :key="marker._id"
          :coordinates="marker.coordinates"
          color="blue"
        >
          <MglPopup>
            <div class="marker">
              <p>{{marker.username}}</p>
              <p>{{marker.phone}}</p>
              <p>{{marker.bloodgroup}}</p>
              <input type="button" value="Request" @click="message(marker)" />
            </div>
          </MglPopup>
        </MglMarker>
      </MglMap>
      <!-- <AzureMap :center="[-80.3819977, 25.7542671]" :zoom="12" /> -->
    </div>
    <p>
      <select v-model="bloodgroup">
        <option value="all">All</option>
        <option v-for="option in options" :key="option">{{option}}</option>
      </select>
    </p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

//@ts-ignore
import Mapbox from "mapbox-gl";
//@ts-ignore
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";

@Component({
  components: {
    HelloWorld,
    MglMap,
    MglMarker,
    MglPopup
  }
})
export default class Home extends Vue {
  accessToken =
    "pk.eyJ1IjoiY2hyaXN3b29kbGUiLCJhIjoiY2swdWd4b2ozMGpxazNubDF6NjY1ejQycyJ9.VA_6-7orjR_yof3bse3XiQ";
  mapStyle = "mapbox://styles/mapbox/streets-v11";
  center = [-80.3819977, 25.7542671];
  zoom = 9;
  markers: any[] = [];
  bloodgroup = "all";

  options = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

  get filteredMarkers() {
    if (this.bloodgroup == "all") return this.markers;
    const markers = this.markers.filter(marker => {
      return marker.bloodgroup == this.bloodgroup;
    });
    return markers;
  }
  mounted() {
    console.log("mounted");
    axios.get("http://localhost:3005/users", {}).then(response => {
      console.log(response);
      (response as any).data.items.forEach((e: any) => {
        e.coordinates = [e.lastlong, e.lastlat];
        this.markers.push(e);
      });
    });
  }

  message(marker: any) {
    axios
      .post("http://localhost:3005/message", {
        message:
          "A request for a blood donation of your type has been requested.",
        number: marker.phone
      })
      .then(response => {
        console.log(response);
        (response as any).data.items.forEach((e: any) => {
          e.coordinates = [e.lastlong, e.lastlat];
          this.markers.push(e);
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 300px;
}

/deep/ .mgl-map-wrapper .mapboxgl-map {
  border-radius: 20px;
}
</style>