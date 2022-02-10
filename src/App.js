import React, { useEffect, useState } from 'react';


const App = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
        //getUsersAsync();
    }, []);

    const getUsers = () => {
        /**
         * 
         * @param endpoint string
         * @param configuration object
         */
        /* let data = {
            username: 'lrodriguez',
            password: '123456'
        } */
        fetch("https://jsonplaceholder.typicode.com/userss", {
            method: 'GET', // GET, POST, PUT, DELETE
            //body: JSON.stringify(data), // POST, PUT (only)
            headers: {
                'Content-Type': 'application/json'
            }
        }) // recibimos la respuesta del servidor
            .then((response) => {
                console.log(response.ok);
                if(!response.ok) throw new Error('No esta nada bien!!!');
                return response.json();
            }) // recibimos la data o informacion de la peticion solicitada
            .then((info) => {
                console.log(info);
                setUsers(info);
            })
            .catch((error) => {
                console.log(error);
            })
        console.log("Hola");
    }

    /* async function funcAsync(){

    } */

    const getUsersAsync = async () => { // async, await
        /**
         * 
         * @param endpoint string
         * @param configuration object
         */

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/userss", {
                method: 'GET', // GET, POST, PUT, DELETE
                //body: JSON.stringify(data), // POST, PUT (only)
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok) throw new Error('No esta nada bien!!');

            //console.log(response);

            const info = await response.json();

            //console.log(info);

            setUsers(info);

        } catch (error) {
            console.log(error);
        }

        console.log("Hola");
    }

    return (
        <>
            <h1>App React</h1>
            <ul>
                {
                    users.length > 0 ?
                        users.map((user) => <li key={user.id}>{user.name}</li>) :
                        <li>Listado vacío</li>
                }
            </ul>
        </>

    )
}

export default App;