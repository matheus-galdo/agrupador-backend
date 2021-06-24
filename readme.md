# API Agrupador

## Instalação

Faça download do repositório:

```
$ git clone https://github.com/galdo0139/grupos-backend.git
```

Acesse pelo terminal a pasta onde o repositório foi baixado e instale as dependências do projeto com seu gerenciador de pacotes favorito:
```
$ npm install
```
ou
```
$ yarn install
```



## Configuração de bancos de dados

Crie dois bancos de dados em seu ambiente, um será usado em produção e o outro para executar os testes da aplicação.

Certifique-se de criar o banco de dados de teste no mesmo host do banco de produção, para que os testes tenham o mesmo resultado que a aplicação. 



## Configuração do .env
  
Duplique o arquivo .env.example e o renomeio para .env

Edite o arquivo .env para configurar suas conexões de bancos de dados. Certifique-se de usar as duas conexões criadas anteriormente.

O banco de dados padrão da aplicação é o postgree, caso queira usar outro banco será necessário instalar o pacote com o driver do banco desejado.



## Migrando banco de dados

A aplicação possui migrações para facilitar a instalação.

Pelo terminal, acesse o diretório onde esta o repositório e execute o seguinte comando:

```
$ yarn typeorm migration:run
```

ou

```
$ npm run typeorm migration:run
```

## Rodando o servidor

Pelo terminal, acesse o diretório onde esta o repositório e execute o seguinte comando:

```
$ yarn dev
```

ou

```
$ npm run dev
```

O servidor será iniciado na porta definida no arquivo .env, se nenhuma porta foi definida ele será executado na porta 5000.

## Executando os testes

Pelo terminal, acesse o diretório onde esta o repositório e execute o seguinte comando:


### Para usuários de Windows
```
$ yarn windows_test
```

ou

```
$ npm run windows_test
```

### Para os demais SO's
```
$ yarn test
```

ou

```
$ npm run test
```