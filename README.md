<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Instagram Clone</h3>

  <p align="center">
   An Instagrma Clone that I made all by myself with the <a href="https://github.com/t3-oss/create-t3-app">T3 Stack</a>
    <br />
    <a href="https://github.com/nicholascostadev"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nicholascostadev">View Demo</a>
    ·
    <a href="https://github.com/nicholascostadev/issues">Report Bug</a>
    ·
    <a href="https://github.com/nicholascostadev/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabela de Conteúdos | Table of Contents</summary>
  <ul>
  <li><a href="#portugues">Portugues</a>
    <ol>
    <li>
      <a href="#about-the-project">Sobre o projeto</a>
      <ul>
        <li><a href="#built-with">Feito com</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Como começar</a>
      <ul>
        <li><a href="#prerequisites">Pré-requisitos</a></li>
        <li><a href="#installation">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usos</a></li>
    <li><a href="#contributing">Como contribuir</a></li>
    <li><a href="#license">Licença</a></li>
    <li><a href="#contact">Contato</a></li>
    <li><a href="#acknowledgments">Aprendizados</a></li>
  </ol>
  </li>
  <li><a href="#english">English</a>
    <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
  </li>
</details>

<!-- ABOUT THE PROJECT -->

## Portugues

---

## Sobre o projeto

![Instagram Clone screenshot][images/instagram-clone.jpeg]

### Feito com

- [Nextjs][next-url]
- [TailwindCss][tailwind-url]
- [TRPC][trpc-url]
- [Radix][radix-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Como rodar o projeto localmente

Para rodar localmente, siga os passos abaixo

### Pré-requisitos

- Node(LTS) + npm

### Instalação

Se você estiver usando yarn como eu:

```bash
git clone https://github.com/nicholascostadev/instagram-clone
cd instagram-clone
cp .env.example .env
# O arquivo env tem as variaveis que você precisa preencher
# para que a aplicação funcione. Se você tiver qualquer problema
# na configuração, você pode checar essa documentação https://next-auth.js.org/providers/google ou me contate e vejo o que posso ajudar :D
yarn
yarn prisma db push
yarn dev
```

If you're using npm

```bash
git clone https://github.com/nicholascostadev/instagram-clone
cd instagram-clone
rm -rf yarn.lock
cp .env.example .env
# O arquivo env tem as variaveis que você precisa preencher
# para que a aplicação funcione. Se você tiver qualquer problema
# na configuração, você pode checar essa documentação https://next-auth.js.org/providers/google ou me contate e vejo o que posso ajudar :D
npm install
npm run prisma db push
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Como você pode usar

Você pode ver os posts na página principal depois de você estar logado. Voce pode criar posts, dar like e adicionar comentários em todos eles.

Você também pode mudar seu nome de usuário se o desejado estiver disponível.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contribuição

Contribuição é o que faz a comunidade de open source tão incrivel para aprender, se inspirar e criar. Qualquer contribuição que você faça é **extremamente apreciada**

Se você tiver uma sugestão que possa fazer esse projeto melhor, por favor faça um fork desse repositório e crie um pull request. Você pode também simplesmente cria uma issue com a tag "enhancement".
Não esqueça de dar uma estrela no projeto! Obrigado denovo!

1. Dê um fork no projeto
2. Crie a branch de feature (`git checkout -b feature/AmazingFeature`)
3. Dê um commit nas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Dê um push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um pull request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## Licença

Distribuído sob licença MIT. olhe `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contato

Nicholas Costa - [@NicholasCosta04](https://twitter.com/your_username) - nicholascostadev@gmail.com

Project Link: [https://github.com/nicholascostadev/instagram-clone](https://github.com/nicholascostadev/instagram-clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Conhecimentos

Conhecimentos encontrados a partir da criação desse projeto

- [Prisma many to many relation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations)
- [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# TODO

- [x] Traduzir página de login para inglês
- [x] Criar página de perfil
- [x] Adicionar funcionalidade de criar um Post
- [x] Fazer trocar de pagina com as opções do dropdown do header
- [ ] Fazer com que o usuário possa editar ou adicionar a prórpria descrição
- [ ] Fazer com que o usuário possa editar ou adicionar o próprio website
- [ ] Fazer com que os posts tenham uma proporção fixa nas imagens [tailwindcss-aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

---

## English

---

## About The Project

![Instagram Clone screenshot][images/instagram-clone.jpeg]

### Built With

- [Nextjs][next-url]
- [TailwindCss][tailwind-url]
- [TRPC][trpc-url]
- [Radix][radix-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## How to run it locally

To run it locally, follow these steps

### Prerequisites

- Node(LTS) + npm

### Installation

If you're using yarn like me:

```bash
git clone https://github.com/nicholascostadev/instagram-clone
cd instagram-clone
cp .env.example .env
# That env file has the env variables you need to fill
# to have you app working, if you have any problem doing
# so, you can check this documentation out https://next-auth.js.org/providers/google or contact me and I can try to help you :D
yarn
yarn prisma db push
yarn dev
```

If you're using npm

```bash
git clone https://github.com/nicholascostadev/instagram-clone
cd instagram-clone
rm -rf yarn.lock
cp .env.example .env
# That env file has the env variables you need to fill
# to have you app working, if you have any problem doing
# so, you can check this documentation out https://next-auth.js.org/providers/google or contact me and I can try to help you :D
npm install
npm run prisma db push
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

You can see posts in the main page after you're logged in. You can create posts, and also like and comment all of them.

You can also change your username if your desired username is available

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Nicholas Costa - [@NicholasCosta04](https://twitter.com/your_username) - nicholascostadev@gmail.com

Project Link: [https://github.com/nicholascostadev/instagram-clone](https://github.com/nicholascostadev/instagram-clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Prisma many to many relation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations)
- [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# TODO

- [x] Translate Login page to English
- [x] Create Profile Page
- [x] Create Post Page
- [x] Make 'Tab' change between options in Header Dropdown
- [ ] Make user able to change or add his own description
- [ ] Make user able to change or add his own website
- [ ] Make Fixed aspect ratio for posts in feed and profile [tailwindcss-aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

<!-- MARKDOWN LINKS & IMAGES -->

[issues-url]: https://github.com/nicholascostadev/issues
[next-url]: https://nextjs.org/
[tailwind-url]: "https://tailwindcss.com"
[trpc-url]: https://trpc.io/
[radix-url]: https://www.radix-ui.com/
