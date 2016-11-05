from django.db import models
from django.contrib.auth.models import User
from django_hstore import hstore


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    description = models.TextField()

    def __str__(self):
        return self.name


class Translation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    language = models.CharField(max_length=50)
    values = hstore.DictionaryField()

    objects = hstore.HStoreManager()

    def __str__(self):
        return self.language + ' translation for ' + self.project.name
