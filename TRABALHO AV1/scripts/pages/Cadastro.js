import { Usuario } from "../models/usuario.js";

class Cadastro {
    cadastro() {
        let form = document.querySelector(".cadastro-form");

        form.addEventListener("submit", (evt) => {
            evt.preventDefault();

            let nome = document.querySelector("#nome").value;
            let email = document.querySelector("#email").value;
            let telefone = document.querySelector("#telefone").value;
            let idade = document.querySelector("#idade").value;
            let endereco = document.querySelector("#endereco").value;
            let confirmar = document.querySelector("#confirmar-senha").value;
            let senha = document.querySelector("#senha").value;

            if (confirmar != senha) {
                alert("A confirmação de senha não coincide");
                return;
            }

            let usuario = new Usuario(nome,email,telefone,idade,endereco,senha);
            let dados = JSON.stringify(usuario);

            localStorage.setItem(nome, dados);
            form.reset();

            document.querySelector(".saudacaoTela").classList.toggle("mostrarSaudacao");
        });
    }

    init() {
        this.cadastro();
    }
}

new Cadastro().init();
