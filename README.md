# Projeto Hexagon Client Manager para o processo seletivo da Hexagon

## Introdução

Neste repositório foi desenvolvido uma aplicação web onde é possível realizar a edição ou o cadastro de novos usuários através do uso de ApiRest. Para melhor explicação de como foi concebido a concepção do código, este relatório será divido dois principais tópicos:

* Vídeo demonstrativo do funcionamento da aplicação;
* Explicação do código e da lógica envolvida;

## 1. Video

<details>
  <summary>1.1. Vídeo demonstrativo</summary><br />
    [![Assistir o vídeo](https://w7.pngwing.com/pngs/467/458/png-transparent-video-player-play-together-angle-text-photography-thumbnail.png)]      (https://clipchamp.com/watch/WcTxfhf6NcR)        
</details>

## 2. Código e lógica

        
<details>
  <summary>2.1. Organização dos arquivos</summary><br />
  Para facilitar a leitura e reaproveitamento de funções, o código possui uma pasta principal onde se encontram todos os arquivos Javascript chamada <strong>src</strong>. Dentro desta existem os seguintes diretórios:
  
  <strong>*functions</strong> - Dentro desta pasta, existem arquivos com funções usadas em todas as páginas da aplicação, ou seja, funções globais;
  <strong>*component</strong> - Dentro desta pasta, temos os componentes que irão ser renderizados em cada página da aplicação feita em React.js;
  <strong>*pages</strong> - Dentro desta pasta, temos as páginas da aplicação que renderizam os componentes dependendo do caminho que estamos (/edit, /home, etc)
  
  
</details>
