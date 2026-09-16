const tabela = document.querySelector('#tabela');
const nomes = document.querySelector('#nomes');
const calculadora = document.querySelector('#calculadora');
const resultados = document.querySelector('#resultados');
const numeros = document.querySelectorAll('.numero');
const campoNome = document.querySelector('#campoNome');
const campoLatoes = document.querySelector('#campoLatoes');
const campoLitros = document.querySelector('#campoLitros');
const nomePronto = document.querySelector('#nomePronto');
const numeroPronto = document.querySelector('#numeroPronto');
const camposAnteriores = document.querySelector('#camposAnteriores');
const nomeAtual = document.querySelector('#nomeAtual');
const confirmar = document.querySelector('#confirmar');
const finalizar = document.querySelector('#finalizar');
const adicionar = document.querySelector('#adicionar');
const baixar = document.querySelector('#baixar');
const compartilhar = document.querySelector('#compartilhar');
const reiniciar = document.querySelector('#reiniciar');
const zerar = document.querySelector('#zerar');
const borracha = document.querySelector('#borracha');
const mais = document.querySelector('#mais');
const pular = document.querySelector('#pular');
const paginas = document.querySelectorAll('.pagina');
const tabelaToda = document.querySelector('#tabelaToda');
const mudarPreco = document.querySelector('#mudarPreco');
const voltar = document.querySelectorAll('.voltar');
const etapa = document.querySelector('#etapa');
const campoLatoesAnt = document.querySelector('#campoLatoesAnt');
const campoLitrosAnt = document.querySelector('#campoLitrosAnt');
const campos = document.querySelectorAll('.campo');
const voltarCalc = document.querySelector('#voltarCalc');

const debug = document.querySelector('#debug');

let numPanhador = 0;
let passo = 1;
let panhadores = [];
let numCount = 0;
// preco novo??????????????????????????????? checkbox
function novoPanhador() {
	let nome = campoNome.innerText;
	if (nome == null || nome == undefined || nome.trim() == '') {
		nome = 'Nome não definido';
	}
	return {
		index: numPanhador,
		nome: nome,
		preco: 0,
		latoes: [],
		litros: [],
		totalLatoes: 0,
		totalLitros: 0,
		total: 0,
	};
}

document.addEventListener('DOMContentLoaded', function () {
	mostrarPasso();
});

nomePronto.addEventListener('click', (event) => {
	event.preventDefault();
	salvarNome();
	passo++;
	exibirPagina(passo, true);
});

pular.addEventListener('click', (event) => {
	event.preventDefault();
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	}
	passo++;
	exibirPagina(passo, true);
});

borracha.addEventListener('click', (event) => {
	event.preventDefault();
	if (numCount <= 0) {
		return;
	}
	if (numCount <= 2) {
		campoLatoes.innerText = campoLatoes.innerText.slice(0, -1);
	} else {
		campoLitros.innerText = campoLitros.innerText.slice(0, -1);
	}
	numCount--;
});

mais.addEventListener('click', (event) => {
	event.preventDefault();
	if (passo == 2) {
		return;
	}
	somar();
});

function somar() {
	camposAnteriores.style.display = 'flex';
	panhadores[numPanhador].latoes.push(parseInt(campoLatoes.innerText) || 0);
	panhadores[numPanhador].litros.push(parseInt(campoLitros.innerText) || 0);
	campoLatoesAnt.innerText = campoLatoes.innerText || '00';
	campoLitrosAnt.innerText = campoLitros.innerText || '00';
	campoLatoes.innerText = '';
	campoLitros.innerText = '';
	numCount = 0;
}

finalizar.addEventListener('click', (event) => {
	event.preventDefault();
	calcularResultados();
	mostrarResultados();
	passo = 5;
	exibirPagina(passo, true);
});

adicionar.addEventListener('click', (event) => {
	event.preventDefault();
	numPanhador++;
	passo = 1;
	exibirPagina(passo, true);
});

mudarPreco.addEventListener('click', (event) => {
	event.preventDefault();
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	}
	passo++;
	exibirPagina(passo, true);
});

voltar.forEach((botao) => {
	botao.addEventListener('click', (event) => {
		event.preventDefault();
		window.history.back();
	});
});

function salvarNome() {
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	} else {
		let nome = campoNome.innerText.trim();
		panhadores[numPanhador].nome = nome === '' ? 'Nome não definido' : nome;
	}
	nomeAtual.innerText = panhadores[numPanhador].nome;
}

function salvarPreco() {
	let reais = parseFloat(campoLatoes.innerText) || 0;
	let centavos = parseFloat(campoLitros.innerText) || 0;
	panhadores[numPanhador].preco = reais + centavos / 100;
}

