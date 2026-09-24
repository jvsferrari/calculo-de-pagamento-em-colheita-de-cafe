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
const campos = document.querySelectorAll('.campo');
const voltarCalc = document.querySelector('#voltarCalc');
const individual = document.querySelector('#individual');
const tabelaIndividual = document.querySelector('#tabelaIndividual');
const precoAtual = document.querySelector('#precoAtual');
const nomeIndividual = document.querySelector('#nomeIndividual');
const compartilharIndividual = document.querySelector(
	'#compartilharIndividual',
);
const baixarIndividual = document.querySelector('#baixarIndividual');
const tabelaIndividualToda = document.querySelector('#tabelaIndividualToda');
const theadIndividual = document.querySelector('#theadIndividual');

let numPanhador = 0;
let passo = 1;
let panhadores = [];
let numCount = 0;
let precoDefinido = false;

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

// document.addEventListener('DOMContentLoaded', function () {
// 	mostrarPasso();
// });

nomePronto.addEventListener('click', (event) => {
	event.preventDefault();
	salvarNome();
	passo++;

	exibirPagina(passo, true);
	focar(campoLatoes);
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
	if (numCount <= 2) numCount = campoLatoes.innerText.length;
	focar();
});

mais.addEventListener('click', (event) => {
	event.preventDefault();
	if (passo == 2) {
		return;
	}
	somar();
	focar(campoLatoes);
});

function somar() {
	if (campoLatoes.innerText == '' && campoLitros.innerText == '') {
		return;
	}
	camposAnteriores.style.display = 'flex';
	panhadores[numPanhador].latoes.push(parseInt(campoLatoes.innerText) || 0);
	panhadores[numPanhador].litros.push(parseInt(campoLitros.innerText) || 0);

	const novoValor = document.createElement('div');
	const novoLatao = document.createElement('div');
	const novoLitro = document.createElement('div');
	novoLatao.innerText = campoLatoes.innerText || '0';
	novoLitro.innerText = campoLitros.innerText || '0';

	novoValor.append(novoLatao);
	novoValor.append(novoLitro);
	camposAnteriores.append(novoValor);
	// campoLatoesAnt.innerText = campoLatoes.innerText || '00';
	// campoLitrosAnt.innerText = campoLitros.innerText || '00';
	campoLatoes.innerText = '';
	campoLitros.innerText = '';
	numCount = 0;
}

finalizar.addEventListener('click', (event) => {
	event.preventDefault();
	calcularResultados();
	mostrarResultados();
	linhasPanhadores = document.querySelectorAll('.linhaPanhador');
	linhasPanhadores.forEach((linha) => {
		linha.addEventListener('click', () => {
			calcularIndividual(parseInt(linha.id));
			nomeIndividual.innerText = panhadores[linha.id].nome;
			passo++;
			exibirPagina(passo, true);
		});
		passo++;
		exibirPagina(passo);
	});

	passo = 5;
	exibirPagina(passo, true);

	camposAnteriores.innerHTML = '';
});

adicionar.addEventListener('click', (event) => {
	event.preventDefault();
	numPanhador++;
	passo = 1;
	exibirPagina(passo, true);
	camposAnteriores.innerHTML = '';
});

mudarPreco.addEventListener('click', (event) => {
	event.preventDefault();
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	}
	precoDefinido = false;
	passo++;
	exibirPagina(passo, true);
});

voltar.forEach((botao) => {
	botao.addEventListener('click', (event) => {
		event.preventDefault();
		window.history.back();
	});
});

campoLatoes.addEventListener('click', () => {
	focar(campoLatoes);
	if (numCount >= 2) numCount = campoLatoes.innerText.length;
});

