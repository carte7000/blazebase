def rename_file()
    print('renaming archive...')
    import datetime
    dt = str(datetime.datetime.now())
    import os
    newname = 'MODIS_C6_Global_24h'+dt+'.shp'
    os.rename('MODIS_C6_Global_24h.shp', newname)
    print('renaming complete...')