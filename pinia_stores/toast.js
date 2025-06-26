export const useCustomToast = defineStore("toast_notifications", () => {
    const toast = useToast();

    function showToast(title, description) {
        toast.add({
            title,
            description,
        });
    }

    return {
        showToast,
    };
});
