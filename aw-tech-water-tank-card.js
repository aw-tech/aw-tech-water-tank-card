class AwTechWaterTankCard extends HTMLElement {
  constructor() {
    super();

    // Tworzenie szablonu HTML
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          
          .water-tank {
            width: 20em;
            height: 30em;
            border: 0.3em solid #3A3A3A;
            border-top: none;
            box-sizing: border-box;
            position: relative;
          }

          .water-tank .liquid {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
          }

          .water-tank .liquid svg {
            height: 30em;
            top: calc(5%);
            position: absolute;
            animation: waves 5s infinite linear;
          }

          @keyframes waves {
              0% { transform: translateX(-15em); }
              100% { transform: translateX(0); }
          }

          .water-tank .temperature-label {
            position: absolute;
            color: white;
            line-height: 2em;
            width: 4em;
            text-align: center;
            border-radius: .5em;
            background-color: #3A3A3A;
            right: -4.9em;
          }

          .water-tank .temperature-label.top {
            top: 0.5em;
          }

          .water-tank .temperature-label.middle {
            top: 50%;
            transform: translateY(-50%);
          }

          .water-tank .temperature-label.bottom {
            bottom: 0.5em;
          }
        </style>

        <div class="water-tank">
          <div class="liquid">
            <svg class="water" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0" style="stop-color:#29ABE2"/>
                  <stop offset="1" style="stop-color:#0000FF"/>
                </linearGradient>
              </defs>
              <path fill="url(#waterGradient)" d="
                M 0,0 v 100 h 200 v -100 
                c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
              "/>
            </svg>
          </div>
          <div class="temperature-label top"></div>
          <div class="temperature-label middle"></div>
          <div class="temperature-label bottom"></div>
        </div>
      `;

    // Dodanie szablonu do komponentu
    this.appendChild(template.content.cloneNode(true));
  }

  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    const topTemp = hass.states[this.config.top_entity]?.state || "N/A";
    const middleTemp = hass.states[this.config.middle_entity]?.state || "N/A";
    const bottomTemp = hass.states[this.config.bottom_entity]?.state || "N/A";

    this.querySelector(".temperature-label.top").textContent = `${topTemp} °C`;
    this.querySelector(
      ".temperature-label.middle"
    ).textContent = `${middleTemp} °C`;
    this.querySelector(
      ".temperature-label.bottom"
    ).textContent = `${bottomTemp} °C`;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("aw-tech-water-tank-card", AwTechWaterTankCard);
