class AWTechWaterTankCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
    this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    const entities = this.config.entities || {};
    const topTemp = hass.states[entities.top];
    const middleTemp = hass.states[entities.middle];
    const bottomTemp = hass.states[entities.bottom];

    this.shadowRoot.innerHTML = `
      <style>
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

        .temperature-label {
          position: absolute;
          color: white;
          line-height: 2em;
          width: 4em;
          text-align: center;
          border-radius: 0.5em;
          background-color: #3A3A3A;
          right: -4.9em;
        }
        .top-temp { bottom: 80%; }
        .middle-temp { bottom: 50%; }
        .bottom-temp { bottom: 20%; }
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
        <div class="temperature-label top-temp"></div>
        <div class="temperature-label middle-temp"></div>
        <div class="temperature-label bottom-temp"></div>
      </div>
      `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("aw-tech-water-tank-card", AWTechWaterTankCard);
