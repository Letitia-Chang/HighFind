import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        //  an abort controller can stop a fetch when needed
        const abortCont = new AbortController();

        //  Simulate time fetching data
        // setTimeout(() => {
        fetch(url, { signal: abortCont.signal })  // associate the abort controller with this fetch request
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                // console.log(data)
                setData(data);
                setIsPending(false);
                setError(null)
            })
            .catch(err => {
                // To avoid the abort controller throwing error onto the console
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err);
                    setIsPending(false);
                    setError(err.message);
                }
            })
        // })

        // when the component that uses 'useFetch' is unmounted, this below will be returned
        return () => abortCont.abort();
    }, [url]) // whenever url changes, function gets fired

    return { data, isPending, error };
}

export default useFetch;