//=========( Inicio )=============\\
require("./datab/armazenamento/env/info.js")
const { 
default: makeWASocket,
MessageType, 
Presence,
MessageOptions, 
downloadContentFromMessage,
fetchLatestBaileysVersion,
Mimetype,
useMultiFileAuthState,
DisconnectReason,
Browsers,
delay
} = require("baileys")
const fs = require("fs-extra")
const P = require("pino") 
const path = require("path") 
const fetch = require("node-fetch")
const chalk = require("chalk")
const inquirer = require("inquirer")
const { color } = require("./datab/lib/cores")
const { banner, getBuffer, getExtension, getRandom, convertSticker } = require("./datab/lib/funções")
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
const speed = require("performance-now")
const yts = require("yt-search")
const dbdir = 's0viet'
const _ = require("lodash")
const axios = require("axios")
const cron = require('node-cron');
const ffmpeg = require("fluent-ffmpeg");
const sharp = require('sharp');
const { sendVideoAsSticker, sendImageAsSticker } = require("./datab/armazenamento/sticker/rename.js");
const { sendVideoAsSticker2, sendImageAsSticker2, sendVideoAsSticker3, sendVideoAsSticker4 } = require("./datab/armazenamento/sticker/rename2.js");
const { menu, menu_fig, menu_dono, menu_down, menu_adm, menumontagens, termos, infodono, pesquisas, ia, menu18, economia, menulogo, menubn } = require('./datab/menus/menus/menus.js');
var { fundo1, fundo2, imgnazista, imggay, imgcorno, imggostosa, imggostoso, imgfeio, imgvesgo, imgbebado, imggado, matarcmd, beijocmd, chutecmd, tapacmd, rnkgay, rnkgado, rnkcorno, rnkgostoso, rnkgostosa, rnknazista, rnkotaku, rnkpau } = require("./datab/links.json");
const { image } = require("./datab/lib/hercai.js");
const Api = require("./datab/lib/req.js");
var countMessage = JSON.parse(fs.readFileSync("./datab/armazenamento/grupos/countmsg.json"))
var reqapi = new Api("gst17199");
const { exec, spawn, execSync } = require("child_process");
const webp_mp4 = require("./datab/lib/webp_mp4.js");
const { ttp, attp } = require("./datab/armazenamento/sticker/ttp.js");


//=========( Definições )=============\\
numeroDono = configurações.numeroDono

//=========( Medidas)=============\\
const girastamp = speed()
const latensi = speed() - girastamp

//=========( Dono)=============\\
const vcard = "BEGIN:VCARD\n"
+ "VERSION:1.0\n" 
+ "FN:gst\n"
+ "ORG:Dallas Company;\n" 
+ "TEL;type=CELL;type=VOICE;waid=558981385908:+55 12 98226-3218\n" 
+ "END:VCARD"

async function dall() {

//=========( Conexão )=============\\
const { state, saveCreds } = await useMultiFileAuthState("./datab/qr-code")
console.log(banner.string)
const conn = makeWASocket({
 logger: P({ level: "silent" }),
 mobile: false,
 browser: ["chrome (linux)"],
 auth: state
})

//=========( Nova conexão )=============\\
if (conn.user == null) {
let resposta = await inquirer.prompt([{ type: "input", name: "numero", message: "Digite seu número: \nEx: 5599999999999\n-->" }])
let codigo = await conn.requestPairingCode(resposta.numero)
console.log(`Seu código de conexão é: ${chalk.bold(codigo)}`)
}

//=========( ChatUpdate )=============\\
conn.ev.on("creds.update", saveCreds)
conn.ev.on("messages.upsert", async ({ messages }) => {
try {
const info = messages[0]
if (!info.message) return 
await conn.readMessages([info.key.id])
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

//=========( Body )=============\\
var body = info.message?.conversation || 
info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || 
 info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || 
 info.message?.imageMessage?.caption || 
 info.message?.videoMessage?.caption || 
 info.message?.extendedTextMessage?.text || 
 info.message?.viewOnceMessage?.message?.videoMessage?.caption || 
 info.message?.viewOnceMessage?.message?.imageMessage?.caption || 
 info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || 
 info.message?.buttonsMessage?.imageMessage?.caption || 
 info.message?.buttonsResponseMessage?.selectedButtonId || 
 info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || 
 info.message?.templateButtonReplyMessage?.selectedId || 
 info?.text || 
 (info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ? 
JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson)?.id : "") || "";
var budy = info?.message?.conversation || info?.message?.extendedTextMessage?.text || '';
var prefixes = ["/", ".", "#", "$", "&", "!"];
var receivedPrefix = prefixes.find(p => String(body)?.trim()?.startsWith(p));
var prefixo = receivedPrefix || prefixes[0];
const args = body.trim().split(/ +/).splice(1)
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).split(/ +/).shift().toLowerCase() : null
var Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || "";
bidy =body.toLowerCase()
var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType);
let buffer = Buffer.from([]);  
for await (let chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
} 
const tempFilePath = path.join('./tmp', `${Date.now()}.jpg`);
fs.writeFileSync(tempFilePath, buffer);
if (!fs.existsSync(tempFilePath)) {
throw new Error('Erro ao salvar o arquivo temporário.');
} 
return tempFilePath;
}

const ffmpegPath = require('ffmpeg-static'); // Caminho do ffmpeg estático

//=========( const )=============\\
const isGroup = from.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const rawSender = isGroup ? info.key?.participant : info.key?.remoteJid;
const sender = rawSender || from || '';
const testat = bidy
const pushname = info.pushName ? info.pushName : ""
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? _.map(_.filter(groupMembers, "admin"), "id"): ""
const q = args.join(" ")
const argss = body.split(/ +/g);
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const numeroBot = conn.user.id.split(":")[0] + "@s.whatsapp.net"
const isBot = info.key.fromMe
const isOwner = sender.includes(numeroDono)
const isSocio = sender.includes(`5527992646966`)
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const enviar = (texto) => {
conn.sendMessage(from, { text: texto }, {quoted: info}) }
const enviar2 = (texto) => {
conn.sendMessage(from, { text: texto }) }
const adivinha = info.key.id.length > 21 ? 'Android ツ' : info.key.id.substring(0, 2) == '3A' ? 'IPhone ｯ' : 'WhatsApp web シ';

//=========( deletar file)=============\\
function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}


	const SNET = "@s.whatsapp.net";

//=========(isQuoted/consts)=============\\
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isImage2 = type === 'imageMessage' || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage;
const isVideo2 = type === 'videoMessage' || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage;              
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')
const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

//=========(Grupos)=============\\
const fs = require('fs');
const dirGroupGlobal = './datab/armazenamento/grupos.json';

const data_IDGP = [{
  name: groupName,
  groupId: from,
  tipoGrupo: 'free',
  tempoAluguelRestante: new Date().getTime() + (2 * 60 * 60 * 1000),
  limiteComandos: 10,
  limiteUsuarios: {},
  usuariosBloqueados: {},
  packname: null,
  author: null,
  botStatus: { active: true },
  antilinkhard: { enabled: false, action: 'delete' },
  advertencias: { users: {}, warningLimit: 3 },
  comandosBloqueados: [],
  antiflood: { enabled: false, messageLimit: 10, timeLimit: 30000, action: 'ban_delete' },
  floodUsers: {},
  palavrasProibidas: { enabled: false, words: [], action: 'delete' },
  msglongas: { enabled: false, quantidade: 1500, action: 'delete' },
  antiImagem: { enabled: false, action: 'delete' },
  antiVideo: { enabled: false, action: 'delete' },
  antiAudio: { enabled: false, action: 'delete' },
  antiSticker: { enabled: false, action: 'delete' },
  antiDoc: { enabled: false, action: 'delete' },
  antiContato: { enabled: false, action: 'delete' },
  antiLocalizacao: { enabled: false, action: 'delete' },
  antiCatalogo: { enabled: false, action: 'delete' },
  autosticker: false,
  horarios: { abertura: null, fechamento: null, jaAbriuHoje: false, jaFechouHoje: false },
  nomes: { packname: null, author: null },
  modos: { brincadeiras: false, pesquisas: false, downloads: false, economia: false, menu18: false }
}];

// Cria arquivo global se não existir
if (!fs.existsSync(dirGroupGlobal)) {
  fs.writeFileSync(dirGroupGlobal, JSON.stringify({}, null, 2));
}

// Lê todos os grupos
let allGroups = JSON.parse(fs.readFileSync(dirGroupGlobal));

// Cria grupo se não existir
if (isGroup && !allGroups[from]) {
  allGroups[from] = data_IDGP;
  fs.writeFileSync(dirGroupGlobal, JSON.stringify(allGroups, null, 2));
}

// Lê o grupo atual
let dataGp;
try {
  dataGp = isGroup ? allGroups[from] : undefined;
} catch (e) {
  allGroups[from] = data_IDGP;
  fs.writeFileSync(dirGroupGlobal, JSON.stringify(allGroups, null, 2));
  dataGp = allGroups[from];
}

// Função para atualizar os dados do grupo
function setGp(dataGpAtualizado) {
  allGroups[from] = dataGpAtualizado;
  fs.writeFileSync(dirGroupGlobal, JSON.stringify(allGroups, null, 2));
}


//=========( Gerenciamento gp )=============\\
const isAntiFlood = isGroup ? dataGp[0].antiflood.enabled : undefined;
const floodLimit = isGroup ? dataGp[0].antiflood.quantidade : 10; // Quantidade de mensagens permitidas
const floodAction = isGroup ? dataGp[0].antiflood.action : 'warn_delete'; // Ação ao exceder limite
const floodInterval = isGroup ? dataGp[0].antiflood.intervalo : 60 * 1000; // Intervalo em milissegundos (1 minuto)
const isAntiLinkHard = isGroup ? dataGp[0].antilinkhard.enabled : undefined;
const antiLinkAction = isGroup ? dataGp[0].antilinkhard.action : undefined;
const isLimitec = isGroup ? dataGp[0].msglongas.quantidade : undefined;
const isMsgLongasEnabled = isGroup ? dataGp[0].msglongas.enabled : undefined;
const msgLongasAction = isGroup ? dataGp[0].msglongas.action : undefined;
const ADVT = isGroup ? dataGp[0].advertencias.users : undefined;
const usuariosBloqueados = isGroup ? dataGp[0].usuariosBloqueados : undefined;
const limiteAdv = isGroup ? dataGp[0].advertencias.warningLimit : undefined;
const isAntiPalavra = isGroup ? dataGp[0].palavrasProibidas.enabled : undefined;
const palavrasP = isGroup ? dataGp[0].palavrasProibidas.words : undefined;
const palavrasAction = isGroup ? dataGp[0].palavrasProibidas.action : undefined;
const isModoBrincadeiras = isGroup ? dataGp[0].modos.brincadeiras : undefined;
const isModoPesquisas = isGroup ? dataGp[0].modos.pesquisas : undefined;
const isModoDownloads = isGroup ? dataGp[0].modos.downloads : undefined;
const isAutofigu = isGroup ? dataGp[0].autosticker : undefined;
const isModoEconomia = isGroup ? dataGp[0].modos.economia : undefined;
const isModo18 = isGroup ? dataGp[0].modos.menu18 : undefined;
const isAntiImagem = isGroup ? dataGp[0].antiImagem.enabled : undefined;
const antiImagemAction = isGroup ? dataGp[0].antiImagem.action : undefined;
const isAntiVideo = isGroup ? dataGp[0].antiVideo.enabled : undefined;
const antiVideoAction = isGroup ? dataGp[0].antiVideo.action : undefined;
const isAntiAudio = isGroup ? dataGp[0].antiAudio.enabled : undefined;
const antiAudioAction = isGroup ? dataGp[0].antiAudio.action : undefined;
const isAntiSticker = isGroup ? dataGp[0].antiSticker.enabled : undefined;
const antiStickerAction = isGroup ? dataGp[0].antiSticker.action : undefined;
const isAntiDoc = isGroup ? dataGp[0].antiDoc.enabled : undefined;
const antiDocAction = isGroup ? dataGp[0].antiDoc.action : undefined;
const isAntiContato = isGroup ? dataGp[0].antiContato.enabled : undefined;
const antiContatoAction = isGroup ? dataGp[0].antiContato.action : undefined;
const isAntiLocalizacao = isGroup ? dataGp[0].antiLocalizacao.enabled : undefined;
const antiLocalizacaoAction = isGroup ? dataGp[0].antiLocalizacao.action : undefined;
const isAntiCatalogo = isGroup ? dataGp[0].antiCatalogo.enabled : undefined;
const antiCatalogoAction = isGroup ? dataGp[0].antiCatalogo.action : undefined;
const tempoAluguelRestante = isGroup ? dataGp[0].tempoAluguelRestante : undefined;

	
//=========( Marcações)=============\\
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant
const menc_jid = args?.join(" ").replace("@", "") + SNET
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid
const sender_ou_n = q.includes("@") ? menc_jid : sender
const mrc_ou_numero = q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt
const menc_os2 = q.includes("@") ? (menc_jid2?.length > 0 ? menc_jid2[0]: false) : menc_prt
const marc_tds = q.includes("@") ? menc_jid : q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt 
const menc_prt_nmr = q.length > 12 ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt

//=========(Anti Call)=============\\
var BLC_ANTCL = []
conn.ws.on('CB:call', async (B) => {
if(B.content[0].tag == 'offer') {
conn.updateBlockStatus(B.content[0].attrs['call-creator'], "block")
}
})
BLC_ANTCL.push(sender)

//=========(Outros)=============\\
const reply = enviar
prefix = prefixo
command = comando
conn.readMessages([info.key])

//=========(imagem para link)=============\\
const FormData = require('form-data');
async function upload(filePath) {
const form = new FormData();
form.append('image', fs.readFileSync(filePath));
const response = await fetch('https://api.postimages.org/upload', {
method: 'POST',
body: form
});
const data = await response.json();
if (data.success) {
return data.data.url;
} else {
throw new Error('Erro ao fazer upload: ' + data.error);
}
}

async function downloadVideo(link, outputPath) {
try {
const response = await axios({
method: 'get',
url: link,
responseType: 'stream',
});
const writer = fs.createWriteStream(outputPath);
response.data.pipe(writer);
return new Promise((resolve, reject) => {
writer.on('finish', resolve);
writer.on('error', reject);
});
} catch (error) {
console.error('Erro ao baixar o vídeo:', error.message);
throw error;
}
}

//==============( Data )==============\\
var currentTime = new Date()
var horas = currentTime.getHours();
var minutos = currentTime.getMinutes();
var segundos = currentTime.getSeconds(); 
var dia = currentTime.getDate(); 
var mes = currentTime.getMonth();
var ano = currentTime.getFullYear();
var Dia = currentTime.getDay(); 
var Mes = currentTime.getUTCMonth();

if (minutos < 10)
minutos = "0" + minutos
if (segundos < 10)
segundos = "0" + segundos
if (dia < 10)
dia = "0" + dia
if (mes < 10)
mes = "0" + mes

arrayDia = new Array();
arrayDia[0] = "Domingo";
arrayDia[1] = "Segunda-Feira";
arrayDia[2] = "Terça-Feira";
arrayDia[3] = "Quarta-Feira";
arrayDia[4] = "Quinta-Feira";
arrayDia[5] = "Sexta-Feira";
arrayDia[6] = "Sábado";

var arrayMes = new Array();
arrayMes[0] = "Janeiro";
arrayMes[1] = "Fevereiro";
arrayMes[2] = "Março";
arrayMes[3] = "Abril";
arrayMes[4] = "Maio";
arrayMes[5] = "Junho";
arrayMes[6] = "Julho";
arrayMes[7] = "Agosto";
arrayMes[8] = "Setembro";
arrayMes[9] = "Outubro";
arrayMes[10] = "Novembro";
arrayMes[11] = "Dezembro";
const datacomp = (arrayDia[Dia] + ", " + dia + " de " + arrayMes[Mes] + " de " + ano);
const horacomp = moment.tz("America/Sao_Paulo").format("HH:mm")
const datacompleta = `${datacomp} às ${horacomp}`;
const dataAtual = new Date().getTime();

//==============( Registro )==============\\
const registrosFile = 'datab/dados/registros.json';
let registros = {};
if (fs.existsSync(registrosFile)) registros = JSON.parse(fs.readFileSync(registrosFile, 'utf8'));
function salvarRegistros() {
fs.writeFileSync(registrosFile, JSON.stringify(registros, null, 2), 'utf8');
}
function registrarUsuario(sender, pushname, datacompleta) {
const dataAtual = new Date().getTime();
if (!registros[sender]) {
registros[sender] = {
nome: pushname,
numero: sender,
datarg: datacompleta,
packname_fig: null,
author_fig: null,
banned: false,
saldo: 0,
stickers: 0,
dataRegistro: datacompleta,
mensagensEnviadas: 0,
limiteUsados: 0,
limiteComandos: 60,
tipoVip: 'usuario',
dataVip: 0
};
salvarRegistros();
} else {
registros[sender].dataRegistro = datacompleta;
}
}
if (tempoAluguelRestante < dataAtual) {
if (['free', 'hobby', 'standard', 'advanced'].includes(dataGp[0].tipoGrupo)) {
textenviar = `ℹ️ • *O aluguel de ${dataGp[0].name} venceu!*\n🆔: _${dataGp[0].groupId}_\n💰 *Plano*: _${dataGp[0].tipoGrupo}_\n\n> 🔆 _O bot parou de funcionar no grupo e foi adicionado uma carência de 12 horas para a renovação, caso não seja renovado, o bot irá sair do grupo._`
dataGp[0].tipoGrupo = null;
dataGp[0].tempoAluguelRestante = dataAtual + (12 * 60 * 60 * 1000); // 12 horas de carência
setGp(dataGp);
nmrDono = `${numeroDono}@s.whatsapp.net`
conn.sendMessage(nmrDono, {text: textenviar})
} else {
conn.groupLeave(dataGp[0].groupId);
dataGp[0].tipoGrupo = null;
dataGp[0].tempoAluguelRestante = 0;
setGp(dataGp);
}
}
function verificarBanimento(sender) {
return registros[sender] && registros[sender].banned;
}
registrarUsuario(sender, pushname, datacompleta);
if (verificarBanimento(sender)) return;
const tempoVip2 = (sender = 'default_sender') => {
if (registros[sender].tipoVip !== 'usuario' && registros[sender].dataVip > dataAtual) {
const tempoRestante = registros[sender].dataVip - dataAtual;
const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
let diasTexto = dias === 1 ? 'dia' : 'dias';
let horasTexto = horas === 1 ? 'hora' : 'horas';
let minutosTexto = minutos === 1 ? 'minuto' : 'minutos';
if (dias === 0) diasTexto = '';
if (horas === 0) horasTexto = '';
if (minutos === 0) minutosTexto = '';
let tempoRestanteTexto = '';
if (dias > 0) tempoRestanteTexto += `${dias} ${diasTexto}`;
if (horas > 0) tempoRestanteTexto += ` ${horas} ${horasTexto}`;
if (minutos > 0) tempoRestanteTexto += ` ${minutos} ${minutosTexto}`;
return `*Você é um usuário ${registros[sender].tipoVip.toUpperCase()} 💎️*\n┣ ⌛ *${tempoRestanteTexto}*\n┣ _Obrigado por contribuir para este projeto._ ♥️`;
} else {
return `👥 _Alugue o bot._ - *${prefix}Alugar*`;
}
};
const tempoVip = tempoVip2(sender);

const isFreeGroup = isGroup ? dataGp[0].tipoGrupo === "free" : undefined;
const isHobbyGroup = isGroup ? dataGp[0].tipoGrupo === "hobby" : undefined;
const isStandardGroup = isGroup ? dataGp[0].tipoGrupo === "standard" : undefined;
const isAdvancedGroup = isGroup ? dataGp[0].tipoGrupo === "advanced" : undefined;

const isBasic = registros[sender] ? registros[sender].tipoVip === "basic" : undefined;
const isPro = registros[sender] ? registros[sender].tipoVip === "pro" : undefined;
const isUltimate = registros[sender] ? registros[sender].tipoVip === "ultimate" : undefined;

//=============( Limite )==============\\
const limitearquivo = "./datab/dados/limites.json";
function carregarLimites() {
if (!fs.existsSync(limitearquivo)) {
fs.writeFileSync(limitearquivo, JSON.stringify({}));
}
return JSON.parse(fs.readFileSync(limitearquivo));
}
function salvarLimites(limites) {
fs.writeFileSync(limitearquivo, JSON.stringify(limites, null, 2));
}
const limites = carregarLimites();
function usarLimite() {
if (isSocio) {
return true;
return // Aprova o comando sem consumir limite.
}
if (isGroup) {
const totalGrupo = dataGp[0]?.limiteComandos || 50;
if (!limites[dataGp[0].groupId]) {
limites[dataGp[0].groupId] = {};
}
if (!limites[dataGp[0].groupId][sender]) {
limites[dataGp[0].groupId][sender] = 0;
}
if (limites[dataGp[0].groupId][sender] >= totalGrupo) {
return false;
}
limites[dataGp[0].groupId][sender]++;
salvarLimites(limites);
return true;
} else {
const totalPv = registros[sender]?.limiteComandos || 60;
if (!limites[sender]) {
limites[sender] = 0;
}
if (limites[sender] >= totalPv) {
return false;
}
limites[sender]++;
salvarLimites(limites);
return true;
}
}

function removerLimite() {
const limites = carregarLimites();
if (isGroup) {
if (limites[dataGp[0].groupId] && limites[dataGp[0].groupId][sender] > 0) {
limites[dataGp[0].groupId][sender]--;
salvarLimites(limites);
}
} else {
if (limites[sender] > 0) {
limites[sender]--;
salvarLimites(limites);
}
}
}


//======( Horários automáticos )========\\
function abrirGrupo(groupId) {
conn.groupSettingUpdate(groupId, 'not_announcement');
}
function fecharGrupo(groupId) {
conn.groupSettingUpdate(groupId, 'announcement');
}
function verificarHorario(groupId) {
const horahm = moment.tz("America/Sao_Paulo").format("HH:mm");
if (dataGp[0].horarios.abertura && horahm >= dataGp[0].horarios.abertura && !dataGp[0].horarios.jaAbriuHoje) {
abrirGrupo(groupId);
dataGp[0].horarios.jaAbriuHoje = true;
setGp(dataGp)
}
if (dataGp[0].horarios.fechamento && horahm >= dataGp[0].horarios.fechamento && !dataGp[0].horarios.jaFechouHoje) {
fecharGrupo(groupId);
dataGp[0].horarios.jaFechouHoje = true;
setGp(dataGp)
}
}
if(isGroup) {
verificarHorario(from)
}



async function sendOwner(msg) {
textsend = msg
nmrDono = `${numeroDono}@s.whatsapp.net`
conn.sendMessage(nmrDono, {text: textsend})
}
//=========(Fetch)=============\\
async function fetchJson(url) {
const response = await fetch(url);

if (!response.ok) {
throw new Error(`Erro na requisição à API: ${response.status} - ${response.statusText}`);
}

const data = await response.json();
return data;
}
//=========(Segundos para datas)=============\\
	function kyun(seconds){
function pad(s){
return (s < 10 ? "0" : "") + s;
}
var dias = Math.floor(seconds / (60*60) / (24));
var horas = Math.floor(seconds / (60*60) % (24));
var minutos = Math.floor(seconds % (60*60) / 60);
var segundos = Math.floor(seconds % 60);
return `${pad(dias)} Dia(s) ${pad(horas)} Hora(s) ${pad(minutos)} Minuto(s) ${pad(segundos)} Segundo(s)`;
}

//======(Mentions)=======(Função)===\\
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
	
const mention = (teks= '', ms = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+SNET)
}}
conn.sendMessage(from, {text: teks.trim(), mentions: memberr}, {quoted: ms}) 
}

const mentionSm = (teks= '') => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+SNET)
}}
conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

//=========(Sticker)=============\\
var packname_figu = `🚀⃟Dαllαs ɓστ`
var author_figu = `→ https://dallasbot.site`
const packname_fig = registros[sender] && registros[sender].packname_fig !== null ? registros[sender].packname_fig : isGroup && dataGp[0]?.nomes?.packname ? dataGp[0].nomes.packname : packname_figu;
const author_fig = registros[sender] && registros[sender].author_fig !== null ? registros[sender].author_fig : isGroup && dataGp[0]?.nomes?.author ? dataGp[0].nomes.author : author_figu;


let countMessage = [];
function initializeCountMessage() {
try {
const data = fs.readFileSync("./datab/armazenamento/grupos/countmsg.json", 'utf-8');
countMessage = JSON.parse(data);
if (!Array.isArray(countMessage)) {
countMessage = [];
}
} catch (e) {
countMessage = []; 
console.error("Erro ao carregar countMessage: ", e); 
}
}
//initializeCountMessage();

const groupIdscount = countMessage.map(obj => obj.groupId); 

//========(CONTADOR-DE-MENSAGENS)========\\ GST0171
var numbersIds = [];
if (isGroup && groupIdscount.indexOf(from) >= 0) {
var ind = groupIdscount.indexOf(from);
for (let obj of countMessage[ind].numbers) {
numbersIds.push(obj.id);
}
if (numbersIds.indexOf(sender) >= 0) {
var indnum = numbersIds.indexOf(sender);
var RSM_CN = countMessage[ind].numbers[indnum];
if (type !== "stickerMessage") {
RSM_CN.messages += isCmd ? 0 : 1;
RSM_CN.cmd_messages += isCmd ? 1 : 0;
RSM_CN.aparelho = adivinha;
}
RSM_CN.figus += type === "stickerMessage" ? 1 : 0;
fs.writeFileSync("./datab/armazenamento/grupos/countmsg.json", JSON.stringify(countMessage, null, 2) + "\n");
} else {
const messages = isCmd ? 0 : 1;
const cmd_messages = isCmd ? 1 : 0;
var figus = type === "stickerMessage" ? 1 : 0;
countMessage[ind].numbers.push({
id: sender,
messages: messages,
cmd_messages: cmd_messages,
aparelho: adivinha,
figus: figus
});
fs.writeFileSync("./datab/armazenamento/grupos/countmsg.json", JSON.stringify(countMessage, null, 2) + "\n");
}
} else if (isGroup) {
countMessage.push({
groupId: from,
numbers: [{
id: sender,
messages: 2,
figus: 0,
cmd_messages: isCmd ? 1 : 0,
aparelho: adivinha
}]
});
fs.writeFileSync("./datab/armazenamento/grupos/countmsg.json", JSON.stringify(countMessage, null, 2) + "\n");
}
async function LIMPARDOCNT_QUEMJASAIU() {
var RD_CNT = countMessage[countMessage.map(i => i.groupId).indexOf(from)].numbers
CNT1 = []; for ( i of groupMembers) {CNT1.push(i.id)} 
CNT = []; for ( i of RD_CNT) {
if(!CNT1.includes(i.id)) CNT.push(i)}
for ( i of CNT) {
RD_CNT.splice(RD_CNT.map(i => i.id).indexOf(i.id), 1)}
fs.writeFileSync("./datab/armazenamento/grupos/countmsg.json", JSON.stringify(countMessage, null, 2))
}
//=========( Coins )=============\\
const coinsFile = path.join(__dirname, './datab/dados/coins.json');
let coinsData = {};
if (fs.existsSync(coinsFile)) coinsData = JSON.parse(fs.readFileSync(coinsFile, 'utf8'));
function salvarCoinsData() {
fs.writeFileSync(coinsFile, JSON.stringify(coinsData, null, 2), 'utf8');
}
function registrarUsuarioCoin(sender, initialCoins = 10) {
if (coinsData[sender]) return; 
coinsData[sender] = {
saldo: initialCoins,
lastDaily: null,
transactions: []
};
salvarCoinsData();
}
registrarUsuarioCoin(sender)
function dailyReward(sender, minDaily = 20, maxDaily = 100) {
const dataAtualStr = new Date().toISOString().split('T')[0];
if (!coinsData[sender]) registrarUsuarioCoin(sender);
if (coinsData[sender].lastDaily === dataAtualStr) return;
const dailyCoins = Math.floor(Math.random() * (maxDaily - minDaily + 1)) + minDaily;
coinsData[sender].saldo += dailyCoins;
coinsData[sender].lastDaily = dataAtualStr;
adicionarTransacao(sender, `Daily Reward: +${dailyCoins}`);
salvarCoinsData();
}
function verificarSaldo(sender) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
return coinsData[sender].saldo;
}
function consultarTransacoes(sender) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
return coinsData[sender].transactions || [];
}
function adicionarTransacao(sender, descricao) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
coinsData[sender].transactions.push({
descricao: descricao,
data: new Date().toISOString()
});
salvarCoinsData();
}
function adicionarSaldo(sender, quantia) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
coinsData[sender].saldo += Number(quantia);
salvarCoinsData();
}
function removerSaldo(sender, quantia) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
if (coinsData[sender].saldo >= quantia) {
coinsData[sender].saldo -= quantia;
salvarCoinsData();
}
}
function transferirCoins(sender, destinatario, quantia) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
if (!coinsData[destinatario]) registrarUsuarioCoin(destinatario);
if (coinsData[sender].saldo >= quantia) {
coinsData[sender].saldo -= quantia;
coinsData[destinatario].saldo += quantia;
adicionarTransacao(sender, `Transferência: -${quantia} para ${destinatario}`);
adicionarTransacao(destinatario, `Transferência: +${quantia} de ${sender}`);
salvarCoinsData();
}
}
function definirSaldo(sender, quantia) {
if (!coinsData[sender]) registrarUsuarioCoin(sender);
coinsData[sender].saldo = quantia;
salvarCoinsData();
}
function resetarDaily() {
for (let user in coinsData) {
coinsData[user].lastDaily = null;
}
salvarCoinsData();
}
cron.schedule('0 3 * * *', () => {
  console.log(`[${new Date().toISOString()}] Executando reset do daily.`);
  resetarDaily();
});

function resetarLimite() {
if (fs.existsSync(limitearquivo)) {
fs.writeFileSync(limitearquivo, JSON.stringify({}));
console.log("Arquivo de limites zerado com sucesso.");
} else {
console.log("Arquivo de limites não encontrado.");
}
}



//=========( Anti flood )=============\\
const arquivoFlood = './datab/dados/controleFlood.json';
if (!fs.existsSync(arquivoFlood)) fs.writeFileSync(arquivoFlood, JSON.stringify({}));
let floodData = JSON.parse(fs.readFileSync(arquivoFlood, 'utf-8'));
const arquivoControle = './datab/dados/controleSpam.json'; 
if (!fs.existsSync(arquivoControle)) {
fs.writeFileSync(arquivoControle, JSON.stringify({}));
}
function limiteFigus(sender) {
const now = Math.floor(Date.now() / 1000);
let controleSpam = JSON.parse(fs.readFileSync(arquivoControle, 'utf-8'));
if (!controleSpam[sender]) {
controleSpam[sender] = { timestamps: [], total: 0 };
}
const usuario = controleSpam[sender];
usuario.timestamps = usuario.timestamps.filter(t => now - t <= 60);
if (usuario.timestamps.length > 0 && now - usuario.timestamps[usuario.timestamps.length - 1] <= 3) {
//console.log(`${sender} ultrapassou o limite de figurinhas em 3 segundos.`);
return false;
}
usuario.timestamps.push(now);
usuario.total = usuario.timestamps.length;
if (usuario.total > 15) {
//console.log(`${sender} ultrapassou o limite de figurinhas em 1 minuto. Total: ${usuario.total}`);
return false;
}
fs.writeFileSync(arquivoControle, JSON.stringify(controleSpam, null, 2));
return true;
}

//=========( Limite comandos )=============\\
const arquivoComandos = './datab/dados/controleComandos.json';
if (!fs.existsSync(arquivoComandos)) fs.writeFileSync(arquivoComandos, JSON.stringify({}));
let comandosData = JSON.parse(fs.readFileSync(arquivoComandos, 'utf-8'));
const arquivoControle2 = './datab/dados/controleComandos.json'; 
if (!fs.existsSync(arquivoControle2)) {
fs.writeFileSync(arquivoControle2, JSON.stringify({}));
}
function limiteCmd(sender) {
const now = Math.floor(Date.now() / 1000);
let controleComandos = JSON.parse(fs.readFileSync(arquivoControle2, 'utf-8'));
if (!controleComandos[sender]) {
controleComandos[sender] = { timestamps: [], total: 0 };
}
const usuario = controleComandos[sender];
usuario.timestamps = usuario.timestamps.filter(t => now - t <= 60);
if (usuario.timestamps.length > 0 && now - usuario.timestamps[usuario.timestamps.length - 1] <= 3) {
return false;
}
usuario.timestamps.push(now);
usuario.total = usuario.timestamps.length;
if (usuario.total > 20) {
return false;
}
fs.writeFileSync(arquivoControle2, JSON.stringify(controleComandos, null, 2));
return true;
}

