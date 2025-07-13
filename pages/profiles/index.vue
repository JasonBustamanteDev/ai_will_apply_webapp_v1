<script setup>
import AddProfileSvg from "~/ui/svgs/addProfile.vue";
import ProfileCard from "~/ui/profiles/shared/profileCard.vue";

const createNewProfile = () => {};
const editProfile = () => {};
const deleteProfile = () => {};
</script>

<template>
    <SharedPageContainerWithNavbar>
        <!-- DaisyUI components used for the cards -->
        <div
            @click="createNewProfile"
            class="cursor-pointer card bg-base-100 w-60 shadow-sm"
        >
            <div class="card-body items-center text-center">
                <div class="w-[40px] mx-auto mb-6">
                    <AddProfileSvg />
                </div>
                <h2 class="card-title">Create New Profile</h2>
                <p>Upload resume then enter your information</p>
            </div>
        </div>

        <ProfileCard
            profileName="Canadian Resume"
            lastModifiedDate="2024-09-08"
            @editCallback="editProfile"
            @deleteCallback="deleteProfile"
        />
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss"></style>
