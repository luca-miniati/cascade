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
[![MIT License][license-shield]][license-url]

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
[Danfo-shield]: https://img.shields.io/logo.svg?logo=data:image/png;base64,AAAAGGZ0eXBhdmlmAAAAAG1pZjFtaWFmAAAA0m1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAAA8gAAAksAAAAjaWluZgAAAAAAAQAAABVpbmZlAgAAAAABAABhdjAxAAAAAFZpcHJwAAAAOGlwY28AAAAUaXNwZQAAAAAAAABIAAAASAAAAAxhdjFDgT9AAAAAABBwaXhpAAAAAAMKCgoAAAAWaXBtYQAAAAAAAAABAAEDAYIDAAACU21kYXQSAAoJP9mjxy8BDQbQMrsEZGSM0MnE/z+gD9gEDAIQAAAAAADiBUQEEEVA9gprrpjj6Aj6gcRD4bH0I+MQ52nv92TT6xDDOV4ZxAJsSRrqWYaVddddBZrljp3yHjNBWW296S5F1xTQnOdoPufrgkt8RxEp47VGwGvoFYVRNQqDRinmI1CIOGm0RKhfSIaY4RZR77klGGxkz952rjKcoa1MsgdxhE/cToW6MiaiCBZ2yHiluuwOWtmZRmLh/l7TfN1xXXaQzEu2WumnLta1flnUNOnJrWZoqZXqBZTkTo9KFDif9zOXTZjDMS7nYQPiECp/z3UYLETzGFM/GsqRec98fIP7O4dMHTtxc1nvZIci235YMGido9EmXTnWsLpNmwDVgQdkOxNhhMK2m+9SOYgblhAMEC4pWeKVnseXBxB+zqad3ih242EbFzPBgL02db6HdNi7NJ5wVqyS4k7TvsziBoc+dOKPE9yXV1ik2BzKo8T7jTrps4BOj304AY4hBBcRuoafoBncy5m/6USyAo2RlzyJ4g0E/zGTmzyNHMImeVK33Usdv0SQAbMLdOjgFOPq+SqKKvuPrOXl/W8c7v1GL8/FLA+GhL4dXr0tFYViMwXehag4N79EMVVSINCmDoYG4Ore21X8wNnje0Ca9CvNL1IqkSEf9VergZM1aOfu1s7vwHO1eVQnr5lRQUFcDMvKqopdHj//AM+LWJAMZEf7roOCyKdB7w7N2hqvUlmA6NrYgQ7FZE4x8UVg8tolhhIX7d8dc5OBIXfLQA==
[Next-url]: https://nextjs.org/
[Deno-url]: https://deno.com/
[Tf-url]: https://www.tensorflow.org/js
[Danfo-url]: https://danfo.jsdata.org/
[GLPK-url]: https://github.com/hgourvest/node-glpk
