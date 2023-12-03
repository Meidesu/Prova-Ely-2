import { Postagem } from "./Postagem"
import { Perfil } from "./Perfil"
import { PostagemAvancada } from "./PostagemAvancada"
import { RepositorioPostagens } from "./RepositorioPostagens"
import { RepositorioPerfis } from "./RepositorioPerfis"

export class RedeSocial {
    private _repositorioPerfis = new RepositorioPerfis();
    private _repositorioPostagens = new RepositorioPostagens();

    criarPerfil(id: string, nome: string, email: string): void{
        let novoPerfil: Perfil = new Perfil(id, nome, email);

        this.incluirPerfil(novoPerfil);
    }

    incluirPerfil(perfil: Perfil): void {
        if (perfil.id && perfil.nome && perfil.email) {
            this._repositorioPerfis.incluir(perfil);
        }
    }

    consultarPerfil(id?: string, nome?: string, email?: string): Perfil | null {
        
        return this._repositorioPerfis.consultar(id, nome, email);
    }

    criarPostagem(id: string, texto: string, data: string, perfil: Perfil, curtidas: number = 0, descrurtidas: number = 0,  hashtags?: string[], visuRestantes?: number): void {
        let postagem: Postagem;

        if ( hashtags && visuRestantes){
            postagem = new PostagemAvancada(id, texto, curtidas, descrurtidas, data, perfil, hashtags, visuRestantes);

            this.incluirPostagem(postagem);
            return;
        }
        
        postagem = new Postagem(id, texto, curtidas, descrurtidas, data, perfil);
        
        this.incluirPostagem(postagem);
    }

    incluirPostagem(postagem: Postagem): void {

        
        if ( !postagem.id || this._repositorioPostagens.existeId(postagem.id)){ 
            return;
        }

        if ( postagem instanceof PostagemAvancada){
            if ( postagem.hashtags.length == 0){
                return;
            }
        }

        if ( !postagem.texto || postagem.texto.length == 0){
            return;
        }

        if ( !postagem.perfil ){
            return;
        }

        this._repositorioPostagens.incluir(postagem);
        
    }

    consultarPostagens(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null{
        let postagens: Postagem[]|null = this._repositorioPostagens.consultar(id, texto, hashtag, perfil);

        if (postagens) {
            // postagens = postagens.filter(postagem => { if (postagem instanceof PostagemAvancada) {
            //     return postagem.visualizacoesRestantes > 0;
            // }});
      
            this.decrementarVisualizacoes(postagens);
            return postagens;
        }

        return null;
    }

    curtir(idPostagem: string): void {
        const postagem = this._repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.curtir();
        }
    }

    descurtir(idPostagem: string): void {
        const postagem = this._repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.descurtir();
        }
    }

    decrementarVisualizacoes(postagens: Postagem[]): void {

        for (let postagem of postagens){
            if (postagem instanceof PostagemAvancada) {
              postagem.decrementarVisualizacoes();
            }
        }
    }

    exibirPostagensPorPerfil(id: string): Postagem[] | null{
        const perfil: Perfil|null = this._repositorioPerfis.consultar(id);
        let postagens: Postagem[] | null = [];
        
        if ( !perfil ){
            return null;
        }
      
        postagens = this._repositorioPostagens.consultarPorPerfil(perfil);

        if ( postagens ){
            this.decrementarVisualizacoes(postagens);

            return postagens;
        }
        
        return null;
    }
    
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] | null {
        let postagens: PostagemAvancada[]|null = this._repositorioPostagens.consultarPorHashtag(hashtag);

        if ( !postagens ){
            return null; // Retorna um array vazio se não houver postagens com a hashtag
        }

        this.decrementarVisualizacoes(postagens); // decrementa as visualizações das postagens
        return postagens; // Retorna o array com as postagens que possuem a hashtag
    }

    existePerfil(nome: string): boolean {
        return this._repositorioPerfis.existeNome(nome);
    }

    obterPerfis(): Perfil[] {
        return this._repositorioPerfis.perfis;
    }  

    obterPostagens(): Postagem[] | null{
        return this._repositorioPostagens.obterPostagens();
    }  

    obterPostagensPopular(): Postagem[] | null {
        let postagens: Postagem[]|null = this.obterPostagens();
        let postagensPop: Postagem[] = [];

        if ( !postagens ){
            return null;
        }

        for ( let post of postagens ){
            if ( post.ehPopular() ) {
                postagensPop.push(post)
            }
        }

        if ( !postagensPop ) return null;

        return postagensPop;
    }
}   