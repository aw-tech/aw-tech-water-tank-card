class AwTechWaterTankCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.render();
    }

    // Pobieranie temperatur z atrybutów encji Home Assistant
    const entityId = this.config.entity;
    const state = hass.states[entityId];
    if (state) {
      this.shadowRoot.querySelector(".top-temp").textContent = `${
        state.attributes.top_temp || "—"
      }°C`;
      this.shadowRoot.querySelector(".middle-temp").textContent = `${
        state.attributes.middle_temp || "—"
      }°C`;
      this.shadowRoot.querySelector(".bottom-temp").textContent = `${
        state.attributes.bottom_temp || "—"
      }°C`;
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Musisz określić encję z temperaturami.");
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  render() {
    this.attachShadow({ mode: "open" });
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
        .top-temp { bottom: 85%; }
        .middle-temp { bottom: 50%; }
        .bottom-temp { bottom: 15%; }
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
        <div class="temperature-label top-temp">—</div>
        <div class="temperature-label middle-temp">—</div>
        <div class="temperature-label bottom-temp">—</div>
      </div>
    `;
  }
}

customElements.define("aw-tech-water-tank-card", AwTechWaterTankCard);
