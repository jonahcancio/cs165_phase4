import Vue from 'vue'
import VueRouter from 'vue-router'

// import pages
import PokemonPage from "@/pages/pokemon_page"


// use vue router
Vue.use(VueRouter)

// configure vue router
const router = new VueRouter({
  routes: [
    {
      path: "/pokemon",
      name: "pokemon",
      component: PokemonPage
    }
  ]
})

export default router;