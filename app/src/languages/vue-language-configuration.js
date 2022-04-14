export const conf = {
    comments: {
        // symbol used for single line comment. Remove this entry if your language does not support line comments
        lineComment: '//',
        // symbols used for start and end a block comment. Remove this entry if your language does not support block comments
        blockComment: ['/*', '*/'],
    },
    // symbols used as brackets
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    // symbols that are auto closed when typing
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
        { open: '`', close: '`', notIn: ['string', 'comment'] },
        { open: '/**', close: ' */', notIn: ['string'] },
    ],
    // symbols that that can be used to surround a selection
    surroundingPairs: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
        ['"', '"'],
        ["'", "'"],
        ['`', '`'],
    ],
    folding: {
        markers: {
            start: '^<(template|style|script)[^>]*>',
            end: '^</(template|style|script)>',
        },
    },
};
