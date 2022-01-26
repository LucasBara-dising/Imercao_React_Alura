import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react from 'react';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = react.useState("");
    const [ListaDeMensagem, setListaDeMensagem] = React.useState([]);

    function handerEnviaMensagem(novaMensagem) {
        //objeto mensagem
        const mensagem = {
            //id vai ser o numero da mensagem
            id: ListaDeMensagem.length + 1,
            //quem enviou
            de: 'LucasBara-dising',
            //mensagem em si
            textoMens: novaMensagem,
        }
        //abre array do lista de mensagem e adiciona a mensagem
        setListaDeMensagem([
            mensagem, ...ListaDeMensagem,
        ]);
        setMensagem('');
    }
    // ./Sua lógica vai aqui
    return (
        // fundo
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[200],
                backgroundImage: 'url(https://i2.wp.com/files.123freevectors.com/wp-content/original/113336-royal-blue-blurred-background-vector.jpg?w=800&q=95)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* map--- mapeia o array */}
                    {/* {ListaDeMensagem.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de} : {mensagemAtual.textoMens}
                            </li>
                        )
                    })} */}
                    <MessageList mensagens={ListaDeMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            //=> igual a function, uma versão enchuta
                            onChange={(event) => {
                                const mens = event.target.value;
                                setMensagem(mens);
                            }}
                            onKeyPress={(event) => {
                                console.log(event);
                                //ação feita quando clica no enter
                                if (event.key === 'Enter') {
                                    //tira a funcionalidade da tecla, usamos para tira a função pular linha do enter
                                    event.preventDefault();

                                    handerEnviaMensagem(mensagem);

                                }

                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                height: '45px',
                                fontSize: '17px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '12px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            onClick={(event => {
                                handerEnviaMensagem(mensagem);
                            })}
                            type='button'
                            label='Enviar'
                            styleSheet={{
                                width: '20%',
                                height: '41px',
                                border: '0',
                                borderRadius: '5px',
                                padding: '12px 8px',
                                marginRight: '12px',
                                marginBottom: '6px',
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.textoMens}
                    </Text>
                )
            })}
        </Box>
    )
}