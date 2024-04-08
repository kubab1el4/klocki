export const getQueryForThemes = (themeId: string | undefined) => {
    const themesArray = themeId?.split("&");
    return themesArray?.map(
        (themeId, i) => `filters[$or][${i}][theme_id][$eq]=${themeId}`
    );
};
