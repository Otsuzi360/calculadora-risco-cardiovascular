/**
 * Lógica principal da calculadora de risco cardiovascular
 */

class CalculadoraRiscoCardiovascular {
    constructor() {
        this.initializeEventListeners();
    }

    /**
     * Inicializa os event listeners
     */
    initializeEventListeners() {
        const form = document.getElementById('calcForm');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Adiciona validação em tempo real nos campos numéricos
        const camposNumericos = ['idade', 'colesterol', 'hdl', 'pas'];
        camposNumericos.forEach(campo => {
            const elemento = document.getElementById(campo);
            if (elemento) {
                elemento.addEventListener('input', window.ERGUtils.debounce(this.validateField.bind(this), 300));
            }
        });
    }

    /**
     * Valida um campo específico
     */
    validateField(event) {
        const campo = event.target;
        const valor = parseInt(campo.value);
        
        // Remove classes de erro anteriores
        campo.classList.remove('error');
        
        // Validações específicas por campo
        switch (campo.id) {
            case 'idade':
                if (valor && (valor < 30 || valor > 80)) {
                    this.showFieldError(campo, 'Idade deve estar entre 30 e 80 anos');
                }
                break;
            case 'colesterol':
                if (valor && (valor < 100 || valor > 400)) {
                    this.showFieldError(campo, 'Colesterol deve estar entre 100 e 400 mg/dL');
                }
                break;
            case 'hdl':
                if (valor && (valor < 20 || valor > 100)) {
                    this.showFieldError(campo, 'HDL deve estar entre 20 e 100 mg/dL');
                }
                break;
            case 'pas':
                if (valor && (valor < 90 || valor > 200)) {
                    this.showFieldError(campo, 'Pressão deve estar entre 90 e 200 mmHg');
                }
                break;
        }
    }

    /**
     * Exibe erro em um campo específico
     */
    showFieldError(campo, mensagem) {
        campo.classList.add('error');
        // Em uma versão mais avançada, poderia mostrar a mensagem próxima ao campo
    }

    /**
     * Manipula o envio do formulário
     */
    handleFormSubmit(event) {
        event.preventDefault();
        
        try {
            const dados = this.coletarDadosFormulario();
            const validacao = window.ERGUtils.validarDados(dados);
            
            if (!validacao.valido) {
                window.ERGUtils.exibirErro(validacao.erros.join('\n'));
                return;
            }

            const resultado = this.calcularRisco(dados);
            this.exibirResultados(resultado);
            
            // Scroll suave para os resultados
            setTimeout(() => {
                window.ERGUtils.scrollSuave('results');
            }, 100);
            
        } catch (error) {
            console.error('Erro ao calcular risco:', error);
            window.ERGUtils.exibirErro('Ocorreu um erro no cálculo. Verifique os dados e tente novamente.');
        }
    }

    /**
     * Coleta os dados do formulário
     */
    coletarDadosFormulario() {
        return {
            sexo: document.querySelector('input[name="sexo"]:checked')?.value,
            idade: parseInt(document.getElementById('idade').value),
            colesterol: parseInt(document.getElementById('colesterol').value),
            hdl: parseInt(document.getElementById('hdl').value),
            estatina: document.querySelector('input[name="estatina"]:checked')?.value || 'nao',
            pas: parseInt(document.getElementById('pas').value),
            medicoPressao: document.querySelector('input[name="medicoPressao"]:checked')?.value || 'nao',
            fumante: document.querySelector('input[name="fumante"]:checked')?.value || 'nao',
            diabetes: document.querySelector('input[name="diabetes"]:checked')?.value || 'nao'
        };
    }

