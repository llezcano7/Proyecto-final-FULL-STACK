import endpoint from '../components/endpoint.json';

export function Tabs({ toogleContent }) {
    return (
        <div className="list-tabs">
            <div className='logo'>
                <img src="logoapi-2.png"alt="Logo principal de Players API" />
            </div>
            {endpoint.map(item => (
                <a onClick={() => toogleContent(item)} className="endpoint">{item.title}<small className="chip">{item.method}</small></a>
            ))
            }

        </div>
    )
}