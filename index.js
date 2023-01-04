require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ]
})
var date = new Date();
var day = date.getDay();
var hour = date.getHours();
var minutes = date.getMinutes();

const emojiList = ['🏍️🪚', '😁', '💣', '🩸', '😎', '😤', '💞', '❤️‍🩹', '❤️‍🔥', '💢', '📛', '⚠️', '‼️', '✨', '⁉️', '🔞'];
var lista = ''
var emoji = getRandomEmoji()

// SELECT RANDOM EMOJIS FROM ARRAY
function getRandomEmoji() {
    for (var i = 0; i <= 65; i++) {
        lista += emojiList[Math.floor(Math.random() * emojiList.length)]
    }
    return lista;
}

// ALERT IN 2 DAYWEEK, 13 HOURS 
client.on('ready', () => {
    console.log('o bot está no ar!');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content === "ping") message.channel.send(`O bot está com ping de ${client.ws.ping}ms`);
    if (message.content === "saw" && !(day == 2 && hour > 13)) {
        var faltamdias = 0
        var faltamtexto = ''
        if (day > 2) {
            faltamdias = 7 - (day - 2);
            faltamtexto = `${faltamdias} DIAS`
        } else {
            faltamdias = 2 - day
            faltamtexto = `${faltamdias} DIA`
        }

        message.channel.send(`**PRÓXIMO EPISÓDIO DE CHAINSAW MAN EM ${faltamtexto}**` + emoji + '\n https://i.imgur.com/nCrRSnA.gif')
    } else if ( message.content === "saw"){
        message.channel.send('**O QUE ESTÁ ESPERANDO? JÁ SAIU O NOVO EPISÓDIO DE CHAINSAW MAN**' + emoji + "\n https://i.imgur.com/FfEINSf.mp4")
    }
});
setInterval(async()=>{
    date = new Date();
    day = date.getDay();
    hour = date.getHours();
    minutes= date.getMinutes()
    if (day == 2 && (hour == 13 && minutes == 0)) {
        var Channel = client.channels.cache.get(process.env.CHAT2)
        Channel.send('**HOJE TEM UM NOVO EPISÓDIO DE CHAINSAW MAN**' + emoji + "\n https://i.imgur.com/FfEINSf.mp4 ||@everyone||")
    };
},60000,client);

client.login(process.env.TOKEN);