<script setup>
import AddProfileSvg from "~/ui/svgs/addProfile.vue";

const createNewProfile = () => {
console.log('gf')
}
</script>

<template>
    <SharedPageContainerWithNavbar>
        <!-- DaisyUI component -->
        <div @click="createNewProfile" class="cursor-pointer card bg-base-100 w-60 shadow-sm">
            <div class="card-body items-center text-center">
                <div class="w-[40px] mx-auto mb-6">
                    <AddProfileSvg />
                </div>
                <h2 class="card-title">Create New Profile</h2>
                <p>Upload resume then enter your information</p>
            </div>
        </div>
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss"></style>
