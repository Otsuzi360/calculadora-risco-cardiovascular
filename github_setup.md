# 🚀 Setup do GitHub - Calculadora de Risco Cardiovascular

## Passo 1: Criar o Repositório no GitHub

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository" ou visite https://github.com/new
3. Configure o repositório:
   - **Repository name**: `calculadora-risco-cardiovascular`
   - **Description**: `Calculadora de risco cardiovascular baseada no ERG-SBC`
   - **Visibility**: Public (recomendado para GitHub Pages gratuito)
   - ✅ **Add a README file** (deixe marcado)
   - **Add .gitignore**: None (já temos um customizado)
   - **Choose a license**: MIT (ou deixe None, já temos o arquivo)

## Passo 2: Organizar os Arquivos Localmente

Crie a seguinte estrutura de pastas no seu computador:

```
calculadora-risco-cardiovascular/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── tables.js
│   ├── utils.js
│   └── calculator.js
├── assets/
│   └── screenshots/
│       ├── calculadora.png
│       └── resultados.png
├── README.md
├── LICENSE
├── .gitignore
├── package.json
└── SETUP_GITHUB.md (este arquivo)
```

## Passo 3: Comandos Git para Upload

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar repositório Git
git init

# Adicionar o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/calculadora-risco-cardiovascular.git

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "feat: adiciona calculadora de risco cardiovascular completa

- Implementa ERG-SBC com todas as tabelas oficiais
- Interface responsiva e moderna
- Análise detalhada e recomendações personalizadas
- Estrutura modular com JS separado"

# Criar e mudar para branch main
git branch -M main

# Fazer push inicial
git push -u origin main
```

## Passo 4: Configurar GitHub Pages

1. No seu repositório no GitHub, vá em **Settings**
2. Role até a seção **Pages** no menu lateral
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione **main**
5. Em **Folder**, deixe **/ (root)**
6. Clique em **Save**

Aguarde alguns minutos e sua calculadora estará disponível em: