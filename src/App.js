import React, { useEffect, useState } from 'react';


const App = () => {

    const [url] = useState("https://3001-ljavierrodrigue-fetchapi-3c6k7sgqvaf.ws-us31.gitpod.io")
    const [users, setUsers] = useState([]);

    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            street: "Av Vitacura 2760, Santiago",
            suite: "Apt. 556",
            city: "Santiago",
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496"
            }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
    })

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
        fetch(`${url}/users`, {
            method: 'GET', // GET, POST, PUT, DELETE
            //body: JSON.stringify(data), // POST, PUT (only)
            headers: {
                'Content-Type': 'application/json'
            }
        }) // recibimos la respuesta del servidor
            .then((response) => {
                console.log(response.ok);
                if (!response.ok) throw new Error('No esta nada bien!!!');
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


    const saveUser = () => {
        fetch(`${url}/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    getUsers();
                }
            })
            .catch(error => console.log(error));
    }

    const updateUser = () => {
        fetch(`${url}/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    getUsers();
                }
            })
            .catch(error => console.log(error));
    }

    const deleteUser = (id) => {
        fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if(response.status === 404) setError({ msg: 'Usuario No encontrado!'})
                return response.json()
            })
            .then(data => {
                if(data){
                    getUsers();
                }
            })
            .catch(error => console.log(error));
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
            const response = await fetch(`${url}/users`, {
                method: 'GET', // GET, POST, PUT, DELETE
                //body: JSON.stringify(data), // POST, PUT (only)
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) throw new Error('No esta nada bien!!');

            //console.log(response);

            const info = await response.json();

            //console.log(info);

            setUsers(info);

        } catch (error) {
            console.log(error);
        }

        console.log("Hola");
    }

    const handleChangeUser = (e) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }

    const handleSubmitUser = e => {
        e.preventDefault();

        saveUser();

    }

    const handleSubmitUpdateUser = e => {
        e.preventDefault();

        updateUser();

    }

    return (
        <>
            <h1>App React</h1>
            {
                error !== null && (
                    <h4>Usuario no encontrado!</h4>
                )
            }
            <ul>
                {
                    users.length > 0 ?
                        users.map((user) => <li key={user.id}>{user.name} <button onClick={() => setUser(user)}>Edit</button> <button onClick={() => deleteUser(user.id)}>delete</button></li>) :
                        <li>Listado vacío</li>
                }
            </ul>
           {/*  <button onClick={saveUser}>
                Save User
            </button> */}

            <button onClick={updateUser}>
                Update User
            </button>

            <button onClick={deleteUser}>
                Delete User
            </button>

            <form onSubmit={handleSubmitUser}>
                <input type="text" name="name" id="name" placeholder='Name' onChange={handleChangeUser} value={user.name} />
                <input type="text" name="username" id="username" placeholder='Username' onChange={handleChangeUser} value={user.username} />
                <input type="email" name="email" id="email" placeholder='Email' onChange={handleChangeUser} value={user.email} />
                <button>Enviar Datos</button>
            </form>

            <form onSubmit={handleSubmitUpdateUser}>
                <input type="text" name="name" id="name" placeholder='Name' onChange={handleChangeUser} value={user.name} />
                <input type="text" name="username" id="username" placeholder='Username' onChange={handleChangeUser} value={user.username} />
                <input type="email" name="email" id="email" placeholder='Email' onChange={handleChangeUser} value={user.email} />
                <button>Actualizar Datos</button>
            </form>
        </>

    )
}

export default App;