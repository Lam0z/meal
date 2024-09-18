<script setup>
import Loader from "./Loader.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/stores/store";
import { ref } from "vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
const modules = [Navigation, Pagination];

const store = useStore();
const route = useRoute();
const idMeal = route.path.split("/").pop();
const mealIngredients = ref([]);
// const isMeal = ref(Object.keys(store.meal).length);

const getMealIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (!meal[`strIngredient${i}`]) break;
        const ingredient = {};
        ingredient.name = meal[`strIngredient${i}`];
        ingredient.measure = meal[`strMeasure${i}`];

        ingredients.push(ingredient);
    }
    return ingredients;
};
// console.log(getMealIngredients(store.meal));
// console.log(Object.keys(store.meal).length);
store.getMeal(idMeal);
</script>
<template>
    <section class="meal">
        <div class="container">
            <div class="meal__item" v-if="store.meal">
                <img
                    class="meal__item-img"
                    :src="store.meal.strMealThumb"
                    alt=""
                />
                <div class="meal__item-wrap">
                    <div class="meal__item-info meal__name">
                        <p>Name:</p>
                        <p>{{ store.meal.strMeal }}</p>
                    </div>
                    <div class="meal__item-info meal__category">
                        <p>Category:</p>
                        <p>{{ store.meal.strCategory }}</p>
                    </div>
                    <div class="meal__item-info meal__geography">
                        <p>Geography:</p>
                        <p>{{ store.meal.strArea }}</p>
                    </div>
                    <div class="meal__ingredients">
                        <b>Ingredients:</b>
                        <swiper
                            :modules="modules"
                            :slides-per-view="3"
                            :space-between="20"
                            :pagination="{
                                clickable: true,
                            }"
                        >
                            <swiper-slide
                                v-for="(item, key) in getMealIngredients(
                                    store.meal
                                )"
                                :key="key"
                            >
                                <div class="meal__ingredients-wrap">
                                    <img
                                        :src="`https://www.themealdb.com/images/ingredients/${item.name}-Small.png`"
                                        alt=""
                                        class="meal__ingredient-img"
                                    />
                                    <div class="meal__ingretiend-name">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="meal__receipe meal__item-info">
                        <p>Receipe:</p>
                        <p>{{ store.meal.strInstructions }}</p>
                    </div>
                </div>
            </div>
            <template v-else>
                <loader> Meal not found 🤷‍♀️ </loader>
            </template>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.meal {
    display: flex;
    justify-content: center;
    align-items: center;
    &__item {
        display: grid;
        column-gap: 2rem;
        grid-template-columns: 1fr;
        @media (min-width: 992px) {
            grid-template-columns: 1fr 2fr;
        }
    }
    &__item-description {
    }
    &__item-wrap {
        display: grid;
        row-gap: 1rem;
    }
    &__item {
        display: grid;
        row-gap: 1rem;
        @media (min-width: 768px) {
            row-gap: 0;
        }
    }
    &__item-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(13, 110, 253);
        p {
            &:not(:last-child) {
                font-weight: bold;
            }
        }
        &.meal__receipe {
            border: none;
            display: grid;
            p {
            }
        }
    }

    &__item-img {
        grid-row: span 2;
    }

    &__name {
    }

    &__category {
    }

    &__geography {
    }

    &__ingredients {
        flex-direction: column;
        display: flex;
    }
    &__ingredients-wrap {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    &__ingretiend-name {
        display: flex;
        justify-content: center;
        text-align: center;
    }
    .swiper {
        width: 100%;
        flex-grow: 1;
        display: flex;
        max-width: 300px;
        padding-bottom: 2rem;
        @media (min-width: 768px) {
            max-width: 400px;
        }
        @media (min-width: 992px) {
            max-width: 500px;
        }
    }
    .swiper-pagination {
        bottom: 0;
    }
    &__ingredient-img {
        margin: 0 auto;
        max-width: 100px;
    }
}
</style>
