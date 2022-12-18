# Projeto Hexagon Client Manager para o processo seletivo da Hexagon

## Introdução

Neste repositório foi desenvolvido uma aplicação web onde é possível realizar a edição ou o cadastro de novos usuários através do uso de ApiRest. Para melhor explicação de como foi concebido a concepção do código, este relatório será divido dois principais tópicos:

* Vídeo demonstrativo do funcionamento da aplicação;
* Breve descrição das ferramentas e da concepção da aplicação;
* Explicação do código e da lógica envolvida;

## 1. Video

<details>
  <summary>1.1. Vídeo demonstrativo</summary><br />
    [![Assistir o vídeo](https://w7.pngwing.com/pngs/467/458/png-transparent-video-player-play-together-angle-text-photography-thumbnail.png)]      (https://clipchamp.com/watch/WcTxfhf6NcR)        
</details>

## 2. Estrutura e ferramentas
  
  <details>
    <summary>2.1. Organização dos arquivos</summary><br/>
    Para facilitar a leitura e otimização de funções, o código possui uma pasta principal onde se encontram todos os arquivos Javascript chamada <strong>src</strong>. Dentro desta existem os seguintes diretórios:
  
* <strong>functions</strong> - Dentro desta pasta existem arquivos com as funções usadas em todas as páginas da aplicação, ou seja, funções globais;
* <strong>component</strong> - Dentro desta pasta temos os componentes que irão ser renderizados em cada página da aplicação feita em React.js;
* <strong>pages</strong> - Dentro desta pasta temos as páginas da aplicação que renderizam os componentes dependendo do caminho que estamos (/edit, /home, etc)
  </details>
  
  <details>
    <summary>2.2. Páginas</summary><br/>
    A aplicação possui duas páginas principais, Main, página principal onde é mostrada ao usuário as informações dos clientes recuperados da API e a página de gerenciamento de usuários, podendo ser tanto para edição ou adição, dependendo do tipo de parâmetro que irá receber.
  </details>

  <details>
    <summary>2.3. Ferramentas e frameworks</summary><br/>
    O framework Bootstrap foi usado para realizar a estilização de todos os botões (confirmação, deletar, etc), campos de input (texto e select) e para a paginação. Para a criação de um site que terá a API contendo os usuários, a ferramenta json server foi necessária. Criando a pasta <strong>db</strong> no diretório principal da aplicação, e, dentro dela, o arquivo db.json, podemos inicializar uma API vazia ou não. No caso desta aplicação, já foi pré criado alguns usuários para facilitar alguns testes.
  Para realizar as requisições à API, foi optado o uso do Axios. Com ele é possível realizar a atualização de usuário da API, a remoção e a adição através dos comandos GET, DELETE, PUT e POST. Por fim, para o envio de avisos foi utilizado o SweetAlert2. Com ele é possível criar janelas de confirmação, erros já pré definidas, podendo alterar a mensagem, as opções e o que será feito após seu aviso.
  </details>

## 3. Código e lógica

  <details>
    <summary>3.1. Funções de dados do usuário</summary><br/>
    De modo a melhorar o uso das funções de recuperar dados de usuários, todas as funções relativas a esta funcionalidade estão no diretório src/functions/userManager.js.
		Neste arquivos podemos editar a URL de origem da API para que a ferramenta Axios possa trabalhar com os dados. Se quisermos ler os usuários da API, usamos a função getUsers() que chama a função Axios.get e retorna um Array de Objetos com todos os dados dos clientes (nome, email, etc). 
		Para deletarmos um usuários utilizamos a função deleteUser(id). Passando o id do usuário o Axios irá executar a função Axios.delete e remover o usuário da API.
		Para atualizar um cliente, usamos a função updateUser(id, data), onde id é o id do cliente que queremos atualizar e data as informações que queremos atualizar, onde esta se encontra em forma de objeto
  </details>

  <details>
    <summary>3.1. Página inicial</summary><br/>
    Ao iniciarmos a página, o React.js verificará qual o caminho da URL que o usuário se encontra. Como ele está na página principal, irá renderizar a página Home ('/'). Nesta página é chamada a função componentDidMouth() para fazer o carregamento da API através do axios e do link da aplicação (no nosso caso, http://localhost:3000/users/). A função responsável por este carregamento se encontra na pasta functions/userManager
  </details>
