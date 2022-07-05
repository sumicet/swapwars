const transitionTimingFunction = {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const transitionDuration = {
    // 'ultra-fast': '0.05s',
    // faster: '0.1s',
    fast: '0.15s',
    // normal: '0.2s',
    // slow: '0.3s',
    // slower: '0.4s',
    // 'ultra-slow': '0.5',
};

export const transition = {
    easing: transitionTimingFunction,
    duration: transitionDuration,
};
