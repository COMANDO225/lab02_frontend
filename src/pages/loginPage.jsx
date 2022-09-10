import { Button, Input, Stack, Text } from '@chakra-ui/react'
import AuthTemplate from '../templates/AuthTemplate';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        correo: '',
        password: ''
    });

    const [mensaje , setMensaje] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setMensaje('');
    };

    const handleSubmit = async(e) => {
        // evitemos caracteres raros con regex
        e.preventDefault();
        const { correo, password } = user;
        if (correo === '' || password === '') {
            setMensaje('Todos los campos son obligatorios');
            return;
        }
        try {
            const res = await axios.post('https://lab02-express-jwt-rest.herokuapp.com/user/login', user);
            console.log(res);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMensaje(error.response.data.mensaje);
            }
        }
    }

    return (
        <AuthTemplate
            titulo="Inicia sesión mi king"
        >
            <form
                onSubmit={handleSubmit}
            >
                <Stack spacing={3}>
                    <Input type={'email'} placeholder="Correo electrónico" 
                        name="correo"
                        value={user.correo}
                        onChange={handleChange}
                        />
                    <Input type={'password'} placeholder="Contraseña" 
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        />
                    {mensaje && <Text color="red.500">{mensaje}</Text>}
                    <Button type={'submit'} colorScheme="blue" size="lg" w="100%">
                        Iniciar sesión
                    </Button>
                </Stack>
            </form>
        </AuthTemplate>
    );
}

export default LoginPage;