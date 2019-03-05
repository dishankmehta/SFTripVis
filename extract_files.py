import zipfile
zip_ref = zipfile.ZipFile('./trips.zip', 'r')
zip_ref.extractall()
zip_ref.close()