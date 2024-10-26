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
          .tank {
            width: 100%;
            padding: 16px;
            background: linear-gradient(to top, #0000ff, #ff0000);
            border-radius: 8px;
            color: white;
            text-align: center;
          }
          .level {
            margin: 8px 0;
          }
        </style>
        <div class="tank">
          <p class="level">Top: ${topTemp ? topTemp.state : "-"} °C</p>
          <p class="level">Middle: ${middleTemp ? middleTemp.state : "-"} °C</p>
          <p class="level">Bottom: ${bottomTemp ? bottomTemp.state : "-"} °C</p>
        </div>
      `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("aw-tech-water-tank-card", AWTechWaterTankCard);
