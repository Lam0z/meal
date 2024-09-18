<script setup></script>
<template>
    <div class="loader">
        <div class="spinner-border text-primary" role="status">
            <!-- <span class="sr-only">Loading...</span> -->
        </div>
        <div class="loader__message"><slot /></div>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    display: grid;
    justify-items: center;
    align-items: center;
    row-gap: 1rem;
}
</style>
