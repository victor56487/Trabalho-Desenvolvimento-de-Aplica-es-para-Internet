📦 Catálogo de Produtos – Projeto Final (jQuery + AJAX)

Este projeto implementa um catálogo de produtos totalmente dinâmico utilizando HTML, CSS, JavaScript e jQuery, com carregamento de dados através de um arquivo JSON local e filtros responsivos.

📁 Estrutura do Projeto
index.html
css/
  ├── style.css
  └── responsive.css
js/
  ├── main.js
  └── produtos.js
data/
  └── produtos.json
assets/
  └── images/

🚀 Funcionalidades Implementadas
✔ Carregamento de Produtos via AJAX

Botão "Carregar Produtos" usa $.getJSON()

Mostra spinner durante a requisição

Tratamento de erros com mensagem visual

✔ Exibição dos Produtos

Grid responsivo (3 colunas, depois 2 → 1 em telas menores)

Cards com:

imagem

nome

categoria

preço

estoque

Hover suave nas imagens

Layout limpo e moderno

✔ Sistema de Busca

Busca em tempo real (com debounce)

Filtra por nome ou descrição

✔ Filtros

Filtro por categoria gerado dinamicamente

Filtro de preço (mínimo e máximo)

Botão “Limpar filtros”

✔ Ordenação

Nome (A–Z)

Preço (menor → maior)

Preço (maior → menor)

✔ Modal de Detalhes

Modal com visual moderno

Imagem ampliada

Zoom ao passar o mouse

Fullscreen ao clicar na imagem

Informações detalhadas do produto

Fechamento por clique no fundo ou tecla ESC

✔ Responsividade

Mobile, tablet e desktop

Modal adaptativa

Grid reorganizável

🔧 Tecnologias Utilizadas

HTML5

CSS3

JavaScript

jQuery 3.7.1

AJAX

JSON

Live Server (VS Code)

📂 Como Rodar o Projeto
✔ Opção 1 — Recomendado

Abra o projeto no VS Code

Instale a extensão Live Server

Clique com o botão direito em index.html

Selecione "Open with Live Server"

✔ Opção 2 — Abrir direto no navegador

O navegador pode bloquear leitura do JSON por CORS — por isso Live Server é recomendado.

🛠 Como Adicionar ou Editar Produtos

Abra o arquivo:

data/produtos.json


Cada produto segue o formato:

{
  "id": 1,
  "nome": "Mouse Gamer RGB",
  "categoria": "Periféricos",
  "descricao": "descrição…",
  "preco": 80.00,
  "estoque": 30,
  "imagem": "assets/images/mouse.jpg"
}


Basta adicionar novos itens ao array respeitando a mesma estrutura.

📌 Acessibilidade Implementada

Labels ocultas com .sr-only

aria-live para mensagens

Foco inicial no modal

Modal fechável com tecla ESC

Botões e inputs com descrição adequada

🏗 Boas Práticas Aplicadas

Normalização de texto (remove acentos para filtragem correta)

Debounce na busca

Verificação e fallback de imagem

Código modular e organizado

Separação clara HTML / CSS / JS / JSON

Sem estilos inline (removidos conforme boas práticas)

👤 Desenvolvido por

Seu Nome Aqui:
Projeto desenvolvido para a disciplina: Desenvolvimento de Aplicações Web
Prof. Dr. Diogo Francisco Borba Rodrigues