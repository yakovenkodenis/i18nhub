from django.contrib import admin

from home import models


admin.site.register(models.Project)
admin.site.register(models.Translation)
