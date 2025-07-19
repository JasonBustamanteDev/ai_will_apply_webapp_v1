export const useCustomToast = defineStore("toast_notifications", () => {
    const toast = useToast();

    function showErrorToast(title, description, reloadText = false) {
        toast.add({
            title,
            description:
                description + (reloadText ? ` ${ERROR_MESSAGES.RELOAD}` : ""),
            icon: "memory:alpha-x-fill",
            duration: 10000, // 10 seconds
            color: "error",
        });
    }

    return {
        showErrorToast,
    };
});
