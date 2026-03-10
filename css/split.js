const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
const content = fs.readFileSync(cssPath, 'utf8');
const lines = content.split('\n');

// Helper to extract lines and add a header comment
function createModule(filename, title, description, startLine, endLine) {
    const extracted = lines.slice(startLine - 1, endLine).join('\n');
    const header = `/* ==========================================================================
 * ${title}
 * ${description}
 * ========================================================================== */\n\n`;

    fs.writeFileSync(path.join(__dirname, filename), header + extracted);
    console.log(`Created ${filename}`);
}

// 1. variables.css (Lines 1 to 27)
createModule(
    'variables.css',
    'Variáveis Globais',
    'Contém todas as cores da clínica, tipografia e configurações base do projeto.',
    1, 27
);

// 2. utilities.css (Lines 29 to 132)
createModule(
    'utilities.css',
    'Classes Utilitárias',
    'Classes de apoio para margens, flexbox, espaçamentos e barra de rolagem.',
    29, 132
);

// 3. layout.css (Lines 133 to 408)
createModule(
    'layout.css',
    'Estrutura de Layout',
    'Estilização dos blocos principais da tela: Menu Lateral (Sidebar) e Topo (Header).',
    133, 408
);

// 4. components.css (Lines 409 to 768)
createModule(
    'components.css',
    'Componentes Reutilizáveis',
    'Estilos para cartões (cards), botões, tabelas, badges e itens de interface genéricos.',
    409, 768
);

// 5. pages.css (Lines 770 to end)
createModule(
    'pages.css',
    'Estilos Específicos de Páginas',
    'Contém os estilos únicos das abas (Calendário, Gráficos de Relatórios, Fila de Triagem).',
    770, lines.length
);

// Update style.css to just be imports
const mainCss = `/* ==========================================================================
 * Arquivo CSS Principal (Entrada)
 * Importa todos os módulos menores para formar o estilo completo.
 * ========================================================================== */

@import url('variables.css');
@import url('utilities.css');
@import url('layout.css');
@import url('components.css');
@import url('pages.css');
`;

fs.writeFileSync(cssPath, mainCss);
console.log('Updated style.css with imports.');
