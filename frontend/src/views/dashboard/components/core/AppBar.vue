<template>
  <div id="app">
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-4" color="#283593" dark v-bind="attrs" v-on="on">
            퀀트 용어 사전
          </v-btn>
        </template>
        <div style="background-color: #0c154a; width: 800px; height: 600px">
          <v-row>
            <v-col style="margin-left: 15px">
              <v-autocomplete
                v-model="searchModel"
                :items="items"
                :search-input.sync="search"
                hide-no-data
                hide-selected
                item-text="name"
                dark
                placeholder="종목 입력"
                prepend-icon="mdi-magnify"
                return-object
                style="width: 100%"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-card
                color="#192DA1"
                class="py-2"
                style="width: 90%; margin-top: 3px"
                dark
              >
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-menu> -->

      <v-spacer />
      <v-autocomplete
        v-model="searchModel"
        :items="items"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        item-text="name"
        dark
        placeholder="종목 입력"
        prepend-icon="mdi-magnify"
        return-object
      ></v-autocomplete>
      <!-- <div class="mx-3" /> -->

      <!-- login -->
      <v-btn
        v-if="!this.isLoggedIn"
        class="ml-2"
        min-width="0"
        text
        @click="login"
        dark
      >
        login
      </v-btn>

      <!-- profile -->
      <v-btn
        v-if="this.isLoggedIn"
        class="ml-2"
        min-width="0"
        text
        @click="login"
        dark
      >
        profile
      </v-btn>

      <!-- logout -->
      <v-btn
        v-if="this.isLoggedIn"
        class="ml-2"
        min-width="0"
        text
        @click="logout2"
        dark
      >
        logout
      </v-btn>
    </v-app-bar>
    <login-form :dialog="dialog" @closeForm="dialog = false" />
  </div>
</template>

<script>
import LoginForm from "@/components/base/LoginForm.vue";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCoreAppBar",
  components: {
    LoginForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      login_profile: "login",
      searchModel: "",
      search: "",
    };
  },
  created() {},
  computed: {
    ...mapState(["drawer", "company"]),
    ...mapGetters(["isLoggedIn"]),
    items() {
      return this.company.map((entry) => {
        const Description =
          entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + "..."
            : entry.name;

        return Object.assign({}, entry);
      });
    },
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    login() {
      if (this.isLoggedIn) {
        this.$router.push("/home/pages/user");
        this.login_profile = "profile";
      } else {
        this.dialog = true;
      }
    },
    ...mapActions(["logout"]),
    logout2() {
      if (this.isLoggedIn) {
        this.logout();
        this.login_profile = "login";
        this.$router.push("/home");
      }
    },
  },
  watch: {
    searchModel(value) {
      if (typeof value == "object") {
        this.$router.push({ name: "Chart", params: { code: value.code } });
      }
    },
  },
};
</script>
