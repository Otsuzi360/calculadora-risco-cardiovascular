/**
 * Tabelas de Pontuação do Escore de Risco Global (ERG-SBC)
 * Baseadas nas diretrizes da Sociedade Brasileira de Cardiologia
 */

// Tabelas de pontuação para homens
const tabelasHomens = {
    idade: {
        '30-34': 0, '35-39': 2, '40-44': 5, '45-49': 6,
        '50-54': 8, '55-59': 10, '60-64': 11, '65-69': 12,
        '70-74': 14, '75+': 15
    },
    colesterol: {
        '<160': 0, '160-199': 1, '200-239': 2, '240-279': 3, '>=280': 4
    },
    hdl: {
        '>=60': -2, '50-59': -1, '45-49': 0, '35-44': 1, '<35': 2
    },
    pasSemTratamento: {
        '<120': -2, '120-129': 0, '130-139': 1, '140-159': 2, '>=160': 3
    },
    pasComTratamento: {
        '<120': 0, '120-129': 2, '130-139': 3, '140-159': 4, '>=160': 5
    },
    fumante: { 'sim': 4, 'nao': 0 },
    diabetes: { 'sim': 3, 'nao': 0 }
};

// Tabelas de pontuação para mulheres
const tabelasMulheres = {
    idade: {
        '30-34': 0, '35-39': 2, '40-44': 4, '45-49': 5,
        '50-54': 7, '55-59': 8, '60-64': 9, '65-69': 10,
        '70-74': 11, '75+': 12
    },
    colesterol: {
        '<160': 0, '160-199': 1, '200-239': 3, '240-279': 4, '>=280': 5
    },
    hdl: {
        '>=60': -2, '50-59': -1, '40-49': 0, '35-44': 1, '<35': 2
    },
    pasSemTratamento: {
        '<120': -3, '120-129': 0, '130-139': 1, '140-149': 2, '150-159': 4, '>=160': 5
    },
    pasComTratamento: {
        '<120': -1, '120-129': 2, '130-139': 3, '140-149': 5, '150-159': 6, '>=160': 7
    },
    fumante: { 'sim': 3, 'nao': 0 },
    diabetes: { 'sim': 4, 'nao': 0 }
};

// Conversão de pontuação para risco cardiovascular em 10 anos - Homens
const riscoHomens = {
    '-3': 1, '-2': 1.1, '-1': 1.4, '0': 1.6, '1': 1.9, '2': 2.3, '3': 2.8,
    '4': 3.3, '5': 3.9, '6': 4.7, '7': 5.6, '8': 6.7, '9': 7.9, '10': 9.4,
    '11': 11.2, '12': 13.2, '13': 15.6, '14': 18.4, '15': 21.6, '16': 25.3,
    '17': 29.4, '18': 30, '19': 30, '20': 30, '21': 30
};

// Conversão de pontuação para risco cardiovascular em 10 anos - Mulheres
const riscoMulheres = {
    '-4': 1, '-3': 1, '-2': 1, '-1': 1.0, '0': 1.2, '1': 1.5, '2': 1.7, '3': 2.0, 
    '4': 2.4, '5': 2.8, '6': 3.3, '7': 3.9, '8': 4.5, '9': 5.3, '10': 6.3, 
    '11': 7.3, '12': 8.6, '13': 10.0, '14': 11.7, '15': 13.7, '16': 15.9, 
    '17': 18.5, '18': 21.6, '19': 24.8, '20': 28.5, '21': 30, '22': 30
};

// Idade do coração baseada na pontuação - Perfil Ouro Homens
const perfilOuroHomens = {
    '-3': {idade: 30, risco: 1},
    '-2': {idade: 32, risco: 1.1},
    '-1': {idade: 35, risco: 1.4},
    '0': {idade: 37, risco: 1.6},
    '1': {idade: 38, risco: 1.9},
    '2': {idade: 40, risco: 2.3},
    '3': {idade: 45, risco: 2.8},
    '4': {idade: 47, risco: 3.3},
    '5': {idade: 50, risco: 3.9},
    '6': {idade: 52, risco: 4.7},
    '7': {idade: 55, risco: 5.6},
    '8': {idade: 60, risco: 6.7},
    '9': {idade: 65, risco: 7.9},
    '10': {idade: 67, risco: 9.4},
    '11': {idade: 70, risco: 11.2},
    '12': {idade: 75, risco: 13.2}
};

// Idade do coração baseada na pontuação - Perfil Ouro Mulheres
const perfilOuroMulheres = {
    '-4': {idade: 30, risco: 1},
    '-3': {idade: 32, risco: 1},
    '-2': {idade: 35, risco: 1},
    '-1': {idade: 38, risco: 1.0},
    '0': {idade: 40, risco: 1.2},
    '1': {idade: 45, risco: 1.5},
    '2': {idade: 48, risco: 1.7},
    '3': {idade: 50, risco: 2.0},
    '4': {idade: 55, risco: 2.4},
    '5': {idade: 60, risco: 2.8},
    '6': {idade: 65, risco: 3.3},
    '7': {idade: 70, risco: 3.9},
    '8': {idade: 75, risco: 4.5}
};

// Exportar as variáveis para uso global
window.ERGTables = {
    tabelasHomens,
    tabelasMulheres,
    riscoHomens,
    riscoMulheres,
    perfilOuroHomens,
    perfilOuroMulheres
};