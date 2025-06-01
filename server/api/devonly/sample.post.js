export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return { detail: "POST worked", body: body };
});
