<script setup>
import { useStore } from "@/stores/store";
const store = useStore();

store.getIngredients();
</script>
<template>
    <section>
        <div class="container">
            <div>MAIN</div>

            <select v-model="store.ingredient">
                <option disabled selected>Choose your ingredient</option>
                <option
                    v-for="(item, idx) in store.ingredients"
                    :value="item.strIngredient"
                    :key="idx"
                >
                    {{ item.strIngredient }}
                </option>
            </select>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
