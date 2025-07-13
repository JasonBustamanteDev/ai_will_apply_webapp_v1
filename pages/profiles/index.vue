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
                class="cursor-pointer card bg-base-100 w-full shadow-sm"
            >
                <div class="create-new-card text-center">
                    <div class="w-[40px] mx-auto mb-3">
                        <AddProfileSvg />
                    </div>
                    <h2 class="card-title text-lg">Create New Profile</h2>
                    <p class="text-sm">Enter your information then use the profile when applying for jobs</p>
                </div>
            </div>

            <ProfileCard
                :profileName="'Canadian Resume'"
                :lastModifiedDate="'2024-09-08'"
                :completionFraction="'2/9'"
                :isReady="false"
                @editCallback="editProfile"
                @deleteCallback="deleteProfile"
            />
            <ProfileCard
                :profileName="'American Resume'"
                :lastModifiedDate="'2024-09-08'"
                :completionFraction="'2/9'"
                :isReady="true"
                @editCallback="editProfile"
                @deleteCallback="deleteProfile"
            />
            <ProfileCard
                :profileName="'European Resume Lamda Seven Nine hhhhhhhhhhhhhhhhhhhhhhhhh'"
                :lastModifiedDate="'2024-09-08'"
                :completionFraction="'2/9'"
                :isReady="true"
                @editCallback="editProfile"
                @deleteCallback="deleteProfile"
            />
        </section>
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss">
.create-new-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100%;
    padding: 24px;

}
.card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 240px;
    gap: 1rem;
}
</style>