    /**
     * Calcula a pontuação detalhada baseada nos dados fornecidos
     */
    calcularPontuacaoDetalhada(dados) {
        const { tabelasHomens, tabelasMulheres } = window.ERGTables;
        const tabelas = dados.sexo === 'M' ? tabelasHomens : tabelasMulheres;
        let detalhes = {};
        let pontuacaoTotal = 0;

        // Idade
        const faixaIdade = window.ERGUtils.getFaixaIdade(dados.idade);
        detalhes.idade = {
            valor: dados.idade + ' anos',
            pontos: tabelas.idade[faixaIdade],
            faixa: faixaIdade
        };
        pontuacaoTotal += detalhes.idade.pontos;

        // Colesterol (com ajuste para estatina)
        let colesterolAjustado = dados.colesterol;
        if (dados.estatina === 'sim') {
            colesterolAjustado = Math.round(dados.colesterol * 1.43);
        }
        const faixaColesterol = window.ERGUtils.getFaixaColesterol(colesterolAjustado);
        detalhes.colesterol = {
            valor: dados.colesterol + ' mg/dL' + (dados.estatina === 'sim' ? ' (ajustado: ' + colesterolAjustado + ')' : ''),
            pontos: tabelas.colesterol[faixaColesterol],
            faixa: faixaColesterol
        };
        pontuacaoTotal += detalhes.colesterol.pontos;

        // HDL
        let faixaHDL;
        if (dados.sexo === 'M') {
            faixaHDL = window.ERGUtils.getFaixaHDLHomem(dados.hdl);
        } else {
            faixaHDL = window.ERGUtils.getFaixaHDLMulher(dados.hdl);
        }
        detalhes.hdl = {
            valor: dados.hdl + ' mg/dL',
            pontos: tabelas.hdl[faixaHDL],
            faixa: faixaHDL
        };
        pontuacaoTotal += detalhes.hdl.pontos;

        // Pressão Arterial Sistólica
        let faixaPAS;
        if (dados.medicoPressao === 'sim') {
            if (dados.sexo === 'M') {
                faixaPAS = window.ERGUtils.getFaixaPASHomemComTratamento(dados.pas);
                detalhes.pas = {
                    valor: dados.pas + ' mmHg (tratada)',
                    pontos: tabelas.pasComTratamento[faixaPAS],
                    faixa: faixaPAS
                };
            } else {
                faixaPAS = window.ERGUtils.getFaixaPASMulherComTratamento(dados.pas);
                detalhes.pas = {
                    valor: dados.pas + ' mmHg (tratada)',
                    pontos: tabelas.pasComTratamento[faixaPAS],
                    faixa: faixaPAS
                };
            }
        } else {
            if (dados.sexo === 'M') {
                faixaPAS = window.ERGUtils.getFaixaPASHomemSemTratamento(dados.pas);
                detalhes.pas = {
                    valor: dados.pas + ' mmHg',
                    pontos: tabelas.pasSemTratamento[faixaPAS],
                    faixa: faixaPAS
                };
            } else {
                faixaPAS = window.ERGUtils.getFaixaPASMulherSemTratamento(dados.pas);
                detalhes.pas = {
                    valor: dados.pas + ' mmHg',
                    pontos: tabelas.pasSemTratamento[faixaPAS],
                    faixa: faixaPAS
                };
            }
        }
        pontuacaoTotal += detalhes.pas.pontos;

        // Tabagismo
        detalhes.fumante = {
            valor: dados.fumante === 'sim' ? 'Sim' : 'Não',
            pontos: tabelas.fumante[dados.fumante]
        };
        pontuacaoTotal += detalhes.fumante.pontos;

        // Diabetes
        detalhes.diabetes = {
            valor: dados.diabetes === 'sim' ? 'Sim' : 'Não',
            pontos: tabelas.diabetes[dados.diabetes]
        };
        pontuacaoTotal += detalhes.diabetes.pontos;

        return {
            detalhes: detalhes,
            pontuacaoTotal: pontuacaoTotal
        };
    }

