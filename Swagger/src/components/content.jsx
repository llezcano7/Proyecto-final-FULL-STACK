import { useEffect, useState } from 'react';

export function Content({ content }) {

    const [response, setResponse] = useState('');

    const Test = async () => {
        const data = await fetch(content.endpoint, { method: content.method })
        const result = await data.json();

        setResponse(JSON.stringify(result, null, 4))
    }

    useEffect(() => {
        setResponse ('');
    }, [content.endpoint]);

    return (
        <div className="endpoint-list">
            <h3>{content.title}</h3>
            <span>{content.endpoint} <small className="chip">{content.method}</small> </span>
            <button onClick={Test} className="btn">Test</button>
            <pre className="response">
                {response}
            </pre>
        </div>

    )
}