export const setCookie = (name, value) => {
    const coopCookie = `${name} = ${value}; max-age=86400;`;
    return (document.cookie = coopCookie);
};

export const getCookie = name => {
    let matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? matches[1] : null;
};

export const deleteCookie = name => {
    return (document.cookie = `${name} = ""; max-age=-1;`);
};
