A Lovelace card for displaying water tank temperature at different levels (top, middle, bottom).

### Configuration

To use this card, specify three temperature sensor entities: `top_entity`, `middle_entity`, and `bottom_entity`.

#### Example configuration

```yaml
type: custom:aw-tech-water-tank-card
top_entity: sensor.water_tank_top_temperature
middle_entity: sensor.water_tank_middle_temperature
bottom_entity: sensor.water_tank_bottom_temperature
```
