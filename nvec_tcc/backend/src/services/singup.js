document.querySelector('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); //impede o envio do formulário

    const nome = document.querySelector('input[name=nome]').value;
    const email = document.querySelector('input[name=email]').value;
    const senha = document.querySelector('input[name=senha]').value;

    const dados = { nome, email, senha};

    fetch('./routes/api/singup.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Cadastrar realizado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        alert('Ocorreu um erro ao cadastrar! Tente novamente mais tarde.')
    });
});