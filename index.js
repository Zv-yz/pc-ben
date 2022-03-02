const { getModule, messages } = require('powercord/webpack')
const { Plugin } = require('powercord/entities')
const { getChannelId } = getModule(['getLastSelectedChannelId'], false)
const { getCurrentUser } = getModule(['getCurrentUser'], false)
const { createBotMessage } = getModule(['createBotMessage'], false)
const { BOT_AVATARS } = getModule(['BOT_AVATARS'], false)
let Ben_Started = false
BOT_AVATARS.ben = 'https://cdn.discordapp.com/attachments/733868998781042748/948495696057757736/16150353603466.png'
function PlayAudio(Name){
	let NEW_Audio = new Audio(`https://raw.githubusercontent.com/Zv-yz/pc-ben/main/Audios/${Name}.wav`)
	NEW_Audio.volume = 1
	NEW_Audio.play()
}
module.exports = class BenPowercord extends Plugin {
	startPlugin() {
		powercord.api.commands.registerCommand({
			command: 'ben',
			aliases: ['talking-ben', 'talkingben'],
			description: 'Talk with ben.',
			usage: '{c} (question)',
			executor: (args) => this.question(args)
		})
		
		powercord.api.commands.registerCommand({
			command: 'start-ben',
			description: 'Start ben.',
			usage: '{c}',
			executor: () => this.startben()
		})
	}
	
	pluginWillUnload() {
		powercord.api.commands.unregisterCommand('ben')
		powercord.api.settings.unregisterCommand('start-ben')
	}
	
	async startben(){
		const receivedMessage = createBotMessage(getChannelId(), {})
		BOT_AVATARS.ben = 'https://cdn.discordapp.com/attachments/733868998781042748/948495696057757736/16150353603466.png'
		receivedMessage.author.username = 'Ben, the dog.'
		receivedMessage.author.avatar = 'ben'
		Ben_Started = !Ben_Started
		if (Ben_Started == true) {
			PlayAudio('Ben')
			receivedMessage.content = 'Ben.'
		} else {
			receivedMessage.content = 'Stopped.'
		}
		return messages.receiveMessage(receivedMessage.channel_id, receivedMessage)
	}
	
	async question(args) {
		const Prefix = powercord.api.commands.prefix
		const receivedMessage = createBotMessage(getChannelId(), {})
		let RandomAnswer = ['Augg', 'Hohoho', 'No', 'Yes']
		receivedMessage.author.username = 'Ben, the dog.'
		receivedMessage.author.avatar = 'ben'
		
		if (Ben_Started == false) {
			receivedMessage.content = `Please, enable ben with command: **${Prefix}start-ben**`
			return messages.receiveMessage(receivedMessage.channel_id, receivedMessage)
		}
		
		if (args.length == null) {
			receivedMessage.content = 'Invalid question.'
			return messages.receiveMessage(receivedMessage.channel_id, receivedMessage)
		}
		
		switch (RandomAnswer[Math.floor(RandomAnswer.length * Math.random())]){
			case 'Augg':
				PlayAudio('Augg')
				receivedMessage.content = `> Question: **${args.join(' ')}**\n\nAuggh.`
				break
			case 'Hohoho':
				PlayAudio('Hohoho')
				receivedMessage.content = `> Question: **${args.join(' ')}**\n\nHO HO HO.`
				break
			case 'No':
				PlayAudio('No')
				receivedMessage.content = `> Question: **${args.join(' ')}**\n\nNo.`
				break
			case 'Yes':
				PlayAudio('Yes')
				receivedMessage.content = `> Question: **${args.join(' ')}**\n\nYes.`
				break
		}
		return messages.receiveMessage(receivedMessage.channel_id, receivedMessage)
	}
}
