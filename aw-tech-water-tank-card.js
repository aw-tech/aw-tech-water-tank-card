class AwTechWaterTankCard extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.render(); // Tworzymy strukturę HTML tylko raz
    }
  }

  set hass(hass) {
    const { top_entity, middle_entity, bottom_entity } = this.config;

    if (top_entity && hass.states[top_entity]) {
      this.shadowRoot.querySelector(
        ".top-temp"
      ).textContent = `${hass.states[top_entity].state}°C`;
    }
    if (middle_entity && hass.states[middle_entity]) {
      this.shadowRoot.querySelector(
        ".middle-temp"
      ).textContent = `${hass.states[middle_entity].state}°C`;
    }
    if (bottom_entity && hass.states[bottom_entity]) {
      this.shadowRoot.querySelector(
        ".bottom-temp"
      ).textContent = `${hass.states[bottom_entity].state}°C`;
    }
  }

  setConfig(config) {
    if (!config.top_entity || !config.middle_entity || !config.bottom_entity) {
      throw new Error(
        "Musisz określić encje z temperaturami dla poziomów: góra, środek i dół (top_entity, middle_entity, bottom_entity)."
      );
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      body {
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0; /* Dodaj to, aby usunąć domyślne marginesy */
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

        /* Dostosowanie dla mniejszych ekranów */
        @media (max-width: 600px) {
          .water-tank {
           display: flex; /* Dodaj to, aby elementy wewnątrz były wyśrodkowane */
  flex-direction: column; /* Umożliwia pionowe ustawienie elementów */
  justify-content: center; /* Wyśrodkowanie zawartości w pionie */
  align-items: center; /* Wyśrodkowanie zawartości w poziomie */
            width: 15em;
            height: 22.5em;
          }
          .water-tank .liquid svg {
            height: 22.5em;
          }
          .temperature-label {
            width: 3em;
            right: -3.9em;
          }
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
        <div class="temperature-label top-temp">—</div>
        <div class="temperature-label middle-temp">—</div>
        <div class="temperature-label bottom-temp">—</div>
      </div>
    `;
  }
}

customElements.define("aw-tech-water-tank-card", AwTechWaterTankCard);
