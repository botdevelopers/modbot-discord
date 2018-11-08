const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const client = new Discord.Client();

var prefix = ayarlar.prefix

client.on('ready', () => {
  console.log(`${client.user.tag} Kullanıcı Adı İle Giriş Yapıldı!`);
  client.user.setGame(`${prefix}yardım + ${client.guilds.size} sunucu + ${client.users.size} kullanıcı`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Aleyküm selam,  hoş geldin ^^'); 
		} else {
		msg.reply('Aleyküm Selam!');
		}
	}
});

client.on('message', message => {
  if (message.content === prefix + 'avatar') {
    message.channel.sendMessage(message.author.avatarURL);
  }
});

// Yardım Komutları
client.on('message', msg => {
  if (msg.content === prefix + 'yardım') {
        const embed = new Discord.RichEmbed()

            .addField('Bu Komut Bakım Aşamasındadır.', '2018 - 2019 ModBot')

            .setColor(0xff0000)

        return msg.channel.sendEmbed(embed)
  }
});

// Yardım Komutları Yukarıda

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'hoşgeldiniz');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:inbox_tray: Sunucumuza Hoşgeldin, ${member} :inbox_tray:`);
});


client.on('message', msg => {
  if (msg.content === prefix + 'sor') {
    msg.channel.sendMessage(':scream: Bu Komut Şuanda Bakım Aşamasındadır! :scream: ');
  }
});


/**

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    // You can copy/paste the actual unicode emoji in the code (not _every_ unicode emoji works)
    receivedMessage.react("👍")
    receivedMessage.react("🛐")
    // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html

    // Get every custom emoji from the server (if any) and react with each one
    receivedMessage.guild.emojis.forEach(customEmoji => {
        console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
        receivedMessage.react(customEmoji)
    })
    // If you know the ID of the custom emoji you want, you can get it directly with:
    // let customEmoji = receivedMessage.guild.emojis.get(emojiId)
})

**/

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'reboot') {
    if (msg.author.id !== ayarlar.sahip) {
      msg.reply('Benim yapımcım değilsin!');
    } else {
      msg.channel.sendMessage(`Bot yeniden başlatılıyor...`).then(msg => {
      console.log(`BOT: Bot yeniden başlatılıyor...`);
      process.exit(0);
    })
   }
  }
});

// Mod Komutları


client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(prefix + 'kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          msg.channel.sendMessage(`:tools: Başarılı Bir Şekilde ${user.tag} Adlı Kullanıcı Sunucudan Atıldı! :tools:`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.channel.sendMessage('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.channel.sendMessage('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.channel.sendMessage('Bir Kullanıcıyı Sunucudan Atmak İçin Kullanıcıyı Etiketlemen Gerek!');
    }
  }
});



client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(prefix + 'ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.channel.sendMessage(`:tools: **${user.tag}** Adlı Kullanıcı Sunucudan Yasaklandı!`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('Bir Kullanıcıyı **Atmak** İçin Kullanıcıyı Etiketlemen Gerek!');
    }
  }
});




// Yukarısı Mod Komutları



// Sunucu Bilgi

client.on('message', msg => {
  if (msg.content === prefix + 'sunucu') {
    const embed = new Discord.RichEmbed()

            .addField("Sunucu Adı", msg.guild.name, true)

            .addField("Sunucu ID", msg.guild.id, true)

            .addField("Sunucu Sahibi", msg.guild.owner, true)

            .addField("Toplam Üye Sayısı", msg.guild.memberCount, true)

            .addField("AFK Süresi", msg.guild.afkTimeout, true)

            .setFooter("Oluşturulma Tarihi " + msg.guild.createdAt)

            .setColor(0xff0000)

        return msg.channel.sendEmbed(embed)
  }
});

// Yukarısı Sunucu Bilgi


// Bot Bilgi

client.on('message', msg => {
  if (msg.content === prefix + 'botbilgi') {
    const embed = new Discord.RichEmbed()

            .addField("Version:", '1.0.0', true)

            .addField("Ping:", '**' + client.ping + ' **ms', true)

            .addField("Bot Sahibi:", '<@355742603691687937>', true)

            .addField("Discord.JS Sürüm:", 'v11.4.2', true)

            .addField("Toplam Sunucu,Kullanıcı", + client.guilds.size + ' Sunucuya ' + client.users.size + ' Kullanıcıya Hizmet Veriliyor!', true)

            .setFooter("2018 - 2019 En İyi Moderatör , Eğlence Botu!")

            .setColor(0xff0000)

        return msg.channel.sendEmbed(embed)
  }
});

// Yukarısı Bot Bilgi

client.on('message', msg => {
  if (msg.content === prefix + 'sunuculist') {
    msg.channel.sendMessage("Botun Olduğu Sunucular:")
    client.guilds.forEach((guild) => {
        msg.channel.sendMessage(" - " + guild.name)
    })
  }
});
	
/**
client.on('message', msg => {
  if (msg.content === prefix + '') {
    msg.channel.sendMessage('');
  }
});
**/



client.login(process.env.BOT_TOKEN);
