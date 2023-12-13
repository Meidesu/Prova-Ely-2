import { Postagem } from "./models/Postagem";
import { Perfil } from "./models/Perfil";
import { RedeSocial } from "./RedeSocial";
import { continuar, input, limparConsole, print, selecao, inputEmail, gerarId, inputId, simOuNao, exibirTitulo } from "../utils/io_utils";
import { IRepositorioPerfis } from "./interfaces/IRepositorioPerfis";
import { IRepositorioPostagens } from "./interfaces/IRepositorioPostagens";


export class App {

  // TODO: Adicionar argumentos ao construtor de rede social
  private _redeSocial: RedeSocial;
  
  constructor(repoPerfil: IRepositorioPerfis, repoPost: IRepositorioPostagens) {
    this._redeSocial = new RedeSocial(repoPerfil, repoPost);
  }

  public rodarAplicacao(): void {    
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
  
        print(e);
        console.log(e.stack);
        
      }

      continuar()
      exibirTitulo();

      opcao = selecao(menu)
    }

    print('Fim do programa!');
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
      print('Nenhum perfil selecionado!');
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