//=========( Sticker.ly )=============\\
async function buscarFigurinhas(nome, quantidade, tipo = 'all', ordem = 'ordem') {
try {
const response = await fetch('http://api.sticker.ly/v4/sticker/search', {
method: 'POST',
headers: {
'User-Agent': 'androidapp.stickerly/3.16.4 (G011A; U; Android 22; pt-BR; br;)',
'Content-Type': 'application/json',
Host: 'api.sticker.ly'
},
body: JSON.stringify({
keyword: nome,
size: 0,
cursor: 0,
limit: 999
})
})
const json = await response.json()
if (!json.result) return []
let stickers = json.result.stickers.map((s) => ({
id: s.sid,
pack: s.packName,
packId: s.packId,
author: s.authorName,
url: s.resourceUrl,
isAnimated: s.isAnimated,
views: s.viewCount,
nsfw: s.stickerPack.nsfwScore
})).filter((s) => s.nsfw <= 69)
if (tipo === 'png') {
stickers = stickers.filter(sticker => sticker.url.endsWith('.png'))
} else if (tipo === 'webp') {
stickers = stickers.filter(sticker => sticker.url.endsWith('.webp'))
} else if (tipo === 'all') {
stickers = stickers.filter(sticker => 
sticker.url.endsWith('.png') || sticker.url.endsWith('.webp')
)
}
stickers = stickers.slice(0, 60)
if (ordem === 'random') {
stickers = stickers.sort(() => 0.5 - Math.random())
}
const resultado = stickers.slice(0, quantidade)
return resultado.map(sticker => sticker.url)
} catch (error) {
console.error('Erro ao buscar figurinhas:', error)
return []
}
}
async function stickerLyPack(nome, quantidade, tipo = 'all', ordem = 'ordem') {
const packResponse = await fetch(`http://api.sticker.ly/v1/stickerPack/${nome}`, {
method: 'GET',
headers: {
'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)',
'Content-Type': 'application/json',
Host: 'api.sticker.ly'
}
})
const packJson = await packResponse.json()
if (!packJson.result) return []
let stickers = packJson.result.resourceFiles.map((s) => ({
id: null,
pack: packJson.result.name,
packId: nome,
author: packJson.result.authorName,
url: packJson.result.resourceUrlPrefix + s,
isAnimated: packJson.result.isAnimated,
views: null,
nsfw: 0
}))
if (tipo === 'png') {
stickers = stickers.filter((s) => s.url.endsWith('.png'))
} else if (tipo === 'webp') {
stickers = stickers.filter((s) => s.url.endsWith('.webp'))
} else if (tipo === 'all') {
stickers = stickers.filter((s) => s.url.endsWith('.png') || s.url.endsWith('.webp'))
}
if (ordem === 'random') {
stickers = stickers.sort(() => Math.random() - 0.5).slice(0, quantidade) // Random sem repetir
} else if (ordem === 'ordem') {
stickers = stickers.slice(0, quantidade) // Na ordem que aparecem
}

return stickers
}


setInterval(() => {
if(fs.existsSync('./tmp')) {
fs.readdirSync('./tmp').forEach(f => {
try { fs.unlinkSync('./tmp/' + f) } catch {}
})
}
}, 10800000)


cron.schedule('0 4 * * *', () => {
const registrosPath = './datab/dados/registros.json';
const spamPath = './datab/dados/controleSpam.json';
if (fs.existsSync(registrosPath)) {
let registros = JSON.parse(fs.readFileSync(registrosPath));
for (const key in registros) {
const user = registros[key];
const tipo = user.tipoVip;
const msgs = user.mensagensEnviadas || 0;
const figus = user.stickers || 0;
if (tipo === 'usuario' && msgs < 50 && figus < 20) delete registros[key];
}
fs.writeFileSync(registrosPath, JSON.stringify(registros, null, 2));
}
if (fs.existsSync(spamPath)) fs.writeFileSync(spamPath, JSON.stringify({}));
});
  













const totalGrupo = isGroup ? dataGp[0]?.limiteComandos || 50 : 0;
const usadosGrupo = isGroup ? (limites[dataGp[0].groupId]?.[sender] || 0) : 0;
const restanteGrupo = isGroup ? totalGrupo - usadosGrupo : 0;
const totalPv = !isGroup ? registros[sender]?.limiteComandos || 60 : 0;
const usadosPv = !isGroup ? (limites[sender] || 0) : 0;
const restantePv = !isGroup ? totalPv - usadosPv : 0;
const limiteRestante = isGroup ? 
  `${restanteGrupo}/${totalGrupo}` : `${restantePv}/${totalPv}`;
const tempoRestante = isGroup ? dataGp[0].tempoAluguelRestante - new Date().getTime() : registros[sender].dataVip - new Date().getTime();
const tempoRestanteTexto = formatarTempo(tempoRestante);

cron.schedule('0 3 * * *', () => {
console.log(`[${new Date().toISOString()}] Executando o reset do limite.`);
resetarLimite();
});


//======(JOGO-DA-VELHA)=======(Função)===\\
const JOGO_D_V = fs?.existsSync(`./datab/armazenamento/ttt/${from}.json`) ?
JSON?.parse(fs?.readFileSync(`./datab/armazenamento/ttt/${from}.json`)) : false;
const { validmove, setGame } = require("./datab/armazenamento/ttt/index.js");
async function joguinhodavelha() {
const cmde = budy.toLowerCase().split(" ")[0] || "";
let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
if (JOGO_D_V != false) {
const boardnow = setGame(`${from}`);
if (budy == "Cex") return reply("why");
if (
budy.toLowerCase() == "s" ||
budy.toLowerCase() == "sim" ||
budy.toLowerCase() == "ok"
) {
if (boardnow.O == sender.replace(SNET, "")) {
if (boardnow.status)
return reply(`*⚠️ O jogo já começou antes!*`);
const matrix = boardnow._matrix;
boardnow.status = true;
fs.writeFileSync(`./datab/armazenamento/ttt/${from}.json`,
JSON.stringify(boardnow, null, 2)
);
const chatAccept = `*🎮 Jogo da Velha 🕹️*\n\n` +
`❌ : @${boardnow.X}\n` +
`⭕ : @${boardnow.O}\n\n` +
`*Sua vez...* : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}\n\n` +
`${matrix[0][0]}  |  ${matrix[0][1]}  |  ${matrix[0][2]}\n` +
`${matrix[1][0]}  |  ${matrix[1][1]}  |  ${matrix[1][2]}\n` +
`${matrix[2][0]}  |  ${matrix[2][1]}  |  ${matrix[2][2]}`;
mention(chatAccept);
}
} else if (
budy.toLowerCase() == "n" ||
budy.toLowerCase() == "não" ||
budy.toLowerCase() == "no"
) {
if (boardnow.O == sender.replace(SNET, "")) {
if (boardnow.status)
return reply(`*⚠️ O jogo já começou!*`);
DLT_FL(`./datab/armazenamento/ttt/${from}.json`);
mention(`@${boardnow.X} *_Infelizmente seu oponente não aceitou o desafio ❌😕_*`);
}
}
}
if (arrNum.includes(cmde)) {
const boardnow = setGame(`${from}`);
if (!boardnow.status) return reply(`*⚠️ Parece que seu oponente não aceitou o desafio ainda...*`);
if (
(boardnow.turn == "X" ? boardnow.X : boardnow.O) !=
sender.replace(SNET, "")
)
return;
const moving = validmove(Number(budy), `${from}`);
const matrix = moving._matrix;
if (moving.isWin) {
if (moving.winner == "SERI") {
const chatEqual = `*🎮 Jogo da Velha 🕹️*\n\n` +
`*Jogo termina empatado 😐*`;
reply(chatEqual);
DLT_FL(`./datab/armazenamento/ttt/${from}.json`);
return;
}
const winnerJID = moving.winner == "O" ? moving.O : moving.X;
const chatWon = `*🎮 Jogo da Velha 🕹️*\n\n` +
`*🎉 Parabéns @${winnerJID} por ter ganhado o jogo da velha! 🎉*`;
mention(chatWon);
setTimeout(() => {
if (fs.existsSync("./datab/armazenamento/ttt/" + from + ".json")) {
DLT_FL("./datab/armazenamento/ttt/" + from + ".json");
} else {
console.log('Jogo da velha expirado')
}
}, 30000) //5 minutos
} else {
const chatMove = `*🎮 Jogo da Velha 🕹️*\n\n` +
`❌ : @${moving.X}\n` +
`⭕ : @${moving.O}\n\n` +
`*Sua vez :* @${moving.turn == "X" ? moving.X : moving.O}\n\n` +
`${matrix[0][0]}  |  ${matrix[0][1]}  |  ${matrix[0][2]}\n` +
`${matrix[1][0]}  |  ${matrix[1][1]}  |  ${matrix[1][2]}\n` +
`${matrix[2][0]}  |  ${matrix[2][1]}  |  ${matrix[2][2]}`;
mention(chatMove);
}
}
}
joguinhodavelha()

if(isBot) return
//=========(Alugueis)=============\\
function verificarPlano(contexto) {
if (contexto === 'grupo') {
if (!dataGp[0].tipoGrupo || dataGp[0].tempoAluguelRestante <= new Date().getTime()) {
if (isGroup) conn.groupLeave(from);
return false;
}
} else if (contexto === 'usuario') {
if (!registros[sender].tipoVip || registros[sender].dataVip <= new Date().getTime()) {
return false;
}
}
return true;
}

const agora = new Date().getTime();


function criarGift(tipo, tempo) {
let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
let codigo = '';
for (let i = 0; i < 24; i++) {
codigo += chars.charAt(Math.floor(Math.random() * chars.length));
if ((i + 1) % 6 === 0 && i !== 23) codigo += '-';
}
let fimAluguel = new Date().getTime() + tempo;
let gift = { codigo, tipo, tempo: fimAluguel, resgatado: false };
let giftsFile = './datab/dados/gifts.json';
let gifts = fs.existsSync(giftsFile) ? JSON.parse(fs.readFileSync(giftsFile)) : [];
gifts.push(gift);
fs.writeFileSync(giftsFile, JSON.stringify(gifts, null, 2));
return codigo;
}
function formatarTempo(tempo) {
let tempoRestanteTexto = '';
let dias = Math.floor(tempo / (1000 * 60 * 60 * 24));
let horas = Math.floor((tempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60));
let diasTexto = dias === 1 ? 'dia' : 'dias';
let horasTexto = horas === 1 ? 'hora' : 'horas';
let minutosTexto = minutos === 1 ? 'minuto' : 'minutos';
if (dias === 0) diasTexto = '';
if (horas === 0) horasTexto = '';
if (minutos === 0) minutosTexto = '';
if (dias > 0) tempoRestanteTexto += `${dias} ${diasTexto}`;
if (horas > 0) tempoRestanteTexto += `${tempoRestanteTexto ? ' ' : ''}${horas} ${horasTexto}`;
if (minutos > 0) tempoRestanteTexto += `${tempoRestanteTexto ? ' ' : ''}${minutos} ${minutosTexto}`;
return tempoRestanteTexto;
}

function formatarHorario(hour) {
const horaLocal = (hour - 3 + 24) % 24;
return `${horaLocal}h`;
}

function resgatarGift(codigo) {
let fs = require('fs');
let giftsFile = './datab/dados/gifts.json';
let gifts = fs.existsSync(giftsFile) ? JSON.parse(fs.readFileSync(giftsFile)) : [];
let gift = gifts.find(g => g.codigo === codigo && !g.resgatado);
if (!gift) return false;
gift.resgatado = true;
fs.writeFileSync(giftsFile, JSON.stringify(gifts, null, 2));
if (isGroup) {
switch (gift.tipo) {
case 1:
dataGp[0].tipoGrupo = 'free';
dataGp[0].limiteComandos = 25;
dataGp[0].tempoAluguelRestante = gift.tempo;
setGp(dataGp);
break;
case 2:
dataGp[0].tipoGrupo = 'hobby';
dataGp[0].limiteComandos = 60;
dataGp[0].tempoAluguelRestante = gift.tempo;
setGp(dataGp);
break;
case 3:
dataGp[0].tipoGrupo = 'standard';
dataGp[0].limiteComandos = 90;
dataGp[0].tempoAluguelRestante = gift.tempo;
setGp(dataGp);
break;
case 4:
dataGp[0].tipoGrupo = 'advanced';
dataGp[0].limiteComandos = 120;
dataGp[0].tempoAluguelRestante = gift.tempo;
setGp(dataGp);
break;
}
} else {
switch (gift.tipo) {
case 5:
registros[sender].tipoVip = 'basic';
registros[sender].limiteComandos = 80;
registros[sender].dataVip = gift.tempo;
salvarRegistros();
break;
case 6:
registros[sender].tipoVip = 'pro';
registros[sender].limiteComandos = 120;
registros[sender].dataVip = gift.tempo;
salvarRegistros();
break;
case 7:
registros[sender].tipoVip = 'ultimate';
registros[sender].limiteComandos = 250;
registros[sender].dataVip = gift.tempo;
salvarRegistros();
break;
}
}
return true;
}


if (!isGroup) {
if (!isBasic && !isPro && !isUltimate && !isOwner && !isSocio) {
if (command !== 'resgatar') {
//conn.updateBlockStatus(sender, "block")
//conn.groupParticipantsUpdate(`120363224056553783@g.us`, [sender], "remove")
return;
}
}
} else {
if (!isHobbyGroup && !isStandardGroup && !isAdvancedGroup && !isFreeGroup) {
if (command !== 'resgatar') {
return;
}
}
}

if (!isGroup) {
  if (registros[sender].dataVip < dataAtual && registros[sender].dataVip !== 0 && !registros[sender].foiAvisadoVip) {
    const plano = registros[sender].tipoVip;
    const planosInfo = {
      basic: { nome: 'basic', valor: 'R$7,90' },
      pro: { nome: 'pro', valor: 'R$11,90' },
      ultimate: { nome: 'ultimate', valor: 'R$15,90' }
    };
    const planoInfo = planosInfo[plano] || { nome: plano, valor: 'desconhecido' };
    const vencimento = new Date(registros[sender].dataVip).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false
    });
    const textoUser = `🚫 *Seu plano VIP expirou!*\n\n📅 *Data de vencimento:* _${vencimento}_\n💳 *Plano:* _${planoInfo.nome} - ${planoInfo.valor}_\n\n⚠️ *A partir de agora, o bot não funcionará mais para você.*\n\n🔁 Para renovar, acesse:\n🌐 *dallasbot.site/#/planospv*\n\n✨ _Evite ficar sem acesso. Renove agora e continue aproveitando tudo que o bot oferece!_`;
    const textoDono = `🛑 *VIP Expirado!*\n\n👤 *Usuário:* @${sender.split('@')[0]}\n💳 *Plano:* _${planoInfo.nome} - ${planoInfo.valor}_\n📅 *Vencimento:* _${vencimento}_\n\n❌ *O acesso foi bloqueado e o aviso de renovação foi enviado.*`;
    registros[sender].tipoVip = null;
    registros[sender].dataVip = 0;
    registros[sender].limiteComandos = 0;
    registros[sender].foiAvisadoVip = true;
    salvarRegistros();
    await conn.sendMessage(sender, { text: textoUser });
    await delay(1500)
    await conn.sendMessage('558999255026@s.whatsapp.net', { text: textoDono, mentions: [sender] });
  }
}
//======( Link to img)========\\
async function bufferImg(imageUrl) {
const fileName = 'imagem.jpg';
const headers = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
};
axios.get(imageUrl, { responseType: 'arraybuffer', headers }).then(async(response) => {
fs.writeFileSync(fileName, response.data);
conn.sendMessage(from, {image: {url: fileName}}, {quoted: info});
fs.unlinkSync('imagem.jpg')
}).catch((err) => {
return reply("Erro!!");
});
}
async function bufferImgStk(imageUrl) {
const fileName = 'imagem.jpg';
const headers = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
};
axios.get(imageUrl, { responseType: 'arraybuffer', headers }).then(async(response) => {
fs.writeFileSync(fileName, response.data);
sendImageAsSticker2(conn, from, fileName, info, { packname:packname_fig, author:author_fig})
fs.unlinkSync('imagem.jpg')
}).catch((err) => {
return reply("Erro!!");
});
}
async function bufferVideoStk(imageUrl) {
const fileName = 'imagem.webp';
const headers = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
};
axios.get(imageUrl, { responseType: 'arraybuffer', headers }).then(async(response) => {
fs.writeFileSync(fileName, response.data);
sendVideoAsSticker2(conn, from, fileName, info, { packname:packname_fig, author:author_fig})
fs.unlinkSync('imagem.webp')
}).catch((err) => {
return reply("Erro!!");
});
}

//==============( Estatisticas )==============\\
const statsFile = './datab/dados/stats.json';
if (!fs.existsSync(statsFile)) {
fs.writeFileSync(statsFile, JSON.stringify({
  gerais: {comandos: 0, figurinhas: 0, mensagens: 0, comandosUsados: {}, horarioPico: {}, rejeitados: 0, gruposAtivos: {}},
  mensais: {comandos: 0, figurinhas: 0, mensagens: 0, comandosUsados: {}, horarioPico: {}, rejeitados: 0, gruposAtivos: {}},
  semanais: {comandos: 0, figurinhas: 0, mensagens: 0, comandosUsados: {}, horarioPico: {}, rejeitados: 0, gruposAtivos: {}}
}, null, 2));
}
function carregarEstatisticas() {
return JSON.parse(fs.readFileSync(statsFile, 'utf-8'));
}
function salvarEstatisticas(dados) {
fs.writeFileSync(statsFile, JSON.stringify(dados, null, 2));
}
function adicionarAtividade(tipo, comando='') {
const stats = carregarEstatisticas();
['gerais', 'mensais', 'semanais'].forEach(categoria => {
if (tipo === 'comando') stats[categoria].comandos++;
if (comando) stats[categoria].comandosUsados[comando] = (stats[categoria].comandosUsados[comando] || 0) + 1;
if (tipo === 'figurinha') stats[categoria].figurinhas++;
if (tipo === 'mensagem') stats[categoria].mensagens++;
if (tipo === 'rejeitado') stats[categoria].rejeitados++;
if (from) stats[categoria].gruposAtivos[from] = (stats[categoria].gruposAtivos[from] || 0) + 1;
const hora = new Date().getHours();
stats[categoria].horarioPico[hora] = (stats[categoria].horarioPico[hora] || 0) + 1;
});
salvarEstatisticas(stats);
}
function obterTopComandos(categoria) {
let stats = carregarEstatisticas();
const comandos = stats[categoria].comandosUsados;
const topComandos = Object.entries(comandos)
.sort((a, b) => b[1] - a[1])
.slice(0, 10)
.map(([cmd, qtd]) => ({comando: cmd, quantidade: qtd}));
return topComandos;
}
function formatarTopComandos(categoria, prefix = '/') {
const topComandos = obterTopComandos(categoria);
if (topComandos.length === 0) return '🔦 *Top 10 comandos mais utilizados*\n\nNenhum comando foi utilizado ainda.';
let resposta = '🔦 *Top 10 comandos mais utilizados*\n\n';
const medalhas = ['🥇', '🥈', '🥉', '🌟', '⭐', '✨', '🔥', '💎', '🌑', '🔹'];
topComandos.forEach((item, index) => {
const medalha = medalhas[index] || '🔹';
resposta += `${medalha} *${prefix}${item.comando}* - _${item.quantidade}x_\n`;
});
return resposta.trim();
}
function resetarEstatisticas(categoria) {
const stats = carregarEstatisticas();
stats[categoria] = {comandos: 0, figurinhas: 0, mensagens: 0, comandosUsados: {}, horarioPico: {}, rejeitados: 0, gruposAtivos: {}};
salvarEstatisticas(stats);
}
function adicionarMensagem(sender) {
if (registros[sender]) {
registros[sender].mensagensEnviadas += 1;
salvarRegistros();
adicionarAtividade('mensagem')
}
}
function adicionarSticker(sender) {
if (registros[sender]) {
registros[sender].stickers += 1;
salvarRegistros();
adicionarAtividade('figurinha');
}
}
//adicionarMensagem(sender);
cron.schedule('0 0 * * 0', () => resetarEstatisticas('semanais')); // Todo domingo
cron.schedule('0 0 1 * *', () => resetarEstatisticas('mensais')); // Todo dia 1

// Exemplos de uso:
/*adicionarAtividade('comando', 'ban'); // Adiciona o comando 'ban'
adicionarAtividade('figurinha'); // Adiciona uma figurinha
adicionarAtividade('mensagem'); // Adiciona uma mensagem processada
adicionarAtividade('rejeitado'); // Adiciona um comando rejeitado
adicionarAtividade('', '', 'grupo123'); // Registra atividade em um grupo específico
console.log(obterTopComandos('gerais')); // Obtém os 10 comandos mais usados na categoria "gerais"
resetarEstatisticas('semanais'); // Reseta as estatísticas semanais manualmente
*/
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const sharp = require('sharp');

if (!globalThis.modeloNSFW) {
  globalThis.modeloPronto = false;
  nsfw.load().then(model => {
    globalThis.modeloNSFW = model;
    globalThis.modeloPronto = true;
  });
}

const analyzeBuffer = async (buffer) => {
  if (!globalThis.modeloPronto) return null;
  const img = await sharp(buffer).resize({ width: 300 }).png().toBuffer();
  const tensor = tf.node.decodeImage(img, 3);
  const preds = await globalThis.modeloNSFW.classify(tensor);
  tensor.dispose();
  return preds;
};

const formatSum = (preds) => {
  let total = 0;
  for (const p of preds) {
    if (["Porn", "Hentai", "Sexy"].includes(p.className)) {
      total += p.probability * 100;
    }
  }
  return total;
};

if (isFreeGroup && (isSticker || isImage) && !isGroupAdmins && !isBot && !isOwner && globalThis.modeloPronto) {
  let buffer = null;
  let tipo = null;

  if (isSticker) {
    buffer = await getFileBuffer(info.message.stickerMessage, 'sticker');
    tipo = 'figurinha';
  } else if (isImage) {
    const imgMsg = info.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage;
    if (imgMsg) {
      buffer = await getFileBuffer(imgMsg, 'image');
      tipo = 'imagem';
    }
  } else if (isVideo) {
    const vidMsg = info.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage;
    if (vidMsg?.jpegThumbnail) {
      buffer = vidMsg.jpegThumbnail;
      tipo = 'vídeo';
    }
  }

  if (buffer && tipo) {
    try {
      const preds = await analyzeBuffer(buffer);
      if (!preds) return;
      const total = formatSum(preds);

      if (total >= 70) {
        setTimeout(() => {
          conn.sendMessage(from, {
            delete: {
              remoteJid: from,
              fromMe: false,
              id: info.key.id,
              participant: sender
            }
          });
        }, 500);

        if (tipo === 'vídeo') {
          if (!ADVT[sender]) ADVT[sender] = 0;
          ADVT[sender]++;
          await setGp(dataGp);
          conn.sendMessage(from, {
            text: `⚠️ • @${sender.split("@")[0]} foi advertido por enviar um vídeo com conteúdo impróprio (${total.toFixed(2)}%).`,
            mentions: [sender]
          });
        } else {
          if (!JSON.stringify(groupMembers).includes(sender)) return;
          conn.groupParticipantsUpdate(from, [sender], 'remove');
          conn.sendMessage(from, {
            text: `⛔ • @${sender.split("@")[0]} foi banido por enviar ${tipo} com conteúdo impróprio (${total.toFixed(2)}%).`,
            mentions: [sender]
          });
        }
        return;
      }

    } catch (err) {
      console.error("Erro ao analisar conteúdo NSFW:", err);
    }
  }
}

  

//=========( Mensagens variadas )=============\\
const grupoEconomia = isGroup ? (isFreeGroup ? ["ℹ️ Este grupo é grátis e não pode usar os comandos de economia.", "ℹ️ O grupo grátis não têm acesso aos comandos de economia.", "ℹ️ Comandos de economia indisponíveis neste grupo, para usar, considere alugar."][Math.floor(Math.random() * 3)] : isHobbyGroup ? ["ℹ️ Este grupo está no plano *Hobby* e não pode usar os comandos de economia.", "ℹ️ Grupos *Hobby* não têm acesso à economia.", "ℹ️ Comandos de economia não disponíveis no plano *Hobby*."][Math.floor(Math.random() * 3)] : isStandardGroup ? (isModoEconomia ? ["✅ O grupo está com os comandos de economia ativados.", "✅ Comandos de economia liberados neste grupo.", "✅ Economia ativada! Aproveite os comandos!"][Math.floor(Math.random() * 3)] : ["❌ Este grupo está com os comandos de economia desativados pelos administradores.", "❌ Comandos de economia desativados neste grupo.", "❌ Economia desativada por opção dos administradores."][Math.floor(Math.random() * 3)]) : isAdvancedGroup ? (isModoEconomia ? ["✅ O grupo está com os comandos de economia ativados.", "✅ Comandos de economia liberados neste grupo.", "✅ Economia ativada! Aproveite os comandos!"][Math.floor(Math.random() * 3)] : ["❌ Este grupo está com os comandos de economia desativados pelos administradores.", "❌ Comandos de economia desativados neste grupo.", "❌ Economia desativada por opção dos administradores."][Math.floor(Math.random() * 3)]) : "ℹ️ Este grupo não tem permissão para usar os comandos de economia." ) : "✅ Você pode usar todos os comandos acima.";
const grupo18 = isGroup ? (isFreeGroup ? ["ℹ️ Este grupo é grátis e não pode usar os comandos adultos.", "ℹ️ Grupo grátis não têm acesso a esses comandos.", "ℹ️ Comandos +18 indisponíveis neste grupo, alugue para usar."][Math.floor(Math.random() * 3)] : isHobbyGroup ? ["ℹ️ Este grupo está no plano *Hobby* e não pode usar os comandos acima.", "ℹ️ Grupos *Hobby* não têm acesso aos comandos acima.", "ℹ️ Comandos +18 não disponíveis no plano *Hobby*."][Math.floor(Math.random() * 3)] : isStandardGroup ? ["ℹ️ Grupos *Standard* não têm acesso aos comandos acima.", "ℹ️ Comandos +18 não disponíveis para grupos *Standard*.", "ℹ️ Este grupo não tem acesso aos comandos +18."][Math.floor(Math.random() * 3)] : isAdvancedGroup ? (isModo18 ? ["✅ O grupo está com os comandos +18 ativados.", "✅ Comandos +18 liberados neste grupo.", "✅ Comandos ativados! Aproveite os comandos!"][Math.floor(Math.random() * 3)] : ["❌ Este grupo está com os comandos +18 desativados pelos administradores.", "❌ Comandos +18 desativados neste grupo.", "❌ Comandos desativado por opção dos administradores."][Math.floor(Math.random() * 3)]): "ℹ️ Este grupo não tem permissão para usar os comandos do menu18."  ) : (isUltimate ? "✅ Você tem acesso ao menu18, aproveite os comandos!" : "ℹ️ Você não tem permissão para usar os comandos do menu18.");
const grupoBrincadeiras = isGroup ? (isModoBrincadeiras ? ["✅ O grupo está com os comandos de brincadeira ativados.", "✅ Comandos de brincadeira liberados neste grupo.", "✅ Brincadeiras ativadas! Aproveite os comandos!"][Math.floor(Math.random() * 3)] : ["❌ Este grupo está com os comandos de brincadeira desativados pelos administradores.", "❌ Comandos de brincadeira desativados neste grupo.", "❌ Brincadeiras desativadas por opção dos administradores."][Math.floor(Math.random() * 3)]) : "ℹ️ Os comandos de brincadeira só podem ser usados em grupos.";
  
//=========( Antispam )=============\\
const usuarios = {};
function filtroAntispam(sender) {
const agora22 = moment();
if (!usuarios[sender]) usuarios[sender] = { ultimoComando: agora22, comandosUltimoMinuto: [] };
const usuario = usuarios[sender];
if (agora22.diff(usuario.ultimoComando, 'seconds') < 3) return;
usuario.ultimoComando = agora22;
usuario.comandosUltimoMinuto = usuario.comandosUltimoMinuto.filter(t => agora22.diff(t, 'seconds') <= 60);
usuario.comandosUltimoMinuto.push(agora22);
if (usuario.comandosUltimoMinuto.length > 10) return;
}

      
//=========(Console)=============\\
if (isCmd && !isBot) {
console.log(chalk.gray("~>"), `[${chalk.red("Comando")}]`, color(comando), "de",
color(sender.split("@")[0]))
filtroAntispam(sender)
adicionarAtividade('comando', comando);
if (!limiteCmd(sender)) return;
}

//==============( Anti spam )==============\\
const usedCommandRecently = new Set()
const isFiltered = (sender, isFreeGroup) => isFreeGroup && usedCommandRecently.has(sender)
const addFilter = (sender) => {
usedCommandRecently.add(sender)
setTimeout(() => usedCommandRecently.delete(sender), 5000)
}
addFilter(sender)



//==============( Uso bloqueado )==============\\
function comandoBloqueado(comando, isGroupAdmins, dataGp) {
const comandosBloqueados = dataGp[0].comandosBloqueados || [];
if (comandosBloqueados.includes(comando)) {
return true; 
}
return false; 
}
if(isGroup) {
if (!dataGp[0].usuariosBloqueados) dataGp[0].usuariosBloqueados = {};
if (dataGp[0].usuariosBloqueados[sender]) {
let tempoAtual = new Date().getTime();
if (dataGp[0].usuariosBloqueados[sender] > tempoAtual) {
return;
}
delete dataGp[0].usuariosBloqueados[menc_os2];
setGp(dataGp);
}
if (dataGp[0].usuariosBloqueados) {
let tempoAtual = new Date().getTime();
for (let usuario in dataGp[0].usuariosBloqueados) {
if (dataGp[0].usuariosBloqueados[usuario] <= tempoAtual) {
delete dataGp[0].usuariosBloqueados[usuario];
}
}
setGp(dataGp);
}
}


if (isGroup) {
if (dataGp[0].botStatus === false && !isGroupAdmins) {
return
}
}
if (isGroup) {
if (dataGp[0].comandosBloqueados.includes(command)) {
return 
}
}

mensagemavisopv = `👋 Oi, é um prazer ter você como usuário desse projeto. Mas infelizmente por restrições do whatsapp *eu não funciono no privado para todos os usuários.* - _Caso você queira, entre em contato com o dono e adquira o vip do bot._\n\n❗ *Contribua e Apoie:*\n• 💪 _VIP ajuda a manter o bot online._\n\n💰 *Valor:*\n\n• 📅 *Mensalmente*: _Acesso ao bot no pv com todos os comandos liberados por 30 dias_ - *R$10,00*\n\n⁉️ *Não quer contratar?* - _Use o bot gratuitamente no nosso grupo, acesse em bit.ly/dallasbot_`

