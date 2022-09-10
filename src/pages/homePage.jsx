import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Button, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import { useState, useEffect, useRef } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
} from '@chakra-ui/react'
import PhoneIcon from '../components/icons/PhoneIcon';
import UserIcon from '../components/icons/UserIcon';
import MailIcon from '../components/icons/MailIcon';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { useAtom } from 'jotai';
// import { userTokenAtom } from '../atoms/userTokenAtom';

const URI = 'http://localhost:8000/agenda';

const HomePage = () => {

    // estado de los contactos masna
    const [contactos, setContactos] = useState([]);
    // estado de la busaqueda
    const [search, setSearch] = useState("");
    // estado de los resultados de la busqueda
    const [searchResults, setSearchResults] = useState([]);
    // estado del drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    // referencia del drawer button open
    const btnRef = useRef()
    // estado de crear un nuevo contacto
    const [newContact, setNewContact] = useState({
        nombre: "",
        celular: "",
        correo: ""
    });
    
    const [ userToken, setUserToken ] = useState('');
    const [ user, setUser ] = useState({
        nombre: '',
        correo: ''
    });
    const navigate = useNavigate();

    // si el token no existe, redirigir a login y si existe obtener los datos del usuario
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const decoded = jwt_decode(token);
            setUser({
                nombre: decoded.nombre,
                correo: decoded.correo
            });
            getContactos();
        }
    }, []);


    const getContactos = async() => {
        try {
            const res = await axios.get(URI);
            setContactos(res.data);
            setSearchResults(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const results = contactos.filter( contacto => {
            return contacto.nombre.toLowerCase().includes(search.toLowerCase());
        } )

        setSearchResults(results);
    }, [search])

    const columnas = [
        {
            name: 'Nombre',
            selector: (row) => row.nombre,
            sortable: true
        },
        {
            name: 'Celular',
            selector: (row) => row.celular,
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => row.correo,
            sortable: true,

            
        },
        {
            name: 'Fecha de Creación',
            selector: (row) => row.createdAt,
            right: true
        },
        {
            name: 'Fecha de Actualización',
            selector: (row) => row.updatedAt,
            right: true
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='actions'>
                    <Button size={'sm'} colorScheme='yellow'
                        onClick={() => {
                            setNewContact(row);
                            onOpen();
                        }}
                    >Editar</Button>
                    <Button size={'sm'} css={{margin: '0 .5rem'}} colorScheme='red' onClick={() => deleteContact(row.id)}>Eliminar</Button>
                </div>
            )
        }
    ]

    const createContact = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(URI, newContact);
            console.log(res.data);
            getContactos();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContact = async(id) => {
        try {
            await axios.delete(`${URI}/${id}`);
            getContactos();
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${URI}/${newContact.id}`, newContact);
            console.log(res.data);
            getContactos();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    // acciones drawer
    const openDrawer = () => {
        setNewContact({
            nombre: "",
            celular: "",
            correo: ""
        });
        onOpen();
    }


    return (
        <>
            <Navbar 
                user={user}
            />
            <Text style={{textAlign: 'center', padding: '2.5rem 0 1.5rem 0'}} fontWeight={"bold"} fontSize={"3xl"}>LAB02 - Soluciones en la nube</Text>
            <div className='main' style={{padding: '.5rem 0 .5rem 0', borderRadius: '.25rem'}}>
                <DataTable
                    columns={columnas}
                    data={searchResults}
                    title={'Contactos'}
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                    paginationComponentOptions={
                        {
                            rowsPerPageText: 'Filas por páginas masna',
                            rangeSeparatorText: 'de',
                        }
                    }
                    actions={
                        <>
                            <Input size={'sm'} 
                                css={{marginRight: '4px', maxWidth: '180px'}} 
                                placeholder='Buscar' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button 
                                size={'sm'} 
                                colorScheme='green'
                                ref={btnRef}
                                onClick={openDrawer}
                            >Agregar</Button>
                        </>
                    }
                />
            </div>


            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    {/* <DrawerCloseButton /> */}
                    <DrawerHeader>
                        <Text css={{textAlign: 'center'}} fontWeight={"bold"} fontSize={"2xl"}>
                            {
                                newContact.id ? 'Editar Contacto' : 'Agregar Contacto'
                            }
                        </Text>
                    </DrawerHeader>
                    <form
                        onSubmit={
                            newContact.id ? updateContact : createContact
                        }
                        className='form'
                    >
                        <DrawerBody>
                            <Stack spacing={3}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<UserIcon fill='#CBD5E0' />}
                                    />
                                    <Input type={'text'} placeholder="Ejemplo: 'Kakaroto'"
                                        value={newContact.nombre}
                                        onChange={(e) => setNewContact({...newContact, nombre: e.target.value})}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<PhoneIcon fill='#CBD5E0' />}
                                    />
                                    <Input type={'tel'} placeholder="Ejemplo: '999888777'"
                                        required
                                        value={newContact.celular}
                                        onChange={(e) => setNewContact({...newContact, celular: e.target.value})}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<MailIcon fill='#CBD5E0' />}
                                    />
                                    <Input type={'email'} placeholder="Ejemplo: 'tubbcito123@gmail.com'"
                                        required
                                        value={newContact.correo}
                                        onChange={(e) => setNewContact({...newContact, correo: e.target.value})}
                                    />
                                </InputGroup>
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancelar
                            </Button>
                            {
                                newContact.id ? (
                                    <Button colorScheme="yellow" type={'submit'}>Actualizar</Button>
                                ) : (
                                    <Button colorScheme="blue" type={'submit'}>Agregar</Button>
                                )
                            }
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default HomePage;