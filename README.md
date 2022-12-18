# Projeto Hexagon Client Manager para o processo seletivo da Hexagon

![image](https://user-images.githubusercontent.com/112974999/208308889-815265b4-15bc-497f-adc3-232552d3b810.png)

## Introdução

Neste repositório foi desenvolvido uma aplicação web onde é possível realizar a edição ou o cadastro de novos usuários através do uso de ApiRest. Para melhor explicação de como foi concebido a concepção do código, este relatório será divido três principais tópicos:

* Vídeo demonstrativo do funcionamento da aplicação;
* Breve descrição das ferramentas e da concepção da aplicação;
* Explicação do código e da lógica envolvida;

## Executando a aplicação

Para instalar as dependências do projeto, utilize o comando:

  ```bash
    npm install
  ```

Para inicializar será necessário dois terminais: um para inicializar o json server e outro para iniciar a aplicação. Para isso, digite no primeiro terminal:

  ```bash
    npm start
  ```

E no segundo terminal:

  ```bash
    npm run backend
  ```
## 1. Video

<details>
  <summary>1.1. Vídeo demonstrativo</summary><br />
    [Assistir o vídeo] (https://clipchamp.com/watch/WcTxfhf6NcR)        
</details>

## 2. Estrutura e ferramentas
  
  <details>
    <summary>2.1. Organização dos arquivos</summary><br/>
    Para facilitar a leitura e otimização de funções, o código possui uma pasta principal onde se encontram todos os arquivos Javascript chamada <strong>src</strong>. Dentro desta existem os seguintes diretórios:
  
* <strong>functions</strong> - Dentro desta pasta existem arquivos com as funções usadas em todas as páginas da aplicação, ou seja, funções globais;
* <strong>component</strong> - Dentro desta pasta temos os componentes que serão renderizados em cada página da aplicação feita em React.js;
* <strong>pages</strong> - Dentro desta pasta temos as páginas da aplicação que renderizam os componentes dependendo do caminho que estamos (/edit, /home, etc)
  </details>
  
  <details>
    <summary>2.2. Páginas</summary><br/>
    A aplicação possui duas páginas principais, Main, página principal onde é mostrada ao usuário as informações dos clientes recuperados da API e a página de gerenciamento de usuários, podendo ser tanto para edição ou adição, dependendo do tipo de parâmetro que irá receber.
  </details>

  <details>
    <summary>2.3. Ferramentas e frameworks</summary><br/>
    O framework Bootstrap foi usado para realizar a estilização de todos os botões (confirmação, deletar, etc), campos de input (texto e select) e para a paginação. Para a criação de um site que terá a API contendo os usuários foi necessário o uso da ferramenta json server. Criando a pasta <strong>db</strong> no diretório principal da aplicação, e, dentro dela, o arquivo db.json, podemos inicializar uma API vazia ou não. No caso desta aplicação, já foi pré criado alguns usuários para facilitar alguns testes.<br/>
  Para realizar as requisições à API foi optado o uso do Axios. Com ele é possível realizar a atualização de usuário da API, a remoção e a adição através dos comandos GET, DELETE, PUT e POST. Por fim, para o envio de avisos foi utilizado o SweetAlert2. Com ele é possível criar janelas de confirmação, erros já pré definidas, podendo alterar a mensagem, as opções e o que será feito após seu aviso.
  </details>

## 3. Código e lógica

  <details>
    <summary>3.1. Funções de dados do usuário</summary><br/>
    De modo a melhorar o uso das funções de recuperar dados de usuários, todas as funções relativas a esta funcionalidade estão no diretório src/functions/userManager.js.
		Neste arquivo podemos editar a URL de origem da API para que a ferramenta Axios possa trabalhar com os dados. Se quisermos ler os usuários da API, usamos a função getUsers() que chama a função Axios.get e retorna um Array de Objetos com todos os dados dos clientes (nome, email, etc).<br/> 
		Para deletarmos um usuários utilizamos a função deleteUser(id). Passando o id do usuário o Axios irá executar a função Axios.delete e remover o usuário da API.<br/>
		Para atualizar um cliente, usamos a função updateUser(id, data), onde id é o id do cliente que queremos atualizar e data as informações que queremos atualizar, onde esta se encontra em forma de objeto.<br/>
		Por último, temos a função addUser(data) que recebe um objeto com as informações do usuário a ser adicionado e chama a função Axios.post para adicioná-lo na API.
  </details>

  <details>
    <summary>3.2. Funções de alerta</summary><br/>
		Para ajudar visualmente o usuário da aplicação, existem dois tipos de função que irão mostrar na tela uma mensagem que se encontram em src/functions/alert.js. A alertMessage(message, action) recebe uma mensagem para mostrar ao usuário e uma action, deletar, adicionar, atualizar. Este alerta também mostra duas opções de confirmar ou cancelar. Caso o usuário confirme, é retornada a mensagem de 'success', caso contrário, 'cancel'.<br/>
		A segunda função é a formError() usada para exibir uma mensagem de erro caso o usuário esqueça de preencher algum campo quando estiver adicionando ou editando um usuário.
  </details>

  <details>
    <summary>3.3. Paginação</summary><br/>
		A lógica de como é feita a paginação pode ser vista no arquivo src/functions/pagination.js. A principal função é a createPagination:
	
* Recebe como parâmetros um array com os usuários, a quantidade de usuários a ser mostrado por página, a página atual da paginação em que o usuário se encontra e uma função que é adicionada no onClick de cada botão de paginação.<br/>
Primeiro, essa função chama a setMaxPages que passando os parâmetros array de usuários e usuários por página e calcula quantas páginas devem existir. Dividindo o tamanho do array pelo número de usuários por página e, com este resultado, fazendo um Math.ceil conseguimos este valor. Por exemplo: caso o número de usuários por página seja 5 e existam 6 usuários, o Math.ceil irá arredondar o valor para cima retornando 2 páginas.<br/>
		Após termos este valor, a função createPagination irá verificar se serão exibidas mais de 3 páginas, pois, por padrão, a aplicação apenas mostra 3 páginas de paginação, por exemplo (1, 2, 3) ou (3, 4, 5). Caso o usuário esteja na primeira página e só exista uma página, será criado dinamicamente apenas um botão, e se por acaso esteja na primeira página e existam 20 páginas, serão criados 3 botões (1, 2, 3).<br/>
		A função que foi passada como parâmetro será chamada no evento de clique da página escolhida pelo usuário. Esta função irá alterar o estado do componente chamado currentPage e recarregar a função createPagination, porém, dessa vez, passando a nova página atual como parâmetro. Assim, caso esteja na página 2 irão ser mostrados os botões (1, 2, 3), na página 5 (4, 5, 6), e assim por diante.<br/>
		A visualização de usuários na página é dada pela função showUsersOnPage que recebe como parâmetros o array de usuários, a quantidade de usuários por página e a página que a aplicação se encontra. O último usuário a ser mostrado é o de index (paginaAtual * usuáriosPorPágina - 1) e o número mínimo é ((paginaAtual - 1) * usuáriosPorPágina).<br/>
		Explicação: Imaginando que a aplicação se encontra na página 2, mostrando 10 usuários por página e com um array de 50 usuários. Deve-se mostrar os usuários de index 10 a 19, assim o primeiro usuário é, segundo a fórmula, (2 - 1) * 10 = 10. O último usuário será o (2 * 10 - 1) = 19, ou seja, a função irá retornar o array filtrado com os usuários de index 10 a 19.
  </details>

  <details>
    <summary>3.4. Página inicial</summary><br/>
    Ao iniciarmos a página o React.js verificará qual o caminho da URL que o usuário se encontra. Como ele está na página principal irá renderizar a página Home ('/'). Nesta página é chamada a função componentDidMouth() para fazer o carregamento da API através da função getUsers e salvar o resultado no estado users.<br/>
		Para o filtro de busca são renderizados 4 inputs com as informações nome, cpf, cidade e usuários por página, e, cada vez que o usuário altera alguns destes campos a função handleChange é chamada e atualiza o estado de cada um dos filtros. Com esta atualização, antes de ser renderizado os usuários, a função filterUsers é chamada, e recebe o array de usuários, e, caso um dos estados de filtro seja diferente de undefined (usuário escreveu algo), é realizado um array.filter para definir o novo array de usuários a ser mostrado.<br/>
		Após este filtro o componente UserTable é renderizado, e recebe como props o array de usuários. Este componente renderiza uma lista dinamicamente dependendo de quantos usuários foram passados. A lista possui as informações de cada usuário e dois botões, Excluir e Editar. O botão Excluir recebe a função onClick handleDelete que exibe um mensagem se realmente deseja remover o usuário com as opções sim e cancel. Caso confirme, a função deleteUser é chamada e o usuário é deletado. O botão Edit transfere a página para o link ('/edit/id_do_usuário') para realizar as modificações.<br/>
		O botão adicionar que se encontra no canto superior direito da tabela redireciona a pessoa para o link ('/add') onde é possível adicionar novos usuários.
		Por último, a paginação é renderizada abaixo da lista (sua explicação pode ser vista no item 3.3).
		</details>

  <details>
    <summary>3.5. Edição de usuários</summary><br/>
			Ao clicar no botão Editar de um usuário a aplicação é redirecionada para a página ('/dit/id_do_usuario'). Nesta página, temos todos os campos de informação já preenchidos através do componentDidMount() que chama a função de getUsers e find neste array para achar o usuário com o id necessário e alterar o estado da aplicação com as informações recebidas. Ao preencher qualquer input a função handleChange é chamada, e altera o estado da aplicação.<br/>
			Caso a pessoa clique em Salvar, a função alertMessage será chamada mostrando um aviso com as opções de prosseguir ou não. Caso prossiga, a função retorna 'success' e a função updateUser é chamada atualizando os dados e redirecionando a aplicação para a página home.<br/>
			Caso a pessoa esqueça de preencher qualquer campo, a função formError é chamada exibindo uma mensagem de erro alertando que todos os campos precisam ser preenchidos.
		</details>

  <details>
    <summary>3.6. Adição de usuários</summary><br/>
			A página de adição utiliza os mesmos métodos da de edição, pois foi utilizado o mesmo componente. Porém existem algumas mudanças. Como não há informações prévias de usuário, os estados são carregados como uma string vazia sendo alterados à medida que o usuário preenche os campos. A mensagem de confirmação é alterada para se realmente deseja adicionar um usuário e na confirmação é chamada a função addUser para adicionar na API.
		</details>
