import requests
import urllib3
import json
import os
from datetime import datetime
from elasticsearch import Elasticsearch

class PopulateData:

    def __init__(self):
        self.FMT = '%H:%M:%S'
        self.feature_type = ['Point', 'LineString']
        self.indexes = ['line_all', 'line_combined', 'trips']
        self.THIS_DIR = os.path.dirname(__file__)
        self.BASE_FILE_PATH = os.path.join(self.THIS_DIR, 'trips')
        self.directory = os.path.abspath(self.BASE_FILE_PATH)
        self.files = os.listdir(self.directory)
        self.es = Elasticsearch('http://localhost:9200/')

    def pushFilesToElastic(self):
        for f in self.files:
            file_data = json.loads(open(os.path.abspath(os.path.join(self.directory, f))).read())
            obj = dict()
            obj['type'] = 'file'
            obj['trip'] = f.split(".")[0]
            obj['data'] = file_data
            self.es.index(index=self.indexes[2], doc_type='trips_data', body=obj)

if __name__ == "__main__":
    elasticObj = PopulateData()
    elasticObj.pushFilesToElastic()