    /**
     * Calcula a pontuação para o perfil ideal
     */
    calcularPontuacaoIdeal(idade, sexo) {
        const { tabelasHomens, tabelasMulheres } = window.ERGTables;
        const tabelas = sexo === 'M' ? tabelasHomens : tabelasMulheres;
        let pontuacaoIdeal = 0;
        let detalhesIdeal = {};

        // Idade (mantém a idade atual)
        const faixaIdade = window.ERGUtils.getFaixaIdade(idade);
        detalhesIdeal.idade = {
            valor: idade + ' anos',
            pontos: tabelas.idade[faixaIdade]
        };
        pontuacaoIdeal += detalhesIdeal.idade.pontos;

        // Colesterol ideal: 180 mg/dL
        const faixaColesterolIdeal = window.ERGUtils.getFaixaColesterol(180);
        detalhesIdeal.colesterol = {
            valor: '180 mg/dL',
            pontos: tabelas.colesterol[faixaColesterolIdeal]
        };
        pontuacaoIdeal += detalhesIdeal.colesterol.pontos;

        // HDL ideal: 60 mg/dL
        detalhesIdeal.hdl = {
            valor: '60 mg/dL',
            pontos: tabelas.hdl['>=60']
        };
        pontuacaoIdeal += detalhesIdeal.hdl.pontos;

        // Pressão ideal: 110 mmHg sem tratamento
        if (sexo === 'M') {
            detalhesIdeal.pas = {
                valor: '110 mmHg',
                pontos: tabelas.pasSemTratamento['<120']
            };
        } else {
            detalhesIdeal.pas = {
                valor: '110 mmHg',
                pontos: tabelas.pasSemTratamento['<120']
            };
        }
        pontuacaoIdeal += detalhesIdeal.pas.pontos;

        // Não fumante
        detalhesIdeal.fumante = {
            valor: 'Não',
            pontos: 0
        };

        // Sem diabetes
        detalhesIdeal.diabetes = {
            valor: 'Não',
            pontos: 0
        };

        return {
            detalhes: detalhesIdeal,
            pontuacaoTotal: pontuacaoIdeal
        };
    }

    /**
     * Gera recomendações personalizadas
     */
    gerarRecomendacoes(dados, pontuacaoAtual, pontuacaoIdeal) {
        const recomendacoes = [];
        const diferenca = pontuacaoAtual.pontuacaoTotal - pontuacaoIdeal.pontuacaoTotal;
        
        // Recomendação geral baseada na diferença
        if (diferenca <= 0) {
            recomendacoes.push('Parabéns! Seu perfil cardiovascular está excelente. Continue mantendo seus hábitos saudáveis.');
        } else if (diferenca <= 3) {
            recomendacoes.push('Seu risco está levemente aumentado. Pequenas mudanças podem fazer grande diferença.');
        } else if (diferenca <= 6) {
            recomendacoes.push('Seu risco está moderadamente aumentado. É importante implementar mudanças no estilo de vida.');
        } else {
            recomendacoes.push('Seu risco está significativamente aumentado. Procure acompanhamento médico regular.');
        }
        
        // Recomendações específicas por fator
        if (dados.colesterol >= 240) {
            recomendacoes.push('Colesterol muito alto: Considere mudanças na dieta e avaliação para medicação');
        } else if (dados.colesterol >= 200) {
            recomendacoes.push('Colesterol elevado: Reduza gorduras saturadas e aumente fibras na dieta');
        }
        
        if (dados.hdl < 40) {
            recomendacoes.push('HDL baixo: Pratique exercícios aeróbicos regularmente (150 min/semana)');
        }
        
        if (dados.pas >= 140) {
            recomendacoes.push('Pressão alta: Reduza o sal, controle o peso e faça atividade física regular');
        } else if (dados.pas >= 130) {
            recomendacoes.push('Pressão limítrofe: Monitore regularmente e mantenha hábitos saudáveis');
        }
        
        if (dados.fumante === 'sim') {
            recomendacoes.push('PARAR DE FUMAR é a medida isolada mais importante para reduzir seu risco');
        }
        
        if (dados.diabetes === 'sim') {
            recomendacoes.push('Diabetes: Mantenha controle rigoroso da glicemia (HbA1c < 7%)');
        }
        
        // Recomendações gerais
        recomendacoes.push('Mantenha alimentação mediterrânea: frutas, vegetais, grãos integrais, azeite');
        recomendacoes.push('Controle o estresse com meditação, yoga ou técnicas de relaxamento');
        recomendacoes.push('Durma 7-8 horas por noite com qualidade');
        
        return recomendacoes;
    }