async function uploadImage(imagePath) {
const form = new FormData();
const fileStream = fs.createReadStream(imagePath);
form.append('image', fileStream);
form.append('key', '8ab8d1a2c57f039480f3a6480fe63a91');
try {
const response = await axios.post('https://api.imgbb.com/1/upload', form, {
headers: form.getHeaders(),
});
return response.data.data.url;
} catch (error) {
return null;
}
}
const msgaa = [`🔥 *Opa!* Você está no grupo grátis do Dallas e tentou usar o comando *~${prefix + command}~*? Infelizmente, ele não está liberado aqui.\n👉 Para *adicionar o bot* no seu grupo, use: _${prefix}grupo_\n👉 Para usar no privado, digite: _${prefix}pv_\n💎 Quer ter acesso a *todos os comandos* no grupo VIP *permanente* por apenas *5 reais*? Chame: dallasbot.site/#/gpvip 🚀`, `⚡ *Eita!* O comando \`${prefix + command}\` não está disponível no grupo grátis.\n🌟 Adicione o bot ao seu grupo com: _${prefix}grupo_\n💬 Quer usar no PV? Tente: _${prefix}pv_\n💰 Entre para o grupo VIP por apenas *5 reais* e tenha *acesso ilimitado*! Chame: dallasbot.site/#/gpvip 💥`, `✨ *Ei!* Parece que você está no grupo grátis e o comando \`${prefix + command}\` não funciona aqui.\n📌 Adicione o bot ao seu grupo com: _${prefix}grupo_\n🔒 Use no privado com: _${prefix}pv_\n🎉 Aproveite o VIP por apenas *5 reais*! Entre agora: dallasbot.site/#/gpvip 🤑`, `🛑 *Atenção!* O comando \`${prefix + command}\` está bloqueado no grupo grátis.\n✅ Resolva isso agora:\n➡ *Adicione o bot* no seu grupo com: _${prefix}grupo_\n➡ *Use no PV*: _${prefix}pv_\n🎈 Entre no VIP *permanente* por apenas *5 reais*: dallasbot.site/#/gpvip 🚨`, `🌟 *Ei, você aí!* Tentou usar o comando \`${prefix + command}\`? Ele não está liberado no grupo grátis.\n💡 Solução:\n🔹 Use _${prefix}grupo_ para adicionar o bot ao seu grupo.\n🔹 Use _${prefix}pv_ para comandos no privado.\n👑 Entre no VIP por apenas *5 reais* e desbloqueie tudo: dallasbot.site/#/gpvip 💎`, `🚀 *Oops!* Parece que o comando \`${prefix + command}\` não funciona no grupo grátis.\n🔧 Para resolver:\n➡ Use _${prefix}grupo_ para adicionar o bot ao seu grupo.\n➡ Use _${prefix}pv_ para comandos no privado.\n🌟 Entre no VIP por apenas *5 reais* e libere tudo: dallasbot.site/#/gpvip 🔥`, `💬 *Ah não!* O comando \`${prefix + command}\` está bloqueado aqui.\n🔑 Solução rápida:\n🔸 _${prefix}grupo_ para adicionar o bot ao seu grupo.\n🔸 _${prefix}pv_ para usar no privado.\n🎊 Entre no VIP *permanente* por apenas *5 reais*: dallasbot.site/#/gpvip 🤑`, `🤖 *Ei!* Você está no grupo grátis do Dallas e tentou usar \`${prefix + command}\`, certo? Infelizmente, ele não está liberado aqui.\n🔥 Liberar é fácil!\n➡ Adicione o bot ao grupo com: _${prefix}grupo_\n➡ Use comandos no PV com: _${prefix}pv_\n💎 Entre no VIP por *apenas 5 reais* e tenha tudo desbloqueado: dallasbot.site/#/gpvip 💰`, `⚡ *Eita!* Está no grupo grátis do Dallas e viu que o comando \`${prefix + command}\` não funciona?\n🔥 Solução:\n➡ _${prefix}grupo_ para adicionar o bot ao seu grupo.\n➡ _${prefix}pv_ para usar no privado.\n💰 VIP *permanente* com *todos os comandos* por apenas *5 reais*: dallasbot.site/#/gpvip 🚀`, `🔥 *Opa!* Parece que você tentou usar \`${prefix + command}\`, mas ele não está liberado no grupo grátis.\n✅ Liberar é simples:\n➡ Adicione o bot ao seu grupo com: _${prefix}grupo_\n➡ Use no PV com: _${prefix}pv_\n💎 Obtenha acesso ao VIP *permanente* por só *5 reais*: dallasbot.site/#/gpvip 🚨`, `✨ *Ah, não!* O comando \`${prefix + command}\` não está disponível aqui.\n🎯 Solução:\n➡ _${prefix}grupo_ para adicionar o bot ao seu grupo.\n➡ _${prefix}pv_ para usar no privado.\n👑 Garanta o VIP por apenas *5 reais*: dallasbot.site/#/gpvip 💎`,`🔒 *Ops!* Tentou usar \`${prefix + command}\` no grupo grátis do Dallas?\n🚀 Libere agora mesmo:\n➡ Adicione o bot com: _${prefix}grupo_\n➡ Use no PV: _${prefix}pv_\n💰 VIP permanente por *5 reais*: dallasbot.site/#/gpvip 🌟`, `🛑 *Epa!* O comando \`${prefix + command}\` está bloqueado aqui.\n🔑 Resolva rápido:\n➡ Adicione o bot ao grupo: _${prefix}grupo_\n➡ Use no privado: _${prefix}pv_\n💎 Acesse o VIP *permanente* por só *5 reais*: dallasbot.site/#/gpvip 💥`, `🌟 *Atenção!* Você está no grupo grátis e tentou usar o comando \`${prefix + command}\`.\n😔 Ele não está liberado, mas aqui está como resolver:\n➡ _${prefix}grupo_ para adicionar o bot ao seu grupo.\n➡ _${prefix}pv_ para usar no privado.\n🎉 VIP por *5 reais*: dallasbot.site/#/gpvip 💸`, `🎯 *Ah, que pena!* O comando \`${prefix + command}\` não está habilitado.\n🎯 Adicione o bot ao seu grupo com _${prefix}grupo_.\n🎯 Use no privado com _${prefix}pv_.\n👑 Garanta o VIP com acesso total por só *5 reais*: dallasbot.site/#/gpvip 🚨`];
const msgfg = msgaa[Math.floor(Math.random() * msgaa.length)];



