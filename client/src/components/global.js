//GLOBAL COMPONENTS
import Vue from "vue";

//UI Components
import ShadowHover from "@/components/shadow_hover";
Vue.component("shadow-hover", ShadowHover);

//Card Components
import PokemonCard from "@/components/cards/pokemon_card";
import PokemonDetailsCard from "@/components/cards/pokemon_details_card";
import PokemonStatsCard from "@/components/cards/pokemon_stats_card";
import PokemonNameCard from "@/components/cards/pokemon_name_card";
import PokemonMoveCard from "@/components/cards/pokemon_moves_card";

Vue.component("pokemon-card", PokemonCard);
Vue.component("pokemon-details-card", PokemonDetailsCard);
Vue.component("pokemon-stats-card", PokemonStatsCard);
Vue.component("pokemon-name-card", PokemonNameCard);
Vue.component("pokemon-moves-card", PokemonMoveCard);

// Modal Components
import PokemonModal from "@/components/modals/pokemon_modal";
import DeleteModal from "@/components/modals/delete_modal";
import ItemModal from "@/components/modals/item_modal";
import DetailsModal from "@/components/modals/details_modal";
import AbilityModal from "@/components/modals/ability_modal";
import MoveModal from "@/components/modals/move_modal"
import StatsModal from "@/components/modals/stats_modal"

Vue.component("pokemon-modal", PokemonModal);
Vue.component("delete-modal", DeleteModal);
Vue.component("item-modal", ItemModal);
Vue.component("details-modal", DetailsModal);
Vue.component("ability-modal", AbilityModal);
Vue.component("move-modal", MoveModal);
Vue.component("stats-modal", StatsModal);
