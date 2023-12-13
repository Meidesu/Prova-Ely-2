import { print, selecao } from "../utils/io_utils";
import { App } from "./App";
import { IRepositorioPerfis } from "./interfaces/IRepositorioPerfis";
import { IRepositorioPostagens } from "./interfaces/IRepositorioPostagens";
import { RepositorioPerfisArquivo } from "./repositories/RepositorioPerfisArquivo";
import { RepositorioPerfisArray } from "./repositories/RepositorioPerfisArray";
import { RepositorioPostagemArquivo } from "./repositories/RepositorioPostagensArquivo";
import { RepositorioPostagensArray } from "./repositories/RepositorioPostagensArray";

function main() {

  print('\nSelecione uma opção de persistência: ');

  let opcao: number = selecao(['Array', 'Arquivo']);
  let repoPerfil: IRepositorioPerfis|undefined;
  let repoPostagem: IRepositorioPostagens|undefined; 

  

  do {
    switch (opcao) {  
      case 1:
        repoPerfil = new RepositorioPerfisArray();
        repoPostagem = new RepositorioPostagensArray();
  
        break;
  
      case 2:
        repoPerfil = new RepositorioPerfisArquivo();
        repoPostagem = new RepositorioPostagemArquivo(repoPerfil);
  
        break;
  
      case 0:
        console.log('Saindo...');
        return;      
      
      default:
        print('Opcao invalida');
        break;
    }
    
  } while (!repoPerfil || !repoPostagem);

  let app: App = new App(repoPerfil, repoPostagem);

  app.rodarAplicacao();
}

main();

/*
12. Altere a aplicação feita sobre redes sociais para:

  a. Tratar erros e capturar exceções;

  b. Utilizar um mecanismo de persistência independente:
    i. Ter interfaces chamadas IRepositorioPerfis e IRepositorioPostagens
    com métodos de consulta e inclusão relacionada à persistência de
    dados;
    ii. Usar um mecanismo de persistência alternativo que implemente as
    interfaces. Sugestão: banco de dados SQL;
    iii. Na hora de inicializar o App, você deve escolher o mecanismo de
    persistência e instanciar as implementações das interfaces (array,
    banco de dados, arquivo);
    iv. A classe rede social deve ter, em vez de repositórios comuns,
    interfaces e funcionar sem alterações independente da
    implementação.
*/