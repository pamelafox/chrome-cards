import json
import requests
import staticmaps


def generate_maps(data_by_code, fileprefix):
    """Expects a dictionary where each key is a region code
    and each value is a dictionary with "border", "lat", and "long"
    """

    def draw_area(points):
        context.add_object(
            staticmaps.Area(
                [staticmaps.create_latlng(point[1], point[0]) for point in points],
                fill_color=staticmaps.TRANSPARENT,
                width=1,
                color=staticmaps.WHITE,
            )
        )

    for region_code, region_data in list(data_by_code.items()):
        context = staticmaps.Context()
        context.set_tile_provider(staticmaps.tile_provider_StamenTerrainBackground)
        try:
            region_border = region_data["border"]
        except KeyError:
            print("Missing border for ", region_code)
            continue
        coordinates = region_border["coordinates"]
        # It's either a MultiPolygon or a Polygon
        if region_border["type"] == "Polygon":
            coordinates = [coordinates]
        for polygon in coordinates:
            if len(polygon[0]) == 2:
                # This polygon has no ring distinction
                draw_area(polygon)
            else:
                # Draw only the outer ring, ignore inner rings
                draw_area(polygon[0])
        capital = staticmaps.create_latlng(
            float(region_data["lat"]), float(region_data["long"])
        )
        context.add_object(staticmaps.Marker(capital, size=4, color=staticmaps.GREEN))
        filename = f"{fileprefix}{region_code}.png"
        image = context.render_cairo(125, 75)
        image.write_to_png(filename)


def generate_state_maps():
    URL = "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json"
    state_borders = json.loads(requests.get(URL).text)["features"]
    borders_by_name = {}
    for state_feature in state_borders:
        state_name = state_feature["properties"]["NAME"]
        borders_by_name[state_name] = state_feature["geometry"]
    URL = (
        "https://gist.githubusercontent.com/jpriebe/d62a45e29f24e843c974/"
        "raw/b1d3066d245e742018bce56e41788ac7afa60e29/us_state_capitals.json"
    )
    state_dict = json.loads(requests.get(URL).text)
    for state_code, state_data in list(state_dict.items())[:]:
        state_data["border"] = borders_by_name[state_data["name"]]

    generate_maps(state_dict, "uscapitals/images/us_capitals_")


def generate_country_maps():
    country_data_by_code = {}
    URL = "https://gist.githubusercontent.com/pamelafox/53b55973292537fe764599c2d319b336/raw/80206c5e8b744bc06afe0bce66ca3111c0d953c1/country_capitals.json"
    capitals = json.loads(requests.get(URL).text)
    for capital in capitals:
        name = capital["country"]
        code = capital["id"]
        lat = capital["lat"]
        lng = capital["lng"]
        country_data_by_code[code] = {"lat": lat, "long": lng, "name": name}
    # URL = "https://datahub.io/core/geo-countries/r/countries.geojson"
    # country_features = json.loads(requests.get(URL).text)["features"]
    country_features = json.loads(open("countries.geojson").read())["features"]
    for country_feature in country_features:
        # Try to match based on name
        name = country_feature["properties"]["ADMIN"]
        country_match = [
            code
            for code, country_data in country_data_by_code.items()
            if country_data["name"] == name
        ]
        if not country_match:
            print(f"Missing match for {name}")
            continue
        country_code = country_match[0]
        try:
            country_data_by_code[country_code]["border"] = country_feature["geometry"]
        except KeyError:
            print(
                f"Missing country {country_code}, {country_feature['properties']['ADMIN']}"
            )

    generate_maps(country_data_by_code, "capitals/images/capitals_")
