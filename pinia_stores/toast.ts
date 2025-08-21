export const useCustomToast = defineStore("toast_notifications", () => {
    const toast = useToast();

    function showErrorToast(
        title: string,
        description: string,
        reloadText = false
    ) {
        toast.add({
            title,
            description:
                description + (reloadText ? ` ${ERROR_MESSAGES.RELOAD}` : ""),
            icon: "memory:alpha-x-fill",
            duration: 10000, // 10 seconds
            color: "error",
        });
    }
    function showSuccessToast(title: string, description: string) {
        toast.add({
            title,
            description,
            icon: "material-symbols:check-circle-rounded",
            duration: 5000, // 5 seconds
            color: "success",
        });
    }

    return {
        showErrorToast,
        showSuccessToast,
    };
});
