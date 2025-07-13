<script setup>
import AddProfileSvg from "~/ui/svgs/addProfile.vue";
import ProfileCard from "~/ui/profiles/shared/profileCard.vue";

const createNewProfile = () => {};
const editProfile = () => {};
const deleteProfile = () => {};
</script>

<template>
    <!-- DaisyUI components used for the cards -->
    <SharedPageContainerWithNavbar>
        <section class="card-container">
            <div
                @click="createNewProfile"
                class="cursor-pointer card bg-base-100 w-60 shadow-sm"
            >
                <div class="card-body items-center text-center">
                    <div class="w-[40px] mx-auto mb-3">
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
        </section>
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss">
.card-container {
    display: grid;
    grid-template-columns: 0.8fr 1fr 1fr 1fr;
    grid-template-rows: 200px;
    gap: 1rem;
}
</style>