numeroPronto.addEventListener('click', (event) => {
	event.preventDefault();
	switch (passo) {
		case 2: ///2 -> 3
			salvarPreco();
			passo++;
			break;
		case 3: //3 -> 4
			somar();
			passo++;
			break;
	}
	exibirPagina(passo, true);
});

numeros.forEach((tecla) => {
	tecla.addEventListener('click', (event) => {
		event.preventDefault();
		teclar(tecla);
	});
});

compartilhar.addEventListener('click', () => {
	compartilharPdf('compartilhar');
});

baixar.addEventListener('click', () => {
	compartilharPdf('baixar');
});

reiniciar.addEventListener('click', (event) => {
	event.preventDefault();
	limparCampos();
	numPanhador++;
	passo = 1;
	exibirPagina(1, true);
	tabela.replaceChildren();
});

zerar.addEventListener('click', (event) => {
	event.preventDefault();
	numPanhador = 0;
	panhadores = [];
	tabela.replaceChildren();
	passo = 1;
	exibirPagina(1, true);
});

voltarCalc.addEventListener('click', (event) => {
	event.preventDefault();
	panhadores;
	//todo
});

function teclar(numero) {
	if (numCount < 2) {
		campoLatoes.innerText += numero.innerText;
		numCount++;
	} else {
		if (numCount < 4) {
			campoLitros.focus();
			campoLitros.innerText += numero.innerText;
			numCount++;
		} else return;
	}
}

function mostrarPasso() {
	debug.innerText = '';
	debug.append(`P: ${passo}\n`);
}

function calcularResultados() {
	panhadores.forEach((panhador) => {
		panhador.totalLatoes = panhador.latoes.reduce(
			(total, atual) => total + atual,
			0,
		);
		panhador.totalLitros = panhador.litros.reduce(
			(total, atual) => total + atual,
			0,
		);
	});
	for (let i = 0; i < panhadores.length; i++) {
		panhadores[i].total =
			(panhadores[i].totalLatoes + panhadores[i].totalLitros / 60) *
			panhadores[i].preco;
		if (isNaN(panhadores[i].total)) {
			panhadores[i].total = 0;
		}
	}
}

function mostrarResultados() {
	tabela.replaceChildren();
	for (let i = 0; i < panhadores.length; i++) {
		let linha = document.createElement('tr');
		let nome = document.createElement('td');
		nome.innerText = panhadores[i].nome;
		linha.appendChild(nome);
		let total = document.createElement('td');
		total.innerText = panhadores[i].total.toFixed(2);
		let quantidadeCafe = document.createElement('td');

		let quantidadeLitros = panhadores[i].totalLitros % 60;
		let quantidadeLatoes =
			panhadores[i].totalLatoes +
			Math.floor(panhadores[i].totalLitros / 60);
		quantidadeCafe.innerText = `${quantidadeLatoes} latões e ${quantidadeLitros} litros`;
		quantidadeCafe.classList.add('quantidadeCafe');
		linha.appendChild(total);
		linha.appendChild(quantidadeCafe);
		tabela.appendChild(linha);
	}
	let linhaSoma = document.createElement('tr');
	let soma1 = document.createElement('td');
	let soma2 = document.createElement('td');
	let soma3 = document.createElement('td');
	soma1.innerText = 'Total';
	let soma = 0;
	let somaLatoes = 0;
	let somaLitros = 0;
	for (let i = 0; i < panhadores.length; i++) {
		soma += panhadores[i].total;
		somaLatoes += panhadores[i].totalLatoes;
		somaLitros += panhadores[i].totalLitros;
	}
	let quociente = Math.floor(somaLitros / 60);
	let resto = somaLitros % 60;
	somaLatoes += quociente;
	somaLitros = Math.floor(resto);
	soma2.innerText = soma.toFixed(2);
	soma3.innerText = `${somaLatoes} latões e ${somaLitros} litros`;
	soma3.classList.add('quantidadeCafe');
	tabela.appendChild(linhaSoma);
	linhaSoma.appendChild(soma1);
	linhaSoma.appendChild(soma2);
	linhaSoma.appendChild(soma3);
}

