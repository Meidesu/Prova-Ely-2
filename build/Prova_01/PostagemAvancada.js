"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemAvancada = void 0;
var Postagem_1 = require("./Postagem");
var PostagemAvancada = /** @class */ (function (_super) {
    __extends(PostagemAvancada, _super);
    function PostagemAvancada(id, texto, curtidas, descrurtidas, data, perfil, hashtags, visualizacoesRestantes) {
        var _this = _super.call(this, id, texto, curtidas, descrurtidas, data, perfil) || this;
        _this._hashtags = hashtags;
        _this._visualizacoesRestantes = visualizacoesRestantes;
        return _this;
    }
    Object.defineProperty(PostagemAvancada.prototype, "hashtags", {
        get: function () {
            return this._hashtags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PostagemAvancada.prototype, "visualizacoesRestantes", {
        get: function () {
            return this._visualizacoesRestantes;
        },
        enumerable: false,
        configurable: true
    });
    PostagemAvancada.prototype.adicionarHashtag = function (hashtag) {
        this._hashtags.push(hashtag);
    };
    PostagemAvancada.prototype.existeHashtag = function (hashtag) {
        return this._hashtags.includes(hashtag);
    };
    // public existeHashtag2(hashtag: string): boolean{
    //   for (let hashtag of this._hashtags){
    //     if (hashtag == hashtag){
    //       return true;
    //     }
    //   }
    //   return false;
    // }
    PostagemAvancada.prototype.decrementarVisualizacoes = function () {
        if (this._visualizacoesRestantes > 0) {
            this._visualizacoesRestantes--;
        }
    };
    PostagemAvancada.prototype.toString = function () {
        var out = _super.prototype.toString.call(this);
        out += "\n    Hashtags: #".concat(this._hashtags, "\n\n    Visualiza\u00E7\u00F5es Restantes: ").concat(this._visualizacoesRestantes);
        return out;
    };
    return PostagemAvancada;
}(Postagem_1.Postagem));
exports.PostagemAvancada = PostagemAvancada;
