import { Button, Input, Stack, Text } from "@chakra-ui/react";
import AuthTemplate from "../templates/AuthTemplate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        nombre: '',
        correo: '',
        password: '',
        confPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, correo, password, confPassword } = user;
        if (nombre === '' || correo === '' || password === '' || confPassword === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            const res = await axios.post('http://localhost:8000/user/', user);
            console.log(res);
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.mensaje);
            }
        }
    }

    

    return (
        <AuthTemplate
            titulo="Registrate papu"
        >
            <form
                onSubmit={handleSubmit}
            >
                <Stack spacing={3}>
                    {error && <Text color="red.500">{error}</Text>}
                    <Input type={'text'} required placeholder="Nombre" 
                        name="nombre"
                        value={user.nombre}
                        onChange={handleChange}
                    />
                    <Input type={'email'} required placeholder="Correo electrónico" 
                        name="correo"
                        value={user.correo}
                        onChange={handleChange}
                    />
                    <Input type={'password'} required placeholder="Contraseña" 
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Input type={'password'} required placeholder="Confirmar contraseña" 
                        name="confPassword"
                        value={user.confPassword}
                        onChange={handleChange}
                    />
                    <Button type={'submit'} colorScheme="blue" size="lg" w="100%">
                        Registrarse
                    </Button>
                </Stack>
            </form>
        </AuthTemplate>
    );
}

export default RegisterPage;