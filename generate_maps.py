import json
import requests
import staticmaps

URL = (
    "https://gist.githubusercontent.com/jpriebe/d62a45e29f24e843c974/"
    "raw/b1d3066d245e742018bce56e41788ac7afa60e29/us_state_capitals.json"
)
state_dict = json.loads(requests.get(URL).text)
URL = ("https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json")
state_borders = json.loads(requests.get(URL).text)["features"]
borders_by_name = {}
for state_feature in state_borders:
    state_name = state_feature["properties"]["NAME"]
    borders_by_name[state_name] = state_feature["geometry"]["coordinates"]

#for name, provider in staticmaps.default_tile_providers.items():
provider = staticmaps.tile_provider_StamenTerrainBackground
for state_code, state_data in list(state_dict.items())[:]:
    context = staticmaps.Context()
    context.set_tile_provider(provider)
    state_name = state_data["name"]
    state_border = borders_by_name[state_name]
    print(state_name)
    for polygon in state_border:
      if len(polygon[0]) == 2:
        outer_ring = polygon
      else:
        outer_ring = polygon[0]
      context.add_object(
        staticmaps.Area(
          [staticmaps.create_latlng(point[1], point[0]) for point in outer_ring],
          fill_color=staticmaps.TRANSPARENT,
          width=1,
          color=staticmaps.WHITE,
        )
      )
    capital = staticmaps.create_latlng(float(state_data["lat"]), float(state_data["long"]))
    context.add_object(staticmaps.Marker(capital, size=4, color=staticmaps.GREEN))
    filename = f"uscapitals/images/us_capitals_{state_code}.png"
    image = context.render_cairo(125, 75)
    image.write_to_png(filename)