    /**
     * Calcula o risco cardiovascular completo
     */
    calcularRisco(dados) {
        const pontuacaoAtual = this.calcularPontuacaoDetalhada(dados);
        const pontuacaoIdeal = this.calcularPontuacaoIdeal(dados.idade, dados.sexo);
        
        const riscoReal = window.ERGUtils.obterRisco(pontuacaoAtual.pontuacaoTotal, dados.sexo);
        const riscoIdeal = window.ERGUtils.obterRisco(pontuacaoIdeal.pontuacaoTotal, dados.sexo);
        
        const idadeCoracao = window.ERGUtils.obterIdadeCoracao(pontuacaoAtual.pontuacaoTotal, dados.sexo);
        
        const recomendacoes = this.gerarRecomendacoes(dados, pontuacaoAtual, pontuacaoIdeal);

        return {
            dados,
            pontuacaoAtual,
            pontuacaoIdeal,
            riscoReal,
            riscoIdeal,
            idadeCoracao,
            recomendacoes
        };
    }

    /**
     * Exibe os resultados na interface
     */
    exibirResultados(resultado) {
        const { dados, pontuacaoAtual, pontuacaoIdeal, riscoReal, riscoIdeal, idadeCoracao, recomendacoes } = resultado;

        // Atualizar valores principais
        document.getElementById('riscoReal').textContent = window.ERGUtils.formatarDecimal(riscoReal) + '%';
        document.getElementById('riscoIdeal').textContent = window.ERGUtils.formatarDecimal(riscoIdeal) + '%';
        
        // Comparação de risco
        const razaoRisco = riscoReal / riscoIdeal;
        const diferencaAbsoluta = riscoReal - riscoIdeal;
        
        let textoComparacao = '';
        if (razaoRisco > 1.5) {
            textoComparacao = `<span class="times-higher">Seu risco está ${window.ERGUtils.formatarDecimal(razaoRisco)}x maior que o ideal</span><br>`;
            textoComparacao += `Diferença absoluta: +${window.ERGUtils.formatarDecimal(diferencaAbsoluta)}% em relação ao perfil ouro`;
        } else if (razaoRisco > 1.0) {
            textoComparacao = `<span style="color: #ffc107;">Seu risco está ${window.ERGUtils.formatarDecimal(razaoRisco)}x o valor ideal</span><br>`;
            textoComparacao += `Diferença absoluta: +${window.ERGUtils.formatarDecimal(diferencaAbsoluta)}% em relação ao perfil ouro`;
        } else {
            textoComparacao = `<span class="times-lower">Excelente! Seu risco está no nível ideal</span>`;
        }
        document.getElementById('riskComparison').innerHTML = textoComparacao;
        
        // Informações secundárias
        document.getElementById('idadeCoracao').textContent = 
            idadeCoracao === 'N/A' ? 'N/A' : 
            idadeCoracao === '>75' ? '> 75 anos' : 
            idadeCoracao + ' anos';
        document.getElementById('idadeCrono').textContent = dados.idade + ' anos';
        document.getElementById('pontuacaoTotal').textContent = pontuacaoAtual.pontuacaoTotal + ' pontos';
        document.getElementById('pontuacaoIdeal').textContent = pontuacaoIdeal.pontuacaoTotal + ' pontos';
        
        // Tabela de análise detalhada
        this.preencherTabelaAnalise(pontuacaoAtual, pontuacaoIdeal);
        
        // Gráfico de barras
        this.atualizarGraficoBarras(riscoReal, riscoIdeal);
        
        // Recomendações
        this.preencherRecomendacoes(recomendacoes);
        
        // Exibir seção de resultados
        document.getElementById('results').style.display = 'block';
    }

