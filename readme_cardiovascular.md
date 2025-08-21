# Calculadora de Risco Cardiovascular

Uma calculadora completa de risco cardiovascular baseada no **Escore de Risco Global (ERG-SBC)**, desenvolvida para estimar a probabilidade de eventos cardiovasculares graves nos próximos 10 anos.

## 🎯 Características

- **Análise Completa**: Utiliza múltiplos fatores de risco (idade, sexo, colesterol, pressão arterial, diabetes, tabagismo)
- **Comparação com Perfil Ideal**: Mostra o risco atual vs. perfil ouro
- **Visualização Intuitiva**: Gráficos e tabelas detalhadas
- **Recomendações Personalizadas**: Sugestões específicas baseadas no perfil do usuário
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Design Moderno**: Interface limpa e profissional

## 🚀 Demo

[Ver Demo Online](https://seuusuario.github.io/calculadora-risco-cardiovascular)

## 📱 Screenshots

![Calculadora Principal](screenshots/calculadora.png)
![Resultados](screenshots/resultados.png)

## ⚡ Início Rápido

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/calculadora-risco-cardiovascular.git
   cd calculadora-risco-cardiovascular
   ```

2. **Abra o arquivo principal**
   ```bash
   # Simplesmente abra o index.html no seu navegador
   open index.html
   ```

3. **Ou sirva localmente** (opcional)
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve .
   ```

## 🏗️ Estrutura do Projeto

```
calculadora-risco-cardiovascular/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principais
├── js/
│   ├── calculator.js       # Lógica da calculadora
│   ├── tables.js          # Tabelas de pontuação ERG
│   └── utils.js           # Funções utilitárias
├── assets/
│   └── screenshots/       # Imagens para o README
├── README.md              # Este arquivo
└── LICENSE               # Licença do projeto
```

## 🧮 Como Funciona

A calculadora utiliza o **Escore de Risco Global (ERG-SBC)**, que é um dos métodos mais estabelecidos para avaliação de risco cardiovascular:

### Fatores Avaliados:
- **Idade e Sexo**: Fatores não modificáveis
- **Colesterol Total**: Com ajuste para uso de estatinas
- **HDL**: O "colesterol bom"
- **Pressão Arterial**: Com diferenciação para tratamento
- **Tabagismo**: Fator de risco significativo
- **Diabetes**: Importante comorbidade

### Resultado:
- **Risco em 10 anos**: Percentual de probabilidade
- **Idade do Coração**: Idade cardiovascular vs. cronológica
- **Comparação com Perfil Ideal**: Quantas vezes maior que o ideal
- **Análise Detalhada**: Pontuação por fator de risco

## 🎨 Personalização

### Cores e Tema
As cores principais estão definidas no arquivo `css/styles.css`:

```css
:root {
  --cor-primaria: #212529;
  --cor-acento: #FF6F61;
  --cor-sucesso: #00A896;
  --cor-alerta: #D90429;
  --fundo-claro: #F8F9FA;
}
```

### Modificando Tabelas de Risco
As tabelas de pontuação estão em `js/tables.js` e seguem as diretrizes da Sociedade Brasileira de Cardiologia.

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Styling avançado com Flexbox/Grid
- **JavaScript Vanilla**: Lógica pura, sem dependências
- **Responsive Design**: Mobile-first approach

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ⚠️ Disclaimer Médico

Esta calculadora é uma ferramenta educacional e **NÃO substitui a consulta médica**. Os resultados devem ser sempre interpretados por um profissional de saúde qualificado.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- **Autor**: Seu Nome
- **Email**: seuemail@exemplo.com
- **LinkedIn**: [seu-linkedin](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- Sociedade Brasileira de Cardiologia (SBC) pelas diretrizes do ERG
- Comunidade médica por validar os métodos de cálculo
- Contribuidores do projeto

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**