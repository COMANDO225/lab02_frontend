import { Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';

const AuthTemplate = ({children, titulo}) => {

    const { pathname } = useLocation();

    return (
        <div className="auth_page">
            <div className="auth_box">
                <div className="login_form">
                    <Text fontSize="xl" css={{
                        textAlign: "center"
                    }} fontWeight="bold" mb="4">
                        {titulo}
                    </Text>
                    {children}
                    <Link
                        to={pathname === '/login' ? '/register' : '/login'}
                    >
                        <Text
                            fontSize="sm"
                            css={{
                                textAlign: "center"
                            }}
                            mt="4"
                            color={'blue.500'}
                        >
                            {
                                pathname === '/login' ? '¿No tienes cuenta? Registrate causa!' : '¿Ya tienes cuenta papi?'
                            }
                        </Text>
                    </Link>
                </div>
            </div>
        </div>
    );
}

AuthTemplate.defaultProps = {
    titulo: "Inicia sesión"
}

export default AuthTemplate