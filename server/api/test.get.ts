export default defineEventHandler(async (event) => {
    console.log(process.env.TOON)
    return { detail: process.env.TOON };
});
