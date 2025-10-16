class Alterar {
    alterarUsuario() {
        let nomeAlterar = document.querySelector("#nome");
        let emailAlterar = document.querySelector("#email");
        let telefoneAlterar = document.querySelector("#telefone");
        let idadeAlterar = document.querySelector("#idade");
        let enderecoAlterar = document.querySelector("#endereco");

        let index = localStorage.getItem("nomeEditar");
        localStorage.removeItem("nomeEditar");

        let usuarioAlterado = JSON.parse(localStorage.getItem(index));

        nomeAlterar.value = usuarioAlterado.nome;
        emailAlterar.value = usuarioAlterado.email;
        telefoneAlterar.value = usuarioAlterado.telefone;
        idadeAlterar.value = usuarioAlterado.idade;
        enderecoAlterar.value = usuarioAlterado.endereco;

        let btnAlterar = document.getElementById("btnAlterar");
        btnAlterar.addEventListener("click", (ect) => {
            let usuarioNovo = {
                nome: nomeAlterar.value,
                email: emailAlterar.value,
                telefone: telefoneAlterar.value,
                idade: idadeAlterar.value,
                endereco: enderecoAlterar.value,
                senha: usuarioAlterado.senha,
            };

            localStorage.removeItem(index);
            localStorage.setItem(
                nomeAlterar.value,
                JSON.stringify(usuarioNovo)
            );
            location.href = "registros.html";
        });
    }
    init() {
        this.alterarUsuario();
    }
}

new Alterar().init();
