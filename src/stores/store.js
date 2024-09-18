import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

import {
    API_INGREDIENTS,
    API_INGREDIENT,
    API_MEAL,
} from "@/constants/constants";

export const useStore = defineStore("store", () => {
    const ingredients = ref([]);
    const ingredient = ref("");
    const meals = ref([]);
    const meal = ref(JSON.parse(localStorage.getItem("meal")) || null);
    const isLoading = ref(false);
    const title = ref("Choose your ingredient");

    const dynamicTitle = computed(() => {
        if (meals.value.length && ingredient.value) {
            title.value = `Meal with ingredient - ${ingredient.value}`;
        } else {
            title.value = "Choose your ingredient";
        }
        return title.value;
    });

    watch(meal, (state) => {
        localStorage.setItem("meal", JSON.stringify(state));
    });

    const getIngredients = async () => {
        const r = await fetch(API_INGREDIENTS);
        const data = await r.json();
        ingredients.value = data.meals;
    };
    const getMeals = async (ingName) => {
        isLoading.value = true;
        const r = await fetch(`${API_INGREDIENT}${ingredient.value}`);
        const data = await r.json();
        meals.value = data.meals;
        isLoading.value = false;
    };
    const getMeal = async (idMeal) => {
        const r = await fetch(`${API_MEAL}${idMeal}`);
        const data = await r.json();
        if (data.meals) {
            meal.value = data.meals[0];
        } else {
            meal.value = null;
        }
    };

    return {
        ingredients,
        ingredient,
        meals,
        meal,
        isLoading,
        dynamicTitle,
        getMeals,
        getIngredients,

        getMeal,
    };
});
