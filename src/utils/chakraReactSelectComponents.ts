import { chakraComponents } from 'chakra-react-select';
import lowerFirst from 'lodash/lowerFirst';

/**
 * Returns the all the `components` that can be styles with `chakra-react-select`
 */
export const chakraReactSelectComponents = Object.keys(chakraComponents)
    .map(name => lowerFirst(name))
    .concat(['container']); // `container` isn't included in the list so we need to add it manually
