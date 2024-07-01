const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowPrecios = addKeyword(['1', 'precios']).addAnswer(
    ['Hola, gracias por comunicarte con nosotros. Los precios son: desde $67 y $55.']
);

const flowTienda = addKeyword(['2', 'tienda']).addAnswer(
    ['Hola, gracias por comunicarte con Exportación Luna. Nos ubicamos en Perú, Arequipa, Av. Inti 167.', 'Pagina Web: https://frutasluna.com']
);

const flowEnvios = addKeyword(['3', 'envios']).addAnswer(
    ['Hola, gracias por comunicarte con nosotros. Realizamos los envíos mediante transporte.']
);

const flowVideos = addKeyword(['4', 'videos']).addAnswer(
    [
        'Hola, gracias por comunicarte con nosotros.',
        'Aquí tienes videos de nuestra elaboración y cargas de mercancía:',
        'https://www.youtube.com/shorts/OtHgx1Fv9Ko?feature=share'
    ],
    
    { media: 'https://www.dropbox.com/scl/fi/8jkmqceqw7o0svdr6tpf0/export.mp4?rlkey=knz4b67ko95jpvwmy6v5epyzn&st=vhgk3180&raw=1' } // Enlace directo del video en Dropbox
);

const flowContacto = addKeyword(['5', 'contacto']).addAnswer(
    ['Hola, si deseas comunicarte con nosotros, llama al número 966348458.']
);

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌🏻 ¡Hola!🖐️ Bienvenid@ a exportación de frutas. ¿Listo para mejorar tu negocio?', { media: 'https://i.imgur.com/I5fng2P.png' })
    .addAnswer(
        [
            'Somos una empresa que exporta varias variedades de frutas a todo el país.',
            '¿En qué puedo ayudarte hoy?'
        ]
    )
    .addAnswer(
        [
            'Le brindamos nuestras opciones principales:',
            'Marque 1 si desea saber más información sobre los precios.',
            'Marque 2 si desea conocer nuestra tienda.',
            'Marque 3 si desea saber cómo hacemos envíos.',
            'Marque 4 si desea videos sobre nuestra elaboración y carga de mercancía.',
            'Marque 5 si desea que le llamemos.'
        ],
        null,
        {
            buttons: [
                { text: '1. Consultar precios', action: '1' },
                { text: '2. Conocer nuestra tienda', action: '2' },
                { text: '3. Información sobre envíos', action: '3' },
                { text: '4. Videos sobre nuestra elaboración y carga de mercancía', action: '4' },
                { text: '5. Comunicarse con la empresa en estos momentos', action: '5' }
            ]
        }
    );

const main = async () => {
    try {
        const adapterDB = new MockAdapter();
        const adapterFlow = createFlow([
            flowPrincipal,
            flowPrecios,
            flowTienda,
            flowEnvios,
            flowVideos,
            flowContacto
        ]);
        const adapterProvider = createProvider(BaileysProvider);

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        QRPortalWeb();
    } catch (error) {
        console.error('Error initializing bot:', error);
    }
};

// Manejo de errores global
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

main();