async function compartilharPdf(chamador) {
	tabelaToda.classList.remove('escondido');
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	doc.autoTable({ html: '#tabelaToda' });

	// Verifica se está rodando dentro do aplicativo Android (Capacitor)
	const isApp = window.Capacitor && window.Capacitor.isNativePlatform();

	if (isApp) {
		// --- LÓGICA NATIVA DO APLICATIVO ANDROID ---
		try {
			const Filesystem = window.Capacitor.Plugins.Filesystem;
			const Share = window.Capacitor.Plugins.Share;

			// O Capacitor não entende "Blob", então transformamos o PDF em Base64
			const base64Data = doc.output('datauristring').split(',')[1];

			if (chamador === 'compartilhar') {
				// Salva temporariamente no CACHE para poder enviar pelo WhatsApp
				const resultado = await Filesystem.writeFile({
					path: 'relatorio_pagamento.pdf',
					data: base64Data,
					directory: 'CACHE', // Usando string literal pois Directory enum pode não estar disponível globalmente
				});

				// Abre a tela de compartilhamento nativa do Android
				await Share.share({
					title: 'Relatório de Pagamento',
					text: 'Segue em anexo a tabela do café.',
					files: [resultado.uri], // Share plugin usa 'files' para URIs no Android
				});
			} else {
				// Botão "Baixar": Tenta salvar direto na pasta DOCUMENTOS
				try {
					await Filesystem.writeFile({
						path: 'Pagamento_Cafe_' + Date.now() + '.pdf',
						data: base64Data,
						directory: 'DOCUMENTS',
					});
					alert(
						'PDF salvo com sucesso na pasta "Documentos" do seu celular!',
					);
				} catch (erroDireto) {
					console.warn(
						'Falha na escrita direta em DOCUMENTS (comum no Android 11+). Usando Share como fallback.',
					);

					// Fallback: Salva no CACHE e abre menu de compartilhar para o usuário escolher "Salvar no dispositivo"
					const resultado = await Filesystem.writeFile({
						path: 'relatorio_pagamento.pdf',
						data: base64Data,
						directory: 'CACHE',
					});

					await Share.share({
						title: 'Salvar Relatório',
						text: 'Seu celular bloqueou a gravação direta. Escolha "Salvar no dispositivo" ou "Salvar em arquivos" para baixar.',
						files: [resultado.uri],
					});
				}
			}
		} catch (erro) {
			console.error('Erro no Capacitor:', erro);
			alert('Erro ao processar o arquivo no app: ' + erro.message);
		}
	} else {
		// --- LÓGICA ORIGINAL DO NAVEGADOR / GITHUB PAGES ---
		const pdfBlob = doc.output('blob');
		const arquivo = new File([pdfBlob], 'relatorio.pdf', {
			type: 'application/pdf',
		});

		if (
			navigator.canShare &&
			navigator.canShare({ files: [arquivo] }) &&
			chamador == 'compartilhar'
		) {
			try {
				await navigator.share({
					files: [arquivo],
					title: 'Relatório de Dados',
					text: 'Segue em anexo a tabela exportada.',
				});
			} catch (erro) {
				console.log('O usuário cancelou o compartilhamento.', erro);
			}
		} else {
			doc.save('relatorio.pdf');
		}
	}
	tabelaToda.classList.add('escondido');
}

window.addEventListener('popstate', (event) => {
	if (event.state && event.state.passo) {
		passo = event.state.passo;
		exibirPagina(passo, false);
	} else {
		exibirPagina(1, false);
		passo = 1;
	}
});

window.addEventListener('load', () => {
	window.history.replaceState({ passo: 1 }, '', '#nomes');
});

function limparCampos() {
	campos.forEach((campo) => {
		campo.innerText = '';
	});
}

function exibirPagina(passo, push) {
	numCount = 0;

	paginas.forEach((pagina) => {
		pagina.style.display = 'none';
	});

	mostrarPasso();

	limparCampos();

	switch (passo) {
		case 1:
			nomes.style.display = 'flex';
			if (push) {
				window.history.pushState({ passo: passo }, '', '#' + 'nomes');
			}
			break;
		case 2:
			etapa.innerText = 'Preco por Latão (R$/Latão)';
			calculadora.style.display = 'flex';
			if (push) {
				window.history.pushState({ passo: passo }, '', '#' + 'preco');
			}
			break;
		case 3:
			mudarPreco.style.display = 'flex';
			etapa.innerText = 'Latões e Litros';
			calculadora.style.display = 'flex';
			if (push) {
				window.history.pushState({ passo: passo }, '', '#' + 'cafe');
			}
			break;
		case 4:
			confirmar.style.display = 'flex';
			if (push) {
				window.history.pushState(
					{ passo: passo },
					'',
					'#' + 'confirmar',
				);
			}
			break;
		case 5:
			resultados.style.display = 'flex';
			if (push) {
				window.history.pushState(
					{ passo: passo },
					'',
					'#' + 'resultados',
				);
			}
			break;
	}
}

window.onbeforeunload = () => {
	if (panhadores.length > 0) {
		return 'Você tem alterações não salvas. Deseja mesmo sair?';
	}
};
