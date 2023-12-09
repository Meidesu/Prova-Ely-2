import { Postagem } from "./models/Postagem";
import { Perfil } from "./models/Perfil";
import { RedeSocial } from "./RedeSocial";
import { continuar, input, inputInt, limparConsole, print, selecao, inputEmail, gerarId, inputId, simOuNao, idValido, ehEmail, exibirTitulo } from "../utils/io_utils";
import { escreverArquivo, lerArquivo } from "../utils/fs_utils";
import { PostagemAvancada } from "./models/PostagemAvancada";


class App {

  // TODO: Adicionar argumentos ao construtor de rede social
  private _redeSocial: RedeSocial = new RedeSocial();
  
  
  public rodarAplicacao(): void {
    this.carregarPerfis();
    this.carregarPostagens();
    
    limparConsole();

    exibirTitulo();

    let menu: string[] = [
      'Incluir perfil', 
      'Consultar perfil',
      'Incluir Postagem',
      'Consultar postagem',
      'Exibir postagens do perfil',
      'Curtir/descurtir postagem',
      'Exibir postagens populares'
    ];

    let opcao: number = selecao(menu);

    while ( opcao != 0 ){
      
      try {
        switch (opcao) {
          case 1:
            this.incluirPerfil();
            
            break;
          case 2:
            this.consultarPerfil();
  
            break;
          case 3:
            this.incluirPostagem();
            
            break;
          case 4:
            this.consultarPostagem();
            
            break;
          case 5:
            this.exibirPostagensPorPerfil();
            
            break;
          case 6:
            this.curtirDescurtirPostagem();
  
            break;
          case 7:
            this.exibirPostagensPopulares();
  
            break;

        }
      } catch (e: any) {
  
        print(e.message);
      }

      this.salvarPerfis();
      this.salvarPostagens();

      continuar()
      exibirTitulo();

      opcao = selecao(menu)
    }

    print('Fim do programa!');

    this.salvarPerfis();
    this.salvarPostagens();
  }

  public incluirPerfil(): void {
    let id: string = gerarId();
    let nome: string = input('Nome do perfil: ');
    let email: string = inputEmail('Email valido: ');

    this._redeSocial.criarPerfil(id, nome, email);

  }

  public consultarPerfil(): void {
    let menu: string[] = ['Pesquisar por ID', 'Pesquisar por nome', 'Pesquisar por email'];
    let opcao: number = selecao(menu);
    
    let id: string|undefined;
    let nome: string|undefined;
    let email: string|undefined;

    switch (opcao) {
      case 1:
        id = inputId('Informe o ID: ');
        
        break;

      case 2:
        nome = input('Informe o nome: ');

        break;

      case 3:
        email = inputEmail('Informe o email: ');

        break;
    }
      
    let perfil = this._redeSocial.consultarPerfil(id, nome, email);

    if (perfil){
      print(perfil.toString());

    } else {
      print("Perfil não encontrado!");
      
    }
  }

  public incluirPostagem(): void {
    
    let perfil = this.selecionarPerfil();

    if ( !perfil ){
      print('Nao e possivel criar uma postagem, pois nao ha perfis cadastrados');
      return;
    }

    let id: string = gerarId();
    let texto: string = input('Texto: ');
    let data: string = new Date().toLocaleString();
    let hashtags: string[] | undefined;
    let visualizacoesRestantes: number | undefined;

    let ehAvancada: boolean = simOuNao('Deseja adicionar hashtags?')

    if ( ehAvancada ){
      hashtags = [];
      visualizacoesRestantes = 1;
      let opcao: number;
      
      do {
        hashtags.push(input('#'));

        opcao = selecao(['Adicionar outra']);
      } while ( opcao != 0 );

    }

    this._redeSocial.criarPostagem(id, texto, data, perfil, 0, 0, hashtags, visualizacoesRestantes);
    print('\nPostagem criada com sucesso!');

  }

  public consultarPostagem(): void {

    let menu: string[] = ['Pesquisar por ID', 'Pesquisar por texto', 'Pesquisar por hashtag', 'Pesquisar por perfil'];
    let opcao: number = selecao(menu);
    
    let id: string|undefined;
    let texto: string|undefined;
    let hashtags: string|undefined;
    let perfil: Perfil|undefined;

    switch (opcao) {
    
      case 1:
        id = inputId('Informe o ID: ');
        
        break;

      case 2:
        texto = input('Informe o texto: ');

        break;

      case 3:
        hashtags = input('Informe a hashtag: #');

        break;
      case 4:
        let perfilSelecionado: Perfil = this.selecionarPerfil();

        perfil = perfilSelecionado;

        break;

    }  
    
    let postagem: Postagem[]= this._redeSocial.consultarPostagens(id, texto, hashtags, perfil)

    postagem.forEach(post => {

      print(post.toString());
    });
  }

  public selecionarPerfil(): Perfil{
    let perfis: Perfil[] = this._redeSocial.obterPerfis();
    
    let nomesPerfis: string[] = [];

    for ( let perfil of perfis ) {
      nomesPerfis.push(perfil.nome);
    }

    print('Escolha o perfil associado: ');
    let indice: number = selecao(nomesPerfis);

    let perfil: Perfil = perfis[indice-1];

    return perfil;
  }

