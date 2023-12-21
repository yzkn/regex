// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const getSelectedOptions = el => Array.from(el.selectedOptions, e => e.value);


const test = () => {
    const target = document.getElementById('regexTarget').value;
    const pattern = document.getElementById('regexPattern').value;
    const replacement = document.getElementById('regexReplacement').value;

    if (target && pattern) {
        let regexResult = '';

        const flags = Array.from(document.getElementById('regexFlags').selectedOptions, e => e.value).join('');

        const regex = new RegExp(pattern, flags);
        regexResult += 'regex: ' + regex.toString() + '\n';

        // 軽い
        regex.lastIndex = 0;
        regexResult += 'test: ' + regex.test(target) + '\n';
        regex.lastIndex = 0;
        regexResult += 'search: ' + target.search(regex) + '\n';

        // 重い
        if (flags.includes('g')) {
            regex.lastIndex = 0;
            regexResult += 'exec: [' + '\n';
            while ((execResult = regex.exec(target)) !== null) {
                regexResult += '\t' + execResult[0] + '\t' + '(' + execResult.index + (execResult[0].length == 1 ? '' : '-' + Number(execResult.index + execResult[0].length - 1)) + ')' + '\n';
            }
            regexResult += ']' + '\n';
        }

        regex.lastIndex = 0;
        regexResult += 'match: [' + '\n';
        if (target.match(regex)) {
            Array.from(target.match(regex)).forEach(m => {
                regexResult += '\t' + m + '\n';
            });
        }
        regexResult += ']' + '\n';

        if (flags.includes('g')) {
            regex.lastIndex = 0;
            regexResult += 'matchAll: [' + '\n';
            [...target.matchAll(regex)].forEach(m => {
                regexResult += '\t' + m[0] + '\t' + '(' + m.index + (m[0].length == 1 ? '' : '-' + Number(m.index + m[0].length - 1)) + ')' + '\n';
            });
            regexResult += ']' + '\n';
        }

        regex.lastIndex = 0;
        regexResult += 'replace: ' + target.replace(regex, replacement) + '\n';

        if (flags.includes('g')) {
            regex.lastIndex = 0;
            regexResult += 'replaceAll: ' + target.replaceAll(regex, replacement) + '\n';
        }

        regex.lastIndex = 0;
        regexResult += 'split: [' + '\n';
        Array.from(target.split(regex)).forEach(m => {
            regexResult += '\t' + m + '\n';
        });
        regexResult += ']' + '\n';

        regex.lastIndex = 0;
        document.getElementById('regexResult').value = regexResult;
    } else {
        document.getElementById('regexResult').value = '';
    }
};

window.addEventListener('DOMContentLoaded', _ => {
    document.getElementById('regexFlags').addEventListener('change', _ => test());
    document.getElementById('regexPattern').addEventListener('change', _ => test());
    document.getElementById('regexReplacement').addEventListener('change', _ => test());
    document.getElementById('regexTarget').addEventListener('change', _ => test());
    document.getElementById('regexTest').addEventListener('click', _ => test());
});
