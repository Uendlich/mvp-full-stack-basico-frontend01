// Função para buscar os dados da API e exibir na tabela
function buscarDados() {
  fetch('http://127.0.0.1:5000/pessoas')
    .then(response => response.json())
    .then(data => {
    const tabela = document.querySelector('#tabela tbody');
    data.Pessoas.forEach(cadastro => {
        const row = tabela.insertRow();
        row.innerHTML = `
          <td>${cadastro.id_pessoa}</td>
          <td>${cadastro.nome}</td>
          <td>${cadastro.tipo_pessoa}</td>
          <td>${cadastro.cpf_cnpj}</td>
          <td>${cadastro.estado_civil}</td>
          <td>${cadastro.endereco}</td>
          <td>${cadastro.telefone}</td>
          <td>${cadastro.email}</td>
          <td>
            <button onclick="editarCadastro(${cadastro.id_pessoa})">Editar</button>
            <button onclick="deletarCadastro(${cadastro.id_pessoa})">Deletar</button>
          </td>
        `;
      });
    });
}

// Chama a função buscarDados() quando a página carregar
window.addEventListener('load', buscarDados);

// Função para cadastrar um novo cadastro na API
function cadastrar() {
  const nome = document.querySelector('#nome').value;
  const tipo_pessoa = document.querySelector('#tipo_pessoa').value;
  const cpf_cnpj = document.querySelector('#cpf_cnpj').value;
  const estado_civil = document.querySelector('#estado_civil').value;
  const endereco = document.querySelector('#endereco').value;
  const telefone = document.querySelector('#telefone').value;
  const email = document.querySelector('#email').value;

  const novoCadastro = {
    nome,
    tipo_pessoa,
    cpf_cnpj,
    estado_civil,
    endereco,
    telefone,
    email
  };

  // Envia o novo cadastro para a API
  fetch('http://127.0.0.1:5000/pessoa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoCadastro)
  })
    .then(response => response.json())
    .then(data => {
      const tabela = document.querySelector('#tabela tbody');
      const newRow = tabela.insertRow();
      newRow.innerHTML = `
        <td>${data.id_pessoa}</td>
        <td>${data.nome}</td>
        <td>${data.tipo_pessoa}</td>
        <td>${data.cpf_cnpj}</td>
        <td>${data.estado_civil}</td>
        <td>${data.endereco}</td>
        <td>${data.telefone}</td>
        <td>${data.email}</td>
        <td>
          <button onclick="editarCadastro(${data.id_pessoa})">Editar</button>
          <button onclick="deletarCadastro(${data.id_pessoa})">Deletar</button>
        </td>
      `;
      limparCampos();
    });
}

function limparCampos(){
  document.querySelector('#nome').value = '';
  document.querySelector('#tipo_pessoa').value = '';
  document.querySelector('#cpf_cnpj').value = '';
  document.querySelector('#estado_civil').value = '';
  document.querySelector('#endereco').value = '';
  document.querySelector('#telefone').value = '';
  document.querySelector('#email').value = '';
}

// Função para deletar um cadastro na API
function deletarCadastro(id) {
  fetch(`http://127.0.0.1:5000/pessoa?id_pessoa=${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      const tabela = document.querySelector('#tabela tbody');
      tabela.innerHTML = "";
      buscarDados();
    }); 
}

// Função para editar um cadastro
function editarCadastro(id) {
  // Busca o cadastro pelo ID na API
  fetch(`http://127.0.0.1:5000/pessoa?id_pessoa=${id}`)
    .then(response => response.json())
    .then(cadastro => {
      // Preenche o formulário com os dados do cadastro
      document.querySelector('#id_pessoa').value = cadastro.id_pessoa;
      document.querySelector('#nome').value = cadastro.nome;
      document.querySelector('#tipo_pessoa').value = cadastro.tipo_pessoa;
      document.querySelector('#cpf_cnpj').value = cadastro.cpf_cnpj;
      document.querySelector('#estado_civil').value = cadastro.estado_civil;
      document.querySelector('#endereco').value = cadastro.endereco;
      document.querySelector('#telefone').value = cadastro.telefone;
      document.querySelector('#email').value = cadastro.email;

      document.querySelector('#botaoGravar').style.display = 'none';
      document.querySelector('#botaoAtualizar').style.display = 'block';
    });
}

// Função para atualizar um cadastro na API
function atualizar() {
  const id_pessoa = document.querySelector('#id_pessoa').value;
  const nome = document.querySelector('#nome').value;
  const tipo_pessoa = document.querySelector('#tipo_pessoa').value;
  const cpf_cnpj = document.querySelector('#cpf_cnpj').value;
  const estado_civil = document.querySelector('#estado_civil').value;
  const endereco = document.querySelector('#endereco').value;
  const telefone = document.querySelector('#telefone').value;
  const email = document.querySelector('#email').value;

  const cadastroAtualizado = {
    id_pessoa,
    nome,
    tipo_pessoa,
    cpf_cnpj,
    estado_civil,
    endereco,
    telefone,
    email
  };

  fetch('http://127.0.0.1:5000/pessoa', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cadastroAtualizado)
  })
    .then(() => {
      const tabela = document.querySelector('#tabela tbody');
      tabela.innerHTML = "";
      buscarDados();
      limparCampos();
      document.querySelector('#botaoGravar').style.display = 'block';
      document.querySelector('#botaoAtualizar').style.display = 'none';
    }); 

}


