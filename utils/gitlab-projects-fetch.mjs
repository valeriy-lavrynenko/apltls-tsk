import fetch from 'node-fetch';

(async function () {
    const token = 'glpat-4KKNPfkaHGJqYy2L6e-C';

    let res = [];

    let intialUrl = 'https://gitlab.com/api/v4/projects?' + new URLSearchParams(
        {
            pagination: 'keyset',
            per_page: 50,
            order_by: 'id',
            sort: 'asc'
        }
    );

    for(let i = 0, nextUrl = intialUrl; i < 10 && nextUrl; i++) {
        const response = await fetch(nextUrl, {
            headers: {
                'PRIVATE-TOKEN': token
            }
        });
        const body = await response.json();
        res = res.concat(body);
        nextUrl = /<(.*)>/.exec(response.headers.get('link'))?.[1];
    }
    const verification = new Set(res.map(({id}) => id));
    console.log(`Verification - Fetched projects:${res.length} Unique ones:${verification.size}`);
    console.log(res.map(({id, name}) => ({id, name})));
})()