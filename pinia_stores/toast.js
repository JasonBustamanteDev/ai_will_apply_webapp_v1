export const useCustomToast = defineStore("toast_notifications", () => {
    const toast = useToast();

    function showErrorToast(title, description) {
        toast.add({
            title,
            description: `${description}. Please reload the page and try again.`,
            icon: "memory:alpha-x-fill",
            duration: 10000, // 10 seconds
            color: 'error'
        });
    }

    return {
        showErrorToast,
    };
});
