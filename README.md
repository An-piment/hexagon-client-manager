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
    O framework Bootstrap foi usado para realizar a estilização de todos os botões (confirmação, deletar, etc), campos de input (texto e select) e para a paginação. Para a criação de um site que terá a API contendo os usuários, a ferramenta json server foi necessária. Criando a pasta <strong>db</strong> no diretório principal da aplicação, e, dentro dela, o arquivo db.json, podemos inicializar uma API vazia ou não. No caso desta aplicação, já foi pré criado alguns usuários para facilitar alguns testes.<br/>
  Para realizar as requisições à API, foi optado o uso do Axios. Com ele é possível realizar a atualização de usuário da API, a remoção e a adição através dos comandos GET, DELETE, PUT e POST. Por fim, para o envio de avisos foi utilizado o SweetAlert2. Com ele é possível criar janelas de confirmação, erros já pré definidas, podendo alterar a mensagem, as opções e o que será feito após seu aviso.
  </details>

## 3. Código e lógica

  <details>
    <summary>3.1. Funções de dados do usuário</summary><br/>
    De modo a melhorar o uso das funções de recuperar dados de usuários, todas as funções relativas a esta funcionalidade estão no diretório src/functions/userManager.js.
		Neste arquivos podemos editar a URL de origem da API para que a ferramenta Axios possa trabalhar com os dados. Se quisermos ler os usuários da API, usamos a função getUsers() que chama a função Axios.get e retorna um Array de Objetos com todos os dados dos clientes (nome, email, etc).<br/> 
		Para deletarmos um usuários utilizamos a função deleteUser(id). Passando o id do usuário o Axios irá executar a função Axios.delete e remover o usuário da API.<br/>
		Para atualizar um cliente, usamos a função updateUser(id, data), onde id é o id do cliente que queremos atualizar e data as informações que queremos atualizar, onde esta se encontra em forma de objeto.<br/>
		Por último, temos a função addUser(data) que recebe um objeto com as informações do usuário a ser adicionado e chama a função Axios.post para adicioná-lo na API.
  </details>

  <details>
    <summary>3.2. Funções de alerta</summary><br/>
		Para ajudar visualmente o usuário da aplicação, existem dois tipos de função que irão mostrar na tela uma mensagem que se encontram em src/functions/alert.js. A alertMessage(message, action) recebe uma mensagem para mostrar ao usuário e uma action, deletar, adicionar, atualizar. Este alerta também mostra duas opções de confirmar ou cancelar, caso o usuário confirme é retornada a mensagem de 'success', caso contrário, 'cancel'.<br/>
		A segunda função é a formError(), usado para exibir uma mensagem de erro caso o usuário esqueça de preencher algum campo quando tiver adicionando ou editando um usuário.
  </details>

  <details>
    <summary>3.3. Paginação</summary><br/>
		A lógica de como é feita a paginação pode ser vista no arquivo src/functions/pagination.js. A principal função é a createPagination. Ela recebe como parâmetros um array com os usuários, a quantidade de usuários a ser mostrado por página, a página atual da paginação em que o usuário se encontra e uma função que é adicionada no onClick de cada botão de paginação.<br/>
		Primeiro essa função chama a setMaxPages que passando os parâmetros array de usuários e usuários por página, calcula quantas páginas devem existir. Dividindo o tamanho do array pelo número de usuários pos página e, com este resultado, fazendo um Math.ceil, conseguimos este valor. Por exemplo: caso o número de usuários por página seja 5, e eu tenha 6 usuários, o Math.ceil irá arredondar o valor para cima retornando 2 páginas.<br/>
		Após termos este valor, a função createPagination irá verificar se serão exibidas mais de 3 páginas, pois, por padrão a aplicação apenas mostra 3 páginas de paginação, por exemplo (1, 2, 3) ou (3, 4, 5). Caso o usuário esteja na primeira página e só exista uma página, será criado dinamicamente apenas um botão, caso esteja na primeira página e exista 20 páginas, serão criadas 3 botões (1, 2, 3).<br/>
		A função que foi passada como parâmetro será chamada no evento de clique da página escolhida pelo usuário. Esta função irá alterar o estado do componente chamado currentPage e recarregar a função createPagination, porém, dessa vez, passando a nova página atual como parâmetro. Assim, caso esteja na página 2 irão ser mostrados os botões (1, 2, 3), na página 5 (4, 5, 6), e assim por diante.
  </details>

  <details>
    <summary>3.1. Página inicial</summary><br/>
    Ao iniciarmos a página, o React.js verificará qual o caminho da URL que o usuário se encontra. Como ele está na página principal, irá renderizar a página Home ('/'). Nesta página é chamada a função componentDidMouth() para fazer o carregamento da API através do axios e do link da aplicação (no nosso caso, http://localhost:3000/users/). A função responsável por este carregamento se encontra na pasta functions/userManager
  </details>
