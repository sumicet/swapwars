export const stringToFixed = (str: string, fixed: number) => {
    const match = str.match(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);

    if (!match) {
        return '';
    }

    return match[0];
};
