/**
 * Funções utilitárias para a calculadora de risco cardiovascular
 */

/**
 * Determina a faixa etária baseada na idade
 * @param {number} idade - Idade em anos
 * @returns {string} - Faixa etária
 */
function getFaixaIdade(idade) {
    if (idade <= 34) return '30-34';
    if (idade <= 39) return '35-39';
    if (idade <= 44) return '40-44';
    if (idade <= 49) return '45-49';
    if (idade <= 54) return '50-54';
    if (idade <= 59) return '55-59';
    if (idade <= 64) return '60-64';
    if (idade <= 69) return '65-69';
    if (idade <= 74) return '70-74';
    return '75+';
}

/**
 * Determina a faixa de colesterol
 * @param {number} valor - Valor do colesterol em mg/dL
 * @returns {string} - Faixa de colesterol
 */
function getFaixaColesterol(valor) {
    if (valor < 160) return '<160';
    if (valor <= 199) return '160-199';
    if (valor <= 239) return '200-239';
    if (valor <= 279) return '240-279';
    return '>=280';
}

/**
 * Determina a faixa de HDL para homens
 * @param {number} valor - Valor do HDL em mg/dL
 * @returns {string} - Faixa de HDL
 */
function getFaixaHDLHomem(valor) {
    if (valor >= 60) return '>=60';
    if (valor >= 50) return '50-59';
    if (valor >= 45) return '45-49';
    if (valor >= 35) return '35-44';
    return '<35';
}

/**
 * Determina a faixa de HDL para mulheres
 * @param {number} valor - Valor do HDL em mg/dL
 * @returns {string} - Faixa de HDL
 */
function getFaixaHDLMulher(valor) {
    if (valor >= 60) return '>=60';
    if (valor >= 50) return '50-59';
    if (valor >= 40) return '40-49';
    if (valor >= 35) return '35-44';
    return '<35';
}

/**
 * Determina a faixa de pressão arterial sistólica para homens sem tratamento
 * @param {number} valor - Valor da PAS em mmHg
 * @returns {string} - Faixa de PAS
 */
function getFaixaPASHomemSemTratamento(valor) {
    if (valor < 120) return '<120';
    if (valor <= 129) return '120-129';
    if (valor <= 139) return '130-139';
    if (valor <= 159) return '140-159';
    return '>=160';
}

/**
 * Determina a faixa de pressão arterial sistólica para homens com tratamento
 * @param {number} valor - Valor da PAS em mmHg
 * @returns {string} - Faixa de PAS
 */
function getFaixaPASHomemComTratamento(valor) {
    if (valor < 120) return '<120';
    if (valor <= 129) return '120-129';
    if (valor <= 139) return '130-139';
    if (valor <= 159) return '140-159';
    return '>=160';
}

/**
 * Determina a faixa de pressão arterial sistólica para mulheres sem tratamento
 * @param {number} valor - Valor da PAS em mmHg
 * @returns {string} - Faixa de PAS
 */
function getFaixaPASMulherSemTratamento(valor) {
    if (valor < 120) return '<120';
    if (valor <= 129) return '120-129';
    if (valor <= 139) return '130-139';
    if (valor <= 149) return '140-149';
    if (valor <= 159) return '150-159';
    return '>=160';
}

/**
 * Determina a faixa de pressão arterial sistólica para mulheres com tratamento
 * @param {number} valor - Valor da PAS em mmHg
 * @returns {string} - Faixa de PAS
 */
function getFaixaPASMulherComTratamento(valor) {
    if (valor < 120) return '<120';
    if (valor <= 129) return '120-129';
    if (valor <= 139) return '130-139';
    if (valor <= 149) return '140-149';
    if (valor <= 159) return '150-159';
    return '>=160';
}

/**
 * Obtém o risco cardiovascular baseado na pontuação e sexo
 * @param {number} pontuacao - Pontuação total calculada
 * @param {string} sexo - 'M' para masculino, 'F' para feminino
 * @returns {number} - Risco em percentual
 */
function obterRisco(pontuacao, sexo) {
    const { riscoHomens, riscoMulheres } = window.ERGTables;
    const tabela = sexo === 'M' ? riscoHomens : riscoMulheres;
    
    if (sexo === 'M') {
        if (pontuacao <= -3) return tabela['-3'];
        if (pontuacao >= 18) return 30;
    } else {
        if (pontuacao <= -4) return tabela['-4'];
        if (pontuacao >= 21) return 30;
    }
    
    return tabela[pontuacao.toString()] || 30;
}

/**
 * Obtém a idade do coração baseada na pontuação e sexo
 * @param {number} pontuacao - Pontuação total calculada
 * @param {string} sexo - 'M' para masculino, 'F' para feminino
 * @returns {number|string} - Idade do coração
 */
function obterIdadeCoracao(pontuacao, sexo) {
    const { perfilOuroHomens, perfilOuroMulheres } = window.ERGTables;
    const tabela = sexo === 'M' ? perfilOuroHomens : perfilOuroMulheres;
    
    if (tabela[pontuacao.toString()]) {
        return tabela[pontuacao.toString()].idade;
    }
    
    if (sexo === 'M' && pontuacao > 12) return '>75';
    if (sexo === 'F' && pontuacao > 8) return '>75';
    if (sexo === 'M' && pontuacao < -3) return 30;
    if (sexo === 'F' && pontuacao < -4) return 30;
    
    return 'N/A';
}

/**
 * Valida os dados do formulário
 * @param {Object} dados - Dados do formulário
 * @returns {Object} - Resultado da validação
 */
function validarDados(dados) {
    const erros = [];
    
    if (!dados.sexo) {
        erros.push('Sexo é obrigatório');
    }
    
    if (!dados.idade || dados.idade < 30 || dados.idade > 80) {
        erros.push('Idade deve estar entre 30 e 80 anos');
    }
    
    if (!dados.colesterol || dados.colesterol < 100 || dados.colesterol > 400) {
        erros.push('Colesterol deve estar entre 100 e 400 mg/dL');
    }
    
    if (!dados.hdl || dados.hdl < 20 || dados.hdl > 100) {
        erros.push('HDL deve estar entre 20 e 100 mg/dL');
    }
    
    if (!dados.pas || dados.pas < 90 || dados.pas > 200) {
        erros.push('Pressão sistólica deve estar entre 90 e 200 mmHg');
    }
    
    return {
        valido: erros.length === 0,
        erros: erros
    };
}

/**
 * Formata número com uma casa decimal
 * @param {number} numero - Número a ser formatado
 * @returns {string} - Número formatado
 */
function formatarDecimal(numero) {
    return Number(numero).toFixed(1);
}

/**
 * Anima o scroll suave até um elemento
 * @param {string} elementId - ID do elemento
 */
function scrollSuave(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

/**
 * Exibe uma mensagem de erro
 * @param {string} mensagem - Mensagem de erro
 */
function exibirErro(mensagem) {
    alert(mensagem); // Em uma versão mais avançada, poderia usar um modal customizado
}

/**
 * Debounce para otimizar performance em eventos frequentes
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {Function} - Função com debounce
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Exportar funções para uso global
window.ERGUtils = {
    getFaixaIdade,
    getFaixaColesterol,
    getFaixaHDLHomem,
    getFaixaHDLMulher,
    getFaixaPASHomemSemTratamento,
    getFaixaPASHomemComTratamento,
    getFaixaPASMulherSemTratamento,
    getFaixaPASMulherComTratamento,
    obterRisco,
    obterIdadeCoracao,
    validarDados,
    formatarDecimal,
    scrollSuave,
    exibirErro,
    debounce
};