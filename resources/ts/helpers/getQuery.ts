export const getQuery = (key: string, id: string | undefined) => {
    const themesArray = id?.split("&");
    return themesArray
        ?.map((themeId, i) => `filters[$or][${i}][${key}][$eq]=${themeId}`)
        .join("&");
};
