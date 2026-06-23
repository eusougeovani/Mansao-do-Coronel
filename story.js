// ============================================================
//  A MANSÃO DO CORONEL — story.js
//  100 seções numeradas. Cada seção tem:
//    text   : string (HTML permitido para <em>, <strong>)
//    choices: array de { label, goto }   — ou vazio se fim
//    event  : objeto opcional com efeitos mecânicos
//             tipo: 'combat'|'luck'|'fear'|'gain'|'lose'|'death'|'win'
// ============================================================

const STORY = {

    1: {
        text: `A chuva cai em torrentes sobre a estrada de terra batida quando o seu Fusca tosse pela última vez e para no meio do nada.
<br><br>
Você olha pela janela embaçada. A estrada ladeada de canaviais desaparece na escuridão dos dois lados. Não há sinal de cidade, de posto, de nada. Apenas a chuva, o trovão distante e, no topo de uma lomba coberta de bananeiras retorcidas, as luzes fracas de uma construção enorme.
<br><br>
Uma velha placa de madeira está cravada na porteira enferrujada à beira da estrada. Com a lanterna do celular você consegue ler: <strong>FAZENDA SÃO BENEDITO — COR. AURINO VASCONCELLOS</strong>.
<br><br>
O vento uiva. A chuva aumenta. Você não tem escolha.`,
        choices: [
            { label: 'Entrar pela porteira e subir até a casa', goto: 2 },
            { label: 'Tentar consertar o carro sozinho na chuva', goto: 3 }
        ]
    },

    2: {
        text: `Você empurra a porteira enferrujada — ela range como se não fosse aberta há anos — e começa a subir a lomba pelo caminho de pedras irregulares.
<br><br>
A casa se revela aos poucos. É uma fazenda antiga, colonial, com paredes de taipa caiada que a chuva fez escurecer. Alpendre comprido, janelas com venezianas de madeira podre. Nas janelas do andar de cima, uma luz tremula como vela.
<br><br>
Alguém está em casa.
<br><br>
Você sobe os degraus de pedra do alpendre e bate na porta de madeira pesada, grossa como a porta de uma igreja.`,
        choices: [
            { label: 'Bater com força e aguardar', goto: 4 },
            { label: 'Experimentar a maçaneta antes de bater', goto: 5 }
        ]
    },

    3: {
        text: `Você sai do carro e abre o capô na chuva. Em menos de dois minutos está encharcado da cabeça aos pés, sem conseguir ver nada no motor pela escuridão.
<br><br>
Uma hora depois, tremendo de frio, os joelhos na lama, você percebe que não vai resolver isso sozinho. O carro não vai ligar.
<br><br>
<em>Você perde 1 ponto de FORÇA por causa do frio e do esforço.</em>`,
        event: { type: 'lose', stat: 'forca', amount: 1 },
        choices: [
            { label: 'Ir até a fazenda no alto da lomba', goto: 2 }
        ]
    },

    4: {
        text: `Você bate três vezes. O som ecoa pesado, como dentro de uma catedral.
<br><br>
Silêncio. Então passos lentos, arrastados, como de alguém muito velho ou muito cansado. O barulho de uma tranca sendo removida.
<br><br>
A porta abre um palmo. Um rosto aparece na fresta — uma mulher velha, miúda, de cabelos brancos presos, usando um vestido de chita escura. Os olhos dela são fundos e desconfiados, mas não assustados.
<br><br>
— Quem é você? — ela pergunta com voz rouca. — O que quer aqui na Fazenda São Benedito?`,
        choices: [
            { label: 'Explicar que seu carro quebrou e pedir abrigo', goto: 6 },
            { label: 'Perguntar se pode usar o telefone', goto: 7 }
        ]
    },

    5: {
        text: `A maçaneta cede. A porta não estava trancada.
<br><br>
Você empurra devagar. O interior da casa está mergulhado na penumbra. Cheira a madeira velha, a cera de vela e a algo mais antigo que você não consegue identificar — talvez ervas, talvez mofo, talvez as duas coisas.
<br><br>
— Quem tá aí?! — uma voz rouca grita lá de dentro.
<br><br>
Passos rápidos vêm em sua direção.`,
        event: { type: 'fear', amount: 1, reason: 'A voz no escuro te assustou.' },
        choices: [
            { label: 'Ficar parado e se identificar', goto: 6 },
            { label: 'Recuar para o alpendre e bater normalmente', goto: 4 }
        ]
    },

    6: {
        text: `A velha te ouve, analisa seu rosto molhado pela chuva por um longo momento, e então abre a porta de par em par.
<br><br>
— Entre. — Ela diz apenas isso.
<br><br>
O salão de entrada é grande, com pé-direito alto. Nas paredes, retratos a óleo de homens severos com bigode e paletó. Uma escada de madeira sobe para o andar de cima. No canto, um oratório com Nossa Senhora cercada de velas acesas.
<br><br>
— Sou Dona Luzia — a velha diz, fechando a porta com a tranca. — Cuido desta casa desde que o Coronel morreu. Faz trinta anos. — Ela te olha de cima a baixo. — Pode usar o quarto de hóspedes. Mas tem uma regra: não sobe pro segundo andar. Por nada.`,
        choices: [
            { label: 'Aceitar as condições e pedir onde é o quarto', goto: 8 },
            { label: 'Perguntar por que não pode subir', goto: 9 }
        ]
    },

    7: {
        text: `— Telefone? — Dona Luzia repete, como se a palavra fosse estranha. — O único telefone da fazenda parou de funcionar há três anos. Ninguém consertou.
<br><br>
Ela abre a porta um pouco mais. Atrás dela, você consegue ver o interior escuro da casa.
<br><br>
— Mas pode entrar. Essa chuva não para tão cedo.`,
        choices: [
            { label: 'Aceitar e entrar', goto: 6 }
        ]
    },

    8: {
        text: `Dona Luzia te guia por um corredor comprido, iluminado por uma lamparina de querosene que ela carrega. As paredes têm papel de parede desbotado — flores amarelas que o tempo transformou em manchas sem forma.
<br><br>
O quarto de hóspedes fica no fundo do corredor térreo. Cama de madeira pesada com colcha de retalhos, uma janela que dá para o quintal, uma bacia e um jarro com água.
<br><br>
— Amanhã cedo tem café. — Ela coloca a lamparina no criado-mudo. — Não acende mais nada que não seja vela. A instalação elétrica é velha. — Ela sai sem olhar para trás.
<br><br>
Você fica sozinho. A chuva bate na janela. Está exausto.`,
        choices: [
            { label: 'Deitar e tentar dormir', goto: 10 },
            { label: 'Explorar o corredor enquanto Dona Luzia dorme', goto: 11 }
        ]
    },

    9: {
        text: `A velha para. Fica de costas por um segundo e então se vira devagar.
<br><br>
— Porque lá em cima — ela diz, olhando diretamente nos seus olhos — é onde o Coronel ainda mora.
<br><br>
Ela diz isso com a voz plana, sem emoção, como quem explica o horário do almoço. Então vira de novo e começa a andar pelo corredor.
<br><br>
— Vem.`,
        event: { type: 'fear', amount: 1, reason: 'O que Dona Luzia disse sobre o Coronel te perturbou.' },
        choices: [
            { label: 'Seguir Dona Luzia', goto: 8 }
        ]
    },

    10: {
        text: `Você deita com roupa mesmo, muito molhado ainda, e apaga a lamparina. O colchão afunda de um jeito que só colchões muito velhos afundam — como se a cama fosse te engolir.
<br><br>
Você fecha os olhos. A chuva continua. Lá pelo meio da madrugada você está quase dormindo quando ouve — claramente, sem possibilidade de dúvida — passos pesados no andar de cima. Vagarosos. Regulares. Ida e volta. Ida e volta.
<br><br>
Dona Luzia disse que o quarto dela ficava nos fundos do térreo.`,
        event: { type: 'fear', amount: 2, reason: 'Os passos no andar de cima te encheram de um medo irracional.' },
        choices: [
            { label: 'Ignorar e forçar o sono', goto: 12 },
            { label: 'Pegar a lamparina e investigar os passos', goto: 13 }
        ]
    },

    11: {
        text: `Você pega a lamparina e sai devagar para o corredor. A luz tremeluz nas paredes de taipa.
<br><br>
Há três portas fechadas no corredor, além da que leva para a entrada. E, no final, a escada que sobe para o segundo andar.
<br><br>
O corredor cheira a uma mistura estranha: incenso, erva-de-guiné e algo mais pesado, como carne salgada.`,
        choices: [
            { label: 'Abrir a primeira porta (à esquerda)', goto: 14 },
            { label: 'Abrir a segunda porta (à direita)', goto: 15 },
            { label: 'Ir até a escada do segundo andar', goto: 16 }
        ]
    },

    12: {
        text: `Você se enrola na colcha de retalhos e tenta ignorar os passos.
<br><br>
Eles continuam por mais uma hora. Depois param tão abruptamente quanto começaram.
<br><br>
No silêncio que se segue, você finalmente dorme — um sono agitado, sem sonhos que você consiga lembrar.
<br><br>
Quando acorda, é manhã. Uma luz cinza entra pela janela. A chuva parou.`,
        choices: [
            { label: 'Ir até a cozinha procurar Dona Luzia', goto: 17 }
        ]
    },

    13: {
        text: `Você pega a lamparina e vai até o corredor. A escada para o segundo andar está no final, mergulhada na sombra.
<br><br>
Os passos continuam lá de cima. Pum. Pum. Pum. Regulares como um metrônomo.
<br><br>
Você põe o pé no primeiro degrau. A madeira range. Os passos lá de cima param imediatamente.
<br><br>
O silêncio que se segue é pior que os passos.`,
        event: { type: 'fear', amount: 1, reason: 'O silêncio repentino foi aterrorizante.' },
        choices: [
            { label: 'Continuar subindo', goto: 16 },
            { label: 'Voltar para o quarto', goto: 12 }
        ]
    },

    14: {
        text: `A porta abre com um chiado. Dentro, há uma pequena despensa. Prateleiras com potes de vidro cheios de ervas, farinha, rapadura. No chão, um saco de feijão.
<br><br>
Mas o que chama sua atenção está numa prateleira mais alta: um caderno velho, encardido, preso com um cordão. Na capa, alguém escreveu a lápis: <strong>REGISTRO — COR. A. VASCONCELLOS — 1968-1972</strong>.`,
        choices: [
            { label: 'Pegar e ler o caderno', goto: 18 },
            { label: 'Deixar onde está e fechar a porta', goto: 11 }
        ]
    },

    15: {
        text: `A segunda porta revela um quarto escuro. Cheira a remédio velho e lavanda.
<br><br>
Há uma cama — e nela, Dona Luzia dorme, ronronando levemente. Do lado de fora da janela, um galho de umbuzeiro raspa o vidro com cada ventania.
<br><br>
Você sai sem fazer barulho.`,
        choices: [
            { label: 'Ir para a primeira porta', goto: 14 },
            { label: 'Ir para a escada do segundo andar', goto: 16 }
        ]
    },

    16: {
        text: `A escada de madeira é íngreme, com corrimão de ferro frio. Cada degrau range como acusação.
<br><br>
Você chega ao patamar do segundo andar. É um corredor mais estreito que o de baixo, com o teto mais baixo também. Cheira a mofo e a algo doce demais — como flores podres.
<br><br>
Há duas portas. Embaixo da porta do fundo, uma fresta de luz alaranjada pulsa devagar, como respiração.`,
        event: { type: 'fear', amount: 2, reason: 'O segundo andar exalava uma presença que você não sabia nomear.' },
        choices: [
            { label: 'Ir até a porta com luz', goto: 19 },
            { label: 'Abrir a primeira porta (sem luz)', goto: 20 },
            { label: 'Descer correndo', goto: 21 }
        ]
    },

    17: {
        text: `A cozinha fica nos fundos. Fogão a lenha, mesa de madeira grossa, uma janela com vista para o quintal abandonado.
<br><br>
Dona Luzia está de costas, mexendo numa panela que cheira a café forte e canela. Sem se virar, ela diz:
<br><br>
— Você ouviu os passos, né?
<br><br>
Pausa.
<br><br>
— Todo mundo que fica aqui ouve. — Ela te entrega uma cuia de café. — Sente.
<br><br>
Você senta. Ela senta na cadeira de frente, envolve a cuia entre as mãos e te olha com aqueles olhos fundos.
<br><br>
— O Coronel morreu em 1972. Mas ele não foi embora. Nunca vai.`,
        choices: [
            { label: 'Perguntar o que aconteceu com o Coronel', goto: 22 },
            { label: 'Perguntar como sair daqui logo', goto: 23 }
        ]
    },

    18: {
        text: `O caderno está cheio de anotações em letra pequena, inclinada, difícil de ler. É um diário do Coronel Aurino.
<br><br>
As primeiras páginas são sobre a fazenda — colheitas, gado, nomes de trabalhadores. Mas a partir de 1971, o tom muda.
<br><br>
<em>"O Padre Onofre veio até mim. Disse que o que faço com os moradores não é cristão. Que Deus vai me cobrar. Que bobagem. Deus não conhece o Sertão."</em>
<br><br>
Mais adiante, em letras grandes e pressionadas:
<br><br>
<em>"Nenhum homem manda no Coronel Aurino. Nem Deus."</em>
<br><br>
A última entrada é de outubro de 1972. A letra está tremida:
<br><br>
<em>"Ela veio. Não sei de onde. Não sei o nome. Os cachorros não param de uivar."</em>`,
        event: { type: 'fear', amount: 1, reason: 'O que o Coronel escreveu te encheu de um mal-estar profundo.' },
        choices: [
            { label: 'Continuar lendo — procurar mais páginas', goto: 24 },
            { label: 'Guardar o caderno e voltar para o quarto', goto: 12 }
        ]
    },

    19: {
        text: `Você se aproxima da porta do fundo. A luz alaranjada pulsa pela fresta.
<br><br>
Você toca a maçaneta. Fria como ferro no inverno.
<br><br>
A porta abre.
<br><br>
A sala é grande. No centro, uma cadeira de balanço. E nela, sentado, está um homem velho — de terno escuro e gravata, chapéu palheta na cabeça — com os olhos fechados e as mãos postas sobre os joelhos.
<br><br>
Há velas acesas em cada canto. Em cima de uma cômoda, uma foto emoldurada: é o mesmo homem, jovem, ao lado de outros homens com rifles.
<br><br>
O homem na cadeira abre os olhos. Os olhos são brancos. Sem íris. Sem pupila.
<br><br>
— Quem te convidou pra entrar? — ele diz com voz de areia.`,
        event: { type: 'fear', amount: 3, reason: 'O Coronel Aurino te olhou com olhos brancos e vazios.' },
        choices: [
            { label: 'Responder que só queria saber o que era a luz', goto: 25 },
            { label: 'Correr', goto: 26 }
        ]
    },

    20: {
        text: `A primeira porta do segundo andar abre para um quartinho com janela voltada para a mata. A chuva batia aqui com mais força — a janela está mal vedada e o chão embaixo dela está encharcado.
<br><br>
No canto há um baú de couro com fecho enferrujado. Sobre o baú, um terço de madeira e uma faca de ponta com cabo de chifre.`,
        choices: [
            { label: 'Abrir o baú', goto: 27 },
            { label: 'Pegar a faca', goto: 28 },
            { label: 'Ir até a porta com luz', goto: 19 }
        ]
    },

    21: {
        text: `Você desce a escada correndo, os degraus rangendo como se a casa inteira reclamasse da sua covardia.
<br><br>
De volta no corredor térreo, você encosta na parede e espera o coração desacelerar.
<br><br>
<em>Subir lá de cima foi um erro. Mas voltar foi uma boa decisão.</em>`,
        choices: [
            { label: 'Voltar para o quarto e dormir', goto: 12 }
        ]
    },

    22: {
        text: `Dona Luzia sopra o café.
<br><br>
— O Coronel era um homem de muito poder aqui nessa região. Terras, gado, gente. A vida e a morte de quem ele quisesse. Num país sem lei pro sertão, ele era a lei.
<br><br>
— Em 1972, uma mulher apareceu aqui. Ninguém sabia de onde vinha. Pediu pouso. Ele deixou. — Pausa. — Três dias depois ele morreu na cama. Cara pra cima, os olhos abertos. Os cachorros ficaram uivando a noite toda.
<br><br>
— A mulher sumiu antes do amanhecer.
<br><br>
— E desde então?
<br><br>
Dona Luzia te olha.
<br><br>
— Desde então ele ainda tá aqui. E vai ficar até que alguém termine o que a mulher começou.`,
        choices: [
            { label: 'Perguntar o que a mulher começou', goto: 29 },
            { label: 'Perguntar como pode ajudar a terminar', goto: 30 }
        ]
    },

    23: {
        text: `— Sair? — Dona Luzia quase ri. — Estrada de terra virou rio com essa chuva. Vai demorar um dia, talvez dois, pra secar.
<br><br>
Ela coloca a cuia na mesa.
<br><br>
— Mas posso chamar o Zezinho do sítio vizinho pra ver o seu carro. Ele entende de motor. Às vezes.
<br><br>
Enquanto espera, você pode explorar a fazenda — ou pode tentar descobrir o que está acontecendo nesta casa.`,
        choices: [
            { label: 'Perguntar sobre os passos que ouviu à noite', goto: 31 },
            { label: 'Aceitar esperar e explorar a fazenda à luz do dia', goto: 32 }
        ]
    },

    24: {
        text: `Você passa as últimas páginas do caderno. Algumas estão coladas pela umidade, outras com trechos ilegíveis.
<br><br>
Mas numa das últimas páginas, você encontra algo diferente: um mapa desenhado a mão da planta da fazenda. Um círculo marca um ponto nos fundos do quintal, embaixo de uma cruz desenhada.
<br><br>
Ao lado do círculo, em letras pequenas: <strong>A CHAVE</strong>.
<br><br>
Você guarda o caderno dentro da sua camisa.`,
        choices: [
            { label: 'Voltar para o quarto e esperar o amanhecer', goto: 12 },
            { label: 'Ir para o quintal agora, com a lamparina', goto: 33 }
        ]
    },

    25: {
        text: `— A luz — você diz, com a voz mais firme que consegue. — Eu vi a luz pela fresta.
<br><br>
O homem te olha por um longo momento com aqueles olhos brancos. A cadeira de balanço começa a se mover, devagar, sem que ele use os pés.
<br><br>
— Todo mundo que vem aqui diz isso — ele diz. — Todo mundo mente.
<br><br>
Ele se levanta. É mais alto do que pareceu sentado.
<br><br>
— Mas você... você tem alguma coisa diferente. Cheiro de quem não tem medo o suficiente.
<br><br>
Ele sorri. Os dentes são perfeitos. Brancos demais.
<br><br>
— Vamos ver se a fazenda te quebra.`,
        choices: [
            { label: 'Segurar o olhar dele', goto: 34 },
            { label: 'Sair do quarto calmamente', goto: 35 }
        ]
    },

    26: {
        text: `Você se vira e corre. O corredor do segundo andar parece mais comprido do que quando você entrou. A lamparina quase apaga na velocidade.
<br><br>
Atrás de você, a voz do homem ressoa:
<br><br>
— Corra. Corra, sim. Eu tenho toda a eternidade.
<br><br>
Você desce a escada aos tropeços e só para quando chega ao corredor térreo.`,
        event: { type: 'fear', amount: 2, reason: 'A voz do Coronel te perseguiu pela escada.' },
        choices: [
            { label: 'Voltar para o quarto e trancar a porta', goto: 36 }
        ]
    },

    27: {
        text: `O baú é pesado. O fecho cede com esforço.
<br><br>
Dentro: roupas antigas dobradas, um par de botas de couro, um rosário de pedra preta — e no fundo, embrulhado em pano de saco, um livro de capa escura com um símbolo que você não reconhece gravado a ferro.
<br><br>
Quando você toca o livro, sua mão formiga como se tivesse encostado num fio desencapado.`,
        event: { type: 'fear', amount: 1, reason: 'O livro transmitiu algo que você não soube nomear.' },
        choices: [
            { label: 'Pegar o livro', goto: 37 },
            { label: 'Deixar o livro e fechar o baú', goto: 20 }
        ]
    },

    28: {
        text: `Você pega a faca. O cabo de chifre é quente na mão, como se estivesse guardando calor de um corpo.
<br><br>
É uma boa faca — lâmina de aço com fio cuidado. Alguém a manteve afiada por muito tempo.
<br><br>
<em>Você ganhou uma FACA. Sua PERÍCIA aumenta em 1.</em>`,
        event: { type: 'gain', stat: 'pericia', amount: 1, item: 'Faca de chifre' },
        choices: [
            { label: 'Abrir o baú', goto: 27 },
            { label: 'Ir até a porta com luz', goto: 19 }
        ]
    },

    29: {
        text: `Dona Luzia fecha os olhos por um momento.
<br><br>
— A mulher era uma feiticeira. Fez um trabalho no Coronel — prendeu a alma dele aqui. Pra ele pagar por tudo que fez em vida.
<br><br>
— Mas o trabalho tava incompleto. Pra fechar, precisa de uma chave. Que a mulher enterrou nos fundos do quintal antes de sumir.
<br><br>
Ela abre os olhos.
<br><br>
— Eu sou velha demais. Não tenho forças. — Ela te olha. — Mas você talvez tenha.`,
        choices: [
            { label: 'Aceitar ajudar e perguntar o que fazer com a chave', goto: 38 },
            { label: 'Recusar — isso não é seu problema', goto: 39 }
        ]
    },

    30: {
        text: `Dona Luzia sorri pela primeira vez. É um sorriso pequeno, cansado.
<br><br>
— Eu precisava que você perguntasse isso.
<br><br>
Ela abre uma gaveta da mesa da cozinha e tira um papel dobrado — um mapa da fazenda, desenhado à mão.
<br><br>
— Tem uma chave enterrada nos fundos do quintal. Embaixo da cruz de madeira. Você precisa pegar essa chave e usar na porta do quarto do Coronel — a fechadura no espelho.`,
        choices: [
            { label: 'Perguntar o que acontece quando usar a chave', goto: 40 },
            { label: 'Ir direto buscar a chave no quintal', goto: 33 }
        ]
    },

    31: {
        text: `Dona Luzia olha para o café.
<br><br>
— São os passos do Coronel. Todo noite. Oito passos pra lá, oito passos pra cá. Desde 1972.
<br><br>
— Trinta anos de passos — você diz.
<br><br>
— Trinta anos. — Ela não acrescenta nada.`,
        choices: [
            { label: 'Perguntar o que aconteceu com o Coronel', goto: 22 }
        ]
    },

    32: {
        text: `O dia amanhece cinza, com o cheiro de terra molhada que entra por todas as fretas da casa.
<br><br>
Você toma o café e vai explorar a fazenda à luz do dia. O terreiro de barro vermelho ainda brilha de chuva. Há um paiol, um curral vazio, e nos fundos, tomado pelo mato, um quintal com uma velha cruz de madeira fincada na terra.
<br><br>
A terra em volta da cruz parece diferente das redondezas — mais escura, mais mexida.`,
        choices: [
            { label: 'Cavar embaixo da cruz', goto: 41 },
            { label: 'Voltar para dentro e falar com Dona Luzia', goto: 22 }
        ]
    },

    33: {
        text: `O quintal dos fundos é escuro mesmo com a lamparina. A chuva virou garoa fina. O capim molhado molha seus pés.
<br><br>
Você encontra a cruz do mapa — uma cruz de madeira preta, fincada entre um pé de arruda e um de guiné, com fitas desbotadas nas travessas.
<br><br>
A terra embaixo está fofa. Alguém cavou aqui antes.`,
        choices: [
            { label: 'Cavar com as mãos', goto: 41 },
            { label: 'Procurar uma ferramenta antes de cavar', goto: 42 }
        ]
    },

    34: {
        text: `Você sustenta o olhar do Coronel. Os olhos brancos não piscam.
<br><br>
Por um momento longo — cinco segundos, talvez dez — vocês ficam se encarando. Então o Coronel recua um passo e você percebe algo que parece surpresa no rosto sem vida dele.
<br><br>
— Interessante — ele diz. — Faz tempo que alguém não me enfrenta assim.
<br><br>
<em>Sua coragem impressionou o Coronel. Você ganha 1 ponto de SORTE.</em>`,
        event: { type: 'gain', stat: 'sorte', amount: 1 },
        choices: [
            { label: 'Perguntar o que ele quer', goto: 43 },
            { label: 'Sair do quarto enquanto ele está recuado', goto: 35 }
        ]
    },

    35: {
        text: `Você sai do quarto devagar, de costas, sem correr.
<br><br>
O Coronel não se move. Fica na cadeira, os olhos brancos acompanhando cada passo seu.
<br><br>
Você desce a escada. A lamparina tremula mas não apaga.
<br><br>
No corredor térreo, você encosta na parede e respira fundo.`,
        choices: [
            { label: 'Voltar para o quarto e esperar o amanhecer', goto: 12 },
            { label: 'Ir para o quintal buscar a chave', goto: 33 }
        ]
    },

    36: {
        text: `Você entra no quarto de hóspedes e fecha a porta. Não há tranca — só um prego enferrujado que mal serve de batente.
<br><br>
Você empurra a cama contra a porta e senta nela, a lamparina no colo, esperando o amanhecer.
<br><br>
Os passos voltam lá de cima. Mas desta vez, depois de uma hora, uma segunda série de passos começa — mais leves, mais rápidos, vindo em direção à escada.
<br><br>
Param no patamar.
<br><br>
Silêncio.
<br><br>
Então voltam.`,
        event: { type: 'fear', amount: 2, reason: 'Os passos que vieram até a escada quase te fizeram enlouquecer.' },
        choices: [
            { label: 'Aguentar até o amanhecer', goto: 17 },
            { label: 'Sair pela janela do quarto e ir para o quintal', goto: 33 }
        ]
    },

    37: {
        text: `Você pega o livro. A formigação sobe pelo braço e chega ao peito.
<br><br>
A capa tem um título gravado em letras que você não reconhece. Mas quando você a abre, as páginas são em português — letra miúda, cerrada, em tinta que parece mais escura que preto.
<br><br>
É um livro de rezas. Mas não rezas de santo. Rezas de amarração. De fechamento. De remoção de espíritos que não saíram quando deveriam.
<br><br>
Numa página marcada com uma fita vermelha: <strong>REZA DO DESATAMENTO — para almas presas por vontade alheia.</strong>
<br><br>
<em>Você encontrou o Livro de Rezas. Guarda-o com você.</em>`,
        event: { type: 'gain', item: 'Livro de Rezas' },
        choices: [
            { label: 'Voltar para o quarto para ler o livro com calma', goto: 44 },
            { label: 'Ir imediatamente ao quarto do Coronel com o livro', goto: 19 }
        ]
    },

    38: {
        text: `— A chave vai na fechadura que fica no espelho dentro do quarto do Coronel — Dona Luzia explica. — O espelho é o que prende ele aqui. Você usa a chave, diz as palavras — ela te passa um papel dobrado — e o espelho quebra.
<br><br>
— E o Coronel?
<br><br>
— Vai finalmente embora. — Ela aperta suas mãos entre as dela, que estão frias como pedra. — Pode ser bravo. Pode tentar te impedir. Mas ele não pode sair do quarto dele enquanto o espelho tiver inteiro.`,
        choices: [
            { label: 'Ir buscar a chave no quintal', goto: 33 },
            { label: 'Subir agora para enfrentar o Coronel sem a chave', goto: 16 }
        ]
    },

    39: {
        text: `— Não é meu problema — você diz. — Meu carro quebrou. Quero sair daqui e pronto.
<br><br>
Dona Luzia te olha sem julgamento.
<br><br>
— Eu entendo. Mas saiba: quem fica aqui uma noite, carrega alguma coisa quando vai embora. — Ela levanta para pegar mais café. — Sempre.
<br><br>
As palavras ficam no ar enquanto você termina o café em silêncio.`,
        choices: [
            { label: 'Mudar de ideia e aceitar ajudar', goto: 29 },
            { label: 'Ir para o terreiro esperar o Zezinho consertar o carro', goto: 45 }
        ]
    },

    40: {
        text: `— O que acontece — Dona Luzia diz devagar — é que o espelho no quarto do Coronel se parte. E a alma dele vai finalmente embora.
<br><br>
— E a fazenda?
<br><br>
— A fazenda fica. Eu fico. — Ela dá de ombros. — Mas pelo menos a noite vai ser silenciosa.
<br><br>
Ela aperta seu braço com uma força surpreendente para uma mulher tão velha.
<br><br>
— Vai com cuidado. Ele pode se defender.`,
        choices: [
            { label: 'Ir buscar a chave no quintal', goto: 33 }
        ]
    },

    41: {
        text: `Você ajoelha na terra molhada e começa a cavar. A terra cede facilmente — fofa, úmida.
<br><br>
A uns vinte centímetros de profundidade, seus dedos tocam metal.
<br><br>
É uma chave grande, de ferro escuro, com um anel no cabo em forma de cruz. Está embrulhada num pano preto já apodrecido.
<br><br>
<em>Você encontrou a CHAVE DO ESPELHO.</em>`,
        event: { type: 'gain', item: 'Chave do Espelho' },
        choices: [
            { label: 'Subir para o quarto do Coronel', goto: 16 },
            { label: 'Voltar para falar com Dona Luzia primeiro', goto: 38 }
        ]
    },

    42: {
        text: `Você procura pelo quintal e encontra, encostada no paiol, uma enxada com cabo partido.
<br><br>
Serve. Você volta à cruz e começa a cavar.`,
        choices: [
            { label: 'Cavar com a enxada', goto: 41 }
        ]
    },

    43: {
        text: `O Coronel inclina a cabeça.
<br><br>
— O que eu quero? — Ele pensa. — Quero o que qualquer homem quer. Paz. Mas a bruxa me tirou isso. Me prendeu aqui como animal.
<br><br>
— Pode me ajudar a sair?
<br><br>
Ele te olha com os olhos brancos.
<br><br>
— Tem uma chave enterrada nos fundos. — Pausa. — Mas saiba: se você me liberar, eu vou pro meu lugar. E não é um lugar bom. Eu sei o que fiz. — Ele assenta. — Mas é melhor que isso aqui.`,
        choices: [
            { label: 'Prometer que vai buscar a chave', goto: 46 },
            { label: 'Sair sem prometer nada', goto: 35 }
        ]
    },

    44: {
        text: `De volta ao quarto, você lê a Reza do Desatamento à luz da lamparina.
<br><br>
São três estrofes curtas — palavras que parecem simples mas que têm um peso diferente quando você as lê em voz alta, mesmo baixinho. A última linha diz: <em>"e o que estava preso, solto seja, e vá embora em paz."</em>
<br><br>
Você memoriza as palavras. Sente que vai precisar delas.
<br><br>
<em>Você aprendeu a Reza do Desatamento. Na hora certa, ela funcionará.</em>`,
        event: { type: 'gain', item: 'Reza do Desatamento' },
        choices: [
            { label: 'Ir buscar a chave no quintal', goto: 33 },
            { label: 'Esperar o amanhecer', goto: 17 }
        ]
    },

    45: {
        text: `Você vai para o terreiro e senta num banco de madeira debaixo de uma mangueira.
<br><br>
Meia hora depois, um homem miúdo de uns cinquenta anos aparece pela porteira com uma caixa de ferramentas improvisada. Zezinho.
<br><br>
Ele desce até o carro, olha o motor por dez minutos e sobe de volta.
<br><br>
— Problema no carburador. Tenho a peça em casa mas preciso ir buscar. Volto amanhã cedo.
<br><br>
Você vai ter que passar mais uma noite na fazenda.`,
        choices: [
            { label: 'Aceitar e decidir investigar a fazenda enquanto espera', goto: 32 },
            { label: 'Procurar Dona Luzia e mudar de ideia sobre ajudar', goto: 29 }
        ]
    },

    46: {
        text: `— Vou buscar — você diz.
<br><br>
O Coronel assente com a cabeça. Por um segundo, embaixo da máscara do homem morto, você acha que vê algo — cansaço, talvez. Arrependimento.
<br><br>
— Vai logo — ele diz. — Minha paciência acabou faz tempo.`,
        choices: [
            { label: 'Descer e ir buscar a chave no quintal', goto: 33 }
        ]
    },

    47: {
        text: `Você encontra a escada de volta ao segundo andar. Desta vez sabe o que espera lá em cima.
<br><br>
Com a chave na mão e o coração disparado, você sobe.
<br><br>
O corredor está como antes. A luz pulsa embaixo da porta do fundo.`,
        choices: [
            { label: 'Entrar no quarto do Coronel', goto: 48 }
        ]
    },

    48: {
        text: `Você abre a porta do quarto.
<br><br>
O Coronel está na cadeira de balanço. Os olhos brancos se viram para você assim que você entra.
<br><br>
— Você voltou — ele diz.
<br><br>
— Eu trouxe a chave.
<br><br>
Por um momento, o rosto do homem muda — algo passa por ele, rápido demais pra identificar.
<br><br>
— O espelho está ali. — Ele aponta sem se levantar. — Mas eu preciso te avisar: quando você usar a chave, vai doer. Em você, não em mim.`,
        choices: [
            { label: 'Usar a chave no espelho mesmo assim', goto: 49 },
            { label: 'Hesitar e perguntar por que vai doer', goto: 50 }
        ]
    },

    49: {
        text: `Você vai até o espelho. É um espelho oval, de moldura dourada, pendurado na parede.
<br><br>
Na base da moldura, há uma fechadura pequena. Você encaixa a chave.
<br><br>
Ela gira.
<br><br>
O espelho começa a vibrar. A imagem dentro dele distorce — você vê seu próprio reflexo se deformar, se partir, e atrás dele, no escuro do espelho, algo imenso e escuro se movendo.
<br><br>
<strong>Teste sua SORTE.</strong> Se tiver sorte, segura firme e não larga a chave. Se não, a dor te faz soltar.`,
        event: { type: 'luck', success: 51, fail: 52 }
    },

    50: {
        text: `— Por que vai doer? — você pergunta.
<br><br>
— Porque o que prende eu aqui também vai passar por você quando quebrar — o Coronel diz. — Um segundo de tudo que eu fiz. Um segundo do peso que carrego.
<br><br>
Ele te olha.
<br><br>
— Se você for fraco de espírito, não sobrevive.
<br><br>
<strong>Teste sua SORTE.</strong> Se tiver sorte, você tem espírito forte o suficiente. Se não tiver, considere se quer mesmo prosseguir.`,
        event: { type: 'luck', success: 49, fail: 53 }
    },

    51: {
        text: `Você segura.
<br><br>
A dor vem — não dor física, mas algo pior. Em um segundo que parece uma hora, você vive um flash de memórias que não são suas: terra queimada, gritos, rostos com medo, mãos que ordenam e mãos que obedecem e olhos que imploram e uma voz que diz não.
<br><br>
Depois passa.
<br><br>
O espelho racha do centro para as bordas com um estalo seco. Os pedaços caem no chão.
<br><br>
Atrás de você, a cadeira para de balançar.
<br><br>
O Coronel Aurino Vasconcellos desaparece.`,
        choices: [
            { label: 'Olhar para onde ele estava', goto: 54 }
        ]
    },

    52: {
        text: `A dor te faz soltar a chave. Você cai de joelhos no chão, a mão queimando.
<br><br>
O espelho para de vibrar. A chave cai no chão.
<br><br>
O Coronel observa tudo da cadeira.
<br><br>
— Eu não disse pra segurar? — ele diz, sem raiva. Só cansaço.
<br><br>
<em>Você perde 2 pontos de FORÇA.</em>`,
        event: { type: 'lose', stat: 'forca', amount: 2 },
        choices: [
            { label: 'Pegar a chave e tentar de novo', goto: 49 },
            { label: 'Sair do quarto para se recuperar', goto: 35 }
        ]
    },

    53: {
        text: `— Não sei se consigo — você admite.
<br><br>
O Coronel te olha por um longo momento.
<br><br>
— Então vai buscar forças primeiro — ele diz. — Tem uma benzedeira nos fundos do quintal. Cruz de pedra, não de madeira. Ela pode te ajudar.
<br><br>
Você desce.`,
        choices: [
            { label: 'Ir ao quintal procurar a cruz de pedra', goto: 55 }
        ]
    },

    54: {
        text: `A cadeira de balanço está vazia. As velas nas paredes apagam uma por uma, sem vento.
<br><br>
A última coisa que apaga é a luz alaranjada embaixo da porta.
<br><br>
O quarto fica escuro e em silêncio.
<br><br>
Você desce a escada com cuidado. No corredor térreo, Dona Luzia está de pé com uma lamparina, esperando.
<br><br>
Ela te olha.
<br><br>
— Acabou — ela diz. Não é uma pergunta.
<br><br>
— Acabou.
<br><br>
Pela primeira vez em trinta anos, a Fazenda São Benedito fica em silêncio.`,
        choices: [
            { label: 'Continuar para o fim da história', goto: 56 }
        ]
    },

    55: {
        text: `No quintal, além da cruz de madeira onde você cavou, há uma segunda cruz — menor, de pedra calcária — encostada num canto entre o paiol e a cerca de arame.
<br><br>
Embaixo dela, há uma pedra lisa com um nome gravado: BENEDITA, 1934.
<br><br>
Você ajoelha involuntariamente. Sente uma calma estranha — como se o lugar tivesse uma temperatura diferente do resto do quintal.
<br><br>
<em>Você recupera 2 pontos de FORÇA e 1 de SORTE na presença da pedra de Benedita.</em>`,
        event: { type: 'gain', stat: 'forca', amount: 2 },
        choices: [
            { label: 'Voltar para o quarto do Coronel com forças renovadas', goto: 47 }
        ]
    },

    56: {
        text: `De manhã, o sol aparece pela primeira vez desde que você chegou. Laranja, derramado sobre o canavial molhado.
<br><br>
Zezinho chega com a peça do carburador às oito da manhã e tem o carro funcionando em quarenta minutos.
<br><br>
Você vai até a cozinha se despedir de Dona Luzia. Ela está no fogão, mexendo alguma coisa.
<br><br>
— Pode ir — ela diz sem se virar. — E obrigada.
<br><br>
Você quer dizer alguma coisa mas não sabe o quê. Então você simplesmente vai.
<br><br>
Na estrada de terra, no espelho retrovisor, a Fazenda São Benedito some devagar atrás das bananeiras.
<br><br>
Você ainda ouve, muito longe, um galo cantando.`,
        choices: [
            { label: 'Continuar', goto: 57 }
        ]
    },

    57: {
        text: `<strong>FIM DA AVENTURA</strong>
<br><br>
Você libertou a alma do Coronel Aurino Vasconcellos da Fazenda São Benedito, encerrando trinta anos de maldição.
<br><br>
Dona Luzia finalmente terá noites de silêncio.
<br><br>
<em>Parabéns — você completou A Mansão do Coronel.</em>`,
        choices: [],
        event: { type: 'win' }
    },

    // ─── SEÇÕES DE COMBATE / EVENTOS EXTRAS ─────────────────────

    58: {
        text: `Do alto da escada, algo desce arrastando os pés — não o Coronel, mas uma sombra baixa e curvada. Cachorros ou algo que se move como cachorros.
<br><br>
Os olhos brilham no escuro. São dois pares. Ruge baixo, gutural.
<br><br>
<strong>Você vai ter que lutar.</strong> São dois Cães das Trevas.`,
        event: { type: 'combat', enemies: [{ name: 'Cão das Trevas', pericia: 5, forca: 4 }, { name: 'Cão das Trevas', pericia: 5, forca: 4 }] },
        choices: [
            { label: 'Continuar após o combate', goto: 35 }
        ]
    },

    59: {
        text: `No corredor do segundo andar, uma figura baixa — não o Coronel — bloqueia seu caminho. É uma criança. Ou algo que parece uma criança, com um vestido branco sujo de barro e o rosto escondido pelo cabelo.
<br><br>
Ela levanta a cabeça devagar.
<br><br>
O rosto dela é o seu rosto.`,
        event: { type: 'fear', amount: 3, reason: 'Ver seu próprio rosto nela quebrou algo dentro de você.' },
        choices: [
            { label: 'Passar por ela correndo', goto: 19 },
            { label: 'Falar com ela', goto: 60 }
        ]
    },

    60: {
        text: `— Quem é você? — você pergunta com voz trêmula.
<br><br>
A criança com o seu rosto inclina a cabeça.
<br><br>
— Sou o que você vai virar se ficar aqui — ela diz. A voz é a sua voz, mais fina, mais vazia.
<br><br>
Então ela se dissolve no ar como fumaça.
<br><br>
O corredor está livre.`,
        choices: [
            { label: 'Ir até a porta do Coronel', goto: 19 }
        ]
    },

    61: {
        text: `No quintal, enquanto você cava, uma voz vem das sombras atrás do paiol.
<br><br>
— O que você tá fazendo aqui?
<br><br>
É um homem de uns quarenta anos, com roupa de trabalho e uma enxada. Olhos vivos, desconfiados.
<br><br>
— Eu trabalho aqui — ele diz. — Sou o Severino. Quem deixou você entrar?`,
        choices: [
            { label: 'Explicar que Dona Luzia deixou', goto: 62 },
            { label: 'Perguntar se ele sabe sobre a chave', goto: 63 }
        ]
    },

    62: {
        text: `— Dona Luzia — Severino repete, franzindo a testa. — A senhora não falou nada de visita.
<br><br>
Ele olha para o buraco que você começou a cavar.
<br><br>
— E o que você tá tirando daí?
<br><br>
Antes que você responda, ele vê a chave na sua mão.
<br><br>
Os olhos dele mudam. Ficam fundos, assustados, como se ele reconhecesse o objeto.
<br><br>
— De onde tirou isso? — ele sussurra.`,
        choices: [
            { label: 'Explicar tudo a Severino', goto: 64 },
            { label: 'Guardar a chave e ir embora sem explicar', goto: 47 }
        ]
    },

    63: {
        text: `Severino congela.
<br><br>
— Como você sabe da chave?
<br><br>
Ele fica em silêncio por um momento, te avaliando.
<br><br>
— Dona Luzia te contou — ele conclui por conta própria. Suspira. — Tá bem. Ela tentou me mandar fazer isso há dez anos. Não tive coragem.
<br><br>
Ele olha para o buraco.
<br><br>
— Vai precisar de ajuda?`,
        choices: [
            { label: 'Aceitar a ajuda de Severino', goto: 65 },
            { label: 'Recusar e ir sozinho', goto: 47 }
        ]
    },

    64: {
        text: `Você conta tudo. Os passos, o Coronel, o espelho, o que Dona Luzia disse.
<br><br>
Severino te ouve sem interromper. Quando você termina, ele fica olhando para o chão por um tempo longo.
<br><br>
— Eu nasci aqui — ele diz finalmente. — Meu pai trabalhou pro Coronel. E o pai do meu pai. — Pausa. — Nenhum dos dois teve uma vida boa.
<br><br>
— Me ajuda? — você pede.
<br><br>
Ele assente devagar.
<br><br>
— Vamos junto.`,
        choices: [
            { label: 'Subir com Severino para o segundo andar', goto: 66 }
        ]
    },

    65: {
        text: `— Aceito — você diz.
<br><br>
Severino pega a enxada e começa a cavar. Em dois minutos, a chave está na sua mão.
<br><br>
Ele te olha.
<br><br>
— Eu fico aqui fora. Lá em cima é um lugar que eu não entro. Mas se você gritar, eu entro.
<br><br>
É o suficiente.`,
        choices: [
            { label: 'Subir sozinho com a chave', goto: 47 }
        ]
    },

    66: {
        text: `Você e Severino sobem juntos. No segundo andar, Severino para no patamar e olha para a porta do fundo com uma expressão que mistura medo e raiva antiga.
<br><br>
— Ele já me apareceu uma vez — Severino diz baixo. — Quando eu tinha doze anos. — Pausa. — Nunca esqueci os olhos.
<br><br>
Vocês dois entram no quarto do Coronel.`,
        choices: [
            { label: 'Usar a chave no espelho', goto: 49 }
        ]
    },

    67: {
        text: `Você tenta usar a chave mas percebe que ela não encaixa na fechadura do espelho. Algo está errado.
<br><br>
O Coronel observa da cadeira.
<br><br>
— Chave errada — ele diz. — Quem te deu?
<br><br>
— Dona Luzia.
<br><br>
Ele faz um som que pode ser uma risada.
<br><br>
— Ela sempre soube onde estava a chave certa. Mas nunca me disse. — Pausa. — Pergunte a ela de novo. Dessa vez, pergunte com mais insistência.`,
        choices: [
            { label: 'Descer e confrontar Dona Luzia', goto: 68 }
        ]
    },

    68: {
        text: `Você desce e vai direto para a cozinha. Dona Luzia está sentada na cadeira, as mãos no colo.
<br><br>
— A chave não encaixou — você diz.
<br><br>
Ela não demonstra surpresa. Fica quieta por um momento.
<br><br>
— Tem outra chave — ela admite. — Que eu guardo faz trinta anos. — Ela coloca a mão dentro do colarinho do vestido e tira uma chave pequena pendurada num cordão no pescoço. — Essa aqui.
<br><br>
— Por que não me deu logo?
<br><br>
— Porque precisava saber se você estava mesmo disposto a ir até lá.`,
        choices: [
            { label: 'Pegar a chave verdadeira e voltar ao segundo andar', goto: 69 }
        ]
    },

    69: {
        text: `Com a chave verdadeira no pescoço, você sobe pela última vez.
<br><br>
O Coronel está esperando. Desta vez ele não fala. Apenas aponta para o espelho.
<br><br>
Você se aproxima. Encaixa a chave.
<br><br>
Ela gira com suavidade, como se estivesse esperando esse momento há trinta anos.`,
        choices: [
            { label: 'Usar a chave e liberar o Coronel', goto: 51 }
        ]
    },

    70: {
        text: `No corredor térreo, você encontra uma porta que não havia notado antes — pequena, de madeira escurecida, atrás de um guarda-roupa encostado na parede.
<br><br>
Com esforço, você move o guarda-roupa. A porta tem uma tranca pelo lado de fora.
<br><br>
Você destrava e empurra.
<br><br>
É uma escada que desce. Uma adega, talvez.`,
        choices: [
            { label: 'Descer para a adega', goto: 71 },
            { label: 'Fechar e ignorar', goto: 11 }
        ]
    },

    71: {
        text: `A adega é pequena e abafada. Prateleiras com garrafas cobertas de teia. No chão, marcas de ritual desenhadas em giz ou cal — um círculo com símbolos nos quatro pontos cardeais.
<br><br>
No centro do círculo, uma urna de barro tampada com cera preta.`,
        event: { type: 'fear', amount: 1, reason: 'O ritual no chão da adega te fez entender que a fazenda guardava segredos mais fundos que você imaginava.' },
        choices: [
            { label: 'Abrir a urna', goto: 72 },
            { label: 'Sair da adega sem tocar em nada', goto: 11 }
        ]
    },

    72: {
        text: `Você arranca a cera e tira a tampa.
<br><br>
Dentro, cuidadosamente dobradas, há cartas. Dezenas delas, todas endereçadas ao Coronel Aurino, com diferentes remetentes — nomes de lugares que você reconhece como cidades do sertão nordestino.
<br><br>
Você lê uma. É um pedido de misericórdia — alguém implorando que o Coronel libere um parente preso numa das terras.
<br><br>
Você lê outra. Uma ameaça de maldição, assinada por uma mulher chamada Benedita.
<br><br>
<em>Benedita. O mesmo nome na pedra do quintal.</em>
<br><br>
<em>Você ganha 1 ponto de SORTE pela descoberta.</em>`,
        event: { type: 'gain', stat: 'sorte', amount: 1 },
        choices: [
            { label: 'Subir e confrontar Dona Luzia sobre Benedita', goto: 73 },
            { label: 'Guardar as cartas e continuar explorando', goto: 11 }
        ]
    },

    73: {
        text: `— Benedita — Dona Luzia repete quando você fala o nome. Fecha os olhos. — Você foi na adega.
<br><br>
— Quem foi ela?
<br><br>
— A avó da feiticeira que prendeu o Coronel. — Dona Luzia abre os olhos. — Ele matou o filho dela. Pra tomar a terra. Uma coisa que ele fez umas trinta vezes.
<br><br>
Silêncio.
<br><br>
— A feiticeira era neta de Benedita. Veio cobrar por todos.`,
        choices: [
            { label: 'Perguntar se a feiticeira ainda existe', goto: 74 },
            { label: 'Ir direto agir', goto: 30 }
        ]
    },

    74: {
        text: `— Ela ainda existe?
<br><br>
Dona Luzia pensa.
<br><br>
— Ela me apareceu em sonho uma vez, uns dez anos atrás — ela diz. — Disse que ia mandar alguém terminar o trabalho. — Ela te olha com atenção. — Talvez você seja esse alguém.
<br><br>
Você não sabe o que responder a isso.`,
        choices: [
            { label: 'Aceitar seu papel e agir', goto: 30 }
        ]
    },

    75: {
        text: `Você está no quintal quando ouve um barulho atrás do paiol. Vai investigar.
<br><br>
É uma cabra. Uma cabra velha, presa numa corda curta, que te olha com olhos amarelos e horizontais.
<br><br>
Mas em volta do pescoço dela há um cordão. E no cordão, pendurada, uma pequena bolsinha de couro.`,
        choices: [
            { label: 'Tirar a bolsinha do pescoço da cabra', goto: 76 },
            { label: 'Deixar a cabra em paz', goto: 33 }
        ]
    },

    76: {
        text: `A cabra fica quieta enquanto você desamarra o cordão. Dentro da bolsinha há pó de cor vermelha-escura e um papelzinho dobrado.
<br><br>
No papel, em letra de Dona Luzia, está escrito: <em>"Para quem precisar de proteção. Carregue perto do coração."</em>
<br><br>
<em>Você ganhou um Patuá de Proteção. Na próxima vez que falhar num teste de SORTE, você pode ignorar o resultado e tentar de novo — mas apenas uma vez.</em>`,
        event: { type: 'gain', item: 'Patuá de Proteção' },
        choices: [
            { label: 'Ir buscar a chave embaixo da cruz', goto: 33 }
        ]
    },

    77: {
        text: `De madrugada, você acorda com um cheiro forte de enxofre no quarto.
<br><br>
A lamparina está apagada.
<br><br>
No escuro, você ouve respiração. Dentro do quarto. Pesada. Próxima.`,
        event: { type: 'fear', amount: 2, reason: 'A respiração no escuro do seu quarto te fez gelar por dentro.' },
        choices: [
            { label: 'Acender a lamparina', goto: 78 },
            { label: 'Fingir que ainda está dormindo', goto: 79 }
        ]
    },

    78: {
        text: `Suas mãos tremem enquanto você acende o fósforo.
<br><br>
A lamparina acende.
<br><br>
O quarto está vazio.
<br><br>
A janela, que você tinha certeza que havia fechado, está aberta. O ar cheira a mato molhado.
<br><br>
Na soleira da janela, marcas de barro. Como de pés descalços que entraram — e saíram.`,
        choices: [
            { label: 'Fechar a janela e não dormir mais', goto: 35 },
            { label: 'Sair pela janela e ir ao quintal', goto: 33 }
        ]
    },

    79: {
        text: `Você fecha os olhos com força e fica quieto.
<br><br>
A respiração se aproxima. Para ao lado da sua cabeça.
<br><br>
Depois recua devagar. Some.
<br><br>
Quando você reabre os olhos, o quarto está silencioso e vazio. A janela está aberta.
<br><br>
Você não vai dormir mais essa noite.`,
        choices: [
            { label: 'Sair para investigar o quintal', goto: 33 },
            { label: 'Ficar no quarto até amanhecer', goto: 17 }
        ]
    },

    80: {
        text: `Você encontra uma foto guardada atrás de um dos retratos do corredor — menor, sem moldura.
<br><br>
É uma mulher jovem, de uns trinta anos, com vestido claro e cabelos soltos. Atrás dela, reconhecível mesmo em preto-e-branco, a fachada da Fazenda São Benedito.
<br><br>
No verso, em letra caprichada: <em>Marcelina, outubro de 1972.</em>
<br><br>
Outubro de 1972. O mês da última entrada no diário do Coronel.`,
        choices: [
            { label: 'Guardar a foto e procurar Dona Luzia', goto: 81 },
            { label: 'Deixar a foto onde estava', goto: 11 }
        ]
    },

    81: {
        text: `Você mostra a foto para Dona Luzia.
<br><br>
A velha fica branca.
<br><br>
— De onde você tirou isso? — ela sussurra.
<br><br>
— Atrás de um retrato no corredor. Quem é Marcelina?
<br><br>
Dona Luzia leva um tempo para responder.
<br><br>
— Marcelina era a feiticeira — ela diz finalmente. — A que prendeu o Coronel.
<br><br>
Ela te devolve a foto e olha de lado.
<br><br>
— E isso quer dizer que ela ainda esteve aqui depois que eu pensei que ela tinha sumido.`,
        choices: [
            { label: 'Perguntar o que isso significa', goto: 74 }
        ]
    },

    82: {
        text: `No amanhecer, antes de buscar a chave, você vai até o oratório com Nossa Senhora no salão de entrada.
<br><br>
Você não é uma pessoa religiosa. Mas fica ali por um momento, na frente das velas, sem saber bem o que dizer.
<br><br>
No final, você só diz: <em>me ajuda.</em>
<br><br>
<em>Você recupera 1 ponto de FORÇA e 1 de SORTE.</em>`,
        event: { type: 'gain', stat: 'forca', amount: 1 },
        choices: [
            { label: 'Ir buscar a chave no quintal', goto: 33 }
        ]
    },

    83: {
        text: `Você está passando pelo corredor quando uma das portas que antes estavam fechadas abre sozinha.
<br><br>
Você para. Olha para dentro.
<br><br>
É uma sala pequena, com uma mesa de costura e, sobre ela, um trabalho inacabado — um bordado de pano branco com figuras que você não consegue decifrar à primeira vista.
<br><br>
Quando você olha com mais atenção, percebe que o bordado mostra a planta da fazenda. E num dos quartos do segundo andar, bordado em fio vermelho, um espelho.`,
        choices: [
            { label: 'Examinar o bordado com cuidado', goto: 84 },
            { label: 'Sair do quarto e continuar', goto: 11 }
        ]
    },

    84: {
        text: `No bordado, além do espelho, há detalhes que você passa a ver: uma chave embaixo de uma cruz no quintal, uma figura que parece uma velha sentada na cozinha, e no centro da fazenda, bordado em fio preto, um homem numa cadeira.
<br><br>
Alguém bordou o mapa completo da situação. Alguém que sabia de tudo.
<br><br>
No canto do tecido, iniciais bordadas em azul: <em>M.V.</em>
<br><br>
Marcelina.`,
        event: { type: 'gain', stat: 'sorte', amount: 1 },
        choices: [
            { label: 'Ir buscar a chave', goto: 33 }
        ]
    },

    85: {
        text: `Uma hora antes do amanhecer, com a chave na mão, você para na escada e pensa em desistir.
<br><br>
Você está cansado. Com medo. E isso não é seu problema.
<br><br>
Então você lembra da última entrada do diário do Coronel, da pedra de Benedita no quintal, dos retratos de homens severos no corredor, das cartas de súplica na urna.
<br><br>
Você continua subindo.`,
        choices: [
            { label: 'Entrar no quarto do Coronel', goto: 48 }
        ]
    },

    86: {
        text: `Você decide explorar o paiol antes de ir para o quintal.
<br><br>
O paiol cheira a palha velha e gasolina. Há um trator enferrujado que não deve andar há décadas, ferramentas dependuradas nas paredes, sacos de ração.
<br><br>
E no fundo, atrás do trator, uma porta baixa de madeira. Trancada por fora com um cadeado.`,
        choices: [
            { label: 'Tentar arrombar o cadeado', goto: 87 },
            { label: 'Deixar pra lá e ir para o quintal', goto: 33 }
        ]
    },

    87: {
        text: `Você pega um vergalhão de ferro que estava no chão e tenta forçar o cadeado.
<br><br>
<strong>Teste sua PERÍCIA.</strong> Se conseguir, o cadeado cede. Se não, ele aguenta.`,
        event: { type: 'skill', success: 88, fail: 89 }
    },

    88: {
        text: `O cadeado cede com um estalo. Você abre a porta.
<br><br>
Por trás dela, uma escada de pedra desce para um espaço abaixo do paiol. É úmido, frio, e cheira a terra.
<br><br>
No chão da câmara, um cofre de metal enferrujado. Aberto. Vazio — exceto por uma folha de papel dentro.
<br><br>
<em>"Se você chegou até aqui, é porque a casa quis. A segunda chave está com Dona Luzia. Ela sabe o que fazer. — M."</em>`,
        choices: [
            { label: 'Ir falar com Dona Luzia sobre a segunda chave', goto: 68 }
        ]
    },

    89: {
        text: `O cadeado aguenta. Você tenta por mais dois minutos antes de desistir com a mão doendo.
<br><br>
<em>Você perde 1 ponto de FORÇA pela tentativa malsucedida.</em>`,
        event: { type: 'lose', stat: 'forca', amount: 1 },
        choices: [
            { label: 'Ir para o quintal buscar a chave', goto: 33 }
        ]
    },

    90: {
        text: `Você decide ir até o cemitério atrás da fazenda que você avistou de longe — um quadrado cercado por pedras, com três ou quatro cruzeiros de madeira.
<br><br>
As lápides são simples. Dois trabalhadores, datas dos anos 40 e 50. Uma criança, 1963.
<br><br>
E a última, menor que as outras, encostada no canto: <em>Benedita, 1934. Que Deus tenha misericórdia de quem não a teve.</em>`,
        event: { type: 'fear', amount: 1, reason: 'A inscrição na lápide de Benedita carregava um peso que você sentiu fisicamente.' },
        choices: [
            { label: 'Voltar para dentro da fazenda', goto: 17 }
        ]
    },

    91: {
        text: `Você acorda no meio da noite com a sensação de que alguém está olhando para você.
<br><br>
Você abre os olhos devagar.
<br><br>
Dona Luzia está de pé na porta do quarto — de bata branca, lamparina na mão, olhando para você com uma expressão que você não consegue ler.
<br><br>
— Tava verificando se você estava bem — ela diz quando percebe que você acordou.
<br><br>
— Estou — você diz.
<br><br>
Ela assente e vai embora. Mas você jura que ouviu ela murmurar alguma coisa antes de sair. Não conseguiu entender.`,
        choices: [
            { label: 'Tentar dormir de novo', goto: 12 },
            { label: 'Seguir Dona Luzia para ver o que ela está fazendo', goto: 92 }
        ]
    },

    92: {
        text: `Você espera trinta segundos e então se levanta e vai atrás de Dona Luzia.
<br><br>
Ela foi para o oratório no salão de entrada. Está ajoelhada na frente de Nossa Senhora, a lamparina no chão ao lado dela, sussurrando uma reza que você não conhece — palavras em português misturadas com outras que você não identifica.
<br><br>
Você não se anuncia. Fica na sombra do corredor, observando.
<br><br>
Depois de alguns minutos ela para, olha para a imagem e diz em voz alta, como se soubesse que você estava ouvindo:
<br><br>
— Quando você estiver pronto, a cruz do quintal tem o que você precisa.`,
        choices: [
            { label: 'Ir ao quintal agora', goto: 33 },
            { label: 'Voltar para o quarto', goto: 12 }
        ]
    },

    93: {
        text: `Você vai até a janela do seu quarto e olha para o quintal.
<br><br>
A chuva diminuiu para uma garoa fina. A lamparina mal ilumina o canavial lá fora.
<br><br>
Mas você consegue ver, claramente, uma figura no quintal. Em pé debaixo da chuva, de roupa clara.
<br><br>
Parada. Olhando para a janela do segundo andar.`,
        event: { type: 'fear', amount: 1, reason: 'A figura parada na chuva olhando para cima te fez sentir que não estava sozinho nessa fazenda.' },
        choices: [
            { label: 'Sair para o quintal ver quem é', goto: 94 },
            { label: 'Fechar a cortina e não ver mais', goto: 10 }
        ]
    },

    94: {
        text: `Você vai até o quintal.
<br><br>
A figura sumiu. Você está sozinho na garoa, no quintal molhado.
<br><br>
Mas no chão, onde a figura estava, há pegadas de pés descalços que vêm de nenhum lugar e vão para nenhum lugar — param no meio do quintal, como se a pessoa tivesse subido no ar.
<br><br>
E a terra embaixo das pegadas, em volta das pegadas, cheira a arruda.`,
        choices: [
            { label: 'Ir até a cruz do quintal enquanto está no quintal', goto: 33 },
            { label: 'Voltar para dentro', goto: 10 }
        ]
    },

    95: {
        text: `Com o espelho quebrado, você desce a escada pela última vez.
<br><br>
O corredor térreo está diferente. Não visualmente — é a mesma madeira, o mesmo papel de parede desbotado. Mas o ar está diferente. Mais leve. Como se alguma coisa que estava pressionando contra as paredes por dentro delas tivesse ido embora.
<br><br>
Dona Luzia está na entrada, a lamparina na mão, esperando.`,
        choices: [
            { label: 'Ir até ela', goto: 54 }
        ]
    },

    96: {
        text: `Você vai até o salão de entrada e olha os retratos nas paredes.
<br><br>
São cinco homens ao longo das décadas. O último é claramente o Coronel Aurino — o mesmo rosto dos olhos brancos, aqui com olhos escuros e vivos, numa foto dos anos 60. Ele usa terno, chapéu palheta, uma expressão de alguém acostumado a não pedir e nunca perguntar.
<br><br>
Abaixo do retrato, uma plaquinha: <em>Cel. Aurino Ferreira Vasconcellos, 1921-1972.</em>
<br><br>
Você olha para ele por um tempo. Ele devolveu 51 anos de fazenda para você de uma vez.`,
        choices: [
            { label: 'Ir explorar o corredor', goto: 11 },
            { label: 'Ir para a cozinha', goto: 17 }
        ]
    },

    97: {
        text: `Já quase amanhecendo, você encontra no corredor uma coisa que não estava lá antes: um chapéu palheta pendurado num gancho na parede.
<br><br>
É um chapéu de homem, de palha fina e bem cuidado. Exatamente como o do retrato do Coronel.
<br><br>
Embaixo do chapéu, no gancho, um bilhete dobrado.`,
        choices: [
            { label: 'Ler o bilhete', goto: 98 },
            { label: 'Não encostar e ir embora logo', goto: 56 }
        ]
    },

    98: {
        text: `O bilhete está escrito numa letra que você já reconhece — a mesma letra do diário, inclinada e pequena.
<br><br>
<em>"Obrigado. Sabia que alguém ia vir um dia. Demorou, mas veio."</em>
<br><br>
E abaixo, numa letra diferente — maior, mais firme — como se outra pessoa tivesse completado:
<br><br>
<em>"Agora vai embora, menino. Você fez o que tinha que fazer."</em>
<br><br>
Você deixa o bilhete no gancho.`,
        choices: [
            { label: 'Ir embora', goto: 56 }
        ]
    },

    99: {
        text: `Sua FORÇA chegou a zero.
<br><br>
O medo e o esforço foram demais. Seus joelhos cedem no corredor escuro da Fazenda São Benedito.
<br><br>
A última coisa que você ouve, antes do escuro fechar, são os passos lentos lá em cima. Oito passos pra lá. Oito pra cá.
<br><br>
<strong>Você morreu.</strong>
<br><br>
<em>A fazenda guarda mais um segredo.</em>`,
        choices: [],
        event: { type: 'death' }
    },

    100: {
        text: `Seu MEDO chegou ao limite.
<br><br>
Não foi um monstro que te venceu. Não foi o Coronel. Foi a casa — o acúmulo de tudo que ela guarda, de tudo que aconteceu entre essas paredes.
<br><br>
Você para no corredor, incapaz de se mover, e ali fica.
<br><br>
Dona Luzia te encontra de manhã sentado no chão, os olhos abertos, olhando para a parede.
<br><br>
Ela entende. Ela já viu isso antes.
<br><br>
<strong>Você morreu de medo.</strong>
<br><br>
<em>A fazenda venceu.</em>`,
        choices: [],
        event: { type: 'death' }
    }

};