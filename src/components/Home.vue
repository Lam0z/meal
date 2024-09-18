<script setup>
import { ref, computed } from "vue";
import { useStore } from "@/stores/store";
const store = useStore();

store.getIngredients();
const getMeals = () => store.getMeals();
</script>
<template>
    <section>
        <div class="container">
            <div class="main-title text-center">{{ store.dynamicTitle }}</div>

            <select
                v-model="store.ingredient"
                @change="getMeals"
                class="form-select mb-3"
            >
                <option value="" disabled selected>Ingredients</option>
                <option
                    v-for="(item, idx) in store.ingredients"
                    :value="item.strIngredient"
                    :key="idx"
                >
                    {{ item.strIngredient }}
                </option>
            </select>
            <template v-if="store.meals.length">
                <div class="meals">
                    <div
                        class="meals__item"
                        v-for="(item, idx) in store.meals"
                        :key="item.id"
                    >
                        <RouterLink
                            :to="`/meal/${item.idMeal}`"
                            class="meals__item-link"
                        >
                            <img
                                :src="item.strMealThumb"
                                :alt="item.strMeal"
                                class="meals__item-img"
                            />
                        </RouterLink>
                        <div class="meals__item-name">{{ item.strMeal }}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="loader" v-if="store.isLoading">
                    <div
                        class="spinner-border text-primary"
                        role="status"
                    ></div>
                </div>
            </template>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.meals {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    // grid-auto-rows: 10rem;
    gap: 1rem;
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    &__item {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    &__item-link {
        flex-grow: 1;
        display: flex;
    }
    &__item-img {
        // max-width: 200px;
        // margin: 0 auto;
        // flex-grow: 1;
    }

    &__item-name {
        margin-top: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