    /**
     * Preenche a tabela de análise detalhada
     */
    preencherTabelaAnalise(pontuacaoAtual, pontuacaoIdeal) {
        const tbody = document.getElementById('analysisBody');
        tbody.innerHTML = '';
        
        const fatores = [
            { key: 'idade', nome: 'Idade' },
            { key: 'colesterol', nome: 'Colesterol Total' },
            { key: 'hdl', nome: 'HDL (Colesterol Bom)' },
            { key: 'pas', nome: 'Pressão Arterial' },
            { key: 'fumante', nome: 'Tabagismo' },
            { key: 'diabetes', nome: 'Diabetes' }
        ];

        fatores.forEach(fator => {
            const row = document.createElement('tr');
            const detalhesAtuais = pontuacaoAtual.detalhes[fator.key];
            const detalhesIdeais = pontuacaoIdeal.detalhes[fator.key];
            const diferenca = detalhesAtuais.pontos - detalhesIdeais.pontos;
            
            row.innerHTML = `
                <td class="factor-name">${fator.nome}</td>
                <td class="actual-value">${detalhesAtuais.valor}</td>
                <td class="ideal-value">${detalhesIdeais.valor}</td>
                <td class="points ${detalhesAtuais.pontos > 0 ? 'points-positive' : detalhesAtuais.pontos < 0 ? 'points-negative' : 'points-neutral'}">${detalhesAtuais.pontos > 0 ? '+' : ''}${detalhesAtuais.pontos}</td>
                <td class="points points-neutral">${detalhesIdeais.pontos > 0 ? '+' : ''}${detalhesIdeais.pontos}</td>
                <td class="difference-cell ${diferenca > 0 ? 'difference-worse' : diferenca < 0 ? 'difference-better' : 'difference-same'}">${diferenca > 0 ? '+' : ''}${diferenca}</td>
            `;
            tbody.appendChild(row);
        });
        
        // Atualizar totais
        document.getElementById('totalPontosTabela').textContent = pontuacaoAtual.pontuacaoTotal;
        document.getElementById('totalIdealTabela').textContent = pontuacaoIdeal.pontuacaoTotal;
        const diferencaTotal = pontuacaoAtual.pontuacaoTotal - pontuacaoIdeal.pontuacaoTotal;
        const totalDifElement = document.getElementById('totalDiferencaTabela');
        totalDifElement.textContent = (diferencaTotal > 0 ? '+' : '') + diferencaTotal;
        totalDifElement.className = diferencaTotal > 0 ? 'difference-worse' : diferencaTotal < 0 ? 'difference-better' : 'difference-same';
    }

    /**
     * Atualiza o gráfico de barras
     */
    atualizarGraficoBarras(riscoReal, riscoIdeal) {
        const diferencaRelativaPercentual = ((riscoReal - riscoIdeal) / riscoIdeal) * 100;
        
        const alturaBaseIdeal = 130;
        const alturaRiscoReal = alturaBaseIdeal * (1 + (diferencaRelativaPercentual / 100));
        
        document.getElementById('barIdeal').style.height = alturaBaseIdeal + 'px';
        document.getElementById('barActual').style.height = alturaRiscoReal + 'px';

        document.getElementById('barIdealValue').textContent = 'Base 100%';
        document.getElementById('barActualValue').textContent = `+${Math.round(diferencaRelativaPercentual)}%`;
    }

    /**
     * Preenche as recomendações
     */
    preencherRecomendacoes(recomendacoes) {
        const recomList = document.getElementById('recomList');
        recomList.innerHTML = '';
        recomendacoes.forEach(rec => {
            const li = document.createElement('li');
            li.innerHTML = rec;
            recomList.appendChild(li);
        });
    }
}

// Inicializar a calculadora quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    new CalculadoraRiscoCardiovascular();
});