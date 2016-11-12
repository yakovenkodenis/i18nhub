from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework_hstore.serializers import HStoreSerializer

from home.models import Translation
from home.models import Project


class TranslationSerializer(HStoreSerializer):
    class Meta:
        model = Translation


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email'
        ]