//=========(comandos)=============\\
switch (comando) {
case 'nsfw': {
  const fs = require('fs');
  const path = require('path');
  const tf = require('@tensorflow/tfjs-node');
  const nsfw = require('nsfwjs');
  const sharp = require('sharp');
  const { v4: uuidv4 } = require('uuid');
  const os = require('os');

  const tmp = os.tmpdir();
  const model = await nsfw.load();

  const analyzeBuffer = async (buffer) => {
    const img = await sharp(buffer).png().toBuffer();
    const tensor = tf.node.decodeImage(img, 3);
    const preds = await model.classify(tensor);
    tensor.dispose();
    return preds;
  };

  const formatPredictions = (title, preds) => {
    let txt = `*${title}*\n`;
    preds.forEach(p => {
      txt += `• ${p.className}: ${(p.probability * 100).toFixed(2)}%\n`;
    });
    return txt;
  };

  const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const sticker = RSM?.stickerMessage;
  const boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage;
  const boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage;

  try {
    // FIGURINHA
    if (sticker) {
      const buffer = await getFileBuffer(sticker, 'sticker');
      const imageBuffer = await sharp(buffer).toFormat('png').toBuffer();
      const preds = await analyzeBuffer(imageBuffer);
      return reply(formatPredictions("🧠 Análise do Sticker", preds));
    }

    // IMAGEM
    if (boij) {
      const buffer = await getFileBuffer(boij, 'image');
      const preds = await analyzeBuffer(buffer);
      return reply(formatPredictions("🖼️ Análise da Imagem", preds));
    }

    // VÍDEO - usar thumbnail gerada pelo WhatsApp
    if (boij2 && boij2.jpegThumbnail) {
      const buffer = boij2.jpegThumbnail; // já é imagem de preview
      const preds = await analyzeBuffer(buffer);
      return reply(formatPredictions("🎞️ Análise do Thumbnail do Vídeo", preds));
    }

    return reply("❗ Marque uma imagem, vídeo ou figurinha para verificar conteúdo NSFW.");
  } catch (err) {
    console.error(err);
    return reply("❌ Erro ao processar a mídia.");
  }
}
break;

// Exemplo de uso na case:
case 'teste':
if (!usarLimite()) return;
reply('Comando executado com sucesso!');
break
case 'ping':
    const os = require('os');
    const moment = require('moment-timezone');

    const r = (Date.now() / 1000) - info.messageTimestamp;
    const horaAtual = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

    const memoryUsage = process.memoryUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpuUsage = process.cpuUsage();
    const cpus = os.cpus();
    const systemUptime = os.uptime(); // uptime do sistema
    const latencyMs = r * 1000; // latência em ms

    // Função para formatar memória
    const formatMemory = (bytes) => {
        let mb = bytes / 1024 / 1024;
        return mb > 1024 ? (mb / 1024).toFixed(2) + ' GB' : mb.toFixed(2) + ' MB';
    };

    // Função para formatar latência
    const formatLatency = (ms) => {
        if (ms > 1000) return (ms / 1000).toFixed(2) + ' s';
        return ms.toFixed(2) + ' ms';
    };

    // Função para formatar tempo de atividade
    const formatUptime = (seconds) => {
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        let uptime = '';
        if (days > 0) uptime += `${days}d `;
        if (hours > 0) uptime += `${hours}h `;
        if (minutes > 0) uptime += `${minutes}m`;
        return uptime.trim() || '0m';
    };

    let resposta = `
*╭─〘 STATUS TÉCNICO 〙─╮*

🕐 _Horário Atual_: *${horaAtual}*

⚡ _Velocidade de Resposta_: *${r.toFixed(3)}* segundos
⚡ _Latência Estimada_: *${formatLatency(latencyMs)}*

🧠 _Memória RAM_:
• *Total*: ${formatMemory(totalMem)}
• *Usada*: ${formatMemory(usedMem)}
• *Livre*: ${formatMemory(freeMem)}
• *Processo Node.js*: ${formatMemory(memoryUsage.heapUsed)} / ${formatMemory(memoryUsage.heapTotal)}

🖥️ _Processador_:
• *CPUs*: ${cpus.length} (${cpus[0].model})
• *Uso CPU (User)*: ${formatLatency(cpuUsage.user / 1000)}
• *Uso CPU (System)*: ${formatLatency(cpuUsage.system / 1000)}

🛡️ _Sistema_:
• *Plataforma*: ${process.platform}
• *Arquitetura*: ${process.arch}
• *Tempo Atividade Sistema*: *${formatUptime(systemUptime)}*
• *Sistema Operacional*: ${os.type()} ${os.release()}
• *Node.js*: ${process.version}

*╰───────────────╯*
`.trim();

    conn.sendMessage(from, { text: resposta, mentions: [sender] }, { quoted: info });
    break;
case 'lytecnica': {
  if (!q) return reply(`📌 Use: ${prefix + command} (termo para buscar)\nExemplo: ${prefix + command} neymar`);

  if (!usarLimite()) return;
  if (isFreeGroup && !isGroupAdmins) return reply(msgfg);

  let msg = `🧪 *Sticker.ly - Diagnóstico técnico do termo:* _${q}_\n\n`;
  let links = [];
  let exemplos = [];
  let totalTestes = 10;
  
  for (let i = 1; i <= totalTestes; i++) {
    try {
      let url = '';
      let metodo = 'GET';
      let headers = {};
      let body = null;

      // Simula diferentes testes
      if (i === 1) {
        msg += `🧩 *Teste ${i} - API v4 padrão*\n`;
        url = 'http://api.sticker.ly/v4/sticker/search';
        metodo = 'POST';
        headers = {
          'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
        body = JSON.stringify({ keyword: q, size: 0, cursor: 0, limit: 999 });
      } else if (i === 2) {
        msg += `🧩 *Teste ${i} - API v3 pacotes*\n`;
        url = `http://api.sticker.ly/v3/stickerPack/search?keyword=${encodeURIComponent(q)}&cursor=0&limit=10`;
        headers = {
          'User-Agent': 'androidapp.stickerly/2.14.0 (G011B; Android 21)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
      } else if (i === 3) {
        msg += `🧩 *Teste ${i} - API v5 pacotes (simulação)\n`;
        url = `http://api.sticker.ly/v5/stickerPack/search?keyword=${encodeURIComponent(q)}&cursor=0&limit=5`;
        headers = {
          'User-Agent': 'androidapp.stickerly/2.20.1 (SM-G973F; Android 30)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
      } else if (i === 4) {
        msg += `🧩 *Teste ${i} - Categorias (v3)*\n`;
        url = `http://api.sticker.ly/v3/stickerPack/category`;
        headers = {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
      } else if (i === 5) {
        msg += `🧩 *Teste ${i} - Tags (v3)*\n`;
        url = `http://api.sticker.ly/v3/stickerPack/tag`;
        headers = {
          'User-Agent': 'androidapp.stickerly/2.10.0 (G011A; Android 28)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
      } else if (i === 6) {
        msg += `🧩 *Teste ${i} - Busca geral v4 User-Agent diferente*\n`;
        url = 'http://api.sticker.ly/v4/sticker/search';
        metodo = 'POST';
        headers = {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
        body = JSON.stringify({ keyword: q, size: 0, cursor: 0, limit: 999 });
      } else if (i === 7) {
        msg += `🧩 *Teste ${i} - Busca webp apenas (v4)*\n`;
        url = 'http://api.sticker.ly/v4/sticker/search';
        metodo = 'POST';
        headers = {
          'User-Agent': 'androidapp.stickerly/2.15.0 (Redmi Note 8; Android 26)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
        body = JSON.stringify({ keyword: q, size: 0, cursor: 0, limit: 999 });
      } else if (i === 8) {
        msg += `🧩 *Teste ${i} - Busca PNG apenas (v4)*\n`;
        url = 'http://api.sticker.ly/v4/sticker/search';
        metodo = 'POST';
        headers = {
          'User-Agent': 'androidapp.stickerly/2.12.1 (Moto G6; Android 23)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
        body = JSON.stringify({ keyword: q, size: 0, cursor: 0, limit: 999 });
      } else if (i === 9) {
        msg += `🧩 *Teste ${i} - Busca por ordem (v4)*\n`;
        url = 'http://api.sticker.ly/v4/sticker/search';
        metodo = 'POST';
        headers = {
          'User-Agent': 'androidapp.stickerly/2.11.0 (Galaxy A51; Android 29)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
        body = JSON.stringify({ keyword: q, size: 0, cursor: 0, limit: 999 });
      } else if (i === 10) {
        msg += `🧩 *Teste ${i} - Pack popular fixo (v1)*\n`;
        url = `http://api.sticker.ly/v1/stickerPack/${encodeURIComponent(q)}`;
        headers = {
          'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)',
          'Content-Type': 'application/json',
          'Host': 'api.sticker.ly'
        };
      }

      let response = await fetch(url, {
        method: metodo,
        headers: headers,
        body: body
      });

      let json = await response.json();

      if (!json || !json.result) {
        msg += `❌ Nenhum resultado.\n\n`;
        continue;
      }

      // Resultado com figurinhas
      let lista = [];
      if (json.result.stickers) {
        lista = json.result.stickers.map(s => s.resourceUrl);
      } else if (json.result.resourceFiles) {
        lista = json.result.resourceFiles.map(s => json.result.resourceUrlPrefix + s);
      } else if (json.result.packs) {
        lista = json.result.packs.map(p => p.name || p.id);
      } else if (json.result.map) {
        lista = json.result.map((s) => s.name || s.tag || s.category);
      }

      if (lista.length === 0) {
        msg += `⚠️ Resposta válida, mas sem resultados úteis.\n\n`;
      } else {
        links.push(...lista);
        msg += `✅ Retornos: ${lista.length}\n`;
        exemplos.push(...lista.slice(0, 3));
        msg += exemplos.slice(-3).join('\n') + '\n\n';
      }
    } catch (e) {
      msg += `⚠️ Erro no Teste ${i}: ${e.message}\n\n`;
    }
  }

  msg += `📦 *Resumo:*\nTotal de links extraídos: ${links.length}\n`;
  if (links.length > 0) msg += `Exemplo final:\n${links[0]}\n`;

  reply(msg);
}
break;//=========(Figurinhas)=============\\
case 'st':
case 'stk':
case 'sticker':
case 's':
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if(boij) {
if (!limiteFigus(sender)) return;
owgi = await getFileBuffer(boij, 'image')
let encmediaa2 = await sendImageAsSticker2(conn, from, owgi, { packname:packname_fig, author:author_fig})
await DLT_FL(encmediaa2)
adicionarSticker(sender);
} else if(boij2 && boij2?.seconds < 11) {
if (!limiteFigus(sender)) return;
owgi = await getFileBuffer(boij2, 'video')
let encmedia2 = await sendVideoAsSticker2(conn, from, owgi, { packname:packname_fig, author:author_fig})
await DLT_FL(encmedia2)
adicionarSticker(sender);
} else {
reply(`*Marque uma foto ou vídeo de até 10s* para transformar em figurinha! 📸`)
}
break
case 'fig':
case 'fstiker':
case 'fsticker':
case 'f':
case 'figu':
case 'figurinha':
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if(boij) {
if (!limiteFigus(sender)) return;
owgi = await getFileBuffer(boij, 'image')
let encmediaa = await sendImageAsSticker(conn, from, owgi, { packname:packname_fig, author:author_fig})
await DLT_FL(encmediaa)
adicionarSticker(sender);
} else if(boij2 && boij2?.seconds < 11) {
if (!limiteFigus(sender)) return;
owgi = await getFileBuffer(boij2, 'video')
let encmedia = await sendVideoAsSticker(conn, from, owgi, { packname:packname_fig, author:author_fig})
await DLT_FL(encmedia)
adicionarSticker(sender);
} else {
reply(`*Marque uma foto ou vídeo de até 10s* para transformar em figurinha! 📸`)
}
break
case 'emojimix': {
var [emoji1, emoji2] = q.trim().split("+");
if (!q.includes("+")) return reply(`*Uso incorreto!* Ex: ${prefix + command} 😁+😇`);
try {
const fetchUrl = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`;
const anu = await fetchJson(fetchUrl);
let stickerUrl = anu.results[0].media_formats.png_transparent.url; // Usa apenas o primeiro resultado
let encmediaa = await sendImageAsSticker2(conn, from, stickerUrl, { packname:packname_fig, author:author_fig})
await DLT_FL(encmediaa)
adicionarSticker(sender);
} catch (e) {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
console.log(e)
}
}
break;
case 'steal': {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!isQuotedSticker) return reply(`☠️ - Para usar o ${prefix + command}, você precisa responder a um sticker com este comando!\n\n> Defina o nome padrão para todas suas novas figurinhas usando *${prefix}setname nome*\n- Ou use *${prefix}steal nome* para definir de cada figurinha.`);
const stickerBuffer = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
const packname = q ? q : packname_fig;
const author = q ? '' : author_fig;
if(stickerBuffer) {
let encmedia = await sendVideoAsSticker3(conn, from, stickerBuffer, { packname, author });
await DLT_FL(encmedia)
} else {
let encmedia = await sendImageAsSticker2(conn, from, stickerBuffer, { packname, author });
await DLT_FL(encmedia)
}
adicionarSticker(sender);
} catch (error) {
return reply(`😅 *Algo aconteceu!* - _Tente com outra figurinha_`);
}
}
break;


case 'ly': case 'stickerly': {
if (!q) return reply(`🌟 • *Você deve usar ${prefix+command} (nome de algo)*.\n- _Esse comando baixa figurinhas do app sticker.ly, digite apenas uma palavra chave, cachorro, meme, etc._`);
if (!usarLimite()) return;
if (isFreeGroup && !isGroupAdmins) return reply(msgfg);
async function figu1() {
const resultado = await buscarFigurinhas(q, 3, 'all', 'random');
if (resultado.length > 0) {
for (const link of resultado) {
if (link.endsWith('.png')) {
let encmedia = await sendImageAsSticker2(conn, from, link, { packname: packname_fig, author: author_fig });
await DLT_FL(encmedia)
adicionarSticker(sender);
} else if (link.endsWith('.webp')) {
let encmedia = await sendVideoAsSticker3(conn, from, link, { packname: packname_fig, author: author_fig });
await DLT_FL(encmedia)
adicionarSticker(sender);
} else {
continue;
}
await delay(1000);
}
} else {
reply(`sticker.ly não achou resultados para *${q}*`);
}
}
await figu1();
}
break;
case 'pack': {
if (isFreeGroup && !isGroupAdmins) return reply(msgfg);
if (!q) return reply(`🌟 • *Você deve usar ${prefix + command} (código do pacote)*.\nExemplo: *${prefix + command} 2RY2AQ*\n_Use o código do sticker.ly para baixar o pacote._`)
try {
const stickers = await stickerLyPack(q, 5, 'all', 'random') // 10 stickers, tipo 'all', na ordem
if (stickers.length === 0) {
return reply(`🤖 - Não encontrei stickers para o pacote *${q}* no sticker.ly.`)
}
for (const sticker of stickers) {
try {
if (sticker.url.endsWith('.png')) {
let encmedia = await sendImageAsSticker2(conn, from, sticker.url, { packname: packname_fig, author: author_fig })
await DLT_FL(encmedia)
} else if (sticker.url.endsWith('.webp')) {
let encmedia = await sendVideoAsSticker3(conn, from, sticker.url, { packname: packname_fig, author: author_fig })
await DLT_FL(encmedia)
}
} catch (e) {
console.log(`Erro ao enviar sticker: ${sticker.url} - ${e.message}`)
continue
}
await delay(1500)
}
} catch (e) {
reply(`🤖 - Houve um erro ao buscar o pacote.`)
}
}
break
case 'ttp': {
if(!q) return reply('🔎 Digite algo junto ao comando. \n*Exemplo:* /ttp Oi')
var attpText = q
var attpBuffer = await ttp(attpText, author_fig, packname_fig, '#FFFFFF')
conn.sendMessage(from, {sticker: attpBuffer})
}
break
case 'ttp2': {
if(!q) return reply('🔎 Digite algo junto ao comando. \n*Exemplo:* /ttp2 Oi')
var attpText = q
var attpBuffer = await ttp(attpText, author_fig, packname_fig, '#00FF00')
conn.sendMessage(from, {sticker: attpBuffer})
}
break
case 'ttp3': {
if(!q) return reply('🔎 Digite algo junto ao comando. \n*Exemplo:* /ttp3 Oi')
var attpText = q
var attpBuffer = await ttp(attpText, author_fig, packname_fig, '#FF0000')
conn.sendMessage(from, {sticker: attpBuffer})
}
break
case 'ttp4': {
if(!q) return reply('🔎 Digite algo junto ao comando. \n*Exemplo:* /ttp4 Oi')
var attpText = q
var attpBuffer = await ttp(attpText, author_fig, packname_fig, '#800080')
conn.sendMessage(from, {sticker: attpBuffer})
}
break
case 'attp':
if(!q) return reply('🔎 Digite algo junto ao comando. \n*Exemplo:* /attp Oi')
var attpText = body.slice(command.length + 2)
var attpBuffer = await attp(attpText, packname_fig, author_fig, '#00FFFF')
conn.sendMessage(from, {sticker: attpBuffer})
break



  
//=========(Admin)=============\\
case 'limparespaco': {
    if (!isOwner) return;

    const pedidosPorGrupo = {
        "120363224056553783@g.us": 449, // Grupo 1
        "120363377012657553@g.us": 364, // Grupo 2
        "120363375581849466@g.us": 376  // Grupo 3
    };

    const maximo = 1020;
    const adminSet = new Set();
    const removerInfo = {};
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const delayAleatorio = () => delay(Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000);

    for (const groupId of Object.keys(pedidosPorGrupo)) {
        const metadata = await conn.groupMetadata(groupId);
        const nomeGrupo = metadata.subject;
        const membros = metadata.participants.map(p => p.id);
        const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

        admins.forEach(adm => adminSet.add(adm));

        const qtdPedidos = pedidosPorGrupo[groupId];
        const desejado = maximo - qtdPedidos;
        const atual = membros.length;
        const quantidadeARemover = atual - desejado;

        if (quantidadeARemover <= 0) {
            console.log(`✅ ${nomeGrupo}: já está com espaço suficiente.`);
            continue;
        }

        console.log(`📦 ${nomeGrupo}: precisa remover ${quantidadeARemover} membros.`);
        console.log(`🔍 Analisando...`);

        const membrosNaoBR = membros.filter(m => !m.startsWith("55") && !adminSet.has(m));
        const membrosAleatorios = membros.filter(m => !adminSet.has(m) && !membrosNaoBR.includes(m));

        console.log(`🌎 Não-brasileiros: ${membrosNaoBR.length}`);
        console.log(`🎯 Candidatos aleatórios: ${membrosAleatorios.length}`);

        const removidos = {
            total: 0,
            inativos: 0, // não detectamos mais inativos, então será sempre 0
            naoBR: 0,
            aleatorio: 0
        };

        const tentarRemover = async (lista, motivo) => {
            for (const id of lista) {
                if (removidos.total >= quantidadeARemover) break;
                if (adminSet.has(id)) {
                    console.log(`👑 ${id} não foi removido pois é adm.`);
                    continue;
                }
                try {
                    await conn.groupParticipantsUpdate(groupId, [id], 'remove');
                    console.log(`❌ Removido ${id} do ${nomeGrupo}`);
                    removidos.total++;
                    removidos[motivo]++;
                    await delayAleatorio();
                } catch (e) {
                    console.log(`⚠️ Erro ao remover ${id}:`, e.message);
                }
            }
        };

        await tentarRemover(membrosNaoBR, 'naoBR');
        await tentarRemover(membrosAleatorios, 'aleatorio');

        removerInfo[nomeGrupo] = removidos;
    }

    let relatorioFinal = "📋 *Relatório Final de Limpeza de Espaço*\n\n";
    for (const [grupo, dados] of Object.entries(removerInfo)) {
        relatorioFinal += `📁 *${grupo}*\n`;
        relatorioFinal += `• 👥 Total removido: ${dados.total}\n`;
        relatorioFinal += `• 💤 Inativos: ${dados.inativos}\n`; // sempre 0
        relatorioFinal += `• 🌎 Não brasileiros: ${dados.naoBR}\n`;
        relatorioFinal += `• 🎯 Aleatórios: ${dados.aleatorio}\n\n`;
    }

    reply(relatorioFinal);
}
break;
    
    case 'banirduplicados': {
    if (!isOwner) return;

    const groupIds = [
        "120363224056553783@g.us", // Grupo 1
        "120363377012657553@g.us", // Grupo 2
        "120363375581849466@g.us", // Grupo 3
        "120363392730044316@g.us"  // Grupo 4
    ];

    const groupInfo = {};
    const memberMap = {};
    const adminSet = new Set();
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Coleta dados dos grupos
    for (let groupId of groupIds) {
        const metadata = await conn.groupMetadata(groupId);
        const members = metadata.participants.map(p => p.id);
        const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

        groupInfo[groupId] = {
            name: metadata.subject,
            members: new Set(members),
            admins: new Set(admins)
        };

        for (const id of members) {
            if (!memberMap[id]) memberMap[id] = new Set();
            memberMap[id].add(groupId);
        }

        admins.forEach(adm => adminSet.add(adm));
    }

    const duplicados = [];
    const ignoradosAdmins = [];

    for (const [id, groups] of Object.entries(memberMap)) {
        if (groups.size <= 1) continue;

        if (adminSet.has(id)) {
            ignoradosAdmins.push(id);
        } else {
            duplicados.push({ id, groups: [...groups] });
        }
    }

    // Log dos administradores ignorados
    for (const adm of ignoradosAdmins) {
        console.log(`${adm} não foi removido pois é adm.`);
    }

    // Mensagem inicial nos grupos
    for (const groupId of groupIds) {
        await conn.sendMessage(groupId, {
            text: `Iniciando banimento de duplicados. Adms não serão removidos.`
        });
    }

    let totalBanimentos = 0;

    // Banimento de duplicados de todos os grupos onde estão
    for (const { id, groups } of duplicados) {
        for (const groupId of groups) {
            try {
                await conn.groupParticipantsUpdate(groupId, [id], 'remove');
                console.log(`❌ ${id} removido do grupo ${groupInfo[groupId].name}`);
                totalBanimentos++;
                await delay(6000);
            } catch (e) {
                console.error(`Erro ao remover ${id} do grupo ${groupId}:`, e);
            }
        }
    }

    reply(`✅ Remoção completa.\nRealizei ${totalBanimentos} banimento(s), sendo eles ${duplicados.length} usuário(s) duplicado(s).\n🛡️ ${ignoradosAdmins.length} usuário(s) ignorado(s) por serem administradores.`);
}
break;

case 'remove200': {
    if (!isOwner) return;

    const grupo4 = "120363392730044316@g.us";
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const metadata = await conn.groupMetadata(grupo4);
    const allMembers = metadata.participants.map(p => p.id);
    const admins = metadata.participants.filter(p => p.admin).map(p => p.id);
    const adminSet = new Set(admins);

    // Log dos admins
    for (const adm of admins) {
        console.log(`${adm} não foi removido pois é adm.`);
    }

    // Filtra os que NÃO são admins
    const nonAdmins = allMembers.filter(id => !adminSet.has(id));

    // Embaralha e pega os primeiros 200
    const shuffled = nonAdmins.sort(() => 0.5 - Math.random());
    const toRemove = shuffled.slice(0, 200);

    // Mensagem inicial
    await conn.sendMessage(grupo4, {
        text: `Iniciando remoção aleatória de ${toRemove.length} membros (não administradores) do Grupo 4.`
    });

    // Remoção com delay
    for (const userId of toRemove) {
        try {
            await conn.groupParticipantsUpdate(grupo4, [userId], 'remove');
            console.log(`✅ ${userId} removido do grupo 4`);
            await delay(5000);
        } catch (e) {
            console.error(`❌ Erro ao remover ${userId}:`, e);
        }
    }

    reply(`✅ Remoção aleatória finalizada. Total removido: ${toRemove.length}`);
}
break;

    case 'banduplicados': {
    if (!isOwner) return;

    const groupIds = [
        "120363224056553783@g.us", // Grupo 1
        "120363377012657553@g.us", // Grupo 2
        "120363375581849466@g.us", // Grupo 3
        "120363392730044316@g.us"  // Grupo 4
    ];

    const groupInfo = {};
    const memberMap = {};
    const adminSet = new Set();
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Coleta dados dos grupos
    for (let groupId of groupIds) {
        const metadata = await conn.groupMetadata(groupId);
        const members = metadata.participants.map(p => p.id);
        const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

        groupInfo[groupId] = {
            name: metadata.subject,
            members: new Set(members),
            admins: new Set(admins)
        };

        for (const id of members) {
            if (!memberMap[id]) memberMap[id] = new Set();
            memberMap[id].add(groupId);
        }

        admins.forEach(adm => adminSet.add(adm));
    }

    const grupo4 = "120363392730044316@g.us";
    const grupo2 = "120363377012657553@g.us";

    const candidatosRemocao = [];
    const adminsIgnorados = [];

    for (const [id, groups] of Object.entries(memberMap)) {
        if (groups.has(grupo4) && groups.size > 1) {
            if (adminSet.has(id)) {
                adminsIgnorados.push(id);
            } else {
                candidatosRemocao.push(id);
            }
        }
    }

    // Log de administradores ignorados
    for (const adminId of adminsIgnorados) {
        console.log(`${adminId} não foi removido pois é adm.`);
    }

    // Mensagem de início
    await conn.sendMessage(grupo4, {
        text: `Iniciando remoção de ${candidatosRemocao.length} membro(s) duplicado(s) do Grupo 4 (caso estejam em qualquer outro grupo). Administradores não serão removidos.`
    });

    // Remove do grupo 4 com delay
    for (const userId of candidatosRemocao) {
        try {
            await conn.groupParticipantsUpdate(grupo4, [userId], 'remove');
            console.log(`✅ ${userId} removido do grupo 4`);
            await delay(2000);
        } catch (e) {
            console.error(`❌ Erro ao remover ${userId}:`, e);
        }
    }

    reply(`✅ Remoção finalizada.\n🔁 Removidos: ${candidatosRemocao.length}\n🛡️ Ignorados por serem administradores: ${adminsIgnorados.length}`);
}
break;
    
case 'ban': case 'banir': case 'kick': case 'remover':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
try {
if(!menc_os2 || menc_jid2[1]) return reply(`ℹ️ - *Marque um usuário ou a mensagem dele.*`)
if(!JSON.stringify(groupMembers).includes(menc_os2)) return
if(numeroBot.includes(menc_os2)) return reply('🥹 - Não posso me remover.')
if (groupAdmins.includes(menc_jid) || groupAdmins.includes(menc_os2)) return reply(`⚠️ - *Não é possível banir um administrador.*`);
if(JSON.stringify(numeroDono).indexOf(menc_os2) >= 0) return
conn.groupParticipantsUpdate(from, [menc_os2], "remove")
} catch (e) {
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break
case 'promover': case 'promote': 
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
if(!menc_os2 || menc_jid2[1]) return reply(`ℹ️ - Marque um usuário ou a mensagem dele.`)
if(!JSON.stringify(groupMembers).includes(menc_os2)) return
conn.groupParticipantsUpdate(from, [menc_os2], "promote")
break
case 'rebaixar': case 'demote':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
if(!menc_os2 || menc_jid2[1]) return reply(`ℹ️ - Marque um usuário ou a mensagem dele.`)
if(!JSON.stringify(groupMembers).includes(menc_os2)) return
conn.groupParticipantsUpdate(from, [menc_os2], "demote")
break
case 'abrir': case 'open': case 'abre':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
conn.groupSettingUpdate(from, 'not_announcement')	 
break 
case 'fechar': case 'close': case 'fecha':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
conn.groupSettingUpdate(from, 'announcement')			 
delay(500)
let msgvipp = `🌟 _Grupo VIP do Dallas Bot_ 🌟  

🎯 *Benefícios:*  
➖ _120 comandos diários_ (Free: 10)  
➖ _Acesso total_: Brincadeiras, 🔞 Conteúdo, Economia e mais.  
➖ _Uso PERMANENTE_ – pague uma vez, aproveite para sempre.  
➖ _Aberto 24h_, sem fechamentos repentinos.  

💵 _Valor: R$ 4,99_  
📲 _Adquira agora:_ dallasbot.site/#/gpvip  `
enviar2(msgvipp)
  break 
case 'todos':
case 'marcar':
case 'hidetag': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
let DFC = "";
var rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var pink = isQuotedImage ? rsm?.imageMessage: info.message?.imageMessage
var blue = isQuotedVideo ? rsm?.videoMessage: info.message?.videoMessage
var purple = isQuotedDocument ? rsm?.documentMessage: info.message?.documentMessage
var yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage: info.message?.documentWithCaptionMessage?.message?.documentMessage
var aud_d = isQuotedAudio ? rsm.audioMessage : ""
var figu_d = isQuotedSticker ? rsm.stickerMessage : ""
var red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue&& !purple && !yellow? rsm.conversation: info.message?.conversation
var green = rsm?.extendedTextMessage?.text || info?.message?.extendedTextMessage?.text
var MRC_TD = groupMembers.map(i => i.id)
if(pink && !aud_d && !purple) {
DFC = pink
pink.caption = q.length > 1 ? "⚠️"+q :pink.caption.replace(new RegExp(prefix+command, "gi"), `⚠️\n\n`)
pink.image = {url: pink.url}
pink.mentions = MRC_TD
} else if(blue && !aud_d && !purple) {
DFC = blue
blue.caption = q.length > 1 ? "⚠️"+q.trim() :blue.caption.replace(new RegExp(prefix+command, "gi"), `⚠️\n\n`).trim()
blue.video = {url: blue.url}
blue.mentions = MRC_TD
} else if(red && !aud_d && !purple) {
black = {}
black.text = red.replaceAll(new RegExp(prefix+command, "gi"), `⚠️\n\n`).replace(prefix, "© ").trim()
black.mentions = MRC_TD
DFC = black
} else if(!aud_d && !figu_d && green && !purple && !purple) {
brown = {}
brown.text = green.replace(new RegExp(prefix+command, "gi"), `⚠️\n\n`).trim()
brown.mentions = MRC_TD
DFC = brown
} else if(purple) {
DFC = purple
purple.document = {url: purple.url}
purple.mentions = MRC_TD
} else if(yellow && !aud_d) {
DFC = yellow 
yellow.caption = q.length > 1 ? "⚠️"+q.trim() :yellow.caption.replace(new RegExp(prefix+command, "gi"), `⚠️\n\n`).trim()
yellow.document = {url: yellow.url}
yellow.mentions = MRC_TD
} else if(figu_d && !aud_d) {
DFC = figu_d
figu_d.sticker = {url: figu_d.url}
figu_d.mentions = MRC_TD
} else if(aud_d) {
DFC = aud_d
aud_d.audio = {url: aud_d.url}
aud_d.mentions = MRC_TD
aud_d.ptt = true
}
conn.sendMessage(from, DFC).catch(e => {
sendOwner(e)
})
}
break
case 'antilink':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || !['1', '2', '3', '0'].includes(args[0])) {
return reply(`❗ *Uso incorreto do comando!*\nℹ️ Este comando controla o filtro de links no grupo.\n\n🛠️ *Modo de uso:*\n➤ *${prefix + command} [número]*\n\n📖 *Números disponíveis:*\n1️⃣ - *Excluir e banir o autor da mensagem com link*\n2️⃣ - *Excluir e advertir o autor da mensagem*\n3️⃣ - *Apenas excluir mensagens com link*\n0️⃣ - *Desativar o filtro de links*\n\n🪛 *Exemplo:*\n> ${prefix + command} 1\n(Apaga a mensagem e bane o autor do grupo)`)
}
if (Number(args[0]) === 1) {
dataGp[0].antilinkhard.enabled = true
dataGp[0].antilinkhard.action = 'ban_delete'
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if (Number(args[0]) === 2) {
dataGp[0].antilinkhard.enabled = true
dataGp[0].antilinkhard.action = 'warn_delete'
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if (Number(args[0]) === 3) {
dataGp[0].antilinkhard.enabled = true
dataGp[0].antilinkhard.action = 'delete'
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if (Number(args[0]) === 0) {
if (!dataGp[0].antilinkhard?.enabled) return reply("⚠️ *O filtro de links já está desativado.*")
dataGp[0].antilinkhard.enabled = false
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else {
return reply(`❗ *Uso incorreto do comando!*\nℹ️ Este comando controla o filtro de links no grupo.\n\n🛠️ *Modo de uso:*\n➤ *${prefix + command} [número]*\n\n📖 *Números disponíveis:*\n1️⃣ - *Excluir e banir o autor da mensagem com link*\n2️⃣ - *Excluir e advertir o autor da mensagem*\n3️⃣ - *Apenas excluir mensagens com link*\n0️⃣ - *Desativar o filtro de links*\n\n🪛 *Exemplo:*\n> ${prefix + command} 1\n(Apaga a mensagem e bane o autor do grupo)`)
}
break
case 'limitec': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o limite de caracteres no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapLimitec = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].msglongas?.enabled) return reply("⚠️ O limite já está desativado.");
dataGp[0].msglongas.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].msglongas.enabled = true;
dataGp[0].msglongas.action = actionMapLimitec[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;

case 'antiimagem': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de imagens no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiImagem = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiImagem?.enabled) return reply("⚠️ O controle de imagens já está desativado.");
dataGp[0].antiImagem.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiImagem.enabled = true;
dataGp[0].antiImagem.action = actionMapAntiImagem[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;
case 'antivideo': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de vídeos no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiVideo = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiVideo?.enabled) return reply("⚠️ O controle de vídeos já está desativado.");
dataGp[0].antiVideo.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiVideo.enabled = true;
dataGp[0].antiVideo.action = actionMapAntiVideo[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;
case 'antiaudio': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de áudios no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiAudio = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiAudio?.enabled) return reply("⚠️ O controle de áudios já está desativado.");
dataGp[0].antiAudio.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiAudio.enabled = true;
dataGp[0].antiAudio.action = actionMapAntiAudio[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;
case 'antidoc': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de documentos no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiDoc = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiDoc?.enabled) return reply("⚠️ O controle de documentos já está desativado.");
dataGp[0].antiDoc.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiDoc.enabled = true;
dataGp[0].antiDoc.action = actionMapAntiDoc[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;

case 'antisticker': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de stickers no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiSticker = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiSticker?.enabled) return reply("⚠️ O controle de stickers já está desativado.");
dataGp[0].antiSticker.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiSticker.enabled = true;
dataGp[0].antiSticker.action = actionMapAntiSticker[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;

case 'anticontato': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de contatos no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiContato = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiContato?.enabled) return reply("⚠️ O controle de contatos já está desativado.");
dataGp[0].antiContato.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiContato.enabled = true;
dataGp[0].antiContato.action = actionMapAntiContato[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;

case 'antilocalizacao': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de localizações no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiLocalizacao = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiLocalizacao?.enabled) return reply("⚠️ O controle de localizações já está desativado.");
dataGp[0].antiLocalizacao.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiLocalizacao.enabled = true;
dataGp[0].antiLocalizacao.action = actionMapAntiLocalizacao[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;

case 'anticatalogo': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de catálogos no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🪛 Exemplo: ${prefix + command} 1`);
}
let actionMapAntiCatalogo = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].antiCatalogo?.enabled) return reply("⚠️ O controle de catálogos já está desativado.");
dataGp[0].antiCatalogo.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
dataGp[0].antiCatalogo.enabled = true;
dataGp[0].antiCatalogo.action = actionMapAntiCatalogo[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
}
break;
case 'antipalavra': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length < 1 || ![0, 1, 2, 3].includes(Number(args[0]))) {
return reply(`❗ Uso incorreto do comando!\nℹ️ Este comando controla o envio de palavras no grupo.\n\n🛠️ Modo de uso:\n➤ ${prefix + command} [número]\n\n📖 Ações disponíveis:\n0 - Desativar.\n1 - Banir e excluir.\n2 - Advertir e excluir.\n3 - Apenas excluir.\n\n🔧 Comandos relacionados:\n➤ ${prefix}addpalavra [palavra] - Adiciona uma palavra ao sistema anti-palavra.\n➤ ${prefix}delpalavra [palavra] - Remove uma palavra do sistema.\n➤ ${prefix}listapalavra - Lista as palavras adicionadas.`);
}
let actionMapAntiPalavra = { 1: 'ban_delete', 2: 'warn_delete', 3: 'delete' };
if (Number(args[0]) === 0) {
if (!dataGp[0].palavrasProibidas?.enabled) return reply("⚠️ O controle de palavras já está desativado.");
dataGp[0].palavrasProibidas.enabled = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else if ([1, 2, 3].includes(Number(args[0]))) {
if (!palavrasP || palavrasP.length === 0) {
return reply(`⚠️ Nenhuma palavra foi definida! Para ativar o sistema anti-palavra, você precisa primeiro adicionar palavras com o comando:\n\n➤ ${prefix}addpalavra [palavra]`);
}
dataGp[0].palavrasProibidas.enabled = true;
dataGp[0].palavrasProibidas.action = actionMapAntiPalavra[Number(args[0])];
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} else {
return reply(`❗ Ação inválida! Utilize um número entre 0 e 3.\n🛠️ Exemplo: ${prefix + command} 1 - Para ativar e banir o usuário.\nConsulte os comandos relacionados: ${prefix}addpalavra, ${prefix}delpalavra e ${prefix}listapalavra.`);
}
}
break;
case 'addpalavra': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!q) return reply(`❌ - *Por favor, forneça uma palavra para adicionar.*`);
if (!palavrasP) palavrasP = [];
if (palavrasP.includes(q)) return reply(`❌ - *A palavra "${q}" já está na lista.*`);
palavrasP.push(q);
setGp(dataGp);
reply(`✔️ - *Palavra "${q}" adicionada com sucesso!*`);
}
break;
case 'delpalavra': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!q) return reply(`❌ - *Por favor, forneça uma palavra para remover.*`);
if (!palavrasP || !palavrasP.includes(q)) {
return reply(`❌ - *A palavra "${q}" não está na lista.*`);
}
const index = palavrasP.indexOf(q);
if (index > -1) palavrasP.splice(index, 1);
setGp(dataGp);
reply(`✔️ - *Palavra "${q}" removida com sucesso!*`);
}
break;

case 'listapalavra':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!palavrasP || palavrasP.length === 0) {
return reply(`❌ - *Não há palavras proibidas cadastradas.*`);
}
const palavras = palavrasP.join(', ');
reply(`🔒 - *Palavras proibidas no grupo:*\n${palavras}`);
break;
case 'autofigu': case 'autosticker':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`)
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`)
if(args.length < 1) return reply(`Digite ${prefix + command} 1 para ativar`)
if(Number(args[0]) === 1) {
if(isAutofigu) return reply('Ja esta ativo')
dataGp[0].autosticker = true
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if(Number(args[0]) === 0) {
if(!isAutofigu) return reply('Ja esta Desativado')
dataGp[0].autosticker = false
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else {
reply(`Digite *${prefix + command} 1* para ativar`)
}
break
case 'modobrincadeiras': case 'modobrincadeira':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(isModoBrincadeiras) return reply('Ja esta ativo')
dataGp[0].modos.brincadeiras = true
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if(Number(args[0]) === 0) {
if(!isModoBrincadeiras) return reply('Ja esta Desativado')
dataGp[0].modos.brincadeiras = false
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else {
reply('1 para ativar, 0 para desativar')
}
break
case 'modoeconomias': case 'modoeconomia':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if(!isAdvancedGroup && !isStandardGroup) return reply(`💰 • Os comandos de economia só podem ser usados em grupos standard ou advanced. Considere contratar usando *${prefix}grupo* para usar aqui 😉`)
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(isModoEconomia) return reply('Ja esta ativo')
dataGp[0].modos.economia = true
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if(Number(args[0]) === 0) {
if(!isModoEconomia) return reply('Ja esta Desativado')
dataGp[0].modos.economia = false
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else {
reply('1 para ativar, 0 para desativar')
}
break
case 'modo18':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isAdvancedGroup) return reply(`🔞 • Os comandos adultos só estão disponíveis em grupos advanced, se desejar ativar aqui no grupo, considere contratar o plano usando *${prefix}grupo*`)
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(isModo18) return reply('Ja esta ativo')
dataGp[0].modos.menu18 = true
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else if(Number(args[0]) === 0) {
if(!isModo18) return reply('Ja esta Desativado')
dataGp[0].modos.menu18 = false
setGp(dataGp)
conn.sendMessage(from, { react: { text: "✅", key: info.key }})
} else {
reply('1 para ativar, 0 para desativar')
}
break
case 'warnlimit': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args.length === 0 || isNaN(args[0])) return reply(`⚠️ - *Por favor, informe um número válido para o limite de advertências.*`);
const limit = parseInt(args[0]);
if (limit < 2 || limit > 20) return reply(`⚠️ - *O limite de advertências deve ser um número entre 2 e 20.*`);
dataGp[0].advertencias.warningLimit = limit;
setGp(dataGp);
reply(`✅ - *O limite de advertências foi definido para ${limit} neste grupo.*`);
}
break;

case 'advertir':
case 'adverter':
case 'warn':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!menc_os2) return;
if (menc_os2 == numeroBot) return;
if (menc_os2 == numeroDono) return;
if (groupAdmins.includes(menc_os2)) return;
if (!ADVT[menc_os2]) {
ADVT[menc_os2] = 0;
}
ADVT[menc_os2]++;
setGp(dataGp);
setTimeout(async () => {
var dfqn = ADVT[menc_os2];
var dfntxt = `_*@${menc_os2.split("@")[0]} advertido (${dfqn} de ${limiteAdv})*_`;
if (dfqn >= limiteAdv) {
conn.sendMessage(from, { text: `⏰ • @${menc_os2.split("@")[0]} Suas advertências foram batidas, já toleramos demais..`, mentions: [menc_os2] });
await delay(1000);
conn.groupParticipantsUpdate(from, [menc_os2], "remove");
delete ADVT[menc_os2];
setGp(dataGp);
} else {
mentions(dfntxt, [menc_os2]);
}
}, 1000);
break;
case 'unwarn':
case 'delwarn':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!menc_os2) return;
if (menc_os2 == numeroBot) return;
if (menc_os2 == numeroDono) return;
if (groupAdmins.includes(menc_os2)) return;
if (ADVT[menc_os2] > 0) {
ADVT[menc_os2]--;
setGp(dataGp);
reply(`✔️ - *Advertência retirada de @${menc_os2.split("@")[0]}.*`);
if (ADVT[menc_os2] === 0) {
delete ADVT[menc_os2];
}
} else {
reply(`❌ - *O usuário @${menc_os2.split("@")[0]} não possui advertências!*`);
}
break;
case 'warns':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!menc_os2) return reply(`👤 - *Mencione um usuário para verificar as advertências.*`); 
const userWarnings = dataGp[0].advertencias.users[menc_os2] || 0;
const warningLimit = dataGp[0].advertencias.warningLimit;  
if (userWarnings > 0) {
reply(`⚠️ - *@${menc_os2.split("@")[0]}* possui *${userWarnings}* advertências de *${warningLimit}* permitidas.`, [userWarnings], true);
} else {
mentions(`✅ - *@${menc_os2.split("@")[0]}* não tem advertências.`, [userWarnings], true);
}
break;
case 'check':
if (!isGroup) return reply('*Ops!* Este comando funciona apenas em grupos. 🚫');
if (groupIdscount.indexOf(from) < 0) return reply('Ainda não tenho dados sobre este grupo. 🤖');
var ind = groupIdscount.indexOf(from);
var userToCheck = menc_os2 ? menc_os2 : sender;
if (numbersIds.indexOf(userToCheck) >= 0) {
var indnum = numbersIds.indexOf(userToCheck);
var RSM_CN = countMessage[ind].numbers[indnum];
mentions(`🔍 *@${userToCheck.split('@')[0]}*, você tem *${RSM_CN.messages} mensagens*, e ja usou *${RSM_CN.cmd_messages}* comandos do bot.`, [userToCheck], true);
} else {
mentions(`Não tenho informações sobre esse usuário.`, [userToCheck], false);
}
break;
case 'antiflood':
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return;
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (args[0] === '1') {
const limiteMensagens = parseInt(args[1]);
const tempoIntervalo = parseInt(args[2]) * 1000;
const acaoAntiflood = args[3];
if (isNaN(limiteMensagens) || limiteMensagens < 5) return reply('❌ O limite mínimo de mensagens é 5. Use o comando da seguinte forma para ativar:\n\n*Exemplo:* `!antiflood 1 10 60 ban_delete`\n\n- `1` ativa o antiflood\n- `10` é o número máximo de mensagens permitidas em um intervalo\n- `60` é o intervalo de tempo em segundos\n- `ban_delete` é a ação (opções: `ban_delete`, `warn_delete`, `delete`)');
if (isNaN(tempoIntervalo) || tempoIntervalo > 5 * 60 * 1000) return reply('❌ O intervalo máximo é de 5 minutos (300 segundos). Use o comando da seguinte forma para ativar:\n\n*Exemplo:* `!antiflood 1 10 60 ban_delete`\n\n- `1` ativa o antiflood\n- `10` é o número máximo de mensagens permitidas em um intervalo\n- `60` é o intervalo de tempo em segundos\n- `ban_delete` é a ação (opções: `ban_delete`, `warn_delete`, `delete`)');
if (!['ban_delete', 'warn_delete', 'delete'].includes(acaoAntiflood)) return reply('❌ Ação inválida. Use as opções "ban_delete", "warn_delete" ou "delete". Exemplo:\n\n*Exemplo:* `!antiflood 1 10 60 ban_delete`\n\n- `1` ativa o antiflood\n- `10` é o número máximo de mensagens permitidas em um intervalo\n- `60` é o intervalo de tempo em segundos\n- `ban_delete` é a ação (opções: `ban_delete`, `warn_delete`, `delete`)');
dataGp[0].antiflood.enabled = true;
dataGp[0].antiflood.quantidade = limiteMensagens;
dataGp[0].antiflood.intervalo = tempoIntervalo;
dataGp[0].antiflood.action = acaoAntiflood;
await setGp(dataGp);
reply(`✅ Antiflood ativado com sucesso!\n\n*Configuração atual:*\n- Limite de mensagens: ${limiteMensagens}\n- Intervalo: ${(tempoIntervalo / 1000)} segundos\n- Ação: "${acaoAntiflood}"`);
} else if (args[0] === '0') {
dataGp[0].antiflood.enabled = false;
await setGp(dataGp);
reply('✅ Antiflood desativado com sucesso.\n\n*Exemplo de desativação:* `!antiflood 0`\n\n- `0` desativa o antiflood.');
} else {
reply('❌ Comando inválido. Use:\n\n*Para ativar:* `!antiflood 1 [limite de mensagens] [tempo em segundos] [ação]`\n*Para desativar:* `!antiflood 0`\n\n*Exemplos:*\n- Ativar: `!antiflood 1 10 60 ban_delete`\n- Desativar: `!antiflood 0`');
}
break;
case 'blockcmd':
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
const comandosInbloqueaveis = ['menu', 'blockcmd', 'unblockcmd', 'listcmd'];
if (!q) return reply(`❓ - *Especifique o comando que deseja bloquear.*`);
if (comandosInbloqueaveis.includes(q)) return reply(`🚫 - *O comando "${q}" não pode ser bloqueado.*`);
const comandosBloqueados = dataGp[0].comandosBloqueados || [];
if (comandosBloqueados.includes(q)) return reply(`⚠️ - *O comando "${q}" já está bloqueado.*`);
comandosBloqueados.push(q);
dataGp[0].comandosBloqueados = comandosBloqueados;
setGp(dataGp);
reply(`🔒 - *O comando "${q}" foi bloqueado com sucesso!*`);
break;
case 'unblockcmd':
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
if (!q) return reply(`❓ - *Especifique o comando que deseja desbloquear.*`);
const comandosBloqueadosDesbloqueio = dataGp[0].comandosBloqueados || [];
if (!comandosBloqueadosDesbloqueio.includes(q)) return reply(`⚠️ - *O comando "${q}" não está bloqueado.*`);
const indexToRemove = comandosBloqueadosDesbloqueio.indexOf(q);
comandosBloqueadosDesbloqueio.splice(indexToRemove, 1);
dataGp[0].comandosBloqueados = comandosBloqueadosDesbloqueio;
setGp(dataGp);
reply(`🔓 - *O comando "${q}" foi desbloqueado com sucesso!*`);
break;
case 'listcmd':
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
const listaComandosBloqueados = dataGp[0].comandosBloqueados || [];
if (listaComandosBloqueados.length === 0) return reply(`✅ - *Nenhum comando está bloqueado neste grupo.*`);
let listaTxt = `🔒 *Comandos bloqueados:* \n`;
listaComandosBloqueados.forEach(cmd => listaTxt += `⤷ ${cmd}\n`);
reply(listaTxt);
break;
case 'boton':
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return 
dataGp[0].botStatus = true;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
break;
case 'botoff':
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
dataGp[0].botStatus = false;
setGp(dataGp);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
break;
case 'block': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isGroupAdmins) return
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!args[1]) return reply(`❗ - *Formato inválido.* \n> Ex: ${prefix + command} @55xxxx 3h.\n_Use h para horas e d para dias._`)
let usuarioBloqueado = menc_jid; 
if (usuarioBloqueado.includes(" ")) usuarioBloqueado = usuarioBloqueado.split(" ")[0]; // Remove espaços extras
if (!usuarioBloqueado.endsWith("@s.whatsapp.net")) {
usuarioBloqueado += "@s.whatsapp.net";
}
if (usuarioBloqueado == numeroBot) return reply(`⚠️ - *O bot não pode ser bloqueado!*`);
if (usuarioBloqueado == numeroDono) return reply(`⚠️ - *O dono não pode ser bloqueado!*`);
if (groupAdmins.includes(usuarioBloqueado)) return reply(`⚠️ - *Administradores não podem ser bloqueados!*`);
let usuariosBloqueados = isGroup ? dataGp[0].usuariosBloqueados : undefined;
if (!usuariosBloqueados) {
dataGp[0].usuariosBloqueados = {};
usuariosBloqueados = dataGp[0].usuariosBloqueados;
}
let tempo = args[1].toLowerCase();
let tempoBloqueio = 0;
if (tempo.endsWith('d')) {
tempoBloqueio = parseInt(tempo) * 24 * 60 * 60 * 1000; // Dias em milissegundos
} else if (tempo.endsWith('h')) {
tempoBloqueio = parseInt(tempo) * 60 * 60 * 1000; // Horas em milissegundos
} else {
return reply(`❗ - *Tempo inválido. Use /tempo no formato correto (ex: /2h ou /3d).*`);
}
usuariosBloqueados[usuarioBloqueado] = new Date().getTime() + tempoBloqueio;
setGp(dataGp);
let dfntxt = `🔒 - *Usuário @${usuarioBloqueado.split('@')[0]} bloqueado por ${tempo}.*`;
mentions(dfntxt, [usuarioBloqueado]);

}
break;
case 'unblock': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!isBotGroupAdmins) return reply(`🤖 - *Promova o bot para admin antes.*`);
if (!marc_tds) return reply(`❗ - *Mencione o usuário que deseja desbloquear (ex: @55xxxx).*`);
if (!usuariosBloqueados || !usuariosBloqueados[marc_tds]) {
return reply(`⚠️ - *O usuário @${marc_tds.split('@')[0]} não está bloqueado.*`);
}
delete usuariosBloqueados[marc_tds];
setGp(dataGp);  // Salva os dados do grupo
let dfntxt = `🔓 - *Usuário @${marc_tds.split('@')[0]} desbloqueado com sucesso.*`;
mentions(dfntxt, [marc_tds]);

}
break;
case 'listblocks': {
if (!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if (!dataGp[0].usuariosBloqueados || Object.keys(dataGp[0].usuariosBloqueados).length === 0) {
let respostasSemBloqueados = [`✅ - *Ninguém está bloqueado... por enquanto!*`, `😇 - *Hoje estou de bom humor, ninguém está bloqueado.*`, `🕊️ - *Paz no grupo, nenhum bloqueado no momento.*`, `🤷‍♂️ - *Cadê os criminosos? Nada aqui por enquanto.*`, `🚫 - *Tudo limpo! Não há bloqueados aqui.*`, `🌟 - *O grupo está brilhando sem bloqueados.*`, `🎉 - *Que festa! Nenhum bloqueado por enquanto.*`, `🤔 - *Será que bloqueei errado? Nada aqui...*`];
return reply(respostasSemBloqueados[Math.floor(Math.random() * respostasSemBloqueados.length)]);
}
let introducoes = [`🤬 Usuários que vou moer na porrada:`, `🤭 Usuários que ficaram sem a honra de me usar:`, `🛑 Aqui está a lista negra do grupo:`, `⚡ Os desafortunados que cruzaram meu caminho:`, `🔥 Os que caíram na fúria do bot:`, `📜 Lista oficial dos indesejados:`, `💀 Os que desafiaram o sistema:`, `😡 Punições em vigor:`];
let introducao = introducoes[Math.floor(Math.random() * introducoes.length)];
let listaBloqueados = `${introducao}\n\n`;
let tempoAtual = new Date().getTime();
for (let usuario in dataGp[0].usuariosBloqueados) {
let tempoRestante = dataGp[0].usuariosBloqueados[usuario] - tempoAtual;
if (tempoRestante > 0) {
let minutos = Math.floor((tempoRestante / 1000) / 60) % 60;
let horas = Math.floor((tempoRestante / 1000) / 3600) % 24;
let dias = Math.floor((tempoRestante / 1000) / (3600 * 24));
listaBloqueados += `@${usuario.split('@')[0]} - `;
if (dias > 0) listaBloqueados += `${dias}d `;
if (horas > 0) listaBloqueados += `${horas}h `;
if (minutos > 0) listaBloqueados += `${minutos}m`;
listaBloqueados += ` restante\n`;
}
}
reply(listaBloqueados.trim());
}
break;
case 'setnamegp': {
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
var kls = q;
var pack = kls.split("/")[0];
var author2 = kls.split("/")[1];
if (!q.trim()) {
return reply(`💎 • *Este comando define o packname e author das figurinhas feitas pelo bot no grupo.*\n🏷️ Use ${prefix + command} packname/author`);
}
if (!pack || !author2) { return reply(`ℹ️️ - Use ${prefix + command} packname/author`); }
if (!dataGp[0].nomes) dataGp[0].nomes = {};
dataGp[0].nomes.packname = pack;
dataGp[0].nomes.author = author2;
setGp(dataGp);
reply(`🏷️ • *Feito!* _Agora as figurinhas feitas neste grupo terão as informações:_ *${pack} & ${author2}*.\n\n🚀 Teste com */ttp teste* e veja como ficou a figurinha!\n\n> ℹ️ _Usuarios que definirem os nomes manualmente com o comando ${prefix}setname não irão sofrer alterações nos nomes, caso deseje, bloqueie o comando._`);
}
break;
case 'resetnamegp': {
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
if (!dataGp[0].nomes || (!dataGp[0].nomes.packname && !dataGp[0].nomes.author)) {
return reply('ℹ️️ - Não há nomes personalizados definidos para este grupo.');
}
dataGp[0].nomes.packname = null;
dataGp[0].nomes.author = null;
setGp(dataGp);
reply('🏷️ • *Resetado!* - _As figurinhas feitas neste grupo agora terão o nome padrão do bot._');
}
break;
case 'definirhorario': case 'definirhr': case 'definirhora': {
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
if (!q) return reply(`⏰ • *Exemplo de uso:* ${prefix + command} 06:00/20:00 \n\n> O primeiro horário é o horário que o grupo abrirá todos os dias, e o segundo, que o bot fechará todos os dias.\n- No exemplo acima, o bot abre o grupo às 6h e fecha as 22h.`);
const horarios = q.split('/');
if (horarios.length !== 2) {
reply(`⏰ • *Exemplo de uso:* ${prefix + command} 06:00/20:00 \n\n> O primeiro horário é o horário que o grupo abrirá todos os dias, e o segundo, que o bot fechará todos os dias.\n- No exemplo acima, o bot abre o grupo às 6h e fecha as 22h.`);
return
}
const [novaAbertura, novoFechamento] = horarios;
const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
if (!regexHora.test(novaAbertura) || !regexHora.test(novoFechamento)) {
reply(`⏰ • *Exemplo de uso:* ${prefix + command} 06:00/20:00 \n\n> O primeiro horário é o horário que o grupo abrirá todos os dias, e o segundo, que o bot fechará todos os dias.\n- No exemplo acima, o bot abre o grupo às 6h e fecha as 22h.`);
return
}
if (!dataGp || !Array.isArray(dataGp) || dataGp.length === 0) {
console.log("dataGp não está inicializado corretamente.");
return;
}
dataGp[0].horarios.abertura = novaAbertura;
dataGp[0].horarios.fechamento = novoFechamento;
setGp(dataGp); 
conn.sendMessage(from, { react: { text: "✅", key: info.key }}); 
}
break;
case 'revelar': case 'rvvisu': case 'revelarvisu': case 'rvvisuunica':
RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage.viewOnceMessageV2?.message
ABC = RSM?.imageMessage || RSM?.videoMessage
if(!ABC) return reply("Marque uma visualização única, para eu revelar ela");
try {
const fileType = ABC?.mimetype?.split("/")[0];
if (!ABC || !fileType) throw new Error("Objeto ou mimetype inválido.");
const rst = await getFileBuffer(ABC, fileType);
await conn.sendMessage(from, { [fileType]: {url: rst}, caption: ABC?.caption + "\n\nRevelando a visualização única..." || "Revelando a visualização única..." });
} catch (e) {
console.error(e.message);
}
break;
case 'desempregados':   
if (!isGroup) return reply(`👨‍✈️ - *Comando disponível apenas em grupos!*`);
if (!isGroupAdmins) return
await LIMPARDOCNT_QUEMJASAIU()
var i3 = countMessage.map(i => i.groupId).indexOf(from)
var blue = countMessage[i3].numbers.map(i => i)
blue.sort((a, b) => ((a.figus == undefined ? a.figus = 0 : a.figus + a.messages + a.cmd_messages) < (b.figus == undefined ? b.figus = 0 : b.figus + b.cmd_messages + b.messages)) ? 0 : -1)
menc = [] 
blad = `
*Top 15 desempregados do grupo.*\n`
for ( i = 0; i < (blue.length < 15 ? blue.length : 15); i++) {
if (i != null) blad += `
${i + 1}º @${blue[i].id.split('@')[0]} - ${blue[i].messages}\n`
menc.push(blue[i].id)
}
mentions(blad, menc, false)
break
//=========( Brincadeiras )=============\\
case 'jogodavelha':
if (!isGroup) return;
if(!isModoBrincadeiras) return 
if (!menc_jid2 || menc_jid2.length === 0) return reply("Marque junto com o comando, o @ do usuário que deseja desafiar.");
if (!usarLimite()) return;
if (JOGO_D_V !== false) {
const boardnow = setGame(`${from}`);
const matrix = boardnow._matrix;
const chatMove = `*🎮 Jogo da Velha 🕹️*\n\n` +
`[❗] Alguém está jogando no momento...\n\n` +
`@${boardnow.X} VS @${boardnow.O}\n` +
`❌ : @${boardnow.X}\n` +
`⭕ : @${boardnow.O}\n` +
`*Sua vez :* @${boardnow.turn == "X" ? boardnow.X : boardnow.O}\n\n` +
`${matrix[0][0]}  |  ${matrix[0][1]}  |  ${matrix[0][2]}\n` +
`${matrix[1][0]}  |  ${matrix[1][1]}  |  ${matrix[1][2]}\n` +
`${matrix[2][0]}  |  ${matrix[2][1]}  |  ${matrix[2][2]}\n\n` +
`Caso queira resetar o jogo, mande um admin ou os jogadores que estão jogando utilizar o comando ${prefix}rv`;
mention(chatMove);
return;
}
const opponentId = menc_jid2[0].replace(/@.*$/, ""); // Remove '@s.whatsapp.net' ou outros domínios
const boardnow = setGame(`${from}`);
console.log(`Start No jogodavelha ${boardnow.session}`);
boardnow.status = false;
boardnow.X = sender.replace(SNET, "");
boardnow.O = opponentId;
var blabord = [`${boardnow.X}`, `${boardnow.O}`];
fs.writeFileSync(`./datab/armazenamento/ttt/${from}.json`, JSON.stringify(boardnow, null, 2));
const strChat = `*DESAFIO RECEBIDO*\n\n` +
`@${sender.replace(SNET, "")} _está te desafiando para uma partida de Jogo da Velha..._\n` +
`@${opponentId}, use *S* para aceitar ou *N* para não aceitar.\n\n` +
`Em caso de problemas, marque algum administrador para resetar o jogo com o comando ${prefix}rv`;
const b = [sender, menc_jid2[0]];
mentions(strChat, b, true);
break;
case 'resetarvelha':
case 'resetavelha':  
case 'resetarv':
case 'resetav': 
case 'resetvelha':
case 'rv': 
if(!sender.includes(JOGO_D_V?.X) && !sender.includes(JOGO_D_V?.O) && !isGroupAdmins) return reply(`Fale com algum dos jogadores que jogaram ou espere eles terminar para você jogar, se não tiver nenhum dos 2 online, fale com algum adm para digitar ${prefix}rv para resetar o jogo.`)
if (!usarLimite()) return;
if(fs.existsSync("./datab/armazenamento/ttt/" + from + ".json")) {
DLT_FL("./datab/armazenamento/ttt/" + from + ".json");
reply(`Jogo da velha resetado com sucesso nesse grupo!`);
} else {
removerLimite()
reply(`Não a nenhuma sessão em andamento...`);
}
break
case 'chance':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
var avb = body.slice(7)
if(args.length < 1) return conn.sendMessage(from, {text: `Você precisa digitar da forma correta\nExemplo: ${prefix}chance do dallas ser gostoso`}, {quoted: info})
random = `${Math.floor(Math.random() * 100)}`
hasil = `A chance ${body.slice(8)}\n\né de... ${random}%`
mention(hasil)
break
case 'nazista':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imgnazista}, caption: `O quanto você é nazista? \n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}%  nazista 卐`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'gay':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
feio = random
boiola = random
if(boiola < 20 ) {var bo = 'hmm... você é hetero😔'} else if(boiola == 21 ) {var bo = '+/- boiola'} else if(boiola == 23 ) {var bo = '+/- boiola'} else if(boiola == 24 ) {var bo = '+/- boiola'} else if(boiola == 25 ) {var bo = '+/- boiola'} else if(boiola == 26 ) {var bo = '+/- boiola'} else if(boiola == 27 ) {var bo = '+/- boiola'} else if(boiola == 2 ) {var bo = '+/- boiola'} else if(boiola == 29 ) {var bo = '+/- boiola'} else if(boiola == 30 ) {var bo = '+/- boiola'} else if(boiola == 31 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 32 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 33 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 34 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 35 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 36 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 37 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 3 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 39 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 40 ) {var bo = 'tenho minha desconfiança...😑'} else if(boiola == 41 ) {var bo = 'você é né?😏'} else if(boiola == 42 ) {var bo = 'você é né?😏'} else if(boiola == 43 ) {var bo = 'você é né?😏'} else if(boiola == 44 ) {var bo = 'você é né?😏'} else if(boiola == 45 ) {var bo = 'você é né?😏'} else if(boiola == 46 ) {var bo = 'você é né?😏'} else if(boiola == 47 ) {var bo = 'você é né?😏'} else if(boiola == 4 ) {var bo = 'você é né?😏'} else if(boiola == 49 ) {var bo = 'você é né?😏'} else if(boiola == 50 ) {var bo = 'você é ou não?🧐'} else if(boiola > 51) {var bo = 'você é gay🙈'
}
conn.sendMessage(from, {image: {url: imggay}, caption: `  O quanto você é gay? \n\n 「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}% gay 🏳️‍🌈\n\n${bo}`, mentions: [sender_ou_n], thumbnail:null}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'feio':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
feio = random
if(feio < 20 ) {var bo = 'É não é feio'} else if(feio == 21 ) {var bo = '+/- feio'} else if(feio == 23 ) {var bo = '+/- feio'} else if(feio == 24 ) {var bo = '+/- feio'} else if(feio == 25 ) {var bo = '+/- feio'} else if(feio == 26 ) {var bo = '+/- feio'} else if(feio == 27 ) {var bo = '+/- feio'} else if(feio == 2 ) {var bo = '+/- feio'} else if(feio == 29 ) {var bo = '+/- feio'} else if(feio == 30 ) {var bo = '+/- feio'} else if(feio == 31 ) {var bo = 'Ainda tá na média'} else if(feio == 32 ) {var bo = 'Da pra pegar umas(ns) novinha(o) ainda'} else if(feio == 33 ) {var bo = 'Da pra pegar umas(ns) novinha(o) ainda'} else if(feio == 34 ) {var bo = 'É fein, mas tem baum coração'} else if(feio == 35 ) {var bo = 'Tá na média, mas não deixa de ser feii'} else if(feio == 36 ) {var bo = 'Bonitin mas é feio com orgulho'} else if(feio == 37 ) {var bo = 'Feio e preguiçoso(a), vai se arrumar praga feia'} else if(feio == 3 ) {var bo = 'tenho '} else if(feio == 39 ) {var bo = 'Feio, mas um banho E se arrumar, deve resolver'} else if(feio == 40 ) {var bo = 'FeiN,  mas não existe gente feia, existe gente que não conhece os produtos jequity'} else if(feio == 41 ) {var bo = 'você é Feio, mas é legal, continue assim'} else if(feio == 42 ) {var bo = 'Nada que uma maquiagem e se arrumar, que não resolva 🥴'} else if(feio == 43 ) {var bo = 'Feio que dói de ver, compra uma máscara que melhora'} else if(feio == 44 ) {var bo = 'Feio mas nada que um saco na cabeça não resolva né!?'} else if(feio == 45 ) {var bo = 'você é feio, mas tem bom gosto'} else if(feio == 46 ) {var bo = 'Feio mas tem muitos amigos'} else if(feio == 47 ) {var bo = 'Feio mas tem lábia pra pegar várias novinha'} else if(feio == 4 ) {var bo = 'Feio e ainda não sabe se vestir, vixi'} else if(feio == 49 ) {var bo = 'Feiooo'} else if(feio == 50 ) {var bo = 'você é Feio, mas não se encherga 🧐'} else if(feio > 51) {var bo = 'você é Feio demais 🙈'} 
conn.sendMessage(from, {image: {url: imgfeio}, caption: `  O quanto você é feio? \n\n 「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}% feio 🙉\n\n${bo}`, mentions: [sender_ou_n], thumbnail:null}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'corno': case 'corna':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imgcorno}, caption: ` O quanto você é ${command}? \n\n 「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}%  corno 🐃`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'vesgo': case 'vesga':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imgvesgo}, caption: `O quanto você é ${command}? \n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}%  Vesgo 🙄😆`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'bebado': case 'bebada':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imgbebado}, caption:`O quanto você é ${command}? \n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}% Bêbado 🤢🥵🥴`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'gado':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imggado}, caption: `O quanto você é gado? \n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}%  gado 🐂`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'gostoso':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imggostoso}, caption: `O quanto você é gostoso? 😏\n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}% gostoso 😝`, gifPlayback: true, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'gostosa':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
try {
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {image: {url: imggostosa}, caption: `O quanto você é gostosa? 😏\n\n「 @${sender_ou_n.split("@")[0]} 」Você é: ${random}% gostosa 😳`, mentions: [sender_ou_n]}, {quoted: info})
}, 2000)
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'matar':
case 'mata':  
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if(!menc_os2 || menc_jid2[1]) return reply('marque o alvo que você quer matar, a mensagem ou o @')
if (!usarLimite()) return;
try {
conn.sendMessage(from, {video: {url: matarcmd}, gifPlayback: true, caption: `Você Acabou de matar o(a) @${menc_os2.split('@')[0]} 😈👹`, mentions: [menc_os2]}, {quoted: info})
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break 
case 'beijo':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
if(!menc_os2 || menc_jid2[1]) return reply('marque a pessoa que você quer beijar, a mensagem ou o @')
try {
conn.sendMessage(from, {video: {url: beijocmd}, gifPlayback: true, caption: `Você deu um beijo gostoso na(o) @${menc_os2.split('@')[0]} 😁👉👈❤` , mentions: [menc_os2]}, {quoted: info})
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'tapa':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
if(!menc_os2 || menc_jid2[1]) return reply('marque o alvo que você quer da um tapa, a mensagem ou o @')
try {
conn.sendMessage(from, {video: {url: tapacmd}, gifPlayback: true, caption: `Você acabou de da um tapa na raba da😏 @${menc_os2.split('@')[0]} 🔥`, mentions: [menc_os2]}, {quoted: info})
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'chute':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
if(!menc_os2 || menc_jid2[1]) return reply('marque o alvo que você quer da um chute, a mensagem ou o @')
try {
conn.sendMessage(from, {video: {url: chutecmd}, gifPlayback: true, caption: `Você Acabou de da um chute em @${menc_os2.split('@')[0]} 🤡`, mentions: [menc_os2]}, {quoted: info})
} catch (err) {
console.error(err);
conn.sendMessage(from, { react: { text: '❌', key: info.key } });
}
break
case 'dogolpe':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
if(!menc_os2 || menc_jid2[1]) return reply('Marque a mensagem com o comando ou marque o @ do usuário..')
random = `${Math.floor(Math.random() * 100)}`
conn.sendMessage(from, {text:`*GOLPISTA ENCONTRADO👉🏻*\n\n*GOLPISTA* : *@${menc_os2.split("@")[0]}*\n*PORCENTAGEM DO GOLPE* : ${random}%😂\n\nEle(a) gosta de ferir sentimentos 😢`, mentions: [menc_os2]})
break
case 'casal':
if(!isGroup) return reply(`👨‍✈️ - *Somente em grupos!*`);
if(!isModoBrincadeiras) return 
if (!usarLimite()) return;
mention(`*Hmmm.... Eu Shipo eles 2💘💘*\n\n1= @${groupMembers[Math.floor(Math.random() * groupMembers.length)].id.split('@')[0]}\ne esse\n2= @${groupMembers[Math.floor(Math.random() * groupMembers.length)].id.split('@')[0]}\ncom uma porcentagem de: ${Math.floor(Math.random() * 100)+"%"}`)
break

//=========(Estatistica)=============\\
case 'estatistica':
let stats = carregarEstatisticas();
let geral = stats['gerais'];
let mensal = stats['mensais'];
let semanal = stats['semanais'];
if (!usarLimite()) return;
if (q === 'mensal') {
let comandoMaisUsado = Object.entries(mensal.comandosUsados).reduce((a, b) => a[1] > b[1] ? a : b);
let horarioPico = Object.entries(mensal.horarioPico).reduce((a, b) => a[1] > b[1] ? a : b);
let respostaMensal = `📅 *Estatísticas Mensais*\n\n🎯 *Comandos*: _${mensal.comandos}_\n🎨 *Figurinhas criadas*: _${mensal.figurinhas}_\n📩 *Mensagens processadas*: _${mensal.mensagens}_\n\n🏆 *Comando mais usado*: ${comandoMaisUsado[0]} - _${comandoMaisUsado[1]}_\n\n⏰ *Horário de pico*: ${formatarHorario(horarioPico[0])}`
reply(respostaMensal);
} else if (q === 'semanal') {
let comandoMaisUsado = Object.entries(semanal.comandosUsados).reduce((a, b) => a[1] > b[1] ? a : b);
let horarioPico = Object.entries(semanal.horarioPico).reduce((a, b) => a[1] > b[1] ? a : b);
let respostaSemanal = `📅 *Estatísticas Semanais*\n\n🎯 *Comandos*: _${semanal.comandos}_\n🎨 *Figurinhas criadas*: _${semanal.figurinhas}_\n📩 *Mensagens processadas*: _${semanal.mensagens}_\n\n🏆 *Comando mais usado*: ${comandoMaisUsado[0]} - _${comandoMaisUsado[1]}_\n\n⏰ *Horário de pico*: ${formatarHorario(horarioPico[0])}`
reply(respostaSemanal);
} else {
let comandoMaisUsado = Object.entries(geral.comandosUsados).reduce((a, b) => a[1] > b[1] ? a : b);
let horarioPico = Object.entries(geral.horarioPico).reduce((a, b) => a[1] > b[1] ? a : b);
let respostaGeral = `📊 *Estatísticas Gerais*\n\n🎯 *Comandos*: _${geral.comandos}_\n🎨 *Figurinhas criadas*: _${geral.figurinhas}_\n📩 *Mensagens processadas*: _${geral.mensagens}_\n\n🏆 *Comando mais usado*: ${comandoMaisUsado[0]} - _${comandoMaisUsado[1]}_\n\n⏰ *Horário de pico*: _${formatarHorario(horarioPico[0])}_`
reply(respostaGeral);
}
break;
case 'top10':
if (!usarLimite()) return;
if (q === 'mensal') {
reply(formatarTopComandos('mensais'))
} else if (q === 'semanal') {
reply(formatarTopComandos('semanais'))
} else {
reply(formatarTopComandos('gerais'))
}
break
case 'perfil': {
const usuario = registros[sender];
const stickersFeitos = usuario.stickers;
const dataRegistro = usuario.datarg;
const escudos = coinsData[sender]?.escudos || 0;
const cliente = isOwner || isBasic || isPro || isUltimate || isSocio ? "sim" : "não";
const tipoCliente = isOwner ? "Dono" : isSocio ? "Sócio" : isBasic ? "Basic" : isPro ? "Pro" : isUltimate ? "Ultimate" : "N/A";
const limiteFinal = isSocio ? "∞" : limiteRestante;
const tempoFinal = isOwner || isSocio ? "∞" : tempoRestanteTexto || "⌛";

const mensagem = `
👋🏼 *${pushname}.*

> *Suas informações:*
🪙 Coins: _${verificarSaldo(sender)}_
🛡️ Escudos: _${escudos}_
🏁 Limite: _${limiteFinal}_
💭 Figurinhas criadas: _${stickersFeitos}_
📆 Registro no bot: _${dataRegistro}_

💎 Cliente: _${cliente}_
↪️ Tipo: _${tipoCliente}_
⌛ Tempo: _${tempoFinal}_
`;
reply(mensagem);
}
break;

//=========(Economia)=============\\
case 'coins': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let escudos = coinsData[sender]?.escudos || 0;
reply(`💰 Você tem *${verificarSaldo(sender)} coins*.\n🛡️ E possui *${escudos} escudo(s)*.`);
}
break;

case 'daily': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
if (!coinsData[sender]) registrarUsuarioCoin(sender);
let agora = new Date();
let ultimaDaily = coinsData[sender].lastDaily ? new Date(coinsData[sender].lastDaily) : null;
if (ultimaDaily && agora.toDateString() === ultimaDaily.toDateString()) {
reply(`🕰️ Você já coletou sua recompensa diária hoje! Volte amanhã para mais moedas.`);
break;
}
let recompensaDiaria = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
let saldoAnterior = verificarSaldo(sender);
adicionarSaldo(sender, recompensaDiaria);
coinsData[sender].lastDaily = agora.toISOString();
salvarCoinsData();
let novoSaldo = verificarSaldo(sender);
reply(`🎉 *Recompensa Diária Coletada!* 🎉\n\n💰 Saldo Anterior: *${saldoAnterior} coins*\n➕ Moedas Ganhas Hoje: *${recompensaDiaria} coins*\n🔹 Saldo Atual: *${novoSaldo} coins*\n\nAproveite suas moedas e volte amanhã para coletar mais!`);
}
break;
case 'transferir': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!isGroup) { reply(`❌ Este comando só pode ser usado em grupos.`); break; }
if (!usarLimite()) return;
if (!coinsData[sender]) { reply(`⚠️ Você precisa estar registrado para transferir coins.`); break; }
let mentionedUser = args.join(" ").match(/@(\w+)/);
if (!mentionedUser) { reply(`⚠️ Marque um usuário para transferir coins. Exemplo: *${prefix}transferir @usuario 100*`); break; }
let destinatario = mentionedUser[0].replace("@", "") + SNET;
if (!coinsData[destinatario]) { reply(`⚠️ O usuário marcado não está registrado no sistema.`); break; }
let quantia = parseInt(args[args.length - 1]); // Assume que a quantia é o último argumento
if (isNaN(quantia) || quantia < 50) { reply(`⚠️ O valor mínimo é 50 coins. Exemplo: *${prefix}transferir @usuario 100*`); break; }
if (verificarSaldo(sender) < quantia) { reply(`⚠️ Saldo insuficiente. Seu saldo: *${verificarSaldo(sender)} coins*`); break; }
removerSaldo(sender, quantia); adicionarSaldo(destinatario, quantia); salvarCoinsData();
mentions(`✅ *Transferência Concluída!*\n💸 *${quantia} coins enviados para @${destinatario.split('@')[0]}*\n💰 Novo saldo: *${verificarSaldo(sender)} coins*`, [destinatario], true);
}
break;
case 'escudo': case 'escudos': {
if (!coinsData[sender]) return reply("❌ Você ainda não está registrado no sistema de coins.");
if (!usarLimite()) return;
const saldoAtual = coinsData[sender].saldo;
const quantidade = args[0] ? parseInt(args[0]) : 0;
if (!quantidade) {
let explicacoes = ["💰 *Saldo atual*: _" + saldoAtual + " coins_\n🛡️ *Cada escudo custa*: _20 coins_\n✅ *Recomendamos*: _" + Math.floor((saldoAtual * 0.25) / 20) + " escudos_ (25% do saldo)\n📊 *Máximo que pode comprar*: _" + Math.floor(saldoAtual / 20) + " escudos_","🛡️ *Proteja suas coins agora!*\n💸 _Cada escudo custa 20 coins._\n🔐 Com seu saldo de *" + saldoAtual + " coins*, você pode comprar até *" + Math.floor(saldoAtual / 20) + " escudos*.\n✅ Recomendamos *" + Math.floor((saldoAtual * 0.25) / 20) + " escudos* para proteção ideal!","🔐 *Evite roubos!* 🛡️\n💰 _Seu saldo atual_: *" + saldoAtual + " coins*\n🛡️ _Preço por escudo_: *20 coins*\n📊 _Você pode comprar até_: *" + Math.floor(saldoAtual / 20) + " escudos*\n✅ *Recomendado*: *" + Math.floor((saldoAtual * 0.25) / 20) + " escudos* para mais segurança.","💸 *Proteja seu saldo com escudos!*\n🛡️ _Cada escudo custa 20 coins_\n💰 _Saldo atual_: *" + saldoAtual + " coins*\n✅ _Recomendado_: *" + Math.floor((saldoAtual * 0.25) / 20) + " escudos*\n📊 _Máximo que pode comprar_: *" + Math.floor(saldoAtual / 20) + " escudos*.","🔒 *Segurança em primeiro lugar!*\n💰 _Seu saldo_: *" + saldoAtual + " coins*\n🛡️ _Preço do escudo_: *20 coins*\n✅ _Recomendamos comprar_: *" + Math.floor((saldoAtual * 0.25) / 20) + " escudos* para proteger 25% do saldo.\n📊 _Máximo disponível_: *" + Math.floor(saldoAtual / 20) + " escudos*."];
return reply(explicacoes[Math.floor(Math.random() * explicacoes.length)] + `\n\n🛍️ _Exemplo de como comprar:_ ${prefix}escudo 2`);
}
if (isNaN(quantidade) || quantidade <= 0) return reply("❌ *Quantidade inválida!* Digite um número maior que 0.");
const custoTotal = quantidade * 20;
if (saldoAtual < custoTotal) return reply("❌ *Saldo insuficiente!*\n💸 _Você precisa de mais_ *" + (custoTotal - saldoAtual) + " coins* _para comprar_ *" + quantidade + " escudo(s)*.");
if (!coinsData[sender].escudos) coinsData[sender].escudos = 0;
coinsData[sender].escudos += quantidade;
coinsData[sender].saldo -= custoTotal;
salvarCoinsData();
let compras = ["✅ *Compra concluída!*\n🛡️ _Você adquiriu_ *" + quantidade + " escudo(s)* _por_ *" + custoTotal + " coins*.\n💰 _Saldo atual_: *" + coinsData[sender].saldo + " coins*\n🔒 _Proteção contra_ *" + quantidade + " roubo(s)* ativada!","🛡️ *Proteção garantida!*\n💸 _Foram comprados_ *" + quantidade + " escudo(s)* _por_ *" + custoTotal + " coins*.\n💰 _Saldo restante_: *" + coinsData[sender].saldo + " coins*\n🔐 _Agora você está livre de_ *" + quantidade + " roubo(s)*.","✔️ *Escudos ativados!*\n🛡️ _Você comprou_ *" + quantidade + " escudo(s)* _por_ *" + custoTotal + " coins*.\n💰 _Saldo disponível_: *" + coinsData[sender].saldo + " coins*\n🔒 _Livre de até_ *" + quantidade + " roubo(s)*!","🛡️ *Compra bem-sucedida!*\n💸 _Você adquiriu_ *" + quantidade + " escudo(s)* _por_ *" + custoTotal + " coins*.\n💰 _Saldo atual_: *" + coinsData[sender].saldo + " coins*\n🔒 _Proteção contra_ *" + quantidade + " roubo(s)* ativada!","✅ *Escudos garantidos!*\n🛡️ _Foram comprados_ *" + quantidade + " escudo(s)* _por_ *" + custoTotal + " coins*.\n💰 _Saldo restante_: *" + coinsData[sender].saldo + " coins*\n🔐 _Você está protegido contra_ *" + quantidade + " roubo(s)*."];
reply(compras[Math.floor(Math.random() * compras.length)]);
}
break;
case 'apostar': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let betAmount = parseInt(args[0]);
if (!betAmount) { reply(`⚠️ Insira um valor válido para apostar. Você deve apostar pelo menos 20 coins.`); return; }
if (isNaN(betAmount)) { reply(`⚠️ O valor deve ser um número.`); return; }
if (betAmount < 20) { reply(`⚠️ O valor mínimo para apostar é de 20 coins.`); return; }
if (betAmount > verificarSaldo(sender)) { reply(`⚠️ Você não tem saldo suficiente para apostar ${betAmount} coins.`); return; }
let fruits = ['🍒', '🍉', '🍇', '🍊', '🍋', '🍍', '🍓', '🍏'];
let result = [fruits[Math.floor(Math.random() * fruits.length)], fruits[Math.floor(Math.random() * fruits.length)], fruits[Math.floor(Math.random() * fruits.length)]];
let winChance = (isPro || isUltimate) ? 0.40 : 0.08;
let win = Math.random() < winChance && result[0] === result[1] && result[1] === result[2];
if (win) {
let winnings = betAmount * 8;
adicionarSaldo(sender, winnings);
reply(`🎉 Você apostou *${betAmount} coins* e ganhou! \n🎰 Resultado: ${result.join(' ')}. \nVocê agora tem *${verificarSaldo(sender)} coins*.`);
} else {
let counts = {};
result.forEach(fruit => counts[fruit] = (counts[fruit] || 0) + 1);
let maxFruit = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
let expected = counts[maxFruit] > 1 ? [maxFruit, maxFruit, maxFruit] : ['7️⃣', '7️⃣', '7️⃣'];
removerSaldo(sender, betAmount);
reply(`💔 Você apostou *${betAmount} coins* e perdeu! \n🎰 Resultado final: ${result.join(' ')} \n🎯 Resultado esperado: ${expected.join(' ')} \nVocê agora tem *${verificarSaldo(sender)} coins*.`);
}
}
break;

case 'roubar': {
if (!isGroup) return reply(`⚠️ Este comando só pode ser usado em grupos.`);
if (!usarLimite()) return;
let userToRob = menc_jid;
if (!coinsData[userToRob]) return reply(`⚠️ Usuário não registrado.`);
if (verificarSaldo(sender) < 40) {
let mensagensSaldo = [`⚠️ *Saldo insuficiente!* Você precisa de pelo menos 40 coins para roubar.`,`💸 *Ops!* Não é possível roubar com menos de 40 coins.`,`❌ *Sem saldo suficiente!* Adquira mais coins antes de tentar roubar.`,`⚠️ Você precisa ter no mínimo 40 coins para executar um roubo!`,`💰 *Saldo muito baixo!* Você não pode roubar sem ao menos 40 coins.`];
return reply(mensagensSaldo[Math.floor(Math.random() * mensagensSaldo.length)]);
}
if (coinsData[userToRob]?.escudos > 0) { 
coinsData[userToRob].escudos--; // Subtrai 1 escudo do usuário
const penalty = Math.floor(coinsData[sender].saldo / 3); // Penalidade de 1/4 do saldo do ladrão
removerSaldo(sender, penalty);
salvarCoinsData();
let mensagensEscudo = [`🛡️ *Roubo bloqueado!*\n🔒 O usuário estava protegido por um escudo misterioso.\n💔 Você perdeu *${penalty} coins* por tentar roubar alguém protegido.`,`❌ *Falha no roubo!*\n🛡️ O alvo estava protegido por um escudo secreto.\n💸 Penalidade aplicada: *${penalty} coins* deduzidos do seu saldo.`,`🔐 *Tentativa frustrada!*\n🛡️ O usuário tinha uma defesa ativa e você perdeu *${penalty} coins*.`,`⚠️ *Roubo impedido!*\n🔒 Um escudo invisível protegeu o alvo. Você perdeu *${penalty} coins*.`,`🛡️ *Proteção ativada!*\n💔 O roubo falhou e você perdeu *${penalty} coins*.`];
return reply(mensagensEscudo[Math.floor(Math.random() * mensagensEscudo.length)]);
}
let robChance = Math.random() < 0.3; 
let robAmount = Math.floor(coinsData[userToRob].saldo / 4) + 20;
if (robChance && coinsData[userToRob].saldo > 20) {
if (robAmount > coinsData[userToRob].saldo) robAmount = coinsData[userToRob].saldo; // Limita a quantidade a ser roubada
removerSaldo(userToRob, robAmount);
adicionarSaldo(sender, robAmount);
let mensagensSucesso = [`🎉 *Roubo bem-sucedido!*\n💸 Você roubou *${robAmount} coins* do usuário.`,`🤑 *Parabéns!*\nVocê conseguiu roubar *${robAmount} coins*!`,`✔️ *Você foi rápido!*\n💰 O roubo foi um sucesso e você levou *${robAmount} coins*.`,`🔥 *Missão cumprida!*\nVocê roubou *${robAmount} coins* com sucesso.`,`💸 *Roubo concluído!*\n🎉 Você levou *${robAmount} coins* do alvo.`];
mentions(mensagensSucesso[Math.floor(Math.random() * mensagensSucesso.length)], [userToRob], true);
} else {
let penalty = Math.floor(coinsData[sender].saldo / 5);
if (penalty > coinsData[sender].saldo) penalty = coinsData[sender].saldo; // Limita a penalidade ao saldo disponível
if (coinsData[userToRob].saldo < 20) {
let mensagensFalhaSemSaldo = [`💔 *Roubo falhou!*\n🔐 O usuário não tinha coins suficientes. Você perdeu *${penalty} coins* como penalidade.`,`⚠️ *Tentativa frustrada!*\n💸 O alvo não tinha saldo suficiente. Você perdeu *${penalty} coins*.`,`❌ *Sem coins no alvo!*\n🔒 Você tentou roubar, mas não havia coins disponíveis. Penalidade: *${penalty} coins*.`,`💔 *Nada encontrado!*\n⚠️ Você perdeu *${penalty} coins* ao tentar roubar um alvo sem saldo.`,`🔐 *Roubo vazio!*\n💸 O usuário estava sem saldo. Penalidade: *${penalty} coins*.`];
reply(mensagensFalhaSemSaldo[Math.floor(Math.random() * mensagensFalhaSemSaldo.length)]);
removerSaldo(sender, penalty);
} else {
let mensagensFalha = [`💔 *Roubo falhou!*\n⚠️ Você foi descoberto e perdeu *${penalty} coins*.`,`❌ *Tentativa mal-sucedida!*\n💸 Você perdeu *${penalty} coins* após ser pego tentando roubar.`,`🔐 *Falha total!*\n⚠️ Você não conseguiu roubar e perdeu *${penalty} coins*.`,`💔 *Descoberto!*\n🔒 Você perdeu *${penalty} coins* ao tentar roubar e falhar.`,`⚠️ *Roubo mal-sucedido!*\n💸 Penalidade aplicada: *${penalty} coins* deduzidos do seu saldo.`];
reply(mensagensFalha[Math.floor(Math.random() * mensagensFalha.length)]);
removerSaldo(sender, penalty);
}
}
}
break;
case 'chutar': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let guess = parseInt(args[0]);
if (isNaN(guess) || guess < 1 || guess > 10) {
reply(`⚠️ Chute um número entre 1 e 10.`);
return;
}
if (verificarSaldo(sender) < 30) {
reply(`⚠️ Você precisa ter pelo menos 30 coins para chutar.`);
return;
}
let randomNumber = Math.floor(Math.random() * 10) + 1;
if (guess === randomNumber) {
adicionarSaldo(sender, 150);
reply(`🎉 Parabéns! Você acertou o número *${randomNumber}* e ganhou 150 coins! Saldo: *${verificarSaldo(sender)} coins*.`);
} else {
removerSaldo(sender, 30);
reply(`😞 Você errou! O número era *${randomNumber}*. Você perdeu 30 coins. Saldo: *${verificarSaldo(sender)} coins*.`);
}
}
break;
case 'roletarussa': case 'rr': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let saldoAtual = verificarSaldo(sender);
if (saldoAtual < 100) 
return reply(`Você precisa de no mínimo 100 coins para jogar roleta russa. Seu saldo atual é de ${saldoAtual} coins.`);
let chanceDeVitoria = (isPro || isUltimate) ? 0.08 : 0.02;
if (Math.random() < chanceDeVitoria) {
let novoSaldo = saldoAtual * 20;
adicionarSaldo(sender, novoSaldo);
reply(`🎉 Incrível! Sua sorte na roleta russa multiplicou seu saldo por 20! Você ganhou ${novoSaldo} coins.`);
} else {
removerSaldo(sender, saldoAtual);
reply(`💥 Você perdeu tudo na roleta russa! Seu saldo foi zerado.`);
}
}
break;
case 'caraoucoroa': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let escolha = args[0], valorAposta = args[1];
if (!escolha || !valorAposta || isNaN(valorAposta) || valorAposta < 20 || !['cara', 'coroa'].includes(escolha)) return reply(`Escolha "cara" ou "coroa" e aposte no mínimo 20 coins. Exemplo: ${prefix + command} cara 20`);
if (verificarSaldo(sender) < valorAposta) return reply(`Saldo insuficiente! Você tem ${verificarSaldo(sender)} coins.`);
let chancePerder = isPro || isUltimate ? 0.5 : 0.7, resultadoMoeda = Math.random() < chancePerder ? (escolha === 'cara' ? 'coroa' : 'cara') : escolha;
let mensagensGanha = [`🎉 Deu ${resultadoMoeda}! Você ganhou ${valorAposta * (isPro || isUltimate ? 3 : 1)} coins!`, `🤩 Parabéns! ${resultadoMoeda} te deu vitória!`, `🥳 Vitória com ${resultadoMoeda}! Você faturou bem!`, `🙌 Você acertou: ${resultadoMoeda}! Que sorte!`, `🏆 Deu ${resultadoMoeda} e você levou a melhor!`, `🔥 ${resultadoMoeda} te garantiu uma boa vitória!`, `💸 Sucesso! ${resultadoMoeda} te rendeu um belo prêmio!`, `😎 Ganhou de novo! ${resultadoMoeda} te favoreceu!`, `💥 Resultado: ${resultadoMoeda}. Você está com tudo!`, `👏 Vitória incrível! Deu ${resultadoMoeda}!`, `🌟 Sorte grande! Deu ${resultadoMoeda} e você venceu!`, `💰 Que sorte! ${resultadoMoeda} foi seu aliado hoje!`, `😄 Resultado: ${resultadoMoeda}! Parabéns pela vitória!`, `✨ Que dia! Deu ${resultadoMoeda} e você ganhou!`, `🏅 Mais uma vitória! ${resultadoMoeda} brilhou pra você!`];  
let mensagensPerde = [`😔 Deu ${resultadoMoeda}. Você perdeu ${valorAposta} coins.`, `💔 Que pena! Deu ${resultadoMoeda}, que não foi sua escolha.`, `🙃 Caiu ${resultadoMoeda} e você perdeu! Tente de novo.`, `😢 ${resultadoMoeda}! Não foi dessa vez.`, `😩 O resultado foi ${resultadoMoeda}. Saldo reduzido.`, `🫤 Azar no jogo! ${resultadoMoeda} tirou sua chance.`, `😟 ${resultadoMoeda} não estava ao seu favor desta vez.`, `🤦‍♂️ Perdeu! ${resultadoMoeda} te deixou na mão.`, `😥 O resultado foi ${resultadoMoeda}. Que pena!`, `😞 Caiu ${resultadoMoeda} e você perdeu tudo!`, `😐 Infelizmente, deu ${resultadoMoeda}. Não foi desta vez.`, `🫣 ${resultadoMoeda} resultou em derrota. Tente de novo!`, `😢 Que azar! ${resultadoMoeda} foi o resultado.`, `🙁 Perdeu com ${resultadoMoeda}. Continue tentando!`, `😭 Saldo negativo! ${resultadoMoeda} não ajudou.`];
if (resultadoMoeda !== escolha) removerSaldo(sender, valorAposta), reply(mensagensPerde[Math.floor(Math.random() * mensagensPerde.length)]);
else adicionarSaldo(sender, valorAposta * (isPro || isUltimate ? 3 : 1)), reply(mensagensGanha[Math.floor(Math.random() * mensagensGanha.length)]);
}
break;
case 'dado': {
if (verificarSaldo(sender) < 30) {
reply(`⚠️ Você precisa ter pelo menos 30 coins para jogar.`);
return;
}
let stickdados = ['https://tinyurl.com/gdd01','https://tinyurl.com/gdd02','https://tinyurl.com/gdd003','https://tinyurl.com/gdd004','https://tinyurl.com/gdd05','https://tinyurl.com/gdd006'];
let chanceAcerto = isPro || isUltimate ? 1 : 1;
let dado = Math.floor(Math.random() * 6) + 1;
let numeroEscolhido = parseInt(args[0]);
if (isNaN(numeroEscolhido) || numeroEscolhido < 1 || numeroEscolhido > 6) {
reply(`⚠️ Escolha um número entre 1 e 6.`);
return;
}
let acertou = (numeroEscolhido === dado || Math.random() < chanceAcerto / 6);
let coinsGanhas = 0;
if (acertou) {
coinsGanhas = isPro || isUltimate ? 150 : 100;
adicionarSaldo(sender, coinsGanhas);
} else {
removerSaldo(sender, 30);
}
let stickerUrl = stickdados[dado - 1];
let mensagemPackname = acertou
? `🎲 Resultado: ACERTOU! 🎉\n🎯 Número sorteado: ${dado}\n💰 Coins ganhos: +${coinsGanhas}\n🪙 Saldo atual: ${verificarSaldo(sender)} coins`
: `🎲 Resultado: ERROU! 😞\n🎯 Número sorteado: ${dado}\n💸 Coins perdidos: -30\n🪙 Saldo atual: ${verificarSaldo(sender)} coins`;
let stickerBuffer = await fetch(stickerUrl).then(res => res.buffer());
await sendVideoAsSticker4(conn, from, stickerBuffer, info, { packname: mensagemPackname, author: `` });
}
break;

case 'top': {
if (isGroup && !(isStandardGroup || isAdvancedGroup)) return;
if (isGroup && !isModoEconomia) return;
if (!usarLimite()) return;
let topRanking = Object.entries(coinsData).sort((a, b) => b[1].saldo - a[1].saldo).slice(0, 3);
if (topRanking.length === 0) return reply("Ainda não há ninguém no ranking.");
let rankingMsg = `🏆 Ranking dos mais ricos:\n\n`;
rankingMsg += `🥇 1. @${topRanking[0][0].split('@')[0]}: ${topRanking[0][1].saldo} coins\n`;
rankingMsg += `🥈 2. @${topRanking[1][0].split('@')[0]}: ${topRanking[1][1].saldo} coins\n`;
rankingMsg += `🥉 3. @${topRanking[2][0].split('@')[0]}: ${topRanking[2][1].saldo} coins\n`;
let mentionsss = [topRanking[0][0], topRanking[1][0], topRanking[2][0]];
conn.sendMessage(from, { text: rankingMsg, mentionsss }, { quoted: info });
}
break;

//=========(Dono)=============\\
case 'aluguel': {
if (!isOwner) return reply('Somente o dono pode usar este comando.');
const [link, tipo, tempo] = args.join(' ').split('|').map(v => v.trim());
if (!link || !tipo || !tempo || !link.includes('chat.whatsapp.com/') || !['1', '2', '3', '4'].includes(tipo) || !/^\d+[mhd]$/.test(tempo)) {
reply(`🔑 *Tipos de Aluguel Disponíveis:*
1️⃣ Grupo - *free*: 25 comandos/dia
2️⃣ Grupo - *hobby*: 60 comandos/dia
3️⃣ Grupo - *standard*: 90 comandos/dia
4️⃣ Grupo - *advanced*: 120 comandos/dia

*Uso correto:* ${prefix}aluguel [link]|[tipo]|[tempo]
*Exemplo:* ${prefix}aluguel https://chat.whatsapp.com/xxxx | 3 | 30d`);
return;
}
(async () => {
try {
let groupLink = link.split('app.com/')[1];
let groupId = await conn.groupAcceptInvite(groupLink);
let groupMetadata = await conn.groupMetadata(groupId);
let groupName = groupMetadata.subject || "Grupo sem nome";
let msg = await conn.sendMessage(groupId, { text: "⏳ Processando aluguel, por favor aguarde..." });
let multiplicador = tempo.endsWith('m') ? 60000 : tempo.endsWith('h') ? 3600000 : 86400000;
let duracao = parseInt(tempo.slice(0, -1)) * multiplicador;
let planos = [
{ tipo: 'free', limite: 25 },
{ tipo: 'hobby', limite: 60 },
{ tipo: 'standard', limite: 90 },
{ tipo: 'advanced', limite: 120 }
];
let plano = planos[parseInt(tipo) - 1];
if (!plano) return reply('❌ Tipo de plano inválido.');
let dirGroup = `./datab/armazenamento/grupos/${groupId}.json`;
let dataGp = fs.existsSync(dirGroup) ? JSON.parse(fs.readFileSync(dirGroup)) : [{ ...data_IDGP[0], groupId, name: groupName }];
Object.assign(dataGp[0], {
tipoGrupo: plano.tipo,
limiteComandos: plano.limite,
tempoAluguelRestante: Date.now() + duracao
});
fs.writeFileSync(dirGroup, JSON.stringify(dataGp, null, 2));
await conn.sendMessage(groupId, {
text: `🎉 *Plano Ativado com Sucesso!*\n\n📋 *Plano:* ${plano.tipo} (${plano.limite} comandos/dia)\n⏳ *Duração:* ${tempo}\n📈 *Limite de Comandos Diários:* ${plano.limite}`,
edit: msg.key
});
await conn.sendMessage(groupId, { text: "✅ Bot configurado no grupo com sucesso! Aproveite o plano ativado." });
let msgDono = `💡 *Aluguel Ativado*\n\n📋 *Grupo:* ${groupName}\n🆔 *ID:* ${groupId}\n📦 *Plano:* ${plano.tipo}\n⏳ *Duração:* ${tempo}\n📈 *Limite:* ${plano.limite} comandos/dia`;
conn.sendMessage(`${numeroDono}@s.whatsapp.net`, { text: msgDono });
} catch (e) {
if (String(e).includes('resource-limit')) return reply('❌ O grupo já está com o alcance de 257 membros.');
if (String(e).includes('not-authorized')) return reply('❌ Não foi possível entrar no grupo.\nMotivo: Banimento.');
reply('❌ Ocorreu um erro inesperado.');
}
})();
break;
}

case 'gift': case 'giftaluguel': {
if (!isOwner) return;
const [tipo, tempo] = args.join(' ').split('/');
if (!tipo || !tempo || !['1', '2', '3', '4', '5', '6', '7'].includes(tipo) || !/^\d+[mhd]$/.test(tempo)) {
reply(`🔑 *Tipos de Aluguel Disponíveis:*
1️⃣ Grupo - *Free*: 25 comandos/dia
2️⃣ Grupo - *hobby*: 60 comandos/dia
3️⃣ Grupo - *standard*: 90 comandos/dia
4️⃣ Grupo - *advanced*: 120 comandos/dia
5️⃣ PV - *Basic*: 80 comandos/dia
6️⃣ PV - *pro*: 120 comandos/dia
7️⃣ PV - *ultimate*: 250 comandos/dia
 
*Uso correto:* ${prefix}giftaluguel [tipo]/[tempo]
*Exemplo:* ${prefix}giftaluguel 3/30d`);
return;
}
async function giftenviar(){
let multiplicador = tempo.endsWith('m') ? 60000 : tempo.endsWith('h') ? 3600000 : 86400000;
let duracao = parseInt(tempo.slice(0, -1)) * multiplicador;
let codigo = criarGift(parseInt(tipo), duracao);
await reply(`💌 _Obrigado por alugar nosso bot!_\n📦 *Tipo do Plano:* ${['Free (25 comandos/dia)', 'hobby (60 comandos/dia)', 'standard (90 comandos/dia)', 'advanced (120 comandos/dia)', 'basic (80 comandos/dia)', 'pro (120 comandos/dia)', 'ultimate (250 comandos/dia)'][parseInt(tipo) - 1]}  \n⏳ *Duração do Plano:* ${tempo}\n\n💡 _Para ativá-lo, basta copiar o código abaixo para seu respectivo aluguel (aluguel de grupo, envie no seu grupo) - (aluguel de pv, envie para o pv do bot). O seu plano será ativado automaticamente._\n🟢 _Qualquer dúvida, estamos à disposição!_\n\n${prefix}resgatar ${codigo}`);
delay(200)
}
giftenviar();
}
break;
case 'resgatar': {
if(isBot) return
if(isGroup && !isGroupAdmins) return
if (!args[0]) return 
let codigo = args[0];
let resultado = resgatarGift(codigo);
if (resultado) {
let detalhes = isGroup
? `🎉 *Gift Resgatado com Sucesso!*\n\n📋 *Plano:* _${dataGp[0].tipoGrupo}_\n⏳ *Duração:* ${formatarTempo(dataGp[0].tempoAluguelRestante - new Date().getTime())}\n📈 *Limite de Comandos Diários:* ${dataGp[0].limiteComandos}`
: `🎉 *Gift Resgatado com Sucesso!*\n\n📋 *Plano:* _${registros[sender].tipoVip}_\n⏳ *Duração:* ${formatarTempo(registros[sender].dataVip - new Date().getTime())}\n📈 *Limite de Comandos Diários:* ${registros[sender].limiteComandos}`;
reply(detalhes);
}
}
break;
case 'resetlimite': {
if (!isOwner) return 
resetarLimite();  
reply('✅ Limites de todos os grupos e usuários foram resetados com sucesso!');
}
break;
case 'fotobot':
if (!isOwner) return
if(!isQuotedImage) return reply(`Envie fotos com legendas ${prefix}fotobot ou tags de imagem que já foram enviadas`)
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
conn.updateProfilePicture(numeroBot, {url: buff})
reply('Obrigado pelo novo perfil😗')
break
case 'banghost':
if(!isGroup) return 
if (!isOwner) return
if(q.match(/[a-z]/i) || !q || q.length > 3) return reply(`Digite a partir de quantas mensagens pra baixo você deseja remover (que não interaje no grupo).\nExemplo: ${prefix+command} 0`)
var i2 = countMessage?.map(x => x.groupId)?.indexOf(from)
blue = []; for (i of countMessage[i2].numbers) {
if(i.messages <= Number(q.trim()))
if(i.figus <= Number(q.trim()))
if(i.cmd_messages <= Number(q.trim()))
if(!groupAdmins.includes(i.id))
if(!numeroDono.includes(i.id))
if(i.id != numeroBot)
if(groupMembers.map(i => i.id).includes(i.id))
blue.push(i.id)}; for ( i of countMessage[i2].numbers) {
if(!groupMembers.map(i => i.id).includes(i.id))
if(i.id.length > 5)
blue.push(i.id)}
if(blue.length == 0) return reply(`Não tem mais pessoas com ${q.trim()} mensagem(ns) para eu remover..`)
for ( i = 0; i < blue.length; i++) {
await delay(2000)
conn.groupParticipantsUpdate(from, [blue[i]], "remove")}
break
case 'sorteio':
if (!isOwner) return
let qtdCoins = parseInt(args[0]);
let qtdUsers = parseInt(args[1]);
if (!qtdCoins || !qtdUsers || qtdCoins < 1 || qtdUsers < 1) return reply("⚠️ Use: sorteio [quantidade de coins] [quantidade de usuários]");
if (qtdUsers > Object.keys(coinsData).length) return reply("⚠️ Não há usuários suficientes para o sorteio!");
let selectedUsers = [];
let allUsers = Object.keys(coinsData);
while (selectedUsers.length < qtdUsers) {
let randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
if (!selectedUsers.includes(randomUser)) selectedUsers.push(randomUser);
}
let totalCoins = qtdCoins;
selectedUsers.forEach(user => {
let randomAmount = Math.floor(Math.random() * (totalCoins / (selectedUsers.length - selectedUsers.indexOf(user))) + 1);
adicionarSaldo(user, randomAmount);
totalCoins -= randomAmount;
});
let resultMessage = "*🎉 Sorteio de Coins 🎉*\n\nDistribuição dos prêmios:\n";
selectedUsers.forEach((user, index) => {
resultMessage += `${index + 1}. @${user.split('@')[0]} - Ganhou ${coinsData[user].saldo} coins\n`;
});
mentions(resultMessage, selectedUsers, true);
break;

case 'addcoins': {
if (!isOwner) return 
let mentionedUser = args.join(" ").match(/@(\w+)/);
if (!mentionedUser) { reply(`⚠️ Marque um usuário para transferir coins. Exemplo: *${prefix}transferir @usuario 100*`); break; }
let destinatario = mentionedUser[0].replace("@", "") + SNET;
if (!coinsData[destinatario]) { reply(`⚠️ O usuário marcado não está registrado no sistema.`); break; }
let quantia = parseInt(args[args.length - 1]); // Assume que a quantia é o último argumento
adicionarSaldo(destinatario, quantia);
mentions(`✅ *${quantia} coins* adicionados ao usuário @${destinatario.split('@')[0]}. Saldo total: *${verificarSaldo(destinatario)} coins*`, [destinatario], true);
}
break;
case 'delcoins': {
if (!isOwner) return 
let mentionedUser = args.join(" ").match(/@(\w+)/);
if (!mentionedUser) { reply(`⚠️ Marque um usuário para transferir coins. Exemplo: *${prefix}transferir @usuario 100*`); break; }
let destinatario = mentionedUser[0].replace("@", "") + SNET;
if (!coinsData[destinatario]) { reply(`⚠️ O usuário marcado não está registrado no sistema.`); break; }
let quantia = parseInt(args[args.length - 1]); 
if (isNaN(quantia) || quantia <= 0 || verificarSaldo(destinatario) < quantia) return reply(`⚠️ Insira uma quantidade válida de coins a serem removidas ou saldo insuficiente.`);
removerSaldo(destinatario, quantia);
reply(`✅ *${amountToDel} coins* removidos do usuário @${userToDel.split('@')[0]}. Saldo total: *${verificarSaldo(userToDel)} coins*`);
}
break;
case 'zerarcoins': {
if (!isOwner) return 
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* @usuario ou +55 99 99999-9999`);
let quantia = verificarSaldo(marc_tds)
removerSaldo(marc_tds, quantia);
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
break
case 'addcoinsme': {
if (!isOwner && !isSocio) return 
let amountToAddMe = parseInt(args[0]);
if (isNaN(amountToAddMe) || amountToAddMe <= 0) return reply(`⚠️ Insira uma quantidade válida de coins a serem adicionadas.`);
adicionarSaldo(sender, amountToAddMe);
reply(`✅ *${amountToAddMe} coins* adicionados a você. Saldo total: *${verificarSaldo(sender)} coins*`);
}
break;
case 'reset': {
if (!isOwner) return;
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* @usuario ou +55 99 99999-9999`);
registros[marc_tds].packname_fig = null
registros[marc_tds].author_fig = null
salvarRegistros();
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
break
case 'blockuser':
if (!isOwner) return;
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* @usuario ou +55 99 99999-9999`);
const usuarioBan = registros[marc_tds];
if (!usuarioBan) return reply("Usuário não registrado.");
registros[marc_tds].banned = true;
salvarRegistros();
conn.updateBlockStatus(marc_tds, "block")
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
break;
case 'unblockuser':
if (!isOwner) return;
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* @usuario ou +55 99 99999-9999`);
const usuarioUnban = registros[marc_tds];
if (!usuarioUnban) return reply("Usuário não registrado.");
registros[marc_tds].banned = false;
salvarRegistros();
conn.updateBlockStatus(marc_tds, "unblock")
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
break;
case 'join': case 'entrar':
if(!isOwner) return
var string = args.join(' ')
if(!string) return reply('Insira um link de convite ao lado do comando.')
if(string.includes('chat.whatsapp.com/') || reply('Ops, verifique o link que você inseriu.') ) {
link = string.split('app.com/')[1]
try {
conn.groupAcceptInvite(`${link}`)
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
} catch(erro) {
if(String(erro).includes('resource-limit') ) {
reply('O grupo já está com o alcance de 257 membros.')
}
if(String(erro).includes('not-authorized') ) {
reply('Não foi possível entrar no grupo.\nMotivo: Banimento.')
}
}
}
break
case 'listagp':
if(!isOwner) return
var getGroups = await conn.groupFetchAllParticipating()
var groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
var ingfoo = groups.map(v => v)
ingfoo.sort((a, b) => (a[0] < b.length))
teks1 = `*LISTA DE GRUPOS*\n*Total de Grupos* : ${ingfoo.length}\n\n`
for (let i = 0; i < ingfoo.length; i++){

teks1 += `📌 *Grupo*: ${i}\n📝 *Nome do Grupo*: ${ingfoo[i].subject}\n🔍 *ID do Grupo*: ${ingfoo[i].id}\n🕒 *Criado*: ${moment(`${ingfoo[i].creation}` * 1000).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}\n👥 *Total de Membros*: ${ingfoo[i].participants.length}\n\n`
}
reply(teks1)
break
case 'addsaldo': {
if(!isOwner) return
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* (saldo) - marque a mensagem do usuário.`);
if(!q) return reply(`Digite o saldo na frente ne burro`)
registros[marc_tds].saldo += q
salvarRegistros();
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
break
case 'delsaldo': {
if(!isOwner) return
if (!marc_tds) return reply(`📣 • Use *${prefix + command}* (saldo) - marque a mensagem do usuário.`);
if(!q) return reply(`Digite o saldo na frente ne burro`)
registros[marc_tds].saldo -= q
salvarRegistros();
conn.sendMessage(from, { react: { text: "✅", key: info.key }});
}
break
case 'alugueis':
case 'alugueispv':
case 'aluguelpv':
case 'fatura':
case 'valores': {
if (!isOwner) return;

let agora = new Date();
let registrosAtivos = [];
let totalMes = 0;
let totalPrevisto = 0;
let planosContagem = { basic: 0, pro: 0, ultimate: 0 };
let planosValores = { basic: 7.90, pro: 11.90, ultimate: 15.90 };
let planosNomes = { basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate' };
let mentions = [];

for (let numero in registros) {
let r = registros[numero];
if (!r.tipoVip || r.dataVip < Date.now() || numero === numeroDono) continue;
let diasRestantes = Math.ceil((r.dataVip - Date.now()) / (1000 * 60 * 60 * 24));
if (diasRestantes > 100) continue;

let dataExp = new Date(r.dataVip);
let plano = r.tipoVip;
let nomePlano = planosNomes[plano] || plano;
let valorPlano = planosValores[plano] || 0;
let dataFormatada = dataExp.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false });

registrosAtivos.push({
numero,
dataExp,
dataFormatada,
nomePlano,
valorPlano
});
planosContagem[plano]++;
totalMes += valorPlano;
if (dataExp.getMonth() === agora.getMonth() && dataExp.getFullYear() === agora.getFullYear()) {
totalPrevisto += valorPlano;
}
}

if (registrosAtivos.length === 0) {
await conn.sendMessage(chat, { text: '⚠️ Nenhum usuário com plano ativo encontrado.' });
break;
}

registrosAtivos.sort((a, b) => a.dataExp - b.dataExp);

let lista = '🎟️ *LISTA DE USUÁRIOS COM VIP ATIVO*\n\n';
for (let r of registrosAtivos) {
let marca = `@${r.numero.split('@')[0]}`;
mentions.push(r.numero);
lista += `${marca} - *Plano ${r.nomePlano}* - R$${r.valorPlano.toFixed(2)}\n📅 *Expira em:* _${r.dataFormatada}_\n\n`;
}

let maisPerto = registrosAtivos[0];
let marcaMaisPerto = `@${maisPerto.numero.split('@')[0]}`;
if (!mentions.includes(maisPerto.numero)) mentions.push(maisPerto.numero);

let resumo =
`📌 *Usuário com plano mais próximo de vencer:*\n${marcaMaisPerto} - *Plano ${maisPerto.nomePlano}* - R$${maisPerto.valorPlano.toFixed(2)}\n📅 *Expira em:* _${maisPerto.dataFormatada}_\n\n`;

let resumoFaturamento =
`📊 *Resumo do Faturamento*\n` +
`🔸 Basic: ${planosContagem.basic} plano(s) x R$7,90 = R$${(planosContagem.basic * 7.90).toFixed(2)}\n` +
`🔸 Pro: ${planosContagem.pro} plano(s) x R$11,90 = R$${(planosContagem.pro * 11.90).toFixed(2)}\n` +
`🔸 Ultimate: ${planosContagem.ultimate} plano(s) x R$15,90 = R$${(planosContagem.ultimate * 15.90).toFixed(2)}\n\n` +
`💵 *Total de planos:* ${registrosAtivos.length}\n` +
`💸 *Total arrecadado este mês:* R$${totalMes.toFixed(2)}\n` +
`📅 *Valor previsto até o fim deste mês:* R$${totalPrevisto.toFixed(2)}`;

let textoFinal = lista + '➖➖➖➖➖➖➖\n' + resumo + resumoFaturamento;
await conn.sendMessage(from, { text: textoFinal, mentions });
break;
}
case 'limparregistros': {
if (!isOwner) return;

let totalAntes = Object.keys(registros).length;
let removidos = 0;
let novosRegistros = {};

for (let numero in registros) {
let user = registros[numero];
let tipoVip = (user.tipoVip || '').toLowerCase();
let vipValido = ['basic', 'pro', 'ultimate'].includes(tipoVip);
let temMuitosStickers = (user.stickers || 0) >= 50;
if (numero === numeroDono || vipValido || temMuitosStickers) {
novosRegistros[numero] = user;
} else {
removidos++;
}
}

registros = novosRegistros;
salvarRegistros();

let totalDepois = Object.keys(registros).length;
let texto = `🧹 *Limpeza de Registros Finalizada*\n\n` +
`📌 Total antes: *${totalAntes} usuários*\n` +
`❌ Removidos: *${removidos} usuários inúteis*\n` +
`✅ Total atual: *${totalDepois} usuários ativos*`;

reply(texto);
break;
}    
//=========( Downloads )=============\\
case 'kwai': {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
if(!q.trim().includes("kwai")) return reply(`🎥 • *Utilize ${prefix+command} [link do Kwai]`)
if (!usarLimite()) return;
try {
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/kwai?url=${q.trim()}&apikey=gst17199`}, mimetype: "video/mp4"}, {quoted: info})
} catch (e) {
console.log(e);
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
}
}
break;
case 'ytaudio': 
case 'play_audio':
case 'ytmp3':
case 'playaudio':
case 'playmp3':
case 'play': {
if (isFreeGroup && !isGroupAdmins) return reply(msgfg);
if (!q) return reply(`🎶 • *Utilize ${prefix + command} [nome do áudio]*`);
if (!usarLimite()) return;
try {
let data = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pesquisa_ytb?nome=${q}&apikey=gst17199`)
.catch(err => {
console.error("Erro ao buscar dados da API de pesquisa:", err);
conn.sendMessage(from, { react: { text: "❌", key: info.key } });
throw new Error("Não foi possível buscar informações. Tente novamente mais tarde.");
});
if (!data || !data[0]?.tempo) {
conn.sendMessage(from, { react: { text: "⚠️", key: info.key } });
return //reply("⚠️ Não foi possível encontrar resultados para o áudio solicitado.");
}
if (data[0]?.tempo?.length >= 7) {
removerLimite()
return conn.sendMessage(from, { react: { text: "🛑", key: info.key } });
}
let audioUrl = `https://api.bronxyshost.com.br/api-bronxys/play?nome_url=${q}&apikey=gst17199`;
let audioBuffer = await fetch(audioUrl)
.then(res => res.buffer())
.catch(err => {
console.error("Erro ao baixar o áudio:", err);
conn.sendMessage(from, { react: { text: "❌", key: info.key } });
throw new Error("Erro ao baixar o áudio. Tente novamente mais tarde.");
});
if (!audioBuffer || audioBuffer.length < 10240) {
return conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg", fileName: data[0]?.titulo || "dallas.mp3" }, { quoted: info });
}
await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg", ptt: true, fileName: data[0]?.titulo || "dallas.mp3" }, { quoted: info });
} catch (error) {
console.error("Erro no comando de reprodução de áudio:", error);
conn.sendMessage(from, { react: { text: "❌", key: info.key } });
removerLimite()
}
}
break;

