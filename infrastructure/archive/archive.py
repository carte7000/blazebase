def rename_file()
    print('renaming archive...')
    import datetime
    dt = str(datetime.datetime.now())
    import os
    newname = 'MODIS_C6_Global_24h'+dt+'.shp'
    os.rename('MODIS_C6_Global_24h.shp', newname)
    print('renaming complete...')

from shutil import copyfile
#copy current daily .shp to archive
copyfile("../../infrastructure/download/MODIS_C6_Global_24h.shp", "../../infrastructure/archive/archive_shp")
#copy .shp file to .geojson with date
copyfile(rename_file("MODIS_C6_Global_24h.shp"), "../../infrastructure/archive/archive_geojson")