  public exibirPostagensPorPerfil(): void {
    let perfil: Perfil = this.selecionarPerfil();

    let postagens: Postagem[] = this._redeSocial.exibirPostagensPorPerfil(perfil.id);
    

    postagens.forEach(post => {
      print(post.toString());
    });    
  }

  public carregarPerfis(): void {
    let linhasPerfil: string[] = lerArquivo('../../q12/DataBase/perfis.txt');

    let ocorrencias: number = 0;

    for (let linha of linhasPerfil){
      if ( linha == ''){
        continue;
      }

      let dados: string[] = linha.split("#");

      let id: string = dados[0];
      let nome: string = dados[1];
      let email: string = dados[2];

      if ( !idValido(id) || !ehEmail(email)){
        ocorrencias++;
        continue;
      }

      this._redeSocial.criarPerfil(id, nome, email);
    }

    print('Dados carregados com sucesso!');
    print(`Total de ocorrencias: ${ocorrencias}`);

  }

  public salvarPerfis(): void {
    let perfis: Perfil[]  = this._redeSocial.obterPerfis();

    if (perfis.length == 0){
      print('\nNenhum perfil para salvar!');

      return;
    } 

    let dados: string = '';

    for ( let perfil of perfis ){
      dados += `${perfil.id}#${perfil.nome}#${perfil.email}\n`
    }

    dados = dados.slice(0, -1);

    escreverArquivo('../../q12/DataBase/perfis.txt', dados);
  }

  public carregarPostagens(): void {
    let linhasPostagem: string[] = lerArquivo('../../q12/DataBase/postagens.txt');

    let ocorrencias: number = 0;

    for (let linha of linhasPostagem){
      if ( linha == ''){
        continue;
      }

      let dados: string[] = linha.split("#");
      
//01HEJ8RK0P54BCKAD3BPQ1XDG7#exemplo sem tags#exemplo sem tags#0#0#06/11/2023 09:12:21#01HEH3A28CNFF0SKG9PYB4ZERNP

      let id: string = dados[0];
      let texto: string = dados[1]; 
      let curtidas: number = Number(dados[2]); 
      let descurtidas: number = Number(dados[3]); 
      let data: string = dados[4]; 
      let idPerfil: string = dados[5];
      let tipo: string = dados[6];
      let hashtags: string[]|undefined;
      let visuRestantes: number|undefined;
      let perfil: Perfil

      if ( tipo == 'PA' ){
        
        hashtags = dados[7].split('-');
        visuRestantes = Number(dados[8]);
      }

      if ( !idValido(id) || !idValido(idPerfil)){
        ocorrencias++;
        continue;
      }

      try {
        perfil = this._redeSocial.consultarPerfil(idPerfil);

      } catch (e: any) {
        ocorrencias++;
        continue;
      }

      this._redeSocial.criarPostagem(id, texto, data, perfil, curtidas, descurtidas, hashtags, visuRestantes);
    }

    print('\nPostagens carregados com sucesso!');
    print(`Total de ocorrencias: ${ocorrencias}`);
    
  }
  
  public salvarPostagens(): void {
    // 3456YGDE3456Y#texto#curtidas#descurtidas#data#idPerfil#P/PA#hash-hash2-hash3#visurestantes
    let postagens: Postagem[];

    try {

      postagens = this._redeSocial.obterPostagens();
    }catch(e: any){

      print('\nNenhuma postagem para salvar!');
      return;
    }

    let dados: string = '';

    for ( let post of postagens ){
      let tipo: string = 'P'
      
      dados += `${post.id}#${post.texto}#${post.curtidas}#${post.descrurtidas}#${post.data}#${post.perfil.id}`;
      
      if ( post instanceof PostagemAvancada) {
        tipo = 'PA';
        let hastags: string = '';
        // Dividir as hashtags

        for ( let tag of post.hashtags ){
          hastags += `${tag}-`;
        }

        hastags = hastags.slice(0, -1);
        
        dados += `#${tipo}#${hastags}#${post.visualizacoesRestantes}\n`;
        
      } else {
        dados += `#${tipo}\n`;

      }
    }
    
    dados = dados.slice(0, -1);
    escreverArquivo('../../q12/DataBase/postagens.txt', dados);
  }

  public selecionarPostagem(): Postagem  {
    let postagens: Postagem[] = this._redeSocial.obterPostagens();

    let opcoes: string[] = []

    for ( let post of postagens ) {
      opcoes.push(post.toString());
    }

    print('Escolha o perfil associado: ');
    let indice: number = selecao(opcoes);

    let post: Postagem = postagens[indice-1];

    return post;
  }
  
  public curtirDescurtirPostagem(): void {
    let postagem: Postagem = this.selecionarPostagem();

    let opcao: number = selecao(['Curtir', 'Descurtir'])

    switch (opcao) {
      case 1:
        this._redeSocial.curtir(postagem.id);
        break;
      case 2:
        this._redeSocial.descurtir(postagem.id);
        break;
    }

    print(postagem.toString());

  }

  public exibirPostagensPopulares(): void {
    let postagensPop: Postagem[] = this._redeSocial.obterPostagensPopular();

    if ( postagensPop.length == 0 ){
      print('Nenhuma postagem popular para exibir!');
      return;
    }

    postagensPop.forEach(post => {
      print(post.toString());
    }); 
  }

} // final da classe 


let app: App = new App();
app.rodarAplicacao();
