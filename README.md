
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4acff380-6f2a-4580-ae80-567d51af7c90

## Como adicionar escolas ao sistema

Para adicionar mais escolas ao sistema de censo escolar:

1. **Localizar o arquivo de escolas**: O arquivo está em `src/data/schools.json`

2. **Formato do arquivo**: Cada escola deve seguir o formato:
```json
{
  "name": "Nome da Escola",
  "inep": "12345678"
}
```

3. **Exemplo de como adicionar escolas**:
```json
[
  {
    "name": "Escola Municipal João Silva",
    "inep": "23456789"
  },
  {
    "name": "Escola Estadual Maria Santos", 
    "inep": "34567890"
  },
  {
    "name": "Nova Escola Adicionada",
    "inep": "99887766"
  }
]
```

4. **Para uso offline**: 
   - Edite o arquivo `src/data/schools.json` diretamente
   - Adicione quantas escolas precisar seguindo o formato acima
   - O sistema automaticamente calculará quantas escolas faltam ser preenchidas
   - Reinicie a aplicação após as alterações

5. **Informações importantes**:
   - O código INEP deve ser único para cada escola
   - O nome da escola aparecerá no formulário de censo
   - O painel administrativo mostra automaticamente quantas escolas ainda faltam ser cadastradas

## Credenciais de acesso ao painel administrativo

- **Usuário**: admin
- **Senha**: admin123

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4acff380-6f2a-4580-ae80-567d51af7c90) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4acff380-6f2a-4580-ae80-567d51af7c90) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