case 'playdoc': case 'ytdoc':
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!q.trim()) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;
data = await reqapi.ytsearch(q.trim())
conn.sendMessage(from, {document: {url: reqapi.play(q.trim(), true)}, mimetype: "audio/mpeg", fileName: data[0]?.titulo+".mp3"}, {quoted: info}).catch(e => {
return reply("Erro..")
removerLimite()
})
} catch (e) {
removerLimite()
return reply("Erro...");
}
break;
case 'play_video':
case 'ytmp4':
case 'play_mp4':
case 'playmp4': 
case 'ytvideo':
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if (!q.trim()) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`);
if (!usarLimite()) return;
let videoUrl = `https://api.bronxyshost.com.br/api-bronxys/play_video?nome_url=${encodeURIComponent(q)}&apikey=gst17199`;
await conn.sendMessage(from, { video: { url: videoUrl }, mimetype: "video/mp4", fileName: "video.mp4" }, { quoted: info });
} catch (e) {
removerLimite();
return reply("Erro...");
}
break;
case 'tiktok':
case 'ttk':
try {
if (!q.includes("tiktok")) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;

const url = encodeURIComponent(q.trim());
let videoUrl;

// API 1 – TikWM
try {
const res = await fetch(`https://tikwm.com/api/?url=${url}`);
const data = await res.json();
videoUrl = data?.data?.play;
} catch {}

// API 2 – Musicaldown
if (!videoUrl) {
try {
const res = await fetch(`https://musicaldown.com/api/download?url=${url}`);
const data = await res.json();
videoUrl = data?.links?.nowatermark1;
} catch {}
}

// API 3 – Ttdownloader (exemplo genérico)
if (!videoUrl) {
try {
const res = await fetch(`https://api.luandz.com/tiktok?url=${url}`);
const data = await res.json();
videoUrl = data?.video;
} catch {}
}

if (!videoUrl) throw 'Nenhuma API respondeu corretamente.';

await conn.sendMessage(from, {
video: { url: videoUrl },
mimetype: "video/mp4",
caption: `✅ Aqui está!\nPara baixar só o áudio, use: ${prefix}tiktokaudio ${q.trim()}`
}, { quoted: info });

removerLimite();
} catch (e) {
console.error('Erro TikTok:', e);
removerLimite();
return conn.sendMessage(from, { react: { text: "❌", key: info.key }});
}
break;
case 'tiktokaudio':
case 'tiktok_audio':
case 'tta':
case 'ttka':
try {
if (!q.includes("tiktok")) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;

const url = encodeURIComponent(q.trim());
let audioUrl;

// API 1 – TikWM
try {
const res = await fetch(`https://tikwm.com/api/?url=${url}`);
const data = await res.json();
audioUrl = data?.data?.music;
} catch {}

// API 2 – Musicaldown
if (!audioUrl) {
try {
const res = await fetch(`https://musicaldown.com/api/download?url=${url}`);
const data = await res.json();
audioUrl = data?.links?.music;
} catch {}
}

// API 3 – Ttdownloader (exemplo genérico)
if (!audioUrl) {
try {
const res = await fetch(`https://api.luandz.com/tiktok?url=${url}`);
const data = await res.json();
audioUrl = data?.music;
} catch {}
}

if (!audioUrl) throw 'Nenhuma API respondeu corretamente.';

await conn.sendMessage(from, {
audio: { url: audioUrl },
mimetype: "audio/mpeg",
ptt: true
}, { quoted: info });

removerLimite();
} catch (e) {
console.error('Erro TikTok Áudio:', e);
removerLimite();
return conn.sendMessage(from, { react: { text: "❌", key: info.key }});
}
break;
case 'face_video': case 'facebook': case 'face': 
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!q.includes("facebook") && !q.includes("fb.watch")) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;
conn.sendMessage(from, {video: {url: reqapi.facebook(q.trim(), false)}, mimetype: "video/mp4", caption: `Se deseja baixar em formato audio, use o comando: ${prefix}face_audio ${q.trim()}`}).catch(e => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite();
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;
case 'face_audio': case 'faceaudio':
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!q.includes("facebook") && !q.includes("fb.watch")) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;
conn.sendMessage(from, {audio: {url: reqapi.facebook(q.trim(), true)}, mimetype: "audio/mpeg"}).catch(e => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite();
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;
case 'insta_video': case 'instagram': case 'insta':
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(q.length < 5) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;
ABC = await reqapi.instagram(q.trim())
let DM_T = ABC.msg[0].type
var A_T = DM_T === "mp4" ? "video/mp4" : DM_T === "webp" ? "image/webp" : DM_T === "jpg" ? "image/jpeg" : DM_T === "mp3" ? "audio/mpeg" : "video/mp4"
conn.sendMessage(from, {[A_T.split("/")[0]]: {url: ABC.msg[0].url}, mimetype: A_T, caption: `Se deseja baixar no formato áudio, use o comando: ${prefix}insta_audio ${q.trim()}`}, {quoted: info}).catch(e => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite();
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;
case 'insta_audio': case 'instaaudio':
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!q.trim()) return reply(`🔊 • *Utilize ${prefix + command} [ link ]*`)
if (!usarLimite()) return;
ABC = await reqapi.instagram(q.trim())
let DM_T = ABC.msg[0].type
var A_T = DM_T === "webp" ? "image/webp" : DM_T === "jpg" ? "image/jpeg" : DM_T === "mp3" ? "audio/mpeg" : "audio/mpeg"
conn.sendMessage(from, {[A_T.split("/")[0]]: {url: ABC.msg[0].url}, mimetype: A_T}, {quoted: info}).catch(e => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite();
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;

//=========(Buscas)=============\\
/*case 'spotify': {
if (!q) return reply(`🎶 • *Utilize ${prefix + command} [música]*`)
axios.get(`https://gst.squareweb.app/api/spotifysearch?query=${q}&apikey=gsttesao`)
.then(({ data }) => {
if (data.status !== 200 || !data.resultado.tracksArray.length) return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
let resultado = data.resultado.tracksArray[0] 
let artists = resultado.artists.map(artist => artist.name).join(", ") 
let duration = Math.floor(resultado.duration / 60000) + ':' + ((resultado.duration % 60000 / 1000).toFixed(0).padStart(2, '0')) 
let message = `🎶 • *Spotify - Resultado de busca para:* ${q}\n\n`
message += `🎤 • *Título:* ${resultado.title}\n`
message += `👤 • *Artistas:* ${artists}\n`
message += `⏳ • *Duração:* ${duration}\n`
message += `🔗 • *Link:* ${resultado.url}\n`
conn.sendMessage(from, { image: { url: resultado.thumb }, caption: message }, { quoted: info })
})
.catch(() => {
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
})
}
break
case 'amazon': {
if (!q) return reply(`🛒 • *Utilize ${prefix + command} [produto]*`)
axios.get(`https://gst.squareweb.app/api/amazon?nome=${q}&apikey=gsttesao`)
.then(({ data }) => {
if (data.status !== 200 || !data.resultado.length) return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
let resultado = data.resultado[0]
let message = `🛒 • *Amazon - Resultado de busca para:* ${q}\n\n`
message += `📦 • *Produto:* ${resultado.titulo}\n`
message += `💵 • *Preço:* ${resultado.valor}\n`
message += `🔗 • *Link:* ${resultado.link}\n`
conn.sendMessage(from, { image: { url: resultado.imagem }, caption: message }, { quoted: info })
})
.catch(() => {
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
})
}
break*/
case 'gimage':
try {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if(!q.trim()) return reply(`🔍 • *Utilize ${prefix+command} [termo de busca]*`)
if (!usarLimite()) return;
ABC = await reqapi.gimage(q.trim())
conn.sendMessage(from, {image: {url: ABC[Math.floor(Math.random() * ABC.length)].url}}).catch(() => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;
//=========(Outros)=============\\

//=========(IA)=============\\
case 'gpt': {
if(!q) return reply(`💬 • Use *${prefix+command}* (texto)`)
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!usarLimite()) return;
texx = `\n.`
const kk = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/PERGUNTE_E_EU_RESPONDO?q=${q}&apikey=maglock70`)
reply(`${kk.msg}`)
}
break;
case 'simi': case 'dallas': {
if(!q) return reply(`💬 • Use *${prefix+command}* (texto)`)
if (!usarLimite()) return;
textu = `Você é o Dallas, um bot de figurinhas criado pelo gst, que é conhecido como o cara mais lindo e gostoso do mundo. Ele é fiel à mulher dele e se orgulha de ter uma vara grande (apesar de às vezes ficar meio mole kkkk). Responda a todas as perguntas de forma sincera, com humor e usando gírias como se estivesse falando com um amigo. Suas respostas devem ser diretas e sem enrolação, como se fosse um jovem descolado.\n\nExemplo de resposta:\nPergunta: Eu sou bonito?\nResposta: Mano, meu criador me ensinou a não mentir, mas pra não te magoar, vou ficar na minha, tá? 😂\nCaso a pergunta seja sobre comandos, fale para ele verificar o menu usando /menu , caso queira usar o bot no pv ou adicionar no seu grupo, use /alugar\n\nPergunta para ser respondida conforme o solicitado:`
const kk = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/PERGUNTE_E_EU_RESPONDO?q=${textu + q}&apikey=maglock70`)
reply(`${kk.msg}`)
}
break
case 'imagine': case 'imagem': {
if(!q) return reply(`💬 • Use *${prefix+command}* (texto)`)
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!usarLimite()) return;
imagine22 = await image(q)
conn.sendMessage(from, { image: imagine22, viewOnce: true }, { quoted: info }).catch(() => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
})
}
break

