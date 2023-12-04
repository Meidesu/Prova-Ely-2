class AppException extends Error {
    constructor(message: string) {
        super(message);
    }
}

class PostagemNaoEncontradaException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

class PostagemInvalidaException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

class PerfilNaoEncontradoException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

class PerfilInvalidoException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

class PerfilExistenteException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

class PerfisNaoEncontradosException extends AppException {
    constructor(message: string) {
        super(message);
    }
}

export { AppException, PostagemNaoEncontradaException, PostagemInvalidaException, PerfilNaoEncontradoException, PerfilInvalidoException, PerfilExistenteException, PerfisNaoEncontradosException };