# AW Tech Water Tank Card

A simple Lovelace card to display water tank temperature at different levels (top, middle, bottom).

## Configuration

```yaml
type: custom:aw-tech-water-tank-card
entities:
  top_entity: sensor.water_tank_top_temperature
  middle_entity: sensor.water_tank_middle_temperature
  bottom_entity: sensor.water_tank_bottom_temperature
```
