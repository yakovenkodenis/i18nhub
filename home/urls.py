from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^users/all/$', views.get_all_users, name='users'),
    url(r'^users/me/$', views.get_current_user, name='current-user'),

    url(r'^projects/all/$', views.get_all_projects, name='projects'),
    url(r'^projects/(?P<project_id>\d+)/$', views.get_project_by_id, name='project'),
    url(r'^projects/create/$', views.create_project, name='create-project'),
    url(r'^projects/update/$', views.update_project, name='update-project'),
    url(r'^projects/delete/$', views.delete_project, name='delete-project'),

    url(r'^translations/(?P<project_id>\d+)/$', views.get_translations, name='translations'),
    url(r'^translations/(?P<project_id>\d+)/(?P<lang>\w+)/$',
        views.get_translation, name='get-translation'),
    url(r'^translations/create/$', views.create_translation, name='create-translation'),
    url(r'^translations/update/$', views.update_translation, name='update-translation'),
    url(r'^translations/remove_value/$',
        views.remove_translation_value, name='remove-translation-value'),
    url(r'^translations/delete/$', views.delete_translation, name='delete-translation'),
]
