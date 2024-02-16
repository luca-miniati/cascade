<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/luca-miniati/prosper-zero">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ProsperZero</h3>

  <p align="center">
    Autonomous P2P Loan Optimization Agent
    <br />
    <a href="https://github.com/luca-miniati/prosper-zero"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/luca-miniati/prosper-zero">View Demo</a>
    ·
    <a href="https://github.com/luca-miniati/prosper-zero/issues">Report Bug</a>
    ·
    <a href="https://github.com/luca-miniati/prosper-zero/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#backtesting">Backtesting</a></li>
        <li><a href="#frontend">Frontend</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>


## About The Project

What is ProsperZero?
ProsperZero is an autonomous Peer-to-Peer (P2P) Loan Optimization Agent. It automates the process
of purchasing loans on Prosper through its API. ProsperZero uses linear programming combined with
machine learning to optimize a portfolio of loans, hands-free.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With

* [![Next.js][Next-shield]][Next-url]
* [![Deno][Deno-shield]][Deno-url]
* [![GLPK][GLPK-shield]][GLPK-url]
* [![TensorFlow][Tf-shield]][Tf-url]
* [![Danfo.js][Danfo-shield]][Danfo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Setup

### Backtesting
1. Install all dependencies
2. Get [Prosper Data](https://help.prosper.com/hc/en-us/articles/210013083-Where-can-I-download-data-about-loans-through-Prosper)
3. Navigate to `/prosper-zero/supabase/functions/backtest`
4. Run `deno run --allow-all index.ts` to start backtesting script

### Frontend
1. Install all dependencies
2. Navigate to `/prosper-zero/prosper-zero`
3. Run `npm run dev`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Roadmap

- [ ] Backtesting over historical data
    - [ ] Analysis of performance
        - [ ] 
- [ ] Automatic orders
- [ ] Frontend
    - [ ] User management
    - [ ] Dashboard
    - [ ] Settings
    - [ ] History

See the [open issues](https://github.com/luca-miniati/prosper-zero/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/luca-miniati/prosper-zero.svg?style=for-the-badge
[contributors-url]: https://github.com/luca-miniati/prosper-zero/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/luca-miniati/prosper-zero.svg?style=for-the-badge
[forks-url]: https://github.com/luca-miniati/prosper-zero/network/members
[stars-shield]: https://img.shields.io/github/stars/luca-miniati/prosper-zero.svg?style=for-the-badge
[stars-url]: https://github.com/luca-miniati/prosper-zero/stargazers
[issues-shield]: https://img.shields.io/github/issues/luca-miniati/prosper-zero.svg?style=for-the-badge
[issues-url]: https://github.com/luca-miniati/prosper-zero/issues
[Next-shield]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Deno-shield]: https://img.shields.io/badge/deno-000000?style=for-the-badge&logo=deno&logoColor=white
[GLPK-shield]: https://img.shields.io/badge/GLPK-000000?style=for-the-badge&logo=gnu
[Tf-shield]: https://img.shields.io/badge/tensorflow-grey?style=for-the-badge&logo=tensorflow
[Danfo-shield]: https://img.shields.io/badge/Danfo.js-ffdf00.png?logo=data:image/png;base64,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
[Next-url]: https://nextjs.org/
[Deno-url]: https://deno.com/
[Tf-url]: https://www.tensorflow.org/js
[Danfo-url]: https://danfo.jsdata.org/
[GLPK-url]: https://github.com/hgourvest/node-glpk
