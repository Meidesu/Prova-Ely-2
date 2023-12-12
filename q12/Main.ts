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
        repoPostagem = new RepositorioPostagemArquivo();
  
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