campoLitros.addEventListener('click', () => {
	focar(campoLitros);
	if (numCount < 2) numCount = campoLitros.innerText.length + 2;
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
	precoDefinido = true;
}

numeroPronto.addEventListener('click', (event) => {
	event.preventDefault();
	switch (passo) {
		case 2: ///2 -> 3
			salvarPreco();
			passo++;
			focar(campoLatoes);
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

compartilharIndividual.addEventListener('click', () => {
	compartilharPdf('compartilharIndividual');
});

baixarIndividual.addEventListener('click', () => {
	compartilharPdf('baixarIndividual');
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
	mudarPreco.style.display = 'none';
	precoDefinido = false;
	tabela.replaceChildren();
	passo = 1;
	exibirPagina(1, true);
});

voltarCalc.addEventListener('click', (event) => {
	event.preventDefault();
	if (panhadores[numPanhador].latoes.length == 0) {
		passo--;
		exibirPagina(passo, true);
	} else {
		campoLatoes.innerText = panhadores[numPanhador].latoes.at(-1);
		campoLitros.innerText = panhadores[numPanhador].litros.at(-1);
		panhadores[numPanhador].latoes.pop();
		panhadores[numPanhador].litros.pop();

		camposAnteriores.lastElementChild.remove();
		// campoLatoesAnt.innerText =
		// 	panhadores[numPanhador].latoes.at(-1) ?? '00';
		// campoLitrosAnt.innerText =
		// 	panhadores[numPanhador].litros.at(-1) ?? '00';
	}
});

function teclar(numero) {
	if (numCount < 2) {
		campoLatoes.innerText += numero.innerText;
		numCount++;
	} else {
		if (numCount < 4) {
			campoLitros.innerText += numero.innerText;
			numCount++;
		} else return;
	}
	focar();
}

// function mostrarPasso() {
// 	debug.innerText = '';
// 	debug.append(`P: ${passo}\n`);
// }

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
		linha.classList.add('linhaPanhador');
		linha.id = i;
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

	// 1. Gera a data formatada no padrão Dia-Mês-Ano (Ex: 22-09-2026)
	const hoje = new Date();
	const dataFormatada = hoje.toLocaleDateString('pt-BR').replaceAll('/', '-');

	// 2. Variável que vai guardar o nome final do arquivo
	let nomeArquivo = '';

	// 3. Define o nome e desenha a tabela de acordo com o chamador
	if (chamador == 'compartilhar' || chamador == 'baixar') {
		doc.autoTable({ html: '#tabelaToda' });
		nomeArquivo = `relatorio ${dataFormatada}.pdf`;
	}

	if (
		chamador == 'compartilharIndividual' ||
		chamador == 'baixarIndividual'
	) {
		doc.autoTable({ html: '#tabelaIndividualToda' });

		// Pega o nome, remove espaços extras e limpa caracteres especiais proibidos, mantendo letras, números, espaços, hífens e acentos
		const nomePessoa = nomeIndividual.innerText
			.trim()
			.replace(/[^a-zA-Z0-9À-ÿ -]/g, '');
		nomeArquivo = `${nomePessoa} ${dataFormatada}.pdf`;
	}

	// Verifica se está rodando dentro do aplicativo Android (Capacitor)
	const isApp = window.Capacitor && window.Capacitor.isNativePlatform();

	if (isApp) {
		// --- LÓGICA NATIVA DO APLICATIVO ANDROID ---
		try {
			const Filesystem = window.Capacitor.Plugins.Filesystem;
			const Share = window.Capacitor.Plugins.Share;

			// O Capacitor não entende "Blob", então transformamos o PDF em Base64
			const base64Data = doc.output('datauristring').split(',')[1];

			if (
				chamador === 'compartilhar' ||
				chamador === 'compartilharIndividual'
			) {
				// Salva temporariamente no CACHE para poder enviar pelo WhatsApp
				const resultado = await Filesystem.writeFile({
					path: nomeArquivo,
					data: base64Data,
					directory: 'CACHE',
				});

				// Abre a tela de compartilhamento nativa do Android
				await Share.share({
					title: 'Relatório de Pagamento',
					text: 'Segue em anexo a tabela do café.',
					files: [resultado.uri],
				});
			} else {
				// Botão "Baixar": Tenta salvar direto na pasta DOCUMENTOS
				try {
					await Filesystem.writeFile({
						path: nomeArquivo,
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
						path: nomeArquivo,
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
		const arquivo = new File([pdfBlob], nomeArquivo, {
			type: 'application/pdf',
		});

		if (
			navigator.canShare &&
			navigator.canShare({ files: [arquivo] }) &&
			(chamador == 'compartilhar' || chamador == 'compartilharIndividual')
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
			doc.save(nomeArquivo);
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

function focar(clicado) {
	campos.forEach((campo) => {
		campo.style.borderWidth = '0';
	});
	if (clicado) {
		clicado.style.borderWidth = '3px';
	} else {
		if (numCount > 2) {
			campoLitros.style.borderWidth = '3px';
		} else campoLatoes.style.borderWidth = '3px';
	}
}

function exibirPagina(passo, push) {
	numCount = 0;

	paginas.forEach((pagina) => {
		pagina.style.display = 'none';
	});

	//mostrarPasso();

	limparCampos();

	switch (passo) {
		case 1:
			camposAnteriores.style.display = 'none';
			nomes.style.display = 'flex';
			if (push) {
				window.history.pushState({ passo: passo }, '', '#' + 'nomes');
			}
			break;
		case 2:
			if (precoDefinido) {
				passo++;
				exibirPagina(passo, true);
			}
			camposAnteriores.style.display = 'none';
			etapa.innerText = 'Preco por Latão (R$/Latão)';
			calculadora.style.display = 'flex';
			if (push) {
				window.history.pushState({ passo: passo }, '', '#' + 'preco');
			}
			break;
		case 3:
			camposAnteriores.style.display = 'flex';
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
		case 6:
			individual.style.display = 'flex';
			if (push) {
				window.history.pushState(
					{ passo: passo },
					'',
					'#' + 'individual',
				);
			}
			break;
	}
}

function calcularIndividual(numero) {
	tabelaIndividual.innerHTML = '';
	for (let i = 0; i < panhadores[numero].latoes.length; i++) {
		const linha = document.createElement('tr');
		const latoes = document.createElement('td');
		const litros = document.createElement('td');
		const valor = document.createElement('td');

		latoes.innerText = panhadores[numero].latoes[i];
		litros.innerText = panhadores[numero].litros[i];
		valor.innerText = (
			(panhadores[numero].latoes[i] + panhadores[numero].litros[i] / 60) *
			panhadores[numero].preco
		).toFixed(2);

		linha.appendChild(latoes);
		linha.appendChild(litros);
		linha.appendChild(valor);
		tabelaIndividual.appendChild(linha);
	}
	const totais = document.createElement('tr');
	const totalLatoes = document.createElement('td');
	const totalLitros = document.createElement('td');
	const totalValores = document.createElement('td');

	totalLatoes.innerText = panhadores[numero].totalLatoes;
	totalLitros.innerText = panhadores[numero].totalLitros;
	totalValores.innerText = panhadores[numero].total.toFixed(2);

	totais.appendChild(totalLatoes);
	totais.appendChild(totalLitros);
	totais.appendChild(totalValores);
	tabelaIndividual.appendChild(totais);

	totais.id = 'totais';
	totalValores.classList.add('direita');
	totalValores.classList.add('embaixo');
	totalLatoes.classList.add('esquerda');
	totalLatoes.classList.add('embaixo');
}

window.onbeforeunload = () => {
	if (panhadores.length > 0) {
		return 'Você tem alterações não salvas. Deseja mesmo sair?';
	}
};
