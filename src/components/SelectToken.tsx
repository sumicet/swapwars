import { Select } from "./Select";

interface Options {
    label: string;
    value: string;
}

const options: Options[] = [
    {
        label: 'GROGU',
        value: 'GROGU',
    },
    {
        label: 'MANDO',
        value: 'MANDO',
    },
    {
        label: 'JAWA',
        value: 'JAWA',
    },
];

export function SelectToken() {
    return <Select options={options} isSearchable={false} hideSelectedOptions />
}