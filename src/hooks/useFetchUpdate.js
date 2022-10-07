import { useState, useEffect } from 'react';

const useFetchUpdate = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    // const [error, setError] = useState(null)
    const updateData = (params) => setData(params);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                // setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err);
                    setIsPending(false);
                    // setError(err.message);
                }
            })

        return () => abortCont.abort();
    }, [url, isPending])

    // return { data, isPending, error, updateData, setIsPending };
    return { data, isPending, updateData, setIsPending };
}

export default useFetchUpdate;