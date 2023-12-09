import { Postagem } from "./models/Postagem"
import { Perfil } from "./models/Perfil"
import { PostagemAvancada } from "./models/PostagemAvancada"
import { IRepositorioPerfis } from "./interfaces/IRepositorioPerfis";
import { IRepositorioPostagens } from "./interfaces/IRepositorioPostagens";

export class RedeSocial {
    private _repositorioPerfis: IRepositorioPerfis;
    private _repositorioPostagens: IRepositorioPostagens;

    constructor(repositorioPerfis: IRepositorioPerfis, repositorioPostagens: IRepositorioPostagens) {
        this._repositorioPerfis = repositorioPerfis;
        this._repositorioPostagens = repositorioPostagens;
    }

    criarPerfil(id: string, nome: string, email: string): void{
        let novoPerfil: Perfil = new Perfil(id, nome, email);

        this.incluirPerfil(novoPerfil);
    }

    incluirPerfil(perfil: Perfil): void {
        if (perfil.id && perfil.nome && perfil.email) {
            this._repositorioPerfis.incluir(perfil);
        }
    }

    consultarPerfil(id?: string, nome?: string, email?: string): Perfil {
        
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

    consultarPostagens(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
        let postagens: Postagem[] = this._repositorioPostagens.consultar(id, texto, hashtag, perfil);
        
        this.decrementarVisualizacoes(postagens);
        return postagens;
    }

    curtir(idPostagem: string): void {
        let postagem = this._repositorioPostagens.consultarId(idPostagem);
        
        postagem.curtir();
    }

    descurtir(idPostagem: string): void {
        let postagem = this._repositorioPostagens.consultarId(idPostagem);

        postagem.descurtir();
    }

    decrementarVisualizacoes(postagens: Postagem[]): void {

        for (let postagem of postagens){
            if (postagem instanceof PostagemAvancada) {
                postagem.decrementarVisualizacoes();
            }
        }
    }

    exibirPostagensPorPerfil(id: string): Postagem[]{
        const perfil: Perfil = this._repositorioPerfis.consultar(id);
        let postagens: Postagem[] = this._repositorioPostagens.consultarPorPerfil(perfil);

        this.decrementarVisualizacoes(postagens);

        return postagens;
    }
    
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagens: PostagemAvancada[] = this._repositorioPostagens.consultarPorHashtag(hashtag);

        this.decrementarVisualizacoes(postagens); // decrementa as visualizações das postagens
        return postagens; // Retorna o array com as postagens que possuem a hashtag
    }

    existePerfil(nome: string): boolean {
        return this._repositorioPerfis.existeNome(nome);
    }

    obterPerfis(): Perfil[] {
        return this._repositorioPerfis.perfis();
    }  

    obterPostagens(): Postagem[]{
        return this._repositorioPostagens.obterPostagens();
    }  

    obterPostagensPopular(): Postagem[] {
        let postagens: Postagem[] = this.obterPostagens();
        let postagensPop: Postagem[] = [];

        for ( let post of postagens ){
            if ( post.ehPopular() ) {
                postagensPop.push(post)
            }
        }

        return postagensPop;
    }
}   