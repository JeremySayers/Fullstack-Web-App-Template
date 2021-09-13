import React from 'react';

export interface Instance {
    id: number;
    awsId: string;
    name: string;
    state: string;
}

const App: React.FC = () => {

    return (
        <div className='text-center'>
            <h1>Home</h1>
        </div>
    );
}

export default App;