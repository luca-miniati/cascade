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
  <a href="https://github.com/luca-miniati/cascade">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <p align="center">
    Autonomous P2P Loan Optimization Agent
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

Cascade is an autonomous Peer-to-Peer (P2P) Loan Optimization Agent. It automates the process
of purchasing loans on Prosper through its API. Cascade uses linear programming combined with
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
3. Navigate to `/cascade/supabase/functions/backtest`
4. Run `deno run --allow-all index.ts` to start backtesting script

### Frontend
1. Install all dependencies
2. Navigate to `/cascade/cascade`
3. Run `npm run dev`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<p align="right">(<a href="#readme-top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/luca-miniati/cascade.svg?style=for-the-badge
[contributors-url]: https://github.com/luca-miniati/cascade/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/luca-miniati/cascade.svg?style=for-the-badge
[forks-url]: https://github.com/luca-miniati/cascade/network/members
[stars-shield]: https://img.shields.io/github/stars/luca-miniati/cascade.svg?style=for-the-badge
[stars-url]: https://github.com/luca-miniati/cascade/stargazers
[issues-shield]: https://img.shields.io/github/issues/luca-miniati/cascade.svg?style=for-the-badge
[issues-url]: https://github.com/luca-miniati/cascade/issues
[Next-shield]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Deno-shield]: https://img.shields.io/badge/deno-000000?style=for-the-badge&logo=deno&logoColor=white
[GLPK-shield]: https://img.shields.io/badge/GLPK-000000?style=for-the-badge&logo=gnu
[Tf-shield]: https://img.shields.io/badge/tensorflow-grey?style=for-the-badge&logo=tensorflow
[Danfo-shield]: https://img.shields.io/badge/Danfo.js-ffdf00?style=for-the-badge
[Next-url]: https://nextjs.org/
[Deno-url]: https://deno.com/
[Tf-url]: https://www.tensorflow.org/js
[Danfo-url]: https://danfo.jsdata.org/
[GLPK-url]: https://github.com/hgourvest/node-glpk
