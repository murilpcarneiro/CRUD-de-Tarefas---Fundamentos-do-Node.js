# 📋 CRUD de Tarefas - Fundamentos do Node.js

Desafio proposto pela **Rocketseat** para aplicar conceitos fundamentais de Node.js, incluindo CRUD, manipulação de streams e importação de dados via CSV.

## 🎯 Objetivo

Desenvolver uma API em Node.js para gerenciamento completo de tarefas com funcionalidades de criar, listar, atualizar, deletar e marcar tarefas como concluídas. O diferencial é a importação em massa de tarefas a partir de um arquivo CSV.

## 🏗️ Estrutura de uma Tarefa

Cada tarefa possui as seguintes propriedades:

```javascript
{
  id: "uuid",                    // Identificador único
  title: "string",               // Título da tarefa
  description: "string",         // Descrição detalhada
  completed_at: "ISO-8601 | null", // Data de conclusão
  created_at: "ISO-8601",        // Data de criação
  updated_at: "ISO-8601"         // Data da última atualização
}
```

## 🚀 Funcionalidades

### 1. **POST /tasks**

Cria uma nova tarefa.

- **Body:**
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Resposta:** Status 201 (Created)
- **Comportamento:**
  - Gera `id` automaticamente (UUID)
  - Define `created_at` e `updated_at` como data atual
  - Inicializa `completed_at` como `null`

---

### 2. **GET /tasks**

Lista todas as tarefas com suporte a filtros.

- **Query Parameters:**
  - `title`: Filtra por título (busca parcial)
  - `description`: Filtra por descrição (busca parcial)
- **Resposta:** Array de tarefas em JSON
- **Exemplo:**
  ```bash
  GET /tasks?title=trabalho
  GET /tasks?description=urgente
  ```

---

### 3. **PUT /tasks/:id**

Atualiza uma tarefa existente.

- **Parâmetros:** `:id` - UUID da tarefa
- **Body:** (um ou ambos os campos)
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Respostas:**
  - Status 204 (No Content) - Sucesso
  - Status 404 (Not Found) - Tarefa não existe
- **Comportamento:**
  - Aceita atualizar apenas `title` OU apenas `description`
  - Atualiza automaticamente o campo `updated_at`

---

### 4. **DELETE /tasks/:id**

Remove uma tarefa específica.

- **Parâmetros:** `:id` - UUID da tarefa
- **Respostas:**
  - Status 204 (No Content) - Sucesso
  - Status 404 (Not Found) - Tarefa não existe

---

### 5. **PATCH /tasks/:id/complete**

Marca uma tarefa como concluída ou não concluída.

- **Parâmetros:** `:id` - UUID da tarefa
- **Respostas:**
  - Status 204 (No Content) - Sucesso
  - Status 404 (Not Found) - Tarefa não existe
- **Comportamento:**
  - Se `completed_at` for `null`, define como data atual
  - Se `completed_at` tiver valor, volta para `null`

---

## 📥 Importação de CSV

### Usando o Script de Importação

O projeto inclui um script para importar tarefas em massa a partir de um arquivo CSV.

#### Formato do CSV

```csv
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
```

#### Como Usar

1. **Certifique-se de que o servidor está rodando:**

   ```bash
   npm start
   ```

2. **Em outro terminal, execute o importador:**
   ```bash
   node src/csv-import/csv-reader.js
   ```

#### Comportamento

O script vai:

- ✅ Ler todas as linhas do arquivo `fs_read.csv`
- ✅ Para cada linha, fazer uma requisição **POST** para `/tasks`
- ✅ Exibir o progresso e feedback (sucesso ou erro)
- ✅ Salvar todos os dados automaticamente no `db.json`

**Exemplo de saída:**

```
📥 Iniciando leitura do CSV...
✓ 5 tasks lidas do CSV

📤 Importando tasks para o banco de dados...
✓ Task criada: Task 01
✓ Task criada: Task 02
✓ Task criada: Task 03
✓ Task criada: Task 04
✓ Task criada: Task 05

✅ Importação concluída!
```

---

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js v18+ instalado

### Instalação de Dependências

```bash
npm install
```

### Iniciar o Servidor

```bash
npm start
```

O servidor será iniciado em `http://localhost:3333`

### Testar as Rotas

#### Criar uma tarefa

```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aprender Node.js",
    "description": "Estudar os fundamentos"
  }'
```

#### Listar todas as tarefas

```bash
curl http://localhost:3333/tasks
```

#### Filtrar por título

```bash
curl "http://localhost:3333/tasks?title=Node"
```

#### Atualizar uma tarefa

```bash
curl -X PUT http://localhost:3333/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título atualizado"
  }'
```

#### Marcar como concluída

```bash
curl -X PATCH http://localhost:3333/tasks/{id}/complete
```

#### Deletar uma tarefa

```bash
curl -X DELETE http://localhost:3333/tasks/{id}
```

---

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── server.js              # Servidor HTTP principal
│   ├── routes.js              # Definição de todas as rotas
│   ├── databse.js             # Classe Database (armazenamento em JSON)
│   ├── middlewares/
│   │   └── json.js            # Middleware para parsing de JSON
│   ├── utils/
│   │   ├── build-route-path.js    # Cria regex para rotas dinâmicas
│   │   └── extract-query-params.js # Extrai parâmetros de query
│   └── csv-import/
│       ├── csv-reader.js      # Script de importação CSV
│       └── fs_read.csv        # Arquivo CSV com tarefas para importar
├── db.json                    # Banco de dados em JSON
├── package.json
└── README.md
```

---

## 🔧 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **CSV-Parse** - Leitura e parsing de arquivos CSV
- **Streams** - Manipulação eficiente de dados
- **UUID** - Geração de IDs únicos
- **JSON** - Armazenamento de dados

---

## 📝 Principais Conceitos Aplicados

✅ **CRUD Completo** - Create, Read, Update, Delete
✅ **Streams e Async/Await** - Processamento de CSV com iteradores assíncronos
✅ **Rotas Dinâmicas** - Uso de regex para capturar parâmetros (:id, query strings)
✅ **Middlewares** - Processamento de requisições (parsing JSON)
✅ **Persistência** - Armazenamento em JSON
✅ **HTTP Nativo** - Sem frameworks, usando apenas Node.js puro

---

## 🎓 Aprendizados

Este desafio reforça:

- Manipulação de rotas e métodos HTTP
- Validação e tratamento de erros
- Leitura e processamento de arquivos
- Requisições HTTP internas (fetch)
- Armazenamento e manipulação de dados
- Boas práticas com async/await

---

## 📚 Referências

- [Node.js Documentation](https://nodejs.org/docs/)
- [csv-parse Library](https://csv.js.org/parse/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [UUID RFC 4122](https://tools.ietf.org/html/rfc4122)

---

## 👤 Autor

Desenvolvido como desafio prático pela **Rocketseat** - Educação em desenvolvimento.

---

**Happy Coding! 🚀**
