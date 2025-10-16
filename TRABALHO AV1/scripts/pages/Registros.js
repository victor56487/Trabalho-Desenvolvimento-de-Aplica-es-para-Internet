import { Usuario } from "../models/usuario.js";

class Registros {
    
    usuarios = [];
    linhas = [];
    estadoLinhas = [];

    // CONTROLES
    usuarioSelecionado;

    //USUARIOS
    resgatarUsuarios() {
        for (let c = 0; c <= localStorage.length - 1; ++c) {
            let chave = localStorage.key(c);
            let dadosUsuario = JSON.parse(localStorage.getItem(chave));

            let nome = dadosUsuario.nome;
            let email = dadosUsuario.email;
            let telefone = dadosUsuario.telefone;
            let idade = dadosUsuario.idade;
            let endereco = dadosUsuario.endereco;
            let senha = dadosUsuario.senha;

            // Preenche a array com usuários presentes no localStorage
            this.usuarios.push(new Usuario(nome,email,telefone,idade,endereco,senha));
        }
    }

    // TABELA
    preencherTabela(usuarios) {
        this.linhas = Array.from(document.querySelectorAll(".linha"));

        usuarios.forEach((p, c) => {
            this.linhas[c].querySelector(".nome").textContent =
                usuarios[c].nome;
            this.linhas[c].querySelector(".email").textContent =
                usuarios[c].email;
            this.linhas[c].querySelector(".telefone").textContent =
                usuarios[c].telefone;
            this.linhas[c].querySelector(".idade").textContent =
                usuarios[c].idade;
            this.linhas[c].querySelector(".endereco").textContent =
                usuarios[c].endereco;
        });
    }
    limparTabela() {
        this.linhas.forEach((linha) => {
            linha.querySelector(".nome").textContent = "";
            linha.querySelector(".email").textContent = "";
            linha.querySelector(".telefone").textContent = "";
            linha.querySelector(".idade").textContent = "";
            linha.querySelector(".endereco").textContent = "";
        });
    }

    // CONTROLES
    controleDeSelecao() {
        this.linhas.forEach((linha, c) => {
            this.estadoLinhas.push(false);

            linha.addEventListener("click", () => {
                if (this.estadoLinhas[c] == false) {
                    this.linhas.forEach((linha, c) => {
                        linha.classList.remove("toggle");
                        this.estadoLinhas[c] = false;
                    });
                }

                this.estadoLinhas[c] = !this.estadoLinhas[c];

                if (this.estadoLinhas[c] == true) {
                    linha.classList.add("toggle");
                    let nomeSelecionado = linha.querySelector(".nome").textContent;
                    this.usuarioSelecionado = this.usuarios.find(
                        (p) => p.nome == nomeSelecionado
                    );
                } else if (this.estadoLinhas[c] == false) {
                    linha.classList.remove("toggle");
                    this.usuarioSelecionado = undefined;
                }
            });
        });
    }

    alterarUsuario() {
        let btnEditar = document.querySelector("#btnEditar");
        btnEditar.addEventListener("click", (evt) => {
            localStorage.setItem("nomeEditar", this.usuarioSelecionado.nome);
            location.href = "alterar.html";
        });
    }

    adicionarUsuario() {
        let btnAdicionar = document.getElementById("btnAdicionar");
        btnAdicionar.addEventListener("click", () => {
            location.href = "cadastro.html";
        });
    }

    excluirUsuario() {
        let btnExcluir = document.querySelector("#btnRemover");
        btnExcluir.addEventListener("click", (evt) => {
            if (this.usuarioSelecionado == undefined) {
                alert("Selecione um usuário para excluir...");
                return;
            }
            let msg = document.getElementById("msgExclusao");
            msg.textContent = this.usuarioSelecionado.nome + "?";

            let container = document.getElementById("confirmarExclusao");
            container.classList.add("mostrando");

            let sim = document.getElementById("sim");
            let nao = document.getElementById("nao");

            nao.addEventListener("click", (evt) => {
                container.classList.remove("mostrando");
                return;
            });

            sim.addEventListener("click", () => {
                for (let c = 0; c <= localStorage.length - 1; ++c) {
                    let chave = localStorage.key(c);
                    let usuarioExcluido = JSON.parse(
                        localStorage.getItem(chave)
                    );

                    if (usuarioExcluido.nome == this.usuarioSelecionado.nome) {
                        localStorage.removeItem(chave);
                        let i = this.usuarios.indexOf(this.usuarioSelecionado);
                        this.usuarios.splice(i, 1);
                        this.limparTabela();
                        this.preencherTabela(this.usuarios);
                    }
                }
                container.classList.remove("mostrando");
            });
        });
    }

    pesquisarUsuario() {
        let btnPesquisa = document.getElementById("btnPesquisa");

        let pesquisa = document.getElementById("pesquisa");

        let btnLimparPesquisa = document.getElementById("limparPesquisa");
        let btnPesquisar = document.getElementById("lupinha");

        btnPesquisar.addEventListener("click", () => {
            if (pesquisa.value == "") {
                this.limparTabela();
                this.preencherTabela(this.usuarios);
                return;
            }

            let nomePesquisado = pesquisa.value;
            let usuariosPesquisa = this.usuarios.filter((p) =>
                p.nome.toLowerCase() == nomePesquisado.toLowerCase() ||
                p.email.toLowerCase() == nomePesquisado.toLowerCase() || p.idade.toLowerCase() == nomePesquisado.toLowerCase() || p.telefone.toLowerCase() == nomePesquisado.toLowerCase() || p.endereco.toLowerCase() == nomePesquisado.toLowerCase()
            );
            this.limparTabela();
            this.preencherTabela(usuariosPesquisa);
        });

        pesquisa.addEventListener("keypress", (evt) => {
            if (evt.key === "Enter") {
                if (pesquisa.value === "") {
                    this.limparTabela();
                    this.preencherTabela(this.usuarios);
                    return;
                }

                let nomePesquisado = pesquisa.value;
                let usuariosPesquisa = this.usuarios.filter((p) =>
                    p.nome.toLowerCase() == nomePesquisado.toLowerCase() ||
                    p.email.toLowerCase() == nomePesquisado.toLowerCase() || p.idade.toLowerCase() == nomePesquisado.toLowerCase() || p.telefone.toLowerCase() == nomePesquisado.toLowerCase() || p.endereco.toLowerCase() == nomePesquisado.toLowerCase()
                );

                this.limparTabela();
                this.preencherTabela(usuariosPesquisa);
            }
        });

        btnLimparPesquisa.addEventListener("click", () => {
            this.limparTabela();
            this.preencherTabela(this.usuarios);
            pesquisa.value = "";
        });

        btnPesquisa.addEventListener("click", () => {
            pesquisa.focus();
        });
    }

    ordenar() {
        let btnAZ = document.getElementById("btnAZ");

        btnAZ.addEventListener("click", () => {
            this.usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
            this.limparTabela();
            this.preencherTabela(this.usuarios);
        });

        let btnZA = document.getElementById("btnZA");

        btnZA.addEventListener("click", () => {
            this.usuarios.sort((a, b) => b.nome.localeCompare(a.nome));
            this.limparTabela();
            this.preencherTabela(this.usuarios);
        });
    }

    // PRINCIPAL
    init() {
        this.resgatarUsuarios();
        this.preencherTabela(this.usuarios);
        this.controleDeSelecao();
        this.excluirUsuario();
        this.adicionarUsuario();
        this.alterarUsuario();
        this.pesquisarUsuario();
        this.ordenar();
    }
}

new Registros().init();
