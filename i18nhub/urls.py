from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from . import views


urlpatterns = [
    url(r'^admin/', admin.site.urls, name='admin'),

    url(r'^signup/', views.signup, name='signup'),

    # JWT authentication
    url(r'^api-token-auth/', obtain_jwt_token, name='api-token-auth'),
    url(r'^api-token-refresh/', refresh_jwt_token, name='api-token-refresh'),
    url(r'^api-token-verify/', verify_jwt_token, name='api-token-verify'),

    # API
    url(r'^api/v1/', include('home.urls', namespace='api-v1')),
]