//=========( Funcionais )=============\\
case 'toimg': case 'toimage': {
if (!(isSticker || isQuotedSticker)) {
return reply("Envie ou marque uma figurinha não animada para transformá-la em imagem!");
}
if (!usarLimite()) return;
try {
let stickerMessage = isQuotedSticker ? info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage : info.message.stickerMessage;
if (!stickerMessage) {
return conn.sendMessage(from, { react: { text: "⚠️", key: info.key }})
}
let stream = await downloadContentFromMessage(stickerMessage, 'sticker');
let buffer = Buffer.from([]);
for await (let chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
let stickerPath = path.join(__dirname, `sticker_${Date.now()}.webp`);
let imagePath = path.join(__dirname, `image_${Date.now()}.png`);
fs.writeFileSync(stickerPath, buffer);
await sharp(stickerPath).toFile(imagePath);
const imageBuffer = fs.readFileSync(imagePath);
await conn.sendMessage(from, { image: imageBuffer, caption: 'Aqui está sua imagem!' }, { quoted: info });
DLT_FL(stickerPath);
DLT_FL(imagePath);
} catch (error) {
removerLimite()
console.error(error);
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
}
break;
case 'toimg2':
if(!isQuotedSticker) return reply('❌ adesivo de resposta um ❌')
try {
if (!usarLimite()) return;
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
conn.sendMessage(from, {image: {url: buff}}, {quoted: info}).catch(e => {
console.log(e);
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
})
} catch {
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
}
break
// Case para converter figurinha animada para GIF (sem ffmpeg)
case 'togif3':
case 'togif4':
    if (!isQuotedSticker) return reply('*[ ❗ ] Marque uma figurinha animada!*');
    
    try {
        let quotedMsg = info.message.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage;
        if (!quotedMsg) return reply('*[ ❗ ] Ocorreu um erro ao obter a figurinha!*');

        let filePath = await convertStickerToMp4(quotedMsg);
        if (!filePath) return reply('*[ ❗ ] Erro ao converter a figurinha!*');

        await conn.sendMessage(from, { video: { url: filePath }, mimetype: 'video/mp4' }, { quoted: info });

        fs.unlinkSync(filePath); // Remove o MP4 depois do envio
    } catch (e) {
        console.log(e);
        reply('*[ ❗ ] Erro ao converter a figurinha!*');
    }
    break;

/*case 'steal': {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg);
try {
if(!isQuotedSticker) return reply(`☠️ - Para usar o ${prefix + command}, você precisa responder a um sticker com este comando!\n\n> Defina o nome padrão para todas suas novas figurinhas usando *${prefix}setname nome*\n- Ou use *${prefix}steal nome* para definir de cada figurinha.`);
const stickerBuffer = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
const packname = q ? q : packname_fig;
const author = q ? '' : author_fig;
if(stickerBuffer) {
let encmedia = await sendVideoAsSticker3(conn, from, stickerBuffer, { packname, author });
await DLT_FL(encmedia)
} else {
let encmedia = await sendImageAsSticker2(conn, from, stickerBuffer, { packname, author });
await DLT_FL(encmedia)
}
adicionarSticker(sender);
} catch (error) {
return reply(`😅 *Algo aconteceu!* - _Tente com outra figurinha_`);
}
}
break;*/
case 'toaudio': case 'tomp3': {
if (!(isVideo || isQuotedVideo)) {
return reply("Envie ou marque um vídeo para transformar em áudio!");
}
if (!usarLimite()) return;
try {
let media = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
if (!media) {
return conn.sendMessage(from, { react: { text: "⚠️", key: info.key }})
}
let stream = await downloadContentFromMessage(media, 'video');
let buffer = Buffer.from([]);
for await (let chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
let videoPath = path.join(__dirname, `video_${Date.now()}.mp4`);
let audioPath = path.join(__dirname, `audio_${Date.now()}.mp3`);
fs.writeFileSync(videoPath, buffer);
await new Promise((resolve, reject) => {
ffmpeg(videoPath)
.output(audioPath)
.audioCodec('libmp3lame')
.audioBitrate('96k')
.noVideo()
.on('end', resolve)
.on('error', reject)
.run();
});
const audioBuffer = fs.readFileSync(audioPath);
await conn.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mp4' }, { quoted: info });
DLT_FL(videoPath);
DLT_FL(audioPath);
} catch (error) {
removerLimite()
console.error(error);
conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
}
break;

case 'falar': {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!q) {
return reply("Por favor, envie um texto para eu transformar em áudio!");
}
if (!usarLimite()) return;
try {
let gTTS = require('gtts');
let audioPath = path.join(__dirname, `audio_${Date.now()}.mp3`);
let tts = new gTTS(q, 'pt-br');
tts.save(audioPath, async () => {
let audioBuffer = fs.readFileSync(audioPath);
await conn.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: info });
DLT_FL(audioPath);
});
} catch (error) {
removerLimite()
console.error(error);
reply("Ocorreu um erro ao gerar o áudio. Tente novamente.");
}
}
break;



//=========( Logos )=============\\
case 'angelwing':  case 'hackneon': case 'fpsmascote': 
case 'equipemascote': case 'txtquadrinhos': case 'ffavatar':
case 'mascotegame': case 'angelglx': case 'gizquadro': 
case 'wingeffect': case 'blackpink':
case 'girlmascote': case 'logogame':
try {
if(!q.trim()) return reply(`💬 • Use *${prefix+command}* (texto)`)
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!usarLimite()) return;
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos_EPH?texto=${q}&category=${command}&apikey=maglock70`);
conn.sendMessage(from, {image: {url: ABC.resultado}}, {quoted: info}).catch(() => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;
case 'shadow': case 'cup': case 'txtborboleta':
case 'cemiterio': case 'efeitoneon': case 'harryp':
case 'lobometal': case 'neon2': case 'madeira': case 'lovemsg3':
case 'coffecup': case 'coffecup2': case 'florwooden':
case 'narutologo': case 'fire': case 'romantic': case 'smoke':  
case 'papel': case 'lovemsg': case 'lovemsg2':
try {
if(!q.trim()) return reply(`💬 • Use *${prefix+command}* (texto)`)
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!usarLimite()) return;
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos_PHT?texto=${q}&category=${command}&apikey=gst17199`);
conn.sendMessage(from, {image: {url: ABC.resultado.imageUrl}}, {quoted: info}).catch(() => {
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
removerLimite()
})
} catch (e) {
removerLimite()
return conn.sendMessage(from, { react: { text: "❌", key: info.key }})
}
break;

