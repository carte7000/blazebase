# from io import BytesIO
# from zipfile import ZipFile
# from urllib.request import urlopen
# or: requests.get(url).content
import datetime
dt = str(datetime.datetime.now())
path = "./archive/archive_geojson/daily_data-" + dt + ".geojson"
url = "https://firms.modaps.eosdis.nasa.gov/active_fire/c6/shapes/zips/MODIS_C6_Global_24h.zip"
def fetchAndConvertToGeojson(zip_file_url, outpath):
    from subprocess import call

    # file = open("MODIS_C6_Global_24h.shp","r") 
    # resp = urlopen("https://firms.modaps.eosdis.nasa.gov/active_fire/c6/shapes/zips/MODIS_C6_Global_24h.zip")
    # zipfile = ZipFile(BytesIO(resp.read()))
    # for line in zipfile.open(file).readlines():
    #     print(line.decode('utf-8'))
    # import requests, zipfile, io.StringIO
    # r = requests.get(zip_file_url, stream=True)
    # z = zipfile.ZipFile(io.StringIO(r.content))
    # z.extractall()
    import requests, zipfile, io
    r = requests.get(zip_file_url)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    z.extractall("./download")

    # import shapefile
    # from json import dumps
    # # read the shapefile
    # reader = shapefile.Reader("./download/MODIS_C6_Global_24h.shp")
    # fields = reader.fields[1:]
    # field_names = [field[0] for field in fields]
    # buffer = []
    # for sr in reader.shapeRecords():
    #     atr = dict(zip(field_names, sr.record))
    #     geom = sr.shape.__geo_interface__
    #     buffer.append(dict(type="Feature", \
    #      geometry=geom, properties=atr)) 
    # # write the GeoJSON file
    # geojson = open("./pyshp-demo.json", "w")
    # geojson.write(dumps({"type": "FeatureCollection", "features": buffer}, indent=2) + "\n")
    # geojson.close()
    # ogr2ogr -f geoJSON kc.json ./download/MODIS_C6_Global_24h.sh
    call(["ogr2ogr", "-f", "geoJSON", outpath, './download/MODIS_C6_Global_24h.shp'])

    # import shapefile
    # # read the shapefile
    # reader = shapefile.Reader("my.shp")
    # fields = reader.fields[1:]
    # field_names = [field[0] for field in fields]
    # buffer = []
    # for sr in reader.shapeRecords():
    #     atr = dict(zip(field_names, sr.record))
    #     geom = sr.shape.__geo_interface__
    #     buffer.append(dict(type="Feature", \
    #      geometry=geom, properties=atr)) 

    # # write the GeoJSON file
    # from json import dumps
    # geojson = open("pyshp-demo.json", "w")
    # geojson.write(dumps({"type": "FeatureCollection",\
    #  "features": buffer}, indent=2) + "\n")
    # geojson.close()
fetchAndConvertToGeojson(url, path)

