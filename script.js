async function enviarScript(scriptText) {
	const lines = scriptText.split(/[\n]+/).map(line => line.trim()).filter(line => line);
	const main = document.querySelector("#main"),
		textarea = main.querySelector(`div[contenteditable="true"]`);
	
	if (!textarea) throw new Error("No posee una conversación abierta");
	
	for (const line of lines) {
		console.log(line);
	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('input', { bubbles: true }));
		
		// Simular la tecla 'Enter' para enviar el mensaje
		const enterEvent = new KeyboardEvent('keydown', {
			key: 'Enter',
			code: 'Enter',
			charCode: 13,
			keyCode: 13,
			view: window,
			bubbles: true
		});
		textarea.dispatchEvent(enterEvent);
		
		if (lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}



enviarScript(`
Ingresar 
libreto
de
pelicula

`);