//=========( +18 )=============\\

case 'pornvid': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
const pornvid = ['https://telegra.ph/file/4a270d9945ac46f42d95c.mp4', 'https://telegra.ph/file/958c11e84d271e783ea3f.mp4', 'https://telegra.ph/file/f753759342337c4012b3f.mp4', 'https://telegra.ph/file/379cee56c908dd536dd33.mp4', 'https://telegra.ph/file/411d8f59a5cefc2a1d227.mp4', 'https://telegra.ph/file/1e316b25c787f94a0f8fd.mp4', 'https://telegra.ph/file/c229d33edce798cde0ca4.mp4', 'https://telegra.ph/file/61486d45a8a3ea95a7c86.mp4', 'https://telegra.ph/file/76ba0dc2a07f491756377.mp4', 'https://telegra.ph/file/831bb88f562bef3f1a15d.mp4', 'https://telegra.ph/file/ee2cf1b359d6eef50d7b7.mp4', 'https://telegra.ph/file/598857924f3a29ffd37ae.mp4', 'https://telegra.ph/file/528caef6ea950ec45aeef.mp4', 'https://telegra.ph/file/958c11e84d271e783ea3f.mp4', 'https://telegra.ph/file/f753759342337c4012b3f.mp4', 'https://telegra.ph/file/379cee56c908dd536dd33.mp4', 'https://telegra.ph/file/411d8f59a5cefc2a1d227.mp4', 'https://telegra.ph/file/76ba0dc2a07f491756377.mp4', 'https://telegra.ph/file/831bb88f562bef3f1a15d.mp4',];
let enlace = pornvid[Math.floor(Math.random() * pornvid.length)];
conn.sendMessage(from, { video: {url: enlace }, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;
/*case 'pornvid3': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) {
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
}
if (!usarLimite()) return;
async function enviarVideo() {
try {
const pornvid = ['https://cdn77-vid-mp4.xvideos-cdn.com/JNYvEwK3cmuo6DPkTG5G7A==,1735937476/videos/mp4/c/f/7/xvideos.com_cf73b3472a4c6226ddcbf8ae4c591f32-1.mp4?ui=NDUuODcuNTEuNi0tL3ZpZGVvLmtpaWJibWJkZTA3L3NleA==', 'https://cdn77-vid-mp4.xvideos-cdn.com/JAXSssU-kWbHzTqkRnvN_g==,1735937514/videos/mp4/4/7/7/xvideos.com_477a75c6f4550d5dfd0bbd3f13503341.mp4?ui=MTg1LjcyLjI0MS4xMTAtLS92aWRlby51Zmx2dGl2ZWZjZi9zdGVwc2lzdGVyXw==', 'https://cdn77-vid-mp4.xvideos-cdn.com/luVfK2R0diSmAMc2cYm0kQ==,1735937546/videos/mp4/5/8/1/xvideos.com_581d8c992e20f05bb8591f400178673b.mp4?ui=OTIuMTEyLjE3Mi43Ni0tL3ZpZGVvLnVlaW1tbWZmMTdhL2Z1Y2tpbmdfc3Rl', ];
let enlace = pornvid[Math.floor(Math.random() * pornvid.length)];
await conn.sendMessage(from, { video: { url: enlace }, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
} catch (error) {
throw error; // Lança o erro para ser tratado pelo chamador
}
}
(async () => {
try {
await enviarVideo(); // Primeira tentativa
} catch (error) {
console.warn('Primeira tentativa falhou, tentando novamente:', error);
try {
await enviarVideo(); // Segunda tentativa
} catch (error) {
console.error('Segunda tentativa falhou:', error);
removerLimite();
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
})();
break;
}*/

case 'pornvid2': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
const pornvid2 = ["https://telegra.ph/file/1ba17f6230dd1ea2de48c.mp4", "https://telegra.ph/file/e04b802f12aafee3d314e.mp4", "https://telegra.ph/file/a58661697d519d3d0acbd.mp4",];
let enlace2 = pornvid2[Math.floor(Math.random() * pornvid2.length)];
conn.sendMessage(from, { video: {url: enlace2 }, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;

case 'ass': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwass.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch (error) {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;
case 'dick': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;

try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/pene.json';
let newLink = 'https://i.ibb.co/QbBbnBg/IMG-20250114-WA1037.jpg'; // Novo link a ser adicionado
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res, combinedLinks;

while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data; // Links do JSON
if (!Array.isArray(res)) res = []; // Garante que `res` é um array
combinedLinks = [...res, newLink]; // Adiciona o novo link ao array
randomImage = combinedLinks[Math.floor(Math.random() * combinedLinks.length)]; // Sorteio entre todos os links
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;


case 'petos': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/tetas.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;

case 'porn': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/porno.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;

case 'nfbdsm': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwbdsm.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;

case 'yuri': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/yuri.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;

case 'nfrandom': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let links = ['https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/tetas.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/booty.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/porno.json'];
let randomLink = links[Math.floor(Math.random() * links.length)];
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(randomLink)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;
case 'pechos': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/pechos.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;
case 'lesbicas': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite()
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;
case 'panties': {
if (isGroup && !isAdvancedGroup) return;
if (isGroup && !isModo18) return;
if (!isGroup && !isUltimate) 
return reply(`ℹ️ Somente usuários *Ultimate* podem usar este comando fora de grupos. Considere contratar o plano *Ultimate* usando o comando /pv.`);
if (!usarLimite()) return;
try {
let link = 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json';
let attempts = 0;
let maxAttempts = 4;
let img, randomImage, res;
while (attempts < maxAttempts) {
try {
res = (await axios.get(link)).data;
randomImage = res[Math.floor(Math.random() * res.length)];
img = await (await fetch(randomImage)).buffer();
if (img && img.length > 1024) {
conn.sendMessage(from, { image: img, caption: `🔞 Dallas bot - V2.0`, viewOnce: true }, { quoted: info });
return;
}
} catch {}
attempts++;
}
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
} catch (error) {
removerLimite();
conn.sendMessage(from, { text: '❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.' }, { quoted: info });
}
}
break;



//=========(Premium)=============\\
case 'setname': {
if(isFreeGroup && !isGroupAdmins) return reply(msgfg)
if (!usarLimite()) return;
var kls = q.trim();
if (!kls) return reply(`💎 • *Este comando define o packname e o author das suas figurinhas feitas pelo bot.*\n\n🏷️ • *Modo de usar:*\n1️⃣ - Para definir apenas o packname: *${prefix + command} NomeDoAuthor*\n2️⃣ - Para definir packname e author: *${prefix + command} packname/author*\n\n⚠️ - *Certifique-se de seguir o formato corretamente!*`);
if (kls.includes('/')) {
var pack = kls.split("/")[0];
var author2 = kls.split("/")[1];
if (!pack || !author2) return reply(`ℹ️️ - Use ${prefix + command} packname/author`);
registros[sender].packname_fig = pack;
registros[sender].author_fig = author2;
reply(`🏷️ • *Perfeito!* _Agora suas figurinhas não são feitas com o nome do bot. Os nomes definidos por você foram:_ *${pack} & ${author2}*.\n\n🚀 *Teste agora mesmo!* Envie uma foto com a legenda */s* para criar sua figurinha.\n\n⚠️ - Caso queira resetar os nomes para o padrão do bot, use: */resetname*`);
} else {
var author2 = kls;
registros[sender].packname_fig = author2
registros[sender].author_fig = ''
reply(`🏷️ • *Perfeito!* _Agora suas figurinhas terão o packname definido por você:_ *${author2}*.\n\n🚀 *Teste agora mesmo!* Envie uma foto com a legenda */s* para criar sua figurinha.\n\n⚠️ - Caso queira resetar os nomes para o padrão do bot, use: */resetname*`);
}
salvarRegistros();
}
break;
case 'resetname': {
if (!usarLimite()) return;
registros[sender].packname_fig = null
registros[sender].author_fig = null
salvarRegistros();
reply(`🏷️ • *Ótimo!* - _Suas novas figurinhas serão feitas com o nome padrão do bot!_`)
}
break
case 'limites': case 'limite': 
reply(`🔒 *Limites do bot* \n\n1. Os limites são por usuário; portanto, CADA usuário do seu grupo poderá usar a quantidade específica que foi contratada.\n2. Os limites são diários, então o seu limite será restaurado 100% todos os dias.\n3. Os limites não são acumulativos nem transferíveis.\n4. Os comandos de *figurinhas, exibição de menus e administrativos* NÃO irão gastar seu limite, sendo assim, ilimitados.\n5. Os comandos que derem erro ou forem executados de maneira incorreta NÃO gastarão seu limite.`)
break
case 'grupo': {
linkimg = `https://i.ibb.co/2kKhb6C/Aluguel-Grupo-20241223-181359-0000.png`
legenda = `🛒 *Alugue o bot para seu grupo!*\nhttps://dallasbot.site/#/planos`
reply(legenda)
}
break
case 'pv': {
linkimg = `https://i.ibb.co/D7qZvM5/Aluguel-Pv-20241223-201501-0000.png`
legenda = `🛒 *Alugue o bot para o pv!*\nhttps://dallasbot.site/#/planospv`
conn.sendMessage(from, { image: {url: linkimg}, caption: legenda }, { quoted: info });
}
break
    /*case 'fiction': case '3dstone': case 'areia': case 'style': 
case 'blood': case 'pink': case 'cattxt': case 'neondevil':
case 'carbon': case 'metalfire': case 'thunder': case 'vidro': 
case 'jokerlogo': case 'transformer': case 'demonfire':
case 'jeans': case 'metalblue': case 'natal': case 'ossos':
case 'asfalto': case 'break': case 'glitch2': case 'colaq':
case 'neon3': case 'nuvem': case 'horror': case 'matrix':
case 'berry': case 'luxury': case 'lava': case 'thunderv2':
case 'neongreen': case 'neve': case 'neon': case 'neon1':  
case 'neon3d': case 'gelo': case 'neon3': case '3dgold':
case 'lapis': case 'toxic': case 'demongreen': case 'rainbow':
case 'halloween':
if(!isPremium && !isOwner) return reply(soVip)
try {
if(!q.trim()) return reply(`🏷 • ️${prefix+command} texto aqui`);
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos?texto=${q}&category=${command}&apikey=gst17199`);
bufferImg(ABC.resultado);
} catch (e) {
removerLimite()
return reply("Erro...");
}
break;*/

//=========(Fim)=============\\
case 'menu':
case 'start':
case 'comandos':
if (Number(args[0]) === 1) {
reply(menu_fig(prefix))
} else if (Number(args[0]) === 2) {
reply(menu_down(prefix))
} else if (Number(args[0]) === 3) {
reply(menu_adm(prefix))
} else if (Number(args[0]) === 4) {
reply(pesquisas(prefix))
} else if (Number(args[0]) === 5) {
reply(economia(prefix, grupoEconomia))
} else if (Number(args[0]) === 6) {
reply(menubn(prefix, grupoBrincadeiras))
} else if (Number(args[0]) === 7) {
reply(menulogo(prefix))
} else if (Number(args[0]) === 8) {
reply(menu18(prefix, grupo18))
} else if (Number(args[0]) === 9) {
reply(ia(prefix))
} else {
reply(menu(prefix, pushname, datacomp, tempoRestanteTexto, limiteRestante))
}
break
case 'termos':
reply(termos(prefix))
break
case 'sobre':
reply(sobre(prefix))
break
case 'legiao':
case 'legião':
legion = `🐊 *Acesse o link principal do bot:* https://linktr.ee/DallasBot`
reply(legion)
break
case 'montagens':
reply(menumontagens(prefix))
break
case 'help': case 'hlp':
if (q === `s`) {
reply(`*🖼️ Comando:* \`${prefix}s\`\n\n*📄 Descrição:*\nCria figurinhas com formato de _preenchimento de tela_. Este comando gera figurinhas que ocupam toda a área visível, ideal para imagens impactantes.\n\n*📌 Como usar:*\n- Responda a uma imagem, vídeo ou GIF com \`${prefix}s\`.\n\n*💡 Exemplo:*\n_Responda a uma mídia com_ \`${prefix}s\`\n\n*✨ Dica:*\nCombine este comando com mídias de alta qualidade para melhores resultados.\n\n*⚠️ Observação:*\nCertifique-se de que a mídia tenha boas proporções para evitar cortes indesejados.`);
} else if (q === `f`) {
reply(`*🖼️ Comando:* \`${prefix}f\`\n\n*📄 Descrição:*\nGera figurinhas com formato _natural_, mantendo as proporções originais da mídia. Ideal para figurinhas autênticas.\n\n*📌 Como usar:*\n- Responda a uma imagem, vídeo ou GIF com \`${prefix}f\`.\n\n*💡 Exemplo:*\n_Responda a uma mídia com_ \`${prefix}f\`\n\n*✨ Dica:*\nUse este comando para criar figurinhas que não precisem de ajustes de formato.\n\n*⚠️ Observação:*\nÓtimo para imagens ou vídeos com proporções já otimizadas.`);
} else if (q === `toimg`) {
reply(`*🔄 Comando:* \`${prefix}toimg\`\n\n*📄 Descrição:*\nTransforma figurinhas (_stickers_) em imagens padrão, como *PNG* ou *JPEG*.\n\n*📌 Como usar:*\n- Envie uma figurinha e digite \`${prefix}toimg\`.\n\n*💡 Exemplo:*\n_Envie uma figurinha e use o comando_ \`${prefix}toimg\`\n\n*✨ Dica:*\nIdeal para recuperar imagens originais ou compartilhar em outros formatos.\n\n*⚠️ Observação:*\nA imagem convertida será enviada diretamente no chat.`);
} else if (q === `setname`) {
reply(`*🖊️ Comando:* \`${prefix}setname\`\n\n*📄 Descrição:*\nPersonalize o nome das figurinhas que você criará a partir deste momento.\n\n*📌 Como usar:*\n- Use \`${prefix}setname (nome desejado)\` para definir o novo nome das figurinhas.\n\n*💡 Exemplo:*\n\`${prefix}setname MinhasFigurinhas\`\n\n*✨ Dica:*\nEscolha nomes representativos para suas figurinhas para organizá-las melhor.\n\n*⚠️ Observação:*\nEste nome será usado até que você resete usando o comando \`${prefix}resetname\`.`);
} else if (q === `resetname`) {
reply(`*🔄 Comando:* \`${prefix}resetname\`\n\n*📄 Descrição:*\nReseta o nome das próximas figurinhas para o padrão do sistema.\n\n*📌 Como usar:*\n- Basta digitar \`${prefix}resetname\`.\n\n*💡 Exemplo:*\n\`${prefix}resetname\`\n\n*✨ Dica:*\nUtilize este comando quando não precisar mais de nomes personalizados.\n\n*⚠️ Observação:*\nApós resetar, todas as figurinhas criadas terão o nome padrão.`);
} else if (q === `emojimix`) {
reply(`*🌟 Comando:* \`${prefix}emojimix\`\n\n*📄 Descrição:*\nCombina dois emojis em um único novo emoji exclusivo.\n\n*📌 Como usar:*\n- Utilize \`${prefix}emojimix (emoji1)+(emoji2)\` para criar uma combinação.\n\n*💡 Exemplo:*\n\`${prefix}emojimix 😉+😁\`\n\n*✨ Dica:*\nTeste diferentes combinações para criar emojis únicos e expressivos.\n\n*⚠️ Observação:*\nNem todas as combinações são harmoniosas; experimente vários pares para melhores resultados.`);
} else if (q === `ban`) {
reply(`*🚫 Comando:* \`${prefix}ban\`\n\n*📄 Descrição:*\nRemove um usuário do grupo permanentemente.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}ban\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}ban\`\n\n*✨ Dica:*\nCertifique-se de que você tenha permissões de administrador para usar este comando.`);
} else if (q === `promote`) {
reply(`*⬆️ Comando:* \`${prefix}promote\`\n\n*📄 Descrição:*\nPromove um membro a administrador do grupo.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}promote\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}promote\`\n\n*✨ Dica:*\nUse para dar mais responsabilidades a usuários confiáveis.`);
} else if (q === `demote`) {
reply(`*⬇️ Comando:* \`${prefix}demote\`\n\n*📄 Descrição:*\nRemove as permissões de administrador de um usuário.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}demote\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}demote\`\n\n*✨ Dica:*\nCertifique-se de que a pessoa não precise mais das permissões antes de usar.`);
} else if (q === `close`) {
reply(`*🔒 Comando:* \`${prefix}close\`\n\n*📄 Descrição:*\nFecha o grupo, permitindo que apenas administradores enviem mensagens.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}close\`.\n\n*💡 Exemplo:*\n\`${prefix}close\`\n\n*✨ Dica:*\nUse em momentos importantes ou para organizar a conversa.`);
} else if (q === `open`) {
reply(`*🔓 Comando:* \`${prefix}open\`\n\n*📄 Descrição:*\nAbre o grupo para que todos os membros possam enviar mensagens.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}open\`.\n\n*💡 Exemplo:*\n\`${prefix}open\`\n\n*✨ Dica:*\nIdeal para retornar ao funcionamento normal do grupo.`);
} else if (q === `marcar`) {
reply(`*📢 Comando:* \`${prefix}marcar\`\n\n*📄 Descrição:*\nMarca todos os membros do grupo de forma invisível, sem que apareça visualmente.\n\n*📌 Como usar:*\n- Responda a uma mensagem sua com o comando \`${prefix}marcar\`.\n\n*💡 Exemplo:*\n_Responda com o comando_ \`${prefix}marcar\`\n\n*✨ Dica:*\nIdeal para chamar atenção de todos sem destacar os usuários diretamente.`);
} else if (q === `revelar`) {
reply(`*👁️ Comando:* \`${prefix}revelar\`\n\n*📄 Descrição:*\nExibe uma foto de visualização única no grupo.\n\n*📌 Como usar:*\n- Envie ou responda uma mídia de visualização única com o comando \`${prefix}revelar\`.\n\n*💡 Exemplo:*\n_Envie a foto com o comando_ \`${prefix}revelar\`\n\n*✨ Dica:*\nÚtil para salvar imagens de visualização única enviadas no grupo.`);
} else if (q === `definirhr`) {
reply(`*⏰ Comando:* \`${prefix}definirhr\`\n\n*📄 Descrição:*\nDefine os horários de abertura e fechamento automático do grupo.\n\n*📌 Como usar:*\n- Use o comando \`${prefix}definirhr (hora abertura)-(hora fechamento)\`.\n\n*💡 Exemplo:*\n\`${prefix}definirhr 08:00-22:00\`\n\n*✨ Dica:*\nÓtimo para manter o grupo organizado em horários específicos.`);
} else if (q === `setnamegp`) {
reply(`*🖊️ Comando:* \`${prefix}setnamegp\`\n\n*📄 Descrição:*\nDefine o nome padrão para todas as figurinhas feitas no grupo a partir do momento do comando.\n\n*📌 Como usar:*\n- Use \`${prefix}setnamegp (nome desejado)\`.\n\n*💡 Exemplo:*\n\`${prefix}setnamegp StickersDoGrupo\`\n\n*✨ Dica:*\nEscolha um nome representativo para identificar facilmente as figurinhas do grupo.`);
} else if (q === `resetnamegp`) {
reply(`*🔄 Comando:* \`${prefix}resetnamegp\`\n\n*📄 Descrição:*\nReseta o nome das figurinhas do grupo para o padrão.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}resetnamegp\`.\n\n*💡 Exemplo:*\n\`${prefix}resetnamegp\`\n\n*✨ Dica:*\nÚtil para retornar ao nome original das figurinhas após uma personalização.`);
} else if (q === `warn`) {
reply(`*⚠️ Comando:* \`${prefix}warn\`\n\n*📄 Descrição:*\nDá uma advertência a um usuário no grupo.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}warn\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}warn\`\n\n*✨ Dica:*\nUtilize este comando para controlar comportamentos inadequados.`);
} else if (q === `delwarn`) {
reply(`*🟢 Comando:* \`${prefix}delwarn\`\n\n*📄 Descrição:*\nRemove uma advertência de um usuário no grupo.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}delwarn\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}delwarn\`\n\n*✨ Dica:*\nIdeal para perdoar usuários após melhor comportamento.`);
} else if (q === `warns`) {
reply(`*📊 Comando:* \`${prefix}warns\`\n\n*📄 Descrição:*\nExibe o número de advertências de um usuário no grupo.\n\n*📌 Como usar:*\n- Mencione o usuário e use o comando \`${prefix}warns\`.\n\n*💡 Exemplo:*\n_@usuario com o comando_ \`${prefix}warns\`\n\n*✨ Dica:*\nAcompanhe advertências para manter o controle do grupo.`);
} else if (q === `warnlimit`) {
reply(`*⚙️ Comando:* \`${prefix}warnlimit\`\n\n*📄 Descrição:*\nDefine o limite máximo de advertências permitido no grupo.\n\n*📌 Como usar:*\n- Digite o comando \`${prefix}warnlimit (número)\`.\n\n*💡 Exemplo:*\n\`${prefix}warnlimit 3\`\n\n*✨ Dica:*\nEstabeleça limites claros para evitar expulsões frequentes.`);
} else if (q === `blockcmd`) {
reply(`*🚫 Comando:* \`${prefix}blockcmd\`\n\n*📄 Descrição:*\nBloqueia o uso de um comando para todos no grupo.\n\n*📌 Como usar:*\n- Digite \`${prefix}blockcmd (comando)\`.\n\n*💡 Exemplo:*\n\`${prefix}blockcmd ${prefix}s\`\n\n*✨ Dica:*\nÚtil para desativar temporariamente comandos desnecessários.`);
} else if (q === `unblockcmd`) {
reply(`*✅ Comando:* \`${prefix}unblockcmd\`\n\n*📄 Descrição:*\nDesbloqueia um comando para todos no grupo.\n\n*📌 Como usar:*\n- Digite \`${prefix}unblockcmd (comando)\`.\n\n*💡 Exemplo:*\n\`${prefix}unblockcmd ${prefix}s\`\n\n*✨ Dica:*\nUtilize para liberar comandos anteriormente bloqueados.`);
} else if (q === `listcmd`) {
reply(`*📜 Comando:* \`${prefix}listcmd\`\n\n*📄 Descrição:*\nLista todos os comandos bloqueados no grupo.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}listcmd\`.\n\n*💡 Exemplo:*\n\`${prefix}listcmd\`\n\n*✨ Dica:*\nVerifique os comandos desativados para manter controle sobre as funções.`);
} else if (q === `block`) {
reply(`*🔒 Comando:* \`${prefix}block\`\n\n*📄 Descrição:*\nBloqueia um usuário de usar o bot por tempo determinado.\n\n*📌 Como usar:*\n- Mencione o usuário e use \`${prefix}block @usuario 3h\` (use *h* para horas e *d* para dias).\n\n*💡 Exemplo:*\n\`${prefix}block @usuario 2d\`\n\n*✨ Dica:*\nControle temporariamente o uso do bot por membros problemáticos.`);
} else if (q === `unblock`) {
reply(`*🔓 Comando:* \`${prefix}unblock\`\n\n*📄 Descrição:*\nDesbloqueia um usuário para que volte a usar o bot.\n\n*📌 Como usar:*\n- Mencione o usuário e use \`${prefix}unblock @usuario\`.\n\n*💡 Exemplo:*\n\`${prefix}unblock @usuario\`\n\n*✨ Dica:*\nCertifique-se de que o comportamento do usuário está adequado antes de desbloquear.`);
} else if (q === `listblocks`) {
reply(`*🛑 Comando:* \`${prefix}listblocks\`\n\n*📄 Descrição:*\nMostra a lista de usuários bloqueados de usar o bot no grupo.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}listblocks\`.\n\n*💡 Exemplo:*\n\`${prefix}listblocks\`\n\n*✨ Dica:*\nMonitore os usuários bloqueados para avaliar desbloqueios futuros.`);
} else if (q === `boton`) {
reply(`*🤖 Comando:* \`${prefix}boton\`\n\n*📄 Descrição:*\nPermite que todos os membros do grupo utilizem o bot.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}boton\`.\n\n*💡 Exemplo:*\n\`${prefix}boton\`\n\n*✨ Dica:*\nUse quando quiser liberar acesso total ao bot para o grupo.`);
} else if (q === `botoff`) {
reply(`*🔐 Comando:* \`${prefix}botoff\`\n\n*📄 Descrição:*\nRestringe o uso do bot apenas para administradores do grupo.\n\n*📌 Como usar:*\n- Apenas digite o comando \`${prefix}botoff\`.\n\n*💡 Exemplo:*\n\`${prefix}botoff\`\n\n*✨ Dica:*\nIdeal para momentos em que o uso geral do bot precisa ser controlado.`);
} else if (q === `antilink`) {
reply(`*🔗 Comando:* \`${prefix}antilink\`\n\n*📄 Descrição:* Bloqueia o envio de links no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antilink._\n*1* - _Ativa apagando o link e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do link._\n*3* - _Ativa apenas apagando a mensagem do link._\n\n*📌 Como usar:* \`${prefix}antilink (número)\`\n\n*💡 Exemplo:* \`${prefix}antilink 1\`\n\n*✨ Dica:* Configure conforme a necessidade do grupo.`);
} else if (q === `limitec`) {
reply(`*✂️ Comando:* \`${prefix}limitec\`\n\n*📄 Descrição:* Define o limite máximo de caracteres para mensagens no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o limite._\n*1* - _Ativa apagando mensagens e removendo quem ultrapassou o limite._\n*2* - _Ativa dando advertência e apagando a mensagem._\n*3* - _Ativa apenas apagando a mensagem._\n\n*📌 Como usar:* \`${prefix}limitec (número)\`\n\n*💡 Exemplo:* \`${prefix}limitec 2\`\n\n*✨ Dica:* Use para evitar spam e mensagens muito longas.`);
} else if (q === `antiimagem`) {
reply(`*🖼️ Comando:* \`${prefix}antiimagem\`\n\n*📄 Descrição:* Bloqueia o envio de imagens no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antiimagem._\n*1* - _Ativa apagando a imagem e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem da imagem._\n*3* - _Ativa apenas apagando a mensagem da imagem._\n\n*📌 Como usar:* \`${prefix}antiimagem (número)\`\n\n*💡 Exemplo:* \`${prefix}antiimagem 1\`\n\n*✨ Dica:* Configure conforme a dinâmica do grupo.`);
} else if (q === `antivideo`) {
reply(`*🎥 Comando:* \`${prefix}antivideo\`\n\n*📄 Descrição:* Bloqueia o envio de vídeos no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antivideo._\n*1* - _Ativa apagando o vídeo e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do vídeo._\n*3* - _Ativa apenas apagando a mensagem do vídeo._\n\n*📌 Como usar:* \`${prefix}antivideo (número)\`\n\n*💡 Exemplo:* \`${prefix}antivideo 3\`\n\n*✨ Dica:* Ideal para grupos que desejam reduzir o envio de vídeos.`);
} else if (q === `antiaudio`) {
reply(`*🔊 Comando:* \`${prefix}antiaudio\`\n\n*📄 Descrição:* Bloqueia o envio de áudios no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antiaudio._\n*1* - _Ativa apagando o áudio e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do áudio._\n*3* - _Ativa apenas apagando a mensagem do áudio._\n\n*📌 Como usar:* \`${prefix}antiaudio (número)\`\n\n*💡 Exemplo:* \`${prefix}antiaudio 2\`\n\n*✨ Dica:* Configure para evitar distrações no grupo.`);
} else if (q === `antisticker`) {
reply(`*🖼️ Comando:* \`${prefix}antisticker\`\n\n*📄 Descrição:* Bloqueia o envio de figurinhas no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antisticker._\n*1* - _Ativa apagando a figurinha e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem da figurinha._\n*3* - _Ativa apenas apagando a mensagem da figurinha._\n\n*📌 Como usar:* \`${prefix}antisticker (número)\`\n\n*💡 Exemplo:* \`${prefix}antisticker 3\`\n\n*✨ Dica:* Útil para evitar excesso de figurinhas.`);
} else if (q === `antidoc`) {
reply(`*📄 Comando:* \`${prefix}antidoc\`\n\n*📄 Descrição:* Bloqueia o envio de documentos no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antidoc._\n*1* - _Ativa apagando o documento e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do documento._\n*3* - _Ativa apenas apagando a mensagem do documento._\n\n*📌 Como usar:* \`${prefix}antidoc (número)\`\n\n*💡 Exemplo:* \`${prefix}antidoc 1\`\n\n*✨ Dica:* Para evitar envios desnecessários de arquivos.`);
} else if (q === `anticontato`) {
reply(`*📞 Comando:* \`${prefix}anticontato\`\n\n*📄 Descrição:* Bloqueia o envio de contatos no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o anticontato._\n*1* - _Ativa apagando o contato e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do contato._\n*3* - _Ativa apenas apagando a mensagem do contato._\n\n*📌 Como usar:* \`${prefix}anticontato (número)\`\n\n*💡 Exemplo:* \`${prefix}anticontato 2\`\n\n*✨ Dica:* Evite envios de contatos não solicitados.`);
} else if (q === `antilocalizacao`) {
reply(`*📍 Comando:* \`${prefix}antilocalizacao\`\n\n*📄 Descrição:* Bloqueia o envio de localizações no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antilocalizacao._\n*1* - _Ativa apagando a localização e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem._\n*3* - _Ativa apenas apagando a mensagem._\n\n*📌 Como usar:* \`${prefix}antilocalizacao (número)\`\n\n*💡 Exemplo:* \`${prefix}antilocalizacao 1\`\n\n*✨ Dica:* Para evitar envios de locais desnecessários.`);
} else if (q === `anticatalogo`) {
reply(`*📦 Comando:* \`${prefix}anticatalogo\`\n\n*📄 Descrição:* Bloqueia o envio de catálogos no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o anticatalogo._\n*1* - _Ativa apagando o catálogo e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem do catálogo._\n*3* - _Ativa apenas apagando a mensagem do catálogo._\n\n*📌 Como usar:* \`${prefix}anticatalogo (número)\`\n\n*💡 Exemplo:* \`${prefix}anticatalogo 3\`\n\n*✨ Dica:* Útil para evitar promoções indesejadas.`);
} else if (q === `antipalavra`) {
reply(`*📛 Comando:* \`${prefix}antipalavra\`\n\n*📄 Descrição:* Bloqueia mensagens contendo palavras específicas no grupo. Escolha entre as opções abaixo:\n\n*0* - _Desativa o antipalavra._\n*1* - _Ativa apagando a mensagem e removendo quem enviou._\n*2* - _Ativa dando advertência e apagando a mensagem._\n*3* - _Ativa apenas apagando a mensagem._\n\n*📌 Comandos adicionais:*\n- *${prefix}addpalavra (palavra)*: Adiciona uma palavra à lista de palavras proibidas.\n- *${prefix}delpalavra (palavra)*: Remove uma palavra da lista de proibidas.\n- *${prefix}listapalavra*: Lista todas as palavras proibidas.\n\n*💡 Exemplo:* \`${prefix}antipalavra 1\`\n_Adicione palavras proibidas antes de ativar o comando._\n\n*✨ Dica:* Ideal para manter um ambiente respeitoso no grupo.`);
} else if (q === `addpalavra`) {
reply(`*➕ Comando:* \`${prefix}addpalavra\`\n\n*📄 Descrição:* Adiciona uma palavra à lista de palavras proibidas no grupo.\n\n*📌 Como usar:* \`${prefix}addpalavra (palavra)\`\n\n*💡 Exemplo:* \`${prefix}addpalavra insulto\`\n\n*✨ Dica:* Evite adicionar palavras comuns para evitar confusões.`);
} else if (q === `delpalavra`) {
reply(`*➖ Comando:* \`${prefix}delpalavra\`\n\n*📄 Descrição:* Remove uma palavra da lista de palavras proibidas no grupo.\n\n*📌 Como usar:* \`${prefix}delpalavra (palavra)\`\n\n*💡 Exemplo:* \`${prefix}delpalavra insulto\`\n\n*✨ Dica:* Use para corrigir erros ou liberar palavras específicas.`);
} else if (q === `listapalavra`) {
reply(`*📋 Comando:* \`${prefix}listapalavra\`\n\n*📄 Descrição:* Mostra todas as palavras proibidas configuradas no grupo.\n\n*📌 Como usar:* \`${prefix}listapalavra\`\n\n*✨ Dica:* Verifique regularmente para ajustar a lista conforme necessário.`);
} else if (q === `autosticker`) {
reply(`*🖼️ Comando:* \`${prefix}autosticker\`\n\n*📄 Descrição:* Ativa ou desativa o modo de criar figurinhas automaticamente, sem precisar de comandos. Responda com _0_ para desativar ou _1_ para ativar.\n\n*0* - _Desativa o modo automático de figurinhas._\n*1* - _Ativa o modo automático de figurinhas._\n\n*📌 Como usar:* \`${prefix}autosticker (número)\`\n\n*💡 Exemplo:* \`${prefix}autosticker 1\`\n\n*✨ Dica:* Com o modo ativo, todas as imagens, vídeos ou GIFs enviados no grupo se transformarão automaticamente em figurinhas.`);
} else if (q === `modobrincadeiras`) {
reply(`*🎮 Comando:* \`${prefix}modobrincadeiras\`\n\n*📄 Descrição:* Ativa ou desativa o acesso aos comandos de brincadeiras para todos os membros do grupo. Responda com _0_ para desativar ou _1_ para ativar.\n\n*0* - _Desativa os comandos de brincadeiras._\n*1* - _Ativa os comandos de brincadeiras._\n\n*📌 Como usar:* \`${prefix}modobrincadeiras (número)\`\n\n*💡 Exemplo:* \`${prefix}modobrincadeiras 1\`\n\n*✨ Dica:* Consulte os comandos disponíveis no menu de brincadeiras com \`${prefix}menu 6\`.`);
} else if (q === `modoeconomia`) {
reply(`*💰 Comando:* \`${prefix}modoeconomia\`\n\n*📄 Descrição:* Ativa ou desativa o acesso aos comandos de economia para todos os membros do grupo. Responda com _0_ para desativar ou _1_ para ativar.\n\n*0* - _Desativa os comandos de economia._\n*1* - _Ativa os comandos de economia._\n\n*📌 Como usar:* \`${prefix}modoeconomia (número)\`\n\n*💡 Exemplo:* \`${prefix}modoeconomia 1\`\n\n*✨ Dica:* Consulte os comandos disponíveis no menu de economia com \`${prefix}menu 5\`.`);
} else if (q === `modo18`) {
reply(`*🔞 Comando:* \`${prefix}modo18\`\n\n*📄 Descrição:* Ativa ou desativa o acesso aos comandos adultos para todos os membros do grupo. Responda com _0_ para desativar ou _1_ para ativar.\n\n*0* - _Desativa os comandos adultos._\n*1* - _Ativa os comandos adultos._\n\n*📌 Como usar:* \`${prefix}modo18 (número)\`\n\n*💡 Exemplo:* \`${prefix}modo18 1\`\n\n*✨ Dica:* Consulte os comandos disponíveis no menu adulto com \`${prefix}menu 8\`.`);
} else if (q === `gpt`) {
reply(`*🤖 Comando:* \`${prefix}gpt\`\n\n*📄 Descrição:* Realiza buscas ou interações com o ChatGPT. Use para obter respostas inteligentes, informações ou sugestões.\n\n*📌 Como usar:* \`${prefix}gpt (sua pergunta ou texto)\`\n\n*💡 Exemplo:* \`${prefix}gpt Qual é a capital da França?\`\n\n*✨ Dica:* Seja criativo nas perguntas para aproveitar ao máximo as respostas.`);
} else if (q === `dallas`) {
reply(`*🐊 Comando:* \`${prefix}dallas\`\n\n*📄 Descrição:* Interaja de forma divertida com o Dallas Bot. Ideal para conversas casuais ou comandos engraçados.\n\n*📌 Como usar:* \`${prefix}dallas (sua mensagem)\`\n\n*💡 Exemplo:* \`${prefix}dallas me conte uma piada\`\n\n*✨ Dica:* Teste frases engraçadas ou perguntas inesperadas para obter respostas criativas.`);
} else if (q === `clima`) {
reply(`*🌦️ Comando:* \`${prefix}clima\`\n\n*📄 Descrição:* Consulte as condições climáticas da sua cidade. Informe o nome da cidade junto ao comando.\n\n*📌 Como usar:* \`${prefix}clima (nome da cidade)\`\n\n*💡 Exemplo:* \`${prefix}clima São Paulo\`\n\n*✨ Dica:* Inclua o estado ou país, se necessário, para maior precisão.`);
} else if (q === `falar`) {
reply(`*🎙️ Comando:* \`${prefix}falar\`\n\n*📄 Descrição:* Converte um texto em áudio. Ideal para criar mensagens de voz personalizadas.\n\n*📌 Como usar:* \`${prefix}falar (seu texto)\`\n\n*💡 Exemplo:* \`${prefix}falar Olá, tudo bem?\`\n\n*✨ Dica:* Combine este comando com criatividade para criar mensagens engraçadas ou úteis.`);
} else if (q === `toaudio`) {
reply(`*🎧 Comando:* \`${prefix}toaudio\`\n\n*📄 Descrição:* Extrai o áudio de um vídeo ou converte vídeos em arquivos de áudio.\n\n*📌 Como usar:* Responda a um vídeo com o comando \`${prefix}toaudio\`\n\n*💡 Exemplo:* Envie um vídeo e responda com \`${prefix}toaudio\`\n\n*✨ Dica:* Funciona bem com vídeos curtos ou músicas baixadas.`);
} else if (q === `gimage`) {
reply(`*🖼️ Comando:* \`${prefix}gimage\`\n\n*📄 Descrição:* Busca imagens no Google com base no texto fornecido.\n\n*📌 Como usar:* \`${prefix}gimage (sua pesquisa)\`\n\n*💡 Exemplo:* \`${prefix}gimage pôr do sol na praia\`\n\n*✨ Dica:* Use palavras-chave específicas para resultados mais precisos.`);
} else if (q === `toimg2`) {
reply(`*📸 Comando:* \`${prefix}toimg2\`\n\n*📄 Descrição:* Converte figurinhas em imagens, caso o comando \`${prefix}toimg\` não funcione.\n\n*📌 Como usar:* Responda a uma figurinha com o comando \`${prefix}toimg2\`\n\n*💡 Exemplo:* Envie uma figurinha e responda com \`${prefix}toimg2\`\n\n*✨ Dica:* Funciona bem com figurinhas estáticas e animadas.`);
} else if (q === `imagine`) {
reply(`*✨ Comando:* \`${prefix}imagine\`\n\n*📄 Descrição:* Gera imagens baseadas no texto fornecido. Use sua criatividade para descrever a cena desejada.\n\n*📌 Como usar:* \`${prefix}imagine (sua descrição)\`\n\n*💡 Exemplo:* \`${prefix}imagine um dragão voando sobre uma cidade futurista\`\n\n*✨ Dica:* Seja detalhado na descrição para resultados mais impressionantes.`);
} else if (q === `perfil`) {
reply(`*🧍 Comando:* \`${prefix}perfil\`\n\n*📄 Descrição:* Exibe as informações do seu perfil dentro do bot, como moedas, nível e outros dados personalizados.\n\n*📌 Como usar:* \`${prefix}perfil\`\n\n*💡 Exemplo:* \`${prefix}perfil\`\n\n*✨ Dica:* Atualize suas informações participando das atividades do bot.`);
} else if (q === `estatistica`) {
reply(`*📊 Comando:* \`${prefix}estatistica\`\n\n*📄 Descrição:* Mostra as informações gerais de uso do bot, incluindo total de comandos usados, mensagens processadas e grupos mais ativos.\n\n*📌 Como usar:* \`${prefix}estatistica\`\n\n*💡 Exemplo:* \`${prefix}estatistica\`\n\n*✨ Dica:* Use este comando para acompanhar o impacto do bot nos grupos.`);
} else if (q === `estatistica semanal`) {
reply(`*📅 Comando:* \`${prefix}estatistica semanal\`\n\n*📄 Descrição:* Exibe as estatísticas de uso do bot na última semana, como comandos usados e atividades dos grupos.\n\n*📌 Como usar:* \`${prefix}estatistica semanal\`\n\n*💡 Exemplo:* \`${prefix}estatistica semanal\`\n\n*✨ Dica:* Consulte semanalmente para monitorar tendências de uso.`);
} else if (q === `estatistica mensal`) {
reply(`*📆 Comando:* \`${prefix}estatistica mensal\`\n\n*📄 Descrição:* Apresenta as estatísticas de uso do bot no último mês, incluindo dados sobre os comandos mais populares e grupos ativos.\n\n*📌 Como usar:* \`${prefix}estatistica mensal\`\n\n*💡 Exemplo:* \`${prefix}estatistica mensal\`\n\n*✨ Dica:* Utilize no início de cada mês para uma visão completa do período anterior.`);
} else if (q === `top10`) {
reply(`*🔝 Comando:* \`${prefix}top10\`\n\n*📄 Descrição:* Lista os 10 comandos mais usados no bot em todos os tempos.\n\n*📌 Como usar:* \`${prefix}top10\`\n\n*💡 Exemplo:* \`${prefix}top10\`\n\n*✨ Dica:* Descubra os comandos mais populares entre os usuários do bot.`);
} else if (q === `top10 semanal`) {
reply(`*📈 Comando:* \`${prefix}top10 semanal\`\n\n*📄 Descrição:* Mostra os 10 comandos mais usados no bot durante a última semana.\n\n*📌 Como usar:* \`${prefix}top10 semanal\`\n\n*💡 Exemplo:* \`${prefix}top10 semanal\`\n\n*✨ Dica:* Analise tendências semanais para ajustar o uso do bot.`);
} else if (q === `top10 mensal`) {
reply(`*📊 Comando:* \`${prefix}top10 mensal\`\n\n*📄 Descrição:* Exibe os 10 comandos mais utilizados no último mês.\n\n*📌 Como usar:* \`${prefix}top10 mensal\`\n\n*💡 Exemplo:* \`${prefix}top10 mensal\`\n\n*✨ Dica:* Ideal para entender o comportamento mensal dos usuários.`);
} else if (q === `grupo`) {
reply(`*💬 Comando:* \`${prefix}grupo\`\n\n*📄 Descrição:* Mostra os preços e planos disponíveis para alugar o bot em grupos do WhatsApp.\n\n*📌 Como usar:* \`${prefix}grupo\`\n\n*💡 Exemplo:* \`${prefix}grupo\`\n\n*✨ Dica:* Escolha o plano que melhor atende às necessidades do seu grupo.`);
} else if (q === `pv`) {
reply(`*📩 Comando:* \`${prefix}pv\`\n\n*📄 Descrição:* Exibe os preços e opções para alugar o bot e utilizá-lo em conversas privadas.\n\n*📌 Como usar:* \`${prefix}pv\`\n\n*💡 Exemplo:* \`${prefix}pv\`\n\n*✨ Dica:* Ideal para quem prefere usar o bot em conversas individuais.`);
} else if (q === `ytaudio`) {
reply(`📥 *Comando*: ${prefix}ytaudio\n💡 *Descrição*: Baixe áudio de vídeos do YouTube.\n📌 *Modo de uso*: ${prefix}ytaudio (link)\n🔗 *Exemplo*: ${prefix}ytaudio https://youtube.com/video`);
} else if (q === `ytvideo`) {
reply(`📥 *Comando*: ${prefix}ytvideo\n💡 *Descrição*: Baixe vídeos do YouTube.\n📌 *Modo de uso*: ${prefix}ytvideo (link)\n🔗 *Exemplo*: ${prefix}ytvideo https://youtube.com/video`);
} else if (q === `ytdoc`) {
reply(`📥 *Comando*: ${prefix}ytdoc\n💡 *Descrição*: Baixe vídeos do YouTube em formato de documento.\n📌 *Modo de uso*: ${prefix}ytdoc (link)\n🔗 *Exemplo*: ${prefix}ytdoc https://youtube.com/video`);
} else if (q === `tiktokaudio`) {
reply(`📥 *Comando*: ${prefix}tiktokaudio\n💡 *Descrição*: Baixe áudio de vídeos do TikTok.\n📌 *Modo de uso*: ${prefix}tiktokaudio (link)\n🔗 *Exemplo*: ${prefix}tiktokaudio https://tiktok.com/video`);
} else if (q === `tiktok`) {
reply(`📥 *Comando*: ${prefix}tiktok\n💡 *Descrição*: Baixe vídeos do TikTok.\n📌 *Modo de uso*: ${prefix}tiktok (link)\n🔗 *Exemplo*: ${prefix}tiktok https://tiktok.com/video`);
} else if (q === `face`) {
reply(`📥 *Comando*: ${prefix}face\n💡 *Descrição*: Baixe vídeos do Facebook.\n📌 *Modo de uso*: ${prefix}face (link)\n🔗 *Exemplo*: ${prefix}face https://facebook.com/video`);
} else if (q === `faceaudio`) {
reply(`📥 *Comando*: ${prefix}faceaudio\n💡 *Descrição*: Baixe áudio de vídeos do Facebook.\n📌 *Modo de uso*: ${prefix}faceaudio (link)\n🔗 *Exemplo*: ${prefix}faceaudio https://facebook.com/video`);
} else if (q === `kwai`) {
reply(`📥 *Comando*: ${prefix}kwai\n💡 *Descrição*: Baixe vídeos do Kwai.\n📌 *Modo de uso*: ${prefix}kwai (link)\n🔗 *Exemplo*: ${prefix}kwai https://kwai.com/video`);
} else if (q === `insta`) {
reply(`📥 *Comando*: ${prefix}insta\n💡 *Descrição*: Baixe vídeos do Instagram.\n📌 *Modo de uso*: ${prefix}insta (link)\n🔗 *Exemplo*: ${prefix}insta https://instagram.com/video`);
} else if (q === `instaaudio`) {
reply(`📥 *Comando*: ${prefix}instaaudio\n💡 *Descrição*: Baixe áudio de vídeos do Instagram.\n📌 *Modo de uso*: ${prefix}instaaudio (link)\n🔗 *Exemplo*: ${prefix}instaaudio https://instagram.com/video`);
} else if (q === `apostar`) {
reply(`🎲 *Comando*: ${prefix}apostar\n💡 *Descrição*: Faça uma aposta em um jogo ou evento.\n📌 *Modo de uso*: ${prefix}apostar [valor]\n🔗 *Exemplo*: ${prefix}apostar 100`);
} else if (q === `caraoucoroa`) {
reply(`🎲 *Comando*: ${prefix}caraoucoroa\n💡 *Descrição*: Jogue cara ou coroa. Escolha entre "cara" ou "coroa".\n📌 *Modo de uso*: ${prefix}caraoucoroa [cara/coroa] [valor da aposta]\n🔗 *Exemplo*: ${prefix}caraoucoroa cara 50`);
} else if (q === `chutar`) {
reply(`🎯 *Comando*: ${prefix}chutar\n💡 *Descrição*: Adivinhe o número que estou pensando e ganhe 150 coins se acertar.\n📌 *Modo de uso*: ${prefix}chutar [número]\n🔗 *Exemplo*: ${prefix}chutar 7`);
} else if (q === `daily`) {
reply(`💰 *Comando*: ${prefix}daily\n💡 *Descrição*: Receba coins diários. Use este comando diariamente para ganhar moedas.\n📌 *Modo de uso*: ${prefix}daily`);
} else if (q === `coins`) {
reply(`💰 *Comando*: ${prefix}coins\n💡 *Descrição*: Verifique seu saldo atual de coins.\n📌 *Modo de uso*: ${prefix}coins`);
} else if (q === `roletarussa`) {
reply(`🔫 *Comando*: ${prefix}roletarussa\n💡 *Descrição*: Jogue roleta russa. Multiplica seus coins por 20 ou zera seu saldo.\n📌 *Modo de uso*: ${prefix}roletarussa`);
} else if (q === `roubar`) {
reply(`💰 *Comando*: ${prefix}roubar\n💡 *Descrição*: Tente roubar coins de outro jogador. Se falhar, você perde coins!\n📌 *Modo de uso*: ${prefix}roubar [@usuario]\n🔗 *Exemplo*: ${prefix}roubar @fulano`);
} else if (q === `transferir`) {
reply(`💳 *Comando*: ${prefix}transferir\n💡 *Descrição*: Transfira suas moedas para outro jogador.\n📌 *Modo de uso*: ${prefix}transferir @usuario [valor]\n🔗 *Exemplo*: ${prefix}transferir @fulano 100`);
} else if (q === `top`) {
reply(`🏆 *Comando*: ${prefix}top\n💡 *Descrição*: Veja o ranking dos jogadores com mais moedas.\n📌 *Modo de uso*: ${prefix}top`);
} else {
reply(`🔍 • Comando não encontrado! Use *${prefix}help* (nome do comando).\n*Ex*: ${prefix}help daily`);
}
break;


default:

//=========(Comandos sem prefixo)=============\\
switch (testat) {

case "dallas": case "bot": 
const cumprimentos = [
"Oi, tudo bem? 😊 Para acessar o menu, digite */menu*",
"E aí! Como posso ajudar hoje? 😃 Digite */menu* para ver as opções disponíveis.",
"Olá! Espero que seu dia esteja indo bem. 😄 Para explorar o menu, basta digitar */menu*",
"Hey! 👋 Pronto para usar o menu? Digite */menu* para começar.",
"Oi, como vai? 😎 Para conferir o menu, é só digitar */menu*",
"Eaí, beleza? 😁 Digite */menu* para descobrir o que posso fazer por você.",
"Olá! 😌 Quer descobrir as opções do menu? É só digitar */menu*",
"Oi, espero que seu dia esteja ótimo! 😇 Para ver o menu, digite */menu*",
"Oi oi! 😜 Para acessar o menu, basta digitar */menu*",
"Olá, tudo tranquilo? 😅 Digite */menu* para ver as opções disponíveis."
];

const mensagemAleatoria = cumprimentos[Math.floor(Math.random() * cumprimentos.length)];
enviar(mensagemAleatoria)
break

/*case "bom dia":
conn.sendMessage(from, { react: { text: "☀️", key: info.key }})
break

case "boa tarde":
conn.sendMessage(from, { react: { text: "🌇", key: info.key }})
break

case "boa noite":
conn.sendMessage(from, { react: { text: "🌌", key: info.key }})
break*/

}

//==============( Antis )==============\\
if(isAntiLinkHard && isGroup && isBotGroupAdmins && !isGroupAdmins) {
if(Procurar_String.includes("chat.whatsapp.com/") || Procurar_String.includes("https://")){
if(isBot) return 
if (antiLinkAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiLinkAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um link, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiLinkAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
}
if (isAntiFlood && isGroup && isBotGroupAdmins && !isGroupAdmins) {
const userFloodData = floodData[sender] || { count: 0, timestamp: Date.now() };
const elapsedTime = Date.now() - userFloodData.timestamp;
if (elapsedTime > floodInterval) {
userFloodData.count = 1;
userFloodData.timestamp = Date.now();
} else {
userFloodData.count += 1;
}
floodData[sender] = userFloodData;
fs.writeFileSync(arquivoFlood, JSON.stringify(floodData, null, 2));
if (userFloodData.count > floodLimit) {
if (floodAction === 'ban_delete') {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (floodAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ @${sender.split("@")[0]}, você foi advertido por floodar. Advertências: ${dataGp[0].advertencias.users[sender]} de ${dataGp[0].advertencias.warningLimit}.`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
} else if (floodAction === 'delete') {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}
}
}


if (isMsgLongasEnabled && budy.length >= isLimitec) {
if (isBot || isOwner || isGroupAdmins) return;
if (msgLongasAction === 'ban_delete') {
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *foi banido por enviar mensagem longa demais.*`, mentions: [sender] });
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (msgLongasAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar mensagem longa, agora tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
} else if (msgLongasAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}

if (isAntiImagem && type === 'imageMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiImagemAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
return
} else if (antiImagemAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar uma imagem, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
return
} else if (antiImagemAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
return
}
}
if (isAntiVideo && type == 'videoMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiVideoAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
return
} else if (antiVideoAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um vídeo, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
return
} else if (antiVideoAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
return
}
}
if (isAntiAudio && type == 'audioMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiAudioAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiAudioAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar áudio, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiAudioAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
if(isAntiSticker && !isGroupAdmins && isBotGroupAdmins && type == 'stickerMessage') {
if(info.key.fromMe) return
if (antiStickerAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiStickerAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um sticker, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiStickerAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} 
}
if (isAntiDoc && type == 'documentMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiDocAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiDocAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um documento, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiDocAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
if (isAntiContato && type == 'contactMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiContatoAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiContatoAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um contato, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiContatoAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
if (isAntiLocalizacao && type == 'locationMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiLocalizacaoAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiLocalizacaoAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar uma localização, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiLocalizacaoAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
if (isAntiCatalogo && type == 'catalogMessage') {
if (isBot || isOwner || isGroupAdmins) return;
if (antiCatalogoAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiCatalogoAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar um catálogo, agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
} else if (antiCatalogoAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
if (isAntiPalavra && isBotGroupAdmins && !isGroupAdmins) {
const conteudoMensagem = body.toLowerCase();
const palavrasProibidas = dataGp[0].palavrasProibidas.words || [];
const antiPalavraAction = dataGp[0].palavrasProibidas.action;
 if(dataGp[0].palavrasProibidas.words.some(i => budy2.includes(i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")))) {
if (antiPalavraAction === 'ban_delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
} else if (antiPalavraAction === 'warn_delete') {
const userWarnings = dataGp[0].advertencias.users[sender] || 0;
if (userWarnings < dataGp[0].advertencias.warningLimit) {
dataGp[0].advertencias.users[sender] = userWarnings + 1;
await setGp(dataGp);
conn.sendMessage(from, { text: `⚠️ • @${sender.split("@")[0]} *Você foi advertido por enviar uma palavra proibida , agora você tem ${dataGp[0].advertencias.users[sender]} advertências de ${dataGp[0].advertencias.warningLimit} permitidas.*`, mentions: [sender] });
}
if (dataGp[0].advertencias.users[sender] >= dataGp[0].advertencias.warningLimit) {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
if (!JSON.stringify(groupMembers).includes(sender)) return;
conn.groupParticipantsUpdate(from, [sender], 'remove');
reply(`⏰ - *Usuário @${sender.split("@")[0]} foi banido por ultrapassar o limite de advertências.*`);
}
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);

} else if (antiPalavraAction === 'delete') {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}, 500);
}
}
}

var abcd123 = info.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage;
var efgh456 = info.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage;
if (type === 'imageMessage' || abcd123 || isImage2) {
if (isGroup && !isAutofigu) return;
if (isBot) return;
if (!limiteFigus(sender)) return;
let imageBuffer = await getFileBuffer(abcd123 || info.message.imageMessage, 'image');
let encmediaa2 = sendImageAsSticker2(conn, from, imageBuffer, { packname: packname_fig, author: author_fig });
DLT_FL(encmediaa2);
adicionarSticker(sender);
}
if (type === 'videoMessage' || efgh456 || isVideo2) {
if (isGroup && !isAutofigu) return;
if (isBot) return;
if (efgh456 || isMedia) {
if(info.message.videoMessage.seconds < 11) {
if (!limiteFigus(sender)) return;
let videoBuffer = await getFileBuffer(efgh456 || info.message.videoMessage, 'video');
let encmediaa2 = sendVideoAsSticker2(conn, from, videoBuffer, { packname: packname_fig, author: author_fig });
DLT_FL(encmediaa2);
adicionarSticker(sender);
}
}
}



}

} catch (e) {
console.log(e)
}})

// New auto reconexão própria
conn.ev.on("connection.update", (update) => {
let { connection, lastDisconnect } = update

if (connection === "open") {
console.log(chalk.greenBright("Dallas 1.0 conectado ✓"))
console.log(chalk.gray("Info"), color("Os: Baileys"))
console.log(chalk.gray("Info"), color("Versão: 3.0 (Lite)"))
console.log(chalk.gray("Info"), color("Dev: GsT"))
console.log(chalk.gray("Boa Sorte!\n"))
} else if (connection === "close") {

console.log(chalk.dim("Ocorreu um conflito na conexão"))
dall()
}
if(update.isNewLogin) {
dall()
}})}
dall()
