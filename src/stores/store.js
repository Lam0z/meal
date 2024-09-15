import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { API_INGREDIENTS } from "@/constants/constants";

export const useStore = defineStore("store", () => {
    const ingredients = ref([]);
    const ingredient = ref("");
    // const doubleCount = computed(() => count.value * 2);

    const getIngredients = async () => {
        const r = await fetch(API_INGREDIENTS);
        const data = await r.json();
        ingredients.value = data.meals;
    };

    return { ingredients, ingredient, getIngredients };
});
