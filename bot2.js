const Discord = require("discord.js");
var client = new Discord.Client();
var readline = require("readline");
var lineseparator;
var commandlist = []; //variable with evry command
var commandhelp = "" ; //help variable
var i; //don't ask me why I don't know myself

//initialization---------------------------------------------------------------
initialize();
function initialize (){
	i = 0;
	commandhelp = "" ;
	commandlist = [];
	//create a 2D array with every command written is resources.txt---------------------------------------------------------------
	//generate help command -> every command is in commandarr
	var fs = require('fs');
	fs.readFile('resources.txt', 'utf8', function(err, data) { //resources.txt file needed
		if (err) throw err;
		lineseparator = data.split('\n');
		for(var line in lineseparator){
			commandlist[line] = lineseparator[line].split('#');
			commandhelp = commandhelp + commandlist[line][1] + " , ";
		}
	});
	
	//login to server---------------------------------------------------------------
	client.login('NTc3ODI2NzMwNzA2OTkzMTcy.XNqtyQ.JQ9zarqXs9SlUQZVwQC07mN3imI');
	client.on('ready', () => {
		if(i == 0){ //again, I said don't ask me why
		i = 1;}
	});
}


//on message from any user---------------------------------------------------------------
client.on('message', msg => {
	
	//answer to reset command
	switch(msg.content.toUpperCase()){
		case '/REBOOT':
		resetBot(msg.channel)
		break;
	}

  //display help for users
  if (msg.content === '/help') {
    msg.reply("a besoin d'aide. Les commandes sont : " + commandhelp + " .");
    }
	
  //display proper card for a proper command
  else{
	var msgcontent = msg.content; //unnecessary to call .content method every damn time
	var img //cause there is a stupid '\r' from nowhere
	for(var index in commandlist){
		if (msgcontent === commandlist[index][1]) { 
			img = commandlist[index][2];
			img = img.replace(/(\r\n|\n|\r)/gm, ""); //remove stupid '\r'
			msg.reply('joue la carte', {
			files: [ img ] //contains image url
        }); 
		break;
		}
	}
  }
});

//reset function---------------------------------------------------------------
function resetBot(channel){
	channel.send('Je... reviendrai...')
	.then(msg => client.destroy())
	.then(() => initialize())
}
